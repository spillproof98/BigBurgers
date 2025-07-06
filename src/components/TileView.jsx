import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import { DELETE_PRODUCT } from '../graphql/mutations';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import ProductDetailModal from './ProductDetailModal';
import '../styles/burgerTiles.css';

const ITEMS_PER_PAGE = 5;

export default function TileView() {
  const { addToCart } = useCartStore();
  const { role } = useAuthStore();
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: ['products'],
  });
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items</p>;

  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedItems = data.products.slice(start, end);
  const totalPages = Math.ceil(data.products.length / ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteProduct({ variables: { id } });
      setSelectedItem(null);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <>
      <div className="tile-view-horizontal">
        {paginatedItems.map(item => (
          <div key={item._id} className="tile-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} />
            <div className="tile-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <button className="add-btn" onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}>ADD +</button>
              {role === 'admin' && (
                <button className="delete-btn" onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}>❌ Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>Prev</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page >= totalPages - 1}>Next</button>
      </div>

      <ProductDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={handleDelete}
        showDelete={role === 'admin'}
      />
    </>
  );
}
