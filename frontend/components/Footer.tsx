"use client"

import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.background.paper, py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Univise.org. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="/privacy" sx={{ color: theme.palette.primary.main }}>
            Privacy Policy
          </Link>
          {' | '}
          <Link color="inherit" href="/terms" sx={{ color: theme.palette.primary.main }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};