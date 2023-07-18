import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import ContentModel from './model/ContentModel';
import girl from '../../assets/girl.png';
import computer from '../../assets/computer-science.png';
import lock from '../../assets/locked.png';
import call from '../../assets/whatsapp.png';
import calendar from '../../assets/calendar.png';

const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTicket, setModalVisibleTicket] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.contentTouchable}>
            <MaterialIcons
              name="support-agent"
              size={25}
              color="rgb(0, 172, 84)"
            />
          </View>
          <Text style={styles.iconText}>Hỗ trợ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('GoogleMaps')}>
          <View style={styles.contentTouchable}>
            <FontAwesome name="calculator" size={25} color="rgb(0, 172, 84)" />
          </View>
          <Text style={styles.iconText}>ATMs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity>
          <View style={styles.contentTouchable}>
            <MaterialIcons
              name="question-answer"
              size={25}
              color="rgb(0, 172, 84)"
            />
          </View>
          <Text style={styles.iconText}>Hỏi đáp</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => setModalVisibleTicket()}>
          <View style={styles.contentTouchable}>
            <FontAwesome name="ticket" size={25} color="rgb(0, 172, 84)" />
          </View>
          <Text style={styles.iconText}>Đổi vé sự kiện</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome
                  name="close"
                  size={25}
                  style={styles.iconModal}
                  color="black"
                />
              </Pressable>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.textHelp}>Trợ giúp</Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={styles.contentModal}
            showsVerticalScrollIndicator={false}>
            <ContentModel title="Chat với VPBank" name={girl} />
            <ContentModel title="Cổng chăm sóc khách hàng" name={computer} />

            <ContentModel
              title="Đặt lịch giao dịch tại quầy/chi nhánh"
              name={calendar}
            />

            <ContentModel title="Khóa tài khoản VPBank NEO" name={lock} />

            <ContentModel title="Gọi hỗ trợ 24/7" name={call} />
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTicket}
        onRequestClose={() => {
          setModalVisibleTicket(!modalVisibleTicket);
        }}>
        <View style={styles.centeredViewTicket}>
          <View style={styles.titleModalTicket}>
            <Text style={styles.titleContainerTicket}>Thông báo !</Text>
            <Text style={styles.titleDecsTicket}>
              Vui lòng đăng nhập để truy cập dịch vụ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnModalTicket}
            onPress={() => {
              setModalVisibleTicket(!modalVisibleTicket);
            }}>
            <Text style={styles.btnModalTicketText}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 13,
    textAlign: 'center',
    width: 55,
  },
  content: {width: 70, height: 50, textAlign: 'center'},
  iconText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
  },
  centeredView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
  },
  centeredViewTicket: {
    bottom: '40%',
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '70%',
    height: '20%',
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
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalTicket: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(233, 233, 233)',
    flex: 1,
    borderRadius: 10,
  },
  btnModalTicketText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
});
