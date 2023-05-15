import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import user from '../../../../assets/girl.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentExtended from './ContentExtended';
import ContentExtendedDown from './ContentExtenedDown';
const ExtendedContent = ({name = 'VU ANH PHONG'}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={user} />
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
      </View>
      <ContentExtended name="Cài đặt" icon="gear" />
      <ContentExtended name="Smart OTP" icon="cc-discover" />

      <ContentExtended name="Chủ đề giao diện" icon="paint-brush" />

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

      <ContentExtendedDown
        name="Câu hỏi thường gặp"
        icon="question-circle"
        style={{paddingVertical: 0}}
      />
      <View style={styles.containerIconFooter}>
        <View>
          <FontAwesome
            name="globe"
            size={30}
            color="white"
            style={styles.contentIconFooter}
          />
          <Text style={styles.textIconFooter}>Xem trang web</Text>
        </View>
        <View>
          <FontAwesome
            name="wechat"
            size={30}
            color="white"
            style={styles.contentIconFooter}
          />
          <Text style={styles.textIconFooter}>Hỗ trợ</Text>
        </View>
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
    backgroundColor: 'green',
  },
  textIconFooter: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '400',
  },
});
