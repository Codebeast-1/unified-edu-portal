
import React, { useState } from 'react';
import { venues, timeSlots } from '@/services/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeSlot, Venue } from '@/types';
import { toast } from 'sonner';
import { CheckCircle, Users, Calendar } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [purpose, setPurpose] = useState('');
  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const venueTimeSlots = timeSlots.filter(slot => slot.isAvailable);
  const availableDates = Array.from(new Set(venueTimeSlots.map(slot => slot.date)));
  
  const filteredTimeSlots = selectedDate 
    ? venueTimeSlots.filter(slot => slot.date === selectedDate)
    : [];
  
  const handleSlotToggle = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(prev => prev.filter(id => id !== slotId));
    } else {
      setSelectedSlots(prev => [...prev, slotId]);
    }
  };
  
  const handleSubmit = () => {
    if (!purpose || !description || !attendees || selectedSlots.length === 0 || !targetAudience) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Booking request submitted successfully!');
      setIsBookingOpen(false);
      setPurpose('');
      setDescription('');
      setAttendees('');
      setSelectedSlots([]);
      setTargetAudience('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <Card className="animate-scale-in hover:shadow-lg transition-shadow card-animated">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={venue.image || 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&h=400'} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-edu-primary">
          {venue.type}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{venue.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <Users size={16} className="mr-1" />
              <p className="text-sm">Capacity: {venue.capacity}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-1">
            {venue.facilities.map((facility, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {facility}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={() => setIsBookingOpen(true)}
          className="w-full btn-animated bg-edu-primary hover:bg-edu-dark"
        >
          Book Now
        </Button>
      </CardContent>
      
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Book {venue.name}</DialogTitle>
            <DialogDescription>
              Fill out the details below to request this venue.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Booking Purpose</Label>
              <Input 
                id="purpose" 
                placeholder="e.g., Club Meeting, Study Group" 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Briefly describe the event or purpose" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attendees">Expected Attendees</Label>
              <Input 
                id="attendees" 
                type="number" 
                placeholder="Number of attendees"
                value={attendees} 
                onChange={(e) => setAttendees(e.target.value)}
              />
              {parseInt(attendees) > venue.capacity && (
                <p className="text-sm text-red-600">
                  Exceeds venue capacity of {venue.capacity}
                </p>
              )}
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
              <Label>Select Date</Label>
              <Select onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a date" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {formatDate(date)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedDate && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2">
                  {filteredTimeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      type="button"
                      variant={selectedSlots.includes(slot.id) ? "default" : "outline"}
                      className={`text-xs h-auto py-1 ${
                        selectedSlots.includes(slot.id) ? "bg-edu-primary" : ""
                      }`}
                      onClick={() => handleSlotToggle(slot.id)}
                    >
                      {slot.startTime} - {slot.endTime}
                      {selectedSlots.includes(slot.id) && (
                        <CheckCircle size={14} className="ml-1" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
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

const VenueBooking: React.FC = () => {
  const lectureTheaters = venues.filter(venue => venue.type === 'LT');
  const classrooms = venues.filter(venue => venue.type === 'CR');
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">LT/CR Booking</h2>
      
      <Tabs defaultValue="lt">
        <TabsList className="mb-6">
          <TabsTrigger value="lt">Lecture Theaters</TabsTrigger>
          <TabsTrigger value="cr">Classrooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lt" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectureTheaters.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cr" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VenueBooking;
