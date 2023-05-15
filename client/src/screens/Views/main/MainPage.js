import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdvertiseMent from './Layout/mobile/Generators/AdvertiseMent';
import MainIndex from './Layout/MainIndex';
import AdvertiseMentSpecified from './Layout/mobile/Generators/modules/AdvertiseMentSpecified';
const MainStack = createStackNavigator();

const MainPage = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="MainIndex" component={MainIndex} />

      <MainStack.Screen name="AdvertiseMent" component={AdvertiseMent} />
      <MainStack.Screen
        name="AdvertiseMentSpecified"
        component={AdvertiseMentSpecified}
      />
    </MainStack.Navigator>
  );
};

export default MainPage;
