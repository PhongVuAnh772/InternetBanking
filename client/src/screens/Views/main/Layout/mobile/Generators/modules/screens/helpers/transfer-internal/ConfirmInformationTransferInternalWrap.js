import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfirmInformationInternalContent from './ConfirmInformationTransferInternalContent'
import ConfirmInformationInternalHeader from './ConfirmInformationTransferInternalHeader'

const ConfirmInformationTransferInternalWrap = () => {
  return (
    <View>
        <ConfirmInformationInternalHeader />
        <ConfirmInformationInternalContent />
    </View>
  )
}

export default ConfirmInformationTransferInternalWrap

const styles = StyleSheet.create({})