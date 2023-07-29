import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, getDocs,onSnapshot,deleteDoc,doc,where,query,setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Delivery = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const uid = route.params.uid;
    const { uEmail } = useRoute().params;

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'acceptOrder'), (querySnapshot) => {
          const docs = querySnapshot.docs.map(dish => ({ id: dish.id, ...dish.data() }));
      
          const fetchData = async () => {
            const newData = await Promise.all(docs.map(async (doc) => {
              const deliveryStatusQuerySnapshot = await getDocs(query(collection(db, 'deliveryStatus'), where('orderId', '==', doc.orderId)));
              const deliveryStatusDocs = deliveryStatusQuerySnapshot.docs.map(deliveryStatusDoc => ({ id: deliveryStatusDoc.id, ...deliveryStatusDoc.data() }));
      
              if (deliveryStatusDocs.length > 0) {
                const deliveryStatusData = deliveryStatusDocs[0];
                return { ...doc, deliveryStatus: deliveryStatusData.status };
              } else {
                return { ...doc, deliveryStatus: '' };
              }
            }));
            setData(newData);
          };
      
          fetchData();
        });
      
        return () => unsubscribe();
      }, []);
      
      const handleDelete = async (item) => {
        try {
          const collectionAdd = collection(db, 'cancelOrder');
          const addDoc = doc(collectionAdd, item.id);
      
          await setDoc(addDoc, {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            deliveryId: item.deliveryId,
            did: item.did,
            orderId: item.orderId,
            uid: uid,
          });
      
          const myDoc = doc(db, 'acceptOrder', item.id);
          await deleteDoc(myDoc);
          alert("Delivery canceled successfully!");
      
          const collectionRef = collection(db, 'deliveryStatus');
          const q = query(collectionRef, where('orderId', '==', item.orderId));
          const querySnapshot = await getDocs(q);
      
          querySnapshot.docs.forEach(async (doc) => {
            try {
              await deleteDoc(doc.ref);
            } catch (error) {
              console.error('Error deleting document: ', error);
            }
          });
      
          alert("Delivery added to canceled order successfully!");
        } catch (error) {
          alert(error.message);
        }
      };
      

const renderItem = ({ item }) => {
    if (item.uid == uid) {
    return (
        <TouchableOpacity>
          <View style={styles.container}>
            <View style={{flex:1}}>
              <Text style={styles.name}>Food Name: {item.name}</Text>
              <Text style={styles.price}>price: {item.price}birr</Text>
              <Text style={styles.price}>Quantity: {item.quantity}birr</Text>
              <Text style={styles.stat}>Delivery status: "{item.deliveryStatus}"</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item)}>
                <View style={{alignItems: 'center'}}>
                <Text style={styles.bButtonText}><AntDesign name="closecircle" size={50} color="#4CAF50" /></Text>
                <Text>Cancel Delivery</Text>
                </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <ScrollView>
        <TouchableOpacity style={styles.bButton1} onPress={() => navigation.navigate('Home', {uid: uid, uEmail:uEmail})} >
         <View style={{alignItems: 'center'}}>
         <Text style={styles.bButtonText}><Ionicons name="arrow-back-circle" size={60} color="#4CAF50" /></Text>
          <Text>Back</Text>
         </View>
        </TouchableOpacity>
    <Image 
        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Beyaynetu.JPG/1200px-Beyaynetu.JPG'}}
        style={styles.bgimage}
    />
    <Text style={{marginLeft: 20, fontWeight:'bold', fontSize: 30, color:"#4CAF50"}}>Delivery Orders</Text>
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
    stat: {
        fontSize: 12
    }

});

export default Delivery;