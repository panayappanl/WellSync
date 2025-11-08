import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layout/MainLayout';
import Profile from './pages/dashboard/Profile';
import Users from './pages/dashboard/Users';


const App: React.FC = () => {
  return (
    <>
      <Container>
        <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>

            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            
          </Route>
        </Routes>
          </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
