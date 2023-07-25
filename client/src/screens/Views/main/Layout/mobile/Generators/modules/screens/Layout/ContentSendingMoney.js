import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks/hooks';
import {
  setBankChoosing,
  setBankChoosingIcon,
  setSTKBankChoosing,
  setBankValueMoney,
  setmessageTransfer,
  setlongNameBankChoosing,
  setbinBankChoosing,
  setNameOfSTKBankChoosing,
} from '../../../../../../../../../slice/transferSlice';
import {fetchOtherBank} from '../../../../../../../../../slice/getOtherBankSlice';
import axios from 'axios';

const ContentSendingMoney = () => {
  const navigation = useNavigation();
  const [inputValueOther, setInputValueOther] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [valueSearch, setvalueSearch] = useState('');
  const [responseDataBanks, setResponseDataBanks] = useState([]);
  const [responseDataUser, setResponseDataUser] = useState([]);
  const [STKSendingPerson, setSTKSendingPerson] = useState('');
  const [onChangeMoney, setOnChangeMoney] = useState(0);
  const BankChoosingIconValue = useAppSelector(
    state => state.transfer.BankChoosingIcon,
  );
  const binBankChoosingValue = useAppSelector(
    state => state.transfer.binBankChoosing,
  );
  const STKBankChoosingValue = useAppSelector(
    state => state.transfer.STKBankChoosing,
  );
  const BankValueMoneyValue = useAppSelector(
    state => state.transfer.BankValueMoney,
  );
  const messageTransferValue = useAppSelector(
    state => state.transfer.messageTransfer,
  );
  const longNameBankChoosingValue = useAppSelector(
    state => state.transfer.longNameBankChoosing,
  );
  const NameOfSTKBankChoosingValue = useAppSelector(
    state => state.transfer.NameOfSTKBankChoosing,
  );
  const userNameLogined = useAppSelector(state => state.signUp.fullName)
  const STKLogined = useAppSelector(state => state.signUp.newAccountSTK)
  const userSTK = useAppSelector(state => state.signUp.newAccountSTK);
  const userBankMoney = useAppSelector(state => state.credit.Balance);
  const otherBank = useAppSelector(state => state.otherBank);
  const inputRef = useRef(null);
  const [onChangeMessage, setOnChangeMessage] = useState(
    `${userNameLogined} chuyen khoan`,
  );
  
  const handleInputChange = text => {
    setInputValueOther(text);
  };

  const characterCount = inputValueOther.length;
  const BankChoosingValue = useAppSelector(
    state => state.transfer.BankChoosing,
  );
  
  

  const dispatch = useAppDispatch();
  const handleFetchOtherBank = () => {
    dispatch(fetchOtherBank());
  };

  const handlePressOneBank = (logo, bin, shortName, longName) => {
    dispatch(setBankChoosing(shortName));
    dispatch(setBankChoosingIcon(logo));
    dispatch(setbinBankChoosing(bin));
    dispatch(setlongNameBankChoosing(longName));
    dispatch(setNameOfSTKBankChoosing(''));
    dispatch(setSTKBankChoosing(''));

    setModalVisible(false);
    console.log(
      BankChoosingIconValue,
      binBankChoosingValue,
      BankChoosingValue,
      longNameBankChoosingValue,
    );
  };

  const handleContinue = () => {
    if (onChangeMessage && onChangeMoney) {
    }
    dispatch(setBankValueMoney(onChangeMoney));
    dispatch(setmessageTransfer(onChangeMessage));
    dispatch(setSTKBankChoosing(STKSendingPerson));

    navigation.navigate('ConfirmInformationSendingWrap');
  };
  const fetchDataBanks = async () => {
    try {
      const config = {
        method: 'get',
        url: 'https://api.vietqr.io/v2/banks',
      };

      const response = await axios(config);
      if (response && response.data) {
        setResponseDataBanks(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  var data = JSON.stringify({
    bin: binBankChoosingValue,
    accountNumber: STKSendingPerson,
  });
  const handleCancelChooseBank = () => {
    dispatch(setBankChoosing(''));
    dispatch(setBankChoosingIcon(''));
    dispatch(setbinBankChoosing(''));
    dispatch(setlongNameBankChoosing(''));
    dispatch(setNameOfSTKBankChoosing(''));
    dispatch(setSTKBankChoosing(''));
    setModalVisible(!modalVisible);
  };

  const fetchDataUserSTK = async () => {
    try {
      const config = {
        method: 'post',
        url: `https://dominhhai.com/api/acb/?accountNumber=${STKSendingPerson}&bankCode=${binBankChoosingValue}`,
      };

      const response = await axios(config);
      setResponseDataUser(response.data);

      if (
        responseDataUser.results &&
        responseDataUser.results.ownerName !== undefined
      ) {
        dispatch(setNameOfSTKBankChoosing(responseDataUser.results.ownerName));
      } else {
        await fetchDataUserSTK();
      }
      console.log(responseDataUser);
    } catch (error) {
      console.log(error);
    }
  };
  const renderBankItem = ({item}) => (
    <TouchableOpacity
      style={styles.otherBankContainer}
      onPress={() =>
        handlePressOneBank(item.logo, item.bin, item.shortName, item.name)
      }>
      <Image
        source={{
          uri: item.logo,
        }}
        style={styles.bankLogo}
      />
      <View style={styles.otherBankText}>
        <Text style={styles.otherBankName}>{item.shortName}</Text>

        <Text style={styles.otherBankName}>
          {item.shortName} - {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerMoneyInfo}>
            <Text style={styles.textheaderMoneyInfo}>Tài khoản nguồn</Text>
          </View>
          <View style={styles.contentMoneyInfo}>
            <View style={styles.contentIcon}>
              <FontAwesome
                name="credit-card"
                size={20}
                color="rgb(0, 173, 83)"
              />
            </View>
            <View style={styles.contentMoneyDes}>
              <Text style={styles.moneyValueSpecified}>
                {userBankMoney}{' '}
                <Text style={styles.moneyValueSpecifiedCurrency}>đ</Text>
              </Text>
              <View style={styles.accountInfoDemo}>
                <Text style={styles.moneyValue}>Normal Account</Text>
                <Text style={styles.separate}>|</Text>
                <Text style={styles.moneyValue}>{userSTK}</Text>
              </View>
            </View>
            <View style={styles.contentIcon}>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color="#909a9c"
              />
            </View>
          </View>
        </View>

        <View style={styles.contentSendingMoneyBank}>
          <View style={styles.headerMoneyInfo}>
            <Text style={styles.textheaderMoneyInfo}>Thông tin người nhận</Text>
          </View>
          <View style={styles.contentMoneyInfo}>
            <View style={styles.contentMoneyDes}>
              <TouchableOpacity
                style={styles.accountInfo}
                onPress={() => {
                  setModalVisible(true);
                  handleFetchOtherBank();
                  fetchDataBanks();
                }}>
                <View style={styles.contentIcon}>
                  <Text style={styles.moneyValue}>Ngân hàng nhận</Text>
                  {BankChoosingValue === '' ? (
                    <Text style={styles.moneyValueBank}>
                      Hãy chọn ngân hàng thụ hưởng
                    </Text>
                  ) : (
                    <Text style={styles.moneyValueBank}>
                      {BankChoosingValue}
                    </Text>
                  )}
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="#909a9c"
                />
              </TouchableOpacity>
              <View style={styles.contentSTKInfoInput}>
                <TextInput
                  style={styles.inputSTK}
                  placeholder="Số tài khoản/iNick"
                  placeholderTextColor="rgb(145, 154, 156)"
                  ref={inputRef}
                  onChangeText={setSTKSendingPerson}
                  value={
                    STKBankChoosingValue
                      ? STKBankChoosingValue
                      : STKSendingPerson
                  }
                  onBlur={() => {
                    fetchDataUserSTK();
                  }}
                />
                <FontAwesome
                  name="id-card-o"
                  size={20}
                  color="rgb(0, 173, 83)"
                />
              </View>
              {/* {messageError} */}
              <View style={styles.contentSTKInfoInput}>
                <TextInput
                  style={styles.inputSTK}
                  placeholder="Tên người dùng"
                  placeholderTextColor="rgb(145, 154, 156)"
                  value={NameOfSTKBankChoosingValue}
                />
                <FontAwesome
                  name="street-view"
                  size={20}
                  color="rgb(0, 173, 83)"
                />
              </View>
              <View style={styles.contentSTKInfoInput}>
                <TextInput
                  style={styles.inputSTKValue}
                  placeholder="0"
                  placeholderTextColor="rgb(141, 152, 154)"
                  keyboardType="number-pad"
                  onChangeText={setOnChangeMoney}
                  // value={onChangeMoney}
                />
                <Text style={styles.inputSTKValueCurrencySpecified}>đ</Text>
              </View>
              <View style={styles.contentSTKInfoInputOther}>
                <TextInput
                  style={styles.inputSTK}
                  placeholder="Nội dung (Không bắt buộc)"
                  placeholderTextColor="rgb(145, 154, 156)"
                  onChangeText={setOnChangeMessage}
                />
                <View style={styles.contentSTKInfoInputOtherCounting}>
                  <FontAwesome
                    name="envelope-open"
                    size={20}
                    color="rgb(0, 173, 83)"
                    style={{transform: [{rotate: '18deg'}]}}
                  />
                  <Text
                    style={styles.contentSTKInfoInputOtherCountingSpecified}>
                    {characterCount}/160
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.buttonFooter}
          onPress={() => handleContinue()}>
          <Text style={styles.buttonFooterText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {flex: 1}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: 'rgb(238, 236, 240)',
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}>
              <Pressable onPress={() => handleCancelChooseBank()}>
                <FontAwesome
                  name="close"
                  size={25}
                  style={styles.iconModal}
                  color="black"
                />
              </Pressable>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.textTitle}>Chọn ngân hàng</Text>
              </View>
            </View>
            <View style={styles.inputSearch}>
              <TextInput
                value={valueSearch}
                onChangeText={setvalueSearch}
                style={styles.inputSearchSpecified}
                placeholder="Tìm kiếm ngân hàng"
                placeholderTextColor="gray"
              />
              <FontAwesome
                name="search"
                size={20}
                color="gray"
                style={styles.searchIcon}
              />
            </View>
            <FlatList
              data={responseDataBanks.data}
              renderItem={renderBankItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ContentSendingMoney;

const styles = StyleSheet.create({
  container: {},
  headerMoneyInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgb(244, 245, 246)',
    borderBottomColor: 'rgb(244, 245, 246)',
  },
  contentMoneyInfo: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentIcon: {
    flex: 1,
  },
  contentSTKInfoInput: {
    // paddingHorizontal: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textheaderMoneyInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  accountInfoDemo: {flexDirection: 'row'},
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separate: {
    paddingHorizontal: 5,
    fontSize: 15,
    color: '#909a9c',
  },
  contentMoneyDes: {
    flex: 1,
    paddingHorizontal: 5,
  },
  moneyValue: {
    fontSize: 18,
    color: '#909a9c',
  },
  moneyValueSpecified: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  inputSTK: {
    fontSize: 20,
    color: 'black',
  },
  contentIcon: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  moneyValueSpecifiedCurrency: {
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
  },
  contentSendingMoneyBank: {
    marginVertical: 20,
  },
  inputSTKValue: {
    fontSize: 50,
    color: 'black',
  },
  moneyValueBank: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  },
  inputSTKValueCurrencySpecified: {
    color: 'rgb(146, 156, 157)',
    fontSize: 24,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '500',
    textDecorationLine: 'underline',
    borderColor: 'rgb(235, 241, 242)',
  },
  contentSTKInfoInputOther: {
    paddingTop: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(237, 238, 239)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSTKInfoInputOtherCounting: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSTKInfoInputOtherCountingSpecified: {
    color: 'rgb(170, 176, 179)',
    paddingTop: 5,
  },
  footerContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonFooter: {
    backgroundColor: 'rgb(0, 173, 83)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooterText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  centeredView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '99%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  textTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputSearchSpecified: {
    width: '100%',
    backgroundColor: 'rgb(230, 230, 230)',
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
    height: 40,
    paddingLeft: 35,
  },
  inputSearch: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 22,
    left: 15,
  },
  otherBankName: {
    color: 'black',
    fontSize: 17,
    paddingLeft: 10,
  },
  // otherBankContainer: {
  //   width: '100%',
  // },
  bankLogo: {
    height: 50,
    width: 50,
  },
  otherBankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(253, 255, 252)',
  },
});
