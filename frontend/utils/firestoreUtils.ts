// utils/firebaseUtils.ts

import { doc, getDoc, collection, query, orderBy, getDocs, addDoc, updateDoc, setDoc, where, limit, deleteDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebase'

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessageTimestamp: Date;
  lastMessage: string;
}

export const initializeChat = async (chatId: string): Promise<{ messages: Message[], title: string }> => {
  if (!auth.currentUser) {
    throw new Error("Please log in to access chats")
  }

  if (chatId === 'new') {
    return { messages: [], title: 'New Chat' }
  }

  const chatSessionRef = doc(db, 'chatSessions', chatId)
  const chatSessionSnap = await getDoc(chatSessionRef)

  if (!chatSessionSnap.exists()) {
    throw new Error("Chat session not found")
  }

  if (chatSessionSnap.data().userId !== auth.currentUser.uid) {
    throw new Error("You don't have permission to access this chat")
  }

  const title = chatSessionSnap.data().title || 'Untitled Chat'

  const messagesRef = collection(db, 'chatSessions', chatId, 'messages')
  const q = query(messagesRef, orderBy('timestamp'))

  const querySnapshot = await getDocs(q)
  const fetchedMessages: Message[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    content: doc.data().content,
    sender: doc.data().sender,
    timestamp: doc.data().timestamp.toDate(),
  }))

  return { messages: fetchedMessages, title }
}

export const sendMessage = async (chatId: string, newMessage: string): Promise<Message[]> => {
  if (!newMessage.trim() || !auth.currentUser) return []

  const messagesRef = collection(db, 'chatSessions', chatId, 'messages')
  const chatSessionRef = doc(db, 'chatSessions', chatId)

  try {
    // Add user message
    await addDoc(messagesRef, {
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    })

    // Update chat session with last message info
    await updateDoc(chatSessionRef, {
      lastMessageTimestamp: new Date(),
      lastMessage: newMessage
    })

    // Add mock AI response
    await addDoc(messagesRef, {
      content: "This is a mock AI response.",
      sender: 'ai',
      timestamp: new Date()
    })

    // Update chat session with AI's last message info
    await updateDoc(chatSessionRef, {
      lastMessageTimestamp: new Date(),
      lastMessage: "This is a mock AI response."
    })

    // Fetch updated messages
    const q = query(messagesRef, orderBy('timestamp'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      sender: doc.data().sender,
      timestamp: doc.data().timestamp.toDate(),
    }))
  } catch (error) {
    console.error("Error in sendMessage:", error)
    throw error // Re-throw the error to be caught in the component
  }
}

export const updateChatTitle = async (chatId: string, newTitle: string): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated. Please log in and try again.")
  }

  const chatSessionRef = doc(db, 'chatSessions', chatId)

  try {
    const chatSessionSnap = await getDoc(chatSessionRef)

    if (!chatSessionSnap.exists()) {
      throw new Error("Chat session not found")
    }

    if (chatSessionSnap.data().userId !== auth.currentUser.uid) {
      throw new Error("You don't have permission to modify this chat")
    }

    await updateDoc(chatSessionRef, {
      title: newTitle
    })
  } catch (error) {
    console.error("Error in updateChatTitle:", error)
    throw error // Re-throw the error to be caught in the component
  }
}

export const fetchRecentChatSessions = async (): Promise<ChatSession[]> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated. Please log in and try again.")
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
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title || 'Untitled Chat',
        lastMessageTimestamp: data.lastMessageTimestamp?.toDate() || new Date(),
        lastMessage: data.lastMessage || 'No messages yet'
      }
    })
  } catch (error) {
    console.error("Error in fetchRecentChatSessions:", error)
    throw error // Re-throw the error to be caught in the component
  }
}

export const createNewChat = async (): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated. Please log in and try again.")
  }

  try {
    const newChatRef = doc(collection(db, 'chatSessions'))
    await setDoc(newChatRef, {
      userId: auth.currentUser.uid,
      title: 'New Chat',
      lastMessageTimestamp: new Date(),
      lastMessage: ''
    })
    return newChatRef.id
  } catch (error) {
    console.error("Error in createNewChat:", error)
    throw error // Re-throw the error to be caught in the component
  }
}

export const deleteChat = async (chatId: string): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated. Please log in and try again.")
  }

  const chatSessionRef = doc(db, 'chatSessions', chatId)

  try {
    const chatSessionSnap = await getDoc(chatSessionRef)

    if (!chatSessionSnap.exists()) {
      throw new Error("Chat session not found")
    }

    if (chatSessionSnap.data().userId !== auth.currentUser.uid) {
      throw new Error("You don't have permission to delete this chat")
    }

    // Delete all messages in the chat
    const messagesRef = collection(db, 'chatSessions', chatId, 'messages')
    const messagesSnapshot = await getDocs(messagesRef)
    const deleteMessagePromises = messagesSnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deleteMessagePromises)

    // Delete the chat session document
    await deleteDoc(chatSessionRef)

  } catch (error) {
    console.error("Error in deleteChat:", error)
    throw error // Re-throw the error to be caught in the component
  }
}