// components/Chat.tsx
'use client';

import { Box, Typography, Stack } from '@mui/material';
import UniviseButton from './AdvisorPage/UniviseButton';
import CapabilitiesButton from './AdvisorPage/CapabilitiesButton';
import SampleQuestions from './AdvisorPage/SampleQuestions';
import QuestionInput from './AdvisorPage/QuestionInput';

export default function Chat() {
  return (
    <Stack
      sx={{
        height: '100vh', // Use 100% of the viewport height
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'space-between', // Space between items
        padding: 4,
        overflow: 'hidden', // Hide overflow to prevent scrolling
      }}
    >
      {/* Top buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <UniviseButton />
        <CapabilitiesButton />
      </Box>

      {/* Title and Subtext */}
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Univise 0.1.0
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Subtext description of model
        </Typography>
      </Box>

      {/* Sample Questions and Input */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <SampleQuestions />
        <QuestionInput />
      </Box>

      {/* The Footer is rendered by the layout component, so it's not included here */}
    </Stack>
  );
}
