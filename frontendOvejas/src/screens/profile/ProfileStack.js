import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useAuth } from '../../context/FirebaseAuthContext'
import LoginScreen from './LoginScreen'
import ProfileScreen from './ProfileScreen'
import RegisterScreen from './RegisterScreen'

const Stack = createNativeStackNavigator()

export default function ProfileStack () {
  const { currentUser } = useAuth()

  return (
    <Stack.Navigator>
           {!currentUser
             ? (
                <>
                    <Stack.Screen name='LoginScreen' options={{ title: 'Log in para acceder a tu Perfil' }} component={LoginScreen} />
                    <Stack.Screen name='RegisterScreen' options={{ title: 'Registro' }} component={RegisterScreen} />
                </>
               )
             : (
                    <Stack.Screen name='ProfileScreen' options={{ title: 'Perfil' }} component={ProfileScreen} />
               )
            }
    </Stack.Navigator>

  )
}
