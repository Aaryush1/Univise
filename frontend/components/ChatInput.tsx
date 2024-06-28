"use client"

import React, { useState } from 'react';
import { TextInput, ActionIcon, Flex, useMantineTheme } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const theme = useMantineTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center" gap="sm">
        <TextInput
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1 }}
          radius={theme.radius.md}
        />
        <ActionIcon 
          type="submit" 
          variant="filled"
          color="blue"
          aria-label="Send message"
          radius={theme.radius.md}
          size="lg"
        >
          <IconSend size={18} />
        </ActionIcon>
      </Flex>
    </form>
  );
};