'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '#about', label: '關於聖大' },
  { href: '#services', label: '服務項目' },
  { href: '#portfolio', label: '建置案例' },
  { href: '#contact', label: '聯絡我們' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isOpen
          ? 'border-line bg-paper'
          : scrolled
            ? 'border-line bg-paper/95 backdrop-blur-sm'
            : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span aria-hidden className="h-2.5 w-2.5 bg-accent" />
            <span className="leading-none">
              <span className="block text-lg font-black tracking-tight">聖大資訊</span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.25em] text-soft">
                SHANGDA PC
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#contact"
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              取得報價
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? '關閉選單' : '開啟選單'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          inert={!isOpen}
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t border-line py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-line/40"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-md bg-accent px-4 py-2.5 text-center text-[15px] font-medium text-on-accent"
              >
                取得報價
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
