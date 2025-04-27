
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import SignupForm from '../components/SignupForm';

const SignUp: React.FC = () => {
  return (
    <AuthLayout 
      title="Join Unified Edu Portal"
      subtitle="Create an account to start booking venues and events"
      image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&h=900&q=80"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2 text-edu-dark">Create Account</h1>
        <p className="text-gray-600">Sign up to get started</p>
      </div>
      
      <SignupForm />
    </AuthLayout>
  );
};

export default SignUp;
