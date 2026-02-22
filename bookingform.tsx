'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import dynamic from 'next/dynamic';

// Dynamically import Turnstile to avoid SSR issues
const Turnstile = dynamic(() => import('react-cloudflare-turnstile'), {
  ssr: false,
});

interface FormData {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes: string;
}

interface BookingFormProps {
  onSubmit: (data: FormData) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '',
    notes: '',
  });
  const [captchaToken, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security checks    if (!captchaToken) {
      toast({
        title: 'Error',
        description: 'Please complete CAPTCHA verification',
        variant: 'destructive'
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^[+]?[\d\s\-\(\)]{11,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: 'Error',
        description: 'Invalid phone number format',
        variant: 'destructive'
      });
      return;
    }

    // Rate limiting check (client-side)
    const lastSubmission = localStorage.getItem('booking-submission');
    if (lastSubmission) {
      const timeDiff = Date.now() - parseInt(lastSubmission);
      if (timeDiff < 60000) { // 1 minute cooldown
        const remaining = Math.ceil((60000 - timeDiff) / 1000);
        toast({
          title: 'Too many requests',
          description: `Please wait ${remaining} seconds before submitting another booking`,
          variant: 'destructive'
        });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize inputs (critical for security)
      const sanitizedData = {
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''), // Remove non-digit characters
        notes: formData.notes.trim(),
      };

      // Store submission timestamp for rate limiting
      localStorage.setItem('booking-submission', Date.now().toString());
      
      await onSubmit(sanitizedData);      
      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        guests: '2',
        date: '',
        time: '',
        notes: '',
      });
      setToken('');
      
      toast({
        title: 'Success',
        description: 'Booking confirmed! You will receive a confirmation via WhatsApp.'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit booking. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Phone Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            required
            aria-required="true"
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">WhatsApp Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+6281234567890"            required
            aria-required="true"
            pattern="[+0-9\s\-\(\)]{11,15}"
          />
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className="w-full p-3 border border-gray-700 rounded bg-[#1A1816] text-[#E8C9A9] focus:outline-none focus:ring-2 focus:ring-[#C76B4C]"
            required
          >
            <option value="">Select time slot</option>
            {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guests & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <select
            id="guests"
            value={formData.guests}
            onChange={(e) => handleChange('guests', e.target.value)}
            className="w-full p-3 border border-gray-700 rounded bg-[#1A1816] text-[#E8C9A9] focus:outline-none focus:ring-2 focus:ring-[#C76B4C]"
          >
            {[2, 4, 6, 8, 10].map(num => (
              <option key={num} value={num.toString()}>{num} guests</option>
            ))}          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Special Requests</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="E.g. Allergies, birthday celebration"
            rows={3}
            maxLength={500}
          />
        </div>
      </div>

      {/* Terms & CAPTCHA */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{' '}
            <a href="/terms" className="text-[#C76B4C] hover:underline">terms and conditions</a>
          </Label>
        </div>
        
        {/* Cloudflare Turnstile CAPTCHA */}
        <div className="pt-4">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
            onSuccess={setToken}
            options={{ theme: 'dark' }}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !captchaToken}
          className="w-full bg-gradient-to-r from-[#C76B4C] to-[#E8C9A9] text-[#0D0B0A] font-bold py-4 hover:shadow-lg hover:shadow-[#C76B4C]/30 transition-all duration-300"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
    }
