import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const LoanSuccess = () => {
    const navigation = useNavigation();
    const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
    });
  };
  useEffect(() => {
     showToast('success', 'Vay thành công','');
      setTimeout(() => {
          navigation.navigate("LoanOverview")
        }, 1500);
  },[])
  return (
    
    <View style={styles.container}>
      <FastImage
        style={{ width: 80, height: 80, marginTop: 20, borderRadius: 10 }}
        source={require('../../../../assets/agreement.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>Chúc mừng bạn đã vay thành công</Text>
    </View>
  )
}

export default LoanSuccess

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