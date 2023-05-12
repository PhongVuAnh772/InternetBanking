import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import background from '../assets/banner-original.jpg';
const LoadingScreen = () => {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}></ImageBackground>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  image: {flex: 1},
});
