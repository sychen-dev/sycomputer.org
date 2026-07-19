'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';

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
          <p className="mt-6 text-base leading-relaxed text-soft">
            我們專注一件事:讓檢測過的二手電腦,取代不必要的全新採購。從作業系統的安全設定、硬體維修,到企業應用的技術支援,提供安全穩定的運行與測試環境,平均為客戶省下
            50% 的硬體建置成本。
          </p>
        </div>

        <p
          className="reveal-item mt-14 font-mono text-xs tracking-[0.15em] text-soft"
          style={{ '--rd': '80ms' } as React.CSSProperties}
        >
          每台機器的必經流程
        </p>
        <ol className="mt-6 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="reveal-item relative border-t border-line pt-5"
              style={{ '--rd': `${120 + index * 70}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="absolute -top-[5px] left-0 h-2.5 w-2.5 bg-accent"
              />
              <span className="font-mono text-xs font-medium text-accent">
                {step.number}
              </span>
              <h3 className="mt-1 font-bold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-soft">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AboutSection;
