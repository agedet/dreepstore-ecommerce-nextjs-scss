import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {getError} from '../utils/error';
import axios from 'axios';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <section title='Place Order' className='place-order-section'>
      <div className='container'>
        <h3>Place Order</h3>
        {cartItems.length === 0 ? (
          <div className='cart-nobrainer'>
            Oooops! Cart is empty. {' '}  
            <Link href='/'>
              <a className='cart-link'>
                Lets go shopping <i className='fas fa-cart-plus' />
              </a>
            </Link>
            <img 
              src='/images/shopping.jpg'
              alt='shopping'
            />
          </div>
          ) : (
          <div className='ship-order'>
            <div className='ship-pick'>
              <div className='ship-add'>
                <h4>Shipping Address</h4>
                  <div>
                    <p>Name: {shippingAddress.fullName}</p>
                    <p>Address: {shippingAddress.address},{' '}
                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                    {shippingAddress.country}.</p>             
                  </div>
                  <div className='ship-add-link'>
                    <Link href="/shipping"><a>Edit</a></Link>
                  </div>
              </div>
              <div className='ship-add'>
                <h4>Payment Method</h4>
                  <div><p>{paymentMethod}</p></div>
                  <div className='ship-add-link'>
                    <Link href="/payment"><a>Edit</a></Link>
                  </div>
              </div>
              <div className='ship-add'>
                <h4 >Order Items</h4>
                <table className="order-table">
                  <thead className="order-thead">
                    <tr className='order-tr'>
                      <th className="order-th">Item</th>
                      <th className="order-th">Quantity</th>
                      <th className="order-th">Price</th>
                      <th className="order-th">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <a className='a-im'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              <p>{item.name}</p>
                            </a>
                          </Link>
                        </td>
                        <td><p>{item.quantity}</p></td>
                        <td><p>₦{item.price}</p> </td>
                        <td><p>₦{item.quantity * item.price}</p></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='ship-add-link'>
                  <Link href="/cart"><a>Edit</a></Link>
                </div>
              </div>
            </div>
            <div className='ship-sum'>
              <div className='ship-add'>
                <h4>Order Summary</h4>
                <ul>
                  <li>
                    <div>
                      <h5>Items</h5>
                      <div><p>₦{itemsPrice}</p></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>Tax</h5>
                      <div><p>₦{taxPrice}</p> </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>Shipping</h5>
                      <div> <p>₦{shippingPrice}</p></div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>Total</h5>
                      <div><p>₦{totalPrice}</p></div>
                    </div>
                  </li>
                </ul>
                <div>
                  <button
                    type='submit'
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="create-act-btn"
                    >
                    {loading ? 'Loading...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

PlaceOrderScreen.auth = true;