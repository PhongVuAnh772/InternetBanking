import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const SendingMoneyByCreditsHeader = () => {
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
        <Text style={styles.Text}>Chuyển đến số thẻ nội bộ</Text>
      </View>
    </View>
  );
};

export default SendingMoneyByCreditsHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
