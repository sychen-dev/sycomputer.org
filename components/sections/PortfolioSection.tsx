'use client';

import { useScrollReveal } from '@/lib/useScrollReveal';

const cases = [
  {
    id: 'CASE-01',
    category: '網路架構',
    title: '製造業網路基礎建設',
    description:
      '為傳統製造業工廠建置現代化網路基礎設施,實現生產線自動化與物聯網設備連接。',
    features: ['網路基礎建設', '生產線自動化', '物聯網連接', '工業級交換機'],
  },
  {
    id: 'CASE-02',
    category: '資安防護',
    title: '醫療機構資料安全系統',
    description:
      '為地區醫院建置符合醫療法規的資料安全系統,包含加密儲存、存取控制與稽核日誌。',
    features: ['資料加密', '存取控制', '稽核日誌', '法規合規'],
  },
  {
    id: 'CASE-03',
    category: '企業建置',
    title: '教育機構雲端遷移',
    description:
      '協助大學將傳統教學系統遷移至雲端平台,提升系統可用性與維護效率。',
    features: ['雲端遷移', '系統現代化', '可用性提升', '維護效率'],
  },
];

const PortfolioSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="portfolio" className="border-t border-line py-20 lg:py-28">
      <div ref={sectionRef} className="reveal-group mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="eyebrow">建置案例</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            實際交付的工作。
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            從工廠、醫療院所到學校,這些單位的 IT 由我們建置與維護。
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cases.map((item, index) => (
            <article
              key={item.id}
              className="reveal-item flex flex-col rounded-lg border border-line bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-soft hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]"
              style={{ '--rd': `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-soft">{item.id}</span>
                <span className="rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {item.category}
                </span>
              </div>

              <h3 className="mt-4 font-bold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">
                {item.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-sm border border-line px-2 py-1 font-mono text-[11px] text-soft"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
