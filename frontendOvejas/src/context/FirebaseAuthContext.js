import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { registerUser, loginUser, logoutUser, getUserData } from '../services/AuthService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Registro
  const signup = async (userData) => {
    try {
      const user = await registerUser(userData);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      throw error;
    }
  };

  // Función para mostrar mensaje de re-autenticación (ya no necesaria con Firebase puro)
  const showReauthMessage = () => {
    alert('Por favor, inicia sesión nuevamente.');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userData = await getUserData(user.uid);
          setUserData(userData);
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error);
          // Si hay error con Firestore, usar datos básicos de Firebase Auth
          const basicUserData = {
            nombre: user.displayName?.split(' ')[0] || 'Usuario',
            apellidos: user.displayName?.split(' ').slice(1).join(' ') || '',
            email: user.email,
            uid: user.uid
          };
          setUserData(basicUserData);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
