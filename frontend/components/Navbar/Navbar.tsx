// components/Navbar/Navbar.tsx
import React from 'react';
import { Box, ScrollArea, Text, ActionIcon, Transition } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface NavbarProps {
  isVisible: boolean;
  onClose: () => void;
}

export function Navbar({ isVisible, onClose }: NavbarProps) {
  return (
    <Transition mounted={isVisible} transition="slide-right" duration={300}>
      {(styles) => (
        <Box
          style={{
            ...styles,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '300px',
            height: '100vh',
            backgroundColor: 'var(--mantine-color-body)',
            borderRight: '1px solid var(--mantine-color-gray-2)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Text size="xl" fw={700}>Navbar Title</Text>
            <ActionIcon
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={onClose}
            >
              <IconX size={20} />
            </ActionIcon>
          </Box>
          <ScrollArea style={{ flex: 1 }}>
            <Box p="md">
              {/* Example content */}
              {Array(20).fill(0).map((_, index) => (
                <Text key={index} my="sm">Navbar Item {index + 1}</Text>
              ))}
            </Box>
          </ScrollArea>
        </Box>
      )}
    </Transition>
  );
}