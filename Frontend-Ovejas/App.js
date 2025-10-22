import React from 'react'
import AppContextProvider from './src/context/AppContext'
import { AuthProvider, useAuth } from './src/context/FirebaseAuthContext'
import Layout from './src/screens/Layout'
import AuthNavigator from './src/screens/AuthNavigator'

function AppContent() {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return null // Puedes poner un spinner aquí
  }
  
  return currentUser ? <Layout /> : <AuthNavigator />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </AuthProvider>
  )
}
