import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AeroJet 肌因槍 | 革命性無創美容藥物導入系統',
  description: '京華堂研發第六代 AeroJet，以 405m/s 高速氣動力將微米級活性成分直達真皮層。無痛、無創、適用外泌體與玻尿酸。',
  alternates: {
    languages: {
      'zh-TW': 'https://domain.com/tw/',
      'en': 'https://domain.com/en/',
      'ja': 'https://domain.com/ja/',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "使用 AeroJet 肌因槍療程會有痛感嗎？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "完全無痛無創。AeroJet 採用氣動與微米級霧化技術，以 405m/s 的速度瞬間穿透角質層，患者僅會感受到溫和的氣流與微震波按摩。"
      }
    }, {
      "@type": "Question",
      "name": "療程後需要多久的恢復期？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "零恢復期。不產生開放性傷口，療程結束後即可立即恢復正常作息與上妝。"
      }
    }]
  };

  return (
    <html lang="zh-TW" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
