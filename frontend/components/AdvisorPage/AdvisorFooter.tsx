import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FeedbackPopup from './FeedbackPopup'; // Import the new component

type AdvisorFooterProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
  onOpenCapabilities: () => void;
  isLoading: boolean;
};

const AdvisorFooter: React.FC<AdvisorFooterProps> = ({ question, setQuestion, handleSendClick, onOpenCapabilities, isLoading }) => {
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);

  const handleOpenFeedback = () => {
    setIsFeedbackPopupOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackPopupOpen(false);
  };

  const handleSubmitFeedback = (feedback: string) => {
    console.log('Submitted Feedback:', feedback);
  };

  return (
      <Box style={{
        height: '15vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ff9797',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0 5%',
        boxSizing: 'border-box',
        gap: '50px'
      }}>
      <Button 
        variant="outlined" 
        style={{
          fontSize: '1.05rem',
          padding: '14px 22px',
          fontFamily: 'Roboto, sans-serif',
          background: 'none',
          border: 'none',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '100px',
          transition: 'background-color 0.3s'
        }}
        onClick={onOpenCapabilities}
      >
        Capabilities
      </Button>

      <Box 
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%'
      }}>
        <input
          type="text"
          placeholder="Ask any question ..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            borderRadius: '50px',
            border: ' 2px solid black',
            backgroundColor: 'white',
            outline: 'none',
            width: '100%',
            padding: '18px 16px',
            flexGrow: 1,
            fontSize: '1rem'
          }} 
          disabled={isLoading}
        />
        <IconButton 
        onClick={handleSendClick} 
        style={{
          position: 'absolute',
          right: 0,
          padding: '16px',
          color: 'black'
        }}
        disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>

      <Button 
        variant="outlined" 
        style={{
          fontSize: '1.05rem',
          padding: '14px 22px',
          fontFamily: 'Roboto, sans-serif',
          background: 'none',
          border: 'none',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '100px',
          transition: 'background-color 0.3s'
        }}
        onClick={handleOpenFeedback}
      >
        Feedback
      </Button>

      <FeedbackPopup
        open={isFeedbackPopupOpen}
        onClose={handleCloseFeedback}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </Box>
  );
};

export default AdvisorFooter;
