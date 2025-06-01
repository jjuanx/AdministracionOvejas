import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import OvejasDetailScreen from './OvejasDetailScreen'
import OvejasScreen from './OvejasScreen'

const Stack = createNativeStackNavigator()

export default function OvejasStack() {
   return (
        <Stack.Navigator>
            <Stack.Screen
                name='OvejasScreen'
                component={OvejasScreen}
                options={{
                    title: 'Ovejas'
                }}/>
            <Stack.Screen
                name='OvejasDetailScreen'
                component={OvejasDetailScreen}
                options={{
                    title: 'Detalles Oveja'
                }}/>
        </Stack.Navigator>
  )
}