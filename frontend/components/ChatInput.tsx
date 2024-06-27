"use client"

import React, { useState } from 'react';
import { TextField, IconButton, Box, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ 
          mr: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
          }
        }}
      />
      <IconButton 
        type="submit" 
        color="primary" 
        aria-label="send message"
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          }
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};