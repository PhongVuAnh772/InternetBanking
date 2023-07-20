import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../app/hooks/hooks';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const CVVScreen = () => {
  const dispatch = useAppDispatch();
  const CVVNumber = useAppSelector(state => state.credit.CVVNumber);
  const CC_Number = useAppSelector(state => state.credit.CC_number);
  const dateCreated = useAppSelector(state => state.credit.DateValue);
  const dateClosed = useAppSelector(state => state.credit.DateClosed);
  const fullName = useAppSelector(state => state.signUp.fullName);
  const navigation = useNavigation();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Đã chép vào bộ nhớ tạm',

    });
  };
  const handleCopy = () => {
    Clipboard.setString(CC_Number)
    showToast()
  }
  return (
    <>
    <View style={styles.container}>
      <View style={styles.CVVHeader}>
        <View style={{flex: 1, alignItems: 'center', paddingLeft: 20}}>
          <Text style={styles.Text}>Smart OTP</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountMainContainer')}>
          <FontAwesome
            name="home"
            size={20}
            style={styles.iconModal}
            color="rgb(0, 183, 79)"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.CVVContent}>
        <View style={styles.CVVWarning}>
          <MaterialIcons
            name="info"
            size={20}
            style={styles.iconModal}
            color="rgb(0, 183, 79)"
          />
          <Text style={styles.textWarning}>
            Hãy bảo mật thông tin số thẻ, số CVV của bạn
          </Text>
        </View>
        <View style={styles.CVVInformation}>
          <View style={styles.CreditCardContainer}>
            <Text style={styles.CreditCardTitleText}>Thông tin thẻ</Text>
          </View>
          <View style={styles.CreditCardContainer}>
            <View style={styles.CCNumberContainer}>
              <Text style={styles.CreditBounding}>Số thẻ</Text>
              <Text style={styles.CreditInformation}>{CC_Number}</Text>
            </View>
            <TouchableOpacity onPress={() => handleCopy()}>
              <MaterialIcons
                name="content-copy"
                size={20}
                style={styles.iconModal}
                color="rgb(0, 183, 79)"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.CreditCardContainer}>
            <View style={styles.CCNumberContainer}>
              <Text style={styles.CreditBounding}>Số CVV</Text>
              <Text style={styles.CreditInformation}>{CVVNumber}</Text>
            </View>
          </View>
          <View style={styles.CreditCardContainer}>
            <View style={styles.DateCreatedContainer}>
              <Text style={styles.CreditBounding}>Ngày hiệu lực</Text>
              <Text style={styles.CreditInformation}>{dateCreated}</Text>
            </View>
            <View style={styles.DateClosedContainer}>
              <Text style={styles.CreditBounding}>Ngày hết hạn</Text>
              <Text style={styles.CreditInformation}>{dateClosed}</Text>
            </View>
          </View>
          <View style={styles.CreditCardContainer}>
            <View style={styles.CCNumberContainer}>
              <Text style={styles.CreditBounding}>Họ và tên</Text>
              <Text style={styles.CreditInformationOther}>{fullName}</Text>
            </View>
          </View>
          <View style={styles.CreditCardContainer}>
            <View style={styles.CCNumberContainer}>
              <Text style={styles.CreditBounding}>Loại thẻ</Text>
              <Text style={styles.CreditInformationOther}>VP VISA DEBIT</Text>
            </View>
          </View>
          
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.buttonFooter} onPress={() => navigation.navigate('AccountMainContainer')}>
      <Text style={styles.buttonFooterText}>Hoàn thành</Text>
    </TouchableOpacity>
    </>
  );
};

export default CVVScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(247, 247, 247)'
  },
  CVVHeader: {
    flex: 1,
  },
  CreditCardTitleText:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  CVVHeader: {
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
  CVVContent: {
    flex: 7,
    marginHorizontal: 10,
    marginVertical: 10,
    
  },
  CVVWarning: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(0, 183, 79)',
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  textWarning: {
    fontSize: 18,
    color:'black'
  },
  CVVInformation: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  CreditCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: 'rgb(230, 230, 230)',
    borderBottomWidth: 1,
  },
  CreditBounding: {
    color: 'rgb(124, 124, 124)',
    fontSize: 15
  },
  DateCreatedContainer:{
    flex: 2
  },
  DateClosedContainer: {
    flex: 3
  },
  CreditInformation:{
    color:'rgb(0, 183, 79)',
    fontWeight:'bold',
    fontSize:18
  },
  CreditInformationOther: {
    color:'black',
    fontWeight:'bold',
    fontSize:18
  },
  buttonFooter: {
    position:'absolute',
    width:'90%',
    marginVertical:20,
    paddingVertical:10,
    bottom: 0,
    marginHorizontal:20,
    backgroundColor:'rgb(0, 183, 79)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20
  },
  buttonFooterText: {
    color: 'white',
    fontSize:18
  }
});
