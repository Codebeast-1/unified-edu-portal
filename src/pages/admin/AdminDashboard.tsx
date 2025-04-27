
import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardStats from '../../components/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bookings } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const highPriorityRequests = bookings.filter(b => b.status === 'high-priority');
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of all booking requests and system activity</p>
      </div>
      
      <DashboardStats role="admin" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Pending Requests */}
        <Card className="lg:col-span-2 animate-slide-in">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Pending Requests</CardTitle>
            <Button 
              variant="ghost" 
              className="text-sm btn-animated"
              onClick={() => navigate('/admin/requests')}
            >
              View all
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          
          <CardContent>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{request.purpose}</h3>
                        <Badge variant="outline" className="text-xs">
                          {request.venueName}
                        </Badge>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        By {request.userName} • {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-edu-primary hover:bg-edu-dark btn-animated"
                      onClick={() => navigate('/admin/requests')}
                    >
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No pending requests</p>
            )}
          </CardContent>
        </Card>
        
        {/* High Priority Requests */}
        <Card className="animate-slide-in">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              High Priority
              {highPriorityRequests.length > 0 && (
                <Badge className="ml-2 bg-red-600">
                  {highPriorityRequests.length}
                </Badge>
              )}
            </CardTitle>
            <Button 
              variant="ghost" 
              className="text-sm btn-animated"
              onClick={() => navigate('/admin/high-priority')}
            >
              View all
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </CardHeader>
          
          <CardContent>
            {highPriorityRequests.length > 0 ? (
              <div className="space-y-4">
                {highPriorityRequests.map(request => (
                  <div key={request.id} className="p-3 bg-red-50 border border-red-100 rounded-md">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{request.purpose}</h3>
                      <Badge className="bg-red-600">Priority</Badge>
                    </div>
                    <p className="text-gray-700 text-xs mt-1">
                      Venue: {request.venueName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Requested by {request.userName}
                    </p>
                    {request.facultyRecommendation && (
                      <div className="mt-2 pt-2 border-t border-red-200">
                        <p className="text-xs italic text-gray-600">
                          "{request.facultyRecommendation.comment}"
                        </p>
                        <p className="text-xs text-right font-medium">
                          - {request.facultyRecommendation.facultyName}
                        </p>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-red-600 hover:bg-red-700 btn-animated"
                      onClick={() => navigate('/admin/high-priority')}
                    >
                      Review Urgently
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No high priority requests</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Venues Usage */}
      <Card className="mt-6 animate-slide-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Venues Usage</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Lecture Theaters</span>
                <span>75% booked</span>
              </div>
              <Progress value={75} className="bg-gray-100 h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Classrooms</span>
                <span>45% booked</span>
              </div>
              <Progress value={45} className="bg-gray-100 h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Computer Labs</span>
                <span>60% booked</span>
              </div>
              <Progress value={60} className="bg-gray-100 h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Multi-purpose Hall</span>
                <span>30% booked</span>
              </div>
              <Progress value={30} className="bg-gray-100 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
