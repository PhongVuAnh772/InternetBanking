import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import discount from '../data/a';

const FlatListContainer = () => {
  return (
    <FlatList
      data={discount}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.title}>{item.time} Aloo</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default FlatListContainer;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 50,
    height: 50,
  },
});
