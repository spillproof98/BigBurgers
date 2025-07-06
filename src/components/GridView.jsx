import React from 'react';
import useViewStore from '../store/useViewStore';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../graphql/mutations';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import '../styles/burgerTiles.css';

export default function GridView() {
  const { items } = useViewStore();
  const { addToCart } = useCartStore();
  const role = useAuthStore(state => state.role);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }]
  });

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteProduct({ variables: { id } });
    }
  };
  console.log("ROLE:", role);


  return (
    <div className="grid-container">
      {items.map(item => (
        <div key={item._id} className="grid-card">
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <button className="add-btn" onClick={() => addToCart(item)}>ADD +</button>

          {role?.toLowerCase() === 'admin' && (
            <button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
