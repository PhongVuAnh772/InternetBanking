import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderSettingExtended from './HeaderSettingExtended';
import {StatusBar} from 'expo-status-bar';
import ContentSettingExtended from './ContentSettingExtended';

const SettingExtended = () => {
  return (
    <View style={styles.container}>
      <HeaderSettingExtended />
      <ContentSettingExtended />
      <StatusBar hidden />
    </View>
  );
};

export default SettingExtended;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
