import { Box } from '@mantine/core';
import { MessageBubble } from './MessageBubble';
import { Message as FirestoreMessage } from '@/utils/firestoreUtils';

interface MessageListProps {
  messages: FirestoreMessage[];
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
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            isUserMessage={message.sender === 'user'}
          />
        ))}
      </Box>
    );
  }