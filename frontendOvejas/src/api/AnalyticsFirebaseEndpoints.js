import { 
  collection, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';

// Función para obtener el resumen de analytics
async function getResumen() {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    // Obtener todas las ovejas del usuario
    const ovejasRef = collection(db, 'ovejas');
    const ovejasQuery = query(ovejasRef, where('userId', '==', currentUser.uid));
    const ovejasSnapshot = await getDocs(ovejasQuery);
    
    const ovejas = [];
    ovejasSnapshot.forEach((doc) => {
      ovejas.push({ id: doc.id, ...doc.data() });
    });

    // Obtener todas las crías del usuario
    const criasRef = collection(db, 'crias');
    const criasQuery = query(criasRef, where('userId', '==', currentUser.uid));
    const criasSnapshot = await getDocs(criasQuery);
    
    const crias = [];
    criasSnapshot.forEach((doc) => {
      crias.push({ id: doc.id, ...doc.data() });
    });

    // Calcular estadísticas
    const totalOvejas = ovejas.length;
    const totalCrias = crias.length;
    
    const estados = {
      buena: ovejas.filter(o => o.estado === 'buena').length,
      regular: ovejas.filter(o => o.estado === 'regular').length,
      mala: ovejas.filter(o => o.estado === 'mala').length
    };

    const criasVivas = crias.filter(c => c.viva === true || c.viva === 'true').length;
    const criasMuertas = crias.filter(c => c.viva === false || c.viva === 'false').length;

    // Calcular edad media de las ovejas
    const edades = ovejas.map(o => {
      if (o.fechaNacimiento) {
        const birthDate = new Date(o.fechaNacimiento);
        const today = new Date();
        const ageInYears = (today - birthDate) / (1000 * 60 * 60 * 24 * 365);
        return ageInYears;
      }
      return o.edad || 0;
    });

    const edadMedia = edades.length > 0 
      ? edades.reduce((sum, edad) => sum + edad, 0) / edades.length 
      : 0;

    return {
      totalOvejas,
      totalCrias,
      estados,
      criasVivas,
      criasMuertas,
      edadMedia: Math.round(edadMedia * 10) / 10 // Redondear a 1 decimal
    };
  } catch (error) {
    console.error('Error obteniendo resumen de analytics:', error);
    throw error;
  }
}

export { getResumen };
