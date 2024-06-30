import React from 'react';
import { SimpleGrid, Paper, Text, useMantineTheme } from '@mantine/core';

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface AdvisingTopicSelectorProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

export function AdvisingTopicSelector({ topics, onSelectTopic }: AdvisingTopicSelectorProps) {
  const theme = useMantineTheme();

  return (
    <SimpleGrid
      cols={{ base: 1, xs: 2, sm: 3 }}
      spacing={{ base: 'sm', sm: 'md' }}
      verticalSpacing={{ base: 'sm', sm: 'md' }}
    >
      {topics.map((topic) => (
        <Paper
          key={topic.id}
          p="md"
          radius="md"
          shadow="sm"
          onClick={() => onSelectTopic(topic.id)}
          style={{ 
            cursor: 'pointer', 
            transition: theme.other.transition.default,
            '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows.md }
          }}
        >
          {topic.icon}
          <Text ta="center" mt="sm" fw={500}>
            {topic.title}
          </Text>
        </Paper>
      ))}
    </SimpleGrid>
  );
}