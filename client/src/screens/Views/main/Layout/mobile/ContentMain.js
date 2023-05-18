import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import ContentMainIcon from './Generators/ContentMain';
import SwiperComponent from './Generators/SwiperComponent';
import AdvertiseMent from './Generators/AdvertiseMent';
import HeaderMain from './HeaderMain';

const ContentMain = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderMain />
      <ContentMainIcon />
      <SwiperComponent />
      <AdvertiseMent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContentMain;
