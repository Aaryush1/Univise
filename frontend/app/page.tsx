"use client"

import { useState } from 'react';
import { AppShell, Box, Text, Paper } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
  };

  const handleNewChat = () => {
    console.log('Starting a new chat');
    // Implement new chat functionality here
  };

  const navbarWidth = '300px';

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header onToggleNavbar={toggleNavbar} onNewChat={handleNewChat}/>
      </AppShell.Header>
      
      <Navbar
        isVisible={isNavbarVisible}
        onClose={() => setIsNavbarVisible(false)}
      />

      <AppShell.Main>
        <Box
          style={{
            width: '100%',
            minHeight: 'calc(100vh - 60px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'padding-left 300ms ease',
            paddingLeft: isNavbarVisible ? navbarWidth : '0',
          }}
        >
          <Box
            style={{
              width: '100%',
              maxWidth: '800px',
              paddingBottom: '80px',
            }}
          >
            <Text size="xl" mb="md">Sample Conversation</Text>
            
            {/* User message */}
            <Paper 
              shadow="sm" 
              p="md" 
              withBorder 
              mb="md" 
              style={{ backgroundColor: '#f0f0f0', marginLeft: 'auto', maxWidth: '70%' }}
            >
              <Text>Hello, can you help me understand how neural networks work?</Text>
            </Paper>

            {/* AI response */}
            <Paper 
              shadow="sm" 
              p="md" 
              withBorder 
              mb="md" 
              style={{ backgroundColor: '#e6f7ff', maxWidth: '70%' }}
            >
              <Text>Certainly! Neural networks are a type of machine learning model inspired by the human brain. They consist of interconnected nodes (neurons) organized in layers. Here's a basic overview:</Text>
              <Text mt="xs">1. Input Layer: Receives initial data</Text>
              <Text>2. Hidden Layers: Process the information</Text>
              <Text>3. Output Layer: Produces the final result</Text>
              <Text mt="xs">Neural networks learn by adjusting the connections (weights) between neurons based on the difference between predicted and actual outputs.</Text>
            </Paper>

            {/* User message */}
            <Paper 
              shadow="sm" 
              p="md" 
              withBorder 
              mb="md" 
              style={{ backgroundColor: '#f0f0f0', marginLeft: 'auto', maxWidth: '70%' }}
            >
              <Text>That's interesting! Can you give me an example of how they're used in real life?</Text>
            </Paper>

            {/* AI response */}
            <Paper 
              shadow="sm" 
              p="md" 
              withBorder 
              mb="md" 
              style={{ backgroundColor: '#e6f7ff', maxWidth: '70%' }}
            >
              <Text>Absolutely! Neural networks have many real-world applications. Here are a few examples:</Text>
              <Text mt="xs">1. Image Recognition: Used in facial recognition systems and self-driving cars to identify objects in images.</Text>
              <Text>2. Natural Language Processing: Powers chatbots, language translation, and voice assistants like Siri or Alexa.</Text>
              <Text>3. Financial Forecasting: Used to predict stock prices and detect fraudulent transactions.</Text>
              <Text>4. Medical Diagnosis: Assists in analyzing medical images to detect diseases like cancer.</Text>
              <Text mt="xs">These are just a few examples. Neural networks are versatile and can be applied to many complex problems across various industries.</Text>
            </Paper>
          </Box>
        </Box>
        
        <Box 
          style={{ 
            position: 'sticky', 
            bottom: 20, 
            width: '100%', 
            maxWidth: '800px', 
            margin: '0 auto',
            transition: 'transform 300ms ease',
            transform: isNavbarVisible ? `translateX(calc(${navbarWidth} / 2))` : 'none',
          }}
        >
          <OChatInput 
            isNavbarVisible={isNavbarVisible}
            navbarWidth={navbarWidth}
            onSendMessage={handleSendMessage}
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}