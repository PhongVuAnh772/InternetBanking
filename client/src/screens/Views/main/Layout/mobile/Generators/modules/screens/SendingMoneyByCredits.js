import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SendingMoneyByCreditsHeader from './helpers/SendingMoneyByCreditsHeader';
import SendingMoneyByCreditsContent from './helpers/SendingMoneyByCreditsContent';


const SendingMoneyByCredits = () => {
  return (
    <View style={styles.container}>
      <SendingMoneyByCreditsHeader />
      <SendingMoneyByCreditsContent />
    </View>
  );
};

export default SendingMoneyByCredits;

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
