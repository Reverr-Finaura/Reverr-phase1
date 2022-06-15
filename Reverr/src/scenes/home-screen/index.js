import { View, Text } from 'react-native'
import React from 'react'

import styles from '../styles'

export const Home =() => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
    </View>
  )
}