# 聖大資訊 Landing Page 重構實施計劃

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將傳統靜態網站重構為現代 Next.js 應用，包含深淺色模式、多語言支援、流暢動畫與響應式設計

**Architecture:** 使用 React Context 管理主題與語言狀態，建立模組化組件系統，整合現有組件與新增缺失組件，使用 Tailwind CSS + Framer Motion 實現現代簡約風格

**Tech Stack:** Next.js 16.2.3 (App Router), TypeScript, Tailwind CSS v4, Framer Motion 12.38.0, lucide-react 1.8.0, React Context API

---

## Phase 1: 基礎架構與 Context

### Task 1: 建立 ThemeContext

**Files:**
- Create: `components/context/ThemeContext.tsx`
- Create: `components/context/index.tsx`

- [ ] **Step 1: 建立 ThemeContext 類型定義與初始值**

```typescript
// components/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

- [ ] **Step 2: 建立 index.tsx 匯出所有 Context**

```typescript
// components/context/index.tsx
export { ThemeProvider, useTheme } from './ThemeContext';
```

- [ ] **Step 3: 提交變更**

```bash
git add components/context/ThemeContext.tsx components/context/index.tsx
git commit -m "feat: add ThemeContext for theme management"
```

### Task 2: 建立 LanguageContext

**Files:**
- Create: `components/context/LanguageContext.tsx`
- Modify: `components/context/index.tsx`

- [ ] **Step 1: 建立 LanguageContext 類型定義與翻譯資料**

```typescript
// components/context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻譯資料庫
const translations = {
  zh: {
    // 導航
    'nav.home': '首頁',
    'nav.about': '關於公司',
    'nav.services': '提供服務',
    'nav.portfolio': '建置案例',
    'nav.contact': '聯絡我們',
    'nav.language': 'EN/中文',
    'nav.languageSwitch': '切換語言 / Switch Language',
    
    // 按鈕
    'button.learnMore': '深入了解',
    'button.consultNow': '立即諮詢',
    'button.getQuote': '獲取報價',
    'button.viewDetails': '查看詳細資訊',
    'button.sendMessage': '傳送訊息',
    'button.subscribe': '訂閱',
    
    // 通用
    'common.readMore': '閱讀更多',
    'common.scrollDown': '向下滾動',
    'common.exploreMore': '探索更多',
    'common.allRightsReserved': '版權所有',
    'common.backToTop': '回到頂部',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.language': 'EN/中文',
    'nav.languageSwitch': 'Switch Language / 切換語言',
    
    // Buttons
    'button.learnMore': 'Learn More',
    'button.consultNow': 'Consult Now',
    'button.getQuote': 'Get Quote',
    'button.viewDetails': 'View Details',
    'button.sendMessage': 'Send Message',
    'button.subscribe': 'Subscribe',
    
    // Common
    'common.readMore': 'Read More',
    'common.scrollDown': 'Scroll Down',
    'common.exploreMore': 'Explore More',
    'common.allRightsReserved': 'All Rights Reserved',
    'common.backToTop': 'Back to Top',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'zh' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
```

- [ ] **Step 2: 更新 index.tsx 匯出 LanguageContext**

```typescript
// components/context/index.tsx
export { ThemeProvider, useTheme } from './ThemeContext';
export { LanguageProvider, useLanguage } from './LanguageContext';
```

- [ ] **Step 3: 提交變更**

```bash
git add components/context/LanguageContext.tsx components/context/index.tsx
git commit -m "feat: add LanguageContext with translations"
```

### Task 3: 建立 Providers 組合

**Files:**
- Create: `app/providers.tsx`

- [ ] **Step 1: 建立 Providers 組合組件**

```typescript
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
    <ThemeProvider defaultTheme="light">
      <LanguageProvider defaultLanguage="zh">
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: 提交變更**

```bash
git add app/providers.tsx
git commit -m "feat: create Providers wrapper component"
```

### Task 4: 更新根佈局包含 Providers

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 更新 layout.tsx 包含 Providers**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "聖大資訊 - 二手電腦專家 | Shangda PC",
  description: "專業的二手電腦銷售、租賃、維修與企業 IT 解決方案服務",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 提交變更**

```bash
git add app/layout.tsx
git commit -m "feat: update layout to include Providers"
```

## Phase 2: UI 基礎組件

### Task 5: 建立 Button 組件

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: 建立 Button 組件與變體**

```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25': variant === 'default',
            'border-2 border-primary bg-transparent text-primary hover:bg-primary/10': variant === 'outline',
            'bg-transparent text-foreground hover:bg-accent/10': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
            'px-8 py-4 text-lg': size === 'lg',
            'px-6 py-3 text-base': size === 'default',
            'px-4 py-2 text-sm': size === 'sm',
            'p-2': size === 'icon',
          },
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

- [ ] **Step 2: 建立工具函數檔案**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: 提交變更**

```bash
git add components/ui/Button.tsx lib/utils.ts
git commit -m "feat: create reusable Button component with variants"
```

### Task 6: 建立 Card 組件

**Files:**
- Create: `components/ui/Card.tsx`

- [ ] **Step 1: 建立 Card 組件**

```typescript
// components/ui/Card.tsx
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, glass = true, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
        className={cn(
          'rounded-2xl border border-border transition-all',
          {
            'glass hover:border-primary/30 hover-lift': glass,
            'bg-card': !glass,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
```

- [ ] **Step 2: 提交變更**

```bash
git add components/ui/Card.tsx
git commit -m "feat: create reusable Card component with glass effect"
```

### Task 7: 建立 Input 組件

**Files:**
- Create: `components/ui/Input.tsx`

- [ ] **Step 1: 建立 Input 組件**

```typescript
// components/ui/Input.tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

- [ ] **Step 2: 提交變更**

```bash
git add components/ui/Input.tsx
git commit -m "feat: create Input component with label and error support"
```

### Task 8: 建立 TextArea 組件

**Files:**
- Create: `components/ui/TextArea.tsx`

- [ ] **Step 1: 建立 TextArea 組件**

```typescript
// components/ui/TextArea.tsx
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors',
            'placeholder:text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-none',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
```

- [ ] **Step 2: 提交變更**

```bash
git add components/ui/TextArea.tsx
git commit -m "feat: create TextArea component for form messages"
```

## Phase 3: 新增組件

### Task 9: 建立 ThemeToggle 組件

**Files:**
- Create: `components/layout/ThemeToggle.tsx`

- [ ] **Step 1: 建立 ThemeToggle 組件**

```typescript
// components/layout/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </motion.div>
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </Button>
  );
}
```

- [ ] **Step 2: 提交變更**

```bash
git add components/layout/ThemeToggle.tsx
git commit -m "feat: create ThemeToggle component with animations"
```

### Task 10: 建立 ContactSection 組件

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: 建立 ContactSection 組件結構**

```typescript
// components/sections/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useLanguage } from '@/components/context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // 3秒後重置成功狀態
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: '電話 / Phone',
      content: '+886-926577858',
      link: 'tel:+886926577858',
    },
    {
      icon: Mail,
      title: '電子郵件 / Email',
      content: 'qazxsw9295@gmail.com',
      link: 'mailto:qazxsw9295@gmail.com',
    },
    {
      icon: MapPin,
      title: '地址 / Address',
      content: '新竹市東區大學路1001號',
      enContent: 'No. 1001, University Rd., East Dist., Hsinchu City',
    },
    {
      icon: Clock,
      title: '營業時間 / Business Hours',
      content: '週一至週五 09:00-18:00',
      enContent: 'Monday to Friday 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            聯絡我們 / Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            立即聯絡我們
            <span className="block text-xl sm:text-2xl text-muted mt-3 font-normal">
              Get In Touch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            有任何問題或需要報價嗎？請填寫以下表單或直接聯絡我們，我們將盡快回覆您。
            <span className="block text-sm text-muted mt-2">
              Have questions or need a quote? Fill out the form below or contact us directly. We'll get back to you as soon as possible.
            </span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">
                傳送訊息 / Send Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">訊息已傳送成功！</h4>
                  <p className="text-muted">我們會盡快回覆您，謝謝。</p>
                  <p className="text-sm text-muted mt-2">Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="姓名 / Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="請輸入您的姓名"
                    />
                    <Input
                      label="電子郵件 / Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <Input
                    label="電話 / Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+886 912 345 678"
                  />
                  
                  <TextArea
                    label="訊息內容 / Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="請詳細描述您的需求..."
                    rows={5}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '傳送中...' : '傳送訊息'}
                    <Send className="w-4 h-4" />
                    <span className="text-sm opacity-80">Send Message</span>
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground/80 hover:text-accent transition-colors block"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-foreground/80">
                          {info.content}
                        </p>
                      )}
                      {info.enContent && (
                        <p className="text-sm text-muted mt-1">
                          {info.enContent}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h4 className="font-bold text-lg mb-4">
                  社交媒體 / Social Media
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'LINE', color: 'bg-green-500', href: 'https://lin.ee/6GugdVj' },
                    { name: 'Facebook', color: 'bg-blue-600', href: '#' },
                    { name: 'Instagram', color: 'bg-pink-500', href: '#' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
```

- [ ] **Step 2: 提交變更**

```bash
git add components/sections/ContactSection.tsx
git commit -m "feat: create ContactSection with form and contact info"
```

### Task 11: 建立 Footer 組件

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: 建立 Footer 組件**

```typescript
// components/layout/Footer.tsx
'use client';

import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/context/LanguageContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '快速連結',
      enTitle: 'Quick Links',
      links: [
        { href: '#about', label: '關於公司', enLabel: 'About' },
        { href: '#services', label: '提供服務', enLabel: 'Services' },
        { href: '#portfolio', label: '建置案例', enLabel: 'Portfolio' },
        { href: '#contact', label: '聯絡我們', enLabel: 'Contact' },
      ],
    },
    {
      title: '服務項目',
      enTitle: 'Services',
      links: [
        { label: '軟硬體維修', enLabel: 'Hardware & Software Repair' },
        { label: '企業設定', enLabel: 'Enterprise Configuration' },
        { label: '資料備份', enLabel: 'Data Backup' },
        { label: '技術支援', enLabel: 'Technical Support' },
      ],
    },
  ];

  const contactInfo = [
    { icon: Phone, text: '+886-926577858' },
    { icon: Mail, text: 'qazxsw9295@gmail.com' },
    { icon: MapPin, text: '新竹市東區大學路1001號', enText: 'No. 1001, University Rd., East Dist., Hsinchu City' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                聖大資訊
                <span className="block text-lg text-muted font-normal mt-1">Shangda PC</span>
              </h3>
              <p className="text-foreground/70 mb-6">
                專業的二手電腦銷售、租賃、維修與企業 IT 解決方案服務。
                <span className="block text-sm text-muted mt-2">
                  Professional used computer sales, rental, maintenance, and enterprise IT solutions.
                </span>
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5 text-foreground/70" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold mb-4">
                  {section.title}
                  <span className="block text-sm text-muted font-normal mt-1">
                    {section.enTitle}
                  </span>
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-foreground/70 hover:text-primary transition-colors inline-block"
                        >
                          {link.label}
                          <span className="block text-xs text-muted">
                            {link.enLabel}
                          </span>
                        </Link>
                      ) : (
                        <span className="text-foreground/70 inline-block">
                          {link.label}
                          <span className="block text-xs text-muted">
                            {link.enLabel}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-4">
                聯絡資訊
                <span className="block text-sm text-muted font-normal mt-1">
                  Contact Information
                </span>
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary mt-0.5" />
                    </div>
                    <div>
                      <p className="text-foreground/70">
                        {info.text}
                      </p>
                      {info.enText && (
                        <p className="text-xs text-muted mt-1">
                          {info.enText}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-border text-center"
          >
            <p className="text-foreground/60 text-sm">
              © {currentYear} 聖大資訊有限公司. {t('common.allRightsReserved')}
              <span className="block text-xs text-muted mt-1">
                Shangda Co., Ltd. All rights reserved.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: 提交變更**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: create Footer component with contact info and links"
```

### Task 12: 建立 ScrollToTop 組件

**Files:**
- Create: `components/sections/ScrollToTop.tsx`

- [ ] **Step 1: 建立 ScrollToTop 組件**

```typescript
// components/sections/ScrollToTop.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/components/context/LanguageContext';

const ScrollToTop = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full shadow-lg"
            aria-label={t('common.backToTop')}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
```

- [ ] **Step 2: 提交變更**

```bash
git add components/sections/ScrollToTop.tsx
git commit -m "feat: create ScrollToTop component with scroll detection"
```

## Phase 4: 更新現有組件

### Task 13: 更新 Navbar 組件

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: 更新 Navbar 整合 ThemeToggle 與語言切換**

```typescript
// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/components/context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: t('nav.about'), enLabel: 'About' },
    { href: '#services', label: t('nav.services'), enLabel: 'Services' },
    { href: '#portfolio', label: t('nav.portfolio'), enLabel: 'Portfolio' },
    { href: '#contact', label: t('nav.contact'), enLabel: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            聖大資訊
            <span className="block text-sm font-normal text-muted">Shangda PC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-foreground/5"
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium">
                {language === 'zh' ? 'EN' : '中文'}
              </span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="glass rounded-xl p-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors w-full py-2"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">{t('nav.languageSwitch')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: 提交變更**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: update Navbar with ThemeToggle and language support"
```

### Task 14: 更新現有組件支援多語言

**Files:**
- Modify: `components/sections/HeroSection.tsx`
- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ServicesSection.tsx`
- Modify: `components/sections/PortfolioSection.tsx`

- [ ] **Step 1: 更新 HeroSection 使用翻譯函數**

```typescript
// 在 components/sections/HeroSection.tsx 頂部添加
import { useLanguage } from '@/components/context/LanguageContext';

// 在組件內部添加
const { t } = useLanguage();

// 更新按鈕文字：
// 第107行：{t('button.learnMore')}
// 第117行：{t('button.consultNow')}
// 第134行：{t('common.exploreMore')}
```

- [ ] **Step 2: 更新 AboutSection 使用翻譯函數**

```typescript
// 在 components/sections/AboutSection.tsx 頂部添加
import { useLanguage } from '@/components/context/LanguageContext';

// 在組件內部添加
const { t } = useLanguage();

// 更新按鈕文字：
// 第187行：{t('button.learnMore')}
```

- [ ] **Step 3: 更新 ServicesSection 使用翻譯函數**

```typescript
// 在 components/sections/ServicesSection.tsx 頂部添加
import { useLanguage } from '@/components/context/LanguageContext';

// 在組件內部添加
const { t } = useLanguage();

// 更新按鈕文字：
// 第208行：{t('button.getQuote')}
// 第245行：{t('button.consultNow')}
```

- [ ] **Step 4: 更新 PortfolioSection 使用翻譯函數**

```typescript
// 在 components/sections/PortfolioSection.tsx 頂部添加
import { useLanguage } from '@/components/context/LanguageContext';

// 在組件內部添加
const { t } = useLanguage();

// 更新按鈕文字：
// 第268行：{t('button.viewDetails')}
```

- [ ] **Step 5: 提交所有更新**

```bash
git add components/sections/HeroSection.tsx components/sections/AboutSection.tsx components/sections/ServicesSection.tsx components/sections/PortfolioSection.tsx
git commit -m "feat: update existing sections with language support"
```

## Phase 5: 主頁面整合

### Task 15: 重寫主頁面

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: 重寫 page.tsx 整合所有組件**

```typescript
// app/page.tsx
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/sections/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
```

- [ ] **Step 2: 提交變更**

```bash
git add app/page.tsx
git commit -m "feat: rewrite main page integrating all components"
```

## Phase 6: 最終優化與測試

### Task 16: 更新 globals.css 添加主題腳本

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: 在 globals.css 開頭添加主題腳本**

```css
/* app/globals.css */
/* Theme script to prevent flash */
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      function getInitialTheme() {
        const persistedTheme = localStorage.getItem('theme');
        const hasPersistedPreference = typeof persistedTheme === 'string';
        
        if (hasPersistedPreference) {
          return persistedTheme;
        }
        
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }
        
        return 'light';
      }
      
      const theme = getInitialTheme();
      const root = document.documentElement;
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    })();
  `
}} />
```

- [ ] **Step 2: 更新 ThemeContext 支援 localStorage**

```typescript
// 在 components/context/ThemeContext.tsx 中更新 useEffect
useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
}, [theme]);

// 更新初始主題邏輯
const [theme, setTheme] = useState<Theme>(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  }
  return defaultTheme;
});
```

- [ ] **Step 3: 提交變更**

```bash
git add app/globals.css components/context/ThemeContext.tsx
git commit -m "feat: add theme persistence and prevent flash"
```

### Task 17: 執行開發伺服器測試

**Files:**
- Test: 完整應用程式

- [ ] **Step 1: 啟動開發伺服器**

```bash
npm run dev
```

- [ ] **Step 2: 檢查瀏覽器輸出**

打開 http://localhost:3000 檢查：
1. 所有組件是否正確顯示
2. 深淺色模式切換是否正常
3. 語言切換是否正常
4. 表單功能是否正常
5. 動畫效果是否流暢
6. 響應式設計是否正常

- [ ] **Step 3: 檢查控制台錯誤**

打開瀏覽器開發者工具，檢查：
1. 是否有 JavaScript 錯誤
2. 是否有 React hydration 錯誤
3. 是否有 CSS 錯誤

- [ ] **Step 4: 提交最終版本**

```bash
git add .
git commit -m "feat: complete landing page refactor with theme, language, and all components"
```

## 自我審查檢查清單

### ✅ 規格覆蓋檢查
1. **聯絡我們區塊** - Task 10: ContactSection
2. **頁尾組件** - Task 11: Footer  
3. **深淺色模式切換** - Tasks 1, 9, 16
4. **多語言支援** - Tasks 2, 13, 14
5. **主頁面整合** - Task 15
6. **UI 基礎組件** - Tasks 5-8
7. **回到頂部按鈕** - Task 12
8. **現有組件更新** - Task 13, 14

### ✅ 佔位符檢查
- 所有任務都有完整的程式碼範例
- 沒有 TBD、TODO 或模糊描述
- 所有步驟都有具體的執行指令

### ✅ 類型一致性檢查
- 所有 Context 類型定義一致
- 組件屬性類型一致
- 函數簽名一致

---

**計劃完成並儲存至 `docs/superpowers/plans/2026-04-12-landing-page-refactor-implementation.md`**

**兩個執行選項：**

**1. 子代理驅動（推薦）** - 每個任務派遣新的子代理，任務間審查，快速迭代

**2. 內聯執行** - 在此會話中使用 executing-plans 執行任務，批次執行與檢查點

**哪種方法？**