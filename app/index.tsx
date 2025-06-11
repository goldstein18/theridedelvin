import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>the ride</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Link  href="/login" style={styles.buttonclear}>
          <Text style={styles.buttonTextClear}>Iniciar sesión</Text>
        </Link>

        {/* Link component directly without TouchableOpacity */}
        <Link href="/form" style={styles.button}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 250,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 100,
  },
  buttonclear: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    width: '45%',
    borderWidth: 1,
    borderColor: '#00284D',
  },
  button: {
    backgroundColor: '#00284D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonTextClear: {
    color: '#00284D',
    fontSize: 18,
    textAlign: 'center',
  },
});
