import { loadStripe} from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../../../sharedPage/Checkout/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Key)
import { Elements } from '@stripe/react-stripe-js';
const Payment = () => {
    const booking = useLoaderData()
    const { treatment, price, appointmentDate, selectedTime
    } = booking
    return (
        <div className='text-center my-4'>
            <h1 className='text-2xl font-bold text-red-400'>Payment for {treatment}</h1>
            <h4 className='text-xl font-semibold text-green-800'>You have to pay <span className='font-bold'>${price}</span> for appointment</h4>
            <p>Date: {appointmentDate}</p>
            <p>Time: {selectedTime}</p>
            <div className='my-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;