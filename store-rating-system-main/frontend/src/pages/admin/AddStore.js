import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from '../../api/api';

export default function AddStore() {
  const [store, setStore] = useState({
    name: '',
    email: '',
    address: '',
    owner_id: ''
  });

  const [owners, setOwners] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    console.log('➡️ [AddStore] useEffect: Fetching store owners...');
    const fetchOwners = async () => {
      try {
        const res = await axios.get('/admin/store-owners', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('✅ [AddStore] Store owners fetched:', res.data);
        setOwners(res.data);
      } catch (err) {
        console.error('❌ [AddStore] Error fetching store owners:', err);
      }
    };

    fetchOwners();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(`✏️ [AddStore] Input changed: ${name} = ${value}`);
    setStore(prev => ({
      ...prev,
      [name]: name === 'owner_id' ? Number(value) : value
    }));
    console.log('🔍 [AddStore] Updated store state:', {
      ...store,
      [name]: name === 'owner_id' ? Number(value) : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('🚀 [AddStore] Submitting store:', store);
    try {
      const res = await axios.post('/admin/stores', store, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('✅ [AddStore] Store added successfully:', res.data);
      setMsg('Store added successfully!');
      setStore({ name: '', email: '', address: '', owner_id: '' });
    } catch (err) {
      console.error('❌ [AddStore] Error adding store:', err);
      setMsg('Error adding store.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add New Store
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="Store Name"
            name="name"
            value={store.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={store.email}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            value={store.address}
            onChange={handleChange}
          />
          <FormControl fullWidth required>
            <InputLabel id="owner-label">Store Owner</InputLabel>
            <Select
              labelId="owner-label"
              label="Store Owner"
              name="owner_id"
              value={store.owner_id}
              onChange={handleChange}
            >
              {owners.map(owner => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Add Store
          </Button>
          {msg && <Alert severity="info">{msg}</Alert>}
        </Stack>
      </form>
    </Box>
  );
}
