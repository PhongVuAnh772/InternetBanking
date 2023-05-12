import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import image from '../../assets/components/image.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import cccd from '../../assets/identification_card.jpeg';
const ThirdSignUpNumberScreen = ({route}) => {
  const navigation = useNavigation();
  const [valueEmail, setValueEmail] = useState('');
  const [valueCMND, setValueCMND] = useState('');
  const {email, CMND, valueSTK} = route.params;
  console.log(email, CMND, valueSTK);
  const handleButton = () => {
    navigation.navigate('FourthSignUpNumberScreen');
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
              Bước 3: Chụp CMND/CCCD và xác thực
            </Text>
          </View>
        </View>
        <Image style={styles.imageCCCD} source={cccd} />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={styles.textCongrat}>
            Để thông tin nhận diện được chính xác bạn vui lòng đảm bảo
          </Text>
        </View>
        <ScrollView
          style={styles.inputContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.inputTextArea}>
            {'\u2022'}Không sử dụng CMND/CCCD giả mạo, không chính chủ. Khách
            hàng chịu hoàn toàn trách nhiệm trước pháp luật về hình ảnh
            CMND/CCCD và các thông tin đã cung cấp
          </Text>
          <Text style={styles.inputTextArea}>
            {'\u2022'}Không được cho thuê, cho mượn tài khoản/ thẻ ghi nợ, hoặc
            sử dụng tài khoản/ thẻ ghi nợ của mình để thực hiện các giao dịch
            bất hợp pháp
          </Text>
          <Text style={styles.inputTextArea}>
            {'\u2022'}Không được sử dụng tài khoản thanh toán/ thẻ ghi nợ để
            thực hiện các giao dịch nhằm mục đích rửa tiền, tài trợ khủng bố,
            lừa đảo, gian lận hoặc các hành vi vi phạm pháp luật khác. Đồng thời
            đảm bảo tuân thủ đầy đủ các trách nhiệm, nghĩa vụ theo Hợp đồng mở
            và sử dụng TKTT ký kết với VPBank, bao gồm{' '}
            <Text style={styles.inputTextAreaSpanContainer}>
              Điều kiện giao dịch chung về cung cấp và sử dụng dịch vụ phi tín
              dụng.
            </Text>
          </Text>
        </ScrollView>
        <Text style={styles.inputTextAreaOut}>
          Nhấn{' '}
          <Text style={styles.inputTextAreaSpanContainerOut}>
            Bắt đầu thực hiện giao dịch xác thực thông tin
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.inputContainerButton}
          onPress={() => handleButton()}>
          <Text style={styles.inputButton}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThirdSignUpNumberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)',
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
  imageCCCD: {
    width: '80%',
    flex: 2,
    alignSelf: 'center',
    marginVertical: 10,
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
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0.3,
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
    fontWeight: '500',
  },
  inputTextArea: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 10,
  },
  inputTextAreaSpan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextAreaSpanContainer: {
    paddingHorizontal: 5,
    color: 'green',
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
  },
  inputTextAreaOut: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 10,
    textAlign: 'center',
  },
  inputTextAreaSpanContainerOut: {
    paddingHorizontal: 5,
    color: 'black',
    fontWeight: '600',
  },
});
