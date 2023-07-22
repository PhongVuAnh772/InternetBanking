import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPScreenHeader from './OTPScreenHeader'
import OTPScreenContent from './OTPScreenContent'

const OTPCheckingChangeWrap = () => {
  return (
    <View style={styles.container}>
        <OTPScreenHeader />
        <OTPScreenContent />
    </View>
  )
}

export default OTPCheckingChangeWrap

const styles = StyleSheet.create({
    
})