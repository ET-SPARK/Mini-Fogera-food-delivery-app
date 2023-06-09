import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { collection, query,getDocs,doc, deleteDoc,onSnapshot,where } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';

const Basket = () => {
  const [data, setData] = useState([]);
  const {uid ,uEmail } = useRoute().params;
  const navigation = useNavigation();
  let totalPrice = 0;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'basket'), (querySnapshot) => {
      const docs = querySnapshot.docs.map(dish => ({id: dish.id, ...dish.data()}));
      setData(docs);
      // console.log(uEmail)
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.page}>
     <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 30}}>
      </View>
      <Text style={{fontWeight:'bold',marginTop:20,fontSize:19}}>Your Items</Text>
      <ScrollView>
    {data
      .filter((basket) => basket.uid === uid)
      .map((basket) => {
        totalPrice += basket.price;
        return (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={styles.name}>{basket.name}</Text>
              <Text style={styles.description} numberOfLines={2}>quantity: {basket.quantity}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}}>
              <Text style={styles.price}>price: {basket.price} birr</Text>
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
                <MaterialIcons name="delete" size={24} color='#4CAF50' />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        );
      })}

<View style={styles.totalPriceContainer}>
  <Text style={styles.totalPriceText}>TOTAL PRICE: {totalPrice} birr</Text>
</View>
      </ScrollView>
      <View style={styles.separator} />
      <View>
      <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('Payment', { totalPrice: totalPrice, uEmail: uEmail, uid: uid });
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
        padding:10
    },
    name:{
        fontSize:24,
        fontWeight:'700',
        marginVertical:10,
        color:'#4CAF50',
    },
    separator:{
        height:1,
        backgroundColor: 'lightgrey',
        marginVertical:10,
    },
    description:{
        color: 'black'
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
    totalPriceContainer:{
      marginTop:30,
      marginLeft: 30
    },
    totalPriceText: {
      fontSize: 20
    },
})