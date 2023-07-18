import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {flatIndex} from '../data/advertisement';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const AdvertiseMent = () => {
  const cardGap = 16;

  const cardWidth = (Dimensions.get('window').width - cardGap * 4) / 2;

  const navigation = useNavigation();
  const RenderItem = ({item}) => (
    <Pressable
      style={styles.container}
      // onPress={navigation.navigate(`${item.screen}`)}
    >
      {/* <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View> */}
      <Text style={styles.textAlign}>{item.title}</Text>
    </Pressable>
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
      }}>
      {flatIndex.map((subject, i) => {
        return (
          <TouchableOpacity
            key={subject.title}
            style={{
              borderRadius: 10,
              marginVertical: cardGap,
              marginLeft: i % 2 !== 0 ? cardGap : 0,
              width: cardWidth,
              height: 180,
              backgroundColor: 'white',
              borderRadius: 16,
              shadowOpacity: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}
            onPress={() =>
              navigation.navigate('AdvertiseMentSpecified', {subject})
            }>
            <Image source={subject.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.Text}>{subject.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default AdvertiseMent;
const styles = StyleSheet.create({
  containerMain: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    width: '50%',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: 'gray',
    marginVertical: 10,
    marginHorizontal: '1%',
    flex: 1,
  },
  // listContainer: {
  //   paddingHorizontal: '1%',
  // },
  // iconContainer: {
  //   paddingVertical: 20,
  //   backgroundColor: 'white',
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  // },
  Text: {
    // paddingVertical: 1,
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 20,
  },
  // imageContainer: {
  //   width: '100%',
  //   height: '70%',
  // },
  textContainer: {
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
