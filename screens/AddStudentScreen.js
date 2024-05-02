import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { addEtudiant } from '../utils/db';

const AddStudentScreen = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [noteMath, setNoteMath] = useState('');
  const [notePhys, setNotePhys] = useState('');

  const handleAddStudent = async () => {
    try {
      await addEtudiant(nom, parseFloat(noteMath), parseFloat(notePhys), (parseFloat(noteMath) + parseFloat(notePhys)) / 2);
      // Naviguer vers l'écran HomeScreen pour afficher la liste des étudiants après l'ajout
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />
      <Text style={styles.label}>Note en Math:</Text>
      <TextInput
        style={styles.input}
        value={noteMath}
        onChangeText={setNoteMath}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Note en Physique:</Text>
      <TextInput
        style={styles.input}
        value={notePhys}
        onChangeText={setNotePhys}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddStudentScreen;
