import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Home = () => {
  const route = useRoute();
  const uid = route.params.uid;

  return (
    <View>
      <Text>Welcome! Your UID is {uid}</Text>
    </View>
  );
};

export default Home;
