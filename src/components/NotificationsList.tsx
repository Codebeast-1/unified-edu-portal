
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { notifications } from '@/services/mockData';
import { Notification } from '@/types';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const [read, setRead] = useState(notification.read);
  
  const getTypeStyles = (type: Notification['type']) => {
    switch(type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const markAsRead = () => {
    setRead(true);
    // In a real app, you would update this in the backend
  };
  
  return (
    <Card className={`mb-4 p-4 border-l-4 transition-all ${getTypeStyles(notification.type)} ${read ? 'opacity-80' : ''} animate-scale-in`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{notification.title}</h3>
            {!read && <Badge className="bg-edu-secondary">New</Badge>}
          </div>
          <p className="text-gray-600 text-sm">{notification.message}</p>
          <p className="text-gray-400 text-xs mt-2">{formatDate(notification.date)}</p>
        </div>
        {!read && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAsRead} 
            className="text-gray-500 hover:text-edu-primary btn-animated"
          >
            <Check size={16} />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
      </div>
    </Card>
  );
};

const NotificationsList: React.FC = () => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-edu-secondary">{unreadCount} new</Badge>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Bell size={40} className="text-gray-400 mb-2" />
              <h3 className="text-xl font-medium">No notifications</h3>
              <p className="text-gray-500 mt-1">You're all caught up!</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
