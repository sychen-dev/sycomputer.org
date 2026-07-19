'use client';

import { ArrowRight, CalendarClock, Monitor, Server, Wrench } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const services = [
  {
    icon: Monitor,
    title: '二手電腦銷售',
    description: '商用桌機、筆電到工作站,檢測整備後出貨,含免費保固。',
    features: ['商用桌機與筆電', '工作站與伺服器', '螢幕與週邊設備', '出貨均含免費保固'],
  },
  {
    icon: CalendarClock,
    title: '電腦租賃',
    description: '短期專案或臨時需求,以租代買,彈性控制成本。',
    features: ['短期與長期租賃', '依需求彈性增減數量', '租期內免費保固維修', '汰換無資產負擔'],
  },
  {
    icon: Wrench,
    title: '維修與保養',
    description: '軟硬體故障排除與定期保養,延長設備使用壽命。',
    features: ['硬體故障診斷與維修', '作業系統安裝與設定', '定期維護保養', '遠端技術支援'],
  },
  {
    icon: Server,
    title: '企業 IT 建置',
    description: '伺服器、網路與備份還原,中小企業的完整 IT 後勤。',
    features: ['伺服器架設與管理', '網路環境規劃', '資料備份與一鍵還原', '系統映像檔部署'],
  },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" className="border-t border-line py-20 lg:py-28">
      <div ref={sectionRef} className="reveal-group mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="eyebrow">服務項目</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            從一台主機,到整間公司的 IT。
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            銷售、租賃、維修到企業建置,同一組人對口,問題不用轉手。
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal-item rounded-lg border border-line bg-card p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-soft hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]"
              style={{ '--rd': `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line text-accent">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{service.title}</h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-soft">{service.description}</p>

              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-baseline gap-2.5 text-sm">
                    <span aria-hidden className="font-mono font-semibold text-accent">
                      +
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="reveal-item mt-10 flex flex-col items-start justify-between gap-4 rounded-lg border border-dashed border-soft/50 px-7 py-6 sm:flex-row sm:items-center"
          style={{ '--rd': '280ms' } as React.CSSProperties}
        >
          <div>
            <h3 className="font-bold">客製化需求</h3>
            <p className="mt-1 text-sm text-soft">
              規格、數量、預算——說你的條件,我們配到好。
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 font-mono text-sm font-medium text-accent transition-colors hover:text-accent-strong"
          >
            取得報價
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
