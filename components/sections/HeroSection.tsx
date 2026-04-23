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

      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 glass opacity-50" />
      </div>

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
