import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import iconMember from '../../assets/member-card.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import unidecode from 'unidecode';
import {
  setimageBackURL,
  setimageFrontURL,
  setdateOfBirth,
  setSex,
  setregionName,
  setfullName,
  setpersonalIdNumber,
} from '../../slice/signUpSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import Toast from 'react-native-toast-message';

const ConfirmCheckMicroBlink = () => {
  const [filePath, setFilePath] = useState([]);
  const [responseDataUser, setResponseDataUser] = useState([]);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cmndBefore = useAppSelector(state => state.signUp.CMNDUser);
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer NjMyZWVlODQ0YzYxNDI0ZWI1YzVmMWM4NmQxMTBkMmI6ZTBlNDlkY2QtZGE4Yi00YmU5LWJkZjUtMWVmYmZkZDI4MTYy',
    Accept: 'application/json',
  };
  const imageFrontSideSelector = useAppSelector(
    state => state.signUp.imageFrontURL,
  );
  const imageBackSideSelector = useAppSelector(
    state => state.signUp.imageBackURL,
  );
  const personalIdNumber = useAppSelector(state => state.signUp.personalIdNumber)
  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };
  console.log(imageFrontSideSelector, imageBackSideSelector);
  const handleCheckMicroblink = async () => {
    try {
      if (filePath) {
        const requestData = {
          imageFrontSide: imageFrontSideSelector,
          imageBackSide: imageBackSideSelector,
          returnFullDocumentImage: true,
          returnFaceImage: true,
          imageAnalysisResult: true,
        };

        const config = {
          method: 'post',
          url: 'https://api.microblink.com/v1/recognizers/blinkid-combined',
          data: requestData,
          headers: headers,
        };

        const response = await axios(config);
        const responseData = response.data;

        if (response.data.result.processingStatus === 'DETECTION_FAILED') {
          showToast(
            'error',
            'Có lỗi',
            'Hệ thống không nhận diện được, vui lòng thử lại',
          );
          dispatch(setimageBackURL(''));
          dispatch(setimageFrontURL(''));
          navigation.navigate('ThirdSignUpNumberScreen');
        } else if (response.data.result.processingStatus === 'SUCCESS') {
          const resultDateOfBirth = `${
            response.data.result.mrzData.dateOfBirth.day ||
            response.data.result.dateOfBirth.day
          } - ${
            response.data.result.mrzData.dateOfBirth.month ||
            response.data.result.dateOfBirth.month
          } - ${
            response.data.result.mrzData.dateOfBirth.year ||
            response.data.result.dateOfBirth.year
          }`;

          const fullName = unidecode(
            `${
              response.data.result.mrzData.fullName ||
              response.data.result.fullName
            }`,
          );
          const personalIdNumberRes = `${
            response.data.result.mrzData.personalIdNumber ||
            response.data.result.personalIdNumber
          }`;
          const sex = `${
            response.data.result.mrzData.sex || response.data.result.sex
          }`;
          const region = `${response.data.result.classInfo.countryName}`;

          console.log(
            `${
              response.data.result.mrzData.dateOfBirth.day ||
              response.data.result.dateOfBirth.day
            } - ${
              response.data.result.mrzData.dateOfBirth.month ||
              response.data.result.dateOfBirth.month
            } - ${
              response.data.result.mrzData.dateOfBirth.year ||
              response.data.result.dateOfBirth.year
            }`,
          );
          console.log(fullName);
          console.log(personalIdNumberRes);
          console.log(sex);
          console.log(region);
          if (fullName && personalIdNumberRes && sex && region) {
            dispatch(setdateOfBirth(resultDateOfBirth));
            dispatch(setSex(sex));
            dispatch(setregionName(region));
            dispatch(setfullName(fullName));
            dispatch(setpersonalIdNumber(personalIdNumberRes));
            if (cmndBefore !== personalIdNumber) {
              showToast(
                'error',
                'Có lỗi',
                'Phát hiện CMND bạn cung cấp không trùng khớp trước khi khởi tạo, hãy thử lại',
              );
              navigation.navigate('SignUpNumberScreen');

            }
            else {
              navigation.navigate('CongratulationConfirm');
            }
          }
        }
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <MaterialIcons name="arrow-back" size={20} color="white" />
      </View>
      <View style={styles.screenContainer}>
        <View style={styles.imageContainer}>
          <Image source={iconMember} style={styles.imageTitle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            Hệ thống đã tiếp nhận được ảnh mặt trước và mặt sau
          </Text>
          <Text style={styles.textStyle}>
            Xin mời xác nhận để chúng tôi quét nhận diện
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => handleCheckMicroblink()}>
        <Text style={styles.textStyle}>Tôi đồng ý</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmCheckMicroBlink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(40, 28, 112)',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyleFocus: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'rgb(253, 55, 164)',
    paddingVertical: 2,
    marginVertical: 20,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  backContainer: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  imageTitle: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
  },
  screenContainer: {
    alignItems: 'center',
  },
});
