import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Univise</h1>
      <p>Connect with your university peers and get advice!</p>
      <Link href="/login">Get Started</Link>
    </div>
  )
}