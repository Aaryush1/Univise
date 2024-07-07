import { useState, useRef } from 'react';
import { Textarea, ActionIcon, Box, Flex } from '@mantine/core';
import { IconPaperclip, IconArrowUp } from '@tabler/icons-react';

interface ChatInputProps {
  isNavbarVisible: boolean;
  isPinned: boolean;
  navbarWidth: string;
  onSendMessage: (message: string) => void;
}

export function OChatInput({ isNavbarVisible, isPinned, navbarWidth, onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  return (
    <Box
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        transition: 'transform 300ms ease',
        transform: isNavbarVisible && isPinned ? `translateX(calc(${navbarWidth} / 2))` : 'none',
        border: '1.5px solid #6b6c70',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Flex 
        align="flex-end" 
        style={{ 
          padding: '8px 12px',
          backgroundColor: '#2C2E33',
          width: '100%',
          minHeight: '52px', // Ensures minimum height for single line input
        }}
      >
        <ActionIcon 
          variant="subtle"
          color="gray" 
          size="lg"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '25%',
            width: '32px',
            height: '32px',
            flexShrink: 0,
            marginRight: '8px',
            alignSelf: 'flex-end',
          }}
        >
          <IconPaperclip size={20} stroke={2.5} />
        </ActionIcon>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          placeholder="Message Univise..."
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          autosize
          minRows={1}
          maxRows={6}
          style={{ flex: 1 }}
          styles={{
            root: {
              alignSelf: 'flex-end',
            },
            wrapper: {
              padding: 0,
            },
            input: {
              border: 'none',
              backgroundColor: '#2C2E33',
              color: '#E1E2E6',
              padding: '7px 0',
              fontSize: '16px',
              lineHeight: '24px',
              '&::placeholder': {
                color: '#7A7C85'
              },
              '&:focus': {
                border: 'none',
                outline: 'none',
              },
            },
          }}
        />
        <ActionIcon
          variant="filled"
          color={message.trim() ? 'blue' : 'gray'}
          size="lg"
          onClick={handleSubmit}
          disabled={!message.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: message.trim() ? '#4C6EF5' : '#3A3C42',
            borderRadius: '25%',
            width: '32px',
            height: '32px',
            transition: 'background-color 0.2s ease',
            flexShrink: 0,
            marginLeft: '8px',
            alignSelf: 'flex-end',
          }}
        >
          <IconArrowUp size={20} stroke={2.5} color={message.trim() ? '#FFFFFF' : '#7A7C85'} />
        </ActionIcon>
      </Flex>
    </Box>
  );
}