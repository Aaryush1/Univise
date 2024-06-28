// app/layout.tsx
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme/theme';
import { Navigation } from '@/components/Navagation';
import '@mantine/core/styles.css';
import { Roboto } from 'next/font/google';


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
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Navigation />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}