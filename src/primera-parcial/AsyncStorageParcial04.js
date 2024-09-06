import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import { Input, Button, Card, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage04 = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [facultad, setFacultad] = useState('');
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);  // Almacenar el item a editar
  const [modalVisible, setModalVisible] = useState(false);
  //para que funcione el modal de editar
  const [newCarrera, setNewCarrera] = useState('');
  const [newFacultad, setNewFacultad] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    if (!codigo || !carrera || !facultad) {
      Alert.alert('Error', 'Llenar todos los campos.');
      return;
    }

    try {
      const newData = { codigo, carrera, facultad };
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem(codigo, jsonValue);
      setCodigo('');
      setCarrera('');
      setFacultad('');
      loadData();
    } catch (e) {
      Alert.alert('Error al guardar los datos');
    }
  };

  const loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const loadedData = result
        .map(req => {
          try {
            return JSON.parse(req[1]);
          } catch (error) {
            console.error('Error al parsear datos', error);
            return null;
          }
        })
        .filter(item => item !== null);
      setData(loadedData);
    } catch (e) {
      Alert.alert('Error al cargar los datos');
    }
  };

  const deleteData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      loadData();
    } catch (e) {
      Alert.alert('Error al eliminar los datos');
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setNewCarrera(item.carrera);
    setNewFacultad(item.facultad);
    setModalVisible(true);
  };

  const handleEdit = async () => {
    if (newCarrera && newFacultad && editItem) {
      try {
        const updatedData = { codigo: editItem.codigo, carrera: newCarrera, facultad: newFacultad };
        const jsonValue = JSON.stringify(updatedData);
        await AsyncStorage.setItem(editItem.codigo, jsonValue);
        setModalVisible(false);
        loadData();
      } catch (e) {
        Alert.alert('Error al editar los datos');
      }
    } else {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
    }
  };

  return (
    <View>
      <Card>
        <Card.Title>Prueba de página Async</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Código"
          value={codigo}
          onChangeText={setCodigo}
          containerStyle={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Carrera"
          value={carrera}
          onChangeText={setCarrera}
          containerStyle={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Facultad"
          value={facultad}
          onChangeText={setFacultad}
          containerStyle={{ marginBottom: 10 }}
        />
        <Button title="Guardar" onPress={saveData} />
      </Card>

      <FlatList
        data={data}
        keyExtractor={(item) => item.codigo ? item.codigo.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>Código: {item.codigo}</Card.Title>
            <Card.Divider />
            <Text>Carrera: {item.carrera}</Text>
            <Text>Facultad: {item.facultad}</Text>
            <Button title="Eliminar" onPress={() => deleteData(item.codigo)} />
            <Button title="Editar" onPress={() => openEditModal(item)} buttonStyle={{ marginTop: 10 }} />
          </Card>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nueva carrera"
              value={newCarrera}
              onChangeText={setNewCarrera}
              style={styles.input}
            />
            <TextInput
              placeholder="Nueva facultad"
              value={newFacultad}
              onChangeText={setNewFacultad}
              style={styles.input}
            />
            <Button title="Guardar cambios" onPress={handleEdit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AsyncStorage04;
