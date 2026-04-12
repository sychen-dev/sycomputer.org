'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 安全地驗證 theme 值
const isValidTheme = (value: unknown): value is Theme => {
  return value === 'light' || value === 'dark';
};

// 安全地從 localStorage 讀取 theme
const getThemeFromLocalStorage = (storageKey: string): Theme | null => {
  try {
    if (typeof window === 'undefined') {
      return null; // SSR 時返回 null
    }

    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return null;

    return isValidTheme(storedValue) ? storedValue : null;
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
    return null;
  }
};

// 安全地設置 theme 到 localStorage
const setThemeToLocalStorage = (storageKey: string, theme: Theme): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};

// 獲取系統偏好 theme
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'; // SSR 時返回預設值
  }

  try {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  } catch (error) {
    console.warn('Failed to get system theme preference:', error);
    return 'light';
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 在客戶端 mounted 後初始化 theme
  useEffect(() => {
    setMounted(true);

    // 從 localStorage 讀取 theme
    const storedTheme = getThemeFromLocalStorage(storageKey);

    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      // 使用系統偏好
      const systemTheme = getSystemTheme();
      setThemeState(systemTheme);
      // 保存系統偏好到 localStorage
      setThemeToLocalStorage(storageKey, systemTheme);
    }
  }, [storageKey]);

  // 應用 theme 到 document 和保存到 localStorage
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // 移除所有可能的 theme classes
    root.classList.remove('light', 'dark');
    // 添加當前 theme class
    root.classList.add(theme);

    // 保存 theme 偏好
    setThemeToLocalStorage(storageKey, theme);
  }, [theme, mounted, storageKey]);

  // 監聽系統 theme 變化
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在沒有手動設置 theme 時才跟隨系統變化
      const storedTheme = getThemeFromLocalStorage(storageKey);
      if (!storedTheme) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    // 使用 addEventListener 以支援現代瀏覽器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // 舊瀏覽器支援
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [mounted, storageKey]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // 使用 useMemo 優化 context value
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme
  }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};