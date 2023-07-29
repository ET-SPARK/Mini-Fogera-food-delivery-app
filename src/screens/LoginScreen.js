import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail  } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { shadow } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
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
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#4CAF50' />
      <Text style={styles.heading}>ENGOCHA FOOD DELIVERY</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
      <TextInput
        style={styles.input2}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!isPasswordVisible}
      />
       <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={styles.toggleVisibilityLink}>
          {isPasswordVisible ? <Octicons name="eye" size={24} color='#4CAF50' /> : <Octicons name="eye-closed" size={24} color='#4CAF50' />}
        </Text>
      </TouchableOpacity>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4CAF50',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 55,
    borderColor: '#4CAF50', // Added green border color
    borderWidth: 2,
  },
  input2: {
    width: '70%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 55,
    borderColor: '#4CAF50', // Added green border color
    borderWidth: 2,
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
  toggleVisibilityLink: {
    marginTop: 10,
    color: '#4CAF50',
    marginLeft: 10
  },
});

export default LoginScreen;
