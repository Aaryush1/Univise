import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme/theme';
import '@mantine/core/styles.css';
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'My Mantine App',
  description: 'App using Next.js 14 and Mantine UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <ColorSchemeScript/>
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}