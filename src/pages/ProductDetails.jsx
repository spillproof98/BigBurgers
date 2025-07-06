import React from 'react';
import { useParams } from 'react-router-dom';
import useViewStore from '../store/useViewStore';
import useCartStore from '../store/useCartStore';

export default function ProductDetails() {
  const { id } = useParams();
  const { items } = useViewStore();
  const { addToCart } = useCartStore();

  const item = items.find(i => i._id === id);

  if (!item) return <p>Product not found.</p>;

  return (
    <div className="product-detail">
      <img src={item.image} alt={item.name} />
      <h2>{item.name}</h2>
      <p>₹{item.price}</p>
      <p>Category: {item.category}</p>
      <button onClick={() => addToCart(item)}>ADD TO CART</button>
    </div>
  );
}
