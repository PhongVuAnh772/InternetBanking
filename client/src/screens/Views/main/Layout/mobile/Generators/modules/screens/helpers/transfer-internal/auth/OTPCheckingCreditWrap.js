import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPCheckingHeader from './OTPCheckingHeader'
import OTPCheckingContent from './OTPCheckingContent'

const OTPCheckingCreditWrap = () => {
  return (
    <View style={styles.container}>
        <OTPCheckingHeader />
        <OTPCheckingContent />
    </View>
  )
}

export default OTPCheckingCreditWrap

const styles = StyleSheet.create({
  container: {
        backgroundColor: 'rgb(245, 247, 249)'

  }
})