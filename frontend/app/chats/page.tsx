'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { withAuth } from '@/components/withAuth'
import { useRouter } from 'next/navigation'
import { useChatListHandlers } from '@/handlers/chatListHandlers'
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  CircularProgress,
  Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

function ChatsListPage() {
  const {
    chatSessions,
    loading,
    error,
    indexBuilding,
    loadChatSessions,
    handleCreateNewChat,
  } = useChatListHandlers();

  const router = useRouter();

  useEffect(() => {
    loadChatSessions();
  }, []);

  const onCreateNewChat = async () => {
    const newChatId = await handleCreateNewChat();
    if (newChatId) {
      router.push(`/chat/${newChatId}`);
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  }

  if (indexBuilding) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
        <Typography variant="h5" gutterBottom>Preparing Your Chats</Typography>
        <Typography variant="body1" paragraph>
          We are setting up some things to make your chat list load faster. This may take a few minutes.
        </Typography>
        <Typography variant="body1">
          Please try again in a moment.
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
        <Alert severity="error">
          <Typography variant="h5" gutterBottom>Error loading chats</Typography>
          <Typography variant="body1" paragraph>{error}</Typography>
          <Typography variant="body1">
            Please try refreshing the page. If the problem persists, contact support.
          </Typography>
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Your Recent Chats</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={onCreateNewChat}
        >
          Start New Chat
        </Button>
      </Box>
      
      {chatSessions.length === 0 ? (
        <Typography variant="body1">You have not had any chats yet. Start a new one!</Typography>
      ) : (
        <List>
          {chatSessions.map((session) => (
            <ListItem key={session.id} disablePadding>
              <Card sx={{ width: '100%', mb: 2 }}>
                <CardContent>
                  <Link href={`/chat/${session.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6" gutterBottom>{session.title}</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>{session.lastMessage}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {session.lastMessageTimestamp.toLocaleString()}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default withAuth(ChatsListPage)