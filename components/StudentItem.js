import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StudentItem = ({ student, onPressDelete, onPressEdit }) => {
  return (
    <View style={styles.container}>
      <Text>{student.nom}</Text>
      <TouchableOpacity onPress={onPressDelete}>
        <Text style={styles.deleteButton}>Supprimer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressEdit}>
        <Text style={styles.editButton}>Modifier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
  editButton: {
    color: 'blue',
  },
});

export default StudentItem;
