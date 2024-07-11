"use client"

import { useState } from 'react';
import { AppShell, Box, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { MessageList } from '@/components/MessageList';

interface Message {
  content: string;
  isUserMessage: boolean;
}

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content, isUserMessage: true },
    ]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'This is an AI response.', isUserMessage: false },
      ]);
    }, 500);
  };

  const handleNewChat = () => {
    setMessages([]);
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
          paddingBottom: 'calc(60px + var(--mantine-spacing-md))'
        }}
      >
        <Container size="md" px="xs">
          <MessageList messages={messages} />
        </Container>
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