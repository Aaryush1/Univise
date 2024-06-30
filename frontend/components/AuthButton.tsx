'use client';

import React from 'react';
import { Button, Menu, Avatar, Text } from '@mantine/core';
import { IconUser, IconUserCircle, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/services/firebase';
import { useRouter } from 'next/navigation';

export function AuthButton(): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <Button onClick={() => router.push('/login')} variant="filled" color="blue">
        Login
      </Button>
    );
  }

  return (
    <Menu position="bottom-end" withArrow shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          leftSection={
            user.photoURL ? (
              <Avatar src={user.photoURL} size="sm" radius="xl" />
            ) : (
              <Avatar color="blue" radius="xl">
                <IconUser size="1rem" />
              </Avatar>
            )
          }
        >
          <Text size="sm" fw={500} truncate>
            {user.displayName || user.email}
          </Text>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconUserCircle size="1rem" />}
          onClick={() => router.push('/profile')}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconLogout size="1rem" />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}