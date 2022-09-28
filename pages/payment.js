import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod} = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});
        Cookies.set('cart', JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod, })
        );
        router.push('/placeorder');
    };
    useEffect(() => {
        if(!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

  return (
    <section title='Payment Method'>
        <div className='container'>
            <div className='login-form-container'>
                <h3>Payment Method</h3>
                <form onSubmit={submitHandler}>
                    {['PayPal', 'Stripe', 'PayStack', 'CashOnDelivery'].map((payment) => (
                        <div key={payment} className="pay-marg">
                            <input 
                                name="paymentMethod"
                                id={payment}
                                type="radio"
                                checked={selectedPaymentMethod === payment}
                                onChange={() => setSelectedPaymentMethod(payment)}
                                className="form-input-radio focus:ring-0"
                                
                            />
                            <label htmlFor={payment} className='form-label'>
                                {payment}
                            </label>
                        </div>
                    ))}
                    <div className='payment-btn-div'>
                        <button
                            onClick={() => router.push('/shipping')}
                            type="button"
                            className='create-act-btn'
                        >
                            Back
                        </button>
                        <button className='create-act-btn'>Next</button>
                    </div>
                </form>
            </div>
        </div>     
    </section>
  )
}

PaymentScreen.auth = true;