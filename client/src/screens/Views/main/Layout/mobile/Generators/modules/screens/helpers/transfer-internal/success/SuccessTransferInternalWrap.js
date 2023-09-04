import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessTransferInternalHeader from './SuccessTransferInternalHeader'
import SuccessTransferInternalContent from './SuccessTransferInternalContent'

const SuccessTransferCreditWrap = () => {
  return (
    <View>
        <SuccessTransferInternalHeader />
        <SuccessTransferInternalContent />
    </View>
  )
}

export default SuccessTransferCreditWrap

const styles = StyleSheet.create({})