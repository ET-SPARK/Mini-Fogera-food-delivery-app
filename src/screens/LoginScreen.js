import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail  } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('Home', { uid: user.uid , uEmail:user.email }); // Pass the UID to the Home screen
      alert('Welcome');
      setEmail('');
      setPassword('');
    } catch (error) {
      alert("wrong email and password");
    }
  };
  const handleForgotPassword = async () => {
    if (email === '') {
      alert('Please enter your email');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      alert('Failed to send password reset email. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Engocha Food Delivery</Text>
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
      <TouchableOpacity onPress={handleForgotPassword}>
      <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.link}>Don't have an account? Register here</Text>
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

export default LoginScreen;
