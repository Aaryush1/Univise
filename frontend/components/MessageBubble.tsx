"use client"

import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';

interface MessageBubbleProps {
  message: string;
  isUser?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser = false }) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={1}
      sx={{
        p: 2,
        maxWidth: '70%',
        mb: 2,
        borderRadius: '20px',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        bgcolor: isUser ? theme.palette.primary.light : theme.palette.background.paper,
        color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Paper>
  );
};