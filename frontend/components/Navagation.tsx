"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './LogoutButton'
import { auth } from '@/services/firebase'
import { AppBar, Toolbar, Button, Box, useTheme } from '@mui/material';

export function Navigation(): JSX.Element {
  const pathname: string = usePathname()
  const theme = useTheme();

  const linkStyle = {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    margin: theme.spacing(0, 1),
    '&:hover': {
      textDecoration: 'underline',
    },
  };

  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 'bold',
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Button
            component={Link}
            href="/"
            sx={pathname === '/' ? activeLinkStyle : linkStyle}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/about"
            sx={pathname === '/about' ? activeLinkStyle : linkStyle}
          >
            About
          </Button>
          <Button
            component={Link}
            href="/chats"
            sx={pathname === '/chats' ? activeLinkStyle : linkStyle}
          >
            Chats List
          </Button>
        </Box>
        <Box>
          {!auth.currentUser ? (
            <Button
              component={Link}
              href="/login"
              sx={pathname === '/login' ? activeLinkStyle : linkStyle}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                href="/chat/new"
                sx={pathname === '/chat/new' ? activeLinkStyle : linkStyle}
              >
                New Chat
              </Button>
              <LogoutButton />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}