import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PRODUCT } from '../graphql/mutations';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import '../styles/admin.css';

export default function UploadForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
  });

  const [uploadProduct] = useMutation(UPLOAD_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.image) return alert('Please upload an image');
    if (form.image.size > 10 * 1024 * 1024) {
      return alert('Image size should be below 10MB');
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await uploadProduct({
          variables: {
            name: form.name,
            price: parseFloat(form.price),
            category: form.category,
            image: reader.result,
          },
        });
        alert('Uploaded!');
        setForm({ name: '', price: '', category: '', image: null });
      } catch (err) {
        alert('Upload failed');
        console.error(err);
      }
    };
    reader.readAsDataURL(form.image);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
        required
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setForm({ ...form, image: e.target.files[0] })}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}
