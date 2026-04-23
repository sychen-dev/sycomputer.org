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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
