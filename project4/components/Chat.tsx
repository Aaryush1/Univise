// components/Chat.tsx
'use client';

import { useState } from 'react';
import { Box, Typography, Button, Input, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Placeholder for the send button icon
import InitialState from './AdvisorPage/InitialState'; // Component for the initial state
import ResponseState from './AdvisorPage/ResponseState'; // Component for the response state

export default function Chat() {
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
