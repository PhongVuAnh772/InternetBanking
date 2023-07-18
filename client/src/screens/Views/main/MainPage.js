import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdvertiseMent from './Layout/mobile/Generators/AdvertiseMent';
import MainIndex from './Layout/MainIndex';
import AdvertiseMentSpecified from './Layout/mobile/Generators/modules/AdvertiseMentSpecified';
import TransferMoney from './Layout/mobile/Generators/modules/screens/TransferMoney';
import SendingMoney from './Layout/mobile/Generators/modules/screens/SendingMoney';
import SendingGift from './Layout/mobile/Generators/modules/screens/SendingGift';
import SendingMoneyByCredits from './Layout/mobile/Generators/modules/screens/SendingMoneyByCredits';
import SendingMoneyOrderCalendar from './Layout/mobile/Generators/modules/screens/SendingMoneyOrderCalendar';
import SendingMoneyByCustomer from './Layout/mobile/Generators/modules/screens/SendingMoneyByCustomer';
import ListOfTransfer from './Layout/mobile/Generators/modules/screens/ListOfTransfer';
import OTPScreenWrap from './Layout/mobile/Generators/modules/screens/Layout/tasks/OTPScreenWrap';
import ConfirmInformationSendingWrap from './Layout/mobile/Generators/modules/screens/Layout/services/ConfirmInformationSendingWrap';
import OTPCheckingWrap from './Layout/mobile/Generators/modules/screens/Layout/auth/OTPCheckingWrap';
import SuccessingTransferWrap from './Layout/mobile/Generators/modules/screens/Layout/Success/SuccessingTransferWrap';

const MainStack = createStackNavigator();

const MainPage = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="MainIndex" component={MainIndex} />
      <MainStack.Screen name="TransferMoney" component={TransferMoney} />
      <MainStack.Screen name="OTPScreen" component={OTPScreenWrap} />
      <MainStack.Screen name="ConfirmInformationSendingWrap" component={ConfirmInformationSendingWrap} />
      <MainStack.Screen name="OTPCheckingWrap" component={OTPCheckingWrap} />
      <MainStack.Screen name="SuccessingTransferWrap" component={SuccessingTransferWrap} />
      <MainStack.Screen name="SendingMoney" component={SendingMoney} />
      <MainStack.Screen
        name="SendingMoneyByCredits"
        component={SendingMoneyByCredits}
      />
      <MainStack.Screen
        name="AdvertiseMentSpecified"
        component={AdvertiseMentSpecified}
      />
      <MainStack.Screen
        name="SendingMoneyByCustomer"
        component={SendingMoneyByCustomer}
      />
      <MainStack.Screen name="ListOfTransfer" component={ListOfTransfer} />
      <MainStack.Screen
        name="SendingMoneyOrderCalendar"
        component={SendingMoneyOrderCalendar}
      />
      <MainStack.Screen name="SendingGift" component={SendingGift} />
    </MainStack.Navigator>
  );
};

export default MainPage;
