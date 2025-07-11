// src/components/admin/AdminLayout.js

import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminTopbar drawerWidth={drawerWidth} />
      <AdminSidebar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
