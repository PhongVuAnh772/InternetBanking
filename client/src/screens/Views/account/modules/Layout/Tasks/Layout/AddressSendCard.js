import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../app/hooks/hooks';
import {setgetPhysicalCard} from '../../../../../../../slice/creditSlice';

const GoogleMap = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const HANOI_COORDINATE = {
    latitude: 21.029045,
    longitude: 105.806627,
  };
  const [selectedCoordinate, setSelectedCoordinate] = useState({
    latitude: 21.0010423,
    longitude: 105.8443824,
  });
  const [locationString, setLocationString] = useState('');
  const [modalVisibleTicket, setModalVisibleTicket] = useState(false);
  const networkState = useAppSelector(state => state.network.ipv4Address);
  const CCNumber = useAppSelector(state => state.credit.CC_number);
  const getPhysicalCard = useAppSelector(state => state.credit.getPhysicalCard);
  const dispatch = useAppDispatch()

  const handleClickGetLocationDefault = async () => {
    Geolocation.getCurrentPosition(info => {
      console.log(typeof info.coords.latitude);
      setSelectedCoordinate({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  };
  const handleSubmit = async () => {
    // setModalVisibleTicket(false);
    // setIsLoading(true);

    try {
      console.log(CCNumber)
      const response = await axios.put(
        `${networkState}/api/changePhysicalCards`,
        {
          CC_number: CCNumber,
        },
      );
      if (response.data.success) {
        dispatch(setgetPhysicalCard(true));
        navigation.navigate('SuccessShippingCard');
        console.log(response.data)
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error.message);
    }
  };

  const handlePlaceSelected = async () => {
    try {
      const resp = await axios.get(
        `https://graphhopper.com/api/1/geocode?key=1cf0d74f-6e4c-4761-a9a3-0b64c4e011f1&q=${locationString}&limit=10`,
      );

      const data = resp.data.hits[3];
      setSelectedCoordinate({
        latitude: resp.data.hits[1].point.lat,
        longitude: resp.data.hits[1].point.lng,
      });
      console.log(selectedCoordinate);

      console.log(data);
    } catch (err) {
      console.log('Co loi : ' + err);
      console.log('Có lỗi server');
    }
  };

  return (
    <>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: selectedCoordinate.latitude,
          longitude: selectedCoordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // showsBuildings={true}
        // mapType="satellite"
        showsUserLocation={true}
        minZoomLevel={0}>
        <Marker coordinate={selectedCoordinate} />
      </MapView>
      <TouchableOpacity
        style={[styles.cardModal, styles.elevationModal]}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={25} color="black" />
      </TouchableOpacity>
      <TextInput
        style={[styles.cardModalInput, styles.elevationModal]}
        placeholder="Nhập địa chỉ của bạn"
        placeholderTextColor="gray"
        onChangeText={setLocationString}
      />

      <TouchableHighlight
        style={styles.iconSearch}
        onPress={() => handlePlaceSelected()}>
        <MaterialIcons name="search" size={30} color="black" />
      </TouchableHighlight>
      <TouchableOpacity
        style={[styles.getlocationButton, styles.elevationModal]}
        onPress={() => handleClickGetLocationDefault()}>
        <MaterialIcons
          name="map"
          size={20}
          color="black"
          style={{paddingHorizontal: 5}}
        />
        <Text style={styles.getlocationButtonText}>Dùng vị trí</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.continueButton, styles.elevationModal]}
        onPress={() => setModalVisibleTicket(!modalVisibleTicket)}>
        <MaterialIcons
          name="chevron-right"
          size={40}
          color="black"
          style={{paddingHorizontal: 5}}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleTicket}
        onRequestClose={() => {
          setModalVisibleTicket(!modalVisibleTicket);
        }}>
        <View style={styles.centeredViewTicket}>
          <View style={styles.centeredViewTicketDeep}>
            <View style={styles.titleModalTicket}>
              <Text style={styles.titleContainerTicket}>Thông báo !</Text>
              <Text style={styles.titleDecsTicket}>
                Bạn có chắc chắn là địa chỉ muốn giao tới không ?
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnModalTicket}
              onPress={() => handleSubmit()}>
              <Text style={styles.btnModalTicketText}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModalTicketUnDo}
              onPress={() => {
                setModalVisibleTicket(!modalVisibleTicket);
              }}>
              <Text style={styles.btnModalTicketTextUnDo}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.loading}
        />
      )}
    </>
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
  cardModalInput: {
    position: 'absolute',

    backgroundColor: 'white',
    top: '3%',
    right: '3%',
    width: '80%',
    height: 45,
    // alignSelf: 'flex-end',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
    color: 'black',
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
  iconSearch: {
    position: 'absolute',
    top: '4%',
    right: '4%',
  },
  getlocationButton: {
    flexDirection: 'row',
    width: 120,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '3%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getlocationButtonText: {
    color: 'black',
    fontSize: 18,
  },
  continueButton: {
    flexDirection: 'row',
    width: 70,
    height: 70,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '3%',
    right: '3%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'black',
    fontSize: 18,
  },
  centeredViewTicket: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignSelf: 'center',

    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  centeredViewTicketDeep: {
    bottom: '40%',
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '70%',
    height: '30%',
    borderRadius: 10,
  },
  modalView: {
    paddingVertical: 15,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
  },
  titleContainerTicket: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 10,
  },
  titleDecsTicket: {fontSize: 15, color: 'black'},
  textHelp: {fontSize: 17, color: 'black', fontWeight: '500'},
  titleModalTicket: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalTicket: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(233, 233, 233)',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(0, 175, 83)',

    paddingVertical: 5,
  },
  btnModalTicketText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  btnModalTicketUnDo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    paddingVertical: 5,
  },
  btnModalTicketTextUnDo: {
    fontSize: 17,
    color: 'black',
  },
  loading: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
  },
});
