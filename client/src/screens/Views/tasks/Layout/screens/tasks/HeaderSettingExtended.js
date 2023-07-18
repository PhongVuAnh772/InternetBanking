import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const HeaderSettingExtended = () => {
  const navigation = useNavigation();
  return (
    // <View style={styles.container}>
    //   <MaterialIcons name="arrow-back-ios" size={20} />
    //   <Text style={styles.textHeader}>Cài đặt</Text>
    // </View>

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
        <Text style={styles.Text}>Cài đặt</Text>
      </View>
    </View>
  );
};

export default HeaderSettingExtended;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
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
