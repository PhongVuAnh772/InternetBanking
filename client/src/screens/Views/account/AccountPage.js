import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountMainContainer from './screens/AccountMainContainer';
import AccountQR from './screens/AccountQR';
import QRgenerator from '../../Videos/code/QRgenerator';
import CVVScreen from './modules/Layout/Tasks/CVVScreen';
import HistoryTransfer from './modules/Layout/Tasks/HistoryTransfer';
import PhysicalCardScreen from './modules/Layout/Tasks/PhysicalCardScreen';
import OTPCheckingWrap from '../../../auth/Template/Interface/tasks/OTPChecking/OTPCheckingWrap';
import OTPScreenWrap from '../../../auth/Template/Interface/tasks/OTP/OTPScreenWrap';
import OTPChangingWrap from '../../../auth/Template/Interface/tasks/Shaders/OTPChanging/OTPChangingWrap';
import OTPCheckingChangeWrap from '../../../auth/Template/Interface/tasks/Shaders/OTPCheckingChange/OTPCheckingChangeWrap';
import AddressSendCard from './modules/Layout/Tasks/Layout/AddressSendCard';
import UsingCardSafety from './screens/UsingCardSafety';

const AccountStack = createStackNavigator();

const AccountPage = () => {
  return (
    <AccountStack.Navigator screenOptions={{headerShown: false}}>
      <AccountStack.Screen
        name="AccountMainContainer"
        component={AccountMainContainer}
      />

      <AccountStack.Screen name="OTPScreen" component={OTPScreenWrap} />
      <AccountStack.Screen name="CVVScreen" component={CVVScreen} />
      <AccountStack.Screen name="HistoryTransfer" component={HistoryTransfer} />
      <AccountStack.Screen
        name="PhysicalCardScreen"
        component={PhysicalCardScreen}
      />
      <AccountStack.Screen
        name="QRgenerator"
        component={QRgenerator}
      />
      <AccountStack.Screen
        name="OTPCheckingChangeWrap"
        component={OTPCheckingChangeWrap}
      />
      <AccountStack.Screen name="OTPChangingWrap" component={OTPChangingWrap} />
      <AccountStack.Screen name="AddressSendCard" component={AddressSendCard} />
      <AccountStack.Screen name="OTPCheckingWrap" component={OTPCheckingWrap} />
      <AccountStack.Screen name="UsingCardSafety" component={UsingCardSafety} />
    </AccountStack.Navigator>
  );
};

export default AccountPage;
