// advisor/page.tsx
'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import InitialState from '@/components/AdvisorPage/InitialState/InitialState'; // Component for the initial state
import ResponseState from '@/components/AdvisorPage/ResponseState/ResponseState'; // Component for the response state

export default function AdvisorPage() {
  const [question, setQuestion] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSendClick = () => {
    // Placeholder for sending the question
    setHasSubmitted(true);
    // Simulate getting a response here
  };

  return (
    <Box>
      {!hasSubmitted ? (
        <InitialState
          question={question}
          setQuestion={setQuestion}
          handleSendClick={handleSendClick}
        />
      ) : (
        <ResponseState question={question} />
      )}
    </Box>
  );
}
