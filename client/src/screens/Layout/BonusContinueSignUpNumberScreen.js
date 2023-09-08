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
  ActivityIndicator
} from 'react-native';
import iconMember from '../../assets/member-card.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {setimageBackURL, setimageFrontURL} from '../../slice/signUpSlice';
import {useAppDispatch,useAppSelector} from '../../app/hooks/hooks';

const BonusContinueSignUpNumberScreen = () => {
  const [filePath, setFilePath] = useState([]);
  const [responseDataUser, setResponseDataUser] = useState([]);
    const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
      const networkState = useAppSelector(state => state.network.ipv4Address)

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  
  const fetchDataUser = async (results) => {
    try {
      if (results) {
        setVisible(true)
        const response = await axios.post(
          `${networkState}/api/upImageBackToGlobal`,
          {
            filePathSpecified: results.assets[0].base64,
          },
        );
        if (response.data.success) {
            dispatch(setimageBackURL(response.data.signedUrl));
            setVisible(false);
            navigation.navigate('ConfirmCheckMicroBlink');
          } else {
            console.log('Upload not successful:', response.data);
          }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 600, 
      maxHeight: 800, 
      quality: 2, 
      videoQuality: 'high',
      includeBase64: true,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (!response.assets) {
          alert('Hệ thống chưa nhận được ảnh xác thực, hãy thử lại');
        } else if (response.didCancel) {
          alert('Bạn đã rời hệ thống xác thực');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert(
            'Hệ thống chưa nhận diện được Camera trên thiết bị của bạn, hãy thử lại',
          );
          return;
        } else if (response.errorCode == 'permission') {
          alert('Hãy chấp nhận yêu cầu truy cập Camera trong Cài đặt thiết bị');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        } else {
          
          setFilePath(response);

          fetchDataUser(response);
          
        }
      });
    }
  };
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.screenContainer}>
        <View style={styles.imageContainer}>
          <Image source={iconMember} style={styles.imageTitle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            Hệ thống đã tiếp nhận được ảnh mặt trước và chúng tôi đang xác minh
          </Text>
          <Text style={styles.textStyle}>Xin mời tiếp tục chụp mặt sau</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => captureImage('photo')}>
        <Text style={styles.textStyle}>Tiếp tục xác thực</Text>
      </TouchableOpacity>
    </View>
    {visible && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{alignSelf: 'center', position: 'absolute',top:'50%'}}
        />)}</>
  );
};

export default BonusContinueSignUpNumberScreen;

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
