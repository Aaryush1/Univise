"use client"

import { useState, useRef, useEffect } from 'react';
import { AppShell, Box, ActionIcon, Tooltip } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { ChatInput } from '@/components/ChatInput';
import { Navbar } from '@/components/Navbar/Navbar';

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

  return (
    <AppShell padding="md">
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
            width: '55%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 'calc(100vh - 60px)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 300ms ease',
            transform: isNavbarVisible && isPinned ? 'translateX(150px)' : 'translateX(0)',
          }}
        >
          <Box style={{ flexGrow: 1, overflowY: 'auto' }}>
            {/* Main content goes here */}
            Main content
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <p key={index}>This is a paragraph of main content. It's repeated to demonstrate scrolling.</p>
              ))}
          </Box>
          <Box style={{ width: '100%' }}>
            <ChatInput />
          </Box>
        </Box>
      </AppShell.Main>

      <Tooltip label="Open navbar" position="right">
        <ActionIcon
          style={{
            position: 'fixed',
            left: '1rem',
            bottom: '1rem',
            zIndex: 1000,
          }}
          size="lg"
          variant="filled"
          onClick={showNavbar}
        >
          <IconChevronRight size={20} />
        </ActionIcon>
      </Tooltip>
    </AppShell>
  );
}