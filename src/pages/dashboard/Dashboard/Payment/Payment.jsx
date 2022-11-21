import { loadStripe} from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from '../../../sharedPage/Checkout/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Key)
import { BallTriangle } from 'react-loader-spinner'
import { Elements } from '@stripe/react-stripe-js';
const Payment = () => {
    const booking = useLoaderData()
    const { treatment, price, appointmentDate, selectedTime
    } = booking
    const navigation = useNavigation()
    if(navigation === 'loading'){
        return <div className='w-[100%] h-[80vh] grid place-items-center'>
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />
    </div>
    }
    return (
        <div className='text-center my-4'>
            <h1 className='text-2xl font-bold text-red-400'>Payment for {treatment}</h1>
            <h4 className='text-xl font-semibold text-green-800'>You have to pay <span className='font-bold'>${price}</span> for appointment</h4>
            <p>Date: {appointmentDate}</p>
            <p>Time: {selectedTime}</p>
            <div className='my-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm key={booking._id} booking={booking}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;