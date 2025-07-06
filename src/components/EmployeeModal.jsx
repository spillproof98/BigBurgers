import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_USER_ROLE } from '../graphql/queries';
import { loginEmployee } from '../firebase';
import useAuthStore from '../store/useAuthStore';

export default function EmployeeModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setRole, role } = useAuthStore();
  const navigate = useNavigate();

  const [fetchRole] = useLazyQuery(GET_USER_ROLE, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const actualRole = data.getUserRole;
      setRole(actualRole);

      // Redirect based on actual role
      if (actualRole === 'admin') navigate('/admin/users');
      else if (actualRole === 'employee') navigate('/employee');
      else navigate('/'); // fallback to home for customer
    },
    onError: (err) => {
      alert('Failed to fetch role: ' + err.message);
    }
  });

  const handleLogin = () => {
    loginEmployee(email, password)
      .then(res => {
        setUser(res.user);
        fetchRole({ variables: { email } });
      })
      .catch(err => alert('Login failed: ' + err.message));
  };

  return (
    <div className="modal">
      <div className="modal-body">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
