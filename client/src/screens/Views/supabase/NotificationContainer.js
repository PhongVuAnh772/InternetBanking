import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscountContainer from './Layout/DiscountContainer';
import LetterContainer from './Layout/LetterContainer';
import TransferContainer from './Layout/TransferContainer';
const NotificationContainer = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 13, // Kích thước của chữ
          paddingBottom: 5,
        },
      })}>
      
      <Tab.Screen
        name="LetterContainer"
        component={LetterContainer}
        options={{tabBarLabel: 'Biến động số dư'}}
      />

      <Tab.Screen
        name="TransferContainer"
        component={TransferContainer}
        options={{tabBarLabel: 'Hòm thư'}}
      />
    </Tab.Navigator>
  );
};

export default NotificationContainer;

const styles = StyleSheet.create({});
