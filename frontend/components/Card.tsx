"use client"

import React from 'react';
import { Card as MantineCard, Text, CardProps as MantineCardProps, useMantineTheme } from '@mantine/core';

type CardProps = MantineCardProps & {
  title?: string;
  content?: React.ReactNode;
};

export const Card: React.FC<CardProps> & {
  Section: typeof MantineCard.Section;
} = ({ title, content, children, ...props }) => {
  const theme = useMantineTheme();

  return (
    <MantineCard 
      padding={theme.spacing.md}
      radius={theme.radius.md}
      shadow={theme.shadows.sm}
      withBorder
      {...props}
    >
      {title && (
        <Text fw={600} size="lg" c={theme.colors.blue[6]} mb={theme.spacing.md}>
          {title}
        </Text>
      )}
      {content && (
        <Card.Section inheritPadding py={theme.spacing.xs}>
          {content}
        </Card.Section>
      )}
      {children}
    </MantineCard>
  );
};

Card.Section = MantineCard.Section;