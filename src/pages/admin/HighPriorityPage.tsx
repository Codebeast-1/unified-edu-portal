
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import HighPriorityRequests from '@/components/admin/HighPriorityRequests';

const HighPriorityPage: React.FC = () => {
  return (
    <DashboardLayout>
      <HighPriorityRequests />
    </DashboardLayout>
  );
};

export default HighPriorityPage;
