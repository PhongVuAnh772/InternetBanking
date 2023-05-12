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
const AuthScreen = () => {
  const [loading, setLoading] = useState(true);
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => setLoading(false));
  }, [animationValue]);
  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateX: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0],
                  }),
                },
              ],
            },
          ]}>
          <Header />
          <Content />
          <Footer />
        </Animated.View>
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
