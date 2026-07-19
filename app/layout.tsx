import type { Metadata } from "next";
import { Noto_Sans_TC, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "聖大資訊 Shangda PC|二手電腦銷售・租賃・維修",
  description:
    "新北土城的二手電腦專門店。商用電腦銷售與租賃、維修保養、企業 IT 建置,出貨前完成檢測整備,購買與租賃均含免費保固,平均為企業省下 50% 硬體建置成本。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${notoSansTC.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var root = document.documentElement;
                root.classList.add('js');

                function getInitialTheme() {
                  try {
                    var persistedTheme = localStorage.getItem('theme');
                    if (persistedTheme === 'light' || persistedTheme === 'dark') {
                      return persistedTheme;
                    }
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } catch (e) {
                    return 'light';
                  }
                }

                var theme = getInitialTheme();
                root.classList.add(theme);
                try { localStorage.setItem('theme', theme); } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
