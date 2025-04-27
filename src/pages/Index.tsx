
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  React.useEffect(() => {
    // If user is already logged in, redirect to their dashboard
    if (isAuthenticated && user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-primary to-edu-dark text-white">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
          <h1 className="text-4xl md:text-6xl font-bold animate-slide-in">
            Unified Educational Portal
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-slide-in animation-delay-100">
            A comprehensive platform for managing venue bookings,
            event scheduling, and educational resources in one place.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-slide-in animation-delay-200">
            <Button 
              onClick={() => navigate('/login')} 
              size="lg"
              className="bg-white text-edu-dark hover:bg-gray-100 btn-animated"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/signup')} 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white/10 btn-animated"
            >
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-scale-in card-animated">
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Venue Booking</h3>
            <p className="text-white/80">Book lecture theaters, classrooms, and labs for your educational needs.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-scale-in animation-delay-100 card-animated">
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Event Management</h3>
            <p className="text-white/80">Plan and organize department events, conferences, and club activities.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-scale-in animation-delay-200 card-animated">
            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Request Tracking</h3>
            <p className="text-white/80">Monitor the status of your bookings and requests in real-time.</p>
          </div>
        </div>
        
        <div className="mt-20 max-w-2xl mx-auto text-center animate-slide-in">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who can use this portal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
              <h3 className="font-semibold text-lg mb-2">Administrators</h3>
              <p className="text-sm opacity-90">Manage requests, approve bookings, and oversee all activities.</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
              <h3 className="font-semibold text-lg mb-2">Faculty</h3>
              <p className="text-sm opacity-90">Book venues, coordinate events, and provide recommendations.</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
              <h3 className="font-semibold text-lg mb-2">Students</h3>
              <p className="text-sm opacity-90">Request spaces for clubs, study groups, and student activities.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-6 text-center text-white/70 text-sm">
        <p>© 2025 Unified Educational Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
