import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const BankingContent = ({desc, icon, navigate}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (desc === 'Chuyển tiền') {
      navigation.navigate('TransferMoney');
    } else if ((desc = 'Tiền gửi')) {
      navigation.navigate('SendingMoney');
    } else if ((desc = 'Thẻ')) {
      navigation.navigate('SendingMoney');
    } else if ((desc = 'Khoản vay')) {
      navigation.navigate('SendingMoney');
    } else if ((desc = 'Đổi quà')) {
      navigation.navigate('SendingMoney');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <Image style={styles.image} source={icon} />
      <Text style={styles.textContainer}>{desc}</Text>
    </TouchableOpacity>
  );
};

export default BankingContent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textContainer: {
    color: 'black',
    fontSize: 15,
    paddingVertical: 10,
  },
  image: {
    height: 50,
    width: 50,
  },
});
