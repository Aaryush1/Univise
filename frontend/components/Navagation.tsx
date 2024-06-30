// components/Navigation.tsx
import React from 'react';
import { Group, Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton } from './AuthButton';

export function Navigation() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Group>
      <Button onClick={() => router.push('/')}>Home</Button>
      <Button onClick={() => router.push('/about')}>About</Button>
      {user && <Button onClick={() => router.push('/chats')}>Chats</Button>}
      {user ? (
        <AuthButton/>
            ) : (
        <Button onClick={() => router.push('/login')}>Login</Button>
      )}
    </Group>
  );
}