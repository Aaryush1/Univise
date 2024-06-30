// app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import { Button, Container, Title, Text, Stack } from '@mantine/core';
import { signInWithGoogle } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (user) {
    return null; // or a loading spinner
  }

  return (
    <Container size="sm">
      <Stack align="center" mt="xl">
        <Title order={1}>Welcome</Title>
        <Text>Please sign in with your university email to continue.</Text>
        <Button onClick={handleLogin} size="lg">
          Sign in with Google
        </Button>
      </Stack>
    </Container>
  );
}