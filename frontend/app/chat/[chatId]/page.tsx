'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell, Container, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { MessageList } from '@/components/MessageList';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar/Navbar';
import { initializeChat, Message, sendMessage } from '@/utils/firestoreUtils';

export default function ChatPage() {
  const [opened, { toggle }] = useDisclosure();
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chatId) {
      loadChat();
    }
  }, [chatId]);

  const loadChat = async () => {
    if (!chatId) {
      setLoading(false);
      setError("Invalid chat session");
      return;
    }
    try {
      setLoading(true);
      const { messages } = await initializeChat(chatId);
      if (messages.length === 0) {
        // Chat not found or deleted
        throw new Error("Chat not found");
      }
      setMessages(messages);
    } catch (error) {
      console.error("Error initializing chat:", error);
      setError(error instanceof Error ? error.message : "An error occurred while loading the chat");
      // Redirect to home page after a short delay
      setTimeout(() => router.push('/'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (newMessage: string) => {
    if (!newMessage.trim() || !chatId) return;

    try {
      const updatedMessages = await sendMessage(chatId, newMessage);
      if (updatedMessages) {
        setMessages(updatedMessages);
        return true;
      } else {
        throw new Error("Failed to update messages");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      setError(error instanceof Error ? error.message : "An error occurred while sending the message");
      return false;
    }
  };

  const handleNewChat = () => {
    router.push('/');
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}. Redirecting to home page...</Text>;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: 300, 
        breakpoint: 'sm', 
        collapsed: { desktop: !opened, mobile: !opened } 
      }}
      padding="xl"
    >
      <AppShell.Header>
        <Header opened={opened} onToggleNavbar={toggle} onNewChat={handleNewChat} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="md" px="xs">
          <MessageList messages={messages} />
        </Container>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Container size="md" px="xs">
          <OChatInput onSendMessage={handleSendMessage} />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}