import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const SuccessTransferCreditHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome
          name="chevron-left"
          size={20}
          style={styles.iconModal}
          color="black"
        />
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.Text}>Chuyển đến số tài khoản</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MainIndex')}>
        <Text style={styles.TextCanceled}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessTransferCreditHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(245, 245, 245)',
  },
  TouchableOpacity: {},
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  TextCanceled: {
    fontSize: 18,
    color: 'rgb(61, 134, 98)',
    fontWeight: '600',
  }
});


