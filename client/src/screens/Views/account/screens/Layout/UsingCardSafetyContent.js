import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonOtherCredit from '../../modules/Layout/ButtonOtherCredit';

const UsingCardSafetyContent = () => {
  return (
    <View style={styles.container}>
      <ButtonOtherCredit name="Hướng dẫn giao dịch ATM an toàn" icon="" />
      <ButtonOtherCredit name="Hướng dẫn giao dịch POS an toàn" icon="" />
      <ButtonOtherCredit
        name="Hướng dẫn giao dịch trực tuyến an toàn"
        icon=""
      />
      <ButtonOtherCredit name="Hướng dẫn bảo mật mã PIN" icon="" />
      <ButtonOtherCredit name="Hướng dẫn đảm bảo thông tin thẻ" icon="" />
    </View>
  );
};

export default UsingCardSafetyContent;

const styles = StyleSheet.create({});
