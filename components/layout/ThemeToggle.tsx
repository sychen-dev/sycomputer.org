'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? '切換為深色模式' : '切換為淺色模式'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-soft transition-colors hover:border-soft hover:text-ink"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
