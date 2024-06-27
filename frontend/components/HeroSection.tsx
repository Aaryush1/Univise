"use client"

import React from 'react';
import { Typography, Button, Container, useTheme } from '@mui/material';

export const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom color="primary">
        Unlimited Access<br />To Your Own<br />AI Academic Advisor
      </Typography>
      <Typography variant="h5" paragraph color="text.secondary">
        Welcome to Univise.org<br />
        Ask AI questions & get instant answers.<br />
        Specific to you & your University/College.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        sx={{ 
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1, 3),
        }}
      >
        Coming Soon
      </Button>
    </Container>
  );
};