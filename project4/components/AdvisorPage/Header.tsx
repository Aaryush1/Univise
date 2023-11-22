// components/AdvisorPage/Header.tsx
import { Box, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import React from 'react';

const Header: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '15vh',
      backgroundColor: 'white',
      px: 2,
      boxSizing: 'border-box',
    }}>
      <IconButton sx={{ color: 'red' }}>
        <HomeIcon /> {/* Home icon colored red */}
      </IconButton>

      <Typography variant="h4">
        Univise-0.1.0
      </Typography>

      <Button variant="outlined" sx={{
        borderRadius: 50, // Oval shape
        color: 'red', // Red text
        borderColor: 'red', // Red outline
      }}>
        Capabilities
      </Button>
    </Box>
  );
};

export default Header;
