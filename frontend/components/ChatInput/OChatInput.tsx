import { useState, useRef } from 'react';
import { Textarea, ActionIcon, Box, Flex } from '@mantine/core';
import { IconPaperclip, IconArrowUp } from '@tabler/icons-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function OChatInput({ onSendMessage }: ChatInputProps) {
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
          minHeight: '52px',
        }}
      >
        <ActionIcon 
          variant="subtle"
          color="gray" 
          size="lg"
          style={{
            borderRadius: '25%',
            width: '32px',
            height: '32px',
            marginRight: '8px',
            marginBottom: '2px',
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
            backgroundColor: message.trim() ? '#4C6EF5' : '#3A3C42',
            borderRadius: '25%',
            width: '32px',
            height: '32px',
            marginLeft: '8px',
            marginBottom: '2px',
          }}
        >
          <IconArrowUp size={20} stroke={2.5} color={message.trim() ? '#FFFFFF' : '#7A7C85'} />
        </ActionIcon>
      </Flex>
    </Box>
  );
}