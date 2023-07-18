import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ForgotContent from './tasks/ForgotContent';
import ForgotHeader from './tasks/ForgotHeader';

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <ForgotHeader />
      <ForgotContent />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
