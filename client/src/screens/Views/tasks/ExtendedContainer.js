import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExtendedMain from './Layout/ExtendedMain';
import SettingExtended from './Layout/screens/SettingExtended';

const ExtendedStack = createStackNavigator();

const ExtendedContainer = () => {
  return (
    <ExtendedStack.Navigator screenOptions={{headerShown: false}}>
      <ExtendedStack.Screen name="ExtendedMain" component={ExtendedMain} />
      <ExtendedStack.Screen
        name="SettingExtended"
        component={SettingExtended}
      />
    </ExtendedStack.Navigator>
  );
};

export default ExtendedContainer;
