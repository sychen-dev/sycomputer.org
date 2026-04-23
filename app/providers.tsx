'use client';

import { ThemeProvider } from '@/components/context/ThemeContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      {children}
    </ThemeProvider>
  );
}