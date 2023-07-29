import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, database, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc,getDocs } from 'firebase/firestore';


const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async () => {
    if (email === '' || phoneNumber === '' || username === '' || password === '') {
      alert('Please fill in all fields');
      return;
    } 
    if (password != cpassword) {
        alert("Confirm password doesn't match with the above password")
    }
    if (phoneNumber.length !== 10) {
      alert('Please enter valid Phone number');
      return;
    }
    const querySnapshot = await getDocs(collection(db, 'users'));
    const existingDriver = querySnapshot.docs.find(doc => doc.data().email === email);
    if (existingDriver) {
      alert('Email already exists');
      return;
    }
        try {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user.uid;
                // Store additional user information in Firebase Realtime Database
                const users = collection(db, 'users');
                    const newuser = addDoc(users , {
                        email,
                        username,
                        phoneNumber,
                        user
                    })
            navigation.navigate('LoginScreen');                 
            alert("successfully registerd");
            setEmail('');
            setPassword('');
            setUsername('');
            setPhoneNumber('');
            })
        } catch (error) {
            alert("Failed to register user: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={cpassword}
                onChangeText={(text) => setcPassword(text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                maxLength={10}
                keyboardType="numeric" 
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>Already have an account? Login here</Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default RegisterScreen;
