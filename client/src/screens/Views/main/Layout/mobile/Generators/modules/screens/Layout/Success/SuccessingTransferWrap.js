
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SuccessingTransferHeader from './SuccessingTransferHeader'
import SuccessingTransferContent from './SuccessingTransferContent'


const SuccessingTransferWrap = () => {
  return (
    <View style={styles.container}>
        <SuccessingTransferHeader />
        <SuccessingTransferContent />
    </View>
  )
}

export default SuccessingTransferWrap

const styles = StyleSheet.create({})