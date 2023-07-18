import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderSendingMoney from './Layout/HeaderSendingMoney';
import ContentSendingMoney from './Layout/ContentSendingMoney';

const SendingMoney = () => {
  return (
    <View style={styles.container}>
      <HeaderSendingMoney />
      <ContentSendingMoney />
    </View>
  );
};

export default SendingMoney;

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
