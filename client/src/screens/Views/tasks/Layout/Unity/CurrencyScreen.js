import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {flatIndex} from './dataCurrency';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CurrencyScreen = () => {
  console.log(flatIndex);
  return (
    <View style={styles.container}>
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
          <Text style={styles.Text}>
            Chuyển đến số tài khoản liên ngân hàng
          </Text>
        </View>
      </View>
      <View style={styles.currencyContent}>
        {flatIndex.map((data, index) => {
          return (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.TextRow]}>{data.abbreviation}</Text>
              <Text style={[styles.TextRow]}>{data.currency}</Text>
              <Text style={styles.TextRow}>{data.moneyBanking}</Text>
              <Text style={styles.TextRow}>{data.moneyCash}</Text>
              <Text style={styles.TextRow}>{data.price}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CurrencyScreen;

const styles = StyleSheet.create({
  currencyHeader: {
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
  container: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextRow: {
    textAlign: 'left',
    alignSelf: 'center',
    flex: 0.3,
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
