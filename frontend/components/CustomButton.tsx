"use client"

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, useTheme } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  // Add any additional props here
}

export const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();

  return (
    <MuiButton
      {...props}
      sx={{
        borderRadius: '9999px',
        padding: theme.spacing(1, 2),
        ...props.sx,
      }}
    />
  );
};