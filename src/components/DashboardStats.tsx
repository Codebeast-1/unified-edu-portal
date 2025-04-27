
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <Card className="hover:shadow-md transition-all animate-scale-in card-animated">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-semibold mt-1">{value}</p>
            {change && (
              <p className={`text-xs mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-edu-primary bg-opacity-10 flex items-center justify-center text-edu-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  role: 'admin' | 'student' | 'faculty';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ role }) => {
  // Admin stats
  if (role === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value={56} 
          icon={<Calendar size={24} />} 
          change="+12% from last week" 
          positive={true} 
        />
        <StatCard 
          title="Pending Approvals" 
          value={12} 
          icon={<Clock size={24} />} 
        />
        <StatCard 
          title="High Priority" 
          value={3} 
          icon={<BookOpen size={24} />} 
        />
        <StatCard 
          title="Approved Today" 
          value={8} 
          icon={<CheckCircle size={24} />} 
        />
      </div>
    );
  }
  
  // Student/Faculty stats
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard 
        title="My Bookings" 
        value={4} 
        icon={<Calendar size={24} />} 
      />
      <StatCard 
        title="Pending Requests" 
        value={2} 
        icon={<Clock size={24} />} 
      />
      <StatCard 
        title="Approved" 
        value={1} 
        icon={<CheckCircle size={24} />} 
      />
    </div>
  );
};

export default DashboardStats;
