import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import creditCard from '../../../../assets/components/lady-card.png';
import { useAppSelector } from '../../../../app/hooks/hooks';
const ContentAccountPage = () => {
  const numberCreditCard = useAppSelector(state => state.credit.CC_number)
    const numberCVC = useAppSelector(state => state.credit.CVVNumber)
    const userName = useAppSelector(state => state.credit.UserNameCreditCard)
    const dateCreated = useAppSelector(state => state.credit.DateValue)
    
  return (
    <View style={styles.container}>
      <Image source={creditCard} style={styles.creditCard} />
      <Text style={[styles.numberCVC,{color: 'black'}]}>{numberCreditCard}</Text>
            <Text style={[styles.numberCVC,{color: 'black'}]}>{numberCVC}</Text>
            <Text style={[styles.numberCVC,{color: 'black'}]}>{userName}</Text>
            <Text style={[styles.numberCVC,{color: 'black'}]}>{dateCreated}</Text>

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
    
  },
  numberCreditCard: {
    color: 'rgb(244, 246, 246)'
  }
});
