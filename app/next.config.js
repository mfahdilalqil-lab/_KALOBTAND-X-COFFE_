/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Wajib untuk menghindari error 'Module not found' pada font & asset
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,        // untuk supabase-server.ts
      net: false,
      tls: false,
    };
    return config;
  },

  // ✅ Pastikan image optimization tidak error di Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kalobtandxcoffee.com',
        pathname: '/og/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // ✅ Untuk CSP & security header (sesuai blueprint v2)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co;",
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
