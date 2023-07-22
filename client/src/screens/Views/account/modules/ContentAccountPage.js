import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import creditCard from '../../../../assets/components/lady-card.png';
import {useAppSelector, useAppDispatch} from '../../../../app/hooks/hooks';
import ButtonOtherCredit from './Layout/ButtonOtherCredit';
import {setLocked} from '../../../../slice/creditSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const ContentAccountPage = () => {
  const numberCreditCard = useAppSelector(state => state.credit.CC_number);
  const numberCVC = useAppSelector(state => state.credit.CVVNumber);
  const userName = useAppSelector(state => state.credit.UserNameCreditCard);
  const dateCreated = useAppSelector(state => state.credit.DateValue);
  const lockedStatus = useAppSelector(state => state.credit.locked);
  const [modalVisibleTicket, setModalVisibleTicket] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  let formattedStr = '';
  const replacedStr = dateCreated.replace(/-/g, '/');

  for (let i = 0; i < numberCreditCard.length; i++) {
    formattedStr += numberCreditCard[i];
    if ((i + 1) % 4 === 0) {
      formattedStr += '  ';
    }
  }

  const handleLocked = () => {
    setModalVisibleTicket(!modalVisibleTicket);
  };
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
    });
  };
  console.log(numberCreditCard);
  const handleLockedYes = async () => {
    setVisible(true);
    setModalVisibleTicket(!modalVisibleTicket);
    try {
      const res = await axios.put(
        `http://192.168.100.6:5000/api/changeLocked`,
        {
          CC_number: numberCreditCard,
        },
      );
      if (res.data.success) {
        setTimeout(() => {
          setVisible(false);
          dispatch(setLocked(res.data.creditCard.locked));
          showToast('success', 'Đổi trạng thái thẻ thành công');
        }, 3000);
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      console.log('Có lỗi server');
    }
  };
  return (
    <>
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
        {visible && (
          <ActivityIndicator
            size="large"
            color="#00ff00"
            style={{alignSelf: 'center'}}
          />
        )}

        <View style={styles.otherContent}>
          <View style={styles.activeContainer}>
            <View style={styles.activeTextContainer}>
              <Text style={styles.activeTextTitle}>Tình trạng :</Text>
              <Text
                style={[styles.activeTextTitle, {color: 'rgb(0, 175, 83)'}]}>
                {lockedStatus ? 'Đang khóa' : 'Đang hoạt động'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => handleLocked()}>
              <Text style={styles.textTouchableOpacity}>
                {lockedStatus ? 'Mở khóa thẻ' : 'Khóa thẻ'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonOtherContainer}>
            <ButtonOtherCredit name="Phát hành thẻ vật lý" icon="cc-discover" />
            <ButtonOtherCredit
              name="Xem thông tin số thẻ - CVV"
              icon="question"
            />
            <ButtonOtherCredit
              name="Lịch sử giao dịch thẻ"
              icon="expeditedssl"
            />
          </View>
          <View style={styles.buttonOtherContainer}>
            <ButtonOtherCredit name="Thay đổi mã PIN" icon="feed" />

            <ButtonOtherCredit name="Sử dụng thẻ an toàn" icon="shield" />
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleTicket}
        onRequestClose={() => {
          setModalVisibleTicket(!modalVisibleTicket);
        }}>
        <View style={styles.centeredViewTicket}>
          <View style={styles.centeredViewTicketDeep}>
            <View style={styles.titleModalTicket}>
              <Text style={styles.titleContainerTicket}>Thông báo !</Text>
              <Text style={styles.titleDecsTicket}>{lockedStatus ? 'Bạn muốn mở khóa thẻ ?' : 'Bạn muốn khóa thẻ ?'}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnModalTicket}
              onPress={() => handleLockedYes()}>
              <Text style={styles.btnModalTicketText}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModalTicketUnDo}
              onPress={() => {
                setModalVisibleTicket(!modalVisibleTicket);
              }}>
              <Text style={styles.btnModalTicketTextUnDo}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  centeredViewTicket: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignSelf: 'center',

    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  centeredViewTicketDeep: {
    bottom: '40%',
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '70%',
    height: '30%',
    borderRadius: 10,
  },
  modalView: {
    paddingVertical: 15,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  titleContainerTicket: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 10,
  },
  titleDecsTicket: {fontSize: 15, color: 'black'},
  textHelp: {fontSize: 17, color: 'black', fontWeight: '500'},
  titleModalTicket: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalTicket: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(233, 233, 233)',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(0, 175, 83)',

    paddingVertical: 5,
  },
  btnModalTicketText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  btnModalTicketUnDo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    paddingVertical: 5,
  },
  btnModalTicketTextUnDo: {
    fontSize: 17,
    color: 'black',
  },
});
