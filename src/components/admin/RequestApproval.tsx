
import React, { useState, useEffect } from 'react';
import { bookings } from '@/services/mockData';
import { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const RequestCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  
  const handleAction = (actionType: 'approve' | 'reject') => {
    setAction(actionType);
    setIsDialogOpen(true);
  };
  
  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Update the booking status in the mock data
    const bookingIndex = bookings.findIndex(b => b.id === booking.id);
    if (bookingIndex !== -1) {
      bookings[bookingIndex] = {
        ...bookings[bookingIndex],
        status: action === 'approve' ? 'approved' : 'rejected',
        adminFeedback: {
          adminId: 'admin-1',
          comment: feedback,
          date: new Date().toISOString(),
        }
      };
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
      setIsDialogOpen(false);
      setFeedback('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const contactUser = () => {
    toast.info(`Opening chat with ${booking.userName}...`);
  };
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow p-4 animate-slide-from-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <h3 className="font-semibold">{booking.purpose}</h3>
            <Badge className={
              booking.status === 'pending' ? 'bg-yellow-600' : 
              booking.status === 'approved' ? 'bg-green-600' :
              booking.status === 'high-priority' ? 'bg-red-600' : 'bg-red-700'
            }>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Venue:</span> {booking.venueName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Requested by:</span> {booking.userName} ({booking.userRole})
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Attendees:</span> {booking.attendees}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Submitted on:</span> {formatDate(booking.createdAt)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Target audience:</span> {booking.targetAudience || 'Not specified'}
          </p>
          
          {booking.facultyRecommendation && (
            <div className="mt-3 p-2 bg-edu-primary bg-opacity-10 rounded-md">
              <p className="text-sm font-medium text-edu-dark">Faculty Recommendation:</p>
              <p className="text-sm italic">{booking.facultyRecommendation.comment}</p>
              <p className="text-xs text-gray-600 mt-1">- {booking.facultyRecommendation.facultyName}</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2 sm:flex-col">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleAction('approve')}
            className="btn-animated bg-green-50 hover:bg-green-100 hover:text-green-700 border-green-200"
            disabled={booking.status !== 'pending' && booking.status !== 'high-priority'}
          >
            <Check size={16} className="mr-1" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleAction('reject')}
            className="btn-animated bg-red-50 hover:bg-red-100 hover:text-red-700 border-red-200"
            disabled={booking.status !== 'pending' && booking.status !== 'high-priority'}
          >
            <X size={16} className="mr-1" />
            Reject
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={contactUser}
            className="btn-animated"
          >
            <MessageSquare size={16} className="mr-1" />
            Contact
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve Request' : 'Reject Request'}
            </DialogTitle>
            <DialogDescription>
              {action === 'approve' 
                ? 'Provide any additional instructions or comments for the user.'
                : 'Please provide a reason for rejecting this request.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Enter your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            
            {action === 'approve' && (
              <div className="space-y-2">
                <Label htmlFor="extraPermissions">Additional Permissions Required</Label>
                <Input
                  id="extraPermissions"
                  placeholder="e.g., Security clearance, AV equipment access"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {isSubmitting ? 'Submitting...' : action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const RequestApproval: React.FC = () => {
  // Force a re-render initially
  const [, updateState] = useState<Object>();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  
  useEffect(() => {
    // Force update when component mounts to ensure latest bookings are shown
    forceUpdate();
  }, [forceUpdate]);
  
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const highPriorityRequests = bookings.filter(b => b.status === 'high-priority');
  
  const ltcrRequests = bookings.filter(
    b => (b.status === 'pending' || b.status === 'high-priority') && 
    (b.venueName.includes('LT') || b.venueName.includes('CR'))
  );
  
  const eventRequests = bookings.filter(
    b => (b.status === 'pending' || b.status === 'high-priority') && 
    !(b.venueName.includes('LT') || b.venueName.includes('CR'))
  );
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Request Approval</h2>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="ltcr">LT/CR Bookings</TabsTrigger>
          <TabsTrigger value="events">Event Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {pendingRequests.length === 0 && highPriorityRequests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No pending requests to approve.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {highPriorityRequests.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-3 text-red-600 flex items-center">
                    High Priority Requests
                  </h3>
                  {highPriorityRequests.map(booking => (
                    <RequestCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
              
              {pendingRequests.length > 0 && (
                <div>
                  <h3 className="text-xl font-medium mb-3">Pending Requests</h3>
                  {pendingRequests.map(booking => (
                    <RequestCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="ltcr" className="space-y-4">
          {ltcrRequests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No pending LT/CR booking requests.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {ltcrRequests.map(booking => (
                <RequestCard key={booking.id} booking={booking} />
              ))}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          {eventRequests.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No pending event booking requests.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {eventRequests.map(booking => (
                <RequestCard key={booking.id} booking={booking} />
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestApproval;
