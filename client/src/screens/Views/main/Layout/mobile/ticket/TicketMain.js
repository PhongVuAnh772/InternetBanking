import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TicketMainContent from './TicketMainContent'
import TicketMainHeader from './TicketMainHeader'

const TicketMain = () => {
  return (
    <View style={styles.container}>
        <TicketMainHeader />
        <TicketMainContent />
    </View>
  )
}

export default TicketMain

const styles = StyleSheet.create({})