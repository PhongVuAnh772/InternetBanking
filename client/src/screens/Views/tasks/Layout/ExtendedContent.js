import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import usergirl from '../../../../assets/girl.png';
import userman from '../../../../assets/man.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentExtended from './ContentExtended';
import ContentExtendedDown from './ContentExtenedDown';
import {useAppSelector} from '../../../../app/hooks/hooks';
import {useNavigation} from '@react-navigation/native';

const ExtendedContent = () => {
  const gender = useAppSelector(state => state.signUp.sex);
  const name = useAppSelector(state => state.signUp.fullName);
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => navigation.navigate('UserInformationSpecified')}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={gender === 'M' ? userman : usergirl}
          />
        </View>

        <View style={styles.infoDesc}>
          <Text style={styles.infoName}>{name}</Text>
          <Text style={styles.infoName}>Thông tin cá nhân</Text>
        </View>
        <FontAwesome
          name="angle-right"
          size={20}
          color="gray"
          style={styles.icon}
        />
      </TouchableOpacity>

      <ContentExtended name="Phiên bản" icon="wifi" />

      <ContentExtendedDown
        name="Tỷ giá ngoại tệ"
        icon="bar-chart-o"
        style={{paddingVertical: 0}}
      />

      <ContentExtendedDown
        name="ATM và chi nhánh"
        icon="location-arrow"
        style={{paddingVertical: 0}}
      />

      {/* <ContentExtendedDown
        name="Câu hỏi thường gặp"
        icon="question-circle"
        style={{paddingVertical: 0}}
      /> */}
      <View style={styles.containerIconFooter}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://vpbankonline.vpbank.com.vn')}>
          <FontAwesome
            name="globe"
            size={30}
            color="white"
            style={styles.contentIconFooter}
          />
          <Text style={styles.textIconFooter}>Xem trang web</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${1900545415}`)}>
          <FontAwesome
            name="wechat"
            size={30}
            color="white"
            style={styles.contentIconFooter}
          />
          <Text style={styles.textIconFooter}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ExtendedContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 9,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  imageContainer: {flex: 3},
  image: {
    height: 80,
    width: 80,

    borderRadius: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  infoDesc: {
    paddingRight: 10,
    justifyContent: 'flex-start',
    flex: 6,
  },
  infoName: {color: 'black', fontSize: 15},
  icon: {
    alignSelf: 'center',
    flex: 1,
  },
  containerIconFooter: {
    marginVertical: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentIconFooter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: 'rgb(16, 143, 87)',
  },
  textIconFooter: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '400',
  },
});
