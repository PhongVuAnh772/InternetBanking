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

const SecondSignUpNumberScreen = ({route}) => {
  const navigation = useNavigation();
  const [valueSTK, setValueSTK] = useState('');

  const {email, CMND} = route.params;
  const valueSTKNotWant = CMND.slice(-8);
  console.log(email, CMND);
  const handleButton = () => {
    navigation.navigate('ThirdSignUpNumberScreen', {
      email: email,
      CMND: CMND,
      valueSTK: valueSTK,
    });
  };
  const handleButtonNotWant = () => {
    navigation.navigate('ThirdSignUpNumberScreen', {
      email: email,
      CMND: CMND,
      valueSTK: valueSTKNotWant,
    });
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
          <Text style={styles.label}>Viết ra đuôi số tài khoản mong muốn</Text>
          <TextInput
            value={valueSTK}
            onChangeText={setValueSTK}
            style={styles.input}
            placeholder="197xxxxxxx"
            placeholderTextColor="gray"
            maxLength={8}
            keyboardType="numeric"
          />
          <Text style={styles.countWord}>Vui lòng dãy số 8 số</Text>
        </View>
        <TouchableOpacity
          style={styles.inputContainerButton}
          onPress={() => handleButton()}>
          <Text style={styles.inputButton}>Tiếp tục</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputNotWantOpacity}
          onPress={() => handleButtonNotWant()}>
          <Text style={styles.textInputNotWantOpacity}>
            Tôi không muốn sử dụng số đẹp
          </Text>
          <FontAwesome
            name="long-arrow-right"
            size={20}
            color="gray"
            style={styles.iconNumberText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondSignUpNumberScreen;

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
    fontSize: 13,
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
  inputNotWantOpacity: {
    paddingVertical: 15,

    fontSize: 15,
    color: 'gray',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  textInputNotWantOpacity: {
    paddingVertical: 15,

    fontSize: 15,
    color: 'gray',
  },
  iconNumberText: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 5,
  },
});
