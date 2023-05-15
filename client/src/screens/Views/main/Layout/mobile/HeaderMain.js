import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import banner from '../../../../../assets/main-page/background.jpg';

const HeaderMain = () => {
  return (
    <>
      {/* <ScrollView> */}
      <View style={styles.container}>
        <Image style={styles.poster} source={banner} />
      </View>
      {/* </ScrollView> */}
    </>
  );
};

export default HeaderMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  poster: {
    width: '100%',
    height: '60%',
  },
});
