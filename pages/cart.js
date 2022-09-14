import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Cart () {
  const { state, dispatch } = useContext(Store);
  // const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
        window.alert('Sorry, Product is out of Stock');
        // return toast.error('Sorry, Product is out of Stock!);
        return;
    }

    dispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}, });
    window.alert('Product updated in the cart');
    //toast.success('Product updated in the cart');
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkOutHandler =() => {
    router.push('login?redirect=/shipping');
  }

  return (
    <section title='cart'>
      <div className='container'>
        <div>
          <div>
            <h3>Shopping Cart</h3>
            {cartItems.length === 0 ? 
              (<div>
                  Cart is empty.  
                  <Link href='/'>
                    <a className='cart-link'>
                      Go Shopping <i className='fas fa-cart-plus' />
                    </a>
                  </Link>
                </div>
              ) : 
            (
              <div className='shoppin-container'>
                <div className='shoppin-cart'>
                  <div>
                    {cartItems.map((item) => (
                      <div key={item.slug} className='shoppin-cart-item'>
                        <div >
                          <Link href={`/product/${item.slug}`}>
                            <a className='item-image'>
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                width={50} 
                                height={50} 
                              /> {' '}
                               {item.name}
                            </a>
                          </Link>
                        </div>

                        <div>
                            {/* <button 
                                onClick={() => updateCartHandler(item, item.quantity - 1)}
                                disabled={item.quantity === 1}
                            >
                                <i className='fas fa-minus-circle'></i>
                            </button> {' '}

                            <span>
                              {item.quantity}
                            </span>{' '} */}

                            {/* boxed selection */}

                            <span className='qty-selection'>
                              <select
                                value={item.quantity}
                                onChange={(e) => updateCartHandler(item, e.target.value)}
                              >
                                {[ ...Array(item.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                            </span>

                            {/* <button
                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                disabled={item.quantity === item.countInStock}
                            >
                                <i className='fas fa-plus-circle'></i>
                            </button> */}
                        </div>

                        <div >
                          <p className='cart-price'>₦{item.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => removeItemHandler(item)}
                            >
                                <i className='fas fa-trash'></i> Remove
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='shoppin-checkout'>
                  <ul>
                    <li className='checkout-list'>
                      <div>
                        <h4>Subtotal</h4>
                         
                        <p>
                          Qty: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </p>
                        <p>
                         Amount:  ₦{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                        </p>
                        <p>
                         Shipping:  ₦0
                        </p>
                        <p>
                         Tax:  ₦0
                        </p>
                        <h4>
                          Total: ₦{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                        </h4>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={checkOutHandler}
                        className='checkout-btn'
                      >
                        CHECK OUT <i className='fas fa-scanner-gun' />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}