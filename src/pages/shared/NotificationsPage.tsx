
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import NotificationsList from '@/components/NotificationsList';

const NotificationsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <NotificationsList />
    </DashboardLayout>
  );
};

export default NotificationsPage;
