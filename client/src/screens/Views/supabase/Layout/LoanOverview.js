import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import girl from '../../../../assets/girl.png';
import man from '../../../../assets/man.jpg';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const LoanOverview = () => {
  const navigation = useNavigation()
  const gender = useAppSelector(state => state.signUp.sex);
  const fullName = useAppSelector(state => state.signUp.fullName);
  const Account_Balance = useAppSelector(state => state.credit.Balance);
  
  const loanTaken = useAppSelector(state => state.loan.loanTotal);
  const loanRepaid = useAppSelector(state => state.loan.loanRepaidTotal)
   const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  };
  const clickHandler = () => {
    if ((loanTaken - loanRepaid) > 15000000) {
      showToast('error', 'Đã đến giới hạn vay, không thể vay')
    }
    else {
      navigation.navigate("LoanOfficialScreen")
    }
  }
  const handleRepaid = () => {
      if ((loanTaken - loanRepaid) <= 0) {
      showToast('error', 'Số tiền vay nhỏ hơn 0, cấm truy cập')
    }
    else {
      navigation.navigate("LoanRepaid")
    }
    
  }
  console.log(loanRepaid);
  console.log(loanTaken)
  // console.log(loanTaken - loanRepaid)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.overviewHeader} onPress={() => {navigation.goBack()}}>
        <MaterialIcons name="arrow-back" size={22} color="rgb(36, 163, 255)" />
      </TouchableOpacity>
      <View style={styles.overviewContent}>
        <Image
          source={(gender == 'M') | 'Nam' ? man : girl}
          style={styles.image}
        />
        <Text style={styles.textName}>{fullName}</Text>
        <View style={styles.overviewContentMoney}>
          <Text style={styles.overviewContentMoneyTitle}>Đang nợ</Text>
          <Text style={styles.textMoney}>{loanTaken - loanRepaid} đ</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.containerButton} onPress={() => clickHandler()}>
        <FontAwesome
          name="dollar"
          size={20}
          color="rgb(17, 164, 87)"
          style={styles.iconContent}
        />
        <View style={styles.textIconcontainer}>
          <Text style={styles.textIcon}>Vay ngân hàng</Text>
        </View>

        <FontAwesome
          name="angle-right"
          size={20}
          style={styles.iconVersion}
          color="green"
        />
      </TouchableOpacity>
      {(loanTaken - loanRepaid) == 0.00 ? <View style={styles.containerButtonHide}>
        <FontAwesome
          name="institution"
          size={20}
          color="rgb(17, 164, 87)"
          style={styles.iconContent}
        />
        <View style={styles.textIconcontainer}>
          <Text style={styles.textIcon}>Quản lý khoản vay</Text>
        </View>

        <FontAwesome
          name="angle-right"
          size={20}
          style={styles.iconVersion}
          color="green"
        />
      </View> : <TouchableOpacity style={styles.containerButton} onPress={() => clickHandler()}>
        <FontAwesome
          name="institution"
          size={20}
          color="rgb(17, 164, 87)"
          style={styles.iconContent}
        />
        <View style={styles.textIconcontainer}>
          <Text style={styles.textIcon}>Quản lý khoản vay</Text>
        </View>

        <FontAwesome
          name="angle-right"
          size={20}
          style={styles.iconVersion}
          color="green"
        />
      </TouchableOpacity>}
      {(loanTaken - loanRepaid) == 0.00 || 0 || 0.0 ? <View style={styles.containerButtonHide}>
        <FontAwesome
          name="institution"
          size={20}
          color="rgb(17, 164, 87)"
          style={styles.iconContent}
        />
        <View style={styles.textIconcontainer}>
          <Text style={styles.textIcon}>Trả nợ ngân hàng</Text>
        </View>

        <FontAwesome
          name="angle-right"
          size={20}
          style={styles.iconVersion}
          color="green"
        />
      </View> : <TouchableOpacity style={styles.containerButton} onPress={() => handleRepaid()}>
        <FontAwesome
          name="send"
          size={20}
          color="rgb(17, 164, 87)"
          style={styles.iconContent}
        />
        <View style={styles.textIconcontainer}>
          <Text style={styles.textIcon}>Trả nợ ngân hàng</Text>
        </View>

        <FontAwesome
          name="angle-right"
          size={20}
          style={styles.iconVersion}
          color="green"
        />
      </TouchableOpacity>}
    </View>
  );
};

export default LoanOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246, 255, 255)',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overviewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  textName: {
    color: 'black',
    fontSize: 20,
    paddingVertical: 20,
    fontWeight: '500',
  },
  overviewContentMoney: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 100,
    backgroundColor: 'white',
    borderColor: 'rgb(245, 247, 246)',
    borderWidth: 0.6,
    borderRadius: 30,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  textMoney: {
    color: 'rgb(175, 42, 234)',
    fontSize: 40,
  },
  overviewContentMoneyTitle: {
    color: 'rgb(175, 42, 234)',
    fontSize: 20,
  },
   containerButton: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 20
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
  containerButtonHide: {
    backgroundColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 20
  }
});
