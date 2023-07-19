import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import creditCard from '../../../../assets/components/lady-card.png';
const ContentAccountPage = () => {
  
  return (
    <View style={styles.container}>
      <Image source={creditCard} style={styles.creditCard} />
      <Text style={styles.numberCreditCard}></Text>
    </View>
  );
};

export default ContentAccountPage;

const styles = StyleSheet.create({
  creditCard: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
    marginHorizontal: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});
