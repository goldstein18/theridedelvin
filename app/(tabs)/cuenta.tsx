import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../ firebaseConfig';

const App = () => {
  const router = useRouter();

  const DATA = [
    { id: '1', title: 'Cambiar Información Personal', type: 'whatsapp' },
    { id: '2', title: 'Cambiar Contraseña', type: 'whatsapp' },
    { id: '3', title: 'Ver Política de Privacidad', type: 'privacy' },
    { id: '4', title: 'Soporte', type: 'whatsapp' },
    { id: '5', title: 'Eliminar cuenta', type: 'delete' },
    { id: '6', title: 'Log Out', type: 'logout' },
  ];

  const handleItemPress = (item) => {
    if (item.type === 'whatsapp') {
      const phoneNumber = '+524421143497';
      const message = `Hola, necesito ayuda con: ${item.title}`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'No se pudo abrir WhatsApp.');
      });
    } else if (item.type === 'privacy') {
      router.push({ pathname: '/privacidad' });
    } else if (item.type === 'logout') {
      Alert.alert('Log Out', '¿Estás seguro de que deseas cerrar sesión?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => handleLogout() },
      ]);
    } else if (item.type === 'delete') {
      Alert.alert(
        'Eliminar cuenta',
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: () => handleDeleteAccount() },
        ]
      );
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Sesión cerrada');
      router.replace('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.delete(); // Elimina el usuario de Firebase
        Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      Alert.alert(
        'Error',
        'No se pudo eliminar la cuenta. Es posible que debas volver a iniciar sesión antes de intentarlo de nuevo.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Configuración</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
