// src/pages/CartPage.jsx
import React, { useState } from 'react';
import useCartStore from '../store/useCartStore';
import '../styles/cart.css';

export default function CartPage() {
  const { cartItems, increment, decrement } = useCartStore();
  const [address, setAddress] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!address) return alert('Enter address');
    alert(`Order placed to: ${address} (COD: ₹${total})`);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item._id} className="cart-list-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => decrement(item)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-box">
            <textarea
              placeholder="Enter billing address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={3}
            />
            <p>Total: ₹{total}</p>
            <button onClick={handleCheckout}>Place COD Order</button>
          </div>
        </>
      )}
    </div>
  );
}
