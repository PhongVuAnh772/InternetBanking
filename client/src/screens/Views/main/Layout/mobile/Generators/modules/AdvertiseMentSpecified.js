import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

import HeaderSpecified from './tasks/HeaderSpecified';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdvertiseMentSpecified = ({route, navigation}) => {
  const {subject} = route.params;
  const {width} = useWindowDimensions();

  console.log(subject);
  return (
    <View style={styles.container}>
      <HeaderSpecified />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={subject.image} style={styles.image} />
        <View style={styles.contentDesc}>
          <Text style={styles.timeDesc}>Thời gian: {subject.time}</Text>
          <Text style={styles.titleDesc}>{subject.title}</Text>
          <Text style={styles.ContentTiledesc}>Nội dung</Text>
          <RenderHtml contentWidth={width} source={subject.source} />
          <TouchableOpacity style={styles.TouchableOpacity}>
            <Text style={styles.TextButton}>Tìm hiểu thêm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdvertiseMentSpecified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentDesc: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  timeDesc: {color: 'green', paddingVertical: 10},
  titleDesc: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  ContentTiledesc: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    paddingVertical: 10,
  },
  ContentDesc: {
    fontSize: 14,
    color: 'black',
  },
  TouchableOpacity: {
    backgroundColor: 'green',
    width: '100%',
    paddingVertical: 10,
    marginVertical: 50,
    borderRadius: 10,
  },
  TextButton: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
