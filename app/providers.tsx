// app/providers.tsx
'use client';

import { ThemeProvider } from '@/components/context/ThemeContext';
import { LanguageProvider } from '@/components/context/LanguageContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <LanguageProvider defaultLanguage="zh">
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}