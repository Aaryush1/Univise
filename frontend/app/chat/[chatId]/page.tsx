'use client'

import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection, query, orderBy, getDocs, addDoc, updateDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/services/firebase'
import { withAuth } from '@/app/components/withAuth'

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function ChatSessionPage({ params }: { params: { chatId: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const initializeChat = async () => {
      console.log("Initializing chat. Chat ID:", params.chatId);
      
      if (!auth.currentUser) {
        console.error("No authenticated user")
        setError("Please log in to access chats")
        setLoading(false)
        return
      }

      try {
        if (params.chatId === 'new') {
          console.log("Creating new chat session");
          const newChatRef = doc(collection(db, 'chatSessions'))
          await setDoc(newChatRef, {
            userId: auth.currentUser.uid,
            title: 'New Chat',
            lastMessageTimestamp: new Date(),
            lastMessage: ''
          })
          console.log("Created new chat session:", newChatRef.id)
          router.replace(`/chat/${newChatRef.id}`)
          setLoading(false)
          return
        }

        console.log("Fetching existing chat session");
        const chatSessionRef = doc(db, 'chatSessions', params.chatId)
        const chatSessionSnap = await getDoc(chatSessionRef)

        if (!chatSessionSnap.exists()) {
          console.error("Chat session does not exist:", params.chatId)
          setError("Chat session not found")
          setLoading(false)
          return
        }

        console.log("Chat session data:", chatSessionSnap.data());

        if (chatSessionSnap.data().userId !== auth.currentUser.uid) {
          console.error("User does not have permission to access this chat")
          setError("You don't have permission to access this chat")
          setLoading(false)
          return
        }

        console.log("Fetching messages");
        const messagesRef = collection(db, 'chatSessions', params.chatId, 'messages')
        const q = query(messagesRef, orderBy('timestamp'))

        const querySnapshot = await getDocs(q)
        const fetchedMessages: Message[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          content: doc.data().content,
          sender: doc.data().sender,
          timestamp: doc.data().timestamp.toDate(),
        }))
        console.log("Fetched messages:", fetchedMessages.length);
        setMessages(fetchedMessages)
      } catch (error) {
        console.error("Error initializing chat:", error)
        setError("An error occurred while loading the chat")
      } finally {
        setLoading(false)
      }
    }

    initializeChat()
  }, [params.chatId, router])

  const sendMessage = async () => {
    if (!newMessage.trim() || !auth.currentUser) return

    const messagesRef = collection(db, 'chatSessions', params.chatId, 'messages')
    const chatSessionRef = doc(db, 'chatSessions', params.chatId)

    try {
      // Add user message
      const userMessageDoc = await addDoc(messagesRef, {
        content: newMessage,
        sender: 'user',
        timestamp: new Date()
      })

      // Update chat session with last message info
      await updateDoc(chatSessionRef, {
        lastMessageTimestamp: new Date(),
        lastMessage: newMessage
      })

      setNewMessage('')

      // Here you would typically call your AI service to get a response
      // For this example, we'll just add a mock AI response
      const aiMessageDoc = await addDoc(messagesRef, {
        content: "This is a mock AI response.",
        sender: 'ai',
        timestamp: new Date()
      })

      // Update chat session with AI's last message info
      await updateDoc(chatSessionRef, {
        lastMessageTimestamp: new Date(),
        lastMessage: "This is a mock AI response."
      })

      // Refresh messages
      const q = query(messagesRef, orderBy('timestamp'))
      const querySnapshot = await getDocs(q)
      const updatedMessages: Message[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        sender: doc.data().sender,
        timestamp: doc.data().timestamp.toDate(),
      }))
      setMessages(updatedMessages)
    } catch (error) {
      console.error("Error sending message: ", error)
    }
  }

  if (loading) {
    return <div>Loading chat session...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Chat Session</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: '10px' }}>
            <strong>{message.sender}: </strong>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default withAuth(ChatSessionPage)