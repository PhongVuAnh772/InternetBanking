import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderAccountPage from '../modules/HeaderAccountPage';
import ContentAccountPage from '../modules/ContentAccountPage';
const AccountMainContainer = () => {
  return (
    <View style={styles.container}>
      <HeaderAccountPage />
      <ContentAccountPage />
    </View>
  );
};

export default AccountMainContainer;

const styles = StyleSheet.create({});
