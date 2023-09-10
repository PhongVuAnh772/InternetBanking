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
import DepositMoney from './Layout/mobile/Generators/DepositMoney';
import ConfirmInformationTransferCreditWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-credit/ConfirmInformationTransferCreditWrap';
import ConfirmInformationInternalWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-internal/ConfirmInformationTransferInternalWrap';
import SuccessTransferInternalWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-internal/success/SuccessTransferInternalWrap';
import SuccessTransferCreditWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-credit/success/SuccessTransferCreditWrap';
import OTPCheckingInternalWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-internal/auth/OTPCheckingInternalWrap';
import OTPCheckingCreditWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-credit/auth/OTPCheckingCreditWrap';
import OTPCreditWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-credit/OTP/OTPCreditWrap';
import OTPInternalWrap from './Layout/mobile/Generators/modules/screens/helpers/transfer-internal/OTP/OTPInternalWrap';
import StockMainView from '../tasks/StockMainView';
import TicketMain from './Layout/mobile/ticket/TicketMain';
const MainStack = createStackNavigator();

const MainPage = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="MainIndex" component={MainIndex} />
      <MainStack.Screen
        name="TransferMoney"
        component={TransferMoney}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      />
      <MainStack.Screen
        name="TicketMain"
        component={TicketMain}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      />
      <MainStack.Screen
        name="StockMainView"
        component={StockMainView}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
      />
      <MainStack.Screen
        name="OTPScreen"
        component={OTPScreenWrap}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
        }}
      />
      <MainStack.Screen name="OTPInternalWrap" component={OTPInternalWrap} />
      <MainStack.Screen name="OTPCreditWrap" component={OTPCreditWrap} />
      <MainStack.Screen
        name="ConfirmInformationSendingWrap"
        component={ConfirmInformationSendingWrap}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_right',
        }}
      />
      <MainStack.Screen
        name="OTPCheckingCreditWrap"
        component={OTPCheckingCreditWrap}
      />
      <MainStack.Screen
        name="OTPCheckingInternalWrap"
        component={OTPCheckingInternalWrap}
      />
      <MainStack.Screen name="OTPCheckingWrap" component={OTPCheckingWrap} />
      <MainStack.Screen
        name="SuccessingTransferWrap"
        component={SuccessingTransferWrap}
      />
      <MainStack.Screen
        name="SuccessTransferCreditWrap"
        component={SuccessTransferCreditWrap}
      />
      <MainStack.Screen
        name="SuccessTransferInternalWrap"
        component={SuccessTransferInternalWrap}
      />
      <MainStack.Screen name="SendingMoney" component={SendingMoney} />
      <MainStack.Screen name="DepositMoney" component={DepositMoney} />
      <MainStack.Screen
        name="SendingMoneyByCredits"
        component={SendingMoneyByCredits}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          animation: 'slide_from_bottom',
        }}
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
      <MainStack.Screen
        name="ConfirmInformationTransferCreditWrap"
        component={ConfirmInformationTransferCreditWrap}
      />
      <MainStack.Screen
        name="ConfirmInformationInternalWrap"
        component={ConfirmInformationInternalWrap}
      />
    </MainStack.Navigator>
  );
};

export default MainPage;
