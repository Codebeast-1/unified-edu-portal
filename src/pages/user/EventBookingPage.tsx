
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import EventBooking from '@/components/user/EventBooking';

const EventBookingPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EventBooking />
    </DashboardLayout>
  );
};

export default EventBookingPage;
