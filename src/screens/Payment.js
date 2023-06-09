import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const Payment = () => {
  const {totalPrice } = useRoute().params;
  const {uEmail } = useRoute().params;
  const navigation = useNavigation();
  const TEXT_REF = "tx-myecommerce12345-" + Date.now()
  
  const htmlContent = `
    <html>
      <head>
        <style>
        .form-container {
          padding: 20px;
          background-color: #f2f2f2;
          border-radius: 5px;
      }
      /* Button styles */
      .form-container button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
      }
        </style>
      </head>
      <body>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" class="form-container">
      <input type="hidden" name="public_key" value="CHAPUBK_TEST-cajrmdH217grmVDQVWVH8kkDAL8v6ArM" />
      <input type="hidden" name="tx_ref" value="${TEXT_REF}" />
      <input type="hidden" name="amount" value=${totalPrice} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value="${uEmail}" />
      <input type="hidden" name="first_name" value="Your first name" />
      <input type="hidden" name="last_name" value="Your last name" />
      <input type="hidden" name="title" value="Let us do this" />
      <input type="hidden" name="description" value="Paying with Confidence with chapa" />
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="meta[title]" value="test" />
      <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `;
  return (
    <View style={styles.container}>
      <WebView
       source={{ html: htmlContent }}
      />
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20,
        marginHorizontal:20,
    },
    webView:{
        marginVertical: 50,
        marginHorizontal:20
    }
})