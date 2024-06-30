import React from 'react';
import { Group, Button } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton } from './AuthButton';

const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CHATS: '/chats',
  LOGIN: '/login',
};

export const Navigation = React.memo(function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav aria-label="Main Navigation">
      <Group>
        <Button
          variant={isActive(ROUTES.HOME) ? 'filled' : 'light'}
          onClick={() => router.push(ROUTES.HOME)}
        >
          Home
        </Button>
        <Button
          variant={isActive(ROUTES.ABOUT) ? 'filled' : 'light'}
          onClick={() => router.push(ROUTES.ABOUT)}
        >
          About
        </Button>
        {user && (
          <Button
            variant={isActive(ROUTES.CHATS) ? 'filled' : 'light'}
            onClick={() => router.push(ROUTES.CHATS)}
          >
            Chats
          </Button>
        )}
        {user ? (
          <AuthButton />
        ) : (
          <Button
            variant={isActive(ROUTES.LOGIN) ? 'filled' : 'light'}
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            Login
          </Button>
        )}
      </Group>
    </nav>
  );
});