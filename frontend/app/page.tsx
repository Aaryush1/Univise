'use client'

import { useState } from 'react'
import { AppShell, Burger, Group, Text, Paper, Box, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ChatInput } from '@/components/ChatInput'
import { ChatMessage } from '@/components/ChatMessage'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navagation'

interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([])
  const { user } = useAuth()

  const handleMessageSent = () => {
    console.log('Message sent, update UI if necessary');
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Text size="lg" fw={700}>AI Chatbot</Text>
          </Group>
          <Navigation/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text>Settings</Text>
        {/* Add navigation items or settings here */}
      </AppShell.Navbar> 

      <AppShell.Main>
        <Paper shadow="xs" p="md" style={{ height: 'calc(100vh - 92px)', display: 'flex', flexDirection: 'column' }}>
          {user ? (
            <>
              <ScrollArea style={{ flex: 1, marginBottom: '16px' }} offsetScrollbars>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    content={message.text}
                    timestamp={message.timestamp}
                    isUser={message.sender === 'user'}
                  />
                ))}
              </ScrollArea>
              <Box style={{ flexShrink: 0 }}>
                <ChatInput chatId="home-chat" onMessageSent={handleMessageSent} />
              </Box>
            </>
          ) : (
            <Text>Please log in to use the chat.</Text>
          )}
        </Paper>
      </AppShell.Main>
    </AppShell>
  )
}