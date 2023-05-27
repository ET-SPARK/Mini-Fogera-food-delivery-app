import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import axios from 'axios';

const Payment = () => {
  const {totalPrice } = useRoute().params;
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
      <input type="hidden" name="public_key" value="CHAPUBK_TEST-schbbBz7ZDfmBr3rbPbyFlCbE9gEcL6r" />
      <input type="hidden" name="tx_ref" value="${TEXT_REF}" />
      <input type="hidden" name="amount" value=${totalPrice} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value="samuelwoyesso2016@gmail.com" />
      <input type="hidden" name="first_name" value="Israel" />
      <input type="hidden" name="last_name" value="Goytom" />
      <input type="hidden" name="title" value="Let us do this" />
      <input type="hidden" name="description" value="Paying with Confidence with cha" />
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
    },
    webView:{
        marginVertical: 50,
        marginHorizontal:20
    }
})