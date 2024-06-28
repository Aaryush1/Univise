"use client"

import React from 'react';
import { Title, Text, Button, Container, Stack, useMantineTheme } from '@mantine/core';

export const HeroSection: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Container size="md" py={`calc(${theme.spacing.xl} * 2)`}>
      <Stack align="center" gap={theme.spacing.md}>
        <Title order={1} c={theme.colors.blue[6]} ta="center" style={{ lineHeight: 1.2 }}>
          Unlimited Access<br />To Your Own<br />AI Academic Advisor
        </Title>
        <Text size={theme.fontSizes.xl} c="dimmed" ta="center" mb={theme.spacing.md}>
          Welcome to Univise.org<br />
          Ask AI questions & get instant answers.<br />
          Specific to you & your University/College.
        </Text>
        <Button 
          variant="filled" 
          color="blue" 
          size="lg"
          radius={theme.radius.md}
          px={theme.spacing.xl}
          py={theme.spacing.sm}
        >
          Coming Soon
        </Button>
      </Stack>
    </Container>
  );
};