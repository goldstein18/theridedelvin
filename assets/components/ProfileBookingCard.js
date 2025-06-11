import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileBookingCard = ({ coach, subtitle, onCancel }) => {
  return (
    <View style={styles.card}>
        <Text style={styles.confirm}>Reserva confirmada</Text>
      <Text style={styles.title}>{coach || 'Coach no disponible'}</Text>
      <Text style={styles.subtitle}>{subtitle || 'Hora no disponible'}</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 26,
    borderRadius: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  cancelText: {
    color: 'gray',
    fontWeight: '400',
  },
  confirm: {
    color: 'green',
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default ProfileBookingCard;
