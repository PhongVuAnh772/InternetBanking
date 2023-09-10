import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const SuccessingTransferHeader = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingLeft: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <FontAwesome
          name="check-circle"
          size={20}
          style={styles.iconModal}
          color="rgb(0, 150, 80)"
        />
        <Text style={styles.Text}>Thành công!</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MainIndex')}>
        <FontAwesome
          name="home"
          size={20}
          style={styles.iconModal}
          color="rgb(0, 150, 80)"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SuccessingTransferHeader;

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
    fontSize: 20,
    color: 'rgb(0, 150, 80)',
    fontWeight: '600',
    paddingLeft: 10,
  },
});
