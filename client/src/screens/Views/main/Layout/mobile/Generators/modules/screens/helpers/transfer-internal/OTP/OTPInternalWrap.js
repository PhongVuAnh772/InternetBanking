import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OTPScreenHeader from '../../../Layout/tasks/OTPScreenHeader'
import OTPInternalContent from './OTPInternalContent'

const OTPInternalWrap = () => {
  return (
    <View style={styles.container}>
        <OTPScreenHeader />
        <OTPInternalContent />
    </View>
  )
}

export default OTPInternalWrap

const styles = StyleSheet.create({})