import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountMainContainer from './screens/AccountMainContainer';
import AccountQR from './screens/AccountQR';
const AccountStack = createStackNavigator();

const AccountPage = () => {
  return (
    <AccountStack.Navigator screenOptions={{headerShown: false}}>
      <AccountStack.Screen
        name="AccountMainContainer"
        component={AccountMainContainer}
      />

      <AccountStack.Screen name="AccountQR" component={AccountQR} />
    </AccountStack.Navigator>
  );
};

export default AccountPage;
