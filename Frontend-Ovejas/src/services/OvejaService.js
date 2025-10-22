// Firebase Ovejas Service
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Crear oveja
export const createOveja = async (ovejaData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'ovejas'), {
      ...ovejaData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Obtener ovejas del usuario
export const getUserOvejas = async (userId) => {
  try {
    const q = query(
      collection(db, 'ovejas'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const ovejas = [];
    querySnapshot.forEach((doc) => {
      ovejas.push({ id: doc.id, ...doc.data() });
    });
    return ovejas;
  } catch (error) {
    throw error;
  }
};

// Actualizar oveja
export const updateOveja = async (ovejaId, updateData) => {
  try {
    const ovejaRef = doc(db, 'ovejas', ovejaId);
    await updateDoc(ovejaRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar oveja
export const deleteOveja = async (ovejaId) => {
  try {
    await deleteDoc(doc(db, 'ovejas', ovejaId));
  } catch (error) {
    throw error;
  }
};

// Subir imagen de oveja
export const uploadOvejaImage = async (imageUri, ovejaId) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const imageRef = ref(storage, `ovejas/${ovejaId}/${Date.now()}.jpg`);
    await uploadBytes(imageRef, blob);
    
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};
