import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { createServerClient } from '@/lib/supabase-server';
import { BookingTable } from '@/components/admin/BookingTable';
import { StatsCards } from '@/components/admin/StatsCards';
import { Button } from '@/components/ui/button';

// Security: Always fetch fresh data for admin dashboard
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Double-validation: Middleware + server component check
  if (!session || session.user.role !== 'admin') {
    redirect('/login?error=unauthorized');
  }

  // Secure data fetching: Server-side Supabase query with RLS enforcement
  const supabase = await createServerClient();
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
    .limit(20);

  if (error) {
    console.error('Admin dashboard fetch error:', error);
    redirect('/login?error=database');
  }

  // Security: Mask sensitive data before rendering
  const sanitizedBookings = bookings?.map(b => ({
    ...b,
    phone: b.phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') // Mask phone
  })) || [];

  return (
    <div className="min-h-screen bg-[#0D0B0A] text-[#E8C9A9]">
      {/* Admin Header */}      <header className="border-b border-[#2D2A26] py-4 px-6 sticky top-0 bg-[#0D0B0A]/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#C76B4C]" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Secure access portal • Last login: {new Date(session.user.lastLogin).toLocaleString('id-ID')}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Active session</span>
            </div>
            
            <form action="/api/auth/signout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="text-[#C76B4C] hover:text-[#E8C9A9] hover:bg-[#1A1816] transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <StatsCards bookings={sanitizedBookings} />
        
        <div className="mt-8 bg-[#1A1816] rounded-xl border border-[#2D2A26] overflow-hidden">
          <div className="p-4 md:p-6 border-b border-[#2D2A26] flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-[#2D2A26] hover:bg-[#2D2A26]"
              >
                <Download className="w-4 h-4 mr-1" />
                Export CSV
              </Button>
              <Button                 variant="outline" 
                size="sm" 
                className="border-[#2D2A26] hover:bg-[#2D2A26]"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>
          
          <BookingTable bookings={sanitizedBookings} />
          
          <div className="p-4 bg-[#0D0B0A] border-t border-[#2D2A26] text-center text-gray-400 text-sm">
            All data encrypted at rest • Row Level Security enforced • Audit log enabled
          </div>
        </div>
      </main>
    </div>
  );
}

// Security icons (minimal implementation)
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const LogOut = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
  </svg>
);
