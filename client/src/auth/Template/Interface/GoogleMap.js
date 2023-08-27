import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const GoogleMap = () => {
  const navigation = useNavigation()
  const HANOI_COORDINATE = {
    latitude: 21.029045,
    longitude: 105.806627,
  };
  return (
    <>
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
    <TouchableOpacity 
            style={[styles.cardModal, styles.elevationModal]}
            
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={25} color="black" />
          </TouchableOpacity></>
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
  cardModal: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    backgroundColor: 'white',

    width: 45,
    height: 45,

    borderRadius: 10,
  },
  elevationModal: {
    elevation: 10,
    shadowColor: 'rgb(57, 51, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
