
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  image = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=900&q=80", 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-light to-white flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="absolute inset-0 bg-edu-primary opacity-20"></div>
        <img 
          src={image} 
          alt="Education Portal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-2 animate-slide-in">{title}</h1>
            <p className="opacity-90 animate-slide-in animation-delay-200">{subtitle}</p>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="md:hidden mb-8 text-center">
          <h1 className="text-3xl font-bold text-edu-dark">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
