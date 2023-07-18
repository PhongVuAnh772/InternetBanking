import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import axios from 'axios';

const GoogleMap = () => {

  const HANOI_COORDINATE = {
    latitude: 21.029045,
    longitude: 105.806627,
  };
  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: HANOI_COORDINATE.latitude,
        longitude: HANOI_COORDINATE.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // showsBuildings={true}
      // mapType="satellite"
      showsUserLocation={true}
      minZoomLevel={0}>
      {/* <Marker /> */}
    </MapView>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
