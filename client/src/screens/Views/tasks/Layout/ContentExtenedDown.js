import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ContentExtendedDown = ({name, icon}) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={icon}
        size={20}
        color="green"
        style={styles.iconContent}
      />
      <View style={styles.textIconcontainer}>
        <Text style={styles.textIcon}>{name}</Text>
      </View>
      {name !== 'Phiên bản' ? (
        <FontAwesome name="angle-right" size={20} style={styles.iconVersion} />
      ) : (
        <Text style={styles.textVersion}>5.4.4</Text>
      )}
    </View>
  );
};

export default ContentExtendedDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  iconContent: {
    flex: 1,
    paddingLeft: 10,
  },
  textIconcontainer: {
    flex: 7,
  },
  iconVersion: {
    flex: 1,
  },
  textVersion: {
    flex: 1,

    color: 'black',
    fontSize: 15,
  },
  textIcon: {
    color: 'black',
    fontSize: 15,
  },
});
