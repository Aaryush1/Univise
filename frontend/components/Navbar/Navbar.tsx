import React, { useEffect } from 'react';
import { ScrollArea, Text, Box, Loader } from '@mantine/core';
import { useChatListHandlers } from '@/handlers/chatListHandlers';
import { ChatHistory } from '../ChatHistory';

export function Navbar() {
  const { chatSessions, loading, error, indexBuilding, loadChatSessions } = useChatListHandlers();

  useEffect(() => {
    loadChatSessions();
  }, [loadChatSessions]);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Text size="xl" fw={700}>Chat History</Text>
      </Box>
      <ScrollArea style={{ flex: 1 }}>
        <Box p="md">
          {indexBuilding ? (
            <Text>Building index, please wait...</Text>
          ) : (
            <ChatHistory 
              chatSessions={chatSessions} 
              loading={loading} 
              error={error} 
            />
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}