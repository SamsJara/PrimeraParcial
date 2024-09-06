import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Text } from 'react-native-elements';
import axios from 'axios';

const Axios03 = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
          </Card>
        )}
      />
    </View>
  );
};

export default Axios03;
