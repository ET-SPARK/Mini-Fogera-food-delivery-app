import React from 'react';
import { Image, Pressable, StyleSheet, Text, View,ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
  const route = useRoute();
  const navigation = useNavigation()
  // const uid = route.params.uid;
  // const uEmail = route.params.uEmail
  const {uid } = useRoute().params;
  const {uEmail } = useRoute().params;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const docs = querySnapshot.docs.map(restaurant => restaurant.data());
      setData(docs);
    };
    fetchData();
  }, []);
  return (
    <ScrollView>
     <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 10, marginHorizontal: 10}}>
        <View>
        <TouchableOpacity style={styles.bButton} onPress={() => navigation.navigate('LoginScreen')} >
          <View style={{alignItems:'center'}}>
          <Text style={styles.bButtonText}><Ionicons name="arrow-back-circle" size={40} color="#4CAF50" /></Text>
          <Text>Log Out</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.bButton} onPress={() => navigation.navigate('Delivery',{uid: uid, uEmail:uEmail})} >
          <View style={{alignItems:'center'}}>
          <Text style={styles.bButtonText}>  <AntDesign name="shoppingcart" size={40} color="#4CAF50" /></Text>
          <Text>Delivery Orders</Text>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bButton} onPress={() => navigation.navigate('Profile',{uid: uid, uEmail:uEmail})} >
        <View style={{alignItems:'center'}}>
          <Text style={styles.bButtonText}>  <Ionicons name="person-circle-sharp" size={40} color="#4CAF50" /></Text>
          <Text>Profile</Text>
        </View>
        </TouchableOpacity>
      </View>
            {data.map(restaurant => (
              <Pressable style={styles.restaurantContainer}
               onPress={() => {navigation.navigate('ReadDish',{uid: uid, uEmail: uEmail })}}
             >
              <View key={restaurant.id}>
              <View style={{
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
                }}> 
              <Text style={styles.name}>{restaurant.name} Restaurant</Text>
              </View>
              <Image 
                source={{uri: restaurant.image}}
                style={styles.image}
               />
              <View style={styles.row}>
                  <View>
                      <Text style={styles.subtitle2}><Text  style={{color:  '#4CAF50'}}>
                      Location:-
                      </Text> {restaurant.address}</Text>
                      <Text style={styles.subtitle2}><Text style={{color:  '#4CAF50'}}>
                      Restaurant information:-
                      </Text>
                       "Mini Fogera Restaurant in center of city of Gondar, Ethiopia. The menu at Mini Fogera features a variety of traditional dishes such as injera, tibs, and kitfo, all prepared with fresh and high-quality ingredients. The friendly and welcoming staff at Mini Fogera add to the overall experience, ensuring that customers feel right at home. Whether you're a foodie or just looking to try something new, Mini Fogera Restaurant is definitely worth a visit when in Gondar."</Text>
                  </View>
              </View>
              </View>
              </Pressable>
            ))}
        </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
    restaurantContainer:{
        width: '100%',
        paddingHorizontal: 10
      },
      image: {
        width: '100%',
        aspectRatio:5/3,
        marginVertical: 10,
      },
      name:{
        fontWeight:50,
        fontWeight:'bold',
        marginVertical:5,
        fontSize: 25,
        color:  '#4CAF50',
        textAlign: 'center',
      },
      subtitle:{
        color:'grey',
        fontSize: 15
      },
      subtitle2: {
        color: 'black'
      },
      row:{
        flexDirection: 'row',
        alignItems: 'center'
      },
      rating: {
        backgroundColor:'lightgray',
        padding: 5,
        borderRadius: 20,
        width: 35,
        height:35,
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
      },
      bButton: {
        marginBottom: 10,
      },
      bButtonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
      },
})