import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderMain from './mobile/HeaderMain';
import ContentMain from './mobile/ContentMain';
const MainIndex = () => {
  return (
    <View style={styles.container}>
      <HeaderMain />
      <ContentMain />
    </View>
  );
};

export default MainIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 246, 245)',
  },
});
