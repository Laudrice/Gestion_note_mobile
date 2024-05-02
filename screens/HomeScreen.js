import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchEtudiants, deleteEtudiant } from '../utils/db';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [etudiants, setEtudiants] = useState([]);
  const [minMoyenne, setMinMoyenne] = useState(null);
  const [maxMoyenne, setMaxMoyenne] = useState(null);
  const [etudiantsAdmis, setEtudiantsAdmis] = useState(0);
  const [etudiantsNonAdmis, setEtudiantsNonAdmis] = useState(0);

  useEffect(() => {
    loadEtudiants();
  }, []);

  useEffect(() => {
    // Rafraîchir les étudiants lorsque la liste des étudiants change
    loadEtudiants();
  }, [etudiants]);

  const loadEtudiants = async () => {
    try {
      const etudiantsData = await fetchEtudiants();
      setEtudiants(etudiantsData);
      calculateStatistics(etudiantsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const calculateStatistics = (etudiantsData) => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let admisCount = 0;
    let nonAdmisCount = 0;

    etudiantsData.forEach((etudiant) => {
      const moyenne = (etudiant.note_math + etudiant.note_phys) / 2;
      if (moyenne < min) min = moyenne;
      if (moyenne > max) max = moyenne;
      if (moyenne >= 10) admisCount++;
      else nonAdmisCount++;
    });

    setMinMoyenne(min !== Number.MAX_VALUE ? min : null);
    setMaxMoyenne(max !== Number.MIN_VALUE ? max : null);
    setEtudiantsAdmis(admisCount);
    setEtudiantsNonAdmis(nonAdmisCount);
  };

  const handleDelete = async (id) => {
    try {
      Alert.alert(
        'Confirmation',
        'Êtes-vous sûr de vouloir supprimer cet étudiant ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: async () => {
              await deleteEtudiant(id);
              // Pas besoin d'appeler loadEtudiants ici car il est déjà déclenché par useEffect
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('EditStudent', { id });
  };

  const renderItem = ({ item, index }) => {
    const moyenne = (item.note_math + item.note_phys) / 2;
    const moyenneColor = moyenne < 10 ? 'red' : 'green';

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemIndex}>{index + 1}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.nom}</Text>
          <Text style={styles.itemText}>Math: {item.note_math}</Text>
          <Text style={styles.itemText}>Physique: {item.note_phys}</Text>
          <Text style={[styles.itemMoyenne, { color: moyenneColor }]}>Moyenne: {moyenne}</Text>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <MaterialIcons name="edit" size={24} color="blue" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <MaterialIcons name="delete" size={24} color="red" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={etudiants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsText}>Moyenne minimale: {minMoyenne}</Text>
        <Text style={styles.statisticsText}>Moyenne maximale: {maxMoyenne}</Text>
        <Text style={styles.statisticsText}>Étudiants admis: {etudiantsAdmis}</Text>
        <Text style={styles.statisticsText}>Étudiants non admis: {etudiantsNonAdmis}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddStudent')}
      >
        <Text style={styles.addButtonText}>Ajouter un étudiant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemIndex: {
    fontSize: 16,
    marginRight: 30,
    fontWeight: 'bold',
    
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 20,

  },
  itemMoyenne: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
  },
  itemButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  statisticsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  statisticsText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
});

export default HomeScreen;
