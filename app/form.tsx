import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './ firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const FormScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    whatsapp: "",
    gender: "male",
    birthdate: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setForm((prevForm) => ({ ...prevForm, birthdate: selectedDate }));
    }
    if (Platform.OS !== "ios") {
      setShowDatePicker(false);
    }
  };

  const handleSignup = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Email y contraseña son obligatorios");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        lastName: form.lastName,
        whatsapp: form.whatsapp,
        gender: form.gender,
        birthdate: form.birthdate ? form.birthdate.toISOString() : null,
        email: form.email,
      });

      Alert.alert("¡Cuenta creada!", "Tu cuenta se ha creado exitosamente.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      <Text style={styles.title}>Información básica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={form.lastName}
        onChangeText={(text) => setForm({ ...form, lastName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="WhatsApp"
        value={form.whatsapp}
        onChangeText={(text) => setForm({ ...form, whatsapp: text })}
      />

      <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Seleccionar género"
          value={
            form.gender === "male"
              ? "Masculino"
              : form.gender === "female"
              ? "Femenino"
              : "Otro"
          }
          editable={false}
        />
      </TouchableOpacity>

      {showGenderPicker && (
        <Picker
          selectedValue={form.gender}
          onValueChange={(itemValue) => {
            setForm({ ...form, gender: itemValue });
            setShowGenderPicker(false);
          }}
        >
          <Picker.Item label="Masculino" value="male" />
          <Picker.Item label="Femenino" value="female" />
          <Picker.Item label="Otro" value="other" />
        </Picker>
      )}

      <TextInput
        style={styles.input}
        placeholder="Seleccionar fecha de nacimiento"
        value={form.birthdate ? form.birthdate.toLocaleDateString() : ""}
        editable={false}
        onPressIn={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={form.birthdate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

<Text style={styles.text}>
        Al crear esta cuenta, confirmo que acepto los
        <Link href="/privacidad" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#FF6800' }}> Términos y Condiciones y el Aviso de Privacidad</Text>
          </TouchableOpacity>
        </Link>
      </Text>

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Ir al perfil</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 14,
    marginVertical: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    marginTop: 25,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00284D',
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 30,
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: '#FF6800',
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 30,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FormScreen;