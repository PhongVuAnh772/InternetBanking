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
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAppDispatch,useAppSelector } from '../../../../../app/hooks/hooks';

const ForgotContent = () => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [cmnd, setCMND] = useState('');

  const [card, setCard] = useState('');

  const [dateOver, setDateOver] = useState('');
  const AccountChangePass = useAppSelector(state => state.pass.AccountChangePass);
  const navigation = useNavigation();
   const showToast = (type,text1, tex2) => {
    Toast.show({
      type: type,
      text1: text1,
    });
  };
  const networkState = useAppSelector(state => state.network.ipv4Address)
  console.log(AccountChangePass)
  const handleForgetPass = async () => {
    try {
      if (name === phoneNum) {
        const ress = await axios.post(

        `${networkState}/api/changePassword`,
        {
          Account_id: AccountChangePass,
          password: name
        },
        );
        if (ress.data.success === true) {
          showToast('success', 'Đổi mật khẩu thành công, hãy đăng nhập bằng mật khẩu mới')
          navigation.navigate("Auth")
        } else {
          showToast('error', 'Thông tin sai, hãy nhập lại')
        }
      }
      else {
        showToast('error', '2 trường không khớp nhau, hãy thử lại')
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
              Vui lòng cung cấp các thông tin sau để đặt lại mật khẩu VPBank NEO
            </Text>
          </View>

          <View style={styles.inputForgotContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              secureTextEntry={false}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="#929c9e"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#929c9e"
              value={phoneNum}
              onChangeText={setPhoneNum}
            />
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
