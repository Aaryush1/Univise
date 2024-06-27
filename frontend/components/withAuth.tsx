'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/services/firebase'

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P): JSX.Element | null {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          router.push('/login')
        }
      })

      return () => unsubscribe()
    }, [router])

    if (isAuthenticated === null) {
      // You might want to show a loading spinner here
      return null
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }
}