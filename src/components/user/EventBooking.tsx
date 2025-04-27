import React, { useState } from 'react';
import { eventPackages, bookings } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const EventPackageCard: React.FC<{ eventPackage: typeof eventPackages[0] }> = ({ eventPackage }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [facultyRef, setFacultyRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const handleSubmit = () => {
    if (!eventName || !description || !attendees || !eventDate || !targetAudience) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new booking entry
    const newBooking = {
      id: uuidv4(),
      userId: user?.id || 'user-1',
      userName: user?.name || 'Test User',
      userRole: (user?.role as 'student' | 'faculty') || 'student',
      venueId: eventPackage.id,
      venueName: eventPackage.name,
      purpose: eventName,
      description: description,
      attendees: parseInt(attendees),
      timeSlots: [eventDate], 
      status: facultyRef ? 'high-priority' : 'pending',
      createdAt: new Date().toISOString(),
      targetAudience: targetAudience,
      ...(facultyRef ? {
        facultyRecommendation: {
          facultyId: 'faculty-1',
          facultyName: facultyRef,
          comment: `Recommended by ${facultyRef}`,
        }
      } : {})
    };
    
    // Add to bookings list
    bookings.unshift(newBooking);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Event booking request submitted successfully!');
      setIsBookingOpen(false);
      setEventName('');
      setDescription('');
      setAttendees('');
      setEventDate('');
      setTargetAudience('');
      setFacultyRef('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Get the current date in YYYY-MM-DD format for the min attribute of the date input
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <Card className="animate-scale-in hover:shadow-lg transition-shadow card-animated">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={eventPackage.image || 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&h=400'} 
          alt={eventPackage.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{eventPackage.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{eventPackage.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Users size={16} className="text-edu-primary mr-2" />
            <p className="text-sm">
              <span className="font-medium">Capacity:</span> {eventPackage.minAttendees} - {eventPackage.maxAttendees} attendees
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Included Venues:</h4>
            <div className="flex flex-wrap gap-1">
              {eventPackage.venues.map((venueId) => {
                const venueType = venueId.includes('venue1') || venueId.includes('venue2') 
                  ? 'LT' 
                  : venueId.includes('venue3') 
                    ? 'CR' 
                    : venueId.includes('venue4') 
                      ? 'CL' 
                      : 'MPH';
                
                return (
                  <Badge key={venueId} variant="outline" className="bg-gray-100">
                    {venueType}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsBookingOpen(true)}
          className="w-full btn-animated bg-edu-primary hover:bg-edu-dark"
        >
          Book Package
        </Button>
      </CardContent>
      
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book {eventPackage.name}</DialogTitle>
            <DialogDescription>
              Fill out the details below to request this event package.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input 
                id="event-name" 
                placeholder="e.g., Annual Tech Conference" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the purpose and activities of the event" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendees">Expected Attendees</Label>
                <Input 
                  id="attendees" 
                  type="number" 
                  placeholder="Number of attendees"
                  value={attendees} 
                  onChange={(e) => setAttendees(e.target.value)}
                  min={eventPackage.minAttendees}
                  max={eventPackage.maxAttendees}
                />
                {parseInt(attendees) > eventPackage.maxAttendees && (
                  <p className="text-sm text-red-600">
                    Exceeds maximum capacity of {eventPackage.maxAttendees}
                  </p>
                )}
                {parseInt(attendees) < eventPackage.minAttendees && parseInt(attendees) > 0 && (
                  <p className="text-sm text-yellow-600">
                    Minimum required attendees: {eventPackage.minAttendees}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-date">Preferred Event Date</Label>
                <Input 
                  id="event-date" 
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={today}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-audience">Target Audience</Label>
              <Select onValueChange={setTargetAudience} value={targetAudience}>
                <SelectTrigger id="target-audience">
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year Students</SelectItem>
                  <SelectItem value="2nd Year">2nd Year Students</SelectItem>
                  <SelectItem value="3rd Year">3rd Year Students</SelectItem>
                  <SelectItem value="4th Year">4th Year Students</SelectItem>
                  <SelectItem value="Department">Specific Department</SelectItem>
                  <SelectItem value="All College">All College</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="faculty-reference">Faculty Reference (Optional)</Label>
                <span className="text-xs text-gray-500">Recommended for priority approval</span>
              </div>
              <Input 
                id="faculty-reference" 
                placeholder="Name of supporting faculty member" 
                value={facultyRef}
                onChange={(e) => setFacultyRef(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-edu-primary hover:bg-edu-dark btn-animated"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const EventBooking: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Event Booking</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eventPackages.map((eventPackage) => (
          <EventPackageCard key={eventPackage.id} eventPackage={eventPackage} />
        ))}
      </div>
    </div>
  );
};

export default EventBooking;
