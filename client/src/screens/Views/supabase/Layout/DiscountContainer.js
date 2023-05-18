import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FlatListContainer from './FlatListContainer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import discount from '../../main/Layout/mobile/data/advertisement';

const DiscountContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <FontAwesome style={styles.iconDown} name="angle-down" size={20} />
        <Text style={styles.headerBar}>Thông báo</Text>
        <TouchableOpacity style={styles.buttonBar}>
          <View style={styles.buttonAdd}>
            <FontAwesome
              name="plus"
              size={15}
              color="white"
              style={{
                paddingHorizontal: 4,
                paddingVertical: 4,
                backgroundColor: 'green',
                borderRadius: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* {discount.map((item, index) => (
        <View style={styles.item}>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.title}>{item.time} Aloo</Text>
        </View>
      ))} */}
    </View>
  );
};

export default DiscountContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  containerHeader: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerBar: {flex: 5},
  iconDown: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonBar: {flex: 4, flexDirection: 'row-reverse', alignItems: 'center'},
  textTouchableOpacity: {
    color: 'green',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  buttonAdd: {
    paddingLeft: 8,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
