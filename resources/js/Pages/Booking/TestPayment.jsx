// resources/js/Pages/Booking/TestPayment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TestPayment = ({token}) => {
    const [snapToken, setSnapToken] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await axios.post('/create-transaction/send', {
                amount: 100000, // Example amount in the smallest currency unit (e.g., IDR cents)
            });

            // Get the Snap token from the response
            const { snap_token } = response.data;
            console.log(snap_token)
            setSnapToken(snap_token);

            // Use Midtrans Snap to show the payment modal
            window.snap.pay(snap_token, {
                onSuccess: function (result) {
                    alert('Payment Success! ' + JSON.stringify(result));
                },
                onPending: function (result) {
                    alert('Payment Pending! ' + JSON.stringify(result));
                },
                onError: function (result) {
                    alert('Payment Error! ' + JSON.stringify(result));
                },
                onClose: function () {
                    alert('You closed the popup without completing the payment.');
                }
            });
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div>
            <h1>Test Payment with Midtrans</h1>
            <button onClick={handlePayment}>Pay with GoPay</button>

            {snapToken && <p>Snap Token: {snapToken}</p>}
        </div>
    );
};

export default TestPayment;
