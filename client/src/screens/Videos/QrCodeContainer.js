import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountQR from '../Views/account/screens/AccountQR';
import QRscanner from './code/QRscanner';
const QrStack = createStackNavigator();

const QrCodeContainer = () => {
  return (
    <QrStack.Navigator screenOptions={{headerShown: false}}>
      <QrStack.Screen name="QrCodeMain" component={QRscanner} />

      <QrStack.Screen name="AccountQR" component={AccountQR} />
    </QrStack.Navigator>
  );
};

export default QrCodeContainer;
