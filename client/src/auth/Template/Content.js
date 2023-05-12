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
const Content = () => {
  //   useEffect(() => {
  //     effect;
  //     return () => {
  //       cleanup;
  //     };
  //   }, [input]);
  const navigation = useNavigation();
  const [showPass, setshowPass] = useState(false);
  const [name, setName] = useState('');
  const [showButton, setshowButton] = useState(false);

  const [password, setPassword] = useState('');
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
  const iconName = showPass ? 'eye' : 'eye-slash';
  const loginFunc = () => {};
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
      <TouchableOpacity style={styles.loginButton} onPress={toggleShowPassword}>
        <Text style={styles.loginButtonText} onPress={loginFunc}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
      <View style={styles.otherFunc}>
        <TouchableOpacity onPress={toggleShowPassword}>
          <Text
            style={styles.loginButtonText}
            onPress={() => navigation.navigate('Registered')}>
            Đăng ký ngay
          </Text>
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
