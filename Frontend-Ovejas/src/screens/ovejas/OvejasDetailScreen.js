import React from 'react'
import { View, Text } from 'react-native'

export default function OvejasDetailScreen ({ route }) {
    const { id } = route.params
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Oveja Details. 
                Id: {id}
            </Text>
        </View>
  )
}