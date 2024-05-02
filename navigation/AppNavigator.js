import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Liste des étudiants' }} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Ajouter un étudiant' }} />
        <Stack.Screen name="EditStudent" component={EditStudentScreen} options={{ title: 'Modifier un étudiant' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
