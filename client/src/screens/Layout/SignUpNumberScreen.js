import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import image from '../../assets/components/image-openbank.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch,useAppSelector } from '../../app/hooks/hooks';
import { setEmail,setCMND,setnewAccountSTK } from '../../slice/signUpSlice';
import axios from 'axios';
const SignUpNumberScreen = () => {
  const navigation = useNavigation();
  const [valueEmail, setValueEmail] = useState('');
  const [valueCMND, setValueCMND] = useState('');
  const [errMessage, seterrMessage] = useState('');
  const [errMessageCMND, seterrMessageCMND] = useState('');

  const regexEmail = /@gmail\.com$/;
  const dispatch = useAppDispatch();
          const networkState = useAppSelector(state => state.network.ipv4Address)

  const handleButton = async () => {
    if (!regexEmail.test(valueEmail)) {
      return seterrMessage('Email không đúng định dạng, vui lòng thử lại');
    } else if (valueCMND.length < 9) {
      return seterrMessageCMND(
        'Số CMND không đúng định dạng, vui lòng thử lại',
      );
    }
    try {
      const res = await axios.post(
        `${networkState}/api/validateEmail`,
        {
          Email: valueEmail,
          CMNDValue: valueCMND
        },
      );
      if (res.data.success) {
        dispatch(setEmail(valueEmail))
        dispatch(setCMND(valueCMND));
        navigation.navigate('SecondSignUpNumberScreen', {
          email: valueEmail,
          CMND: valueCMND,
        });
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      console.log('Có lỗi server');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imageHeader} source={image} />

      <View style={styles.contentComponents}>
        <View style={styles.iconNumber}>
          <Text style={[styles.numberText, styles.active]}>1</Text>
          <View style={styles.content} />
          <Text style={[styles.numberText]}>2</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText]}>3</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText]}>4</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText]}>5</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            paddingVertical: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={25} color="black" />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center', paddingRight: 20}}>
            <Text style={styles.textHelp}>Bước 1: Thông tin cơ bản</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập Email</Text>
          <TextInput
            value={valueEmail}
            onChangeText={setValueEmail}
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="gray"
          />
          {errMessage === '' ? (
            <Text style={styles.countWord}>
              Hãy viết đúng định dạng của Email
            </Text>
          ) : (
            <Text style={[styles.countWord, styles.errMessage]}>
              {errMessage}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập số CMND/CCCD</Text>
          <TextInput
            value={valueCMND}
            onChangeText={setValueCMND}
            onFocus={() => seterrMessage('')}
            style={styles.input}
            placeholder="197xxxxxxx"
            placeholderTextColor="gray"
            maxLength={12}
            keyboardType="numeric"
          />

          {errMessageCMND === '' ? (
            <Text style={styles.countWord}>
              Vui lòng nhập số CMND/CCCD 9 hoặc 12 kí tự
            </Text>
          ) : (
            <Text style={[styles.countWord, styles.errMessage]}>
              {errMessageCMND}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.inputContainerButton}
          onPress={() => handleButton()}>
          <Text style={styles.inputButton}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageHeader: {
    width: '100%',
    flex: 2,
  },
  contentComponents: {
    flex: 8.5,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  content: {
    width: 5,
    height: 1,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
  },
  active: {backgroundColor: 'rgb(0, 173, 83)'},
  numberText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    color: 'white',
    backgroundColor: 'rgb(208, 208, 208)',
  },
  contentInput: {
    paddingHorizontal: 15,
    flexDirection: 'row',

    // paddingVertical: 15,
    // flexDirection:w3'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.4,
  },
  countWord: {paddingVertical: 10},
  textHeader: {
    flex: 1,
    paddingLeft: 10,

    alignItems: 'center',
  },
  errMessage: {color: 'red'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textHelp: {
    fontSize: 16,
    color: 'rgb(4, 171, 83)',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 5,
    fontSize: 17,
    color: 'black',
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  inputContainerButton: {
    marginTop: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 173, 83)',
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    paddingBottom: 5,
    color: 'rgb(96, 100, 104)',
  },
  inputButton: {
    fontSize: 18,
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
  },
});
