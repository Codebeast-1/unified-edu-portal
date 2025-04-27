
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import VenueBooking from '@/components/user/VenueBooking';

const VenueBookingPage: React.FC = () => {
  return (
    <DashboardLayout>
      <VenueBooking />
    </DashboardLayout>
  );
};

export default VenueBookingPage;
