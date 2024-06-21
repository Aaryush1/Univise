'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle } from '@/services/firebase'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithGoogle()
      router.push('/chats')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      <h1>Login to Univise</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  )
}