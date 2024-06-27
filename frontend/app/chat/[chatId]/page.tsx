'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { withAuth } from '@/components/withAuth'
import { useChatSessionHandlers } from '@/handlers/chatSessionHandlers'

function ChatSessionPage({ params }: { params: { chatId: string } }) {
  const {
    messages,
    title,
    loading,
    error,
    loadChat,
    handleSendMessage,
    handleTitleChange,
  } = useChatSessionHandlers(params.chatId);

  const [newMessage, setNewMessage] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    loadChat();
  }, [params.chatId]);

  const onSendMessage = async () => {
    const success = await handleSendMessage(newMessage);
    if (success) {
      setNewMessage('');
    }
  };

  const onTitleChange = async () => {
    const success = await handleTitleChange(title);
    if (success) {
      setIsEditingTitle(false);
    }
  };

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
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter chat title"
          />
          <button onClick={onTitleChange}>Save</button>
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
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default withAuth(ChatSessionPage)