import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Stack, MenuItem } from '@mui/material';
import axios from '../../api/api';

export default function AddUser() {
  const [user, setUser] = useState({ name: '', email: '', password: '', address: '', role: '' });
  const [msg, setMsg] = useState('');

  // You might store this when you login!
  const currentUserRole = localStorage.getItem('role'); // E.g., "System Administrator"

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // If adding a Store Owner, include added_by_role
    const payload = {
      ...user,
      ...(user.role === 'Store Owner' ? { added_by_role: currentUserRole } : {})
    };
    

    console.log('Form data being sent:', payload);

    try {
      const response = await axios.post('/users/add_user', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
      console.log('Response from server:', response.data);

      setMsg('User/Admin added successfully!');
      setUser({ name: '', email: '', password: '', address: '', role: '' });
    } catch (err) {
      console.error(err.response?.data || err);
      setMsg(err.response?.data?.error || 'Error adding user.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Add New User/Admin</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField label="Name" name="name" value={user.name} onChange={handleChange} required />
          <TextField label="Email" name="email" value={user.email} onChange={handleChange} required />
          <TextField label="Password" type="password" name="password" value={user.password} onChange={handleChange} required />
          <TextField label="Address" name="address" value={user.address} onChange={handleChange} />
          <TextField
            select
            label="Role"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <MenuItem value="Normal User">Normal User</MenuItem>
            <MenuItem value="System Administrator">System Administrator</MenuItem>
            <MenuItem value="Store Owner">Store Owner</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">Add User</Button>
          {msg && <Alert severity={msg.includes('success') ? 'success' : 'error'}>{msg}</Alert>}
        </Stack>
      </form>
    </Box>
  );
}
