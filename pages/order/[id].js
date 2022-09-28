import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
import { PaystackButton } from 'react-paystack'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}


function OrderScreen() {
  const { data: session } = useSession();
//   order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    // PAyStack 
    const PublicKey = "pk_test_cf8c26fdd07d3fe281478ca321f0dc180258c0d8"
    const amount = 10000000
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    const componentProps = {
        email, amount, 
        metadata: {
            name,
            phone,
        },
        PublicKey,
        text: "Pay Now",
        onSuccess: () => alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this, don't go!!!"),
    }


  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successfully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <section title={`Order ${orderId}`} className="place-order-section">
      <div className='container'>
        <h3>{`Order ${orderId}`}</h3>
        <div className='order-container'>
            {loading ? (
              <div>Loading...</div>
              ) : error ? (
              <div className="alert-error">{error}</div>
              ) : (
          <div className="ship-order">
            <div className="ship-pick">
              <div className="ship-add">
                <h4>Shipping Address</h4>
                <div>
                  <p>Name: {shippingAddress.fullName}</p>
                  <p>
                    Address: {shippingAddress.address},{' '} {shippingAddress.city}, {shippingAddress.postalCode},{' '} {shippingAddress.country}
                  </p> 
                </div>
                {isDelivered ? (
                  <div className="alert-success">
                    <p>Delivered at {deliveredAt}</p>
                  </div>
                  ) : (
                  <div className="alert-error">
                    <p>Not delivered</p>
                  </div>
                )}
              </div>

              <div className="ship-add">
                <h4>Payment Method</h4>
                <div><p>{paymentMethod}</p></div>
                {isPaid ? (
                  <div className="alert-success"><p>Paid at {paidAt}</p></div>
                  ) : (
                  <div className="alert-error"><p>Not paid</p></div>
                )}
              </div>

              <div className="ship-add">
                <h4>Order Items</h4>
                <table className="order-table">
                  <thead className="order-thead">
                    <tr  className='order-tr'>
                      <th className="order-th">Quantity</th>
                      <th className="order-th">Item</th>
                      <th className="order-th">Price</th>
                      <th className="order-th">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item._id} >
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <a className="a-im">
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
            </div>
          </div>
            <div className="ship-sum">
              <h4>Order Summary</h4>
              <ul>
                <li>
                  <div>
                    <h5>Items</h5>
                    <div><p>₦{itemsPrice}</p></div>
                  </div>
                </li>{' '}
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
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      
                        <PaystackButton
                          {...componentProps} className="paystack-button create-act-btn"
                        ></PaystackButton>
                      </div>
                      
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <div>
                    {loadingDeliver && <div>Loading...</div>}
                    <button
                      className="create-act-btn"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </button>
                  </div>
                )}
              </ul>
            </div>
        </div>
      )}
        </div>
      </div>
    </section>
  );
}

OrderScreen.auth = true;
export default OrderScreen;