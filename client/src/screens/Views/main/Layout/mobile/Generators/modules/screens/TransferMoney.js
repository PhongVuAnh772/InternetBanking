import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentExtendedDown from '../../../../../../tasks/Layout/ContentExtenedDown';
import {useNavigation} from '@react-navigation/native';
const TransferMoney = ({name = 'VU ANH PHONG'}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            size={20}
            style={styles.iconModal}
            color="black"
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.Text}>Chuyển tiền</Text>
        </View>
      </View>
      <ScrollView
        style={styles.containerContent}
        showsVerticalScrollIndicator={false}>
        <ContentExtendedDown
          name="Tới số tài khoản"
          icon="bar-chart-o"
          style={{paddingVertical: 0}}
        />

        <ContentExtendedDown
          name="Tới số thẻ"
          icon="location-arrow"
          style={{paddingVertical: 0}}
        />

        <ContentExtendedDown
          name="Tới người nhận tại VNPost"
          icon="handshake-o"
          style={{paddingVertical: 0}}
        />
        <ContentExtendedDown
          name="Danh sách người nhận"
          icon="id-card"
          style={{paddingVertical: 0}}
        />
        <ContentExtendedDown
          name="Giao dịch đặt lịch"
          icon="ticket"
          style={{paddingVertical: 0}}
        />
        <ContentExtendedDown
          name="Tặng quà"
          icon="institution"
          style={{paddingVertical: 0}}
        />
        <View style={styles.containerIconFooter}>
          <Text style={styles.textTransferForm}>Mẫu giao dịch</Text>
          <TouchableOpacity>
            <Text style={styles.textTransferFormBtn}>Tất cả</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransferMoney;

const styles = StyleSheet.create({
  container: {flex: 1},
  containerContent: {
    marginTop: 5,
    flex: 9,
  },
  containerHeader: {
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchableOpacity: {},
  Text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  textTransferFormBtn: {
    color: 'green',
  },

  textTransferForm: {
    color: 'black',
    fontSize: 15,
  },
});
