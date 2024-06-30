import React from 'react';
import { Card, Avatar, Text, Group, Button, useMantineTheme } from '@mantine/core';

interface UserProfileCardProps {
  name: string;
  email: string;
  avatar: string;
  program: string;
  onEdit: () => void;
}

export function UserProfileCard({ name, email, avatar, program, onEdit }: UserProfileCardProps) {
  const theme = useMantineTheme();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section py="md" style={{ backgroundColor: theme.colors.teal[1] }}>
        <Avatar src={avatar} size={120} radius={120} mx="auto" />
      </Card.Section>

      <Text ta="center" fz="lg" fw={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email}
      </Text>

      <Group mt="md" justify="space-between">
        <Text fz="sm" fw={500}>
          Program:
        </Text>
        <Text fz="sm" c="dimmed">
          {program}
        </Text>
      </Group>

      <Button variant="light" color="teal" fullWidth mt="md" radius="md" onClick={onEdit}>
        Edit Profile
      </Button>
    </Card>
  );
}