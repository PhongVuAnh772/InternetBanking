import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderExtended from './HeaderExtended';
import ExtendedContent from './ExtendedContent';
const ExtendedMain = () => {
  return (
    <View style={styles.container}>
      <HeaderExtended />
      <ExtendedContent />
    </View>
  );
};

export default ExtendedMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 246, 245)',
  },
});
