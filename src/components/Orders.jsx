import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_ORDERS
} from '../graphql/queries';
import {
  UPDATE_ORDER_STATUS,
  CANCEL_ORDER,
  UPDATE_ORDER_ITEMS
} from '../graphql/mutations';
import useAuthStore from '../store/useAuthStore';
import '../styles/theme.css';

export default function Orders() {
  const { user, role } = useAuthStore();
  const { data, loading } = useQuery(GET_ALL_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);
  const [cancelOrder] = useMutation(CANCEL_ORDER);
  const [updateItems] = useMutation(UPDATE_ORDER_ITEMS);

  if (loading) return <p>Loading orders...</p>;
  const orders = data?.orders || [];

  const handleRemoveItem = (order, itemName) => {
    const newItems = order.items.filter(i => i.name !== itemName);
    updateItems({ variables: { id: order._id, items: newItems } });
  };

  const handleAddDummyItem = (orderId) => {
    const dummyItem = { name: 'Extra Fries', quantity: 1, price: 40 };
    const updatedItems = [...order.items, dummyItem];
    updateItems({ variables: { id: orderId, items: updatedItems } });
  };

  const visibleOrders = role === 'customer'
    ? orders.filter(o => o.customerName === (user?.displayName || 'Anonymous'))
    : orders;

  return (
    <div className="order-section">
      <h2>Orders</h2>
      {visibleOrders.map(order => (
        <div key={order._id} className="order-box">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>

          {role === 'employee' && order.status === 'Pending' && (
            <button onClick={() => updateStatus({ variables: { id: order._id, status: 'Ready' } })}>
              Mark as Ready
            </button>
          )}

          {role === 'admin' && (
            <>
              <button onClick={() => cancelOrder({ variables: { id: order._id } })}>
                Remove Order
              </button>
              <button onClick={() => handleAddDummyItem(order._id)}>
                Add Item
              </button>
              {order.items.map(item => (
                <button key={item.name} onClick={() => handleRemoveItem(order, item.name)}>
                  Remove {item.name}
                </button>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
