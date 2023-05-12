import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentModel from '../../Template/model/ContentModel';
import SignUpNumberScreen from '../../../screens/Layout/SignUpNumberScreen';
import {useNavigation} from '@react-navigation/native';

const SignUpComponents = ({title, desc, header, image}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (header === 'chọn số đẹp') {
      navigation.navigate('SignUpNumberScreen');
    } else if (header === 'ngân hàng số') {
      setModalVisible(true);
    } else {
      return;
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          handlePress();
        }}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.header}>{header}</Text>

          <Text style={styles.desc}>{desc}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="angle-right"
            size={20}
            color="white"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

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
                <Text style={styles.textHelp}>Sản phẩm đã có tại VPBank</Text>
              </View>
            </View>
          </View>
          <ScrollView
            style={styles.contentModal}
            showsVerticalScrollIndicator={false}>
            <ContentModel title="Tài khoản thanh toán" icon="credit-card" />
            <ContentModel title="Thẻ tín dụng" icon="cc-mastercard" />

            <ContentModel
              title="Thẻ ghi nợ nội địa/ATM"
              icon="credit-card-alt"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default SignUpComponents;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: null,
    maxHeight: 100,
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {height: 90, width: 90, flex: 1, borderRadius: 10},
  textContainer: {flex: 2, paddingHorizontal: 7},
  icon: {
    backgroundColor: 'rgb(0, 175, 83)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 'auto',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'gray',
  },
  textHelp: {fontSize: 16, color: 'black'},
  header: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'black',
    fontWeight: '600',
  },
  desc: {color: 'black', fontSize: 15},
  centeredView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
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
});
