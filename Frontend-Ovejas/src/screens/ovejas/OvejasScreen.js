import React, {useEffect, useState} from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import { View, Text, Button } from 'react-native'

export default function OvejasScreen ({navigation}) {
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text>Random Oveja</Text>
      <Button
        onPress={() => {
          navigation.navigate('OvejasDetailScreen', { id: Math.floor(Math.random() * 100) })
        }}
        title="Go to Random Oveja Details"
      />
        </View>
  )
}