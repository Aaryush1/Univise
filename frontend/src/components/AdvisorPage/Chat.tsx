// src/components/AdvisorPage/Chat.tsx
import { Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';

const Chat: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // pushes header and footer to the ends of the container
        height: '100%', // takes full height available
      }}
    >
      <Box sx={{ padding: 2 }}>
        {/* Title */}
        <Typography 
          variant="h3" // Makes the title text larger
          component="h1" 
          gutterBottom 
          sx={{ textAlign: 'center' }} // Centers the title text
        >
          Univise - 0.1
        </Typography>
        {/* Subtitle */}
        <Typography 
          variant="subtitle1" 
          gutterBottom 
          sx={{ textAlign: 'center' }} // Centers the subtitle text
        >
          Ask anything about classes, enrollment, advising...
        </Typography>
      </Box>

      {/* Placeholder for chat messages goes here */}
      <Box component="span" sx={{ flexGrow: 1 }} />
      
      {/* Input area */}
      <Box sx={{ padding: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          sx={{ borderRadius: 25, mb: 1 }} // make input oval-shaped
        />
        <Button variant="contained" sx={{ borderRadius: 25 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
