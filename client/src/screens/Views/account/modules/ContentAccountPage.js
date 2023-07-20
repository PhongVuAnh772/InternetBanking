import {StyleSheet, Text, View, Image, TouchableOpacity,ScrollView} from 'react-native';
import React, {useState} from 'react';
import creditCard from '../../../../assets/components/lady-card.png';
import {useAppSelector} from '../../../../app/hooks/hooks';
import ButtonOtherCredit from './Layout/ButtonOtherCredit';

const ContentAccountPage = () => {
  const numberCreditCard = useAppSelector(state => state.credit.CC_number);
  const numberCVC = useAppSelector(state => state.credit.CVVNumber);
  const userName = useAppSelector(state => state.credit.UserNameCreditCard);
  const dateCreated = useAppSelector(state => state.credit.DateValue);
  const lockedStatus = useAppSelector(state => state.credit.locked);

  let formattedStr = '';
  const replacedStr = dateCreated.replace(/-/g, '/');

  for (let i = 0; i < numberCreditCard.length; i++) {
    formattedStr += numberCreditCard[i];
    if ((i + 1) % 4 === 0) {
      formattedStr += '  ';
    }
  }
  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <Image source={creditCard} style={styles.creditCard} />
        <Text
          style={[
            styles.numberCVC,
            {color: 'white', fontSize: 27, left: 70, top: 119},
          ]}>
          {formattedStr}
        </Text>
        <Text
          style={[
            styles.numberCVC,
            {color: 'white', fontSize: 15, left: 120, top: 165},
          ]}>
          {replacedStr}
        </Text>
        <Text
          style={[
            styles.numberCVC,
            {color: 'white', fontSize: 18, left: 65, bottom: 95},
          ]}>
          {userName}
        </Text>
      </View>
      <View style={styles.otherContent}>
        <View style={styles.activeContainer}>
          <View style={styles.activeTextContainer}>
            <Text style={styles.activeTextTitle}>Tình trạng :</Text>
            <Text style={[styles.activeTextTitle, {color: 'rgb(0, 175, 83)'}]}>
              {lockedStatus ? 'Đang khóa' : 'Đang hoạt động'}
            </Text>
          </View>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.textTouchableOpacity}>{lockedStatus ? 'Mở khóa thẻ' : 'Khóa thẻ'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonOtherContainer}>
          <ButtonOtherCredit name="Phát hành thẻ vật lý" icon="cc-discover" />
          <ButtonOtherCredit name="Xem thông tin số thẻ - CVV" icon="question" />
          <ButtonOtherCredit name="Lịch sử giao dịch thẻ" icon="expeditedssl" />
        </View>
        <View style={styles.buttonOtherContainer}>
          <ButtonOtherCredit name="Thay đổi mã PIN" icon="feed" />
          
          <ButtonOtherCredit name="Sử dụng thẻ an toàn" icon="shield" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ContentAccountPage;

const styles = StyleSheet.create({
  creditCard: {
    height: 300,
    width: 350,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberCreditCard: {
    color: 'rgb(244, 246, 246)',
  },
  numberCVC: {
    position: 'absolute',
  },
  contentContainer: {
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonOtherContainer: {
    paddingHorizontal: 20,

    marginVertical: 10,
    borderRadius: 10,
  },
  activeTextTitle: {
    color: 'black',
    fontSize: 15,
  },
  touchableOpacity: {
    paddingHorizontal: 50,
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: 'rgb(0, 175, 83)',
  },
  textTouchableOpacity: {
    fontSize: 17,
    color: 'white',
  },
});
