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
import {useAppDispatch} from '../../app/hooks/hooks';
import {setimageBackURL, setimageFrontURL} from '../../slice/signUpSlice';

const App = () => {
  const [filePath, setFilePath] = useState([]);
  const [responseDataUser, setResponseDataUser] = useState([]);
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
  const fetchDataUser = async results => {
    try {
      if (results) {
        const response = await axios.post(
          `${networkState}/api/upImageToGlobal`,
          {
            filePathSpecified: results.assets[0].base64,
          },
        );
        if (response.data.success) {
          dispatch(setimageFrontURL(response.data.data));
          console.log(response.data.data);
          navigation.navigate('BonusContinueSignUpNumberScreen');
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 600, // Tăng độ rộng của ảnh
      maxHeight: 800, // Tăng chiều cao của ảnh
      quality: 2, // Tăng chất lượng ảnh
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
          return;
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
          fetchDataUser(response);
        }
      });
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
          <Text style={styles.textStyleHighLight}>
            <Text style={styles.textStyleHighLight}>
              Bạn được đưa tới hệ thống nhận diện danh tính chuẩn Auth02
            </Text>
          </Text>
          <Text style={styles.textStyle}>
            {'\u2022'} <Text style={styles.textStyleFocus}>Bước 1:</Text> Chụp
            mặt trước căn cước công dân của bạn.
          </Text>
          <Text style={styles.textStyle}>
            {'\u2022'} <Text style={styles.textStyleFocus}>Bước 2:</Text> Sau
            khi hệ thống xác nhận, tiếp tục chụp mặt sau của giấy tờ.
          </Text>
          <Text style={styles.textStyle}>
            {'\u2022'} <Text style={styles.textStyleFocus}>Bước 3:</Text> Đối
            chiếu và xác nhận thông tin cá nhân
          </Text>
          <Text style={styles.textStyleHighLight}>
            Xin mời chụp mặt trước CCCD/CMND đầu tiên
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => captureImage('photo')}>
        <Text style={styles.textStyle}>Bắt đầu xác thực</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

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
    textAlign: 'left',
  },
  textStyleHighLight: {
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
