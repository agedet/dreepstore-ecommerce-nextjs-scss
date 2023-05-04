import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import axios from 'axios'
import { makeStyles } from '@mui/styles';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

function Cart () {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of Stock!');
        // window.alert('Sorry, Product is out of Stock');
        // return;
    }

    dispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}, });
    toast.success('Product updated in the cart');
    // window.alert('Product updated in the cart');
    
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    toast.success('Item removed to cart');
  };

  // const checkOutHandler =() => {
  //   router.push('login?redirect=/shipping');
  // }

  const useStyles = makeStyles ((theme) => ({
    container: {
      padding: '120px 0 80px 0',
      fontFamily: 'Poppins',
    }
  }));

  const classes = useStyles();

  return (
    <section title='cart' className={classes.container}>
      <Container>
        <div>
          <Typography variant='h3' sx={{fontWeight: '700', fontFamily: 'Poppins', fontSize: '20px', marginBottom: '20px'}}>
            Your cart
          </Typography>

          <div>
            {cartItems.length === 0 ? 
              (<div className='cart-nobrainer'>
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
              ) : 
              (<>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Box>
                      {cartItems.map((item) => (
                        <div key={item.slug} 
                          className='shoppin-cart-item'>
                          <div>
                            <Link href={`/product/${item.slug}`}>
                              <a className='item-image' >
                                <Image 
                                  src={item.image} 
                                  alt={item.name} 
                                  width={60} 
                                  height={60} 
                                /> {' '}
                                <span 
                                  style={{
                                    margin: '0 0 0 5px', 
                                    fontWeight: '600', 
                                    letterSpacing: '0.75px'
                                  }}
                                >
                                  {item.name}
                                </span>
                                
                              </a>
                            </Link>
                          </div>

                          <div>                  
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
                          </div>

                          <div >
                            <Typography variant='body2'
                              sx={{
                                fontFamily: 'Poppins', fontWeight: '400', 
                              }}
                            >
                              ₦{item.price}
                            </Typography>
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              onClick={() => removeItemHandler(item)}

                              sx={{
                                color: '#000', 
                                fontWeight: '500', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                align: 'center'
                              }}
                            >
                              <i className='fas fa-trash'></i> 
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Box>
                      <div 
                        style={{
                          borderBottom: '1px solid #000',
                          borderTop: '1px solid #000',
                          padding: '10px',
                        }}
                      >
                        <Typography variant='body1'
                          sx={{fontWeight: '500'}}
                        >
                          Subtotal
                        </Typography>
                        <div style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '700',

                          }}>
                          <Typography variant='body2'>
                            Qty: {cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Typography>
                        </div>
                        <div style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '700',

                          }}>
                          <Typography variant='body2'>
                            Amount 
                          </Typography>
                          <Typography variant='body2'>
                            ₦{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                          </Typography>
                        </div>
                        <div style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '700',

                          }}>
                          <Typography variant='body2'>
                            Shipping 
                          </Typography>
                          <Typography variant='body2'>
                              ₦0
                          </Typography>
                        </div>
                        <div 
                          style={{
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: '700',

                          }}
                        >
                          <Typography variant='body2'>
                            Tax
                          </Typography>
                          <Typography variant='body2'>
                            ₦0
                          </Typography>
                        </div>
                        
                        
                      </div>
                      <div 
                        style={{
                          borderBottom: '1px solid #000',
                          borderTop: '1px solid #000',
                          padding: '10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontWeight: '700',
                          fontWeight: '500'

                        }}
                      >
                        <Typography variant='h6'>
                          Total
                        </Typography>
                        <Typography variant='h6'>
                           ₦{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                        </Typography>
                        
                      </div>

                      <div>
                        <Button variant='contained' 
                          onClick={() => router.push('signin?redirect=/shipping')}
                          style={{
                            width: '100%',
                            backgroundColor: '#927780',
                            height: '55px',
                            marginTop: '20px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            fontSize: '18px',
                            color: '#fff'
                          }}
                        >
                          Check Out <i className='fas fa-scanner-gun' />
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              
              
              {/* <div className='shoppin-container'>
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
                            <button 
                                onClick={() => updateCartHandler(item, item.quantity - 1)}
                                disabled={item.quantity === 1}
                            >
                                <i className='fas fa-minus-circle'></i>
                            </button> {' '}

                            <span>
                              {item.quantity}
                            </span>{' '}

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

                            <button
                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                disabled={item.quantity === item.countInStock}
                            >
                                <i className='fas fa-plus-circle'></i>
                            </button>
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
                        onClick={() => router.push('signin?redirect=/shipping')}
                        className='checkout-btn'
                      >
                        CHECK OUT <i className='fas fa-scanner-gun' />
                      </button>
                    </li>
                  </ul>
                </div>
              </div> */}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}


export default dynamic(() => Promise.resolve(Cart), { ssr: false });