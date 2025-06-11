import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BookingCard = ({ title, subtitle, onPress, hideReserveButton  }) => {
  return (
    <View style={styles.card}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    {!hideReserveButton && (
      <TouchableOpacity style={styles.bookButton} onPress={onPress}>
        <Text style={styles.bookButtonText}>Reservar</Text>
      </TouchableOpacity>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00284D', // Blue background
    padding: 30,
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#d9e1e8',
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  bookButtonText: {
    color: '#00284D',
   
  },
});

export default BookingCard;
