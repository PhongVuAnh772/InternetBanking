import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfirmInformationCreditContent from './ConfirmInformationTransferCreditContent'
import ConfirmInformationCreditHeader from './ConfirmInformationTransferCreditHeader'

const ConfirmInformationTransferCreditWrap = () => {
  return (
    <View>
        <ConfirmInformationCreditHeader />
        <ConfirmInformationCreditContent />
    </View>
  )
}

export default ConfirmInformationTransferCreditWrap

const styles = StyleSheet.create({})