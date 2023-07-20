import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import credit from '../../../../../../assets/img-credit-physical.png'

const PhysicalCardScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={credit} style={styles.creditImage} />
      
    </View>
  )
}

export default PhysicalCardScreen

const styles = StyleSheet.create({
  creditImage: {
    width: '100%',
    height: 250,
  },
  container: {
    flex: 1,
    backgroundColor:'white',
  }
})