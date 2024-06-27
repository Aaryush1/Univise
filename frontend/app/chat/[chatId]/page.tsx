'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { withAuth } from '@/components/withAuth'
import { useChatSessionHandlers } from '@/handlers/chatSessionHandlers'
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

function ChatSessionPage({ params }: { params: { chatId: string } }) {
  const {
    messages,
    title,
    loading,
    error,
    loadChat,
    handleSendMessage,
    handleTitleChange,
  } = useChatSessionHandlers(params.chatId);

  const [newMessage, setNewMessage] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  useEffect(() => {
    loadChat();
  }, [params.chatId]);

  const onSendMessage = async () => {
    const success = await handleSendMessage(newMessage);
    if (success) {
      setNewMessage('');
    }
  };

  const onTitleChange = async () => {
    const success = await handleTitleChange(editedTitle);
    if (success) {
      setIsEditingTitle(false);
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        {isEditingTitle ? (
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Enter chat title"
              variant="outlined"
              size="small"
            />
            <IconButton onClick={onTitleChange} color="primary">
              <SaveIcon />
            </IconButton>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{title}</Typography>
            <IconButton onClick={() => setIsEditingTitle(true)} color="primary">
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
      
      <Paper elevation={3} sx={{ height: 400, overflow: 'auto', mb: 2, p: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="subtitle2">{message.sender}</Typography>}
                secondary={message.content}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      
      <Box display="flex">
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          size="small"
        />
        <IconButton onClick={onSendMessage} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default withAuth(ChatSessionPage)