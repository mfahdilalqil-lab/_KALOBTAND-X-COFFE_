import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface StatsCardsProps {
  bookings: Booking[];
}

export function StatsCards({ bookings }: StatsCardsProps) {
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalGuests = bookings.reduce((sum, booking) => sum + booking.guests, 0);

  const stats = [
    { title: 'Total Bookings', value: totalBookings, change: '+12%' },
    { title: 'Confirmed', value: confirmedBookings, change: '+8%' },
    { title: 'Pending', value: pendingBookings, change: '-3%' },
    { title: 'Total Guests', value: totalGuests, change: '+15%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-[#1A1816] border border-[#2D2A26]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-500 mt-1">{stat.change} from last week</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
      }
