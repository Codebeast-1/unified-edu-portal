
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import RequestApproval from '@/components/admin/RequestApproval';

const RequestsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <RequestApproval />
    </DashboardLayout>
  );
};

export default RequestsPage;
