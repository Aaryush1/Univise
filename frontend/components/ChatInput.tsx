import React, { useState } from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
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
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        rightSection={
          <ActionIcon type="submit" size={32} radius="xl" color={theme.primaryColor} variant="filled">
            <IconSend size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        rightSectionWidth={42}
      />
    </form>
  );
}