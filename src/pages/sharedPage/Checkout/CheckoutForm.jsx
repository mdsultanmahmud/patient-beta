import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardErr, setCardErr] = useState('')
    const handleSubmit = async(event) =>{
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card === 'null'){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card,
        })
        if(error){
            console.log('error: ', error)
            setCardErr(error?.message)
        }else{
            console.log('payment method', paymentMethod)
            setCardErr('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='px-6 my-4 btn btn-secondary btn-outline' type="submit" disabled={!stripe}>
                Pay
            </button>
            <p className='text-red-500 text-sm font-bold'>{cardErr}</p>
        </form>
    );
};

export default CheckoutForm;