import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/services/firebase'

export function LogoutButton(): JSX.Element {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}