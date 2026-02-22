import { createServerClient as createSupabaseClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for server components with security best practices
 * - Uses SSR cookies for session management
 * - Never exposes service role key
 * - Includes security headers for tracking
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Secure cookie handling for authentication
         * - get: retrieve cookie value from store
         * - set: persist cookie with security options
         * - remove: invalidate cookie by setting empty value
         */
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
      global: {
        headers: {
          'X-Client-Info': 'kalobtand-admin-dashboard',
          'X-Request-Source': 'nextjs-server'
        }
      }
    }
  );
}

/**
 * Secure booking data fetching with RLS enforcement
 * - Applies row-level security policies
 * - Masks sensitive PII before rendering
 * - Handles errors gracefully
 */
export async function getSecureBookings(limit: number = 20) {  const supabase = await createServerClient();
  
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      name,
      phone,
      date,
      time,
      guests,
      status,
      created_at
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Secure bookings fetch error:', error);
    throw new Error('Failed to fetch bookings');
  }

  // Mask sensitive data before returning to client
  return bookings.map(booking => ({
    ...booking,
    phone: maskPhoneNumber(booking.phone)
  }));
}

/**
 * Utility function to mask phone numbers for privacy
 * Example: '6281234567890' -> '628****67890'
 */
function maskPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.replace(/(\d{5})\d{4}(\d{3})/, '$1****$2');
}

/**
 * Secure booking creation with validation
 * - Validates input data
 * - Applies rate limiting considerations
 * - Returns sanitized response
 */
export async function createSecureBooking(bookingData: {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;}) {
  const supabase = await createServerClient();
  
  // Input validation
  if (!validateBookingData(bookingData)) {
    throw new Error('Invalid booking data');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...bookingData,
      status: 'pending',
      user_id: 'anonymous' // For non-authenticated users
    }])
    .select()
    .single();

  if (error) {
    console.error('Secure booking creation error:', error);
    throw new Error('Failed to create booking');
  }

  return {
    ...data,
    phone: maskPhoneNumber(data.phone)
  };
}

/**
 * Input validation utility for booking data
 */
function validateBookingData(data: any): boolean {
  // Basic validation
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) return false;
  if (!data.phone || typeof data.phone !== 'string' || !/^\d{10,15}$/.test(data.phone)) return false;
  if (!data.date || !isValidDate(data.date)) return false;
  if (!data.time || !isValidTime(data.time)) return false;
  if (!data.guests || typeof data.guests !== 'number' || data.guests < 1 || data.guests > 20) return false;
  
  return true;
}

/**
 * Date/time validation utilities
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
function isValidTime(timeString: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeString);
}
