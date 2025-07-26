import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import OvejasDetailScreen from './OvejasDetailScreen'
import OvejasScreen from './OvejasScreen'
import CreateOvejaScreen from './CreateOvejaScreen'
import CreateCriaScreen from './CreateCriaScreen'
import EditCriaScreen from './EditCriaScreen'
import EditOvejaScreen from './EditOvejaScreen'

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
            <Stack.Screen
                name='CreateOvejaScreen'
                component={CreateOvejaScreen}
                options={{
                    title: 'Creacion Oveja'
                }}/>
            <Stack.Screen
                name='CreateCriaScreen'
                component={CreateCriaScreen}
                options={{
                    title: 'Creacion Cria'
                }}/>
            <Stack.Screen
                name='EditOvejaScreen'
                component={EditOvejaScreen}
                options={{
                    title: 'Edicion Oveja'
                }}/>
            <Stack.Screen
                name='EditCriaScreen'
                component={EditCriaScreen}
                options={{
                    title: 'Edicion Cria'
                }}/>
        </Stack.Navigator>
  )
}