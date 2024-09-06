import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Header, ListItem, Input, Button, Text, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const [text, setText] = useState('');
  const [age, setAge] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(true);
  const navigation = useNavigation();

  const items = [
    { key: 'Props02', label: 'Props02' },
    { key: 'Axios03', label: 'Axios03' },
    { key: 'AsyncStorage04', label: 'AsyncStorage04' },
  ];

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View>
      {/* Header de navegación */}
      <Header
        centerComponent={{
          text: 'Pantalla Principal',
          style: { color: '#fff', fontSize: 18 },
        }}
        containerStyle={{ backgroundColor: '#3D6DCC' }}
      />

     
      <Text h3 style={{ textAlign: 'center', marginVertical: 10 }}>
        Examen Primera Parcial
      </Text>

      
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
        <Text h4 style={{ textAlign: 'center', marginVertical: 10 }}>
          ¡Bienvenido al exámen!
        </Text>
        <Button title="Cerrar" onPress={toggleOverlay} />
      </Overlay>

      {/* Campo de entrada para nombre */}
      <Input
        placeholder="Ingresa tu nombre"
        value={text}
        onChangeText={val => setText(val)}
        containerStyle={{ marginVertical: 10 }}
      />

      {/* Campo de entrada para edad */}
      <Input
        placeholder="Ingresa tu edad"
        value={age}
        onChangeText={val => setAge(val)}
        containerStyle={{ marginVertical: 10 }}
        keyboardType="numeric" // Para asegurarse que el teclado sea numérico
      />

      {/* Lista de componentes Parcial */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() =>
              navigation.navigate(item.key, { nombre: text, edad: age })
            }>
            <ListItem.Content>
              <ListItem.Title>{item.label}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default Componente01;
