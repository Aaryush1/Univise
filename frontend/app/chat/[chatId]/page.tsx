'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Paper, TextInput, Button, Group, Stack, ScrollArea } from '@mantine/core';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navagation';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useAuth();
  const params = useParams();
  const chatId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && chatId) {
      // Fetch chat messages
      fetchChatMessages(chatId);
    }
  }, [user, chatId]);

  const fetchChatMessages = async (chatId: string) => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/chat/${chatId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      setError('Failed to load chat messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const tempMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/chat/${chatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prev) => [...prev.slice(0, -1), data.userMessage, data.botResponse]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  if (!user) {
    return <Text>Please log in to access this page.</Text>;
  }

  if (loading) {
    return <Text>Loading chat...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Container>
      <Navigation />
      <Title order={2} mb="md">Chat Session</Title>
      <Paper shadow="xs" p="md" style={{ height: 'calc(100vh - 200px)' }}>
        <Stack h="100%">
          <ScrollArea h="calc(100% - 60px)" offsetScrollbars>
            {messages.map((message) => (
              <Group key={message.id}>
                <Paper p="xs" style={{ backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5' }}>
                  <Text>{message.content}</Text>
                  <Text size="xs" color="dimmed">{message.timestamp.toLocaleString()}</Text>
                </Paper>
              </Group>
            ))}
          </ScrollArea>
          <Group>
            <TextInput
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}