import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';

// Función para obtener crías por ID de oveja
async function getByOvejaId(ovejaId) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const criasRef = collection(db, 'crias');
    const q = query(
      criasRef, 
      where('userId', '==', currentUser.uid),
      where('ovejaId', '==', ovejaId.toString()) // Convertir a string para coincidir con Firebase
    );
    
    const querySnapshot = await getDocs(q);
    const crias = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      crias.push({
        ...data, // Spread the data first
        id: doc.id, // Then override with Firebase document ID (para editar/eliminar)
        criaId: data.id || null, // ID numérico personalizado (para mostrar)
      });
    });
    
    // Ordenar por ID numérico ascendente, luego por fecha de creación descendente
    crias.sort((a, b) => {
      // Primero ordenar por ID numérico ascendente
      const idA = parseInt(a.criaId) || parseInt(a.id) || 0;
      const idB = parseInt(b.criaId) || parseInt(b.id) || 0;
      
      if (idA !== idB) {
        return idA - idB; // ID ascendente
      }
      
      // Si los IDs son iguales, ordenar por fecha de creación descendente
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA; // Más reciente primero
    });
    
    return crias;
  } catch (error) {
    console.error('Error obteniendo crías por ovejaId:', error);
    throw error;
  }
}

// Función para obtener todas las crías del usuario actual
async function getAll() {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const criasRef = collection(db, 'crias');
    const q = query(
      criasRef, 
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const crias = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      crias.push({
        ...data, // Spread the data first
        id: doc.id, // Then override with Firebase document ID (para editar/eliminar)
        criaId: data.id || null, // ID numérico personalizado (para mostrar)
      });
    });
    
    // Ordenar por ID numérico ascendente, luego por fecha de creación descendente
    crias.sort((a, b) => {
      // Primero ordenar por ID numérico ascendente
      const idA = parseInt(a.criaId) || parseInt(a.id) || 0;
      const idB = parseInt(b.criaId) || parseInt(b.id) || 0;
      
      if (idA !== idB) {
        return idA - idB; // ID ascendente
      }
      
      // Si los IDs son iguales, ordenar por fecha de creación descendente
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA; // Más reciente primero
    });

    return crias;
  } catch (error) {
    console.error('Error obteniendo crías:', error);
    throw error;
  }
}

// Función para obtener una cría específica
async function getDetail(id) {
  try {
    const criaRef = doc(db, 'crias', id);
    const criaSnap = await getDoc(criaRef);
    
    if (criaSnap.exists()) {
      const data = criaSnap.data();
      const criaData = {
        ...data, // Spread the data first
        id: criaSnap.id, // Then override with Firebase document ID  
        criaId: data.id || null, // ID numérico personalizado
      };
      return criaData;
    } else {
      throw new Error('Cría no encontrada');
    }
  } catch (error) {
    console.error('Error obteniendo detalle de cría:', error);
    throw error;
  }
}

// Función para crear una nueva cría
async function create(data) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    // Si se proporciona un ID personalizado, usarlo (nuevo sistema)
    if (data.id) {
      // Verificar que el ID sea un número válido y convertirlo a string
      const customId = data.id;
      if (isNaN(customId)) {
        throw new Error('ID debe ser un número válido');
      }
      
      const docId = customId.toString();
      
      // Verificar si ya existe una cría con ese ID numérico
      const existingDoc = await getDoc(doc(db, 'crias', docId));
      if (existingDoc.exists()) {
        const existingData = existingDoc.data();
        if (existingData.userId === currentUser.uid) {
          throw new Error(`Ya existe una cría con el ID: ${customId}`);
        }
      }

      const criaData = {
        ...data,
        ovejaId: data.ovejaId?.toString(), // Asegurar que ovejaId sea string
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Usar el ID numérico como string para el documento
      await setDoc(doc(db, 'crias', docId), criaData);
      
      return {
        id: docId,
        ...criaData
      };
    } else {
      // Usar ID automático de Firebase (sistema anterior, para compatibilidad)
      const criaData = {
        ...data,
        ovejaId: data.ovejaId?.toString(), // Asegurar que ovejaId sea string
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'crias'), criaData);
      
      return {
        id: docRef.id,
        ...criaData
      };
    }
  } catch (error) {
    console.error('Error creando cría:', error);
    throw error;
  }
}

// Función para actualizar una cría
async function update(id, data) {
  try {
    const criaRef = doc(db, 'crias', id);
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await updateDoc(criaRef, updateData);
    
    return {
      id,
      ...updateData
    };
  } catch (error) {
    console.error('Error actualizando cría:', error);
    throw error;
  }
}

// Función para eliminar una cría
async function remove(id) {
  try {
    const criaRef = doc(db, 'crias', id);
    await deleteDoc(criaRef);
    
    return { message: 'Cría eliminada correctamente' };
  } catch (error) {
    console.error('Error eliminando cría:', error);
    throw error;
  }
}

export { getAll, getByOvejaId, getDetail, remove, create, update };
