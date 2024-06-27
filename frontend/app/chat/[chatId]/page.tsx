'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/services/firebase'
import { withAuth } from '@/app/components/withAuth'
import { initializeChat, sendMessage, Message, changeTitle } from '@/utils/firebaseUtils'

function ChatSessionPage({ params }: { params: { chatId: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [title, setTitle] = useState('Chat Session')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadChat = async () => {
      try {
        const { messages, title } = await initializeChat(params.chatId)
        setMessages(messages)
        setTitle(title || 'Chat Session')
      } catch (error) {
        console.error("Error initializing chat:", error)
        setError(error instanceof Error ? error.message : "An error occurred while loading the chat")
      } finally {
        setLoading(false)
      }
    }

    loadChat()
  }, [params.chatId])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !auth.currentUser) return

    try {
      const updatedMessages = await sendMessage(params.chatId, newMessage)
      if (updatedMessages) {
        setMessages(updatedMessages)
        setNewMessage('')
      } else {
        throw new Error("Failed to update messages")
      }
    } catch (error) {
      console.error("Error sending message: ", error)
      setError(error instanceof Error ? error.message : "An error occurred while sending the message")
    }
  }

  const handleTitleChange = async () => {
    if (!auth.currentUser) return

    try {
      await changeTitle(params.chatId, title)
      setIsEditingTitle(false)
    } catch (error) {
      console.error("Error changing title: ", error)
      setError(error instanceof Error ? error.message : "An error occurred while changing the title")
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
      {isEditingTitle ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chat title"
          />
          <button onClick={handleTitleChange}>Save</button>
        </div>
      ) : (
        <h1 onClick={() => setIsEditingTitle(true)}>{title}</h1>
      )}
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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default withAuth(ChatSessionPage)