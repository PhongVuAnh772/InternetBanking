import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ExtendedContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={'../../../../assets/girl.png'} />
        <View style={styles.infoDesc}>
          {/* <Text style={styles.infoName}>{name}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default ExtendedContent;

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
});
