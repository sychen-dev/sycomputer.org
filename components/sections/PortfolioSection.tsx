'use client';

import { Network, Shield, Building } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const categories = [
  { id: 'all', label: '全部案例' },
  { id: 'enterprise', label: '企業建置' },
  { id: 'network', label: '網路架構' },
  { id: 'security', label: '資安防護' },
];

const portfolioItems = [
  {
    id: 1,
    title: '製造業網路基礎建設',
    description: '為傳統製造業工廠建置現代化網路基礎設施，實現生產線自動化與物聯網設備連接。',
    category: 'network',
    image: '/assets/img/portfolio/thumbnails/1.jpg',
    features: ['網路基礎建設', '生產線自動化', '物聯網連接', '工業級交換機'],
    icon: Network,
  },
  {
    id: 3,
    title: '醫療機構資料安全系統',
    description: '為地區醫院建置符合醫療法規的資料安全系統，包含加密儲存、存取控制與稽核日誌。',
    category: 'security',
    image: '/assets/img/portfolio/thumbnails/3.jpg',
    features: ['資料加密', '存取控制', '稽核日誌', '法規合規'],
    icon: Shield,
  },
  {
    id: 4,
    title: '教育機構雲端遷移',
    description: '協助大學將傳統教學系統遷移至雲端平台，提升系統可用性與維護效率。',
    category: 'enterprise',
    image: '/assets/img/portfolio/thumbnails/4.jpg',
    features: ['雲端遷移', '系統現代化', '可用性提升', '維護效率'],
    icon: Building,
  },
];

const stats = [
  { value: '100+', label: '完成專案' },
  { value: '50+', label: '合作企業' },
  { value: '99%', label: '客戶滿意度' },
  { value: '24/7', label: '技術支援' },
];

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useScrollReveal();

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            建置案例
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            成功案例展示
          </h2>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            我們為各行各業的客戶提供專業的 IT 解決方案，以下是部分成功案例展示。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 active:scale-95 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/25'
                  : 'glass border border-border hover:border-secondary/30 text-foreground/80 hover:text-secondary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="glass rounded-2xl overflow-hidden border border-border hover:border-secondary/30 transition-all h-full hover-lift">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                      {categories.find((c) => c.id === item.category)?.label}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all">
                        <item.icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-foreground/70 text-sm mb-4">{item.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground/90 mb-2">主要功能</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="glass rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
