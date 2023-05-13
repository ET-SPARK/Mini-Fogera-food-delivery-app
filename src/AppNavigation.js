import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReadDish from './screens/ReadDish';
import Order from './screens/Order';
import Basket from './screens/Basket';


const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}  options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
      <Stack.Screen name="ReadDish" component={ReadDish}  options={{headerShown: false}} />
      <Stack.Screen name="Order" component={Order}  />
      <Stack.Screen name="Basket" component={Basket}  />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})