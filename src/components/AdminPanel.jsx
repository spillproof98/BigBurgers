// src/components/AdminPanel.jsx
import React, { useState } from 'react';
import UploadForm from './UploadForm';
import '../styles/admin.css';

export default function AdminPanel() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <button onClick={() => setShowUpload(!showUpload)}>
        {showUpload ? 'Hide Upload Form' : 'Add Menu Item'}
      </button>

      {/* Optional: Add buttons for managing employees/orders later */}
      {/* <button>Add Employee</button>
      <button>Remove Employee</button>
      <button>Manage Orders</button> */}

      {showUpload && <UploadForm />}
    </div>
  );
}
