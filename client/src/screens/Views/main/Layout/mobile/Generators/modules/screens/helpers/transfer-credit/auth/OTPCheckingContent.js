import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Animated, TouchableOpacity,ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { settimeTransferBank } from '../../../../../../../../../../../slice/transferSlice';
import {
  useAppDispatch,
  useAppSelector} from '../../../../../../../../../../../app/hooks/hooks'
import Toast from 'react-native-toast-message';
import axios from 'axios';
const TimerBar = () => {
  const dispatch = useAppDispatch();
  const [remainingSeconds, setRemainingSeconds] = useState(20);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [remainingTimesOTP, setRemainingTimesOTP] = useState(1);

  const [randomNumbers, setRandomNumbers] = useState('');
  const [isSerialGenerated, setIsSerialGenerated] = useState(false);
  const [isDateGenerated, setIsDateGenerated] = useState(false);
  const [serial, setSerial] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [visible, setVisible] = useState(false);
  const STKBankChoosing = useAppSelector(
    state => state.transfer.STKBankChoosing,
  );
  const BankValueMoney = useAppSelector(state => state.transfer.BankValueMoney);
  const messageTransfer = useAppSelector(
    state => state.transfer.messageTransfer,
  );
  const binBankChoosing = useAppSelector(
    state => state.transfer.binBankChoosing,
  );
  const NameOfSTKBankChoosing = useAppSelector(
    state => state.transfer.NameOfSTKBankChoosing,
  );
  const accountID = useAppSelector(state => state.signUp.newAccountSTK)
  const CMNDUser = useAppSelector(state => state.signUp.personalIdNumber);
  const navigation = useNavigation();
        const networkState = useAppSelector(state => state.network.ipv4Address)

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getProgressBarWidth = () => {
    const progress = progressAnimation.interpolate({
      inputRange: [0, 20],
      outputRange: ['0%', '100%'],
    });
    return {width: progress, transform: [{scaleX: -1}]};
  };
  function generateSerial(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    // return date + '-' + month + '-' + year; //format: d-m-y;
    return new Date().toLocaleString();
  };

  // const BankChoosingIcon
const showToast = (type, title,text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  const handleContinue = async () => {
    setVisible(true);
    try {
      const ress = await axios.post(
        `${networkState}/api/createCreditCardTransaction`,
        {
          CMNDUser: CMNDUser,
        
       Merchant_Details: "Giao dịch với tài khoản ",
        Account_Balance: BankValueMoney,
      
        Account_id: accountID
        },
      );  
      if (ress.data.success === true) {
        setTimeout(() => {
          setVisible(false);
          dispatch(settimeTransferBank(currentDate))
          showToast('success', 'Bạn có biến động số dư mới', '');
          navigation.navigate('SuccessingTransferWrap');
        }, 3000);
      }
    } catch (err) {
                setVisible(false);

      console.log(err.message);
      return false;
    }
  };
  useEffect(() => {
    const animation = Animated.timing(progressAnimation, {
      toValue: remainingSeconds,
      duration: remainingSeconds * 1000,
      useNativeDriver: false,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (remainingTimesOTP > 0) {
      const interval = setInterval(() => {
        setRemainingTimesOTP(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      let randomNums = '';
      for (let i = 0; i < 6; i++) {
        randomNums += Math.floor(Math.random() * 10);
        if (i < 5) {
          randomNums += ' ';
        }
      }
      setRandomNumbers(randomNums);
    }
  }, [remainingTimesOTP]);
  useEffect(() => {
    setSerial(generateSerial(13));
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.OTPCheckingContainer}>
          <Animated.View style={[styles.bar, getProgressBarWidth()]} />
          <Text style={styles.textTime}>
            Mã OTP sẽ tự động cập nhật sau{' '}
            <Text style={styles.time}>{formatTime(remainingSeconds)}</Text> giây
          </Text>

          <View style={styles.randomNumbersContainer}>
            {remainingTimesOTP > 0 ? (
              <Text style={styles.textOTPNotShow}>___ ___</Text>
            ) : (
              <Text style={styles.textOTP}>{randomNumbers}</Text>
            )}
          </View>
          <View style={styles.warningOTP}>
            <Text style={styles.warningOTPText}>
              Vui lòng không cung cấp mã OTP cho bất cứ ai trong bất cứ trường
              hợp nào.
            </Text>
          </View>
        </View>
        {visible && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{alignSelf: 'center'}}
        />
      )}
        <View style={styles.OTPCheckingSerial}>
          <Text style={styles.OTPCheckingSerialText}>Serial: {serial}</Text>
          <Text style={styles.OTPCheckingSerialText}>{currentDate}</Text>
        </View>
        <View style={styles.OTPSerialIntroduce}>
          <Text style={styles.OTPSerialIntroduceTitle}>
            Mã xác thực OTP cơ bản dùng cho :
          </Text>
          <Text style={styles.OTPSerialIntroduceText}>
            {' '}
            Giao dịch tài chính có giá trị dưới hoặc dưới{' '}
            <Text style={styles.OTPSerialIntroduceTextValue}>
              500 triệu/lần
            </Text>{' '}
            hoặc dưới{' '}
            <Text style={styles.OTPSerialIntroduceTextValue}>1.5 tỷ/ngày</Text>
          </Text>
          <Text style={styles.OTPSerialIntroduceText}>
            {' '}
            Giao dịch phi tài chính như: Khóa/mở khóa thẻ, đổi quà Loyalty, Liên
            kết ví điện tử,...
          </Text>
        </View>
      </View>
      <View style={styles.OTPCheckingButtonContainer}>
        <Text style={styles.OTPCheckingButtonIntroduce}>
          Chọn "Xác nhận giao dịch" mã OTP sẽ được điền tự động
        </Text>
        <TouchableOpacity
          onPress={() => handleContinue()}
          style={styles.OTPCheckingButton}>
          <Text style={styles.OTPCheckingButtonText}>Xác nhận giao dịch</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%'},
  bar: {
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  OTPCheckingContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
  },
  textTime: {
    color: 'rgb(46, 46, 46)',
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  time: {
    color: 'red',
  },
  randomNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOTP: {
    letterSpacing: 3,
    color: 'black',
    fontSize: 60,
    marginLeft: 5,
  },
  textOTPNotShow: {
    letterSpacing: 3,
    color: 'black',
    fontSize: 40,
  },
  warningOTP: {
    backgroundColor: 'rgb(255, 248, 227)',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningOTPText: {
    color: 'rgb(164, 150, 99)',
    textAlign: 'center',
  },
  OTPCheckingSerial: {
    paddingVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OTPCheckingSerialText: {
    color: 'rgb(85, 157, 131)',
    fontSize: 18,
  },
  OTPSerialIntroduce: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  OTPSerialIntroduceTitle: {
    color: 'rgb(168, 168, 172)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  OTPSerialIntroduceText: {
    color: 'rgb(163, 165, 167)',
    paddingTop: 5,
  },
  OTPSerialIntroduceTextValue: {
    color: 'rgb(168, 168, 172)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  OTPCheckingButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 80,
  },
  OTPCheckingButton: {
    marginHorizontal: 20,
    backgroundColor: 'rgb(1, 173, 83)',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  OTPCheckingButtonText: {
    color: 'white',
    fontSize: 17,
  },
  OTPCheckingButtonIntroduce: {
    color: 'rgb(146, 146, 149)',
    marginHorizontal: 20,
    paddingBottom: 10,
  },
});

export default TimerBar;
