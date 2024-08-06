import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount, onSuccess, onClick }) => {
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount, // Set the amount here
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Order successfully captured:', order);
        onSuccess(order); // Handle successful transaction
        onclick(onClick);
      },
      onError: (err) => {
        console.error('Error processing PayPal payment:', err);
      },
    }).render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;