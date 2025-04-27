
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardStats from '../../components/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bookings, venues } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Filter bookings for the current user
  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  
  const pendingBookings = userBookings.filter(
    booking => booking.status === 'pending' || booking.status === 'high-priority'
  );
  
  const recentBookings = [...userBookings].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 3);
  
  const isStudent = user?.role === 'student';
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600">
          {isStudent 
            ? "Manage your venue bookings and event requests"
            : "Track your classroom reservations and event bookings"}
        </p>
      </div>
      
      <DashboardStats role={user?.role as 'student' | 'faculty'} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Quick Actions */}
        <Card className="animate-slide-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <Button 
              className="w-full btn-animated bg-edu-primary hover:bg-edu-dark flex justify-between"
              onClick={() => navigate(`/${user?.role}/venue-booking`)}
            >
              Book Venue
              <ArrowRight size={16} />
            </Button>
            
            <Button 
              className="w-full btn-animated bg-edu-secondary hover:bg-purple-700 flex justify-between"
              onClick={() => navigate(`/${user?.role}/event-booking`)}
            >
              Book Event
              <ArrowRight size={16} />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full btn-animated flex justify-between"
              onClick={() => navigate(`/${user?.role}/activity`)}
            >
              View My Requests
              <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>
        
        {/* My Bookings */}
        <Card className="md:col-span-2 animate-slide-in animation-delay-100">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xl">My Bookings</CardTitle>
            <Button 
              variant="ghost" 
              className="text-sm btn-animated"
              onClick={() => navigate(`/${user?.role}/activity`)}
            >
              View all
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          
          <CardContent>
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{booking.purpose}</h3>
                        <Badge className={
                          booking.status === 'pending' ? 'bg-yellow-600' : 
                          booking.status === 'approved' ? 'bg-green-600' :
                          booking.status === 'high-priority' ? 'bg-red-600' : 'bg-red-700'
                        }>
                          {booking.status === 'high-priority' ? 'Priority' : booking.status}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        {booking.venueName} • {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="btn-animated"
                      onClick={() => navigate(`/${user?.role}/activity`)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>You haven't made any booking requests yet</p>
                <Button 
                  className="mt-3 btn-animated bg-edu-primary hover:bg-edu-dark"
                  onClick={() => navigate(`/${user?.role}/venue-booking`)}
                >
                  Book a Venue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Recommended Venues */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Venues</h2>
          <Button 
            variant="ghost" 
            className="text-sm btn-animated"
            onClick={() => navigate(`/${user?.role}/venue-booking`)}
          >
            View all
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.slice(0, 3).map(venue => (
            <Card key={venue.id} className="animate-scale-in hover:shadow-md transition-shadow card-animated">
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
              
              <CardContent className="p-4">
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-sm text-gray-500">Capacity: {venue.capacity}</p>
                <Button 
                  className="w-full mt-3 btn-animated bg-edu-primary hover:bg-edu-dark"
                  onClick={() => navigate(`/${user?.role}/venue-booking`)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
