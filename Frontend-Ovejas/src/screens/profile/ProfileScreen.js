import React from 'react'
import { View, Text } from 'react-native'
import SystemInfo from '../components/SystemInfo'

export default function ProfileScreen () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <SystemInfo />
    </View>
  )
}
