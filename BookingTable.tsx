import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-[#2D2A26]">
          <tr>
            <th className="text-left p-4 text-gray-400 font-normal">ID</th>
            <th className="text-left p-4 text-gray-400 font-normal">Customer</th>
            <th className="text-left p-4 text-gray-400 font-normal">Contact</th>
            <th className="text-left p-4 text-gray-400 font-normal">Date & Time</th>
            <th className="text-left p-4 text-gray-400 font-normal">Guests</th>
            <th className="text-left p-4 text-gray-400 font-normal">Status</th>
            <th className="text-left p-4 text-gray-400 font-normal">Created</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-[#2D2A26] hover:bg-[#1A1816] transition-colors">
              <td className="p-4 font-mono text-xs text-gray-400">{booking.id.slice(0, 8)}...</td>
              <td className="p-4 font-medium">{booking.name}</td>
              <td className="p-4 text-gray-400">{booking.phone}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span>{new Date(booking.date).toLocaleDateString('id-ID')}</span>
                  <span className="text-gray-400 text-sm">{booking.time}</span>
                </div>
              </td>
              <td className="p-4">{booking.guests}</td>
              <td className="p-4">
                <Badge 
                  variant={booking.status === 'confirmed' ? 'success' : booking.status === 'cancelled' ? 'destructive' : 'secondary'}
                  className="capitalize"
                >
                  {booking.status}
                </Badge>
              </td>
              <td className="p-4 text-gray-400 text-sm">
                {new Date(booking.created_at).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {bookings.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No bookings found
        </div>
      )}
    </div>
  );
}
