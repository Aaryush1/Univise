'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '@/services/firebase'
import { withAuth } from '@/app/components/withAuth'
import { useRouter } from 'next/navigation'
import { fetchRecentChatSessions, createNewChat, ChatSession } from '@/utils/firebaseUtils'

function ChatsListPage() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [indexBuilding, setIndexBuilding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        const sessions = await fetchRecentChatSessions()
        setChatSessions(sessions)
      } catch (error) {
        console.error("Error fetching chat sessions:", error)
        if (error instanceof Error && error.message.includes('failed-precondition')) {
          setIndexBuilding(true)
        } else {
          setError(error instanceof Error ? error.message : String(error))
        }
      } finally {
        setLoading(false)
      }
    }

    loadChatSessions()
  }, [])

  const handleCreateNewChat = async () => {
    try {
      const newChatId = await createNewChat()
      router.push(`/chat/${newChatId}`)
    } catch (error) {
      console.error("Error creating new chat:", error)
      setError("Failed to create a new chat. Please try again.")
    }
  }

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
      <button onClick={handleCreateNewChat}>Start New Chat</button>
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