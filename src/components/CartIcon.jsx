import React from 'react';
import useCartStore from '../store/useCartStore';
import '../styles/cart.css';

export default function CartIcon({ onClick }) {
  const { cartItems } = useCartStore();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-icon" onClick={onClick}>
      🛒
      {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
    </div>
  );
}
