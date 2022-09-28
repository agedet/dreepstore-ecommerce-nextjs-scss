import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';


export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);
  
  const { 
    handleSubmit, 
    register, 
    formState: { errors }, 
    setValue, 
  } = useForm();

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({ 
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set('cart', JSON.stringify({ ...cart, shippingAddress: { fullName,  address, city, postalCode, country, },
    }));
    router.push('/payment');
  };

  return (
    <section title='Shipping Address'>
        <div className='container'>
          <div className='login-form-container'>
            <h3>Shipping Address</h3>
            <form onSubmit={handleSubmit(submitHandler)} >
              <div>
                <label htmlFor="fullName" className='form-label'>Full Name</label>
                <input
                  className="form-input"
                  id="fullName"
                  autoFocus
                  {...register('fullName', {
                    required: 'Please enter full name',
                  })}
                />
                {errors.fullName && (
                  <div className="text-red">{errors.fullName.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="address" className='form-label'>Address</label>
                <input
                  className="form-input"
                  id="address"
                  {...register('address', {
                    required: 'Please enter address',
                    minLength: { value: 3, message: 'Address is more than 2 chars' },
                  })}
                />
                {errors.address && (
                  <div className="text-red">{errors.address.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="city" className='form-label'>City</label>
                <input
                  className="form-input"
                  id="city"
                  {...register('city', {
                    required: 'Please enter city',
                  })}
                />
                {errors.city && (
                  <div className="text-red ">{errors.city.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="postalCode" className='form-label'>Postal Code</label>
                <input
                  className="form-input"
                  id="postalCode"
                  {...register('postalCode', {
                    required: 'Please enter postal code',
                  })}
                />
                {errors.postalCode && (
                  <div className="text-red ">{errors.postalCode.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="country" className='form-label'>Country</label>
                <input
                  className="form-input"
                  id="country"
                  {...register('country', {
                    required: 'Please enter country',
                  })}
                />
                {errors.country && (
                  <div className="text-red ">{errors.country.message}</div>
                )}
              </div>
              <div>
                <button type="submit" className="create-act-btn">Next</button>
              </div>
          </form>
        </div>
      </div>
    </section>
  );
}

ShippingScreen.auth = true;
