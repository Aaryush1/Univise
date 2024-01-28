import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send'; // Using only the MUI icon
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
    <div style={{
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
      <button 
        style={{
          fontSize: '1.05rem',
          padding: '14px 22px',
          fontFamily: 'Roboto, sans-serif',
          background: 'none',
          border: 'none',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '100px',
          transition: 'background-color 0.3s',
          cursor: 'pointer'
        }}
        onClick={onOpenCapabilities}
      >
        Capabilities
      </button>

      <div style={{
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
            border: '2px solid black',
            backgroundColor: 'white',
            outline: 'none',
            width: '100%',
            padding: '18px 16px',
            flexGrow: 1,
            fontSize: '1rem'
          }} 
          disabled={isLoading}
        />
        <button 
          onClick={handleSendClick} 
          style={{
            position: 'absolute',
            right: 0,
            padding: '16px',
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
          disabled={isLoading}
        >
          {isLoading ? <span>Loading...</span> : <SendIcon />}
        </button>
      </div>

      <button 
        style={{
          fontSize: '1.05rem',
          padding: '14px 22px',
          fontFamily: 'Roboto, sans-serif',
          background: 'none',
          border: 'none',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '100px',
          transition: 'background-color 0.3s',
          cursor: 'pointer'
        }}
        onClick={handleOpenFeedback}
      >
        Feedback
      </button>

      <FeedbackPopup
        open={isFeedbackPopupOpen}
        onClose={handleCloseFeedback}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
};

export default AdvisorFooter;
