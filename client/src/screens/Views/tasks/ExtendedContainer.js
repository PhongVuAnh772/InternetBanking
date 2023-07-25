import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExtendedMain from './Layout/ExtendedMain';
import SettingExtendedContainer from './Layout/screens/SettingExtendedContainer';
import GoogleMap from '../../../auth/Template/Interface/GoogleMap';
import UserInformationSpecified from './Layout/screens/tasks/components/UserInformationSpecified';
import CurrencyScreen from './Layout/Unity/CurrencyScreen';

const ExtendedStack = createStackNavigator();

const ExtendedContainer = () => {
  return (
    <ExtendedStack.Navigator screenOptions={{headerShown: false}}>
      <ExtendedStack.Screen name="ExtendedMain" component={ExtendedMain} />
      <ExtendedStack.Screen
        name="SettingExtendedContainer"
        component={SettingExtendedContainer}
      />
      <ExtendedStack.Screen name="GoogleMap" component={GoogleMap} />
      <ExtendedStack.Screen name="CurrencyScreen" component={CurrencyScreen} />
      <ExtendedStack.Screen name="UserInformationSpecified" component={UserInformationSpecified} />
    </ExtendedStack.Navigator>
  );
};

export default ExtendedContainer;
