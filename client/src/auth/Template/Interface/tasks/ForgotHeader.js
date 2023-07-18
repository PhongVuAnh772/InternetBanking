import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ForgotHeader = () => {
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
        <Text style={styles.Text}>Quên mật khẩu</Text>
      </View>
    </View>
  );
};

export default ForgotHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  },
  TouchableOpacity: {},
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
