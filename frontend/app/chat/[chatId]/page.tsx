'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell, Container, Text, Box, TextInput, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useChatSessionHandlers } from '@/handlers/chatSessionHandlers';
import { OChatInput } from '@/components/ChatInput/OChatInput';
import { MessageList } from '@/components/MessageList';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar/Navbar';
import { IconEdit, IconCheck } from '@tabler/icons-react';

export default function ChatPage() {
  const [opened, { toggle }] = useDisclosure();
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId as string;

  const {
    messages,
    title,
    loading,
    error,
    handleSendMessage,
    handleTitleChange,
    loadChat,
  } = useChatSessionHandlers(chatId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (chatId) {
      loadChat();
    }
  }, [chatId, loadChat]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleNewChat = () => {
    router.push('/');
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    handleTitleChange(newTitle);
    setIsEditingTitle(false);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;

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
          {isEditingTitle ? (
            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--mantine-spacing-md)' }}>
              <TextInput
                value={newTitle}
                onChange={(event) => setNewTitle(event.currentTarget.value)}
                style={{ flexGrow: 1, marginRight: 'var(--mantine-spacing-xs)' }}
              />
              <ActionIcon onClick={handleSaveTitle} variant="filled" color="blue">
                <IconCheck size="1.125rem" />
              </ActionIcon>
            </Box>
          ) : (
            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--mantine-spacing-md)' }}>
              <Text size="xl" fw={700} style={{ flexGrow: 1 }}>{title}</Text>
              <ActionIcon onClick={handleEditTitle} variant="subtle">
                <IconEdit size="1.125rem" />
              </ActionIcon>
            </Box>
          )}
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