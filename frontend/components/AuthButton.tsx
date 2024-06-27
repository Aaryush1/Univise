import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import { signOut, auth } from '@/services/firebase';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function AuthButton(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const [user, setUser] = useState(auth.currentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleClose();
  };

  if (user) {
    return (
      <>
        <Button
          onClick={handleMenu}
          color="inherit"
          startIcon={
            user.photoURL ? (
              <Avatar src={user.photoURL} sx={{ width: 24, height: 24 }} />
            ) : (
              <AccountCircleIcon />
            )
          }
        >
          {user.displayName || user.email}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { router.push('/profile'); handleClose(); }}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <Button 
      color="inherit" 
      onClick={handleLogin}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      Login
    </Button>
  );
}