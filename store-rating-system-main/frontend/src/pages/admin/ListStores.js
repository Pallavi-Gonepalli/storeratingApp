import React, { useEffect, useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button // ✅ ADD THIS
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';


export default function ListStores() {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate(); // ✅ FIX: initialize navigate

  useEffect(() => {
    const fetchStores = async () => {
      const res = await axios.get('/admin/all_stores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStores(res.data);
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>List Stores</Typography>
      <TextField
        label="Search by Name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Owner Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStores.map(store => (
            <TableRow key={store.id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.email}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.owner_name}</TableCell>
              <TableCell>{store.owner_email}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  console.log(`➡️ Navigate to store ID: ${store.id}`);
                  navigate(`/store/${store.id}`);
                }}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
