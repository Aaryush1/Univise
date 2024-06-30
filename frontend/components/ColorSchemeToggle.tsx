// components/ColorSchemeToggle.tsx
'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button 
        onClick={() => setColorScheme('light')} 
        variant={colorScheme === 'light' ? 'filled' : 'outline'}
        color="blue"
      >
        Light
      </Button>
      <Button 
        onClick={() => setColorScheme('dark')}  
        variant={colorScheme === 'dark' ? 'filled' : 'outline'}
        color="pink"
      >
        Dark
      </Button>
      <Button 
        onClick={() => setColorScheme('auto')}  
        variant={colorScheme === 'auto' ? 'filled' : 'outline'}
        color="grape"
      >
        Auto
      </Button>
    </Group>
  );
}