'use client';
// advisor/page.tsx
import { useState, useEffect } from 'react';
import { initModel } from '@/services/apiService';
import { Box } from '@mui/material';
import ChatState from '@/components/AdvisorPage/ChatState';
import { getResponse } from "@/services/apiService";
import Header from '@/components/AdvisorPage/Header';
import { track } from '@vercel/analytics';

interface ChatMessage {
  type: 'question' | 'response';
  text: string;
}

// "gpt-3.5-turbo",
// "gpt-4-turbo-preview"

export default function AdvisorPage() {
  useEffect(() => {
    initModel("s25_clean", "gpt-4-turbo-preview");
  }, []);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleSendClick = async () => {
    // Add the user's question to the chat history
    const questionMessage: ChatMessage = {
      type: 'question',
      text: currentQuestion
    };
    //track('Advisor Query', { question: currentQuestion })
    setChatHistory(prevHistory => [...prevHistory, questionMessage]);

    const apiResponse = await getResponse(currentQuestion);
    console.log(apiResponse)
    const responseMessage: ChatMessage = {
      type: 'response',
      text: apiResponse || "We're currently working on this feature."
    };

    setChatHistory(prevHistory => [...prevHistory, responseMessage]);

    setCurrentQuestion('');
  };

  return (
    <>
      <title>Univise Advisor</title>
      <Header version={"v0.5.0 (Beta)"} />
      <Box sx={{ padding: 0, margin: 0, width: '100%', boxSizing: 'border-box' }}>
        <ChatState
          chatHistory={chatHistory}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </Box>
    </>
  );
}
