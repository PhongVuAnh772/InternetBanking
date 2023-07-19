import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ButtonOtherCredit = ({name, icon}) => {
  const navigation = useNavigation();
  const clickHandler = () => {
    if (name == 'Phát hành thẻ vật lý') {
      navigation.navigate('SettingExtendedContainer');
    } else if (name == 'Xem thông tin số thẻ - CVV') {
      navigation.navigate('GoogleMap');
    } else if (name == 'Lịch sử giao dịch thẻ') {
      navigation.navigate('SendingMoney');
    } else if (name == 'Phát hành thẻ vật lý') {
      navigation.navigate('SendingMoneyByCredits');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={clickHandler}>
      <FontAwesome
        name={icon}
        size={20}
        color="rgb(17, 164, 87)"
        style={styles.iconContent}
      />
      <View style={styles.textIconcontainer}>
        <Text style={styles.textIcon}>{name}</Text>
      </View>

      <FontAwesome name="angle-right" size={20} style={styles.iconVersion} color="black" />
    </TouchableOpacity>
  );
};

export default ButtonOtherCredit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  iconContent: {
    flex: 1,
    paddingLeft: 10,
  },
  textIconcontainer: {
    flex: 7,
  },
  iconVersion: {
    flex: 0.6,
  },
  textVersion: {
    flex: 1,

    color: 'black',
    fontSize: 15,
  },
  textIcon: {
    color: 'black',
    fontSize: 15,
  },
});
