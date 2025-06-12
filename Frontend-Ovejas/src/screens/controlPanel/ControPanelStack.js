import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import ControlPanelScreen from './ControlPanelScreen'

const Stack = createNativeStackNavigator()

export default function OvejasStack() {
   return (
        <Stack.Navigator>
            <Stack.Screen
                name='ControlPanelScreen'
                component={ControlPanelScreen}
                options={{
                    title: 'Panel De Control'
                }}/>
        </Stack.Navigator>
  )
}