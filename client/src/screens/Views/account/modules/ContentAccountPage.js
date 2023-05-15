import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BarShow from './Layout/BarShow';
const ContentAccountPage = () => {
  const [showBarAccount, setShowBarAccount] = useState(false);
  const [showBarCreditCard, setShowBarCreditCard] = useState(false);

  const [showBarEarn, setShowBarEarn] = useState(false);
  const [showBarBorrow, setShowBarBorrow] = useState(false);

  return (
    <View style={styles.container}>
      <BarShow name="Tài khoản thanh toán" button="Tài khoản số đẹp" />
      <BarShow name="Thẻ tín dụng" button="Mở mới" />
      <BarShow button="Mở ngay" name="Tiền gửi" />
      <BarShow name="Vay vốn" button="Mở mới" />
    </View>
  );
};

export default ContentAccountPage;

const styles = StyleSheet.create({});
