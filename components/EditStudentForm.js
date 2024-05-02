import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { updateEtudiant } from '../utils/db';

const EditStudentForm = ({ route, navigation }) => {
  const { student } = route.params;
  const [nom, setNom] = useState(student.nom);
  const [noteMath, setNoteMath] = useState(student.note_math.toString());
  const [notePhys, setNotePhys] = useState(student.note_phys.toString());

  const handleUpdateStudent = () => {
    const moyenne = (parseFloat(noteMath) + parseFloat(notePhys)) / 2;
    updateEtudiant(student.id, nom, parseFloat(noteMath), parseFloat(notePhys), moyenne)
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error updating student:', error);
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
      <Button title="Modifier" onPress={handleUpdateStudent} />
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

export default EditStudentForm;
