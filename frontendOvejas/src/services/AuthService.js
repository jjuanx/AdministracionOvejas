// Firebase Auth Service
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Registro de usuario
export const registerUser = async (userData) => {
  try {
    const { email, password, nombre, apellidos, numeroTelefono, direccion, codigoPostal } = userData;
    
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Actualizar perfil con nombre
    await updateProfile(user, {
      displayName: `${nombre} ${apellidos}`
    });
    
    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      nombre,
      apellidos,
      email,
      numeroTelefono,
      direccion,
      codigoPostal,
      tipoUsuario: 'propietario',
      createdAt: new Date(),
      uid: user.uid
    });
    
    return user;
  } catch (error) {
    console.error('Error registrando usuario:', error);
    throw error;
  }
};

// Login de usuario
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Logout de usuario
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error en logout:', error);
    throw error;
  }
};

// Obtener datos del usuario desde Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'usuarios', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('No se encontraron datos del usuario');
    }
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    throw error;
  }
};
