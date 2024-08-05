import React from 'react';
import PayPalButton from './PayPalButton';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    
  const location = useLocation;
  const price = location.state?.val;

  const handlePaymentSuccess = (order) => {
    // Handle successful payment here
    console.log('Payment was successful!', order);
  };

  return (
    <div className="Payment">
      <h1>PayPal Integration in React</h1>
      <PayPalButton amount={price} onSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default Payment;