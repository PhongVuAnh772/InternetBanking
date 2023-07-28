import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {flatIndex} from './dataCurrency';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CurrencyScreen = () => {
  const [text, setChangeText] = useState('');
  const [users, setUsers] = useState(flatIndex);
  const navigation = useNavigation()
  const filteredData = users.filter(el => {
    if (text === '') {
      return el;
    } else {
      return (
  el.abbreviation.toLowerCase().includes(text.toLowerCase()) ||
  el.currency.toLowerCase().includes(text.toLowerCase())
);
    }
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currencyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            size={20}
            style={styles.iconModal}
            color="black"
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.Text}>Tỷ giá ngoại tệ</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Tìm ngoại tệ"
          placeholderTextColor="rgb(173, 138, 216)"
          onChangeText={setChangeText}
          value={text}
        />
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={styles.iconModalContainer}>
          <FontAwesome
            name="search"
            size={18}
            style={styles.iconModalInput}
            color="rgb(173, 138, 216)"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.currencyContent}>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.TextRow,
              {fontWeight: 'bold', color: 'rgb(173, 138, 216)'},
            ]}>
            <Text>Loại ngoại tệ</Text>
          </Text>
          <Text
            style={[
              styles.TextRow,
              {fontWeight: 'bold', color: 'rgb(173, 138, 216)'},
            ]}>
            <Text>Tên ngoại tệ</Text>
          </Text>
          <Text
            style={[
              styles.TextRow,
              {fontWeight: 'bold', color: 'rgb(173, 138, 216)'},
            ]}>
            <Text>Mua tiền mặt</Text>
          </Text>

          <Text
            style={[
              styles.TextRow,
              {fontWeight: 'bold', color: 'rgb(173, 138, 216)'},
            ]}>
            <Text>Mua chuyển khoản</Text>
          </Text>

          <Text
            style={[
              styles.TextRow,
              {fontWeight: 'bold', color: 'rgb(173, 138, 216)'},
            ]}>
            <Text>Giá bán</Text>
          </Text>
        </View>
        {filteredData.map((data, index) => {
          return (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.TextRow, {fontWeight: 'bold'}]}>
                {data.abbreviation}
              </Text>
              <Text style={[styles.TextRow]}>{data.currency}</Text>
              <Text style={[styles.TextRow, {color: 'rgb(31, 197, 127)'}]}>
                {data.moneyBanking}
              </Text>
              <Text style={[styles.TextRow, {color: 'rgb(31, 197, 127)'}]}>
                {data.moneyCash}
              </Text>
              <Text style={[styles.TextRow, {color: 'rgb(20, 109, 255)'}]}>
                {data.price}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CurrencyScreen;

const styles = StyleSheet.create({
  currencyHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  TextRow: {
    textAlign: 'left',
    alignSelf: 'center',
    flex: 0.3,
    paddingHorizontal: 5,
    fontSize: 17,
    color: 'black',
    paddingVertical: 3,
  },
  currencyContent: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  TextInput: {
    paddingHorizontal: 40,
    backgroundColor: 'white',
    paddingVertical: 10,
    color: 'black',
    fontSize: 20,
  },
  iconModalInput: {
    position: 'absolute',

    left: 15,
    bottom: 15,
  },
  iconModalContainer: {},
});
