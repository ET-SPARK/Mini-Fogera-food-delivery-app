import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc,deleteDoc, getDocs, where, collection, query } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { uid } = route.params;

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    
    useEffect(() => {
        const fetchDish = async () => {
          const db = getFirestore();
          const uData = collection(db, 'users');
          const q = query(uData, where('user', '==', uid)); // Change 'user' to the actual field name
          const querySnapshot = await getDocs(q);
          // querySnapshot is a collection snapshot, so loop through documents
          querySnapshot.forEach((doc) => {
            const cData = doc.data();
            const userId = doc.id;
            // console.log(userId)
            setUsername(cData.username)
            setPhoneNumber(cData.phoneNumber)
          });
        };
        fetchDish();
      }, []);

    const UpdateProfile = async () => {
        if (phoneNumber === '' || username === '') {
            alert('Please fill in all fields');
            return;
          }
          if (phoneNumber.length !== 10) {
            alert('Please enter valid Phone number');
            return;
          }
            const db = getFirestore();
            const uData = collection(db, 'users');
            const q = query(uData, where('user', '==', uid)); // Change 'user' to the actual field name
            const querySnapshot = await getDocs(q);
            // querySnapshot is a collection snapshot, so loop through documents
            querySnapshot.forEach(async(docSnapshot) => {
                const dishDocRef = doc(db, 'users', docSnapshot.id);
                try {
                await updateDoc(dishDocRef, {
                    username,
                    phoneNumber,
                });
                alert('Profile updated successfully!');
                navigation.goBack();
                } catch (error) {
                console.log('Error updating dish: ', error);
                }
            });
    }
  return (
    <View style={styles.container}>
     <Text style={styles.heading}>Update your personal information here! </Text>
    <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
    />
    <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        maxLength={10}
        keyboardType="numeric" 
    />
    <TouchableOpacity style={styles.button} onPress={UpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
    </TouchableOpacity>
</View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    heading: {
        fontSize: 24,
        marginBottom: 30,
        color:  '#4CAF50',
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        color:  '#4CAF50',
    },
});