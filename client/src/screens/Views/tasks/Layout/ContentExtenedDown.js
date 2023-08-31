import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import Toast from 'react-native-toast-message';
const ContentExtendedDown = ({name, icon}) => {
  const navigation = useNavigation();
  const lockedCredit = useAppSelector(state => state.credit.locked);
  const showToast = (type, mess) => {
    Toast.show({
      type: type,
      text1: mess,
    });
  };
  const clickHandler = () => {
    if (name == 'Tỷ giá ngoại tệ') {
      navigation.navigate('CurrencyScreen');
    } else if (name == 'ATM và chi nhánh') {
      navigation.navigate('GoogleMap');
    } else if (name == 'Tới số tài khoản liên ngân hàng') {
      navigation.navigate('SendingMoney');
    } else if (name == 'Tới số tài khoản nội bộ') {
      navigation.navigate('SendingMoneyByCustomer');
    } else if (name == 'Tới số thẻ nội bộ') {
      if (lockedCredit) {
        showToast('error', 'Bạn hãy mở khóa thẻ trước');
      } else {
        navigation.navigate('SendingMoneyByCredits');
      }
    } else if (name == 'Danh sách lịch sử giao dịch') {
      navigation.navigate('ListOfTransfer');
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
      {name !== 'Phiên bản' ? (
        <FontAwesome name="angle-right" size={20} style={styles.iconVersion} />
      ) : (
        <Text style={styles.textVersion}>5.4.4</Text>
      )}
    </TouchableOpacity>
  );
};

export default ContentExtendedDown;

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
    flex: 1,
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
