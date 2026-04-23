'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useScrollReveal } from '@/lib/useScrollReveal';

const contactInfo = [
  {
    icon: Phone,
    title: '電話',
    content: '+886-931330086',
    link: 'tel:+886931330086',
  },
  {
    icon: Mail,
    title: '電子郵件',
    content: 'teching_chen2000@gmail.com',
    link: 'mailto:teching_chen2000@gmail.com',
  },
  {
    icon: MapPin,
    title: '地址',
    content: '新北市土城區亞洲路11巷1弄17號',
  },
  {
    icon: Clock,
    title: '營業時間',
    content: '週一至週五 09:00-18:00',
  },
];

const ContactSection = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div ref={sectionRef} className="container relative mx-auto px-4 sm:px-6 lg:px-8 reveal">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            聯絡我們
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            立即聯絡我們
          </h2>

          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            有任何問題或需要報價嗎？請填寫以下表單或直接聯絡我們，我們將盡快回覆您。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">傳送訊息</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">訊息已傳送成功！</h4>
                  <p className="text-muted">我們會盡快回覆您，謝謝。</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="姓名"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="請輸入您的姓名"
                    />
                    <Input
                      label="電子郵件"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>

                  <Input
                    label="電話"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+886 912 345 678"
                  />

                  <TextArea
                    label="訊息內容"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="請詳細描述您的需求..."
                    rows={5}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '傳送中...' : '傳送訊息'}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <Card key={info.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-foreground/80 hover:text-accent transition-colors block"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-foreground/80">{info.content}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
