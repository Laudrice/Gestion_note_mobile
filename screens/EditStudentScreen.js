import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchEtudiant, updateEtudiant } from '../utils/db';

const EditStudentScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [nom, setNom] = useState('');
  const [noteMath, setNoteMath] = useState('');
  const [notePhys, setNotePhys] = useState('');

  useEffect(() => {
    loadEtudiant();
  }, []);

  const loadEtudiant = async () => {
    try {
      const etudiant = await fetchEtudiant(id);
      setNom(etudiant.nom);
      setNoteMath(etudiant.note_math.toString());
      setNotePhys(etudiant.note_phys.toString());
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      await updateEtudiant(id, nom, parseFloat(noteMath), parseFloat(notePhys), (parseFloat(noteMath) + parseFloat(notePhys)) / 2);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating student:', error);
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
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStudent}>
        <Text style={styles.updateButtonText}>Modifier</Text>
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
  updateButton: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditStudentScreen;
