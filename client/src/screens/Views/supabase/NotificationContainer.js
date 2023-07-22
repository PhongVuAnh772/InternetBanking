import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoanOfficialScreen from './Layout/loanOfficialScreen';
import LoanSuccess from './Layout/LoanSuccess';
import LoanGreeting from './Layout/LoanGreeting';
import LoanOverview from './Layout/LoanOverview';
import LoanRepaid from './Layout/LoanRepaid';

const NotificationContainer = () => {
  const Loaning = createStackNavigator()
  return (
    <Loaning.Navigator screenOptions={{headerShown: false}}>
      <Loaning.Screen
        name="LoanGreeting"
        component={LoanGreeting}
      />
      <Loaning.Screen
        name="LoanSuccess"
        component={LoanSuccess}
      />
      <Loaning.Screen
        name="LoanOfficialScreen"
        component={LoanOfficialScreen}
      />
      
      
      <Loaning.Screen
        name="LoanOverview"
        component={LoanOverview}
      />
      <Loaning.Screen
        name="LoanRepaid"
        component={LoanRepaid}
      />
    </Loaning.Navigator>
  );
};

export default NotificationContainer;

const styles = StyleSheet.create({});
