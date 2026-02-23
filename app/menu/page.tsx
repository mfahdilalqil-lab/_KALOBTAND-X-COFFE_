'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuModal } from '@/components/ui/MenuModal';
import { MenuCard } from '@/components/ui/MenuCard';

// Menu data with preloaded images (6 items critical)
const MENU_CATEGORIES = [
  {
    id: 'coffee',
    name: 'Coffee',
    items: [
      { id: 'c01', name: 'Single Origin Kalimantan', price: 'Rp 65.000', image: '/menu/coffee-01.webp', description: 'Campuran biji terbaik dari Sumatra dan Ethiopia', priority: true },
      { id: 'c02', name: 'Cold Brew Signature', price: 'Rp 58.000', image: '/menu/coffee-02.webp', description: 'Proses 12 jam untuk cita rasa terdalam', priority: true },
      { id: 'c03', name: 'Espresso Ritual', price: 'Rp 48.000', image: '/menu/coffee-03.webp', description: 'Single origin biji Colombia dengan foam lembut', priority: true },
      { id: 'c04', name: 'Artisan Blend', price: 'Rp 52.000', image: '/menu/coffee-04.webp', description: 'Campuran biji terbaik dari Sumatra dan Ethiopia', priority: true },
    ]
  },
  {
    id: 'non-coffee',
    name: 'Non-Coffee',
    items: [
      { id: 'n01', name: 'Iced Chocolate', price: 'Rp 52.000', image: '/menu/non-coffee-01.webp', description: 'Coklat dingin premium dengan marshmallow', priority: true },
      { id: 'n02', name: 'Matcha Latte', price: 'Rp 48.000', image: '/menu/non-coffee-02.webp', description: 'Matcha premium dari Jepang', priority: true },
      { id: 'n03', name: 'Fresh Lemonade', price: 'Rp 38.000', image: '/menu/non-coffee-03.webp', description: 'Lemon segar dengan madu', priority: false },
      { id: 'n04', name: 'Turmeric Latte', price: 'Rp 46.000', image: '/menu/non-coffee-04.webp', description: 'Alternatif sehat dengan rempah kunyit', priority: false },
    ]
  },
  {
    id: 'pastry',
    name: 'Pastry',
    items: [
      { id: 'p01', name: 'Chocolate Brownie', price: 'Rp 45.000', image: '/menu/pastry-01.webp', description: 'Brownie coklat pekat dengan kacang mete', priority: true },
      { id: 'p02', name: 'Almond Croissant', price: 'Rp 38.000', image: '/menu/pastry-02.webp', description: 'Croissant lembut dengan filling almond', priority: true },
      { id: 'p03', name: 'Red Velvet Cake', price: 'Rp 42.000', image: '/menu/pastry-03.webp', description: 'Kue lembut dengan cream cheese frosting', priority: false },
      { id: 'p04', name: 'Banana Bread', price: 'Rp 35.000', image: '/menu/pastry-04.webp', description: 'Roti pisang dengan taburan gula bubuk', priority: false },
    ]
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen bg-[#0D0B0A]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-[#2D2A26]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#E8C9A9]">Our Menu</h1>
          <div className="flex space-x-4">
            {MENU_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-[#C76B4C] text-[#0D0B0A] font-semibold' 
                    : 'text-gray-400 hover:text-[#E8C9A9]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Menu Grid */}
      <main className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MENU_CATEGORIES.find(cat => cat.id === activeCategory)?.items.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              priority={item.priority}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Menu Modal */}
        {selectedItem && (
          <MenuModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}            className="w-12 h-12 rounded-full bg-[#4D83FF] text-white flex items-center justify-center shadow-lg hover:bg-[#3a6fd8] transition-colors"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2D2A26]">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2026 Kalobtand X Coffee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
        }
