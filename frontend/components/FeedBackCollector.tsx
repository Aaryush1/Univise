import React, { useState } from 'react';
import { Paper, Text, Rating, Textarea, Button, Stack, useMantineTheme } from '@mantine/core';

interface FeedbackCollectorProps {
  onSubmit: (rating: number, comment: string) => void;
}

export function FeedbackCollector({ onSubmit }: FeedbackCollectorProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const theme = useMantineTheme();

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={500}>
          How was your experience?
        </Text>
        <Rating value={rating} onChange={setRating} size="lg" />
        <Textarea
          placeholder="Any additional comments?"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          minRows={3}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={rating === 0}
          style={{ backgroundColor: theme.colors.teal[6] }}
        >
          Submit Feedback
        </Button>
      </Stack>
    </Paper>
  );
}