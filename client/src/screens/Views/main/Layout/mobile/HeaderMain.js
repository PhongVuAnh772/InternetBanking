import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import banner from '../../../../../assets/main-page/background.jpg';
import usergirl from '../../../../../assets/girl.png';
import userman from '../../../../../assets/man.jpg';
import a from '../../../../../assets/main-page/1.png';
import b from '../../../../../assets/main-page/2.png';
import c from '../../../../../assets/main-page/3.png';
import d from '../../../../../assets/main-page/4.png';
import e from '../../../../../assets/main-page/5.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BankingContent from './Generators/modules/tasks/BankingContent';
import { useAppSelector,useAppDispatch } from '../../../../../app/hooks/hooks';

const HeaderMain = ({props = '10299200...', money = 14000}) => {
  const [show, setShow] = useState(false);
  const gender = useAppSelector(state => state.signUp.sex)
  const originalSTK = useAppSelector(state => state.signUp.newAccountSTK)
  const moneyValue = useAppSelector(state => state.credit.Balance)
  const PINCode = useAppSelector(state => state.credit.PINCode)
  console.log(PINCode)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.poster} source={banner} />
        <View style={styles.iconContainer}>
          <View style={styles.iconContent}>
            <Image style={styles.imageInfo} source={gender === 'M' ? userman : usergirl} />
            <View style={styles.iconTextContent}>
              <Text style={styles.accountInfo}>Tài khoản chính - {originalSTK}</Text>
              <View style={styles.moneyContent}>
                {show ? (
                  <Text style={styles.textMoneyShow}>{moneyValue} đ</Text>
                ) : (
                  <Text style={styles.textMoney}>*** *** ***</Text>
                )}
                <TouchableOpacity
                  style={styles.buttonBtnShow}
                  onPress={() => setShow(!show)}>
                  <MaterialIcons name="search" color="white" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonBtn}>
              <MaterialIcons name="search" color="white" />
              <Text style={styles.textbuttonBtn}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bankingContainer}>
            <BankingContent icon={b} desc="Chuyển tiền" />
            <BankingContent icon={d} desc="Tiền gửi" />

            <BankingContent icon={e} desc="Thẻ" />

            <BankingContent icon={a} desc="Khoản vay" />

            <BankingContent icon={c} desc="Đổi quà" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderMain;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingBottom: 30,
  },
  poster: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  imageInfo: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  iconContainer: {
    paddingHorizontal: 5,
    position: 'absolute',
    top: 30,
    width: '100%',
  },
  iconContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  iconTextContent: {},
  accountInfo: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  textMoney: {
    color: 'white',
    fontSize: 25,
  },
  moneyContent: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBtnShow: {
    paddingHorizontal: 15,
  },
  buttonBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.6)',
    paddingHorizontal: 15,
    height: 30,
    borderRadius: 15,
  },
  textbuttonBtn: {
    color: 'white',
    paddingLeft: 10,
  },
  bankingContainer: {
    width: '100%',
    height: 90,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textMoneyShow: {
    color: 'white',
    fontSize: 20,
  },
});
