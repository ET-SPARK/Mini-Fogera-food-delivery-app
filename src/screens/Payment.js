import React, { useState } from 'react';
import { View, Button, Text, Linking, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Chapa from 'chapa';
import { getRandomBytes } from 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';

const Payment = () => {
  const [status, setStatus] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const {totalPrice } = useRoute().params;
  const {uEmail } = useRoute().params;

  const myChapa = new Chapa('CHASECK_TEST-MM6Wli0UpCQugTEyXffE3nqL01HRzwyQ');

  const customerInfo = {
    amount: totalPrice,
    currency: 'ETB',
    email: uEmail,
    first_name: 'your first name',
    last_name: 'your last name',
    callback_url: 'https://chapa.co',
    customization: {
      title: 'I love e-commerce',
      description: 'It is time to pay',
    },
  };

  const initializePayment = async () => {
    try {
      const TEXT_REF = 'tx-myecommerce12345-' + uuidv4({ random: getRandomBytes });
      customerInfo.tx_ref = TEXT_REF;

      const response = await myChapa.initialize(customerInfo, { autoRef: true });
      setStatus(response.status);
      setCheckoutUrl(response.data.checkout_url);
      // Save the reference or handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };
  const openCheckoutUrl = () => {
    if (checkoutUrl) {
      Linking.openURL(checkoutUrl);
    }
    else {
      alert("please initialize your payment!")
    }
  };

  return (
    <View>
      <View style={styles.pamInfo}>
      <Text style={styles.pamTxt}>Pay Your bill with Chapa</Text>
      <Text>Amount: <Text style={styles.pamTxt}>{totalPrice} birr</Text></Text>
      <Text>Payment status: <Text style={styles.pamTxt}>{status}</Text></Text>
      </View>
      <TouchableOpacity style={styles.button}
       onPress={initializePayment}
      >
        <Text style={styles.buttonText}>Initialize Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
       onPress={openCheckoutUrl}
      //  disabled={!checkoutUrl}
      >
        <Text style={styles.buttonText}>Open Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#4CAF50',
    marginTop:20,
    padding:10,
    alignItems:'center',
    marginHorizontal:40,
    borderRadius: 10
},
  buttonText:{
      color:'white',
      fontWeight:'600',
      fontSize:18,
      letterSpacing: 2
  },
  pamInfo: {
      paddingVertical: 50,
      paddingHorizontal: 20
  },
  pamTxt: {
      color:'#4CAF50',
      fontWeight:'600',
      fontSize:18,
      letterSpacing: 2
  }
})
