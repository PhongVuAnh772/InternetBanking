import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// import {Button, Dialog} from '@rneui/themed';
import styles from './stylesQR';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {
  setlongNameBankChoosing,
  setbinBankChoosing,
  setBankChoosing,
  setBankChoosingIcon,
  setNameOfSTKBankChoosing,
  setSTKBankChoosing,
  setBankValueMoney,
  setmessageTransfer,
  settimeTransferBank,
} from '../../../slice/transferSlice.ts';
import axios from 'axios';

function QRscanners({navigation}) {
  const dispatch = useAppDispatch();
  const [qrValue, setQrValue] = useState('');
  const [bankCodeState, setbankCode] = useState('');
  const [userBankState, setuserBank] = useState('');
  const [responseDataBanks, setResponseDataBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQRValueSet, setIsQRValueSet] = useState(false);
  const [light, setLight] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [responseDataUser, setResponseDataUser] = useState([]);

  const userBankValue = useAppSelector(state => state.transfer.STKBankChoosing);
  const bankCodeValue = useAppSelector(state => state.transfer.binBankChoosing);
  const BankChoosingValue = useAppSelector(
    state => state.transfer.BankChoosing,
  );
  const BankChoosingIconValue = useAppSelector(
    state => state.transfer.BankChoosingIcon,
  );

  const longNameBankChoosingValue = useAppSelector(
    state => state.transfer.longNameBankChoosing,
  );
  const NameOfSTKBankChoosingValue = useAppSelector(
    state => state.transfer.NameOfSTKBankChoosing,
  );

  const processInput = input => {
    let searchString = 'A000000727';
    let startIndex = input.indexOf(searchString);
    let result = input;

    if (startIndex !== -1) {
      result = result.slice(startIndex + searchString.length);
      result = result.substring(8);
      let bankCode = result.substring(0, 6);
      result = result.substring(6 + 4);
      let userBankIndex = result.lastIndexOf('QRIBFTT');
      if (userBankIndex !== -1) {
        let userBank = result.substring(0, userBankIndex);
        userBank = userBank.substring(0, userBank.length - 4);
        // if (userBank && bankCode) {
        setuserBank(userBank);
        setbankCode(bankCode);
        dispatch(setSTKBankChoosing(userBank));
        dispatch(setbinBankChoosing(bankCode));
        if (responseDataBanks && responseDataBanks.data) {
          let dataBinBank = responseDataBanks.data.find((data, index) => {
            return data.bin === bankCode;
          });

          dispatch(setlongNameBankChoosing(dataBinBank.name));
          dispatch(setBankChoosing(dataBinBank.shortName));
          dispatch(setBankChoosingIcon(dataBinBank.logo));
          console.log(dataBinBank);
        }
      } else {
        console.log("Không tìm thấy chuỗi 'QRIBFTT' trong biến result.");
      }
    } else {
      console.log('Chuỗi không được tìm thấy trong đầu vào.');
    }
  };

  const fetchDataUserSTK = async () => {
    try {
      if (userBankState && bankCodeState) {
        const config = {
          method: 'post',
          url: `https://dominhhai.com/api/acb/?accountNumber=${userBankState}&bankCode=${bankCodeState}`,
        };

        const response = await axios(config);
        setResponseDataUser(response.data);

        if (
          responseDataUser.results &&
          responseDataUser.results.ownerName !== undefined &&
          responseDataUser.length !== 0
        ) {
          dispatch(
            setNameOfSTKBankChoosing(responseDataUser.results.ownerName),
          );
          navigation.navigate('SendingMoney');
        } else {
          // processInput(qrValue);
          setIsLoading(true);

          fetchDataUserSTK();
        }
      }
      console.log('data user', responseDataUser);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataBanks = async () => {
    try {
      const config = {
        method: 'get',
        url: 'https://api.vietqr.io/v2/banks',
      };

      const response = await axios(config);
      if (response && response.data) {
        setResponseDataBanks(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataBanks();
  }, []);
  useEffect(() => {
    if (qrValue) {
      setIsQRValueSet(true);
      setIsLoading(true);
      processInput(qrValue);
      // fetchDataUserSTK();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [qrValue]);

  useEffect(() => {
    const fetchDataAndNavigate = async () => {
      if (
        !isLoading &&
        isQRValueSet &&
        userBankValue &&
        bankCodeValue &&
        longNameBankChoosingValue &&
        BankChoosingValue &&
        BankChoosingIconValue
        // &&
        // NameOfSTKBankChoosingValue
      ) {
        const allDataAvailable = true; // Kiểm tra tất cả các biến đã có dữ liệu

        if (allDataAvailable) {
          try {
            await fetchDataUserSTK();
          } catch (error) {
            console.log(
              'Error occurred while fetching or dispatching data:',
              error,
            );
          }
        }

        console.log('userBankValue ' + userBankValue);
        console.log('bankCodeValue ' + bankCodeValue);
        console.log('longNameBankChoosingValue ' + longNameBankChoosingValue);
        console.log('BankChoosingValue ' + BankChoosingValue);

        // console.log('BankChoosingIconValue ' + BankChoosingIconValue);
      }
    };

    fetchDataAndNavigate();
  }, [
    isLoading,
    isQRValueSet,
    userBankValue,
    bankCodeValue,
    longNameBankChoosingValue,
    BankChoosingValue,
    BankChoosingIconValue,
    // NameOfSTKBankChoosingValue,
  ]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        onRead={e => {
          setShowDialog(true);
          setQrValue(e.data);
        }}
        flashMode={
          light
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.auto
        }
        
        style={styles.RNQRCode}
      />
    </View>
  );
}

export default QRscanners;
