import { Box } from '@mantine/core';
import { MessageBubble } from './MessageBubble';

interface Message {
  content: string;
  isUserMessage: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    return (
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingBottom: '1rem',
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            content={message.content}
            isUserMessage={message.isUserMessage}
          />
        ))}
      </Box>
    );
  }