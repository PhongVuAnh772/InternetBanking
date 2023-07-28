import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import frontSide from '../../../../../../assets/components/lady-card.png'
import backSide from '../../../../../../assets/components/backSide.jpg'


import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
    // height: '30%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
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

export default class SwiperPhysicalCard extends Component {
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
          <Image style={styles.image} source={frontSide} />
          <View style={styles.slide2}>
            <Image style={styles.image} source={backSide} />
          </View>
          
        </Swiper>
      </View>
    );
  }
}

AppRegistry.registerComponent('myproject', () => SwiperPhysicalCard);
