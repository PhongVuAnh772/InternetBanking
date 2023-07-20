import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useAppSelector, useAppDispatch} from '../../app/hooks/hooks';
import {setLogin, setToken} from '../../slice/authSlice';
import Toast from 'react-native-toast-message';
import {
  setEmail,
  setCMND,
  setnewAccountSTK,
  setimageFrontURL,
  setimageBackURL,
  setdateOfBirth,
  setSex,
  setregionName,
  setfullName,
  setpersonalIdNumber,
} from '../../slice/signUpSlice';
import {
  setCVVNumber,
  setDateValue,
  setUserNameCreditCard,
  setBalance,
  setgetPhysicalCard,
  setLocked,
  setCC_number,
  setPINCode
} from '../../slice/creditSlice';

const Content = ({isSignIn, setIsLoggedIn}) => {
  const loggedIn = useAppSelector(state => state.login.loggedIn);
  const CC_number = useAppSelector(state => state.credit.CC_number);
  const dispatch = useAppDispatch();
  const [showName, setshowName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPass, setshowPass] = useState(true);
  const [name, setName] = useState('45949545');
  const [showButton, setshowButton] = useState(false);

  const [password, setPassword] = useState('tranviettrung2@gmail.com');

  const navigation = useNavigation();
  const toggleShowButton = () => {
    setshowButton(true);
  };
  const toggleShowPassword = () => {
    setshowPass(!showPass);
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Đăng nhập thành công',
      text2: 'Xin chàoo 👋',
    });
  };
  const toggleShowName = () => {
    setshowName(!showName);
  };
  const toggleDeleteName = () => {
    setName('');
  };
  const toggleDeletePass = () => {
    setPassword('');
  };

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const ipv4Address = useAppSelector(state => state.network.ipv4Address);
  const tokenString = useAppSelector(state => state.login.token);
  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };
 
  const dateValues = useAppSelector(state => state.signUp.DateValue);
  const onLoggedIn = async token => {
    try {
      const ress = await axios.post(
        `http://192.168.100.6:5000/api/private`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (ress.data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false; 
    }
  };

  const onSubmitHandler = async () => {
    setIsLoading(true);

    const payload = {
      name,
      password,
    };
    try {
      const res = await axios.post(
        `http://192.168.100.6:5000/api/login`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      let token = res.data.token;
      console.log(token);
      if (token) {
        if (await onLoggedIn(token)) {

          setIsError(false);
          dispatch(setLogin(true));
          dispatch(setToken(token));
          dispatch(setEmail(res.data.other.customerData.Email));
          dispatch(setpersonalIdNumber(res.data.other.customerData.CMND));
          dispatch(setnewAccountSTK(res.data.data.Account_id));
          dispatch(setdateOfBirth(res.data.other.customerData.Date_of_Birth));
          dispatch(setSex(res.data.other.customerData.Sex));
          dispatch(setBalance(res.data.data.Account_Balance));
          dispatch(setDateValue(res.data.data.Date_Opened));
          dispatch(setCVVNumber(res.data.credit_cards.CVC));
          dispatch(setgetPhysicalCard(res.data.credit_cards.get_physical_card));
          dispatch(setLocked(res.data.credit_cards.locked));
          dispatch(setregionName(res.data.other.customerData.Country));
          dispatch(
            setUserNameCreditCard(res.data.other.customerData.Full_Name),
          );
          dispatch(setfullName(res.data.other.customerData.Full_Name));
          dispatch(setCC_number(res.data.credit_cards.CC_number));
          dispatch(setPINCode(res.data.data.PINCode))
          setIsLoading(false);
          showToast();
          navigation.navigate('MainPage');
        } else {
          setMessage('Có lỗi trong quá trình xác thực');
          setIsLoading(false);
        }
      } else if (res.data.success === false) {
        setMessage('Sai thông tin đăng nhập, hãy thử lại');
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      setIsError(true);
      setIsLoading(false);

      setMessage(err.message);
    }
  };

  const iconName = showName ? 'eye' : 'eye-slash';
  const iconNamePass = showPass ? 'eye' : 'eye-slash';

  useEffect(() => {
    navigation.setOptions({isSignIn});
  }, [navigation, isSignIn]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={showName}
          value={name}
          placeholder="Tên đăng nhập"
          onChangeText={setName}
          placeholderTextColor="#fff"
        />

        <View style={styles.iconFirst}>
          <Icon name="user-o" size={20} color="white" />
        </View>
        {name !== '' && (
          <TouchableOpacity
            style={styles.buttonText}
            onPress={toggleDeleteName}>
            <MaterialIcons name="cancel" size={20} color="rgb(163, 210, 206)" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonHide} onPress={toggleShowName}>
          <Icon name={iconName} size={20} color="rgb(163, 210, 206)" />
        </TouchableOpacity>
      </View>
      <Text style={styles.loginButtonerr}>{message}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onFocus={toggleShowButton}
          style={styles.input}
          secureTextEntry={showPass}
          value={password}
          placeholder="Mật khẩu"
          onChangeText={setPassword}
          placeholderTextColor="#fff"
        />
        <View style={styles.iconFirst}>
          <MaterialIcons name="lock-outline" size={20} color="white" />
        </View>
        {password !== '' && (
          <TouchableOpacity
            style={styles.buttonText}
            onPress={toggleDeletePass}>
            <MaterialIcons name="cancel" size={20} color="rgb(163, 210, 206)" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.buttonHide}
          onPress={toggleShowPassword}>
          <Icon name={iconNamePass} size={20} color="rgb(163, 210, 206)" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => onSubmitHandler()}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}

      <View style={styles.otherFunc}>
        <TouchableOpacity onPress={() => navigation.navigate('Registered')}>
          <Text style={styles.loginButtonText}>Đăng ký ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.loginButtonText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    flex: 2.5,
  },
  loginButtonerr: {
    color: 'red',
  },
  input: {
    backgroundColor: 'rgb(80, 174, 144)',
    width: '100%',
    height: 55,
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    color: 'white',
    paddingLeft: 30,
    fontSize: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  buttonText: {
    position: 'absolute',
    right: 30,
    paddingTop: 30,
    paddingRight: 10,
  },
  buttonHide: {
    position: 'absolute',
    right: 10,
    paddingTop: 30,
  },
  iconFirst: {
    position: 'absolute',
    paddingTop: 32,
    left: 7,
  },
  loginButton: {
    backgroundColor: 'rgb(2, 172, 83)',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 17,
    color: 'white',
  },
  otherFunc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
  },
});
