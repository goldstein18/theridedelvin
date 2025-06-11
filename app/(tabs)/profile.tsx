import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProfileBookingCard from '../../assets/components/ProfileBookingCard'; // Make sure this exists and shows cancel button etc.
import { auth, db } from '../ firebaseConfig'; // Fixed import (removed the space before 'firebaseConfig')
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { cancelReservation } from '../services/firebaseFunctions'; // Ensure this file is in services

export default function Profile() {
  const [username, setUsername] = useState('Loading...');
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);

          // Get user's name
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUsername(`${userDoc.data().name} ${userDoc.data().lastName}` || 'Unknown User');
          } else {
            console.log('User data not found');
            setUsername('Unknown User');
          }

          // Listen to the user's reservations
          const classesRef = collection(db, 'reservas', user.uid, 'clases');
          const unsubscribe = onSnapshot(classesRef, async (querySnapshot) => {
            const reservationsData = [];

            for (const docSnap of querySnapshot.docs) {
              const reservationData = docSnap.data();

              // Fetch class data
              const classRef = doc(db, 'classes', reservationData.classId);
              const classSnap = await getDoc(classRef);
              const classData = classSnap.exists() ? classSnap.data() : {};

              reservationsData.push({
                classId: reservationData.classId,
                title: classData.coach || 'Clase',
                time: formatDate(classData.horario),
                coach: classData.coach,
                availableSpots: classData.lugares,
              });
            }

            setReservations(reservationsData);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername('Error loading');
      }
    };

    fetchUserData();
  }, []);

  const handleCancelReservation = async (classId) => {
    await cancelReservation(classId);
    setReservations(reservations.filter(reservation => reservation.classId !== classId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.ProfileText}>{username}</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>0</Text>
        <Text style={styles.cardTextDes}>Créditos restantes</Text>
      </View>

      <Text style={styles.sectionTitle}>Mis Reservas</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.classId}
        contentContainerStyle={styles.centeredList}
        renderItem={({ item }) => (
          <View style={styles.centeredCard}>
            <ProfileBookingCard
              coach={item.coach}
              subtitle={item.time}
              availableSpots={item.availableSpots}
              onCancel={() => handleCancelReservation(item.classId)} // Pass the correct cancel function
            />
          </View>
        )}
      />
    </View>
  );
}

const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return 'Hora no disponible';
  const date = timestamp.toDate();

  return date.toLocaleString('es-ES', {
    weekday: 'short',    // eg. "lun."
    day: 'numeric',      // eg. "18"
    month: 'short',      // eg. "abr."
    year: 'numeric',     // eg. "2025"
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  card: {
    width: '90%',
    height: 100,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#00284D',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 60,
  },
  cardTextDes: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  ProfileText: {
    fontSize: 24,
    marginTop: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  centeredList: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centeredCard: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
