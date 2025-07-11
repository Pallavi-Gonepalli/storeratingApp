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
  Button
} from '@mui/material';
import axios from '../../api/api'; // baseURL = http://localhost:5000/api
import { useNavigate } from 'react-router-dom';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('🚀 Sending request to /users/all_users with filter:', filter);

      try {
        const res = await axios.get('/users/all_users', {
          params: { name: filter }
        });

        console.log('✅ Response received:', res.data);
        setUsers(res.data);
      } catch (err) {
        console.error('❌ Error fetching users:', err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, [filter]); // Re-fetch when filter changes

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        List Users/Admins
      </Typography>

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
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  console.log(`➡️ Navigate to user ID: ${user.id}`);
                  navigate(`/users/all_users/${user.id}`);
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
