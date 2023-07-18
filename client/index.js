import {AppRegistry} from 'react-native';
import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {loginSlice} from './src/slice/authSlice';
import {name as appName} from './app.json';
import App from './App';
import store from './store/store';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
})

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
