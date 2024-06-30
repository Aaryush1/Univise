'use client'

import { useState } from 'react'
import { AppShell, Burger, Group, Text, Paper, Stack, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle'
import { ChatInput } from '@/components/ChatInput'
import { ChatMessage } from '@/components/ChatMessage'
import { AuthButton } from '@/components/AuthButton'
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
    // Reload messages or perform any other necessary actions
    // This is a placeholder function since the actual message sending is now handled in ChatInput
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
        <Paper shadow="xs" p="md" style={{ height: 'calc(100vh - 100px)' }}>
          <Stack h="100%">
            {user ? (
              <>
                <ScrollArea h="calc(100% - 60px)" offsetScrollbars>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      content={message.text}
                      timestamp={message.timestamp}
                      isUser={message.sender === 'user'}
                    />
                  ))}
                </ScrollArea>
                {/* Note: You'll need to provide a valid chatId here */}
                <ChatInput chatId="home-chat" onMessageSent={handleMessageSent} />
              </>
            ) : (
              <Text>Please log in to use the chat.</Text>
            )}
          </Stack>
        </Paper>
      </AppShell.Main>
    </AppShell>
  )
}