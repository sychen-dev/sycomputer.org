'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useScrollReveal } from '@/lib/useScrollReveal';

const CONTACT_EMAIL = 'teching_chen2000@gmail.com';

const channels = [
  {
    icon: Phone,
    label: '直接來電',
    value: '0931-330-086',
    mono: true,
    href: 'tel:+886931330086',
  },
  {
    icon: MessageCircle,
    label: 'LINE 線上諮詢',
    value: '加好友快速報價',
    mono: false,
    href: 'https://lin.ee/6GugdVj',
    external: true,
  },
  {
    icon: Mail,
    label: '電子郵件',
    value: CONTACT_EMAIL,
    mono: true,
    href: `mailto:${CONTACT_EMAIL}`,
  },
];

const ContactSection = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `網站需求單 - ${formData.name}`;
    const body = [
      `稱呼:${formData.name}`,
      `聯絡方式:${formData.contact}`,
      '',
      formData.message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="border-t border-line py-20 lg:py-28">
      <div ref={sectionRef} className="reveal-group mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="eyebrow">聯絡我們</p>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            說說你的需求,其他交給我們。
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            電話與 LINE 最快;寫信也可以,我們會盡快回覆。
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="reveal-item space-y-4" style={{ '--rd': '80ms' } as React.CSSProperties}>
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-soft hover:shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]"
              >
                <div className="min-w-0">
                  <p className="text-xs text-soft">{channel.label}</p>
                  <p
                    className={`mt-1.5 truncate text-lg font-semibold tracking-tight ${
                      channel.mono ? 'font-mono' : ''
                    }`}
                  >
                    {channel.value}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                  <channel.icon className="h-5 w-5" />
                </span>
              </a>
            ))}

            <div className="rounded-lg border border-line bg-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed">
                  新北市土城區亞洲路11巷1弄17號
                </p>
              </div>
              <div className="mt-3 flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="font-mono text-sm">週一至週五 09:00–18:00</p>
              </div>
            </div>
          </div>

          <Card
            className="reveal-item p-7 lg:p-8"
            style={{ '--rd': '160ms' } as React.CSSProperties}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-black tracking-tight">需求單</h3>
              <span className="font-mono text-[11px] tracking-[0.15em] text-soft">
                FORM → EMAIL
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="稱呼"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="怎麼稱呼你"
                />
                <Input
                  label="電話或 Email"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="方便回覆你的方式"
                />
              </div>

              <TextArea
                label="需求內容"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="例:辦公用桌機 10 台、預算與交期,或想租賃的設備與期間…"
                rows={6}
              />

              <Button type="submit" className="w-full" size="lg">
                以 Email 送出
                <Send className="h-4 w-4" />
              </Button>

              <p className="font-mono text-xs leading-relaxed text-soft">
                送出後會開啟你的郵件程式;急件請直接來電。
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
