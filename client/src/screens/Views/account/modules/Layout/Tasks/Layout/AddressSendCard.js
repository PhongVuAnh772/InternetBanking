import React, {useState} from 'react';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import MapView, {Callout, Marker} from 'react-native-maps';

const AddressSendCard = () => {
  const [valuelatitude, setvaluelatitude] = useState(0);
  const [valuelongitude, setValuelongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleMap, setVisibleMap] = useState(true);
  const showToast = (type, title, text) => {
    Toast.show({
      type: type,
      text1: title,
      text2: text,
    });
  };
  const handlePlaceSelected = async (data, details = null) => {
    setVisible(true);
    if (details) {
      try {
        //   const res = await axios.post(
        //     `https://maps.googleapis.com/maps/api/geocode/json?place_id=${details.place_id}&key=AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8`,
        //   );

        //   if (res.data.results) {
        //     setTimeout(() => {
        //       setVisible(false);
        //       showToast('success', 'Lấy địa điểm thành công');
        //     }, 3000);
        //     setvaluelatitude(res.data.results[0].geometry.location.lat)
        //     setValuelongitude(res.data.results[0].geometry.location.lng)
        //   console.log(res.data.results[0].geometry.location.lat,res.data.results[0].geometry.location.lng)
        //     console.log(valuelatitude, valuelongitude)
        //     setVisibleMap(true)
        const query = new URLSearchParams({
          q: 'string',
          locale: 'en',
          limit: '5',
          reverse: 'false',
          debug: 'false',
          point: 'string',
          provider: 'default',
          key: '1cf0d74f-6e4c-4761-a9a3-0b64c4e011f1',
        }).toString();

        const resp = await fetch(
          `https://graphhopper.com/api/1/geocode?${query}`,
          {method: 'GET'},
        );

        const data = await resp.text();
        console.log(data);
      } catch (err) {
        console.log('Co loi : ' + err);
        console.log('Có lỗi server');
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: valuelatitude,
        longitude: valuelongitude,

      }}
      // showsBuildings={true}
      // mapType="satellite"
      showsUserLocation={true}
      minZoomLevel={2}>
      <Marker
          coordinate={{
            latitude: valuelatitude,
            longitude: valuelongitude,
          }}
          title="Vị trí của Marker"
          description="Mô tả vị trí của Marker"
        />
    </MapView> */}
      {visibleMap && <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: valuelatitude,
        longitude: valuelongitude,

      }}
      // showsBuildings={true}
      // mapType="satellite"
      showsUserLocation={true}
      minZoomLevel={2}>
      <Marker
          coordinate={{
            latitude: valuelatitude,
            longitude: valuelongitude,
          }}
          title="Vị trí của Marker"
          description="Mô tả vị trí của Marker"
        />
    </MapView>}
      {/* <GooglePlacesAutocomplete
        placeholder="Tìm kiếm địa chỉ của bạn"
        placeholderTextColor="black"
        onPress={handlePlaceSelected}
        query={{
          key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8',
          language: 'en',
        }}
        styles={{
          textInput: {
            color: 'black',
          },
          description: {
            color: 'black',
            position: 'absolute',
          },
        }}
      /> */}
      {visible && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{alignSelf: 'center', position: 'absolute'}}
        />
      )}
    </View>
  );
};

export default AddressSendCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
