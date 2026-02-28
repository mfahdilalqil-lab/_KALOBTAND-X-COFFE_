import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// ✅ Satoshi dari Fontsource (CDN) — aman untuk build
import '@fontsource/satoshi/400.css';
import '@fontsource/satoshi/700.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Kalobtand X Coffee',
    template: '%s | Kalobtand X Coffee',
  },
  description: 'Artisanal coffee crafted with precision, passion, and zero-waste philosophy.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Kalobtand X Coffee',
    description: 'Where every cup tells a story.',
    url: 'https://kalobtandxcoffee.com',
    siteName: 'Kalobtand X Coffee',
    images: [
      {
        url: '/og/hero-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
  }
