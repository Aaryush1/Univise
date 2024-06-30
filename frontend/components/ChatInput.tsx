import React, { useState, useRef, useEffect } from 'react';
import { Textarea, ActionIcon, Box, Flex, Transition } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { auth } from '@/services/firebase';
import { sendMessage } from '@/utils/firestoreUtils';

interface ChatInputProps {
  chatId: string;
  onMessageSent?: () => void;
}

export function ChatInput({ chatId, onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = 'auto';
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [message]);

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
      pos="relative" 
      maw={600} 
      w="100%"
      mx="auto" 
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        padding: '8px',
        minHeight: '40px',
      }}
    >
      <Flex 
        ref={containerRef} 
        direction="column" 
        style={{ 
          maxHeight: '112px', 
          overflow: 'hidden',
          marginRight: '40px', // Make space for the button
        }}
      >
        <Textarea
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          autosize
          minRows={1}
          maxRows={4}
          styles={{
            root: {
              flexGrow: 1,
            },
            input: {
              border: 'none',
              padding: '8px 8px 8px 8px',
              backgroundColor: 'transparent',
              fontSize: '14px',
              overflowY: 'auto',
              '&:focus': {
                outline: 'none',
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px',
              },
            },
          }}
        />
      </Flex>
      <Transition mounted={message.trim().length > 0} transition="pop" duration={200}>
        {(styles) => (
          <ActionIcon
            color="blue"
            variant="filled"
            size="lg"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleSubmit}
            style={{
              ...styles,
              position: 'absolute',
              top: '8px',
              right: '8px',
              borderRadius: '4px',
            }}
          >
            <IconArrowUp size={18} />
          </ActionIcon>
        )}
      </Transition>
    </Box>
  );
}