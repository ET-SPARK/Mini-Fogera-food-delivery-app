import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, getDocs,onSnapshot } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const ReadDish = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const uid = route.params.uid;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'dish'), (querySnapshot) => {
      const docs = querySnapshot.docs.map(dish => ({id: dish.id, ...dish.data()}));
      setData(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleItemPress = item => {
      navigation.navigate('Order', { selectedData: item, uid: uid });
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.container}>
        <View style={{flex:1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.price}>price: {item.price}birr</Text>
      </View> 
      <View>
          <Image 
              source={{uri: item.image}}
              style={styles.image}
          />
      </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <ScrollView>
        <TouchableOpacity style={styles.bButton1} onPress={() => navigation.navigate('Home', {uid: uid})} >
         <View style={{alignItems: 'center'}}>
         <Text style={styles.bButtonText}><Ionicons name="arrow-back-circle" size={60} color="#4CAF50" /></Text>
          <Text>Back</Text>
         </View>
        </TouchableOpacity>
    <Image 
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Beyaynetu.JPG/1200px-Beyaynetu.JPG'}}
        style={styles.bgimage}
    />
    <Text style={{marginLeft: 20, fontWeight:'bold', fontSize: 30, color:"#4CAF50"}}>Menu </Text>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container:{
        borderBottomColor: 'gray',
        borderBottomWidth:1,
        paddingVertical: 10,
        marginVertical:10,
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    name:{
        fontWeight: '600',
        fontSize:16,
        letterSpacing: 0.5,
    },
    bgimage:{
        height: 200,
    },
    description:{
        color:'gray',
        marginVertical:5
    },
    price:{
        fontSize: 16,
    },
    image:{
        height: 50,
        width: 50
    },
    bButton1: {
        position:'absolute',
        top: 20,
        left: 5,
        zIndex: 1
      },
    bButton2: {
        position:'absolute',
        top: 20,
        right: 5,
        zIndex: 1
    },  
    bButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    },

});

export default ReadDish;
