import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import axios from '../../api/api';

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/admin/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        {[
          { label: 'Total Users', value: stats.users },
          { label: 'Total Stores', value: stats.stores },
          { label: 'Total Ratings', value: stats.ratings },
        ].map(stat => (
          <Grid item xs={12} md={4} key={stat.label}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">{stat.label}</Typography>
              <Typography variant="h4">{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
