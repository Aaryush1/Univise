// src/components/AdvisorPage/Sidebar.tsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

type SidebarProps = {
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  return (
    <Box
      sx={{
        width: '15%',
        height: '100vh',
        bgcolor: 'lightgrey',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <IconButton onClick={toggleSidebar} sx={{ alignSelf: 'flex-end', m: 1 }}>
        <MenuOpenIcon />
      </IconButton>
      {/* Additional sidebar content goes here */}
    </Box>
  );
};

export default Sidebar;