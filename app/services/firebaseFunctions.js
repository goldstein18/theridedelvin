import { db } from '../ firebaseConfig';
import { collection, query, where, onSnapshot, updateDoc, doc, increment, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { deleteDoc } from 'firebase/firestore'; // Import deleteDoc

// 📊 Escucha cambios en tiempo real por fecha
export const listenToClassesByDate = (date, callback) => {
  const classesRef = collection(db, 'classes');

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(classesRef, where('horario', '>=', startOfDay), where('horario', '<=', endOfDay));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const classList = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.coach || 'Coach no disponible',
        time: formatTime(data.horario),
        availableSpots: data.lugares ?? 0,
      };
    });

    callback(classList);
  });

  return unsubscribe;
};

// 🕒 Formatea el horario
const formatTime = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return 'Hora no disponible';
  const date = timestamp.toDate();

  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// ✅ Reservar un lugar (solo si hay disponibles y el usuario no tiene reserva)
export const reserveSpot = async (classId) => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) {
    alert('Por favor, inicia sesión para hacer una reserva.');
    return;
  }

  try {
    const classRef = doc(db, 'classes', classId);
    const classSnap = await getDoc(classRef);

    if (classSnap.exists()) {
      const currentSpots = classSnap.data().lugares ?? 0;
      
      if (currentSpots <= 0) {
        alert('No hay lugares disponibles para esta clase.');
        return;
      }

      // Verificar si el usuario ya ha reservado
      const reservationRef = doc(db, 'reservas', userId, 'clases', classId);
      const reservationSnap = await getDoc(reservationRef);

      if (reservationSnap.exists()) {
        alert('Ya has reservado un lugar para esta clase.');
        return;
      }

      // Reservar el lugar para el usuario
      await updateDoc(classRef, {
        lugares: increment(-1),
      });

      // Registrar la reserva del usuario
      await setDoc(reservationRef, {
        userId,
        classId,
        reservedAt: new Date(),
      });

      console.log('Reserva exitosa');
    }
  } catch (error) {
    console.error('Error al reservar:', error);
  }
};

// ❌ Cancelar una reservación (suma 1 lugar)
export const cancelReservation = async (classId) => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) {
    alert('Por favor, inicia sesión para cancelar la reserva.');
    return;
  }

  try {
    const classRef = doc(db, 'classes', classId);

    // Verificar si el usuario tiene una reserva
    const reservationRef = doc(db, 'reservas', userId, 'clases', classId);
    const reservationSnap = await getDoc(reservationRef);

    if (!reservationSnap.exists()) {
      alert('No tienes una reserva para esta clase.');
      return;
    }

    // Eliminar la reserva del usuario (borrando el documento)
    await deleteDoc(reservationRef);  // Correct usage for deleting document

    // Actualizar el número de lugares disponibles en la clase (sumar 1)
    await updateDoc(classRef, {
      lugares: increment(1),
    });

    console.log('Reservación cancelada');
  } catch (error) {
    console.error('Error al cancelar la reservación:', error);
    alert('Hubo un error al cancelar la reservación.');
  }
};

