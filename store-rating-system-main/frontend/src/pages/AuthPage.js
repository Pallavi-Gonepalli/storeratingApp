import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Button, TextField, Typography, Stack, Alert
} from '@mui/material';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('logoutSuccess') === 'true') {
      setMsg('Logout successful!');
      localStorage.removeItem('logoutSuccess');
    }
  }, []);

  const toggle = () => {
    setIsRegister(!isRegister);
    setForm({ name: '', email: '', password: '', address: '' });
    setMsg('');
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isRegister) {
        // ✅ Add role only during registration
        const registerData = { ...form, role: 'Normal User' };
        await axios.post('/auth/register', registerData);
        setMsg('Registered! Please log in.');
        setIsRegister(false);
      } else {
        const res = await axios.post('/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('name', res.data.user.name);
        navigate('/dashboard');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <Modal open={true}>
      <Box sx={{ bgcolor: '#fff', p: 4, width: 400, mx: 'auto', mt: '10%', borderRadius: 2 }}>
        <Typography variant="h5" mb={2}>{isRegister ? 'Register' : 'Login'}</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {isRegister && (
              <>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
                <TextField label="Address" name="address" value={form.address} onChange={handleChange} />
              </>
            )}
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
            <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
            <Button variant="contained" type="submit">{isRegister ? 'Register' : 'Login'}</Button>
            <Button variant="text" onClick={toggle}>{isRegister ? 'Have an account? Login' : 'No account? Register'}</Button>
            {msg && <Alert severity="info">{msg}</Alert>}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
