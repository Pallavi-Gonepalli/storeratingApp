// src/pages/AdminDashboard.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'System Administrator') {
      navigate('/dashboard/admin');
    } else if (role === 'Normal User') {
      navigate('/dashboard/user');
    } else if (role === 'Store Owner') {
      navigate('/dashboard/owner');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null; // no UI needed
}
