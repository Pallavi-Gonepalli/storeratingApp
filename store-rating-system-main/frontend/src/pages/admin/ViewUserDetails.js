import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from '../../api/api';

export default function ViewUserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Details</Typography>
      <List>
        <ListItem><ListItemText primary="Name" secondary={user.name} /></ListItem>
        <ListItem><ListItemText primary="Email" secondary={user.email} /></ListItem>
        <ListItem><ListItemText primary="Role" secondary={user.role} /></ListItem>
        <ListItem><ListItemText primary="Address" secondary={user.address} /></ListItem>
        <ListItem><ListItemText primary="Total Ratings" secondary={user.ratings_count || 0} /></ListItem>
      </List>
    </Box>
  );
}
