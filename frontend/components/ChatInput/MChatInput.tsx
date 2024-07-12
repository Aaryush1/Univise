import { useState, useRef } from 'react';
import { Textarea, ActionIcon, Box } from '@mantine/core';
import { IconPaperclip, IconArrowUp } from '@tabler/icons-react';

interface ChatInputProps {
  isNavbarVisible: boolean;
  isPinned: boolean;
  navbarWidth: string;
}

export function MChatInput({ isNavbarVisible, isPinned, navbarWidth }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim()) {
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
        width: '60%',
        maxWidth: '1100px',
        transition: 'transform 300ms ease',
        transform: `translateX(-50%) ${isNavbarVisible && isPinned ? `translateX(calc(${navbarWidth} / 2))` : ''}`,
        border: '1.5px solid #6b6c70', // Reduced border thickness
        borderBottomWidth: 0,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{ 
          padding: '12px 12px', // Increased vertical padding
          backgroundColor: '#2C2E33',
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
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
            width: '32px', // Slightly increased size
            height: '32px', // Slightly increased size
            flexShrink: 0,
            marginRight: '8px',
          }}
        >
          <IconPaperclip size={20} stroke={2.5} />
        </ActionIcon>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          placeholder="Message Univise..."
          onKeyPress={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          autosize
          minRows={2} // Increased minimum rows
          maxRows={6} // Increased maximum rows
          style={{ flex: 1 }}
          styles={{
            input: {
              border: 'none',
              backgroundColor: '#2C2E33',
              color: '#E1E2E6',
              padding: '8px 0', // Adjusted padding
              fontSize: '16px',
              lineHeight: '1.4', // Added line height for better readability
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
            width: '32px', // Slightly increased size
            height: '32px', // Slightly increased size
            transition: 'background-color 0.2s ease',
            flexShrink: 0,
            marginLeft: '8px',
          }}
        >
          <IconArrowUp size={20} stroke={2.5} color={message.trim() ? '#FFFFFF' : '#7A7C85'} />
        </ActionIcon>
      </Box>
    </Box>
  );
}