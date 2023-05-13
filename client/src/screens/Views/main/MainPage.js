import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdvertiseMent from './Layout/AdvertiseMent';
const MainStack = createStackNavigator();

const MainPage = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="AdvertiseMent" component={AdvertiseMent} />
    </MainStack.Navigator>
  );
};

export default MainPage;
