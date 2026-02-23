import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Satoshi } from '@/fonts';

// Self-hosted Satoshi (WOFF2)
const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: {
    default: 'Kalobtand X Coffee — Luxury Sensory Destination',
    template: '%s | Kalobtand X Coffee',
  },
  description:
    'Five-star coffee experience in Jakarta. Artisanal beans, serene ambiance, seamless booking.',
  keywords: 'premium coffee Jakarta, luxury cafe, coffee booking',
  openGraph: {
    title: 'Kalobtand X Coffee',
    description: 'Where Craft Meets Code',
    url: 'https://kalobtandxcoffee.com',
    siteName: 'Kalobtand X Coffee',
    images: [{ url: '/og/hero-og.jpg', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalobtand X Coffee',
    description: 'Luxury sensory destination for coffee connoisseurs',
    images: ['/og/hero-og.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${satoshi.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Preconnect & Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/hero-bg.webp"
          as="image"
          imagesrcset="/hero-bg-320.webp 320w, /hero-bg-768.webp 768w"
        />

        {/* Plausible Analytics (nonce for CSP) */}
        <script
          defer
          data-domain="kalobtandxcoffee.com"
          src="https://plausible.io/js/script.js"
          nonce="kalobtand-analytics-nonce"
        ></script>
      </head>
      <body className="bg-[#0D0B0A] text-[#E8C9A9] antialiased">
        {children}
      </body>
    </html>
  );
}
