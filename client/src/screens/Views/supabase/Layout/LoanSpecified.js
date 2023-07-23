import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  LinearGradient,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import pigLoan from '../../../../assets/investment.png';
import {useNavigation} from '@react-navigation/native';
import background from '../../../../assets/greetingLoan.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import {setLoanRepaidTotal, setLoanTotal} from '../../../../slice/loanSlice';
import LoanTransactionDetails from './Tasks/LoanTransactionDetails';

const LoanSpecified = () => {
  const [loanData, setLoanData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const CMNDUser = useAppSelector(state => state.signUp.personalIdNumber);
  const dispatch = useAppDispatch();
  const handlePress = async () => {
    setIsLoading(true);
    try {
      const ress = await axios.post(`http://192.168.100.6:5000/api/getLoan`, {
        CMNDUser: CMNDUser,
      });
      if (ress.data.success === true) {
        const totalLoanAmountTaken = ress.data.data.loanData.reduce(
          (total, loan) => {
            return total + parseFloat(loan.Loan_Amount_Taken);
          },
          0,
        );

        const totalLoanAmountRepaid = ress.data.data.loanData.reduce(
          (total, loan) => {
            return total + parseFloat(loan.Loan_Amount_Repaid);
          },
          0,
        );
        if (totalLoanAmountRepaid && totalLoanAmountTaken) {
          dispatch(setLoanRepaidTotal(totalLoanAmountRepaid));
          dispatch(setLoanTotal(totalLoanAmountTaken));
          setLoanData(ress.data.data.loanData);
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  console.log(loanData);

  useEffect(() => {
    handlePress();

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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
          <Text style={styles.Text}>Lịch sử nợ và trả tiền</Text>
        </View>
      </View>

      <ScrollView style={styles.SpecifiedContent}>
        <View style={styles.SpecifiedTotalContainer}></View>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{paddingVertical: 15}}
          />
        )}
        {loanData.map(transaction => (
          <LoanTransactionDetails
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LoanSpecified;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  SpecifiedContent: {
  }
});
