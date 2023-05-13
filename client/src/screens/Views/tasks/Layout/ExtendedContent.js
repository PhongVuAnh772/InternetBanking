import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ExtendedContent = () => {
  return (
    <View style={styles.container}>
      <Text>ExtendedContent</Text>
    </View>
  );
};

export default ExtendedContent;

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
});
