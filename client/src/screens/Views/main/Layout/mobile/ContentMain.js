import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import ContentMainIcon from './Generators/ContentMain';
import SwiperComponent from './Generators/SwiperComponent';
import AdvertiseMent from './Generators/AdvertiseMent';
const ContentMain = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ContentMainIcon />
      <SwiperComponent />
      <AdvertiseMent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default ContentMain;
