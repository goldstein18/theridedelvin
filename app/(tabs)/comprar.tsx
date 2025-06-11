// App.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const App = () => {
  const DATA = [
    { id: '0', credit: '1 Crédito', expirationDate: 'Vigencia 15 días', price: '$190' },
    { id: '1', credit: '4 Créditos', expirationDate: 'Vigencia 30 días', price: '$720' },
    { id: '2', credit: '8 Créditos', expirationDate: 'Vigencia 30 días', price: '$1,360' },
    { id: '3', credit: '12 Créditos', expirationDate: 'Vigencia 30 días', price: '$1,980' },
    { id: '4', credit: '14 Créditos', expirationDate: 'Vigencia 40 días', price: '$2,240' },
    { id: '5', credit: '16 Créditos', expirationDate: 'Vigencia 40 días', price: '$2,480' },
    { id: '6', credit: '20 Créditos', expirationDate: 'Vigencia 40 días', price: '$3,000' },
    { id: '7', credit: '1 Clase muestra', expirationDate: 'Vigencia 1 día', price: '$150' },
   
  ];

  return (
    <View style={styles.container}>
    
      <Text style={styles.leftTitle}>Paquetes</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Text style={styles.gridTextMain}>{item.credit}</Text>
            <Text style={styles.gridText}>{item.expirationDate}</Text>
            <Text style={styles.gridText}>{item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  leftTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    height: 120,
    justifyContent: 'center',
    backgroundColor: '#00284D',
    borderRadius: 30,
    alignItems: 'center',
    
    
  },
  gridTextMain: {
    color: 'white',
    marginBottom:5,
    fontWeight: 'bold',
  },
  gridText: {
    color: 'white',
  },
});

export default App;