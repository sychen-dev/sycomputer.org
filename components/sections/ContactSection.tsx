'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { useLanguage } from '@/components/context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    // 3秒後重置成功狀態
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: '電話 / Phone',
      content: '+886-926577858',
      link: 'tel:+886926577858',
    },
    {
      icon: Mail,
      title: '電子郵件 / Email',
      content: 'qazxsw9295@gmail.com',
      link: 'mailto:qazxsw9295@gmail.com',
    },
    {
      icon: MapPin,
      title: '地址 / Address',
      content: '新竹市東區大學路1001號',
      enContent: 'No. 1001, University Rd., East Dist., Hsinchu City',
    },
    {
      icon: Clock,
      title: '營業時間 / Business Hours',
      content: '週一至週五 09:00-18:00',
      enContent: 'Monday to Friday 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            聯絡我們 / Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            立即聯絡我們
            <span className="block text-xl sm:text-2xl text-muted mt-3 font-normal">
              Get In Touch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/80 max-w-3xl mx-auto"
          >
            有任何問題或需要報價嗎？請填寫以下表單或直接聯絡我們，我們將盡快回覆您。
            <span className="block text-sm text-muted mt-2">
              Have questions or need a quote? Fill out the form below or contact us directly. We'll get back to you as soon as possible.
            </span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">
                傳送訊息 / Send Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">訊息已傳送成功！</h4>
                  <p className="text-muted">我們會盡快回覆您，謝謝。</p>
                  <p className="text-sm text-muted mt-2">Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="姓名 / Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="請輸入您的姓名"
                    />
                    <Input
                      label="電子郵件 / Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>

                  <Input
                    label="電話 / Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+886 912 345 678"
                  />

                  <TextArea
                    label="訊息內容 / Message"
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
                    <span className="text-sm opacity-80">Send Message</span>
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground/80 hover:text-accent transition-colors block"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-foreground/80">
                          {info.content}
                        </p>
                      )}
                      {info.enContent && (
                        <p className="text-sm text-muted mt-1">
                          {info.enContent}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <h4 className="font-bold text-lg mb-4">
                  社交媒體 / Social Media
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'LINE', color: 'bg-green-500', href: 'https://lin.ee/6GugdVj' },
                    { name: 'Facebook', color: 'bg-blue-600', href: '#' },
                    { name: 'Instagram', color: 'bg-pink-500', href: '#' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;