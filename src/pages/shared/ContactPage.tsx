
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ContactForm from '@/components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ContactForm />
    </DashboardLayout>
  );
};

export default ContactPage;
