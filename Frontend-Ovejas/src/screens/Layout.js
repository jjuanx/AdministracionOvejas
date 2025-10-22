import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useContext, useEffect } from 'react'
import * as GlobalStyles from '../styles/GlobalStyles'

import OvejasStack from './ovejas/OvejasStack'
import ProfileStack from './profile/ProfileStack'
import ControlPanelStack from './controlPanel/ControPanelStack'

// eslint-disable-next-line camelcase
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { useAuth } from '../context/FirebaseAuthContext'
import { AppContext } from '../context/AppContext'

const Tab = createBottomTabNavigator()

export default function Layout () {
  const { currentUser, userData } = useAuth()
  const { error, setError } = useContext(AppContext)

  const init = async () => {
    if (currentUser && userData) {
      showMessage({
        message: `Sesión recuperada. Has iniciado sesión como ${userData.nombre}`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  useEffect(() => {
    if (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      setError(null)
    }
  }, [error])

  useEffect(() => {
    init()
  }, [])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })
  return (
    <>
    {fontsLoaded &&
     <NavigationContainer theme={GlobalStyles.navigationTheme}>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = ({
              Ovejas       : 'sheep',
              'Panel Control': 'view-dashboard',
              Perfil       : 'account-circle'
            })[route.name];
            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
          headerShown: false,
          tabBarActiveTintColor  : GlobalStyles.brandPrimary,
          tabBarInactiveTintColor: '#8d8d8d',
          tabBarLabelStyle       : GlobalStyles.fontRegular,
          tabBarStyle            : { backgroundColor: '#fff' }
        })}
      >
        <Tab.Screen name='Ovejas'        component={OvejasStack} />
        <Tab.Screen name='Panel Control' component={ControlPanelStack}/>
        <Tab.Screen name='Perfil'        component={ProfileStack}/>
      </Tab.Navigator>
      <FlashMessage position="top" />

    </NavigationContainer>
    }
    </>
  )
}
