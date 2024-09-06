import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Componente01 from './src/primera-parcial/ComponenteParcial01';
import Props02 from './src/primera-parcial/PropsParcial02';
import Axios03 from './src/primera-parcial/AxiosParcial03';
import AsyncStorage04 from './src/primera-parcial/AsyncStorageParcial04';


const Stack = createStackNavigator();

const App = () => {
  return (

   
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Componente01">
        <Stack.Screen name="Componente01" component={Componente01} />
        <Stack.Screen name="Props02" component={Props02} />
        <Stack.Screen name="Axios03" component={Axios03} />
        <Stack.Screen name="AsyncStorage04" component={AsyncStorage04} />
      </Stack.Navigator>
    </NavigationContainer>

    
  );
};

export default App;
