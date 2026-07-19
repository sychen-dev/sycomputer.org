import { ArrowRight, Check, Phone } from 'lucide-react';

const specs = [
  { label: '品項', value: '商用桌上型主機' },
  { label: '處理器', value: 'Intel Core i5' },
  { label: '記憶體', value: '16GB DDR4' },
  { label: '儲存', value: '512GB SSD' },
];

const checks = ['CPU 壓力測試', '記憶體完整測試', '硬碟健康度檢查', '系統重灌與更新'];

const facts = [
  { value: '50%', label: '平均省下的建置成本' },
  { value: '100+', label: '服務中的企業客戶' },
  { value: '含保固', label: '購買與租賃均免費' },
];

const HeroSection = () => {
  return (
    <section className="dot-grid relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-40">
        <div>
          <p className="eyebrow rise">新北土城・二手電腦專門</p>

          <h1 className="rise rise-1 mt-6 text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            好電腦,
            <br />
            不必是新電腦。
          </h1>

          <p className="rise rise-2 mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
            聖大資訊專營二手電腦銷售、租賃與維修。每台機器出貨前完成檢測整備,購買與租賃均含免費保固,平均為企業省下
            50% 硬體建置成本。
          </p>

          <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              取得報價
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+886931330086"
              className="inline-flex items-center gap-2.5 font-mono text-lg font-medium text-ink transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4 text-accent" />
              0931-330-086
            </a>
          </div>

          <dl className="rise rise-4 mt-14 grid max-w-md grid-cols-3 gap-x-6 border-t border-line pt-6">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="order-last mt-1.5 text-xs leading-snug text-soft">
                  {fact.label}
                </dt>
                <dd className="font-mono text-2xl font-semibold tracking-tight">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise rise-2 lg:justify-self-end">
          <div className="tag-tilt relative w-full max-w-sm">
            <div className="relative rounded-lg border border-line bg-card p-6 shadow-[0_28px_56px_-28px_rgb(26_33_28/0.4)]">
              <span aria-hidden className="tag-hole absolute right-5 top-5" />

              <p className="font-mono text-[11px] tracking-[0.2em] text-soft">
                REFURB RECORD
              </p>
              <h2 className="mt-1.5 text-xl font-black tracking-tight">整備檢測紀錄</h2>
              <p className="mt-1 font-mono text-xs text-soft">NO. SD-25-0416</p>

              <div className="my-5 border-t border-dashed border-line" />

              <dl className="space-y-2.5">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4">
                    <dt className="shrink-0 text-xs text-soft">{spec.label}</dt>
                    <dd className="font-mono text-sm">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="my-5 border-t border-dashed border-line" />

              <ul className="space-y-2.5">
                {checks.map((check) => (
                  <li key={check} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2.5 text-sm">
                      <span className="flex h-4 w-4 items-center justify-center bg-accent/10 text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {check}
                    </span>
                    <span className="font-mono text-[11px] font-medium text-accent">
                      PASS
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-t border-dashed border-line" />

              <div className="flex items-center justify-between gap-4">
                <span className="bg-seal px-2.5 py-1 font-mono text-xs font-semibold text-seal-ink">
                  含免費保固
                </span>
                <span className="font-mono text-xs text-soft">價格・來電報價</span>
              </div>

              <div aria-hidden className="barcode mt-5" />
            </div>

            <p className="mt-4 text-center font-mono text-xs text-soft">
              每台出貨機,都有一張這樣的紀錄
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
