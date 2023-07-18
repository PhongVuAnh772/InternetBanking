import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingExtended from './tasks/SettingExtended';
import ContentSettingExtended from './tasks/ContentSettingExtended';

const SettingExtendedContainerStack = createStackNavigator();

const SettingExtendedContainer = () => {
  return (
    <SettingExtendedContainerStack.Navigator
      screenOptions={{headerShown: false}}>
      <SettingExtendedContainerStack.Screen
        name="SettingExtended"
        component={SettingExtended}
      />
      <SettingExtendedContainerStack.Screen
        name="ContentSettingExtended"
        component={ContentSettingExtended}
      />
    </SettingExtendedContainerStack.Navigator>
  );
};

export default SettingExtendedContainer;
