import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { collection,addDoc,serverTimestamp  } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { db } from '../../firebaseConfig';
import * as Location from 'expo-location';

const Order = () => {
    const [count, setCount]=useState(1)
    const [location, setLocation] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const { selectedData, uid } = useRoute().params;
    const navigation = useNavigation();
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
      console.log(location.coords.latitude, location.coords.longitude)
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }, []);

  return (
    <View style={styles.page}>
      <View>
            <Text style={styles.name}>{selectedData.name}</Text>
            <Text style={styles.description}>{selectedData.description}</Text>
            <View style={styles.separator} />

            <View style={styles.row}>
            <AntDesign name="minuscircleo" size={60} color="black" 
            onPress={() =>  {count>=2 && setCount(count-1)}} />
            <Text style={styles.quantity}>{count}</Text>
            <AntDesign name="pluscircleo" size={60} color="black" 
                onPress={() => setCount(count+1)} />
            </View>
            <TouchableOpacity style={styles.button}
             onPress={() => {
                // addDishToBasket(selectedData, count)
                navigation.navigate("Basket" , {uid: uid});
                const myCollection = collection(db, 'basket');
                const docData = {
                  name: selectedData.name,
                  price: selectedData.price * count,
                  quantity: count,
                  uid: uid,
                  timestamp: serverTimestamp(),
                  latitude: latitude,
                  longitude: longitude
                };
                addDoc(myCollection, docData)
                  .then(() => {
                    alert('Food is added to basket!');
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
             }}
            >
                <Text style={styles.buttonText}>ADD {count} TO BASKET    $ {( selectedData.price * count ).toFixed(2)}</Text>
            </TouchableOpacity>
      </View>
    </View>
  ) 
}

export default Order

const styles = StyleSheet.create({
    page:{
        width:'100%',
        flex:1,
        paddingVertical: 30,
        padding:10
    },
    name:{
        fontSize:20,
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
        justifyContent:'center',
        marginTop:50,
    },
    quantity: {
        fontSize:25,
        marginHorizontal: 20,
    },
    button:{
        backgroundColor:'#4CAF50',
        marginTop:'auto',
        padding:20,
        alignItems:'center',
        marginTop: 185
    },
    buttonText:{
        color:'white',
        fontWeight:'600',
        fontSize:18
    }
})