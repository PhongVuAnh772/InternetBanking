import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  LinearGradient,
} from 'react-native';
import React from 'react';
import pigLoan from '../../../../assets/investment.png';
import {useNavigation} from '@react-navigation/native';
import background from '../../../../assets/greetingLoan.jpg';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import { setLoanRepaidTotal,setLoanTotal } from '../../../../slice/loanSlice';

const LoanGreeting = () => {
  const navigation = useNavigation();
  const CMNDUser = useAppSelector(state => state.signUp.personalIdNumber);
  const dispatch = useAppDispatch()
  const handlePress = async () => {
    try {
      const ress = await axios.post(`http://192.168.100.6:5000/api/getLoan`, {
        CMNDUser: CMNDUser,
      });
      if (ress.data.success === true) {
        console.log(ress.data.data.loanData);
        const totalLoanAmountTaken = ress.data.data.loanData.reduce((total, loan) => {
          return total + parseFloat(loan.Loan_Amount_Taken);
        }, 0);

        const totalLoanAmountRepaid = ress.data.data.loanData.reduce((total, loan) => {
          return total + parseFloat(loan.Loan_Amount_Repaid);
        }, 0);
        if (totalLoanAmountRepaid && totalLoanAmountTaken) {
        console.log(totalLoanAmountTaken, totalLoanAmountRepaid)
        dispatch(setLoanRepaidTotal(totalLoanAmountRepaid))
        dispatch(setLoanTotal(totalLoanAmountTaken))
        navigation.navigate('LoanOverview');

        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={background}
      resizeMode="cover">
      <Text style={styles.LoanGreetingHeader}>Chào mừng bạn đến</Text>
      <Text style={styles.LoanGreetingHeaderBold}>
        Hệ thống cho vay của VPBank
      </Text>
      <Image source={pigLoan} style={styles.Image} />
      <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LoanGreeting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoanGreetingHeaderBold: {
    fontSize: 30,
    color: 'rgb(6, 161, 91)',
    fontWeight: 'bold',
  },
  LoanGreetingHeader: {
    fontSize: 20,
    color: 'pink',
    paddingVertical: 15,
  },
  Image: {
    width: '60%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    width: '70%',
    backgroundColor: 'rgb(6, 161, 91)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
});
