import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import ads1 from '../../../../../../assets/ads/1.jpg';
import ads2 from '../../../../../../assets/ads/2.jpg';

import ads3 from '../../../../../../assets/ads/3.jpg';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
    // height: '30%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
  container: {
    paddingVertical: 10,
    height: 250,
    paddingHorizontal: 10,
  },
});

export default class SwiperComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          showsPagination
          dotStyle={{
            backgroundColor: 'gray',
            borderWidth: 1,
            borderColor: 'white',
          }}
          paginationStyle={{bottom: 50}}
          activeDotStyle={{backgroundColor: 'rgb(0, 172, 83)'}}>
          {/* <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View> */}
          <Image style={styles.image} source={ads1} />
          <View style={styles.slide2}>
            <Image style={styles.image} source={ads2} />
          </View>
          <View style={styles.slide3}>
            <Image style={styles.image} source={ads3} />
          </View>
        </Swiper>
      </View>
    );
  }
}

AppRegistry.registerComponent('myproject', () => SwiperComponent);
