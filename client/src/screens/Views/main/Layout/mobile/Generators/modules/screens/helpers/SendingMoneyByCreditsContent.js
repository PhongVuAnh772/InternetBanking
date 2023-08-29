import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks/hooks';

import axios from 'axios';

const ContentSendingMoney = () => {
  
  const navigation = useNavigation();
  
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerMoneyInfo}>
          <Text style={styles.textheaderMoneyInfo}>Tài khoản thẻ</Text>
        </View>
        <View style={styles.contentMoneyInfo}>
          <View style={styles.contentIcon}>
            <FontAwesome name="credit-card" size={20} color="rgb(0, 173, 83)" />
          </View>
          <View style={styles.contentMoneyDes}>
            <Text style={styles.moneyValueSpecified}>
              <Text style={styles.moneyValueSpecifiedCurrency}>đ</Text>
            </Text>
            <View style={styles.accountInfoDemo}>
              <Text style={styles.moneyValue}>Normal Account</Text>
              <Text style={styles.separate}>|</Text>
              <Text style={styles.moneyValue}>{account}</Text>
            </View>
          </View>
          <View style={styles.contentIcon}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#909a9c" />
          </View>
        </View>
      </View>

      <View style={styles.contentSendingMoneyBank}>
        <View style={styles.headerMoneyInfo}>
          <Text style={styles.textheaderMoneyInfo}>Thông tin người nhận</Text>
        </View>
        <View style={styles.contentMoneyInfo}>
          <View style={styles.contentMoneyDes}>
            
            <View style={styles.contentSTKInfoInput}>
              <TextInput
                style={styles.inputSTK}
                placeholder="Số tài khoản/iNick"
                placeholderTextColor="rgb(145, 154, 156)"                
                onBlur={() => {
                  fetchDataUserSTK();
                }}
              />
              <FontAwesome name="id-card-o" size={20} color="rgb(0, 173, 83)" />
            </View>
            {/* {messageError} */}
            <View style={styles.contentSTKInfoInput}>
              <TextInput
                style={styles.inputSTK}
                placeholder="Tên người dùng"
                placeholderTextColor="rgb(145, 154, 156)"
              />
              <FontAwesome
                name="street-view"
                size={20}
                color="rgb(0, 173, 83)"
              />
            </View>
            <View style={styles.contentSTKInfoInput}>
              <TextInput
                style={styles.inputSTKValue}
                placeholder="0"
                placeholderTextColor="rgb(141, 152, 154)"
                keyboardType="number-pad"
              />
              <Text style={styles.inputSTKValueCurrencySpecified}>đ</Text>
            </View>
            <View style={styles.contentSTKInfoInputOther}>
              <TextInput
                style={styles.inputSTK}
                placeholder="Nội dung (Không bắt buộc)"
                placeholderTextColor="rgb(145, 154, 156)"
              />
              <View style={styles.contentSTKInfoInputOtherCounting}>
                <FontAwesome
                  name="envelope-open"
                  size={20}
                  color="rgb(0, 173, 83)"
                  style={{transform: [{rotate: '18deg'}]}}
                />
                <Text style={styles.contentSTKInfoInputOtherCountingSpecified}>
                  {characterCount}/160
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.buttonFooter}
          onPress={() => handleContinue()}>
          <Text style={styles.buttonFooterText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      
    </>
  );
};

export default ContentSendingMoney;

const styles = StyleSheet.create({
  container: {},
  headerMoneyInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgb(244, 245, 246)',
    borderBottomColor: 'rgb(244, 245, 246)',
  },
  contentMoneyInfo: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentIcon: {
    flex: 1,
  },
  contentSTKInfoInput: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textheaderMoneyInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  accountInfoDemo: {flexDirection: 'row'},
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separate: {
    paddingHorizontal: 5,
    fontSize: 15,
    color: '#909a9c',
  },
  contentMoneyDes: {
    flex: 1,
    paddingHorizontal: 5,
  },
  moneyValue: {
    fontSize: 18,
    color: '#909a9c',
  },
  moneyValueSpecified: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  inputSTK: {
    fontSize: 20,
    color: 'black',
  },
  contentIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  moneyValueSpecifiedCurrency: {
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
  },
  contentSendingMoneyBank: {
    marginVertical: 20,
  },
  inputSTKValue: {
    fontSize: 50,
    color: 'black',
  },
  moneyValueBank: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  },
  inputSTKValueCurrencySpecified: {
    color: 'rgb(146, 156, 157)',
    fontSize: 24,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '500',
    textDecorationLine: 'underline',
    borderColor: 'rgb(235, 241, 242)',
  },
  contentSTKInfoInputOther: {
    paddingTop: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSTKInfoInputOtherCounting: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSTKInfoInputOtherCountingSpecified: {
    color: 'rgb(170, 176, 179)',
    paddingTop: 5,
  },
  footerContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    marginVertical: 5,
  },
  buttonFooter: {
    backgroundColor: 'rgb(0, 173, 83)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooterText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  centeredView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '99%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  textTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputSearchSpecified: {
    width: '100%',
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
    height: 40,
    paddingLeft: 35,
  },
  inputSearch: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 22,
    left: 15,
  },
  otherBankName: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 10,
  },
  // otherBankContainer: {
  //   width: '100%',
  // },
  bankLogo: {
    height: 50,
    width: 50,
  },
  otherBankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(253, 255, 252)',
  },
});
