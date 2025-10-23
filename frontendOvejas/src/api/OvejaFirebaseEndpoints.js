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

// Función para obtener todas las ovejas del usuario actual
async function getAll() {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const ovejasRef = collection(db, 'ovejas');
    const q = query(
      ovejasRef, 
      where('userId', '==', currentUser.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const ovejas = [];
    
    querySnapshot.forEach((doc) => {
      ovejas.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Ordenar por ID numérico ascendente, luego por fecha de creación descendente
    ovejas.sort((a, b) => {
      // Primero ordenar por ID numérico ascendente
      const idA = parseInt(a.id) || 0;
      const idB = parseInt(b.id) || 0;
      
      if (idA !== idB) {
        return idA - idB; // ID ascendente
      }
      
      // Si los IDs son iguales, ordenar por fecha de creación descendente
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA; // Más reciente primero
    });

    return ovejas;
  } catch (error) {
    console.error('Error obteniendo ovejas:', error);
    throw error;
  }
}

// Función para obtener una oveja específica
async function getDetail(id) {
  try {
    const ovejaRef = doc(db, 'ovejas', id);
    const ovejaSnap = await getDoc(ovejaRef);
    
    if (ovejaSnap.exists()) {
      return {
        id: ovejaSnap.id,
        ...ovejaSnap.data()
      };
    } else {
      throw new Error('Oveja no encontrada');
    }
  } catch (error) {
    console.error('Error obteniendo detalle de oveja:', error);
    throw error;
  }
}

// Función para crear una nueva oveja
async function create(data) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    // Verificar que el ID sea un número válido y convertirlo a string
    const customId = data.id || data.customId;
    if (!customId || isNaN(customId)) {
      throw new Error('ID debe ser un número válido');
    }
    
    const docId = customId.toString();
    
    // Verificar si ya existe una oveja con ese ID numérico
    const existingDoc = await getDoc(doc(db, 'ovejas', docId));
    if (existingDoc.exists()) {
      const existingData = existingDoc.data();
      if (existingData.userId === currentUser.uid) {
        throw new Error(`Ya existe una oveja con el ID: ${customId}`);
      }
    }

    const ovejaData = {
      ...data,
      userId: currentUser.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Usar el ID numérico como string para el documento
    await setDoc(doc(db, 'ovejas', docId), ovejaData);
    return {
      id: docId,
      ...ovejaData
    };
  } catch (error) {
    console.error('Error creando oveja:', error);
    throw error;
  }
}

// Función para actualizar una oveja
async function update(id, data) {
  try {
    const ovejaRef = doc(db, 'ovejas', id);
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await updateDoc(ovejaRef, updateData);
    
    return {
      id,
      ...updateData
    };
  } catch (error) {
    console.error('Error actualizando oveja:', error);
    throw error;
  }
}

// Función para eliminar una oveja
async function remove(id) {
  try {
    const ovejaRef = doc(db, 'ovejas', id);
    await deleteDoc(ovejaRef);
    
    return { message: 'Oveja eliminada correctamente' };
  } catch (error) {
    console.error('Error eliminando oveja:', error);
    throw error;
  }
}

export { getAll, getDetail, remove, create, update };
