import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

const Props02 = () => {
  const route = useRoute();
  const { nombre, edad } = route.params;

  return (
    <View>
      <Card>
        <Card.Title>Datos Recibidos</Card.Title>
        <Card.Divider />
        <Text>Mi nombre es: {nombre}, actualmente tengo: {edad} años</Text>
      </Card>
    </View>
  );
};

export default Props02;
