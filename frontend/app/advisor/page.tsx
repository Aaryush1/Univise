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
    let responseText = '';

    if (currentQuestion.includes('literature classes')) {
      responseText = "Here are some recommendations based on your preferences:     ENG-104: Intro to Sci Fi: Exploring New Worlds, with average GPA of 3.78.     ENG-131: Contemporary Dystopian Visions, with average GPA of 3.66.     ENG-128: Science Fiction Short Stories, with average GPA of 3.81.      These courses all have highly-rated instructors and great grade point averages. Let me know if any of these interest you, or if you'd like more information or recommendations.";
    } else if (currentQuestion.includes('lectures after noon')) {
      responseText = "Yes, Intro to Sci Fi (ENG-104) has lectures on Monday and Wednesdays at 1:20pm. Also, Science Fiction Short Stories has lectures on Tuesdays and Thursdays at 2:30pm.";
    } else {
      responseText = "Sorry, I don't have information on that query.";
    }

    const newHistory = [
      ...chatHistory,
      { type: 'question', text: currentQuestion },
      { type: 'response', text: responseText },
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
