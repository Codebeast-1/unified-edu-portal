
import React from 'react';
import { bookings } from '@/services/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const HighPriorityRequests: React.FC = () => {
  const highPriorityRequests = bookings.filter(b => b.status === 'high-priority');
  
  const handleViewDetails = (id: string) => {
    toast.info('Opening request details...');
  };
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">High Priority Requests</h2>
        <Badge className="bg-red-600">
          {highPriorityRequests.length}
        </Badge>
      </div>
      
      {highPriorityRequests.length === 0 ? (
        <Card className="animate-slide-in">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">No high priority requests</h3>
            <p className="text-gray-500 max-w-md">
              There are currently no requests marked as high priority. High priority requests with faculty recommendations will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highPriorityRequests.map((request) => (
            <Card key={request.id} className="animate-scale-in">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-600">High Priority</Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="mt-2">{request.purpose}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm mb-1">
                    <span className="font-medium">Venue:</span> {request.venueName}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Requested by:</span> {request.userName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Attendees:</span> {request.attendees}
                  </p>
                </div>
                
                {request.facultyRecommendation && (
                  <div className="bg-edu-primary bg-opacity-10 rounded-md p-3 mb-4">
                    <p className="text-sm font-medium text-edu-dark">Faculty Recommendation:</p>
                    <p className="text-sm italic">{request.facultyRecommendation.comment}</p>
                    <p className="text-xs text-gray-600 mt-1">- {request.facultyRecommendation.facultyName}</p>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleViewDetails(request.id)} 
                  className="w-full btn-animated bg-edu-primary hover:bg-edu-dark"
                >
                  Review Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighPriorityRequests;
