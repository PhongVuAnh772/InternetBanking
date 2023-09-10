import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessTransferInternalHeader from './SuccessTransferInternalHeader'
import SuccessTransferInternalContent from './SuccessTransferInternalContent'

const SuccessTransferInternalWrap = () => {
  return (
    <View>
        <SuccessTransferInternalHeader />
        <SuccessTransferInternalContent />
    </View>
  )
}

export default SuccessTransferInternalWrap

const styles = StyleSheet.create({})