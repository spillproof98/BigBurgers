import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_ORDERS
} from '../graphql/queries';
import {
  UPDATE_ORDER_STATUS,
  CANCEL_ORDER,
  UPDATE_ORDER_ITEMS
} from '../graphql/mutations';
import '../styles/admin.css';

export default function AdminOrders() {
  const { data, refetch } = useQuery(GET_ALL_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);
  const [cancelOrder] = useMutation(CANCEL_ORDER);
  const [updateItems] = useMutation(UPDATE_ORDER_ITEMS);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  const handleRemoveItem = (orderId, itemName, items) => {
    const updatedItems = items.filter(i => i.name !== itemName);
    updateItems({ variables: { id: orderId, items: updatedItems } }).then(refetch);
  };

  const handleAddItem = (orderId, items) => {
    if (!newItemName || newItemQty <= 0 || newItemPrice <= 0) return alert("Fill valid item details");
    const updatedItems = [
      ...items,
      { name: newItemName, quantity: newItemQty, price: newItemPrice }
    ];
    updateItems({ variables: { id: orderId, items: updatedItems } }).then(() => {
      setNewItemName('');
      setNewItemQty(1);
      setNewItemPrice(0);
      refetch();
    });
  };

  return (
    <div className="admin-orders">
      <h2>Admin - Manage Orders</h2>
      {data?.orders.map(order => (
        <div key={order._id} className="order-box">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map(item => (
              <li key={item.name}>
                {item.name} x{item.quantity} (₹{item.price})
                <button onClick={() => handleRemoveItem(order._id, item.name, order.items)}>❌</button>
              </li>
            ))}
          </ul>

          <div className="item-form">
            <input
              placeholder="Item name"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              value={newItemQty}
              onChange={e => setNewItemQty(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItemPrice}
              onChange={e => setNewItemPrice(parseFloat(e.target.value))}
            />
            <button onClick={() => handleAddItem(order._id, order.items)}>Add Item</button>
          </div>

          <div className="actions">
            {order.status === 'Pending' && (
              <button onClick={() =>
                updateStatus({ variables: { id: order._id, status: 'Ready' } }).then(refetch)
              }>
                Mark as Ready
              </button>
            )}
            <button onClick={() => cancelOrder({ variables: { id: order._id } }).then(refetch)}>
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
