import React from 'react';
import { Box, Button } from '@mui/material';

interface SamplePromptsProps {
  onSamplePrompt: (prompt: string) => void;
}

const SamplePrompts: React.FC<SamplePromptsProps> = ({ onSamplePrompt }) => {
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
      <Button style={{ width: '400px', borderRadius: '50px', padding: '8px 16px', textAlign: 'center', backgroundColor: 'white', border: '2px solid black', color: 'black', cursor: 'pointer', textTransform: 'capitalize' }} onClick={() => onSamplePrompt("What are some good literature electives I can take? I want them to be super easy.")}>
        Easy literature electives?
      </Button>
      <Button style={{ width: '400px', borderRadius: '50px', padding: '8px 16px', textAlign: 'center', backgroundColor: 'white', border: '2px solid black', color: 'black', cursor: 'pointer', textTransform: 'capitalize' }} onClick={() => onSamplePrompt("Help me find good classes for Computer Science. I'm a freshman that wants to take classes that will help me with my CS degree.")}>
        Freshman CS Classes?
      </Button>
    </Box>
  );
};

export default SamplePrompts;