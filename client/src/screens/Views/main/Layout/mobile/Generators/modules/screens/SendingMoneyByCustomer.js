import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SendingMoneyByCustomerHeader from './helpers/SendingMoneyByCustomerHeader';
import SendingMoneyByCustomerContent from './helpers/SendingMoneyByCustomerContent';

const SendingMoneyByCustomer = () => {
  return (
    <View style={styles.container}>
      <SendingMoneyByCustomerHeader />
      <SendingMoneyByCustomerContent />
    </View>
  );
};

export default SendingMoneyByCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
