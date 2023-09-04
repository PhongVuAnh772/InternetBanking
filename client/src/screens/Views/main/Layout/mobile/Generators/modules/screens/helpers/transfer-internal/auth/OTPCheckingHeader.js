import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const OTPCheckingHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.Text}>Smart OTP cơ bản</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.TextCanceled}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPCheckingHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(245, 245, 245)',
  },
  TouchableOpacity: {},
  Text: {
    fontSize: 18,
    paddingLeft: 15,
    color: 'black',
    fontWeight: '600',
  },
  TextCanceled: {
    color: 'rgb(59, 132, 98)',
    fontSize: 18,
  },
});
