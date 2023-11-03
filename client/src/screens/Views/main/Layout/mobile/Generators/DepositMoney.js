import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../app/hooks/hooks';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const DepositMoney = () => {
  const contentSTK = useAppSelector(state => state.signUp.newAccountSTK);
  const contentName = useAppSelector(state => state.signUp.fullName);
  const valueMoney = useAppSelector(state => state.credit.Balance);
  const email = useAppSelector(state => state.signUp.email);
  const [highlightedButton, setHighlightedButton] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setshowInput] = useState(false);
  const [visible, setVisible] = useState(false);
  const networkState = useAppSelector(state => state.network.ipv4Address);
  const currentTimeInMilliseconds = Date.now();
  const currentDate = new Date(currentTimeInMilliseconds);

  const navigation = useNavigation();
  const handleButtonPress = value => {
    setHighlightedButton(value === highlightedButton ? null : value);

    if (value === 'other') {
      setshowInput(true);
    } else {
      setshowInput(false);
    }
  };
  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  };
  const handleInputChange = text => {
    const numericValue = parseInt(text, 10);
    setInputValue(numericValue);
    console.log(typeof inputValue);
  };
  const handleNext = async () => {
    try {
      if (highlightedButton) {
        setVisible(true);

        const res = await axios.post(`${networkState}/api/sendMail`, {
          emailReceived: 'vuanhphong555@gmail.com',
          subject: `Phiếu yêu cầu gửi tiền đến từ hệ thống ngân hàng`,
          cusName: contentName,
          contentSTK: contentSTK,
          time: currentDate.toISOString(),
          moneyDeposit: highlightedButton,
          directLink: `${'http://localhost:5000'}/api/openDeposit`,
        });
        if (res.data.success) {
          setTimeout(() => {
            setVisible(false);
            // dispatch(setLocked(res.data.creditCard.locked));
            showToast(
              'success',
              'Gửi yêu cầu thành công, hãy đến ngân hàng gần nhất để xác thực',
            );
          }, 3000);
        }
      } else {
        showToast('success', 'Xin hãy chọn hoặc nhập số tiền cần gửi');
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      console.log('Có lỗi server');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            size={20}
            style={styles.iconModal}
            color="black"
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerText}>Gửi tiền vào STK</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentInput}>
          <Text style={styles.contentInputLabel}>
            Tài khoản nguồn: {contentSTK} - {contentName}
          </Text>
          <Text style={styles.contentInputValue}>{valueMoney} VND</Text>
        </View>
        <View style={styles.contentInput}>
          <Text style={styles.contentInputLabel}>{contentName}</Text>
          <Text style={styles.contentInputValue}>{contentSTK}</Text>
        </View>
        <Text style={styles.contentTitleDeposit}>
          Chọn số tiền cần nạp (VND)
        </Text>
        <View style={styles.contentDepositContainer}>
          <View style={styles.contentRow}>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 15000000 && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress(15000000)}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 15000000 &&
                    styles.highlightedButtonText,
                ]}>
                15,000,000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 10000000 && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress(10000000)}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 10000000 &&
                    styles.highlightedButtonText,
                ]}>
                10,000,000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 5000000 && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress(5000000)}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 5000000 && styles.highlightedButtonText,
                ]}>
                5,000,000
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentRow}>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 2000000 && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress(2000000)}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 2000000 && styles.highlightedButtonText,
                ]}>
                2,000,000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 1000000 && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress(1000000)}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 1000000 && styles.highlightedButtonText,
                ]}>
                1,000,000
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.contentTitleDepositMoney,
                highlightedButton === 'other' && styles.highlightedButton,
              ]}
              onPress={() => handleButtonPress('other')}>
              <Text
                style={[
                  styles.contentTitleDepositMoneyText,
                  highlightedButton === 'other' && styles.highlightedButtonText,
                ]}>
                Số khác
              </Text>
            </TouchableOpacity>
          </View>
          {showInput && (
            <View style={styles.contentInput}>
              <Text style={styles.contentInputLabel}>Số tiền</Text>
              <TextInput
                style={styles.contentTextInput}
                onChangeText={handleInputChange}
              />
            </View>
          )}
          {visible && (
            <ActivityIndicator
              size="large"
              color="#00ff00"
              style={{alignSelf: 'center'}}
            />
          )}
        </View>
        <View style={styles.warningTextContainer}>
          <Text style={styles.contentTitleDeposit}>Lưu ý</Text>
          <Text style={styles.contentWarningDeposit}>
            1. Số tiền gửi tối thiểu 50,000 VND, tối đa 30,000,000 và là bội số
            của 50,000 VND
          </Text>
          <Text style={styles.contentWarningDeposit}>
            2. Số tiền nạp tối đa 1 ngày là 100,000,000 VND
          </Text>
          <Text style={styles.contentWarningDeposit}>
            3. Khi gửi phiếu gửi tiền hãy đến các cơ sở VPBank gàn nhất để xác
            nhận gửi
          </Text>
          <View style={styles.buttonTransferContainer}>
            <Text style={styles.contentWarningDeposit}>
              4. Xem lịch sử giao dịch
            </Text>
            <TouchableOpacity style={styles.contentWarningDepositButton}>
              <Text style={styles.contentWarningDeposit}>tại đây</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonNextContainer}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => handleNext()}>
          <Text style={styles.buttonNextText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositMoney;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(245, 245, 245)',
  },
  TouchableOpacity: {},
  headerText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  highlightedButton: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 5,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(247, 247, 247)',
  },
  highlightedButtonText: {color: 'white'},
  contentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgb(232, 232, 232)',
    marginVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    // paddingVertical:5
  },
  contentInputLabel: {
    color: 'rgb(102, 102, 102)',
    paddingVertical: 5,
    fontSize: 16,
  },

  contentInputValue: {
    color: 'rgb(0, 0, 0)',
    paddingBottom: 5,
    fontSize: 20,
  },
  contentTitleDeposit: {
    paddingVertical: 10,
    color: 'rgb(24, 24, 24)',
    fontSize: 20,
  },
  contentDepositContainer: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
  },
  contentTitleDepositMoneyText: {
    color: 'rgb(1, 173, 83)',
    fontSize: 18,
  },
  contentTitleDepositMoney: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWarningDeposit: {
    color: 'rgb(130, 130, 130)',
    fontSize: 16,
  },
  contentTextInput: {
    color: 'black',
    fontSize: 20,
  },
  buttonNextContainer: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonNext: {
    width: '100%',
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNextText: {
    fontSize: 17,
    color: 'white',
  },
});
