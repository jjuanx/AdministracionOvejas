import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as GlobalStyles from '../styles/GlobalStyles'

// Import auth-related screens
import LoginScreen from './profile/LoginScreen'
import RegisterScreen from './profile/RegisterScreen'

const Stack = createStackNavigator()

export default function AuthNavigator() {
  return (
    <NavigationContainer theme={GlobalStyles.navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: GlobalStyles.brandPrimary,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Registrarse' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
