'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, Container, Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { useChatListHandlers } from '@/handlers/chatListHandlers';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const { handleCreateNewChat, loadChatSessions } = useChatListHandlers();

  useEffect(() => {
    loadChatSessions();
  }, [loadChatSessions]);

  const handleNewChat = async () => {
    const newChatId = await handleCreateNewChat();
    if (newChatId) {
      router.push(`/chat/${newChatId}`);
    }
  };

  const handleSendMessage = async (content: string) => {
    const newChatId = await handleCreateNewChat(content);
    if (newChatId) {
      router.push(`/chat/${newChatId}`);
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
      styles={{
        main: {
          transition: 'padding-left 300ms ease, margin-left 300ms ease',
        },
        navbar: {
          transition: 'width 300ms ease, min-width 300ms ease, transform 300ms ease',
        },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} onToggleNavbar={toggle} onNewChat={handleNewChat} />
      </AppShell.Header>

      <AppShell.Navbar 
        p="md" 
        style={{
          transition: 'width 300ms ease, min-width 300ms ease, transform 300ms ease',
        }}
      >
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main 
        style={{ 
          transition: 'padding-left 300ms ease, margin-left 300ms ease',
          paddingBottom: 'calc(60px + var(--mantine-spacing-md))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="md" mb="xl">Start a new conversation by typing a message below.</Text>
      </AppShell.Main>

      <AppShell.Footer 
        p="md" 
        style={{
          transition: 'padding-left 300ms ease',
          paddingLeft: opened ? 'calc(300px + var(--mantine-spacing-md))' : 'var(--mantine-spacing-md)',
        }}
      >
        <Container size="md" px="xs">
          <OChatInput onSendMessage={handleSendMessage} />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}