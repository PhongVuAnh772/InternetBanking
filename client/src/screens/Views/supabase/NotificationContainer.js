import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoanOfficialScreen from './Layout/loanOfficialScreen';
import LoanSuccess from './Layout/LoanSuccess';

const NotificationContainer = () => {
  const Loaning = createStackNavigator()
  return (
    <Loaning.Navigator screenOptions={{headerShown: false}}>
      <Loaning.Screen
        name="LoanOfficialScreen"
        component={LoanOfficialScreen}
      />
      <Loaning.Screen
        name="LoanSuccess"
        component={LoanSuccess}
      />
    </Loaning.Navigator>
  );
};

export default NotificationContainer;

const styles = StyleSheet.create({});
