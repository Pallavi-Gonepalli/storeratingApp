import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    // Add logout flag
    localStorage.setItem('logoutSuccess', 'true');

    // Redirect to login
    navigate('/');
  }, [navigate]);

  return null;
}
