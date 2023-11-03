import {
  View,
  ImageBackground,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import React, {useEffect, useState} from 'react';
import Header from './Template/Header';
import Content from './Template/Content';
import Footer from './Template/Footer';
import background from '../assets/background2.jpg';
import LoadingScreen from '../screens/LoadingScreen';
const AuthScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [animationValue] = useState(new Animated.Value(0));
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}>
        
          <Header />
          <Content />
          <Footer />

      </ImageBackground>
      <StatusBar hidden />
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
