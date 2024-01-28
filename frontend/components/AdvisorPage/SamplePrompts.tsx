import React from 'react';
import { Box, Button } from '@mui/material';
import styles from '../../styles/ChatState.module.css'; // Import the CSS Module

interface SamplePromptsProps {
  onSamplePrompt: (prompt: string) => void;
}

const SamplePrompts: React.FC<SamplePromptsProps> = ({ onSamplePrompt }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
      <Button sx={{ borderRadius: '50px', px: 2, textAlign: 'center', backgroundColor: 'white', border: '2px solid black', color: 'black', cursor: 'pointer', textTransform: 'capitalize' }} onClick={() => onSamplePrompt("What are some good literature electives?")}>
        What are some good literature electives? 
      </Button>
      <Button sx={{ borderRadius: '50px', px: 2, textAlign: 'center', backgroundColor: 'white', border: '2px solid black', color: 'black', cursor: 'pointer', textTransform: 'capitalize' }} onClick={() => onSamplePrompt("Help me plan for graduation...")}>
        Help me plan for graduation...
      </Button>
    </Box>
  );
};
