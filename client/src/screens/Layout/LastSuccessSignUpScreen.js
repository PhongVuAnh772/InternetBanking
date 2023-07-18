import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../app/hooks/hooks';
import { setLogin } from '../../slice/authSlice';

const LastSuccessSignUpScreen = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
  useEffect(() => {

    const timer = setTimeout(() => {
        dispatch(setLogin(true));
      navigation.navigate('Home'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={{ width: 80, height: 80, marginTop: 20, borderRadius: 10 }}
        source={require('../../assets/animation_lk52qweb_small.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>Chúc mừng đăng ký thành công</Text>
    </View>
  );
};

export default LastSuccessSignUpScreen;

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
