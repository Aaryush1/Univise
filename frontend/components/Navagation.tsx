"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from './LogoutButton'
import { auth } from '@/services/firebase'

export function Navigation(): JSX.Element {
  const pathname: string = usePathname()

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/about' ? 'active' : ''}`}
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/chats' ? 'active' : ''}`}
            href="/chats"
          >
            Chats List
          </Link>
        </li>
        {!auth.currentUser ? (
          <li>
            <Link
              className={`link ${pathname === '/login' ? 'active' : ''}`}
              href="/login"
            >
              Login
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link
                className={`link ${pathname === '/chat/new' ? 'active' : ''}`}
                href="/chat/new"
              >
                New Chat
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}