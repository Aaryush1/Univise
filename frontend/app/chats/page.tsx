// app/chats/page.tsx
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useChatListHandlers } from '@/handlers/chatListHandlers'
import { 
  Box, 
  Title, 
  Button, 
  Card, 
  Text, 
  List, 
  Group,
  Loader,
  Alert,
  Container
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navagation'

export default function ChatsListPage() {
  const {
    chatSessions,
    loading,
    error,
    indexBuilding,
    loadChatSessions,
    handleCreateNewChat,
  } = useChatListHandlers();

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadChatSessions();
    }
  }, [user, loadChatSessions]);

  const onCreateNewChat = async () => {
    const newChatId = await handleCreateNewChat();
    if (newChatId) {
      router.push(`/chat/${newChatId}`);
    }
  };

  if (!user) {
    return (
      <Container>
        <Navigation />
        <Text>Please log in to view your chats.</Text>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </Container>
    );
  }

  if (indexBuilding) {
    return (
      <Container size="sm">
        <Navigation />
        <Title order={2} mb="md">Preparing Your Chats</Title>
        <Text mb="md">
          We are setting up some things to make your chat list load faster. This may take a few minutes.
        </Text>
        <Text>
          Please try again in a moment.
        </Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="sm">
        <Navigation />
        <Alert title="Error loading chats" color="red">
          <Text mb="md">{error}</Text>
          <Text>
            Please try refreshing the page. If the problem persists, contact support.
          </Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="md">
      <Navigation />
      <Group mb="md">
        <Title order={2}>Your Recent Chats</Title>
        <Button 
          leftSection={<IconPlus size={14} />}
          onClick={onCreateNewChat}
        >
          Start New Chat
        </Button>
      </Group>
      
      {chatSessions.length === 0 ? (
        <Text>You have not had any chats yet. Start a new one!</Text>
      ) : (
        <List spacing="md" style={{ listStyleType: 'none' }}>
          {chatSessions.map((session) => (
            <List.Item key={session.id}>
              <Card 
                shadow="sm" 
                p="lg" 
                radius="md" 
                withBorder 
                onClick={() => router.push(`/chat/${session.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Title order={4} mb="xs">{session.title}</Title>
                <Text color="dimmed" size="sm" mb="xs">{session.lastMessage}</Text>
                <Text size="xs" color="dimmed">
                  Last updated: {session.lastMessageTimestamp.toLocaleString()}
                </Text>
              </Card>
            </List.Item>
          ))}
        </List>
      )}
    </Container>
  );
}