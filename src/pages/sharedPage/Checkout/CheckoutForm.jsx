import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'
const CheckoutForm = ({ booking }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardErr, setCardErr] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState('')
    const [transectionId, setTransectionId] = useState('')
    const { price, treatment, email, patient, _id } = booking
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            }
            );
    }, [price]);



    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === 'null') {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('error: ', error)
            setCardErr(error?.message)
        } else {
            console.log('payment method', paymentMethod)
            setCardErr('')
        }


        const { paymentIntent, error: confirmCardError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (confirmCardError) {
            console.log(confirmCardError)
            toast.error(confirmCardError.message)
            return
        }

        // console.log('confirm information: ', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                transectionId: paymentIntent.id,
                price,
                email,
                treatment,
                patient,
                paymentId:_id 
            }

            fetch(`http://localhost:5000/payment`, {
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json",
                    authorizationToken: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(paymentInfo)
            })
            .then(res => res.json())
            .then(paymentData =>{
                console.log(paymentData)
                if(paymentData.acknowledged){
                    setSuccess('Your payment completed')
                    setTransectionId(paymentIntent.id)
                }
            })
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
            <button className='px-6 my-4 btn btn-secondary btn-outline' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-500 text-sm font-bold'>{cardErr}</p>

            {
                (success || transectionId) &&
                <div className='mt-10'>
                    <p className='text-sm font-bold text-green-700'>Status: {success}</p>
                    <p className='text-sm font-bold text-red-700'>Transection Id: {transectionId}</p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;