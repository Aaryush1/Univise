// handlers/chatSessionHandlers.ts

import { useState } from 'react';
import { auth } from '@/services/firebase';
import { initializeChat, sendMessage, Message, changeTitle } from '@/utils/firebaseUtils';

export const useChatSessionHandlers = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState('Chat Session');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChat = async () => {
    try {
      const { messages, title } = await initializeChat(chatId);
      setMessages(messages);
      setTitle(title || 'Chat Session');
    } catch (error) {
      console.error("Error initializing chat:", error);
      setError(error instanceof Error ? error.message : "An error occurred while loading the chat");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (newMessage: string) => {
    if (!newMessage.trim() || !auth.currentUser) return;

    try {
      const updatedMessages = await sendMessage(chatId, newMessage);
      if (updatedMessages) {
        setMessages(updatedMessages);
        return true;
      } else {
        throw new Error("Failed to update messages");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      setError(error instanceof Error ? error.message : "An error occurred while sending the message");
      return false;
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    if (!auth.currentUser) return;

    try {
      await changeTitle(chatId, newTitle);
      setTitle(newTitle);
      return true;
    } catch (error) {
      console.error("Error changing title: ", error);
      setError(error instanceof Error ? error.message : "An error occurred while changing the title");
      return false;
    }
  };

  return {
    messages,
    title,
    loading,
    error,
    loadChat,
    handleSendMessage,
    handleTitleChange,
  };
};