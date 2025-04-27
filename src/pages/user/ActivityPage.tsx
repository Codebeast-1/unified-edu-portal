
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ActivityList from '@/components/user/ActivityList';

const ActivityPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ActivityList />
    </DashboardLayout>
  );
};

export default ActivityPage;
