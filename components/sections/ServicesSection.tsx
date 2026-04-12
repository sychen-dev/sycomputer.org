'use client';

import { motion } from 'framer-motion';
import { Wrench, Laptop, Database, CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Wrench,
      title: '軟硬體維修與維護',
      description: '電腦主機、筆電、伺服器硬體故障排除與維修，作業系統重灌、驅動程式安裝、軟體相容性問題解決。',
      enTitle: 'Hardware & Software Repair & Maintenance',
      enDescription: 'Computer, laptop, server hardware troubleshooting and repair, OS reinstallation, driver installation, software compatibility issue resolution.',
      features: [
        '硬體故障診斷與維修',
        '作業系統安裝與設定',
        '軟體相容性測試',
        '定期維護保養',
        '遠端技術支援',
      ],
      enFeatures: [
        'Hardware fault diagnosis and repair',
        'OS installation and configuration',
        'Software compatibility testing',
        'Regular maintenance',
        'Remote technical support',
      ],
    },
    {
      icon: Laptop,
      title: '企業軟硬體設定',
      description: '企業級伺服器架設、網路環境配置、資料庫管理系統部署、虛擬化平台建置、資安防護設定。',
      enTitle: 'Enterprise Hardware & Software Configuration',
      enDescription: 'Enterprise server setup, network environment configuration, database management system deployment, virtualization platform implementation, security protection settings.',
      features: [
        '伺服器架設與管理',
        '網路環境規劃',
        '資料庫系統部署',
        '虛擬化平台建置',
        '資安防護設定',
      ],
      enFeatures: [
        'Server setup and management',
        'Network environment planning',
        'Database system deployment',
        'Virtualization platform implementation',
        'Security protection settings',
      ],
    },
    {
      icon: Database,
      title: '資料備份與還原',
      description: '企業資料備份策略規劃、自動化備份系統建置、異地備援機制、災難復原方案、資料加密保護。',
      enTitle: 'Data Backup & Recovery',
      enDescription: 'Enterprise data backup strategy planning, automated backup system implementation, off-site backup mechanism, disaster recovery solutions, data encryption protection.',
      features: [
        '備份策略規劃',
        '自動化備份系統',
        '異地備援機制',
        '災難復原方案',
        '資料加密保護',
      ],
      enFeatures: [
        'Backup strategy planning',
        'Automated backup system',
        'Off-site backup mechanism',
        'Disaster recovery solutions',
        'Data encryption protection',
      ],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            服務項目 / Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            專業服務
            <span className="block text-xl sm:text-2xl text-muted mt-3 font-normal">
              Professional Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            我們提供全方位的 IT 解決方案，從硬體維修到企業級系統建置，確保您的業務運作順暢無阻。
            <span className="block text-sm text-muted mt-2">
              We provide comprehensive IT solutions, from hardware repair to enterprise system implementation, ensuring your business operations run smoothly.
            </span>
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 border border-border hover:border-primary/30 transition-all h-full hover-lift">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.2 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all"
                >
                  <service.icon className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                  <span className="block text-sm text-muted font-normal mt-1">
                    {service.enTitle}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-foreground/70 text-sm mb-6">
                  {service.description}
                  <span className="block text-xs text-muted mt-2">
                    {service.enDescription}
                  </span>
                </p>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground/90">
                    服務內容 / Service Features
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * featureIndex }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="text-sm text-foreground/80">{feature}</span>
                          <span className="block text-xs text-muted">
                            {service.enFeatures[featureIndex]}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.4 }}
                  viewport={{ once: true }}
                  className="mt-8 pt-6 border-t border-border/50"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:from-primary/20 hover:to-secondary/20 rounded-lg font-medium text-sm transition-all"
                  >
                    立即諮詢
                    <span className="text-xs opacity-70 ml-2">Get Quote</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 border border-border max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              客製化解決方案
              <span className="block text-lg text-muted font-normal mt-2">
                Customized Solutions
              </span>
            </h3>
            <p className="text-foreground/80 mb-6">
              除了標準服務外，我們也提供客製化的 IT 解決方案，根據您的業務需求量身打造最合適的技術架構。
              <span className="block text-sm text-muted mt-2">
                In addition to standard services, we also provide customized IT solutions tailored to your business needs.
              </span>
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-full font-semibold text-sm hover-lift transition-all"
            >
              聯絡我們討論需求
              <span className="text-xs opacity-80">Contact us to discuss requirements</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;