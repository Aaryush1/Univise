"use client"

import React from 'react';
import { Card as MuiCard, CardContent, CardProps as MuiCardProps, Typography, useTheme } from '@mui/material';

interface CardProps extends Omit<MuiCardProps, 'content'> {
  title?: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, content, children, ...props }) => {
  const theme = useTheme();

  return (
    <MuiCard 
      {...props} 
      sx={{ 
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        ...props.sx
      }}
    >
      <CardContent>
        {title && <Typography variant="h6" gutterBottom color="primary">{title}</Typography>}
        {content}
        {children}
      </CardContent>
    </MuiCard>
  );
};