import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const Content = ({isSignIn, setIsLoggedIn}) => {
  const [showPass, setshowPass] = useState(false);
  const [name, setName] = useState('');
  const [showButton, setshowButton] = useState(false);

  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const toggleShowButton = () => {
    setshowButton(true);
  };
  const toggleShowPassword = () => {
    setshowPass(!showPass);
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

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const onLoggedIn = async token => {
    try {
      const ress = await axios.get(`http://10.0.2.2:5000/api/private`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (ress.status === 200) {
        setMessage(ress.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler = async () => {
    const payload = {
      name,
      password,
    };
    try {
      const res = await axios.post(`http://10.0.2.2:5000/api/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let token = res.data.token;
      if (token) {
        // AsyncStorage.setItem('token', token);

        onLoggedIn(token);

        setIsError(false);
        setMessage(res.data.message);
        setIsLoggedIn(true);
        navigation.navigate('MainPage', {
          name: name,
        });
      } else if (res.data.success === false) {
        setMessage('Sai thông tin đăng nhập, hãy thử lại');
      }
    } catch (err) {
      console.log('Co loi : ' + err);
      setIsError(true);
      setMessage(err.message);
    }
  };

  const iconName = showPass ? 'eye' : 'eye-slash';
  useEffect(() => {
    navigation.setOptions({isSignIn});
  }, [navigation, isSignIn]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={false}
          value={name}
          placeholder="Tên đăng nhập"
          onChangeText={setName}
          placeholderTextColor="#fff"
        />

        <View style={styles.iconFirst}>
          <Icon name="user-o" size={20} color="white" />
        </View>
        <TouchableOpacity style={styles.buttonText} onPress={toggleDeleteName}>
          <MaterialIcons name="cancel" size={20} color="rgb(163, 210, 206)" />
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
        <TouchableOpacity style={styles.buttonText} onPress={toggleDeletePass}>
          <MaterialIcons name="cancel" size={20} color="rgb(163, 210, 206)" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHide}
          onPress={toggleShowPassword}>
          <Icon name={iconName} size={20} color="rgb(163, 210, 206)" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onSubmitHandler}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.otherFunc}>
        <TouchableOpacity onPress={() => navigation.navigate('Registered')}>
          <Text style={styles.loginButtonText}>Đăng ký ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text style={styles.loginButtonText} onPress={toggleShowPassword}>
            Quên mật khẩu ?
          </Text>
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
