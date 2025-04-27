
import React from 'react';
import { bookings } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ActivityList: React.FC = () => {
  const { user } = useAuth();
  
  // Filter bookings for the current user
  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  
  const pendingBookings = userBookings.filter(
    booking => booking.status === 'pending' || booking.status === 'high-priority'
  );
  
  const approvedBookings = userBookings.filter(booking => booking.status === 'approved');
  const rejectedBookings = userBookings.filter(booking => booking.status === 'rejected');
  
  const handleCancelRequest = () => {
    toast.success('Request cancelled successfully');
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    let bgColor = '';
    
    switch(status) {
      case 'pending':
        bgColor = 'bg-yellow-600';
        break;
      case 'high-priority':
        bgColor = 'bg-red-600';
        break;
      case 'approved':
        bgColor = 'bg-green-600';
        break;
      case 'rejected':
        bgColor = 'bg-red-700';
        break;
      default:
        bgColor = 'bg-gray-600';
    }
    
    return (
      <Badge className={bgColor}>
        {status === 'high-priority' ? 'Priority' : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const ActivityCard = ({ booking }: { booking: typeof bookings[0] }) => (
    <Card className="mb-4 animate-scale-in hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{booking.purpose}</CardTitle>
          {getStatusBadge(booking.status)}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 text-sm space-y-2">
          <p><span className="font-medium">Venue:</span> {booking.venueName}</p>
          <p><span className="font-medium">Date Requested:</span> {formatDate(booking.createdAt)}</p>
          <p><span className="font-medium">Attendees:</span> {booking.attendees}</p>
          <p><span className="font-medium">Target Audience:</span> {booking.targetAudience || 'Not specified'}</p>
        </div>
        
        {booking.adminFeedback && (
          <div className="bg-gray-100 p-3 rounded-md mb-4">
            <p className="text-sm font-medium">Admin Feedback:</p>
            <p className="text-sm">{booking.adminFeedback.comment}</p>
          </div>
        )}
        
        {booking.status === 'pending' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCancelRequest}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 btn-animated"
          >
            Cancel Request
          </Button>
        )}
      </CardContent>
    </Card>
  );
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Activity</h2>
      
      {userBookings.length === 0 ? (
        <Card className="p-8 text-center animate-slide-in">
          <div className="flex flex-col items-center justify-center">
            <Calendar size={48} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No booking activity yet</h3>
            <p className="text-gray-500 mb-4">You haven't made any booking requests yet.</p>
            <div className="flex gap-3">
              <Button className="bg-edu-primary hover:bg-edu-dark btn-animated">
                Book a Venue
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="btn-animated">
                Book an Event
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending
              {pendingBookings.length > 0 && (
                <Badge className="ml-2 bg-edu-primary h-5 w-5 flex items-center justify-center p-0">
                  {pendingBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingBookings.length === 0 ? (
              <p className="text-center text-gray-500">No pending requests</p>
            ) : (
              pendingBookings.map(booking => (
                <ActivityCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {approvedBookings.length === 0 ? (
              <p className="text-center text-gray-500">No approved requests</p>
            ) : (
              approvedBookings.map(booking => (
                <ActivityCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            {rejectedBookings.length === 0 ? (
              <p className="text-center text-gray-500">No rejected requests</p>
            ) : (
              rejectedBookings.map(booking => (
                <ActivityCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {userBookings.map(booking => (
              <ActivityCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ActivityList;
