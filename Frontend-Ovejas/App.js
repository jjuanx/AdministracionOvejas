// App.js
import * as React from 'react';
import { NavigationContainer }        from '@react-navigation/native';
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons }     from '@expo/vector-icons';

import OvejasStack        from './src/screens/ovejas/OvejasStack';
import ControlPanelScreen from './src/screens/controlPanel/ControlPanelScreen';
import ProfileScreen      from './src/screens/profile/ProfileScreen';

import {
  navigationTheme,
  brandPrimary,
  brandSecondary,
  fontRegular
} from './src/styles/GlobalStyles';

const Tab = createBottomTabNavigator();

export default function App () {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          /* -------- Iconos de la bottom-bar ---------- */
          tabBarIcon: ({ color, size }) => {
            const icon = ({
              Ovejas        : 'sheep',
              'Panel Control': 'google-analytics',
              Perfil        : 'account'
            })[route.name];

            return (
              <MaterialCommunityIcons
                name={icon}
                color={color}
                size={size}
              />
            );
          },

          /* -------- Colores de la bottom-bar --------- */
          tabBarActiveTintColor  : brandPrimary,
          tabBarInactiveTintColor: '#8d8d8d',
          tabBarStyle            : {
            backgroundColor: '#ffffff',
            borderTopColor : `${brandPrimary}22`   // línea superior  ~13 % opacidad
          },
          tabBarLabelStyle: {
            ...fontRegular,
            fontSize: 12
          },

          /* --------- Ocultamos el header -------------- */
          headerShown: false
        })}
      >
        <Tab.Screen
          name="Ovejas"
          component={OvejasStack}
        />

        <Tab.Screen
          name="Panel Control"
          component={ControlPanelScreen}
        />

        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
