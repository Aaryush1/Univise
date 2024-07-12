import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, Loader } from '@mantine/core';
import { ChatSession } from '@/utils/firestoreUtils';

interface ChatHistoryProps {
  chatSessions: ChatSession[];
  loading: boolean;
  error: string | null;
}

export function ChatHistory({ chatSessions, loading, error }: ChatHistoryProps) {
  const router = useRouter();

  if (loading) return <Loader />;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Box>
      {chatSessions.map((session) => (
        <Box
          key={session.id}
          p="sm"
          mb="xs"
          style={{ cursor: 'pointer', borderRadius: '4px' }}
          onClick={() => router.push(`/chat/${session.id}`)}
        >
          <Text fw={500}>{session.title}</Text>
          <Text size="sm" color="dimmed">{session.lastMessage}</Text>
        </Box>
      ))}
    </Box>
  );
}