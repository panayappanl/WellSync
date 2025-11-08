// src/layout/MainLayout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <AppBar position="static">
                <Toolbar>                  
                    <Box>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/profile"
                            sx={{
                                flexGrow: 0.5,
                                borderBottom:
                                    location.pathname === '/profile' ? '2px solid #fff' : 'none',
                            }}
                        >
                            Profile
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/users"
                            sx={{
                                borderBottom:
                                    location.pathname === '/users' ? '2px solid #fff' : 'none',
                            }}
                        >
                            User List
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Active route content */}
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default MainLayout;
