import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderSignUp from './Container/HeaderSignUp';
import ContentSignUp from './Container/ContentSignUp';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <HeaderSignUp />
      <ContentSignUp />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
