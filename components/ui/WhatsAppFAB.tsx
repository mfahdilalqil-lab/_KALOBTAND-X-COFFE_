'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WhatsApp, Clock, Menu, MapPin } from 'lucide-react';

export default function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Show button after scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickReplies = [
    {
      icon: Clock,
      text: 'Cek ketersediaan',
      url: 'https://wa.me/6281234567890?text=Apakah%20ada%20slot%20kosong%20untuk%20besok%20pukul%2018.00?'
    },
    {
      icon: Menu,
      text: 'Rekomendasi menu',
      url: 'https://wa.me/6281234567890?text=Rekomendasikan%20menu%20terbaik%20untuk%20hadiah'
    },
    {
      icon: MapPin,
      text: 'Lokasi & kontak',
      url: 'https://wa.me/6281234567890?text=Bagaimana%20cara%20menghubungi%20kami%20untuk%20acara%20perusahaan%3F'
    }
  ];

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        {/* Main WhatsApp Button */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Kalobtand%20X%20Coffee"
          className="flex items-center gap-2 bg-[#4D83FF] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-[#4D83FF]/30 transition-all duration-300 hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <WhatsApp className="w-6 h-6" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Quick Reply Menu */}
        {isMenuOpen && (
          <div className="absolute bottom-16 right-0 w-64 bg-[#1A1816] rounded-lg border border-[#2D2A26] overflow-hidden shadow-xl z-50">
            <div className="p-4 space-y-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-[#2D2A26] hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(reply.url, '_blank');
                  }}
                >
                  <reply.icon className="w-4 h-4 mr-2" />
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
                                                                                   }
