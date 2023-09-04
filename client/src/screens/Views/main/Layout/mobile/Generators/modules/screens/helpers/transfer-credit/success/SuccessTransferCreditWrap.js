import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessTransferCreditHeader from './SuccessTransferCreditHeader'
import SuccessTransferCreditContent from './SuccessTransferCreditContent'

const SuccessTransferCreditWrap = () => {
  return (
    <View>
        <SuccessTransferCreditHeader />
        <SuccessTransferCreditContent />
    </View>
  )
}

export default SuccessTransferCreditWrap

const styles = StyleSheet.create({})