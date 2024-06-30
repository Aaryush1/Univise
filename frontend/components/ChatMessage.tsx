import React from 'react';
import { Paper, Text, Group, Avatar, Box, useMantineTheme } from '@mantine/core';

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isUser: boolean;
  avatar?: string;
}

export function ChatMessage({ content, timestamp, isUser, avatar }: ChatMessageProps) {
  const theme = useMantineTheme();

  return (
    <Box mb="md" style={{ alignSelf: isUser ? 'flex-end' : 'flex-start' }}>
      <Paper 
        p="sm" 
        radius="lg" 
        bg={isUser ? theme.colors.teal[1] : theme.colors.gray[1]}
        style={{ maxWidth: '70%' }}
      >
        <Group justify={isUser ? 'flex-end' : 'flex-start'} gap="sm">
          {!isUser && <Avatar src={avatar} radius="xl" size="sm" />}
          <Box>
            <Text size="sm">{content}</Text>
            <Text size="xs" c="dimmed" ta={isUser ? 'right' : 'left'}>
              {timestamp}
            </Text>
          </Box>
          {isUser && <Avatar src={avatar} radius="xl" size="sm" />}
        </Group>
      </Paper>
    </Box>
  );
}