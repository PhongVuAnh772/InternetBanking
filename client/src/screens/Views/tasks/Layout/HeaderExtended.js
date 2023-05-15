import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const HeaderExtended = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mở rộng</Text>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.textTouchable}> Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderExtended;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    color: 'black',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 50,

    fontSize: 15,
    fontWeight: '500',
  },
  textTouchable: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
});
