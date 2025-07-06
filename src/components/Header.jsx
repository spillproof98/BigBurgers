import React, { useEffect } from 'react';
import '../styles/theme.css';
import logo from '../assets/logo.png';
import useAuthStore from '../store/useAuthStore';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function Header({ onLoginClick = () => {} }) {
  const { user, role, setUser, setRole } = useAuthStore();

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole && !role) {
      setRole(savedRole); // Restore role from localStorage
    }
  }, [role, setRole]);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setRole(null);
    localStorage.clear(); // Clear stored user info
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <img src={logo} alt="BigBurger Logo" className="header-logo" />
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="user-welcome">
              👤 {user.email || user.phoneNumber} ({role})
            </span>

            {/* ✅ Orders Link */}
            <Link className="nav-link" to="/orders">Orders</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
