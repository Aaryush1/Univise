// src/pages/AdvisorPage.tsx
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Sidebar from '../components/AdvisorPage/Sidebar';
import Chat from '../components/AdvisorPage/Chat'; // Import the Chat component
import Footer from '../components/shared/Footer';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon for the toggle button

const AdvisorPage: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {sidebarVisible && <Sidebar toggleSidebar={() => setSidebarVisible(false)} />}
        <Box sx={{ flexGrow: 1 }}>
          {!sidebarVisible && (
            <IconButton
              onClick={() => setSidebarVisible(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1201 // Ensure it's above other content
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Chat />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdvisorPage;
