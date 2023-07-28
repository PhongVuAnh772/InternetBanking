import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../app/hooks/hooks';
import male from '../../assets/male.png';
import female from '../../assets/woman.png';
import axios from 'axios';
const CongratulationConfirm = () => {
  const navigation = useNavigation();
  const personalIdNumber = useAppSelector(
    state => state.signUp.personalIdNumber,
  );
  const sex = useAppSelector(state => state.signUp.sex);
  const region = useAppSelector(state => state.signUp.regionName);
  const email = useAppSelector(state => state.signUp.email);
  const newAccountSTK = useAppSelector(state => state.signUp.newAccountSTK);
  const dateOfBirth = useAppSelector(state => state.signUp.dateOfBirth);
  const CMND = useAppSelector(state => state.signUp.CMNDUser);
  const fullName = useAppSelector(state => state.signUp.fullName);
        const networkState = useAppSelector(state => state.network.ipv4Address)

  const handleButton = async () => {
    try {

        const response = await axios.post(
          `${networkState}/api/signup`,
          {
            gender: sex === 'male' || 'Nam' ? 'M' : 'F',
            region: region,
            email: email,
            Account_id: newAccountSTK,
            password: email,
            CMNDUser: CMND,
            dateOfBirth: dateOfBirth,
            fullName: fullName,
          },
        );
          navigation.navigate('LastSuccessSignUpScreen')
        
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.congratulationHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome
              name="chevron-left"
              size={20}
              style={styles.iconModal}
              color="black"
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.textHeader}>Thông tin cá nhân</Text>
          </View>
        </View>
        <View style={styles.congratulationContent}>
          <View style={styles.congratulationUserInfo}>
            <Text style={styles.textHeader}>{fullName}</Text>
            <View style={styles.congratulationUserInfoContent}>
              <View style={styles.regionContainer}>
                <Text style={styles.textContent}>{region}</Text>
              </View>
              <View style={styles.sexContainer}>
                {sex === 'Nam' ? (
                  <Image source={male} style={styles.sexContent} />
                ) : (
                  <Image source={female} style={styles.sexContent} />
                )}
                <Text style={styles.textSexContent}>{sex}</Text>
              </View>
            </View>
          </View>

          <View style={styles.congratulationUserInfoOther}>
            <View style={styles.UserOtherInfoContainer}>
              <Text style={styles.textTitle}>Email</Text>
            </View>

            <Text style={styles.textResultContent}>{email}</Text>
          </View>

          <View style={styles.congratulationUserInfoOther}>
            <View style={styles.UserOtherInfoContainer}>
              <Text style={styles.textTitle}>Số tài khoản</Text>
            </View>
            <Text style={styles.textResultContent}>{newAccountSTK}</Text>
          </View>
         
          <View style={styles.congratulationUserInfoOther}>
            <View style={styles.UserOtherInfoContainer}>
              <Text style={styles.textTitle}>Ngày sinh</Text>
            </View>
            <Text style={styles.textResultContent}>{dateOfBirth}</Text>
          </View>
          <View style={styles.congratulationUserInfoOther}>
            <View style={styles.UserOtherInfoContainer}>
              <Text style={styles.textTitle}>CMND/CCCD</Text>
            </View>
            <Text style={styles.textResultContent}>{CMND}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={() => handleButton()}>
          Tôi đồng ý với thông tin cá nhân đã liệt kê
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CongratulationConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
  congratulationHeader: {
    flex: 0.2,
    backgroundColor: '#f5f6f7',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
  },
  congratulationUserInfoOther: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  congratulationContent: {
    flex: 3,
  },
  congratulationUserInfo: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  textContent: {
    fontSize: 18,
    color: 'rgb(97, 109, 129)',
  },
  sexContent: {
    width: 25,
    height: 25,
  },
  textSexContent: {
    fontSize: 18,
    color: 'rgb(97, 109, 129)',
    paddingHorizontal: 5,
  },
  congratulationUserInfoContent: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomColor: 'rgb(235, 237, 239)',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  sexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  regionContainer: {
    flexDirection: 'row',
  },
  congratulationUserOtherInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  textTitle: {
    color: 'rgb(102, 111, 128)',
    fontSize: 17,
  },
  textResultContent: {
    color: 'rgb(58, 73, 97)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'pink',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
