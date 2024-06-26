'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, where, orderBy, limit, getDocs, FirestoreError, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebase'
import { withAuth } from '@/app/components/withAuth'
import { useRouter } from 'next/navigation'

interface ChatSession {
  id: string;
  title: string;
  lastMessageTimestamp: Date;
  lastMessage: string;
}

function ChatsListPage() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [indexBuilding, setIndexBuilding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchRecentChatSessions()
  }, [])

  const fetchRecentChatSessions = async () => {
    if (!auth.currentUser) {
      setError("User not authenticated. Please log in and try again.");
      setLoading(false);
      return;
    }

    const chatSessionsRef = collection(db, 'chatSessions')
    const q = query(
      chatSessionsRef,
      where('userId', '==', auth.currentUser.uid),
      orderBy('lastMessageTimestamp', 'desc'),
      limit(10)
    )

    try {
      const querySnapshot = await getDocs(q)
      const fetchedSessions: ChatSession[] = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title || 'Untitled Chat',
          lastMessageTimestamp: data.lastMessageTimestamp?.toDate() || new Date(),
          lastMessage: data.lastMessage || 'No messages yet'
        }
      })
      setChatSessions(fetchedSessions)
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      if (error instanceof FirestoreError && error.code === 'failed-precondition') {
        setIndexBuilding(true);
      } else {
        setError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      }
    } finally {
      setLoading(false)
    }
  }

  const createNewChat = async () => {
    if (!auth.currentUser) {
      setError("User not authenticated. Please log in and try again.");
      return;
    }

    try {
      const newChatRef = doc(collection(db, 'chatSessions'))
      await setDoc(newChatRef, {
        userId: auth.currentUser.uid,
        title: 'New Chat',
        lastMessageTimestamp: new Date(),
        lastMessage: ''
      })
      router.push(`/chat/${newChatRef.id}`)
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
      <button onClick={createNewChat}>Start New Chat</button>
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