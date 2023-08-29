import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const SuccessShippingCard = () => {
    const navigation = useNavigation()
    const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Đặt thẻ thành công',
    });
  };
  useEffect(() => {

    const timer = setTimeout(() => {
      showToast();
      navigation.navigate('AccountMainContainer'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: 80, height: 80, marginTop: 20, borderRadius: 10 }}
        source={require('../../../../../../../assets/shipping.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>Đặt giao thẻ thành công</Text>
    </View>
  );
};

export default SuccessShippingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
