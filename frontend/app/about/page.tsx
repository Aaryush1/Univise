"use client"

import React from 'react'
import { Container, Title, Text, Group } from '@mantine/core'
import { Navigation } from '@/components/Navagation'
import { UserProfileCard } from '@/components/UserProfileCard'

export default function AboutPage() {
  const handleEditProfile = () => {
    // Handle edit profile action
    console.log('Edit profile clicked');
  };

  return (
    <Container>
      <Navigation />
      <Title order={1}>About Univise</Title>
      <Text>Univise is a platform for university students to connect and share advice.</Text>
      
      <Group mt="xl">
        <UserProfileCard
          name="John Doe"
          email="john.doe@example.com"
          avatar="https://example.com/avatar.jpg"
          program="Computer Science"
          onEdit={handleEditProfile}
        />
      </Group>
    </Container>
  )
}