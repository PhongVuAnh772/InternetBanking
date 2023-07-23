import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const BankingContent = ({desc, icon, navigational}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    // if (desc === 'Chuyển tiền') {
    //   navigation.navigate(navigational);
    // } else if ((desc = 'Tiền gửi')) {
    //   navigation.navigate(navigational);
    // } else if ((desc = 'Thẻ')) {
    //   navigation.navigate(navigational);
    // } else if ((desc = 'Khoản vay')) {
    //   navigation.navigate(navigational);
    // } else if ((desc = 'Đổi quà')) {
    //   navigation.navigate(navigational);
    // }
    navigation.navigate(navigational)
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
