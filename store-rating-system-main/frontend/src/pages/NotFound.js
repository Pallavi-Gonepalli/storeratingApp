import React from 'react';
import { Typography, Box } from '@mui/material';

export default function NotFound() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
    </Box>
  );
}
