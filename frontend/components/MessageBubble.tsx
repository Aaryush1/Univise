// components/MessageBubble.tsx
import { Paper, Text } from '@mantine/core';

interface MessageBubbleProps {
  content: string;
  isUserMessage: boolean;
}

export function MessageBubble({ content, isUserMessage }: MessageBubbleProps) {
  return (
    <Paper 
      shadow="sm"
      p="md"
      withBorder
      mb="md"
      style={{
        backgroundColor: isUserMessage ? '#3A3C42' : '#2C2E33',
        borderRadius: '20px',
        maxWidth: '70%',
        alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
        color: '#E1E2E6',
        borderColor: '#6b6c70',
      }}
    >
      <Text>{content}</Text>
    </Paper>
  );
}