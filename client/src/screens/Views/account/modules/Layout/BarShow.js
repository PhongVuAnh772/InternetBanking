import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';

const BarShow = ({name, button}) => {
  return (
    <View style={styles.container}>
      <FontAwesome style={styles.iconDown} name="angle-down" size={20} />
      <Text style={styles.headerBar}>{name}</Text>
      <TouchableOpacity style={styles.buttonBar}>
        <View style={styles.buttonAdd}>
          <FontAwesome
            name="plus"
            size={15}
            color="white"
            style={{
              paddingHorizontal: 5,
              paddingVertical: 3,
              backgroundColor: 'green',
              borderRadius: 20,
            }}
          />
        </View>
        <Text style={styles.textTouchableOpacity}>{button}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarShow;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerBar: {flex: 5},
  iconDown: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonBar: {flex: 4, flexDirection: 'row-reverse', alignItems: 'center',paddingVertical:5},
  textTouchableOpacity: {
    color: 'green',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    
  },
  buttonAdd: {
    paddingLeft: 8,
  },
});
