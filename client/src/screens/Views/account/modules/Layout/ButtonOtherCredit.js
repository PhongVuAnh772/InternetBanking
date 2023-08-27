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
      navigation.navigate('UsingCardSafety');
    } else if (name == "Thay đổi mã PIN") {
      navigation.navigate('OTPCheckingChangeWrap');
    } else if (name == "Hướng dẫn giao dịch ATM an toàn") {
      navigation.navigate("ATMSecurityScreen")
    } else if (name == "Hướng dẫn giao dịch POS an toàn") {
      navigation.navigate("POSSecurityScreen")
    } else if (name == "Hướng dẫn giao dịch trực tuyến an toàn") {
      navigation.navigate("OnlineBankingSecurity")
    } else if (name == "Hướng dẫn bảo mật mã PIN") {
      navigation.navigate("PinCodeSecurity")
    } else if (name == "Hướng dẫn đảm bảo thông tin thẻ") {
      navigation.navigate("CardInformationSecurity")
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
