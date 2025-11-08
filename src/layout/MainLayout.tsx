// src/layout/MainLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

const MainLayout: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" component={Link} to="/features">Features</Button>
        </Toolbar>
      </AppBar>

      {/* 🧩 This renders the active child route */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
