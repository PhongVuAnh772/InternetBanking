import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../app/hooks/hooks';

const ConfirmInformationCreditContent = () => {
  const navigation = useNavigation();
  const initialCreditName = useAppSelector(state => state.credit.UserNameCreditCard)
  const initialCreditNumber = useAppSelector(state => state.credit.CC_number)
  const userBalanceDetails = useAppSelector(state => state.credit.Balance)
  const cardChoosingName = useAppSelector(state => state.transferCredit.NameOfCardNumberInternal)
  const cardNumberChoosing = useAppSelector(state => state.transferCredit.cardNumberInternal)
  const valueNumberTransfer = useAppSelector(state => state.transferCredit.BankValueMoneyInternal)
  const valueMessageTransfer = useAppSelector(state => state.transferCredit.messageTransferInternal)

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
      'Hai mươi',
      'Ba mươi',
      'Bốn mươi',
      'Năm mươi',
      'Sáu mươi',
      'Bảy mươi',
      'Tám mươi',
      'Chín mươi',
    ];

    if (number === 0) {
      return 'Không';
    }

    function convertChunk(num) {
      let result = '';
      if (num >= 100) {
        result += units[Math.floor(num / 100)] + ' trăm ';
        num %= 100;
      }
      if (num >= 10 && num <= 19) {
        result += 'mười ' + units[num % 10] + ' ';
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
          ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ'][chunkCount] +
          ' ' +
          words;
      }
      number = Math.floor(number / 1000);
      chunkCount++;
    }

    return words.trim();
  }
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.sendingContentUser}>
          <View style={styles.sendingContentUserNow}>
            <Text style={styles.sendingContentUserNowTitle}>
              Tài khoản nguồn
            </Text>
            <View style={styles.sendingContentUserNowContent}>
              <View style={styles.sendingContentUserNowIconContainer}>
                <MaterialIcons
                  name="credit-card"
                  size={20}
                  color="rgb(64, 163, 119)"
                  style={styles.sendingContentUserNowIcon}
                />
              </View>
              <View style={styles.sendingContentUserNowInformation}>
                <Text style={styles.sendingContentUserNowInformationName}>
                  {initialCreditName}
                </Text>

                <Text style={styles.sendingContentUserNowInformationSTK}>
                  {initialCreditNumber}
                </Text>
              </View>
              <Text style={styles.sendingContentUserNowTitle}>{userBalanceDetails} đ</Text>
            </View>
          </View>
          <View style={styles.sendingContentUserNow}>
            <Text style={styles.sendingContentUserNowTitle}>Tới tài khoản</Text>
            <View style={styles.sendingContentUserNowContent}>
              <View style={styles.sendingContentUserNowIcon}>
                <MaterialIcons
                  name="credit-card"
                  size={20}
                  color="rgb(64, 163, 119)"
                />
              </View>
              
              <View style={styles.sendingContentUserNowInformation}>
                <Text style={styles.sendingContentUserNowInformationName}>
                  {cardChoosingName}
                </Text>

                <Text style={styles.sendingContentUserNowInformationSTK}>
                  {cardNumberChoosing}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.VPBankSendingInforContainer}>
          <View style={styles.VPBankSendingInfor}>
            <Text style={styles.VPBankSendingInforTitle}>Tên người nhận</Text>
            <Text style={styles.VPBankSendingInforContent}>
              {cardChoosingName}
            </Text>
          </View>
          <View style={styles.VPBankSendingInfor}>
            <Text style={styles.VPBankSendingInforTitle}>Số thẻ nhận</Text>
            <Text style={styles.VPBankSendingInforContent}>
              {cardNumberChoosing}
            </Text>
          </View>
          <View style={[styles.VPBankSendingInfor]}>
            <Text style={styles.VPBankSendingInforTitle}>Số tiền chuyển</Text>
            <Text style={styles.VPBankSendingInforContentValue}>
              {valueNumberTransfer}{' '}
              <Text style={styles.VPBankSendingInforContentCurrency}>đ</Text>
            </Text>
            <Text style={styles.VPBankSendingInforTitleVN}>
              {`${numberToWordsVi(valueNumberTransfer)} việt nam đồng`}
            </Text>
          </View>
          <View style={styles.VPBankSendingInfor}>
            <Text style={styles.VPBankSendingInforTitle}>
              Phí (không gồm VAT)
            </Text>
            <Text style={styles.VPBankSendingInforContentValueFee}>
              {0}{' '}
              <Text style={styles.VPBankSendingInforContentCurrencyFee}>đ</Text>
            </Text>
          </View>
          <View style={styles.VPBankSendingInfor}>
            <Text style={styles.VPBankSendingInforTitle}>Nội dung</Text>
            <Text style={styles.VPBankSendingInforContent}>
              {valueMessageTransfer}
            </Text>
          </View>
          <View style={styles.VPBankSendingInfor}>
            <Text style={styles.VPBankSendingInforTitle}>
              Phương thức chuyển tiền
            </Text>
            <Text style={styles.VPBankSendingInforContent}>
              Chuyển nhanh Napas 247
            </Text>
          </View>
          <View style={styles.contentFooter}>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => navigation.navigate('OTPCreditWrap')}>
              <Text style={styles.buttonNextText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ConfirmInformationCreditContent;

const styles = StyleSheet.create({
  sendingContentUserNowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(182, 182, 182)',
  },
  container: {backgroundColor: 'rgb(226, 228, 232)'},
  sendingContentUser: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sendingContentUserNow: {
    paddingVertical: 5,
  },
  sendingContentUserNowIcon: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderColor: 'rgb(244, 243, 244)',
    borderWidth: 1,
    borderRadius: 5,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendingContentUserNowInformation: {
    flexDirection: 'column',
    flex: 8,
    paddingLeft: 10,
  },
  sendingContentUserNowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  sendingContentUserNowInformationName: {
    color: 'rgb(184, 183, 184)',
    fontSize: 15,
  },
  sendingContentUserNowInformationSTK: {
    color: 'rgb(108, 105, 109)',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 3,
  },
  VPBankSendingInforContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: '20%'
  },
  VPBankSendingInfor: {
    borderBottomColor: 'rgb(251, 250, 252)',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  VPBankSendingInforTitle: {
    color: 'rgb(189, 186, 190)',
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  VPBankSendingInforContent: {
    color: 'rgb(34, 30, 35)',
    fontSize: 19,
    fontWeight: '400',
  },
  VPBankSendingInforContentCurrency: {
    fontSize: 35,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: 'rgb(140, 139, 140)',
  },
  VPBankSendingInforContentValue: {
    fontSize: 40,
    fontWeight: '500',
    color: 'black',
  },
  VPBankSendingInforTitleVN: {
    color: 'rgb(189, 186, 190)',
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  VPBankSendingInforContentValueFee: {color: 'black', fontSize: 17},
  VPBankSendingInforContentCurrencyFee: {
    textDecorationLine: 'underline',
    color: 'black',
  },
  contentFooter: {},
  buttonNext: {
    backgroundColor: 'rgb(1, 173, 83)',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    width: '100%',
  },
  buttonNextText: {
    color: 'white',
    fontSize: 17,
  },
});
