import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
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
    <Pressable
      style={styles.container}
      // onPress={navigation.navigate(`${item.screen}`)}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name={item.icon} size={20} color="rgb(43, 163, 104)" />
      </View>
      <Text style={styles.Text}>{item.title}</Text>
    </Pressable>
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={true}
      horizontal
      contentContainerStyle={{paddingVertical: 20}}>
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
    paddingRight: 20,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingVertical: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  Text: {
    paddingTop: 5,
    textAlign: 'center',
    color: 'black',
  },
});
