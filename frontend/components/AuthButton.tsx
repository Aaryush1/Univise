import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Menu, Avatar, Text, MantineProvider } from '@mantine/core';
import { signOut, auth } from '@/services/firebase';
import { IconUser, IconUserCircle, IconLogout } from '@tabler/icons-react';
import { theme } from '@/theme/theme'; // Import your custom theme

export function AuthButton(): JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <MantineProvider theme={theme}>
      {user ? (
        <Menu position="bottom-end" withArrow shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="subtle"
              leftSection={
                user.photoURL ? (
                  <Avatar src={user.photoURL} size="sm" radius="xl" />
                ) : (
                  <Avatar color="blue" radius="xl">
                    <IconUser size={theme.fontSizes!.md} />
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
              leftSection={<IconUserCircle size={theme.fontSizes!.md} />}
              onClick={() => router.push('/profile')}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={theme.fontSizes!.md} />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button
          onClick={handleLogin}
          variant="filled"
          color="blue"
          radius={theme.radius!.md}
        >
          Login
        </Button>
      )}
    </MantineProvider>
  );
}