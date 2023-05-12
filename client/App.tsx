import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/auth/AuthScreen';
import GoogleMap from './src/auth/Template/Interface/GoogleMap';
import SignUp from './src/auth/SignUp';
import AccountPurschase from './src/auth/Container/components/Shaders/AccountPurschase';
import SignUpNumberScreen from './src/screens/Layout/SignUpNumberScreen';
import SecondSignUpNumberScreen from './src/screens/Layout/SecondSignUpNumberScreen';
import ThirdSignUpNumberScreen from './src/screens/Layout/ThirdSignUpNumberScreen';
import FourthSignUpNumberScreen from './src/screens/Layout/FourthSignUpNumberScreen';
import FifthSignUpNumberScreen from './src/screens/Layout/FifthSignUpNumberScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              // initialParams={{isSignIn, setIsLoggedIn}}
            />
            <Stack.Screen
              name="GoogleMaps"
              component={GoogleMap}
              // initialParams={{isSignIn, setIsLoggedIn}}
            />
            <Stack.Screen
              name="Registered"
              component={SignUp}
              // initialParams={{isSignIn, setIsLoggedIn}}
            />
            <Stack.Screen
              name="SignUpNumberScreen"
              component={SignUpNumberScreen}
            />
            <Stack.Screen
              name="SecondSignUpNumberScreen"
              component={SecondSignUpNumberScreen}
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
              name="FifthSignUpNumberScreen"
              component={FifthSignUpNumberScreen}
            />
            <Stack.Screen
              name="AccountPurschase"
              component={AccountPurschase}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
