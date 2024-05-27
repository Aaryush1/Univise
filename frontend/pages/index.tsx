'use client';
import { useState, useEffect } from 'react';
import { initModel } from '@/services/apiService';
import { Box } from '@mui/material';
import ChatState from '@/components/AdvisorPage/ChatState';
import { getResponse } from "@/services/apiService";
import Header from '@/components/AdvisorPage/Header';
import LoginPage from '@/components/LoginPage/LoginPage';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

interface ChatMessage {
  type: 'question' | 'response';
  text: string;
}

interface AdvisorPageProps {
  user: firebase.User | null;
  signOut: () => Promise<void>;
}

export default function AdvisorPage({ user, signOut }: AdvisorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("User:", user);
    if (!user) {
      console.log("Redirecting to login page");
      router.push("/");
    } else {
      console.log("Initializing model");
      initModel("s25_clean", "gpt-4-turbo-preview");
    }
  }, [user]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleSendClick = async () => {
    // Add the user's question to the chat history
    const questionMessage: ChatMessage = { type: 'question', text: currentQuestion };
    setChatHistory(prevHistory => [...prevHistory, questionMessage]);

    // Fetch the response from the API
    const apiResponse = await getResponse(currentQuestion);
    console.log(apiResponse);

    // Add the API response to the chat history
    const responseMessage: ChatMessage = {
      type: 'response',
      text: apiResponse || "We're currently working on this feature."
    };
    setChatHistory(prevHistory => [...prevHistory, responseMessage]);

    setCurrentQuestion(''); // Reset current question
  };

  if (!user) {
    return <LoginPage />;
  }

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