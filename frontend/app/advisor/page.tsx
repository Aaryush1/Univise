'use client'
// advisor/page.tsx
import { useState } from 'react';
import { Box } from '@mui/material';
import ChatState from '@/components/AdvisorPage/ChatState';

interface ChatMessage {
  type: 'question' | 'response';
  text: string;
}

export default function AdvisorPage() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleSendClick = () => {
    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { type: 'question', text: currentQuestion },
      { type: 'response', text: `Here is the response to your question: ${currentQuestion}` },
    ];
    setChatHistory(newHistory);
    setCurrentQuestion(''); // Reset current question
  };

  return (
    <Box sx={{ padding: 0, margin: 0, width: '100%', boxSizing: 'border-box' }}>
      <ChatState
        chatHistory={chatHistory}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        handleSendClick={handleSendClick}
      />
    </Box>
  );
}
