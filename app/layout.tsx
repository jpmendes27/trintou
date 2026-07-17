import type { Metadata } from 'next';
import { Yeseva_One, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const yeseva = Yeseva_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--fonte-titulo',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--fonte-corpo',
});

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Trintou da Jenniffer',
  description:
    '08 de agosto, sábado, meio-dia, no Sítio Valle do Mendanha. Venha de marrom e traga roupa de banho.',
  openGraph: {
    title: 'Trintou da Jenniffer',
    description:
      '08 de agosto, sábado, meio-dia, no Sítio Valle do Mendanha. Venha de marrom e traga roupa de banho.',
    url: `https://jpmendes.com${base}`,
    type: 'website',
    locale: 'pt_BR',
    images: [`https://jpmendes.com${base}/og.png`],
  },
  other: {
    'theme-color': '#efe7d6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${yeseva.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
