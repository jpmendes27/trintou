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
  title: 'J · 08.08 · 🤎',
  description: 'Você foi convidado(a) 🤎',
  openGraph: {
    title: 'J · 08.08 · 🤎',
    description: 'Você foi convidado(a) 🤎',
    url: `https://jpmendes.com${base}`,
    type: 'website',
    locale: 'pt_BR',
    images: [`https://jpmendes.com${base}/og.png`],
  },
  icons: {
    icon: [
      { url: `${base}/favicon.ico`, sizes: 'any' },
      { url: `${base}/icon-192.png`, type: 'image/png', sizes: '192x192' },
      { url: `${base}/icon-512.png`, type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: `${base}/apple-icon.png`, sizes: '180x180' }],
  },
  other: {
    'theme-color': '#efe7d6',
  },
};

const marcaJs = `document.documentElement.classList.add('com-js')`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${yeseva.variable} ${cormorant.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: marcaJs }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
