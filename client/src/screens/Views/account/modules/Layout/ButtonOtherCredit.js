import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ButtonOtherCredit = ({name, icon}) => {
  const navigation = useNavigation();
  const clickHandler = () => {
    if (name == 'Phát hành thẻ vật lý') {
      navigation.navigate('PhysicalCardScreen');
    } else if (name == 'Xem thông tin số thẻ - CVV') {
      navigation.navigate('OTPScreen');
    } else if (name == 'Lịch sử giao dịch thẻ') {
      navigation.navigate('HistoryTransfer');
    } else if (name == 'Sử dụng thẻ an toàn') {
      navigation.navigate('HistoryTransfer');
    } else if (name == "Thay đổi mã PIN") {
      navigation.navigate('OTPScreen');
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

      <FontAwesome
        name="angle-right"
        size={20}
        style={styles.iconVersion}
        color="green"
      />
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
    paddingHorizontal: 15,
  },
  iconContent: {
    flex: 1,
    paddingLeft: 10,
  },
  textIconcontainer: {
    flex: 7,
  },
  iconVersion: {
    flex: 0.4,
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
