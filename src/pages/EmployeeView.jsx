import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ORDERS } from '../graphql/queries';
import { UPDATE_ORDER_STATUS } from '../graphql/mutations';
import useAuthStore from '../store/useAuthStore';
import '../styles/admin.css';

export default function EmployeeView() {
  const { role } = useAuthStore();
  const { data, refetch } = useQuery(GET_ALL_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleStatusUpdate = async (id) => {
    await updateStatus({ variables: { id, status: 'Ready' } });
    refetch();
  };

  return (
    <div className="employee-view">
      <h2>{role === 'admin' ? 'Admin - Manage Orders' : 'Employee - Orders'}</h2>
      {data?.orders.map(order => (
        <div key={order._id} className="order-box">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity} - ₹{item.price}</li>
            ))}
          </ul>

          {role === 'employee' && order.status === 'Pending' && (
            <button onClick={() => handleStatusUpdate(order._id)}>Mark Ready</button>
          )}

          {/* Admin future logic for modify/delete items here */}
          {role === 'admin' && (
            <p style={{ color: 'gray' }}>Edit UI for admin goes here (Add/Remove Item)</p>
          )}
        </div>
      ))}
    </div>
  );
}
