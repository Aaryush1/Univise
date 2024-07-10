"use client"

import { useState } from 'react';
import { AppShell, Box, Text } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { MessageBubble } from '@/components/MessageBubble';

interface Message {
  content: string;
  isUserMessage: boolean;
}

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { content, isUserMessage: true },
    ]);

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: 'This is an AI response.', isUserMessage: false },
      ]);
    }, 500);
  };

  const handleNewChat = () => {
    // Clear messages to start a new conversation
    setMessages([]);
  };

  const navbarWidth = '300px';

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header onToggleNavbar={toggleNavbar} onNewChat={handleNewChat} />
      </AppShell.Header>

      <Navbar
        isVisible={isNavbarVisible}
        onClose={() => setIsNavbarVisible(false)}
      />

<AppShell.Main style={{ display: 'flex', flexDirection: 'column' }}>
  <Box
    style={{
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'padding-left 300ms ease',
      paddingLeft: isNavbarVisible ? navbarWidth : '0',
      overflowY: 'auto',
    }}
  >
    <Box
      style={{
        width: '100%',
        maxWidth: '800px',
        paddingBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          content={message.content}
          isUserMessage={message.isUserMessage}
        />
      ))}
    </Box>
  </Box>

  <Box
    style={{
      position: 'sticky',
      bottom: 20,
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      transition: 'transform 300ms ease',
      transform: isNavbarVisible
        ? `translateX(calc(${navbarWidth} / 2))`
        : 'none',
    }}
  >
    <OChatInput
      isNavbarVisible={isNavbarVisible}
      navbarWidth={navbarWidth}
      onSendMessage={handleSendMessage}
    />
  </Box>
</AppShell.Main>
    </AppShell>
  );
}