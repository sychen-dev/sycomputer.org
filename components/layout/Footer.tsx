import Link from 'next/link';

const quickLinks = [
  { href: '#about', label: '關於聖大' },
  { href: '#services', label: '服務項目' },
  { href: '#portfolio', label: '建置案例' },
  { href: '#contact', label: '聯絡我們' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="h-2.5 w-2.5 bg-accent" />
              <span className="text-lg font-black tracking-tight">聖大資訊</span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-soft">
                SHANGDA PC
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-soft">
              二手電腦銷售・租賃・維修・企業 IT 建置。每台機器出貨前完成檢測整備,購買與租賃均含免費保固。
            </p>
          </div>

          <nav aria-label="頁尾導覽">
            <h3 className="font-mono text-xs tracking-[0.15em] text-soft">SITEMAP</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs tracking-[0.15em] text-soft">CONTACT</h3>
            <ul className="mt-4 space-y-2.5 font-mono text-sm text-soft">
              <li>
                <a href="tel:+886931330086" className="transition-colors hover:text-ink">
                  0931-330-086
                </a>
              </li>
              <li>
                <a
                  href="mailto:teching_chen2000@gmail.com"
                  className="break-all transition-colors hover:text-ink"
                >
                  teching_chen2000@gmail.com
                </a>
              </li>
              <li className="font-sans">新北市土城區亞洲路11巷1弄17號</li>
              <li className="font-sans">週一至週五 09:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-soft">
            &copy; {currentYear} 聖大資訊有限公司
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-soft">
            TUCHENG · NEW TAIPEI · TAIWAN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
