import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AccountPage from './Views/account/AccountPage';
import MainPage from './Views/main/MainPage';
import NotificationContainer from './Views/supabase/NotificationContainer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExtendedContainer from './Views/tasks/ExtendedContainer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QrCodeContainer from './Videos/QrCodeContainer';
import FastImage from 'react-native-fast-image';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 13, // Kích thước của chữ
          paddingBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'AccountPage') {
            iconName = focused ? 'credit-card' : 'credit-card';
            color = focused ? 'green' : 'gray';
          } else if (route.name === 'MainPage') {
            iconName = focused ? 'bar-chart' : 'bar-chart';
            color = focused ? 'green' : 'gray';
          } else if (route.name === 'ExtendedContainer') {
            iconName = focused ? 'more-horiz' : 'more-horiz';
            color = focused ? 'green' : 'gray';
          } else if (route.name === 'NotificationContainer') {
            iconName = focused ? 'notifications-none' : 'notifications-none';
            color = focused ? 'green' : 'gray';
          }

          return <MaterialIcons name={iconName} size={25} color={color} />;
        },
      })}>
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{tabBarLabel: 'Trang chủ'}}
      />
      <Tab.Screen
        name="AccountPage"
        component={AccountPage}
        options={{tabBarLabel: 'Tài khoản'}}
      />

      <Tab.Screen
        name="QrCodeContainer"
        component={QrCodeContainer}
        options={{
          tabBarVisible: false,
          tabBarLabel: '',
          tabBarIcon: () => {
            return (
              <FastImage
                style={{width: 45, height: 45, marginTop: 20, borderRadius: 10}}
                source={require('../assets/output-onlinegiftools.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="NotificationContainer"
        component={NotificationContainer}
        options={{tabBarLabel: 'Thông báo'}}
      />
      <Tab.Screen
        name="ExtendedContainer"
        component={ExtendedContainer}
        options={{tabBarLabel: 'Mở rộng'}}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
