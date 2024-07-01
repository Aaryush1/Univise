import React, { useState } from 'react';
import { Box, Textarea, ActionIcon, Transition } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { auth } from '@/services/firebase';
import { sendMessage } from '@/utils/firestoreUtils';

interface ChatInputProps {
  chatId: string;
  onMessageSent: () => void;
}

export function ChatInput({ chatId, onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && auth.currentUser) {
      setIsLoading(true);
      try {
        await sendMessage(chatId, message.trim());
        setMessage('');
        onMessageSent();
      } catch (error) {
        console.error("Error sending message: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#25262b',
        borderTop: '1px solid #373A40',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
        padding: '0.75rem',
        width: '100%',
        transition: 'all 200ms ease',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Textarea
        placeholder="Type a message and press Enter to send..."
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        autosize
        minRows={1}
        maxRows={5}
        style={{ flex: 1, marginRight: '0.5rem' }}
        styles={{
          input: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#C1C2C5',
            fontSize: '0.875rem',
            padding: '0.5rem',
            '&::placeholder': {
              color: '#5C5F66',
            },
            '&:focus': {
              outline: 'none',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#373A40 transparent',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#373A40',
              borderRadius: '3px',
            },
          },
        }}
      />
      <Transition
        mounted={message.trim().length > 0}
        transition="pop"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <ActionIcon
            size="lg"
            color="blue"
            variant="filled"
            disabled={isLoading}
            type="submit"
            style={styles}
          >
            <IconArrowUp size={18} />
          </ActionIcon>
        )}
      </Transition>
    </Box>
  );
}