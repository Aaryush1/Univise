import React from 'react';
import { Analytics } from '@vercel/analytics/next';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return <>
    {children}
    <Analytics />
  </>;
};

export default RootLayout;
