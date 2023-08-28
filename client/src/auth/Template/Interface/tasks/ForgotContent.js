import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import {setAccountChangePass} from '../../../../slice/changePassSlice';
const ForgotContent = () => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [cmnd, setCMND] = useState('');

  const [card, setCard] = useState('');

  const [dateOver, setDateOver] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const networkState = useAppSelector(state => state.network.ipv4Address)
  const showToast = (type, text1, tex2) => {
    Toast.show({
      type: type,
      text1: text1,
    });
  };
  const handleForgetPass = async () => {
    try {

      const ress = await axios.post(
        `${networkState}/api/forgetPassword`,
        {
          Account_id: name,
          CC_number: card,
          CMND: cmnd,
          Expiry_Date: dateOver,
          Email: phoneNum,
        },
      );
      if (ress.data.success === true) {
        showToast('success', 'Thông tin chính xác, mời bạn đổi mật khẩu');
        dispatch(setAccountChangePass(name));
        navigation.navigate('PassChange');
      } else {
        showToast('error', 'Thông tin sai, hãy nhập lại');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerContent}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Vui lòng cung cấp các thông tin sau để cấp lại mật khẩu VPBank NEO
            </Text>
          </View>

          <View style={styles.inputForgotContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              secureTextEntry={false}
              placeholder="Mã đăng nhập"
              placeholderTextColor="#929c9e"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Email"
              placeholderTextColor="#929c9e"
              value={phoneNum}
              onChangeText={setPhoneNum}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Số CMND/CCCD/Hộ chiếu"
              placeholderTextColor="#929c9e"
              value={cmnd}
              onChangeText={setCMND}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Số thẻ ghi nợ/ Thẻ tín dụng"
              placeholderTextColor="#929c9e"
              value={card}
              onChangeText={setCard}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Ngày hiệu lực/ Ngày hết hạn thẻ"
              placeholderTextColor="#929c9e"
              value={dateOver}
              onChangeText={setDateOver}
            />
          </View>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneDescriptionsContainer}>
              <Text style={styles.phoneDescriptionsTitleText}>
                Quý khách lưu ý:
              </Text>
              <Text style={styles.phoneDescriptionsText}>
                Trường hợp quý khách không có thẻ, vui lòng xem lại gmail hệ
                thống gửi khi đăng ký trước đó
              </Text>
              <Text style={styles.phoneDescriptionsText}>
                Nếu quý khách không nhận được tin nhắn gmail vui lòng liên hệ
                tổng đài
              </Text>
            </View>
            <TouchableOpacity
              style={styles.phoneIconContainer}
              onPress={() => {
                Linking.openURL(`tel:${1900545415}`);
              }}>
              <MaterialIcons
                name="local-phone"
                size={25}
                color="white"
                style={styles.phoneIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.contentFooter}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => handleForgetPass()}>
          <Text style={styles.buttonNextText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ForgotContent;

const styles = StyleSheet.create({
  container: {
    flex: 9,
    color: '#929c9e',
  },
  descriptionContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    color: 'black',
  },
  input: {color: 'black', borderBottomWidth: 1, borderBottomColor: '#f4f5f6'},
  inputForgotContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  phoneDescriptionsTitleText: {
    color: 'rgb(142, 152, 154)',
    fontSize: 16,
    fontWeight: '500',
  },
  phoneDescriptionsText: {
    color: 'red',
    paddingTop: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  phoneDescriptionsContainer: {flex: 9},
  phoneIconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  phoneIcon: {
    backgroundColor: 'rgb(1, 173, 83)',
    borderRadius: 25,
    padding: 10,
  },
  contentFooter: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonNext: {
    backgroundColor: 'rgb(1, 173, 83)',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonNextText: {
    color: 'white',
    fontSize: 15,
  },
});
