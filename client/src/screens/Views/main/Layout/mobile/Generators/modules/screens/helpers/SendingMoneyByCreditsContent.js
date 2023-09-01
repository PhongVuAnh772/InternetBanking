import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks/hooks';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  setSTKBankChoosingInternal,
  setmessageTransferInternal,
  setBankValueMoneyInternal,
  setNameOfSTKBankChoosingInternal,
} from '../../../../../../../../../slice/transferInternalSlice.ts';

const ContentSendingMoney = () => {
  const navigation = useNavigation();
  const CardNumber = useAppSelector(state => state.credit.CC_number);
  const Balance = useAppSelector(state => state.credit.Balance);
  const networkState = useAppSelector(state => state.network.ipv4Address);
  const [creditSending, setCreditSending] = useState('');
  const [valueMess, setValueMess] = useState('');
  const [valueMoney, setValueMoney] = useState(0);
  const dispatch = useAppDispatch();
  const showToast = (type, mess) => {
    Toast.show({
      type: type,
      text1: mess,
    });
  };
  const handleContinue = async () => {
    if (creditSending == '' && valueMoney == '') {
      showToast('error', 'Bạn chưa nhập đủ trường');
    } else if (creditSending.length < 14) {
      showToast('error', 'Số thẻ phải là dãy có 14 kí tự, vui lòng nhập lại');
    } else if (valueMoney < 10000) {
      showToast('error', 'Số tiền chuyển phải bằng 10.000 đồng');
    } else if (valueMoney > parseFloat(Balance)) {
      showToast('error', 'Số tiền chuyển lớn hơn số tiền trong thẻ');
    } else if (creditSending == CardNumber) {
      showToast('error', 'Bạn không thể chuyển về thẻ bạn được');
    } else {
      try {
        const response = await axios.post(`${networkState}/api/checkSTKBanks`, {
          Account_id: creditSending,
        });

        if (response.data.success) {
          console.log(creditSending);

          dispatch(setBankValueMoneyInternal(valueMoney));
          dispatch(setSTKBankChoosingInternal(creditSending));
          dispatch(
            setNameOfSTKBankChoosingInternal(
              response.data.dbCustomers.Full_Name,
            ),
          );

          if (valueMess !== '' && valueMess !== undefined) {
            dispatch(setmessageTransferInternal(valueMess));
          }
          navigation.navigate('ConfirmInformationTransferCreditWrap');
        } else {
          const response2 = await axios.post(
            `${networkState}/api/checkINickBank`,
            {iNick: creditSending},
          );

          if (response2.data && response2.data.success) {
            dispatch(setBankValueMoneyInternal(valueMoney));
            dispatch(setSTKBankChoosingInternal(creditSending));
            dispatch(
              setNameOfSTKBankChoosingInternal(
                response2.data.dbCustomers.Full_Name,
              ),
            );
            if (valueMess !== '' && valueMess !== undefined) {
              dispatch(setmessageTransferInternal(valueMess));
            }
            navigation.navigate('ConfirmInformationTransferCreditWrap');
          } else {
            showToast('error', 'Không tìm thấy số tài khoản hoặc iNick bất kì');
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerMoneyInfo}>
          <Text style={styles.textheaderMoneyInfo}>Tài khoản thẻ</Text>
        </View>
        <View style={styles.contentMoneyInfo}>
          <View style={styles.contentIcon}>
            <FontAwesome name="credit-card" size={20} color="rgb(0, 173, 83)" />
          </View>
          <View style={styles.contentMoneyDes}>
            <Text style={styles.moneyValueSpecified}>
              {Balance}{' '}
              <Text style={styles.moneyValueSpecifiedCurrency}>đ</Text>
            </Text>
            <View style={styles.accountInfoDemo}>
              <Text style={styles.moneyValue}>Normal Credit</Text>
              <Text style={styles.separate}>|</Text>
              <Text style={styles.moneyValue}>{CardNumber}</Text>
            </View>
          </View>
          <View style={styles.contentIcon}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#909a9c" />
          </View>
        </View>
      </View>

      <View style={styles.contentSendingMoneyBank}>
        <View style={styles.headerMoneyInfo}>
          <Text style={styles.textheaderMoneyInfo}>Thông tin người nhận</Text>
        </View>
        <View style={styles.contentMoneyInfo}>
          <View style={styles.contentMoneyDes}>
            <View style={styles.contentSTKInfoInput}>
              <TextInput
                style={styles.inputSTK}
                placeholder="Số thẻ"
                placeholderTextColor="rgb(145, 154, 156)"
                onChangeText={setCreditSending}
                maxLength={14}
              />
              <FontAwesome name="id-card-o" size={20} color="rgb(0, 173, 83)" />
            </View>
            {/* {messageError} */}

            <View style={styles.contentSTKInfoInput}>
              <TextInput
                style={styles.inputSTKValue}
                placeholder="0"
                placeholderTextColor="rgb(141, 152, 154)"
                keyboardType="number-pad"
                onChangeText={setValueMoney}
              />
              <Text style={styles.inputSTKValueCurrencySpecified}>đ</Text>
            </View>
            <View style={styles.contentSTKInfoInputOther}>
              <TextInput
                style={styles.inputSTK}
                placeholder="Nội dung (Không bắt buộc)"
                placeholderTextColor="rgb(145, 154, 156)"
                value={valueMess}
                onChangeText={setValueMess}
              />
              <View style={styles.contentSTKInfoInputOtherCounting}>
                <FontAwesome
                  name="envelope-open"
                  size={20}
                  color="rgb(0, 173, 83)"
                  style={{transform: [{rotate: '18deg'}]}}
                />
                <Text style={styles.contentSTKInfoInputOtherCountingSpecified}>
                  {/* {characterCount}/160 */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.buttonFooter}
          onPress={() => handleContinue()}>
          <Text style={styles.buttonFooterText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ContentSendingMoney;

const styles = StyleSheet.create({
  container: {},
  headerMoneyInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgb(244, 245, 246)',
    borderBottomColor: 'rgb(244, 245, 246)',
  },
  contentMoneyInfo: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentIcon: {
    flex: 1,
  },
  contentSTKInfoInput: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textheaderMoneyInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  accountInfoDemo: {flexDirection: 'row'},
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separate: {
    paddingHorizontal: 5,
    fontSize: 15,
    color: '#909a9c',
  },
  contentMoneyDes: {
    flex: 1,
    paddingHorizontal: 5,
  },
  moneyValue: {
    fontSize: 18,
    color: '#909a9c',
  },
  moneyValueSpecified: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  inputSTK: {
    fontSize: 20,
    color: 'black',
  },
  contentIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  moneyValueSpecifiedCurrency: {
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
  },
  contentSendingMoneyBank: {
    marginVertical: 20,
  },
  inputSTKValue: {
    fontSize: 50,
    color: 'black',
  },
  moneyValueBank: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  },
  inputSTKValueCurrencySpecified: {
    color: 'rgb(146, 156, 157)',
    fontSize: 24,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '500',
    textDecorationLine: 'underline',
    borderColor: 'rgb(235, 241, 242)',
  },
  contentSTKInfoInputOther: {
    paddingTop: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSTKInfoInputOtherCounting: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSTKInfoInputOtherCountingSpecified: {
    color: 'rgb(170, 176, 179)',
    paddingTop: 5,
  },
  footerContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    marginVertical: 5,
  },
  buttonFooter: {
    backgroundColor: 'rgb(0, 173, 83)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooterText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  centeredView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '99%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  textTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputSearchSpecified: {
    width: '100%',
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
    height: 40,
    paddingLeft: 35,
  },
  inputSearch: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 22,
    left: 15,
  },
  otherBankName: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 10,
  },
  // otherBankContainer: {
  //   width: '100%',
  // },
  bankLogo: {
    height: 50,
    width: 50,
  },
  otherBankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(253, 255, 252)',
  },
});
