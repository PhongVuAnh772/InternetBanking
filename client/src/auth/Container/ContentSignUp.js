import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import SignUpComponents from './components/SignUpComponents';
import account from '../../assets/signup/image1.jpg';
import credit from '../../assets/signup/image2.jpg';

const ContentSignUp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.Desc}>
        <Text style={styles.textDesc}>
          Quý khách vui lòng lựa chọn phương thức đăng ký mở tài khoản phù hợp
        </Text>
      </View>
      <View style={styles.contentComponent}>
        <SignUpComponents
          title="Mở tài khoản"
          desc="Dành cho khách hàng mới"
          header="chọn số đẹp"
          image={account}
          index={1}
        />
        <SignUpComponents
          title="Đăng ký dịch vụ"
          desc="Dành cho khách hàng đã có tài khoản/thẻ"
          header="ngân hàng số"
          image={credit}
          index={2}
        />
      </View>
    </View>
  );
};

export default ContentSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: 'rgb(245, 246, 248)',
    paddingHorizontal: 6,
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,
  },
  Desc: {paddingVertical: 15},
  textDesc: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  contentComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
