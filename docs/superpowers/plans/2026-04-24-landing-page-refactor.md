# Landing Page Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up component boundaries by removing the i18n system, simplifying Framer Motion animations to CSS where possible, and removing dead code — all without changing visual appearance.

**Architecture:** Remove LanguageContext and all translation infrastructure. Create a lightweight `useScrollReveal` hook backed by IntersectionObserver + CSS keyframes to replace Framer Motion `whileInView` usage. Keep Framer Motion only for HeroSection parallax, AnimatePresence (mobile menu, ScrollToTop), and ThemeToggle icon swap. Simplify Button and Card UI components to use plain HTML elements with CSS transitions.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion (reduced), CSS keyframes + IntersectionObserver

---

### Task 1: Add CSS scroll-reveal system

**Files:**
- Create: `lib/useScrollReveal.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `lib/useScrollReveal.ts`**

```ts
'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 2: Add reveal CSS classes to `app/globals.css`**

Append after the existing `.dark .hover-lift:hover` block at the end of the file:

```css
/* Scroll reveal animations */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-left {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-right {
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
.reveal-delay-5 { transition-delay: 0.5s; }
.reveal-delay-6 { transition-delay: 0.6s; }
```

- [ ] **Step 3: Verify build succeeds**

Run: `cd /Users/sychen/sycomputer.org && npx next build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Commit**

```bash
git add lib/useScrollReveal.ts app/globals.css
git commit -m "feat: add CSS scroll-reveal animation system"
```

---

### Task 2: Remove i18n system

**Files:**
- Delete: `components/context/LanguageContext.tsx`
- Delete: `components/context/LanguageContext.example.tsx`
- Delete: `components/context/LanguageToggle.tsx`
- Delete: `components/context/translations/home.ts`
- Delete: `components/context/translations/navigation.ts`
- Delete: `components/context/translations/about.ts`
- Delete: `components/context/ThemeToggle.tsx` (the duplicate in context/)
- Delete: `app/test/theme/page.tsx`
- Delete: `app/test/language-test.tsx`
- Modify: `components/context/index.tsx`
- Modify: `app/providers.tsx`

- [ ] **Step 1: Delete i18n files and test files**

```bash
rm components/context/LanguageContext.tsx
rm components/context/LanguageContext.example.tsx
rm components/context/LanguageToggle.tsx
rm components/context/translations/home.ts
rm components/context/translations/navigation.ts
rm components/context/translations/about.ts
rm components/context/ThemeToggle.tsx
rm -rf app/test/
```

- [ ] **Step 2: Simplify `components/context/index.tsx`**

Replace entire file with:

```tsx
export { ThemeProvider, useTheme } from './ThemeContext';
```

- [ ] **Step 3: Simplify `app/providers.tsx`**

Replace entire file with:

```tsx
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
```

- [ ] **Step 4: Verify build succeeds**

Run: `cd /Users/sychen/sycomputer.org && npx next build`
Expected: Build will FAIL because components still import `useLanguage`. That's expected — we fix those in the next tasks.

- [ ] **Step 5: Commit deletions and context cleanup**

```bash
git add -A
git commit -m "refactor: remove i18n system and test pages"
```

---

### Task 3: Refactor Navbar — remove i18n, keep Framer for mobile menu

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Rewrite `components/layout/Navbar.tsx`**

Replace entire file with:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '#about', label: '關於公司' },
  { href: '#services', label: '提供服務' },
  { href: '#portfolio', label: '建置案例' },
  { href: '#contact', label: '聯絡我們' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slide-down ${
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

        {/* Mobile Menu — keep AnimatePresence for mount/unmount animation */}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
```

Key changes:
- Removed `useLanguage`, `Globe` import
- Removed language toggle button from desktop and mobile menu
- Replaced `motion.nav` initial animation with CSS `animate-slide-down` class
- Nav items are now plain Chinese strings
- Kept `AnimatePresence` for mobile menu only

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "refactor: remove i18n from Navbar, simplify nav animation to CSS"
```

---

### Task 4: Refactor HeroSection — remove i18n, keep Framer for parallax

**Files:**
- Modify: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Rewrite `components/sections/HeroSection.tsx`**

Replace entire file with:

```tsx
'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax — keep Framer for scroll-driven transforms */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ y: scrollProgress * -100 }}
      >
        <Image
          src="/assets/img/bg-masthead.jpg"
          alt="Computer hardware background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/80 dark:from-background/30 dark:via-background/60 dark:to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      </motion.div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 glass opacity-50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block text-white dark:text-white drop-shadow-lg">
              成為合作夥伴
            </span>
            <motion.span
              className="block text-xl sm:text-2xl md:text-3xl text-white/90 dark:text-white/90 font-light mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Let us save for you on IT investment
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg sm:text-xl text-white/80 dark:text-white/80 mb-10 max-w-2xl mx-auto"
          >
            短期需要電腦嗎？可以用租的。
            <span className="block mt-2 text-sm text-white/60 dark:text-white/60">
              Need a computer in the short term? Can be rented.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center mb-24"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-dark px-10 py-5 rounded-full font-semibold text-xl hover-lift transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              立即諮詢
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements — keep Framer for infinite loop animations */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/30"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent border border-secondary/30"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </section>
  );
};

export default HeroSection;
```

Key changes:
- Removed `useLanguage` import and `t()` calls
- Replaced `t('button.consultNow')` with `立即諮詢`
- Removed `ChevronDown` import (was unused)
- Replaced `motion.a` CTA button with plain `<a>` + CSS hover classes
- Kept all Framer Motion for parallax, initial page load animations, floating elements

- [ ] **Step 2: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "refactor: remove i18n from HeroSection, simplify CTA to CSS hover"
```

---

### Task 5: Refactor AboutSection — remove i18n, replace motion with scroll-reveal

**Files:**
- Modify: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Rewrite `components/sections/AboutSection.tsx`**

Replace entire file with:

```tsx
'use client';

import { Shield, TrendingDown, Zap } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const stats = [
  { value: '50%', label: '平均節省成本' },
  { value: '100+', label: '服務企業' },
  { value: '24/7', label: '技術支援' },
  { value: '99%', label: '客戶滿意度' },
];

const features = [
  {
    icon: Shield,
    title: '安全的作業系統',
    description: '企業級安全防護與穩定性',
  },
  {
    icon: TrendingDown,
    title: '降低硬體成本',
    description: '相比全新設備節省大量預算',
  },
  {
    icon: Zap,
    title: '優化軟體運行',
    description: '提升企業應用軟體性能',
  },
];

const AboutSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              關於我們
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              我們提供了
            </h2>

            <p className="text-lg text-foreground/80 mb-8">
              在我們服務下，您可以滿足您想要的需求，更安全的作業系統、硬體維修、企業應用技術支援。此外，我們能替您的企業應用軟體提供更佳的運行環境，以及更穩定的測試環境，更重要的是我們平均為客戶省下50%的硬體建置成本。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover-lift hover:translate-x-2">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-foreground/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
              >
                深入了解
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
```

Key changes:
- Removed `framer-motion` import entirely
- Removed `useLanguage` import and all `t()` calls
- Replaced all `motion.div` with plain `div`
- Added `useScrollReveal` for viewport-triggered reveal
- Replaced `whileHover={{ scale, x }}` with CSS `hover:translate-x-2` + `hover-lift`
- Replaced `motion.a` with plain `<a>` + CSS hover
- Removed English translations from data arrays
- Removed English subtitle text blocks

- [ ] **Step 2: Commit**

```bash
git add components/sections/AboutSection.tsx
git commit -m "refactor: remove i18n and Framer Motion from AboutSection"
```

---

### Task 6: Refactor ServicesSection — remove i18n, replace motion with scroll-reveal

**Files:**
- Modify: `components/sections/ServicesSection.tsx`

- [ ] **Step 1: Rewrite `components/sections/ServicesSection.tsx`**

Replace entire file with:

```tsx
'use client';

import { Wrench, Laptop, Database, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const services = [
  {
    icon: Wrench,
    title: '軟硬體維修與維護',
    description: '電腦主機、筆電、伺服器硬體故障排除與維修，作業系統重灌、驅動程式安裝、軟體相容性問題解決。',
    features: [
      '硬體故障診斷與維修',
      '作業系統安裝與設定',
      '軟體相容性測試',
      '定期維護保養',
      '遠端技術支援',
    ],
  },
  {
    icon: Laptop,
    title: '企業軟硬體設定',
    description: '企業級伺服器架設、網路環境配置、資料庫管理系統部署、虛擬化平台建置、資安防護設定。',
    features: [
      '伺服器架設與管理',
      '網路環境規劃',
      '資料庫系統部署',
      '虛擬化平台建置',
      '資安防護設定',
    ],
  },
  {
    icon: Database,
    title: '資料備份與還原',
    description: '企業資料備份策略規劃、自動化備份系統建置、異地備援機制、災難復原方案、資料加密保護。',
    features: [
      '備份策略規劃',
      '自動化備份系統',
      '異地備援機制',
      '災難復原方案',
      '資料加密保護',
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            服務項目
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            專業服務
          </h2>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            我們提供全方位的 IT 解決方案，從硬體維修到企業級系統建置，確保您的業務運作順暢無阻。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className="glass rounded-2xl p-8 border border-border hover:border-primary/30 transition-all h-full hover-lift">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-foreground/70 text-sm mb-6">{service.description}</p>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground/90">服務內容</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 border border-border max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">客製化解決方案</h3>
            <p className="text-foreground/80 mb-6">
              除了標準服務外，我們也提供客製化的 IT 解決方案，根據您的業務需求量身打造最合適的技術架構。
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-full font-semibold text-sm hover-lift transition-all hover:scale-105 active:scale-95"
            >
              立即諮詢
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
```

Key changes:
- Removed `framer-motion` import entirely
- Removed `useLanguage` and all `t()` calls
- All `motion.div` and `motion.li` replaced with plain elements
- `whileHover` on cards replaced with CSS `hover-lift`
- `whileInView` replaced with single `useScrollReveal` on container
- Removed all English translations from data and markup
- Removed `enTitle`, `enDescription`, `enFeatures` from service data

- [ ] **Step 2: Commit**

```bash
git add components/sections/ServicesSection.tsx
git commit -m "refactor: remove i18n and Framer Motion from ServicesSection"
```

---

### Task 7: Refactor PortfolioSection — remove i18n, replace motion with scroll-reveal

**Files:**
- Modify: `components/sections/PortfolioSection.tsx`

- [ ] **Step 1: Rewrite `components/sections/PortfolioSection.tsx`**

Replace entire file with:

```tsx
'use client';

import { Network, Shield, Building } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const categories = [
  { id: 'all', label: '全部案例' },
  { id: 'enterprise', label: '企業建置' },
  { id: 'network', label: '網路架構' },
  { id: 'security', label: '資安防護' },
];

const portfolioItems = [
  {
    id: 1,
    title: '製造業網路基礎建設',
    description: '為傳統製造業工廠建置現代化網路基礎設施，實現生產線自動化與物聯網設備連接。',
    category: 'network',
    image: '/assets/img/portfolio/thumbnails/1.jpg',
    features: ['網路基礎建設', '生產線自動化', '物聯網連接', '工業級交換機'],
    icon: Network,
  },
  {
    id: 3,
    title: '醫療機構資料安全系統',
    description: '為地區醫院建置符合醫療法規的資料安全系統，包含加密儲存、存取控制與稽核日誌。',
    category: 'security',
    image: '/assets/img/portfolio/thumbnails/3.jpg',
    features: ['資料加密', '存取控制', '稽核日誌', '法規合規'],
    icon: Shield,
  },
  {
    id: 4,
    title: '教育機構雲端遷移',
    description: '協助大學將傳統教學系統遷移至雲端平台，提升系統可用性與維護效率。',
    category: 'enterprise',
    image: '/assets/img/portfolio/thumbnails/4.jpg',
    features: ['雲端遷移', '系統現代化', '可用性提升', '維護效率'],
    icon: Building,
  },
];

const stats = [
  { value: '100+', label: '完成專案' },
  { value: '50+', label: '合作企業' },
  { value: '99%', label: '客戶滿意度' },
  { value: '24/7', label: '技術支援' },
];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useScrollReveal();

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            建置案例
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            成功案例展示
          </h2>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            我們為各行各業的客戶提供專業的 IT 解決方案，以下是部分成功案例展示。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/25'
                  : 'glass border border-border hover:border-secondary/30 text-foreground/80 hover:text-secondary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="glass rounded-2xl overflow-hidden border border-border hover:border-secondary/30 transition-all h-full hover-lift">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                      {categories.find((c) => c.id === item.category)?.label}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all">
                        <item.icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-foreground/70 text-sm mb-4">{item.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground/90 mb-2">主要功能</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="glass rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
```

Key changes:
- Removed `framer-motion` import entirely
- Removed `useLanguage` and all `t()` calls
- Removed `ExternalLink`, `Server`, `Database`, `Users` icon imports (unused)
- All `motion.div` and `motion.button` replaced with plain elements
- `whileHover` on cards/buttons replaced with CSS transitions
- Removed all English translations from data and markup
- Removed `enLabel`, `enTitle`, `enDescription`, `enFeatures`, `fullImage` from data

- [ ] **Step 2: Commit**

```bash
git add components/sections/PortfolioSection.tsx
git commit -m "refactor: remove i18n and Framer Motion from PortfolioSection"
```

---

### Task 8: Refactor ContactSection — remove i18n, replace motion with scroll-reveal

**Files:**
- Modify: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Rewrite `components/sections/ContactSection.tsx`**

Replace entire file with:

```tsx
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useScrollReveal } from '@/lib/useScrollReveal';

const contactInfo = [
  {
    icon: Phone,
    title: '電話',
    content: '+886-931330086',
    link: 'tel:+886931330086',
  },
  {
    icon: Mail,
    title: '電子郵件',
    content: 'teching_chen2000@gmail.com',
    link: 'mailto:teching_chen2000@gmail.com',
  },
  {
    icon: MapPin,
    title: '地址',
    content: '新北市土城區亞洲路11巷1弄17號',
  },
  {
    icon: Clock,
    title: '營業時間',
    content: '週一至週五 09:00-18:00',
  },
];

const ContactSection = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            聯絡我們
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            立即聯絡我們
          </h2>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            有任何問題或需要報價嗎？請填寫以下表單或直接聯絡我們，我們將盡快回覆您。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">傳送訊息</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">訊息已傳送成功！</h4>
                  <p className="text-muted">我們會盡快回覆您，謝謝。</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="姓名"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="請輸入您的姓名"
                    />
                    <Input
                      label="電子郵件"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>

                  <Input
                    label="電話"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+886 912 345 678"
                  />

                  <TextArea
                    label="訊息內容"
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
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <Card key={info.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-foreground/80 hover:text-accent transition-colors block"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-foreground/80">{info.content}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
```

Key changes:
- Removed `useLanguage` import and all `t()` calls
- Replaced most `motion.div` with plain `div`
- Kept `motion.div` only for the success message animation (small, justified)
- Removed all English translations from labels, titles, data
- Contact info cards use Card component hover instead of individual motion wrappers
- Removed `enContent` from contact info data

- [ ] **Step 2: Commit**

```bash
git add components/sections/ContactSection.tsx
git commit -m "refactor: remove i18n and Framer Motion from ContactSection"
```

---

### Task 9: Refactor ScrollToTop — remove i18n

**Files:**
- Modify: `components/sections/ScrollToTop.tsx`

- [ ] **Step 1: Rewrite `components/sections/ScrollToTop.tsx`**

Replace entire file with:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            aria-label="回到頂部"
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

Key changes:
- Removed `useLanguage` import
- Replaced `t('common.backToTop')` with plain `回到頂部`
- Kept AnimatePresence (justified for mount/unmount)

- [ ] **Step 2: Commit**

```bash
git add components/sections/ScrollToTop.tsx
git commit -m "refactor: remove i18n from ScrollToTop"
```

---

### Task 10: Refactor Footer — remove i18n, replace motion with scroll-reveal

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite `components/layout/Footer.tsx`**

Replace entire file with:

```tsx
'use client';

import { Share2, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/lib/useScrollReveal';

const footerLinks = [
  {
    title: '快速連結',
    links: [
      { href: '#about', label: '關於公司' },
      { href: '#services', label: '提供服務' },
      { href: '#portfolio', label: '建置案例' },
      { href: '#contact', label: '聯絡我們' },
    ],
  },
  {
    title: '服務項目',
    links: [
      { href: '#services', label: '軟硬體維修' },
      { href: '#services', label: '企業設定' },
      { href: '#services', label: '資料備份' },
      { href: '#services', label: '技術支援' },
    ],
  },
];

const contactInfo = [
  { icon: Phone, text: '+886-931330086' },
  { icon: Mail, text: 'teching_chen2000@gmail.com' },
  { icon: MapPin, text: '新北市土城區亞洲路11巷1弄17號' },
];

const socialLinks = [
  { icon: Share2, href: '#', label: '分享' },
  { icon: MessageSquare, href: '#', label: '訊息' },
];

const Footer = () => {
  const footerRef = useScrollReveal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={footerRef} className="py-12 lg:py-16 reveal">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">聖大資訊</h3>
              <p className="text-foreground/70 mb-6">
                專業的二手電腦銷售、租賃、維修與企業 IT 解決方案服務。
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
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-bold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">聯絡資訊</h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary mt-0.5" />
                    </div>
                    <p className="text-foreground/70">{info.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} 聖大資訊有限公司. 版權所有
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

Key changes:
- Removed `framer-motion` import entirely
- Removed `useLanguage` and all `t()` calls
- All `motion.div` replaced with plain `div`
- Added `useScrollReveal` for viewport reveal
- Removed all English translations from data and markup
- Removed `enTitle`, `enLabel`, `enText` from data
- Changed footer service links from `#` to `#services` (more useful)

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "refactor: remove i18n and Framer Motion from Footer"
```

---

### Task 11: Simplify Button and Card UI components

**Files:**
- Modify: `components/ui/Button.tsx`
- Modify: `components/ui/Card.tsx`

- [ ] **Step 1: Rewrite `components/ui/Button.tsx`**

Replace entire file with:

```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95',
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
          className,
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
```

Key changes:
- Removed `framer-motion` import
- Changed `motion.button` to plain `button`
- Removed the entire props filtering block (onDrag, onAnimationStart, etc.)
- Added `hover:scale-105 active:scale-95` CSS transitions to replace `whileHover`/`whileTap`

- [ ] **Step 2: Rewrite `components/ui/Card.tsx`**

Replace entire file with:

```tsx
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, glass = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-2xl border border-border transition-all',
          {
            'glass hover:border-primary/30 hover-lift': glass,
            'bg-card': !glass,
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export { Card };
```

Key changes:
- Removed `framer-motion` import
- Changed `motion.div` to plain `div`
- Removed the entire props filtering block
- Hover effects now handled by the existing `hover-lift` CSS class

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx components/ui/Card.tsx
git commit -m "refactor: remove Framer Motion from Button and Card components"
```

---

### Task 12: Build verification and visual check

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

Run: `cd /Users/sychen/sycomputer.org && npx next build`
Expected: Build succeeds with no errors. No remaining imports of `useLanguage`, `LanguageContext`, or `LanguageToggle`.

- [ ] **Step 2: Check for any remaining i18n imports**

Run: `grep -r "useLanguage\|LanguageContext\|LanguageToggle\|LanguageProvider" --include="*.tsx" --include="*.ts" components/ app/ lib/ | grep -v node_modules`
Expected: No matches

- [ ] **Step 3: Start dev server and visually verify**

Run: `cd /Users/sychen/sycomputer.org && npx next dev`

Check in browser at `http://localhost:3000`:
- All sections render with Chinese text
- Scroll-reveal animations trigger on scroll
- Hero parallax still works
- Navbar glass effect on scroll still works
- Mobile menu opens/closes with animation
- Theme toggle works (light/dark)
- ScrollToTop button appears on scroll
- No language switcher visible
- Contact form submits with success animation
- Portfolio category filter works
- Hover effects on cards work

- [ ] **Step 4: Final commit if any fixes needed**

Only if build or visual check revealed issues that needed fixing.
