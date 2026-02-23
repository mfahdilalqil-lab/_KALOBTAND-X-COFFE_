import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

interface MenuModalProps {
  item: MenuItem;
  onClose: () => void;
}

export function MenuModal({ item, onClose }: MenuModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-[#1A1816] border border-[#2D2A26] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-[#1A1816] border-b border-[#2D2A26] p-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold text-[#E8C9A9] truncate">{item.name}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#2D2A26] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-[#E8C9A9]" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Image Section */}
            <div className="relative mb-6 group">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#0D0B0A]">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-110' : 'scale-100'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>
              
              {/* Zoom Hint */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Click to {isZoomed ? 'shrink' : 'zoom'}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#C76B4C] font-bold text-lg">{item.price}</span>
                <span className="text-sm text-gray-400 capitalize">{item.category}</span>
              </div>
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={decrement}
                  className="w-10 h-10 rounded-full bg-[#2D2A26] flex items-center justify-center hover:bg-[#4D83FF] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="text-xl font-bold text-[#E8C9A9] w-8 text-center">{quantity}</span>
                
                <button
                  onClick={increment}
                  className="w-10 h-10 rounded-full bg-[#2D2A26] flex items-center justify-center hover:bg-[#4D83FF] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button className="flex items-center gap-2 bg-[#C76B4C] text-[#0D0B0A] px-6 py-3 rounded-lg font-bold hover:bg-[#E8C9A9] transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Special Instructions */}
            <div className="mb-4">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-2">
                Special Instructions
              </label>
              <textarea
                id="instructions"
                rows={3}
                placeholder="E.g. Extra ice, no sugar, etc."
                className="w-full p-3 border border-[#2D2A26] rounded-lg bg-[#0D0B0A] text-[#E8C9A9] focus:outline-none focus:ring-2 focus:ring-[#C76B4C]"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-[#2D2A26] flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-[#2D2A26] rounded-lg text-[#E8C9A9] hover:bg-[#2D2A26] transition-colors"
            >
              Close            </button>
            <button className="px-6 py-2 bg-[#C76B4C] text-[#0D0B0A] rounded-lg font-bold hover:bg-[#E8C9A9] transition-colors">
              Add to Order
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
      }
