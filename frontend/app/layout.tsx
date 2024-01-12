import React from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'Univise',
  description: 'Transforming undergraduate academic advising using LLM techology.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" style={{ padding: 0, margin: 0 }}>
      <Head>
        <title>Univise</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <body style={{ padding: 0, margin: 0 }}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;