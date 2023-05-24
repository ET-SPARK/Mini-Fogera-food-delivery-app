import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import axios from 'axios';

const Payment = () => {
    const {uid } = useRoute().params;
    const {selectedData } = useRoute().params;
     const navigation = useNavigation();

     axios.post('http://192.168.137.1:4400/api/pay', { selectedData })
     .then(response => {
       // Handle the response
     })
     .catch(error => {
       // Handle the error
     });
  return (
    <View style={styles.container}>
      <WebView
        scalesPageToFit={true}
        style={styles.webView}
        source={{ uri: 'http://192.168.137.1:4400' }}
      />
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView:{
        marginVertical: 50,
        marginHorizontal:20
    }
})