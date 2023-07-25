import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../app/hooks/hooks';
import logoDefault from '../../../../../../../../../../assets/logo_default2.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import checkshield from '../../../../../../../../../../assets/protection.png';
import banner from '../../../../../../../../../../assets/ads/8.jpg';
import logoSmall from '../../../../../../../../../../assets/vpbanklogo-small.jpg';
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
} from '../../../../../../../../../../slice/transferSlice';
import axios from 'axios';
const SuccessingTransferContent = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState('');
  const dispatch = useAppDispatch();
  const BankChoosingValue = useAppSelector(
    state => state.transfer.BankChoosing,
  );
  const BankChoosingIconValue = useAppSelector(
    state => state.transfer.BankChoosingIcon,
  );
  const binBankChoosingValue = useAppSelector(
    state => state.transfer.binBankChoosing,
  );
  const STKBankChoosingValue = useAppSelector(
    state => state.transfer.STKBankChoosing,
  );
  const BankValueMoneyValue = useAppSelector(
    state => state.transfer.BankValueMoney,
  );
  const messageTransferValue = useAppSelector(
    state => state.transfer.messageTransfer,
  );
  const longNameBankChoosingValue = useAppSelector(
    state => state.transfer.longNameBankChoosing,
  );
  const NameOfSTKBankChoosingValue = useAppSelector(
    state => state.transfer.NameOfSTKBankChoosing,
  );
  const timeTransferValue = useAppSelector(
    state => state.transfer.timeTransferBank,
  );
  const serverKeyValue = useAppSelector(state => state.allToken.serverKey);
  const firebaseTokenValue = useAppSelector(
    state => state.allToken.firebaseToken,
  );

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year; //format: d-m-y;
    // return new Date().toLocaleString();
  };
  const sendNotification = async () => {
    const message = {
      to: firebaseTokenValue,
      notification: {
        title: 'VPBank: Thông báo',
        body: 'Bạn có biến động số dư mới',
        icon: logoSmall,
      },
    };

    try {
      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        message,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${serverKeyValue}`,
          },
        },
      );

      console.log('Notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  useEffect(() => {
    sendNotification();
  }, []);
  function numberToWordsVi(number) {
    const units = [
      '',
      'Một',
      'Hai',
      'Ba',
      'Bốn',
      'Năm',
      'Sáu',
      'Bảy',
      'Tám',
      'Chín',
    ];
    const tens = [
      '',
      'Mười',
      'Hai Mươi',
      'Ba Mươi',
      'Bốn Mươi',
      'Năm Mươi',
      'Sáu Mươi',
      'Bảy Mươi',
      'Tám Mươi',
      'Chín Mươi',
    ];

    if (number === 0) {
      return 'Không';
    }

    function convertChunk(num) {
      let result = '';
      if (num >= 100) {
        result += units[Math.floor(num / 100)] + ' Trăm ';
        num %= 100;
      }
      if (num >= 10 && num <= 19) {
        result += 'Mười ' + units[num % 10] + ' ';
      } else if (num >= 20) {
        result += tens[Math.floor(num / 10)] + ' ' + units[num % 10] + ' ';
      } else if (num > 0) {
        result += units[num] + ' ';
      }
      return result;
    }

    let words = '';
    let chunkCount = 0;
    while (number > 0) {
      const chunk = number % 1000;
      if (chunk !== 0) {
        const chunkWords = convertChunk(chunk);
        words =
          chunkWords +
          ['', 'Nghìn', 'Triệu', 'Tỷ', 'Nghìn Tỷ'][chunkCount] +
          ' ' +
          words;
      }
      number = Math.floor(number / 1000);
      chunkCount++;
    }

    return words.trim();
  }
  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  const handleNewTransfer = () => {
    dispatch(setlongNameBankChoosing(''));
    dispatch(setbinBankChoosing(''));
    dispatch(setBankChoosing(''));
    dispatch(setBankChoosingIcon(''));
    dispatch(setNameOfSTKBankChoosing(''));
    dispatch(setSTKBankChoosing(''));
    dispatch(setBankValueMoney(0));
    dispatch(setmessageTransfer(''));
    dispatch(settimeTransferBank(''));
    navigation.navigate('SendingMoney');
    
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.BankValueMoneyContainer}>
          <Text style={styles.BankValueMoneyText}>
            {BankValueMoneyValue}{' '}
            <Text style={styles.BankValueMoneyTextCurrency}>đ</Text>
          </Text>
          <Text style={styles.BankValueMoneyTextSwap}>
            {numberToWordsVi(BankValueMoneyValue)} Việt Nam Đồng
          </Text>
        </View>
        <View style={styles.BankTransferContainer}>
          <View style={styles.BankTransferContainerHeader}>
            <Image source={logoDefault} style={styles.logoDefault} />
            <TouchableOpacity style={styles.BankTransferContainerHeaderButton}>
              <Text style={styles.BankTransferContainerHeaderButtonText}>
                Chi tiết
              </Text>
              <FontAwesome
                name="arrow-circle-o-right"
                size={20}
                style={styles.iconModal}
                color="rgb(0, 150, 80)"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.BankTransferUserContainer}>
            <Text style={styles.BankTransferUserTitle}>
              Thông tin người nhận
            </Text>
            <View style={styles.BankTransferUserContentContainer}>
              <Text style={styles.BankTransferUserContentName}>
                {NameOfSTKBankChoosingValue}
              </Text>
              <Text style={styles.BankTransferUserContentSTK}>
                {STKBankChoosingValue}
              </Text>
            </View>
          </View>
          <View style={styles.BankTransferSpecifiedContainer}>
            <Text style={styles.BankTransferUserTitle}>Thời gian</Text>
            <Text style={styles.BankTransferUserContent}>
              {timeTransferValue}
            </Text>
          </View>
          <View style={styles.BankTransferSpecifiedContainer}>
            <Text style={styles.BankTransferUserTitle}>Nội dung</Text>
            <Text style={styles.BankTransferUserContent}>
              {messageTransferValue}
            </Text>
          </View>
          <View style={styles.BankTransferSpecifiedContainer}>
            <Text style={styles.BankTransferUserTitle}>
              Phí (không gồm VAT)
            </Text>
            <Text style={styles.BankTransferUserContent}>
              0 <Text style={styles.BankTransferUserContentCurrency}>đ</Text>
            </Text>
          </View>
        </View>
        <View style={styles.BankTransferContainer}>
          <View style={styles.BankTransferProtectionContainer}>
            <View style={styles.BankTransferProtectionImageContainer}>
              <Image
                style={styles.BankTransferProtectionImage}
                source={checkshield}
              />
            </View>
            <View style={styles.BankTransferProtectionTextContainer}>
              <Text style={styles.BankTransferProtectionText}>
                Sử dụng xác thực sinh trắc học cho giao dịch trong tương lai ?
              </Text>
            </View>
            <TouchableOpacity style={styles.BankTransferProtectionIcon}>
              <FontAwesome
                name="arrow-circle-o-right"
                size={20}
                style={styles.iconModal}
                color="rgb(0, 150, 80)"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.BankTransferUserContainer}>
          <Image style={styles.BankTransferBannerImage} source={banner} />
        </TouchableOpacity>
      </View>
      <View style={styles.BankTransferBottomContainer}>
        <TouchableOpacity style={styles.BankTransferBottomContent}>
          <FontAwesome
            name="paper-plane-o"
            size={20}
            style={styles.iconBottom}
            color="white"
          />
          <Text style={styles.BankTransferBottomText}>Chia sẻ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BankTransferBottomContent}>
          <FontAwesome
            name="user"
            size={20}
            style={styles.iconBottomother}
            color="white"
          />
          <Text style={styles.BankTransferBottomText}>Câu hỏi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BankTransferBottomContent}
          onPress={() => handleNewTransfer()}>
          <MaterialIcons
            name="swap-horiz"
            size={20}
            style={styles.iconBottom}
            color="white"
          />
          <Text style={styles.BankTransferBottomText}>Giao dịch mới</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SuccessingTransferContent;

const styles = StyleSheet.create({
  BankValueMoneyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BankValueMoneyTextCurrency: {
    textDecorationLine: 'underline',
  },
  BankValueMoneyText: {
    color: 'black',
    fontSize: 50,
  },
  container: {
    paddingVertical: 20,
    backgroundColor: 'rgb(244, 248, 248)',
    height: '100%',
  },
  BankValueMoneyTextSwap: {
    color: 'rgb(146, 156, 157)',
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  logoDefault: {
    height: 50,
    width: 120,
    resizeMode: 'contain',
  },
  BankTransferContainer: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 10,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
  },
  BankTransferContainerHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgb(238, 240, 240)',
    borderBottomWidth: 1,
  },
  BankTransferBottomText: {
    color: 'black',
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center',
  },
  BankTransferContainerHeaderButtonText: {
    color: 'rgb(17, 164, 87)',
    fontSize: 17,
  },
  BankTransferContainerHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BankTransferBottomContent: {
    alignItems: 'center',
    flex: 1,
    marginTop: -25,
  },
  iconModal: {
    paddingLeft: 10,
  },
  BankTransferUserContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  BankTransferUserTitle: {
    color: 'rgb(147, 156, 156)',
    fontSize: 18,
    fontWeight: '400',
  },
  BankTransferUserContentName: {
    color: 'black',
    fontSize: 18,
  },
  BankTransferUserContentSTK: {
    color: 'rgb(147, 151, 152)',
    fontSize: 18,
  },
  BankTransferUserContent: {
    color: 'rgb(0, 0, 0)',
    fontSize: 20,
  },
  BankTransferSpecifiedContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BankTransferUserContentCurrency: {
    textDecorationLine: 'underline',
  },
  BankTransferProtectionImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  BankTransferProtectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BankTransferProtectionTextContainer: {
    flex: 6,
  },
  BankTransferProtectionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  BankTransferProtectionImageContainer: {
    flex: 1,
  },
  BankTransferProtectionIcon: {
    flex: 0.8,
  },
  BankTransferBannerImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  BankTransferBottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 130,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  iconBottom: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(0, 173, 82)',
    borderRadius: 30,
  },
  iconBottomother: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: 'rgb(0, 173, 82)',
    borderRadius: 30,
  },
});
