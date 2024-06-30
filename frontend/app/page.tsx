// app/page.tsx
'use client'

import { useState } from 'react'
import { AppShell, Burger, Group, Text, Paper, TextInput, Button, Stack, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle'
import { ChatInput } from '@/components/ChatInput'
import { AuthButton } from '@/components/AuthButton'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navagation'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { user } = useAuth()

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      // Here you would typically send the message to your AI backend
      // and then add the response to the messages
      setInput('')
    }
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
                    <Group key={index} justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                      <Text>{message.text}</Text>
                    </Group>
                  ))}
                </ScrollArea>
                <Group>
                  <TextInput
                    placeholder="Type your message..."
                    value={input}
                    onChange={(event) => setInput(event.currentTarget.value)}
                    style={{ flex: 1 }}
                  />
                  <Button onClick={handleSend}>Send</Button>
                </Group>
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