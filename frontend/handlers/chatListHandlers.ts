// handlers/chatListHandlers.ts

import { useState } from 'react';
import { fetchRecentChatSessions, createNewChat, ChatSession, sendMessage } from '@/utils/firestoreUtils';

export const useChatListHandlers = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [indexBuilding, setIndexBuilding] = useState(false);

  const loadChatSessions = async () => {
    try {
      const sessions = await fetchRecentChatSessions();
      setChatSessions(sessions);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      if (error instanceof Error && error.message.includes('failed-precondition')) {
        setIndexBuilding(true);
      } else {
        setError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewChat = async (initialMessage?: string) => {
    try {
      const newChatId = await createNewChat();
      if (initialMessage) {
        await sendMessage(newChatId, initialMessage);
      }
      return newChatId;
    } catch (error) {
      console.error('Error creating new chat:', error);
      return null;
    }
  };

  return {
    chatSessions,
    loading,
    error,
    indexBuilding,
    loadChatSessions,
    handleCreateNewChat,
  };
};