
import React from 'react';
import { bookings } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ActivityList: React.FC = () => {
  const { user } = useAuth();
  
  // Filter bookings for the current user
  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-700';
      case 'high-priority':
        return 'bg-red-600';
      case 'pending':
      default:
        return 'bg-yellow-600';
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Booking Activities</h2>
      
      {userBookings.length > 0 ? (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request Type</TableHead>
                  <TableHead>Purpose/Event</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      {booking.venueName.includes('LT') || booking.venueName.includes('CR') 
                        ? 'Venue Booking' 
                        : 'Event Package'}
                    </TableCell>
                    <TableCell>{booking.purpose}</TableCell>
                    <TableCell>{booking.venueName}</TableCell>
                    <TableCell>{formatDate(booking.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Admin Feedback</h3>
          {userBookings.some(booking => booking.adminFeedback) ? (
            <div className="space-y-4">
              {userBookings
                .filter(booking => booking.adminFeedback)
                .map(booking => (
                  <Card key={`feedback-${booking.id}`} className="animate-scale-in">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{booking.purpose}</h4>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Admin Feedback:</span> {booking.adminFeedback?.comment}
                      </p>
                      <p className="text-xs text-gray-500">
                        Provided on: {booking.adminFeedback ? formatDate(booking.adminFeedback.date) : ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No feedback received from administrators yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">You haven't submitted any booking requests yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivityList;
