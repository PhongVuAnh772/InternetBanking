import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import country from '../../assets/british.png';
import logo from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity>
        <View style={styles.touchableOpacity}>
          <Image source={country} style={styles.country} resizeMode="contain" />
          <Text style={styles.changeLanguage}>EN</Text>
          <Icon name="chevron-right" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 35,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 0.3,
  },
  country: {
    width: 20,
    height: 20,
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: 'gray',
    borderRadius: 25,
  },
  changeLanguage: {
    color: 'white',
    paddingHorizontal: 8,
  },
});
