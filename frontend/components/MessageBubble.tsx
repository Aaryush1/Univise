"use client"

import React from 'react';
import { Paper, Text, useMantineTheme } from '@mantine/core';

interface MessageBubbleProps {
  message: string;
  isUser?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser = false }) => {
  const theme = useMantineTheme();

  return (
    <Paper 
      shadow="sm"
      p={theme.spacing.md}
      withBorder
      style={{
        maxWidth: '70%',
        marginBottom: theme.spacing.md,
        borderRadius: theme.radius.xl,
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? theme.colors.blue[1] : theme.colors.gray[0],
        color: isUser ? theme.colors.blue[9] : theme.colors.gray[9],
      }}
    >
      <Text size="md">{message}</Text>
    </Paper>
  );
};