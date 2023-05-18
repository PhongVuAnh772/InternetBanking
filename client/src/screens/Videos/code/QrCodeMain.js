import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const QrCodeMain = () => {
  return (
    <View style={styles.container}>
      <Text>QrCodeMain</Text>
    </View>
  );
};

export default QrCodeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

// npm i react-native-camera
