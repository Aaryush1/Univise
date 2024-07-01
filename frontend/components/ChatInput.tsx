import React, { useState } from 'react';
import { Textarea, ActionIcon, Box, Transition, rem, useMantineTheme } from '@mantine/core';
import { IconSend, IconPaperclip } from '@tabler/icons-react';
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
        backgroundColor: theme.colors.neutral[1],
        borderRadius: theme.radius.lg,
        padding: theme.spacing.sm,
        position: 'relative',
        maxWidth: '90%',
        margin: '0 auto',
      }}
    >
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        autosize
        minRows={1}
        maxRows={6}
        style={{ paddingRight: rem(80) }}
        styles={{
          input: {
            border: 'none',
            backgroundColor: 'transparent',
            color: theme.colors.neutral[9],
            fontSize: theme.fontSizes.sm,
            lineHeight: rem(20),
            maxRows: 6,
            overflow: 'auto',
            '&::placeholder': {
              color: theme.colors.neutral[5],
            },
            '&:focus': {
              outline: 'none',
            },
            '&::-webkit-scrollbar': {
              width: rem(8),
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.colors.neutral[1],
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.colors.neutral[4],
              borderRadius: theme.radius.sm,
            },
          },
        }}
      />
      <ActionIcon
        size="lg"
        color="neutral.6"
        variant="subtle"
        style={{
          position: 'absolute',
          top: theme.spacing.sm,
          right: theme.spacing.sm,
        }}
      >
        <IconPaperclip size={rem(20)} />
      </ActionIcon>
      <Transition mounted={message.trim().length > 0} transition="pop" duration={200} timingFunction="ease">
        {(styles) => (
          <ActionIcon
            type="submit"
            size="lg"
            color="blue.6"
            variant="subtle"
            disabled={isLoading}
            style={{
              ...styles,
              position: 'absolute',
              top: theme.spacing.sm,
              right: rem(52),
            }}
          >
            <IconSend size={rem(20)} />
          </ActionIcon>
        )}
      </Transition>
    </Box>
  );
}