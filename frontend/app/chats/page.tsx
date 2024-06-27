'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { withAuth } from '@/components/withAuth'
import { useRouter } from 'next/navigation'
import { useChatListHandlers } from '@/handlers/chatListHandlers'

function ChatsListPage() {
  const {
    chatSessions,
    loading,
    error,
    indexBuilding,
    loadChatSessions,
    handleCreateNewChat,
  } = useChatListHandlers();

  const router = useRouter();

  useEffect(() => {
    loadChatSessions();
  }, []);

  const onCreateNewChat = async () => {
    const newChatId = await handleCreateNewChat();
    if (newChatId) {
      router.push(`/chat/${newChatId}`);
    }
  };

  if (loading) {
    return <div>Loading your recent chats...</div>
  }

  if (indexBuilding) {
    return (
      <div>
        <h2>Preparing Your Chats</h2>
        <p>We are setting up some things to make your chat list load faster. This may take a few minutes.</p>
        <p>Please try again in a moment.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2>Error loading chats</h2>
        <p>{error}</p>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Your Recent Chats</h1>
      <button onClick={onCreateNewChat}>Start New Chat</button>
      {chatSessions.length === 0 ? (
        <p>You have not had any chats yet. Start a new one!</p>
      ) : (
        <ul>
          {chatSessions.map((session) => (
            <li key={session.id}>
              <Link href={`/chat/${session.id}`}>
                <h3>{session.title}</h3>
                <p>{session.lastMessage}</p>
                <small>Last updated: {session.lastMessageTimestamp.toLocaleString()}</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default withAuth(ChatsListPage)