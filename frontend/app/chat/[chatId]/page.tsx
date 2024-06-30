'use client';

import React from 'react';
import { Container, Title, Paper, Stack, ScrollArea, Text, Loader, Button } from '@mantine/core';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navagation';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { useChatSessionHandlers } from '@/handlers/chatSessionHandlers';
import { useChatRouting } from '@/hooks/useChatRouting';

export default function ChatPage() {
  const { user } = useAuth();
  const { chatId, navigateToChatList } = useChatRouting();

  const {
    messages,
    title,
    loading,
    error,
    handleSendMessage,
    handleTitleChange,
  } = useChatSessionHandlers(chatId);

  console.log("ChatPage render", { loading, error, messagesCount: messages.length });

  if (!user) {
    return <Text>Please log in to access this page.</Text>;
  }

  if (!chatId) {
    return (
      <Container>
        <Text>Invalid chat session. Please select a chat from the list.</Text>
        <Button onClick={navigateToChatList}>Go to Chat List</Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
        <Text ml="md">Loading chat...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Navigation />
        <Text color="red">{error}</Text>
        <Button onClick={navigateToChatList}>Go to Chat List</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Navigation />
      <Title order={2} mb="md">{title}</Title>
      <Paper shadow="xs" p="md" style={{ height: 'calc(100vh - 200px)' }}>
        <Stack h="100%">
          <ScrollArea h="calc(100% - 60px)" offsetScrollbars>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                timestamp={message.timestamp.toLocaleString()}
                isUser={message.sender === 'user'}
              />
            ))}
          </ScrollArea>
          <ChatInput onSendMessage={handleSendMessage} />
        </Stack>
      </Paper>
    </Container>
  );
}