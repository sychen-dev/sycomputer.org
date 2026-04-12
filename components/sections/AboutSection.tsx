'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingDown, Zap } from 'lucide-react';
import { useLanguage } from '@/components/context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  const stats = [
    { value: '50%', label: '平均節省成本', description: 'Average cost savings' },
    { value: '100+', label: '服務企業', description: 'Enterprises served' },
    { value: '24/7', label: '技術支援', description: 'Technical support' },
    { value: '99%', label: '客戶滿意度', description: 'Customer satisfaction' },
  ];

  const features = [
    {
      icon: Shield,
      title: '安全的作業系統',
      description: '企業級安全防護與穩定性',
      enTitle: 'Secure Operating System',
      enDescription: 'Enterprise-level security and stability',
    },
    {
      icon: TrendingDown,
      title: '降低硬體成本',
      description: '相比全新設備節省大量預算',
      enTitle: 'Reduced Hardware Costs',
      enDescription: 'Significant budget savings compared to new equipment',
    },
    {
      icon: Zap,
      title: '優化軟體運行',
      description: '提升企業應用軟體性能',
      enTitle: 'Optimized Software Performance',
      enDescription: 'Enhanced enterprise application performance',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              關於我們 / About Us
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              我們提供了
              <span className="block text-xl sm:text-2xl text-muted mt-3 font-normal">
                What we provide
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-foreground/80 mb-8"
            >
              在我們服務下，您可以滿足您想要的需求，更安全的作業系統、硬體維修、企業應用技術支援。此外，我們能替您的企業應用軟體提供更佳的運行環境，以及更穩定的測試環境，更重要的是我們平均為客戶省下50%的硬體建置成本。
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-lg text-muted mb-10"
            >
              With our services, you can meet the needs you want, with a safer operating system, hardware maintenance, and enterprise application technical support. In addition, we can provide a better operating environment and a more stable test environment for your enterprise application software. More importantly, we can save customers 50% of the hardware construction cost on average.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group"
                >
                  <div className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                          <span className="block text-sm text-muted font-normal">
                            {feature.enTitle}
                          </span>
                        </h3>
                        <p className="text-foreground/70 text-sm">
                          {feature.description}
                          <span className="block text-xs text-muted mt-1">
                            {feature.enDescription}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg hover-lift transition-all shadow-lg shadow-primary/25"
              >
                {t('button.learnMore')}
                <span className="text-sm opacity-80">Service Items</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;