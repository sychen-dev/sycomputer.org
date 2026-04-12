'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Building, Server, Database, Network, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/components/context/LanguageContext';

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: '全部案例', enLabel: 'All Cases' },
    { id: 'enterprise', label: '企業建置', enLabel: 'Enterprise Setup' },
    { id: 'network', label: '網路架構', enLabel: 'Network Architecture' },
    { id: 'security', label: '資安防護', enLabel: 'Security Protection' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: '金融科技公司伺服器架設',
      description: '為金融科技新創公司建置高可用性伺服器集群，包含負載均衡、資料庫叢集與災難復原機制。',
      enTitle: 'FinTech Company Server Setup',
      enDescription: 'Built high-availability server cluster for fintech startup, including load balancing, database clustering, and disaster recovery mechanisms.',
      category: 'enterprise',
      image: '/assets/img/portfolio/thumbnails/1.jpg',
      fullImage: '/assets/img/portfolio/fullsize/1.jpg',
      features: ['伺服器集群', '負載均衡', '資料庫叢集', '災難復原'],
      enFeatures: ['Server Cluster', 'Load Balancing', 'Database Clustering', 'Disaster Recovery'],
      icon: Server,
    },
    {
      id: 2,
      title: '製造業網路基礎建設',
      description: '為傳統製造業工廠建置現代化網路基礎設施，實現生產線自動化與物聯網設備連接。',
      enTitle: 'Manufacturing Network Infrastructure',
      enDescription: 'Built modern network infrastructure for traditional manufacturing factory, enabling production line automation and IoT device connectivity.',
      category: 'network',
      image: '/assets/img/portfolio/thumbnails/2.jpg',
      fullImage: '/assets/img/portfolio/fullsize/2.jpg',
      features: ['網路基礎建設', '生產線自動化', '物聯網連接', '工業級交換機'],
      enFeatures: ['Network Infrastructure', 'Production Line Automation', 'IoT Connectivity', 'Industrial Switches'],
      icon: Network,
    },
    {
      id: 3,
      title: '醫療機構資料安全系統',
      description: '為地區醫院建置符合醫療法規的資料安全系統，包含加密儲存、存取控制與稽核日誌。',
      enTitle: 'Healthcare Data Security System',
      enDescription: 'Built medical regulation-compliant data security system for regional hospital, including encrypted storage, access control, and audit logs.',
      category: 'security',
      image: '/assets/img/portfolio/thumbnails/3.jpg',
      fullImage: '/assets/img/portfolio/fullsize/3.jpg',
      features: ['資料加密', '存取控制', '稽核日誌', '法規合規'],
      enFeatures: ['Data Encryption', 'Access Control', 'Audit Logs', 'Regulatory Compliance'],
      icon: Shield,
    },
    {
      id: 4,
      title: '教育機構雲端遷移',
      description: '協助大學將傳統教學系統遷移至雲端平台，提升系統可用性與維護效率。',
      enTitle: 'Educational Institution Cloud Migration',
      enDescription: 'Assisted university in migrating traditional teaching systems to cloud platform, improving system availability and maintenance efficiency.',
      category: 'enterprise',
      image: '/assets/img/portfolio/thumbnails/4.jpg',
      fullImage: '/assets/img/portfolio/fullsize/4.jpg',
      features: ['雲端遷移', '系統現代化', '可用性提升', '維護效率'],
      enFeatures: ['Cloud Migration', 'System Modernization', 'Availability Improvement', 'Maintenance Efficiency'],
      icon: Building,
    },
    {
      id: 5,
      title: '電商平台資料庫優化',
      description: '為大型電商平台進行資料庫效能優化，提升交易處理速度與系統穩定性。',
      enTitle: 'E-commerce Platform Database Optimization',
      enDescription: 'Performed database performance optimization for large e-commerce platform, improving transaction processing speed and system stability.',
      category: 'enterprise',
      image: '/assets/img/portfolio/thumbnails/5.jpg',
      fullImage: '/assets/img/portfolio/fullsize/5.jpg',
      features: ['資料庫優化', '效能調校', '交易處理', '系統穩定性'],
      enFeatures: ['Database Optimization', 'Performance Tuning', 'Transaction Processing', 'System Stability'],
      icon: Database,
    },
    {
      id: 6,
      title: '跨國企業協作平台',
      description: '為跨國企業建置安全協作平台，支援多地點團隊協作與檔案共享。',
      enTitle: 'Multinational Corporation Collaboration Platform',
      enDescription: 'Built secure collaboration platform for multinational corporation, supporting multi-location team collaboration and file sharing.',
      category: 'network',
      image: '/assets/img/portfolio/thumbnails/6.jpg',
      fullImage: '/assets/img/portfolio/fullsize/6.jpg',
      features: ['協作平台', '多地點支援', '檔案共享', '安全通訊'],
      enFeatures: ['Collaboration Platform', 'Multi-location Support', 'File Sharing', 'Secure Communication'],
      icon: Users,
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium mb-6"
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            建置案例 / Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            成功案例展示
            <span className="block text-xl sm:text-2xl text-muted mt-3 font-normal">
              Case Studies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            我們為各行各業的客戶提供專業的 IT 解決方案，以下是部分成功案例展示。
            <span className="block text-sm text-muted mt-2">
              We provide professional IT solutions for clients across various industries. Here are some of our successful case studies.
            </span>
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/25'
                  : 'glass border border-border hover:border-secondary/30 text-foreground/80 hover:text-secondary'
              }`}
            >
              {category.label}
              <span className="block text-xs opacity-80">{category.enLabel}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden border border-border hover:border-secondary/30 transition-all h-full hover-lift">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                      {categories.find(c => c.id === item.category)?.label}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-all">
                        <item.icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">
                        {item.title}
                        <span className="block text-sm text-muted font-normal mt-1">
                          {item.enTitle}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-sm mb-4">
                    {item.description}
                    <span className="block text-xs text-muted mt-2">
                      {item.enDescription}
                    </span>
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground/90 mb-2">
                      主要功能 / Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
                        >
                          {feature}
                          <span className="block text-[10px] opacity-70">
                            {item.enFeatures[featureIndex]}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(item.fullImage, '_blank')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary hover:from-secondary/20 hover:to-primary/20 rounded-lg font-medium text-sm transition-all"
                  >
                    {t('button.viewDetails')}
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs opacity-70">View Details</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '100+', label: '完成專案', enLabel: 'Projects Completed' },
                { value: '50+', label: '合作企業', enLabel: 'Enterprise Clients' },
                { value: '99%', label: '客戶滿意度', enLabel: 'Client Satisfaction' },
                { value: '24/7', label: '技術支援', enLabel: 'Technical Support' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {stat.enLabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;