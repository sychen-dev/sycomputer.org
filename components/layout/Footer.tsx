'use client';

import { Share2, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/lib/useScrollReveal';

const footerLinks = [
  {
    title: '快速連結',
    links: [
      { href: '#about', label: '關於公司' },
      { href: '#services', label: '提供服務' },
      { href: '#portfolio', label: '建置案例' },
      { href: '#contact', label: '聯絡我們' },
    ],
  },
  {
    title: '服務項目',
    links: [
      { href: '#services', label: '軟硬體維修' },
      { href: '#services', label: '企業設定' },
      { href: '#services', label: '資料備份' },
      { href: '#services', label: '技術支援' },
    ],
  },
];

const contactInfo = [
  { icon: Phone, text: '+886-931330086' },
  { icon: Mail, text: 'teching_chen2000@gmail.com' },
  { icon: MapPin, text: '新北市土城區亞洲路11巷1弄17號' },
];

const socialLinks = [
  { icon: Share2, href: '#', label: '分享' },
  { icon: MessageSquare, href: '#', label: '訊息' },
];

const Footer = () => {
  const footerRef = useScrollReveal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={footerRef} className="py-12 lg:py-16 reveal">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">聖大資訊</h3>
              <p className="text-foreground/70 mb-6">
                專業的二手電腦銷售、租賃、維修與企業 IT 解決方案服務。
              </p>

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
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-bold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-lg font-bold mb-4">聯絡資訊</h4>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary mt-0.5" />
                    </div>
                    <p className="text-foreground/70">{info.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} 聖大資訊有限公司. 版權所有
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
