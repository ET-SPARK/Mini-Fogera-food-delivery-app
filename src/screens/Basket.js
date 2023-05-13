import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { collection, query,getDocs,doc, deleteDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Basket = () => {
  const [data, setData] = useState([]);
  const {uid } = useRoute().params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
     try {
      const q = query(collection(db, 'basket'))
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
     } catch (error) {
      console.log("failed")
     }
    };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [db]);

  return (
    <View style={styles.page}>
     <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 30}}>
      </View>
      <Text style={styles.name}>mini fogera</Text>
      <Text style={{fontWeight:'bold',marginTop:20,fontSize:19}}>Your Items</Text>
      <ScrollView>
      {data.filter((basket) => basket.uid === uid).map((basket => (
        <View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent:'space-between'}}>
            <Text style={styles.name}>{basket.name}</Text>
            <Text style={styles.description} numberOfLines={2}>quantity: {basket.quantity}</Text>
        </View> 
    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 20}}>
      <Text style={styles.price}>price: {basket.price}birr</Text>
      <TouchableOpacity
        onPress={() => {
          const myDoc = doc(db, 'basket', basket.id)
          deleteDoc(myDoc)
          .then(() => {
            alert("Deleted Successfully!")
          })
          .catch((error) => {
            alert(error.message)
          })
        }} 
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <View style={styles.separator} />
  </View>
)))}
      </ScrollView>
      <View style={styles.separator} />
      <View style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={()=> {
        }}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) 
}

export default Basket

const styles = StyleSheet.create({
    page:{
        width:'100%',
        flex:1,
        paddingVertical: 30,
        padding:10
    },
    name:{
        fontSize:24,
        fontWeight:'700',
        marginVertical:10
    },
    separator:{
        height:1,
        backgroundColor: 'lightgrey',
        marginVertical:10,
    },
    description:{
        color: 'gray'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical: 15
    },
    quantity: {
        fontSize:25,
        marginHorizontal: 20,
    },
    button:{
        backgroundColor:'#4CAF50',
        marginTop:'auto',
        padding:10,
        alignItems:'center',
        marginHorizontal:40
    },
    buttonText:{
        color:'white',
        fontWeight:'600',
        fontSize:18,
        letterSpacing: 2
    },
    quantityContainer: {
        backgroundColor: 'lightgray',
        paddingHorizontal:5,
        marginRight:5,
        paddingVertical:2,
        borderRadius: 3
    },
    bButton: {
        marginBottom: 40
    },
    bButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    },
})