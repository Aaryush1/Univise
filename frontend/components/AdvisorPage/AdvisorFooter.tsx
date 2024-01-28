import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import FeedbackPopup from './FeedbackPopup';
import styles from '../../styles/AdvisorFooter.module.css'; // Import the CSS Module
import CircularProgress from '@mui/material/CircularProgress';


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
    <div className={styles.advisorFooter}>
      <button className={styles.capabilitiesButton} onClick={onOpenCapabilities}>
        Capabilities
      </button>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Ask any question ..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.advisorFooterInput} 
          disabled={isLoading}
        />
        <button className={styles.sendButton} onClick={handleSendClick} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
        </button>
      </div>

      <button className={styles.feedbackButton} onClick={handleOpenFeedback}>
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
