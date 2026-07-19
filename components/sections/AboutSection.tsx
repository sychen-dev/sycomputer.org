'use client';

import { Shield, TrendingDown, Zap } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const features = [
  {
    icon: Shield,
    title: '安全穩定的系統環境',
    description: '企業級的安全設定與穩定性,開機就能上工。',
  },
  {
    icon: TrendingDown,
    title: '更低的建置成本',
    description: '相比全新設備大幅節省預算,把錢留給本業。',
  },
  {
    icon: Zap,
    title: '更佳的軟體適配',
    description: '為企業應用軟體調校的運行與測試環境。',
  },
];

const steps = [
  {
    number: '01',
    title: '需求評估',
    description: '了解用途與預算,建議合適的機型與配置。',
  },
  {
    number: '02',
    title: '檢測整備',
    description: '硬體逐項檢測、系統重灌、清潔與零件更換。',
  },
  {
    number: '03',
    title: '交機驗收',
    description: '依規格逐項確認機況,清點後交機。',
  },
  {
    number: '04',
    title: '保固支援',
    description: '保固期內免費維修,並提供遠端技術支援。',
  },
];

const stats = [
  { value: '50%', label: '平均節省成本' },
  { value: '100+', label: '服務企業' },
  { value: '24/7', label: '技術支援' },
  { value: '99%', label: '客戶滿意度' },
];

const AboutSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="border-t border-line py-20 lg:py-28">
      <div ref={sectionRef} className="reveal-group mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="eyebrow">關於聖大</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            一半的預算,
            <br className="sm:hidden" />
            一樣的生產力。
          </h2>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal-item" style={{ '--rd': '80ms' } as React.CSSProperties}>
            <p className="text-base leading-relaxed text-soft">
              我們專注一件事:讓檢測過的二手電腦,取代不必要的全新採購。從作業系統的安全設定、硬體維修,到企業應用的技術支援,提供穩定的運行與測試環境,平均為客戶省下
              50% 的硬體建置成本。
            </p>

            <ul className="mt-9 space-y-6">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-accent">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-soft">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item" style={{ '--rd': '160ms' } as React.CSSProperties}>
            <p className="font-mono text-xs tracking-[0.15em] text-soft">
              每台機器的必經流程
            </p>
            <ol className="mt-6">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className={`relative flex gap-5 border-l border-line pl-7 ${
                    index === steps.length - 1 ? 'pb-0' : 'pb-8'
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 bg-accent"
                  />
                  <div>
                    <span className="font-mono text-xs font-medium text-accent">
                      {step.number}
                    </span>
                    <h3 className="mt-0.5 font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-soft">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <dl
          className="reveal-item mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4"
          style={{ '--rd': '240ms' } as React.CSSProperties}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-7 text-center">
              <dd className="font-mono text-3xl font-semibold tracking-tight">
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-xs text-soft">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default AboutSection;
