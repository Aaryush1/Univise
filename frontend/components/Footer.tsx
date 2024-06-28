"use client"

import React from 'react';
import { Box, Container, Text, Anchor, Group, useMantineTheme } from '@mantine/core';

export const Footer: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Box component="footer" bg={theme.colors.gray[0]} py={theme.spacing.xl}>
      <Container size={theme.breakpoints.lg}>
        <Text c="dimmed" ta="center" size={theme.fontSizes.sm}>
          © {new Date().getFullYear()} Univise.org. All rights reserved.
        </Text>
        <Group justify="center" mt={theme.spacing.xs}>
          <Anchor href="/privacy" c={theme.colors.blue[6]} size={theme.fontSizes.sm}>
            Privacy Policy
          </Anchor>
          <Text c="dimmed" size={theme.fontSizes.sm}>|</Text>
          <Anchor href="/terms" c={theme.colors.blue[6]} size={theme.fontSizes.sm}>
            Terms of Service
          </Anchor>
        </Group>
      </Container>
    </Box>
  );
};