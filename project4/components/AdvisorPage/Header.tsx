// components/AdvisorPage/Header.tsx
import { Box, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Home icon
import React from 'react';

type HeaderProps = {
  onOpenCapabilities: () => void;
};

const Header: React.FC<HeaderProps> = ({ onOpenCapabilities }) => {
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

      <Button 
        variant="outlined" 
        sx={{
          borderRadius: 50, 
          color: 'red', 
          borderColor: 'red', 
        }}
        onClick={onOpenCapabilities} // Use the prop function for onClick
      >
        Capabilities
      </Button>
    </Box>
  );
};

export default Header;
