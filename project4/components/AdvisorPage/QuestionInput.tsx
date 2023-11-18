import { Box, Input, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

const QuestionInput = () => {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    console.log(question);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Input
        placeholder="Ask any question ..."
        fullWidth
        inputProps={{ 'aria-label': 'Ask any question' }}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <IconButton onClick={handleSend} color="primary" size="large">
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default QuestionInput;
