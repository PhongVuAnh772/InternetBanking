import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LoanTransactionDetails = ({transaction}) => {
  const daysInYear = 365;
  const multiplier = 1.4;
  const originalDate = new Date(transaction.Loan_Start_Date);
  const newDateMilliseconds =
    originalDate.getTime() + daysInYear * multiplier * 24 * 60 * 60 * 1000;
  const newDate = new Date(newDateMilliseconds);
  const newDateStr = newDate.toISOString().slice(0, 10);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textContentTitle}>Ngày giao dịch</Text>
        <Text style={styles.textContent}>{transaction.Loan_Start_Date}</Text>
      </View>

      {transaction.Loan_Amount_Taken > 0 ? (
        <View>
          <Text style={styles.textContentTitle}>Ngày hẹn trả</Text>
          <Text style={styles.textContent}>{newDateStr}</Text>
        </View>
      ) : (
        ''
      )}
      {transaction.Loan_Amount_Taken > 0 ? (
        <View>
          <Text style={styles.textContentTitle}>Lãi suất</Text>
          <Text style={styles.textContent}>
            {transaction.Duration_in_Years}
          </Text>
        </View>
      ) : (
        ''
      )}
      {transaction.Loan_Amount_Taken > 0 ? (
        <Text style={styles.textContentTitle}>Tiền vay</Text>
      ) : (
        <Text style={styles.textContentTitle}>Tiền trả nợ</Text>
      )}
      {transaction.Loan_Amount_Taken > 0 ? (
        <Text style={styles.textContentMoney}>
          {transaction.Loan_Amount_Taken} đ
        </Text>
      ) : (
        <Text style={styles.textContentMoney}>
          {transaction.Loan_Amount_Repaid} đ
        </Text>
      )}

      {transaction.Loan_Amount_Taken > 0 ? (
        <View>
          <Text style={styles.textContentReason}>Lí do vay</Text>
          <Text style={styles.textContentMoney}>{transaction.Loan_Type}</Text>
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    flex: 1
  },
  
  textContent: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  textContentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  textContentMoney: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContentReason: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoanTransactionDetails;
