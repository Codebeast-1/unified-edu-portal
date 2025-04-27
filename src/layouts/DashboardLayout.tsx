
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bell, 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  LogOut,
  CheckCircle,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: `/${user?.role}/dashboard`,
      roles: ['admin', 'student', 'faculty'] as const,
    },
    {
      label: 'Notifications',
      icon: <Bell size={20} />,
      path: `/${user?.role}/notifications`,
      roles: ['admin', 'student', 'faculty'] as const,
    },
    {
      label: 'Request Approval',
      icon: <CheckCircle size={20} />,
      path: '/admin/requests',
      roles: ['admin'] as const,
    },
    {
      label: 'High Priority',
      icon: <AlertCircle size={20} />,
      path: '/admin/high-priority',
      roles: ['admin'] as const,
    },
    {
      label: 'LT/CR Booking',
      icon: <Calendar size={20} />,
      path: `/${user?.role}/venue-booking`,
      roles: ['student', 'faculty'] as const,
    },
    {
      label: 'Event Booking',
      icon: <BookOpen size={20} />,
      path: `/${user?.role}/event-booking`,
      roles: ['student', 'faculty'] as const,
    },
    {
      label: 'Activity',
      icon: <Calendar size={20} />,
      path: `/${user?.role}/activity`,
      roles: ['student', 'faculty'] as const,
    },
    {
      label: 'Contact Us',
      icon: <MessageSquare size={20} />,
      path: '/contact',
      roles: ['admin', 'student', 'faculty'] as const,
    },
  ];
  
  const filteredNavItems = navItems.filter(
    item => user?.role && item.roles.includes(user.role)
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <h2 className="font-semibold text-lg text-edu-dark">Unified Edu Portal</h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h2 className="font-bold text-xl text-edu-dark">Edu Portal</h2>
          </div>
        </div>
        <Separator />
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start mb-1 btn-animated"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-edu-primary text-white flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="ml-3">
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start btn-animated"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute z-10 w-full">
          <nav className="px-4 py-2">
            {filteredNavItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start my-1"
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Button>
            ))}
            <Separator className="my-2" />
            <Button
              variant="outline"
              className="w-full justify-start my-1"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </nav>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
