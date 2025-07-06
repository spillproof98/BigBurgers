// src/components/ProfileInfo.jsx
import React from 'react';
import useAuthStore from '../store/useAuthStore';
import '../styles/theme.css';

export default function ProfileInfo() {
  const { user, role } = useAuthStore();

  return (
    <div className="profile-info">
      {user && (
        <span>
          👤 {user.displayName || user.email || 'Phone User'} ({role})
        </span>
      )}
    </div>
  );
}
