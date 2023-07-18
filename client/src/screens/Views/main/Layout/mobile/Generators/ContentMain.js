import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {flatIndex} from '../data/index';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContentMainIcon = () => {
  const navigation = useNavigation();
  const numColumns = Math.ceil(flatIndex.length / 2);
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.container}
      // onPress={navigation.navigate(`${item.screen}`)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name={item.icon} size={16} color="rgb(16, 143, 87)" />
      </View>
      <Text style={styles.Text}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{paddingVertical: 5}}>
      <FlatList
        data={flatIndex}
        key={numColumns}
        keyExtractor={item => item.screen}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={numColumns}
      />
    </ScrollView>
  );
};

export default ContentMainIcon;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingRight: 10,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingVertical: 18,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  Text: {
    paddingTop: 5,
    textAlign: 'center',
    color: 'black',
  },
});
