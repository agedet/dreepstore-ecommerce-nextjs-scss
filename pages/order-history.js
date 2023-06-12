import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { getError } from '../utils/error';
import Loading from '../components/Layout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <section title="Order History" className='order-his-section'>
      <div className='container'>
        <div className='order-container'>
          <h3>Order History</h3>
            {loading ? (
              <Loading />
              // <div>Loading...</div>
              ) : error ? (
                <div className="alert-error">{error}</div>
              ) : (
              <div className="ship-add">
                <table className="order-table">
                  <thead className="order-thead">
                    <tr className='order-tr'>
                      <th className="order-th">ID</th>
                      <th className="order-th">DATE</th>
                      <th className="order-th">TOTAL</th>
                      <th className="order-th">PAID</th>
                      <th className="order-th">DELIVERED</th>
                      <th className="order-th">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="order-td"><p>{order._id.substring(20, 24)}</p></td>
                        <td className="order-td"><p>{order.createdAt.substring(0, 10)}</p></td>
                        <td className="order-td"><p>${order.totalPrice}</p></td>
                        <td className="order-td">
                          {order.isPaid
                            ? `${order.paidAt.substring(0, 10)}`
                            : 'not paid'}
                        </td>
                        <td className="order-td">
                          {order.isDelivered
                            ? `${order.deliveredAt.substring(0, 10)}`
                            : 'not delivered'}
                        </td>
                        <td className="order-td">
                          <Link href={`/order/${order._id}`} passHref>
                            <a>Details</a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;