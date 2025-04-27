
import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <AuthLayout 
      title="Welcome to Unified Edu Portal"
      subtitle="Sign in to access venue and event booking services"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2 text-edu-dark">Sign In</h1>
        <p className="text-gray-600">Enter your credentials to continue</p>
      </div>
      
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
