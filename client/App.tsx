import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/auth/AuthScreen';
import GoogleMap from './src/auth/Template/Interface/GoogleMap';
import SignUp from './src/auth/SignUp';
import AccountPurschase from './src/auth/Container/components/Shaders/AccountPurschase';
import SignUpNumberScreen from './src/screens/Layout/SignUpNumberScreen';
import SecondSignUpNumberScreen from './src/screens/Layout/SecondSignUpNumberScreen';
import ThirdSignUpNumberScreen from './src/screens/Layout/ThirdSignUpNumberScreen';
import FourthSignUpNumberScreen from './src/screens/Layout/FourthSignUpNumberScreen';
import {useAppSelector, useAppDispatch} from './src/app/hooks/hooks';
import ForgotPasswordScreen from './src/auth/Template/Interface/ForgotPasswordScreen';
import {NetworkInfo} from 'react-native-network-info';
import messaging from '@react-native-firebase/messaging';
import {setfirebaseToken} from './src/slice/allTokenSlice';
import BonusContinueSignUpNumberScreen from './src/screens/Layout/BonusContinueSignUpNumberScreen';
import ConfirmCheckMicroBlink from './src/screens/Layout/ConfirmCheckMicroBlink';
import CongratulationConfirm from './src/screens/Layout/CongratulationConfirm';
import LastSuccessSignUpScreen from './src/screens/Layout/LastSuccessSignUpScreen';
import PassChange from './src/auth/Template/Interface/tasks/Pass/PassChange';
import { setLogin } from './src/slice/authSlice';

import Toast from 'react-native-toast-message';

// import {selectCount} from './src/slice/createSlice';

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.login.loggedIn);
  const ipv4Address = useAppSelector(state => state.network.ipv4Address);
  const tokenFirebaseValue = useAppSelector(
    state => state.allToken.firebaseToken,
  );

  const getcmToken = async () => {
    if (!tokenFirebaseValue) {
      try {
        const token = await messaging().getToken();
        if (token) {
          dispatch(setfirebaseToken(token));
          console.log(tokenFirebaseValue);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  console.log(tokenFirebaseValue);
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getcmToken();
    }
    console.log(enabled);
  };
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loggedIn ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="GoogleMaps" component={GoogleMap} />
              <Stack.Screen name="Registered" component={SignUp} />
              <Stack.Screen
                name="SignUpNumberScreen"
                component={SignUpNumberScreen}
              />

              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen
                name="PassChange"
                component={PassChange}
              />
              <Stack.Screen
                name="SecondSignUpNumberScreen"
                component={SecondSignUpNumberScreen}
              />

              <Stack.Screen
                name="CongratulationConfirm"
                component={CongratulationConfirm}
              />
              <Stack.Screen
                name="ThirdSignUpNumberScreen"
                component={ThirdSignUpNumberScreen}
              />
              <Stack.Screen
                name="FourthSignUpNumberScreen"
                component={FourthSignUpNumberScreen}
              />
              <Stack.Screen
                name="BonusContinueSignUpNumberScreen"
                component={BonusContinueSignUpNumberScreen}
              />

              <Stack.Screen
                name="AccountPurschase"
                component={AccountPurschase}
              />
              <Stack.Screen
                name="ConfirmCheckMicroBlink"
                component={ConfirmCheckMicroBlink}
              />
              <Stack.Screen
                name="LastSuccessSignUpScreen"
                component={LastSuccessSignUpScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
