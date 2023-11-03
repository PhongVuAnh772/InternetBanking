import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const HeaderAccountPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', paddingLeft: 20}}>
        <Text style={styles.Text}>Tài khoản</Text>
      </View>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('QRgenerator')}
        style={styles.touchableOpacity}>
        <MaterialIcons
          name="account-balance-wallet"
          size={20}
          color="rgb(64, 132, 96)"
        />
        <Text style={styles.textTouchableOpacity}>Mã QR</Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default HeaderAccountPage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
    paddingLeft: 50
  },
  textTouchableOpacity: {
    paddingLeft: 5,
    color: 'rgb(64, 132, 96)',
    fontSize: 15,
  },
});
