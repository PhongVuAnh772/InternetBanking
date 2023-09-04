import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPCheckingHeader from '../../../Layout/tasks/OTPScreenHeader'
import OTPCreditContent from './OTPCreditContent'
const OTPCreditWrap = () => {
  return (
    <View style={styles.container}>
        <OTPCheckingHeader />
        <OTPCreditContent />
    </View>
  )
}

export default OTPCreditWrap

const styles = StyleSheet.create({
  container: {
        backgroundColor: 'rgb(245, 247, 249)'

  }
})