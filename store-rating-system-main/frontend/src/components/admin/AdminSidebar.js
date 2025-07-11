// src/components/admin/AdminSidebar.js

import React from 'react';
import { Drawer, Toolbar, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const navItems = [
  { text: 'Dashboard Home', path: '/dashboard/admin' },
  { text: 'Add Store', path: '/dashboard/admin/add-store' },
  { text: 'Add User/Admin', path: '/dashboard/admin/add-user' },
  { text: 'List Stores', path: '/dashboard/admin/list-stores' },
  { text: 'List Users', path: '/dashboard/admin/list-users' },
];

export default function AdminSidebar({ drawerWidth }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
