import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAppDispatch,useAppSelector } from '../../../../../../../../../../../app/hooks/hooks';


const OTPInternalContent = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [circleStates, setCircleStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const PINCode = useAppSelector(state => state.credit.PINCode)
  const showToast = (type, title,text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  console.log(PINCode)
  const handleCodeChange = async newCode => {
    if (newCode.length <= 4) {
      setCode(newCode);

      // Cập nhật trạng thái hình tròn
      const newCircleStates = [...circleStates];
      for (let i = 0; i < 4; i++) {
        newCircleStates[i] = i < newCode.length;
      }
      setCircleStates(newCircleStates);

      if (newCode.length === 4) {
        try {
          if (newCode === PINCode) {
            showToast('success', 'Mã PIN đúng', '')

            navigation.navigate('OTPCheckingCreditWrap')
          }
          else {
            showToast('error', 'Sai mã PIN', 'Vui lòng truy cập lại và nhập lại mã PIN')
             navigation.navigate('MainIndex')
          }

        } catch (error) {
          showToast('error', 'Lỗi server', 'Vui lòng tạo lại phiếu truy cập')
          navigation.navigate('OTPCheckingCreditWrap')

        }

      }
    }
  };

  const handleNumberPress = number => {
    const newCode = code + number.toString();
    handleCodeChange(newCode);
    console.log(typeof newCode);
  };

  const handleDeletePress = () => {
  if (code.length > 0) {
    const newCode = code.slice(0, -1);
    setCode(newCode);

    // Cập nhật trạng thái hình tròn
    const newCircleStates = [...circleStates];
    newCircleStates[newCode.length] = false;
    setCircleStates(newCircleStates);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>Vui lòng nhập mã PIN Smart OTP</Text>
      <View style={styles.circleContainer}>
        {circleStates.map((state, index) => (
          <View
            key={index}
            style={[styles.circle, state ? styles.circleFilled : null]}
          />
        ))}
      </View>

      <View style={styles.containerButton}>
        {numbers.map((number, index) => {
          if (index % 3 === 0 && index !== 0) {
            return (
              <React.Fragment key={number}>
                <View style={styles.newLine} />
                <TouchableOpacity
                  key={number}
                  style={styles.buttonNumber}
                  onPress={() => handleNumberPress(number)}>
                  <Text style={styles.buttonNumberText}>{number}</Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={number}>
                <TouchableOpacity
                  key={number}
                  style={styles.buttonNumber}
                  onPress={() => handleNumberPress(number)}>
                  <Text style={styles.buttonNumberText}>{number}</Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          }
        })}
        <TouchableOpacity onPress={handleDeletePress} >
          <MaterialIcons
            name="delete"
            size={20}
            color="black"
            style={styles.buttonDelete}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPInternalContent;

const styles = StyleSheet.create({
  warningText: {
    color: 'black',
    fontSize: 17,
  },
  buttonNumberText: {
    color: 'black',
    fontSize: 30,
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
  },
  buttonNumber: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 50,
    borderColor: 'rgb(242, 240, 242)',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  containerButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newLine: {
    flexBasis: '100%',
  },
  buttonDelete: {
    position: 'absolute',
    left: 30,
    bottom: -10,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(232, 232, 232)',
    marginHorizontal: 10,
  },
  circleFilled: {
    backgroundColor: 'rgb(9, 166, 74)',
  },
  circleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 15,
  },
});
