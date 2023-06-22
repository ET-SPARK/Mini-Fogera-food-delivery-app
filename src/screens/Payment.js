import React, { useState } from 'react';
import { View, Button, Text, Linking } from 'react-native';
import Chapa from 'chapa';
import { getRandomBytes } from 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';

const Payment = () => {
  const [status, setStatus] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const {totalPrice } = useRoute().params;
  const {uEmail } = useRoute().params;
  const navigation = useNavigation();

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

  const verifyPayment = async () => {
    if (transactionRef) {
      try {
        const response = await myChapa.verify(transactionRef);
        setStatus(response.status);
        // Handle the response as needed
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Transaction reference is required!');
    }
  };

  const openCheckoutUrl = () => {
    if (checkoutUrl) {
      Linking.openURL(checkoutUrl);
    }
  };

  return (
    <View>
      <Button title="Initialize Payment" onPress={initializePayment} />
      <Text>Status: {status}</Text>
      <Button title="Open Checkout" onPress={openCheckoutUrl} disabled={!checkoutUrl} />
    </View>
  );
};

export default Payment;
