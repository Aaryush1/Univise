// app/about/page.tsx
"use client"

import React from 'react'
import { Container, Title, Text } from '@mantine/core'
import { Navigation } from '@/components/Navagation'

export default function AboutPage() {
  return (
    <Container>
      <Navigation />
      <Title order={1}>About Univise</Title>
      <Text>Univise is a platform for university students to connect and share advice.</Text>
    </Container>
  )
}