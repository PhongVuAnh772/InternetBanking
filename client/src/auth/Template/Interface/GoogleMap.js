import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';

const GoogleMap = () => {
  // const [initialRegion, setInitialRegion] = useState(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setInitialRegion({
  //         latitude,
  //         longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     error => console.log(error),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // }, []);

  // if (!initialRegion) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  const HANOI_COORDINATE = {
    latitude: 21.0278,
    longitude: 105.8342,
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
