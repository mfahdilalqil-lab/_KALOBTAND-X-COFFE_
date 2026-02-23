'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

// Preloaded menu items (6 pertama)
const PRELOADED_MENU = [
  { id: 'c01', name: 'Single Origin Kalimantan', price: 'Rp 65.000', image: '/menu/coffee-01.webp', priority: true },
  { id: 'c02', name: 'Cold Brew Signature', price: 'Rp 58.000', image: '/menu/coffee-02.webp', priority: true },
  { id: 'n01', name: 'Iced Chocolate', price: 'Rp 52.000', image: '/menu/non-coffee-01.webp', priority: true },
  { id: 'p01', name: 'Chocolate Brownie', price: 'Rp 45.000', image: '/menu/pastry-01.webp', priority: true },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dark mode persistence
  useEffect(() => {
    const darkMode = localStorage.getItem('kalobtand-dark-mode') || 'dark';
    if (darkMode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="relative">
      {/* Hero Section - Particle Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Solid background with subtle particle animation */}
        <div 
          className="absolute inset-0 bg-[#0D0B0A] opacity-95"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(77,131,255,0.05) 0%, transparent 20%),
              radial-gradient(circle at 90% 80%, rgba(199,107,76,0.05) 0%, transparent 20%)
            `,
            backgroundSize: '100% 100%',
          }}
        />
                {/* Particle animation (CSS-only) */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#4D83FF] rounded-full opacity-20 animate-float"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Ruang Tenang untuk Ide Besar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-300"
          >
            Setiap cangkir diperlakukan seperti karya seni
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/booking" 
              className="inline-block bg-gradient-to-r from-[#C76B4C] to-[#E8C9A9] text-[#0D0B0A] font-bold py-4 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-[#C76B4C]/30 transition-all duration-300"
            >
              Reserve Your Table
            </Link>
          </motion.div>
        </div>

        {/* Floating WhatsApp Button */}        <div className="hidden md:block absolute bottom-8 right-8 z-50">
          <a 
            href="https://wa.me/6281234567890?text=Halo%20Kalobtand%20X%20Coffee,%20saya%20ingin%20booking%20meja"
            className="flex items-center gap-2 bg-[#4D83FF] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#3a6fd8] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <Phone className="w-5 h-5" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Filosofi Kami</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Dibangun di atas prinsip kesederhanaan dan keahlian. Kami memilih biji kopi terbaik dari petani lokal di Kalimantan, 
              diproses dengan teknik modern namun tetap menghormati tradisi. Setiap cangkir adalah hasil kolaborasi antara alam dan teknologi.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <CoffeeBean />, text: '100% Biji Lokal' },
                { icon: <Leaf />, text: 'Zero Waste Brewing' },
                { icon: <Award />, text: 'Barista Bersertifikat' },
                { icon: <Users />, text: 'Ruang Kolaborasi' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-[#C76B4C] mt-1">{item.icon}</div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/story-bg.webp"
              alt="Proses roasting biji kopi Kalimantan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 px-4 bg-[#1A1816]">        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Koleksi Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Temukan karya seni dalam setiap cangkir. Dibuat dengan presisi dan disajikan dengan kehangatan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRELOADED_MENU.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#0D0B0A] rounded-xl overflow-hidden border border-[#2D2A26] hover:border-[#C76B4C] transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority={item.priority}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Solid color placeholder fallback */}
                  <div className="absolute inset-0 bg-[#1A1816] animate-pulse" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 truncate">{item.name}</h3>
                  <p className="text-[#C76B4C] font-bold">{item.price}</p>
                  <Link 
                    href={`/menu/${item.id}`}
                    className="mt-3 inline-block text-sm text-[#4D83FF] hover:text-[#3a6fd8] transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/menu" 
              className="inline-flex items-center gap-2 text-[#C76B4C] font-medium hover:text-[#E8C9A9] transition-colors"
            >
              Jelajahi Seluruh Menu <ArrowRight className="w-4 h-4" />            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper components (minimal implementation)
const CoffeeBean = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const Leaf = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const Award = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const Users = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
