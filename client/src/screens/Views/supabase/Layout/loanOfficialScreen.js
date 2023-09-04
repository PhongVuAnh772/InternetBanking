import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import background from '../../../../assets/backgroundloan.jpg';
import {useAppSelector, useAppDispatch} from '../../../../app/hooks/hooks';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { setLoanTotal, } from '../../../../slice/loanSlice';
import { setBalance } from '../../../../slice/creditSlice';
const LoanOfficialScreen = () => {
  const dispatch = useAppDispatch()
  const fullName = useAppSelector(state => state.signUp.fullName);
  const Email = useAppSelector(state => state.signUp.email);
  const region = useAppSelector(state => state.signUp.regionName);
  const CMNDUser = useAppSelector(state => state.signUp.personalIdNumber);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [loanDiscription, setloanDiscription] = useState(''); 
  const [loanMoney, setLoanMoney] = useState('');
  const newLoanMoney = parseFloat(loanMoney)
  const newFloatMoney = parseFloat(newLoanMoney.toFixed(2))
  const oldLoan = useAppSelector(state => state.loan.loanTotal)
  const networkState = useAppSelector(state => state.network.ipv4Address)
  const oldBalance = useAppSelector(state => state.credit.Balance)
  const newOldBalance = parseFloat(oldBalance)

  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
    });
  };
  console.log(CMNDUser)
  const handleNext = async () => {
    setVisible(true);
    try {
      const res = await axios.post(
        `${networkState}/api/addLoan`,
        {
          LoanType: loanDiscription,
          CMNDUser: CMNDUser,
          Account_Balance: newFloatMoney,
        },
      );
      if (res.data.success) {
        setTimeout(() => {
          setVisible(false);
          dispatch(setLoanTotal(oldLoan + newFloatMoney))
          dispatch(setBalance((newOldBalance + newFloatMoney).toFixed(2)))
          navigation.navigate("LoanSuccess")
        }, 3000);
      }
      else {
        setVisible(false);
        showToast('error', 'Lỗi truyền thông tin');
      }
    } catch (err) {
      setVisible(false);
        showToast('error', 'Lỗi truyền thông tin');
      console.log('Co loi : ' + err.message);
      console.log('Có lỗi server');
    }
  };
  return (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeader}>Đăng ký khoản vay</Text>
            <View style={styles.contentTextInput}>
              <TextInput style={styles.input} value={fullName} />
              <Text style={styles.contentLabel}>Họ và tên</Text>
            </View>
            <View style={styles.contentTextInputTwice}>
              <View style={styles.contentTextInputChild}>
                <TextInput style={styles.input} value={Email} />
                <Text style={styles.contentLabel}>Email</Text>
              </View>
              <View style={styles.contentTextInputChild}>
                <TextInput style={styles.input} value={region} />
                <Text style={styles.contentLabel}>Quốc tịch</Text>
              </View>
            </View>
            {visible && (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{alignSelf: 'center',position: 'absolute',top: '50%'}}
          />
        )}

            <View style={styles.contentTextInputTwice}>
              <View style={styles.contentTextInputChild}>
                <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={loanMoney}
                onChangeText={setLoanMoney}
              />
              <Text style={styles.contentLabel}>Số tiền vay</Text>
              <Text style={styles.contentWarning}>Hạn mức: 15 triệu</Text>
              </View>
              <View style={styles.contentTextInputChild}>
                <TextInput style={styles.input} value={loanDiscription}
                onChangeText={setloanDiscription}/>
                <Text style={styles.contentLabel}>Lí do vay</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => handleNext()}>
              <Text style={styles.buttonNextText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default LoanOfficialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTextInputTwice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'rgb(205, 205, 205)',
    padding: 10,
    width: '100%',
    borderRadius: 20,
    color: 'black',
    fontSize: 16,
  },
  contentWarning: {color: 'red', fontSize: 16},
  contentLabel: {
    color: 'black',
    fontSize: 16,
    position: 'absolute',
    top: '10%',
    left: '10%',
    paddingHorizontal: 3,
    backgroundColor: 'white',
  },
  contentTextInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contentTextInputChild: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '50%',
  },
  contentHeader: {
    textTransform: 'uppercase',
    color: 'rgb(6, 161, 91)',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    height: '60%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  buttonNext: {
    backgroundColor: 'rgb(6, 161, 91)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNextText: {
    fontSize: 16,
    color: 'white',
  },
});
