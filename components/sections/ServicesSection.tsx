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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="group">
              <div className="glass rounded-2xl p-8 border border-border hover:border-primary/30 transition-all h-full hover-lift">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                <p className="text-foreground/70 text-sm mb-6">{service.description}</p>

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
