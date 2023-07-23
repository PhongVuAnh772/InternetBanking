import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const LoanRepaidSuccess = () => {
    const navigation = useNavigation();
    const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
    });
  };
  useEffect(() => {
     showToast('success', 'Trả nợ thành công','');
      setTimeout(() => {
          navigation.navigate("LoanOverview")
        }, 3000);
  },[])
  return (
    
    <View style={styles.container}>
      <FastImage
        style={{ width: 150, height: 150, borderRadius: 10 }}
        source={require('../../../../assets/lottieShaking.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>Chúc mừng bạn đã vay thành công</Text>
    </View>
  )
}

export default LoanRepaidSuccess

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})