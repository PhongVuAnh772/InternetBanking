import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExtendedMain from './Layout/ExtendedMain';

const ExtendedStack = createStackNavigator();

const ExtendedContainer = () => {
  return (
    <ExtendedStack.Navigator screenOptions={{headerShown: false}}>
      <ExtendedStack.Screen name="ExtendedMain" component={ExtendedMain} />
    </ExtendedStack.Navigator>
  );
};

export default ExtendedContainer;
