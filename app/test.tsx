import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
    {/* Title */}
    <Text style={styles.title}>the ride</Text>

    {/* Buttons */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonclear}>
        <Text style={styles.buttonTextClear}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Pushes buttons to the bottom
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 250,  // Adds spacing from the top of the screen for title
  
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',  // Centers the buttons horizontally
    width: '100%',
    paddingBottom: 100,  // Adds space from the bottom of the screen
  },
  buttonclear: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    width:'45%',
    borderWidth: 1,
    borderColor:'#00284D',
  
  },
  button: {
    backgroundColor: '#00284D',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginHorizontal: 10,
    width:'45%',
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


