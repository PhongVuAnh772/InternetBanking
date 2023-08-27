import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UsingCardSafetyHeader from './Layout/UsingCardSafetyHeader'
import UsingCardSafetyContent from './Layout/UsingCardSafetyContent'

const UsingCardSafety = () => {
  return (
    <View style={styles.container}>
        <UsingCardSafetyHeader />
        <UsingCardSafetyContent />
    </View>
  )
}

export default UsingCardSafety

const styles = StyleSheet.create({})