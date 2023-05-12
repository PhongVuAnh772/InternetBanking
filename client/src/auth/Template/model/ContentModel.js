import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AccountPurschase from '../../Container/components/Shaders/AccountPurschase';
import {useNavigation} from '@react-navigation/native';

const ContentModel = ({title, name, icon}) => {
  const navigation = useNavigation();
  const handleTouch = () => {
    if (title === 'Gọi hỗ trợ 24/7') {
      Linking.openURL(`tel:${1900545415}`);
    } else if (title === 'Cổng chăm sóc khách hàng') {
      Linking.openURL('https://cskh.vpbank.com.vn/');
    } else if (title === 'Đặt lịch giao dịch tại quầy/chi nhánh') {
      Linking.openURL('https://bookingonline.vpbank.com.vn/booking');
    } else if (title === 'Tài khoản thanh toán') {
      navigation.navigate('AccountPurschase');
    } else if (title === 'Thẻ tín dụng') {
      navigation.navigate('');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleTouch}>
      {icon ? (
        <Icon name={icon} size={20} style={styles.icon} color="green" />
      ) : (
        <Image source={name} style={styles.image} />
      )}

      <Text style={styles.text}>{title}</Text>
      <Icons name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default ContentModel;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {color: 'black', fontSize: 16, textAlign: 'left', paddingTop: 2},
  image: {
    height: 30,
    width: 30,
  },
});
