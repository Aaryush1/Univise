"use client"

import React from 'react';
import { AppShell, Container, useMantineTheme } from '@mantine/core';
import { Footer } from './Footer';
import { Navigation } from './Navagation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      styles={{
        main: {
          backgroundColor: theme.colors.gray[0],
          minHeight: '100vh',
        },
      }}
    >
      <AppShell.Header>
        <Navigation />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py={theme.spacing.xl}>
          {children}
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};