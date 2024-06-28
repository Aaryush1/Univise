"use client"

import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps, useMantineTheme } from '@mantine/core';

interface ButtonProps extends Omit<MantineButtonProps, 'sx'> {
  // Add any additional props here
  sx?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ sx, ...props }) => {
  const theme = useMantineTheme();

  return (
    <MantineButton
      {...props}
      radius="xl"
      px={theme.spacing.md}
      py={theme.spacing.xs}
      style={{
        ...sx,
      }}
    />
  );
};