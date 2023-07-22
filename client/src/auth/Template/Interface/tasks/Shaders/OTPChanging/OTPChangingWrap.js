import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPScreenHeader from './OTPScreenHeader'
import OTPScreenContent from './OTPScreenContent'

const OTPChangingWrap = () => {
  return (
    <View style={styles.container}>
        <OTPScreenHeader />
        <OTPScreenContent />
    </View>
  )
}

export default OTPChangingWrap

const styles = StyleSheet.create({
    
})