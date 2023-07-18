import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfirmInformationSendingContent from './ConfirmInformationSendingContent'
import ConfirmInformationSendingHeader from './ConfirmInformationSendingHeader'


const ConfirmInformationSendingWrap = () => {
  return (
    <View style={styles.container}>
        <ConfirmInformationSendingHeader />
        <ConfirmInformationSendingContent/>

    </View>
  )
}

export default ConfirmInformationSendingWrap

const styles = StyleSheet.create({})