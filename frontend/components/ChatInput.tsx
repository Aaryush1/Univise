import React, { useState } from 'react';
import { Textarea, ActionIcon, Box, Transition, rem, useMantineTheme } from '@mantine/core';
import { IconArrowUp, IconPaperclip } from '@tabler/icons-react';
import { auth } from '@/services/firebase';
import { sendMessage } from '@/utils/firestoreUtils';

interface ChatInputProps {
  chatId: string;
  onMessageSent?: () => void;
}

export function ChatInput({ chatId, onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && auth.currentUser) {
      setIsLoading(true);
      try {
        const updatedMessages = await sendMessage(chatId, message.trim());
        if (updatedMessages) {
          setMessage('');
          if (onMessageSent) {
            onMessageSent();
          }
        } else {
          throw new Error("Failed to update messages");
        }
      } catch (error) {
        console.error("Error sending message: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit}
      style={{
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.lg,
        padding: theme.spacing.sm,
        position: 'relative',
        width: '100%',
        margin: '0 auto',
        boxShadow: `0 0 0 1px ${theme.colors.dark[4]}`,
      }}
    >
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        autosize
        minRows={1}
        maxRows={6}
        style={{ paddingRight: rem(100) }}
        styles={(theme) => ({
          root: {
            backgroundColor: 'transparent',
          },
          input: {
            border: 'none',
            backgroundColor: 'transparent',
            color: theme.colors.dark[0],
            fontSize: theme.fontSizes.sm,
            lineHeight: rem(20),
            maxRows: 6,
            overflow: 'auto',
            '&::placeholder': {
              color: theme.colors.dark[2],
            },
            '&:focus': {
              outline: 'none',
            },
            '&::-webkit-scrollbar': {
              width: rem(8),
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.colors.dark[5],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.colors.dark[3],
              borderRadius: theme.radius.sm,
            },
          },
        })}
      />
      <ActionIcon
        size="md"
        color="teal"
        variant="light"
        style={{
          position: 'absolute',
          top: `calc(${theme.spacing.sm} - 2px)`,
          right: rem(52),
          backgroundColor: theme.colors.dark[5],
        }}
      >
        <IconPaperclip size={rem(16)} />
      </ActionIcon>
      <Transition mounted={message.trim().length > 0} transition="pop" duration={200} timingFunction="ease">
        {(styles) => (
          <ActionIcon
            type="submit"
            size="md"
            color="blue"
            variant="filled"
            disabled={isLoading}
            style={{
              ...styles,
              position: 'absolute',
              top: `calc(${theme.spacing.sm} - 2px)`,
              right: rem(10),
              backgroundColor: theme.colors.blue[6],
            }}
          >
            <IconArrowUp size={rem(16)} />
          </ActionIcon>
        )}
      </Transition>
    </Box>
  );
}