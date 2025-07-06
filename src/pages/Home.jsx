import React, { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import TileView from '../components/TileView';
import Footer from '../components/Footer';
import CartIcon from '../components/CartIcon';
import CartDrawer from '../components/CartDrawer';
import LoginModal from '../components/LoginModal';
import EmployeeModal from '../components/EmployeeModal';
import ProfileInfo from '../components/ProfileInfo';
import AdminPanel from '../components/AdminPanel';
import useAuthStore from '../store/useAuthStore';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showEmpLogin, setShowEmpLogin] = useState(false);
  const { role } = useAuthStore();

  const isCustomer = role === 'customer' || !role;

  return (
    <>
      <Header onLoginClick={() => setShowLogin(true)} />
      <ProfileInfo />
      <Banner />

      {/* Admin features */}
      {role === 'admin' && <AdminPanel />}

      {/* Menu Items */}
      <TileView />

      {/* Cart only for customer */}
      {isCustomer && (
        <>
          <CartIcon onClick={() => setCartOpen(true)} />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
      )}

      <Footer />

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showEmpLogin && <EmployeeModal onClose={() => setShowEmpLogin(false)} />}
    </>
  );
}
