import { useState, useRef } from 'react';
import { Textarea, ActionIcon, Box, Group } from '@mantine/core';
import { IconPaperclip, IconArrowUp } from '@tabler/icons-react';

interface ChatInputProps {
  isNavbarVisible: boolean;
  isPinned: boolean;
  navbarWidth: string;
}

export function ChatInput({ isNavbarVisible, isPinned, navbarWidth }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim()) {
      // Handle message submission here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: '55%',
        maxWidth: '800px',
        transition: 'transform 300ms ease',
        transform: `translateX(-50%) ${isNavbarVisible && isPinned ? `translateX(calc(${navbarWidth} / 2))` : ''}`,
        border: '2px solid #6b6c70',
        borderBottomWidth: 0,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{ 
          padding: '10px 14px',
          backgroundColor: '#2C2E33',
          width: '100%',
        }}
      >
        <Group align="flex-end" gap={8}>
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconPaperclip size={20} />
          </ActionIcon>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            placeholder="Message Univise"
            onKeyPress={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            autosize
            minRows={2}
            maxRows={5}
            style={{ flex: 1 }}
            styles={{
              input: {
                border: 'none',
                backgroundColor: '#2C2E33',
                color: '#E1E2E6',
                padding: '8px 0',
                '&::placeholder': {
                  color: '#7A7C85'
                },
                '&:focus': {
                  border: 'none',
                  outline: 'none',
                },
              },
              wrapper: {
                padding: 0,
              }
            }}
          />
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            onClick={handleSubmit}
            disabled={!message.trim()}
          >
            <IconArrowUp size={20} />
          </ActionIcon>
        </Group>
      </Box>
    </Box>
  );
}