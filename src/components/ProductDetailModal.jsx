import React from 'react';
import '../styles/modal.css';

export default function ProductDetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.name} />
        <p><strong>Price:</strong> ₹{item.price}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
