// components/Navbar/Navbar.tsx

import React, { useEffect, useState } from 'react';
import { ScrollArea, Text, Box } from '@mantine/core';
import { ChatHistory } from '../ChatHistory';
import { ChatSession, deleteChat, fetchRecentChatSessions, updateChatTitle } from '@/utils/firestoreUtils';

export function Navbar() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [indexBuilding, setIndexBuilding] = useState(false);

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
      if (error instanceof Error && error.message.includes('failed-precondition')) {
        setIndexBuilding(true);
      } else {
        setError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditTitle = async (id: string, newTitle: string) => {
    try {
      await updateChatTitle(id, newTitle);
      setChatSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === id ? { ...session, title: newTitle } : session
        )
      );
    } catch (error) {
      console.error('Error updating chat title:', error);
      setError('Failed to update chat title');
    }
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await deleteChat(id);
      setChatSessions(prevSessions => 
        prevSessions.filter(session => session.id !== id)
      );
    } catch (error) {
      console.error('Error deleting chat:', error);
      setError('Failed to delete chat');
    }
  };

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
              onEditTitle={handleEditTitle}
              onDeleteChat={handleDeleteChat}
            />
          )}
        </Box>
      </ScrollArea>
    </Box>
  );
}