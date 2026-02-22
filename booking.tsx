'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BookingForm } from '@/components/ui/BookingForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const { toast } = useToast();

  // Fetch real-time availability from Supabase
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        // Simulated API call (replace with actual Supabase query)
        const mockSlots = [
          '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
        ];
        setAvailableSlots(mockSlots);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load availability',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // In real implementation: fetch availability for new date
  };

  const handleSubmit = async (data: any) => {
    // In real implementation: submit to Supabase
    toast({ 
      title: 'Success', 
      description: 'Booking confirmed!' 
    });
  };
  return (
    <div className="min-h-screen bg-[#0D0B0A] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Reserve Your Table</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your date and time, then fill in the details below. We'll send a confirmation via
            WhatsApp.
          </p>
        </div>

        {/* Date Picker */}
        <div className="mb-8">
          <label className="block text-gray-400 mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-4 border border-gray-700 rounded bg-[#1A1816]
                     text-[#E8C9A9] focus:outline-none focus:ring-2 focus:ring-[#C76B4C]"
          />
        </div>

        {/* Live Availability Badge */}
        {selectedDate && (
          <div className="mb-6 p-4 bg-[#1A1816] rounded-lg border border-[#2D2A26]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#C76B4C] rounded-full animate-pulse" />
              <p className="text-[#E8C9A9]">
                {availableSlots.length > 0
                  ? `Hanya ${availableSlots.length} slot tersisa untuk ${selectedDate}`
                  : 'Tidak ada slot tersedia'}
              </p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <BookingForm onSubmit={handleSubmit} />
        )}
        {/* Quick Tips */}
        <div className="mt-12 p-6 bg-[#1A1816] rounded-xl border border-[#2D2A26]">
          <h3 className="text-lg font-bold mb-2">Booking Tips</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>Book 3-7 days in advance for peak hours</li>
            <li>Special requests? Add them in the notes section</li>
            <li>Confirmation will be sent via WhatsApp</li>
          </ul>
        </div>
      </div>
    </div>
  );
    }
