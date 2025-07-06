import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, REMOVE_USER } from '../graphql/mutations';

export default function AdminUsers() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [removeEmail, setRemoveEmail] = useState('');

  const [addUser] = useMutation(ADD_USER);
  const [removeUser] = useMutation(REMOVE_USER);

  return (
    <div className="admin-users">
      <h2>Admin - Manage Users</h2>
      <form onSubmit={e => {
        e.preventDefault();
        addUser({ variables: { email, role } });
      }}>
        <input type="email" placeholder="Add email" value={email} onChange={e => setEmail(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={e => {
        e.preventDefault();
        removeUser({ variables: { email: removeEmail } });
      }}>
        <input type="email" placeholder="Remove email" value={removeEmail} onChange={e => setRemoveEmail(e.target.value)} required />
        <button type="submit">Remove User</button>
      </form>
    </div>
  );
}
