import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addEtudiant } from '../utils/db';

const AddStudentForm = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [noteMath, setNoteMath] = useState('');
  const [notePhys, setNotePhys] = useState('');

  const handleAddStudent = () => {
    console.log('Ajouter étudiant:', nom, noteMath, notePhys); // Ajouter cette ligne

    const moyenne = (parseFloat(noteMath) + parseFloat(notePhys)) / 2;
    addEtudiant(nom, parseFloat(noteMath), parseFloat(notePhys), moyenne)
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Note Mathématiques"
        value={noteMath}
        onChangeText={setNoteMath}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Note Physique"
        value={notePhys}
        onChangeText={setNotePhys}
        keyboardType="numeric"
      />
      <Button title="Ajouter" onClick={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default AddStudentForm;
