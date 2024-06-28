"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthButton } from './AuthButton'
import { auth } from '@/services/firebase'
import { Box, Container, Group, Button, useMantineTheme } from '@mantine/core';

export function Navigation(): JSX.Element {
  const pathname: string = usePathname()
  const theme = useMantineTheme();

  const linkStyle = {
    color: theme.white,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 700,
  };

  return (
    <Box component="header" style={{ backgroundColor: theme.colors.blue[6] }}>
      <Container size="lg" h={60}>
        <Group justify="space-between" h="100%">
          <Group>
            <Button
              component={Link}
              href="/"
              variant="subtle"
              styles={(theme) => ({
                root: pathname === '/' ? activeLinkStyle : linkStyle,
              })}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/about"
              variant="subtle"
              styles={(theme) => ({
                root: pathname === '/about' ? activeLinkStyle : linkStyle,
              })}
            >
              About
            </Button>
            <Button
              component={Link}
              href="/chats"
              variant="subtle"
              styles={(theme) => ({
                root: pathname === '/chats' ? activeLinkStyle : linkStyle,
              })}
            >
              Chats List
            </Button>
          </Group>
          <Group>
            {!auth.currentUser ? (
              <Button
                component={Link}
                href="/login"
                variant="subtle"
                styles={(theme) => ({
                  root: pathname === '/login' ? activeLinkStyle : linkStyle,
                })}
              >
                Login
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/chat/new"
                  variant="subtle"
                  styles={(theme) => ({
                    root: pathname === '/chat/new' ? activeLinkStyle : linkStyle,
                  })}
                >
                  New Chat
                </Button>
                <AuthButton />
              </>
            )}
          </Group>
        </Group>
      </Container>
    </Box>
  )
}