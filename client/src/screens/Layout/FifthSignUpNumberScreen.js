import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import image from '../../assets/components/image.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
const FifthSignUpNumberScreen = () => {
  const navigation = useNavigation();
  const [valueEmail, setValueEmail] = useState('');
  const [valueCMND, setValueCMND] = useState('');
  const onSubmitHandler = async () => {
    const payload = {
      email,
      user_name,
      password,
    };
    try {
      const res = await axios.post(`http://10.0.2.2:5000/api/signUp`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let token = res.data.token;
      if (token) {
        AsyncStorage.setItem('token', token);

        onLoggedIn(token);

        setIsError(false);
        setMessage(res.data.message);
        setIsSignedIn(true);
        navigation.navigate('Home', {
          email: email,
          user_name: user_name,
        });
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      setIsError(true);
      setMessage(res.data.message);
    }
  };
  const handleButton = () => {
    // navigation.navigate('');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imageHeader} source={image} />

      <View style={styles.contentComponents}>
        <View style={styles.iconNumber}>
          <Text style={[styles.numberText, styles.active]}>1</Text>
          <View style={styles.content} />
          <Text style={[styles.numberText, styles.active]}>2</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText, styles.active]}>3</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText, styles.active]}>4</Text>
          <View style={styles.content} />

          <Text style={[styles.numberText, styles.active]}>5</Text>
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
            <Text style={styles.textHelp}>
              Bước 2: Chọn số tài khoản mong muốn
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.textCongrat}>
            VPBank tặng bạn 1 số tài khoản như ý: số ngày sinh nhật, số cuối
            điện thoại
          </Text>
          <TouchableOpacity>
            <Text style={styles.textFee}>Chi tiết biểu phí</Text>
          </TouchableOpacity>
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
          <Text style={styles.countWord}>
            Hãy viết đúng định dạng của Email
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập số CMND/CCCD</Text>
          <TextInput
            value={valueCMND}
            onChangeText={setValueCMND}
            style={styles.input}
            placeholder="197xxxxxxx"
            placeholderTextColor="gray"
            maxLength={12}
          />
          <Text style={styles.countWord}>
            Vui lòng nhập số CMND/CCCD 9 hoặc 12 kí tự
          </Text>
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

export default FifthSignUpNumberScreen;

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
  textCongrat: {
    textAlign: 'center',
    fontSize: 16,
  },
  textFee: {
    color: 'green',
    fontSize: 15,
    paddingVertical: 5,
  },
});
