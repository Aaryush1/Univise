import React from 'react';
import { Group, Button, Text, NavLink } from '@mantine/core';
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
  const { user } = useAuth();

  return (
    <nav aria-label="Main Navigation">
      <Group>
        <NavLink href={ROUTES.HOME}>Home</NavLink>
        <NavLink href={ROUTES.ABOUT}>About</NavLink>
        {user && <NavLink href={ROUTES.CHATS}>Chats</NavLink>}
        {user ? (
          <AuthButton />
        ) : (
          <NavLink href={ROUTES.LOGIN}>Login</NavLink>
        )}
      </Group>
    </nav>
  );
});