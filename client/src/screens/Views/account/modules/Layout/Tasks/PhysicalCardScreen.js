import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import credit from '../../../../../../assets/img-credit-physical.png';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../app/hooks/hooks';
import SwiperPhysicalCard from './SwiperPhysicalCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';

const PhysicalCardScreen = () => {
  const email = useAppSelector(state => state.signUp.email);
  const numberCreditCard = useAppSelector(state => state.credit.CC_number);
  const Expiry_Date = useAppSelector(state => state.credit.DateClosed);
  const networkState = useAppSelector(state => state.network.ipv4Address);
  const navigation = useNavigation()
  const handleNext = async () =>  {
    
    navigation.navigate("AddressSendCard")
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            size={20}
            style={styles.iconModal}
            color="black"
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerText}>Phát hành thẻ tín dụng</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.physicalCardTitle}>
          Vui lòng xác nhận thông tin và hạn mức tín dụng thẻ
        </Text>
        <View style={styles.informationCredit}>
          <Text style={styles.physicalCardLabel}>Email nhận sao kê</Text>
          <Text style={styles.physicalCardContent}>{email}</Text>
        </View>
        <View style={styles.informationCredit}>
          <Text style={styles.physicalCardLabel}>Số thẻ được cấp</Text>
          <Text style={styles.physicalCardContent}>{numberCreditCard}</Text>
        </View>
        <View style={styles.informationCredit}>
          <Text style={styles.physicalCardLabel}>Hạn thẻ</Text>
          <Text style={styles.physicalCardContent}>{Expiry_Date}</Text>
        </View>
        <SwiperPhysicalCard />
        <TouchableOpacity onPress={() => handleNext()} style={styles.buttonNext}>
                    <Text style={styles.buttonNextText}>Tiếp tục</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhysicalCardScreen;

const styles = StyleSheet.create({
  creditImage: {
    width: '100%',
    height: 250,
  },
  container: {
    flex: 1,

  },
  contentContainer: {
    flex: 9,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(246, 246, 254)'
  },
  informationCredit: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius:20
  },
  headerContainer: {
    flex: 0.4,
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(245, 245, 245)',
  },
  TouchableOpacity: {},
  headerText: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  physicalCardLabel: {
    color: 'rgb(128, 128, 128)',
    paddingVertical: 5,
    fontSize: 16,
  },
  physicalCardTitle: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  physicalCardContent: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonNext: {
    width: '100%',
    height: 40,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNextText: {
    color: 'white',
    fontSize: 19
  }
});
