"use client"

import { useState, useRef, useEffect } from 'react';
import { AppShell, Box } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { Header } from '@/components/Header';
import { OChatInput } from '@/components/ChatInput/OChatInput';

export default function Page() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNavbar = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsNavbarVisible(true);
  };

  const hideNavbar = () => {
    if (!isPinned) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 300);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    if (!isNavbarVisible) {
      setIsPinned(true);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    setIsNavbarVisible(true);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const navbarWidth = '25vw';

  const handleSendMessage = (message: string) => {
    // Handle sending the message here
    console.log('Sending message:', message);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header onToggleNavbar={toggleNavbar} />
      </AppShell.Header>
      
      <Navbar
        isVisible={isNavbarVisible}
        isPinned={isPinned}
        onPinToggle={togglePin}
        onMouseEnter={showNavbar}
        onMouseLeave={hideNavbar}
      />

      <AppShell.Main>
        <Box
          style={{
            width: '100%',
            minHeight: 'calc(100vh - 60px)', // Subtract header height
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'padding-left 300ms ease',
            paddingLeft: isNavbarVisible && isPinned ? navbarWidth : '0',
          }}
        >
          <Box
            style={{
              width: '55%',
              maxWidth: '800px',
              paddingBottom: '80px', // Space for ChatInput
            }}
          >
            {/* Main content goes here */}
            <h2>Main content</h2>
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <p key={index}>This is a paragraph of main content. It's repeated to demonstrate scrolling.</p>
              ))}
          </Box>
        </Box>

        <Box style={{ position: 'sticky', bottom: 20, width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <OChatInput 
            isNavbarVisible={isNavbarVisible}
            isPinned={isPinned}
            navbarWidth={navbarWidth}
            onSendMessage={handleSendMessage}
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}