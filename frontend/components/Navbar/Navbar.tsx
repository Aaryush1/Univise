import React from 'react';
import { ScrollArea, Text, Box } from '@mantine/core';

export function Navbar() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Text size="xl" fw={700}>Navbar Title</Text>
      </Box>
      <ScrollArea style={{ flex: 1 }}>
        <Box p="md">
          {Array(20).fill(0).map((_, index) => (
            <Text key={index} my="sm">Navbar Item {index + 1}</Text>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
}