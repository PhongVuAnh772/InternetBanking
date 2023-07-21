import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { useAppDispatch,useAppSelector } from '../../../../app/hooks/hooks';
import { setLogin,setToken } from '../../../../slice/authSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const HeaderExtended = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const loginCheck = useAppSelector(state => state.login.loggedIn)
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Bạn đã đăng xuất, hẹn gặp lại 👋',
    });
  };
  const handleLogout = () => {
    dispatch(setLogin(false))
    
  showToast()
    dispatch(setToken(''))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mở rộng</Text>
      <TouchableOpacity style={styles.touchable} onPress={() => handleLogout()}>
        <Text style={styles.textTouchable}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderExtended;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    color: 'black',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 50,

    fontSize: 15,
    fontWeight: '500',
  },
  textTouchable: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
});
