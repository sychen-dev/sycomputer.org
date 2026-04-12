'use client';

import { Share2, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/context/LanguageContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '快速連結',
      enTitle: 'Quick Links',
      links: [
        { href: '#about', label: '關於公司', enLabel: 'About' },
        { href: '#services', label: '提供服務', enLabel: 'Services' },
        { href: '#portfolio', label: '建置案例', enLabel: 'Portfolio' },
        { href: '#contact', label: '聯絡我們', enLabel: 'Contact' },
      ],
    },
    {
      title: '服務項目',
      enTitle: 'Services',
      links: [
        { label: '軟硬體維修', enLabel: 'Hardware & Software Repair' },
        { label: '企業設定', enLabel: 'Enterprise Configuration' },
        { label: '資料備份', enLabel: 'Data Backup' },
        { label: '技術支援', enLabel: 'Technical Support' },
      ],
    },
  ];

  const contactInfo = [
    { icon: Phone, text: '+886-926577858' },
    { icon: Mail, text: 'qazxsw9295@gmail.com' },
    { icon: MapPin, text: '新竹市東區大學路1001號', enText: 'No. 1001, University Rd., East Dist., Hsinchu City' },
  ];

  const socialLinks = [
    { icon: Share2, href: '#', label: '分享' },
    { icon: MessageSquare, href: '#', label: '訊息' },
  ];

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                聖大資訊
                <span className="block text-lg text-muted font-normal mt-1">Shangda PC</span>
              </h3>
              <p className="text-foreground/70 mb-6">
                專業的二手電腦銷售、租賃、維修與企業 IT 解決方案服務。
                <span className="block text-sm text-muted mt-2">
                  Professional used computer sales, rental, maintenance, and enterprise IT solutions.
                </span>
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <social.icon className="w-5 h-5 text-foreground/70" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-bold mb-4">
                  {section.title}
                  <span className="block text-sm text-muted font-normal mt-1">
                    {section.enTitle}
                  </span>
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-foreground/70 hover:text-primary transition-colors inline-block"
                        >
                          {link.label}
                          <span className="block text-xs text-muted">
                            {link.enLabel}
                          </span>
                        </Link>
                      ) : (
                        <span className="text-foreground/70 inline-block">
                          {link.label}
                          <span className="block text-xs text-muted">
                            {link.enLabel}
                          </span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-4">
                聯絡資訊
                <span className="block text-sm text-muted font-normal mt-1">
                  Contact Information
                </span>
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary mt-0.5" />
                    </div>
                    <div>
                      <p className="text-foreground/70">
                        {info.text}
                      </p>
                      {info.enText && (
                        <p className="text-xs text-muted mt-1">
                          {info.enText}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-border text-center"
          >
            <p className="text-foreground/60 text-sm">
              © {currentYear} 聖大資訊有限公司. {t('common.allRightsReserved')}
              <span className="block text-xs text-muted mt-1">
                Shangda Co., Ltd. All rights reserved.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;