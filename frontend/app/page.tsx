'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, Container, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { ChatSession, createNewChat, fetchRecentChatSessions, sendMessage } from '@/utils/firestoreUtils';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await fetchRecentChatSessions();
      setChatSessions(sessions);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChatId = await createNewChat();
      router.push(`/chat/${newChatId}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
      setError('Failed to create new chat');
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      const newChatId = await createNewChat();
      await sendMessage(newChatId, content);
      router.push(`/chat/${newChatId}`);
    } catch (error) {
      console.error('Error creating new chat and sending message:', error);
      setError('Failed to create new chat and send message');
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: 300, 
        breakpoint: 'sm', 
        collapsed: { desktop: !opened, mobile: !opened } 
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} onToggleNavbar={toggle} onNewChat={handleNewChat} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar/>
      </AppShell.Navbar>

      <AppShell.Main>
        <Text size="md" mb="xl">Start a new conversation by typing a message below.</Text>
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Container size="md" px="xs">
          <OChatInput onSendMessage={handleSendMessage} />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}