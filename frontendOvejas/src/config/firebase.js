// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
//import { getStorage } from 'firebase/storage';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAFeyXQtn-gy0Pi-P636Lualynj_1snLs",
  authDomain: "administracion-ovejas.firebaseapp.com",
  projectId: "administracion-ovejas",
  storageBucket: "administracion-ovejas.firebasestorage.app",
  messagingSenderId: "441108168099",
  appId: "1:441108168099:web:e8800857b324b685c1ee16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with platform-specific persistence
let auth;
if (Platform.OS === 'web') {
  // For web, use regular getAuth (browser handles persistence automatically)
  auth = getAuth(app);
} else {
  // For React Native, use AsyncStorage persistence
  try {
    const ReactNativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  } catch (error) {
    // Fallback to regular auth if AsyncStorage is not available
    auth = getAuth(app);
  }
}

export { auth };
export const db = getFirestore(app);
// export const storage = getStorage(app); // Deshabilitado temporalmente

export default app;
