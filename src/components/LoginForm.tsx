
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import RoleSelector from './RoleSelector';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast.error('Please select a role');
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await login(email, password, role);
      
      if (success) {
        toast.success(`Welcome back! Logged in as ${role}`);
        navigate(`/${role}/dashboard`);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in">
      <RoleSelector selectedRole={role} onChange={setRole} />
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all focus:border-edu-primary"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-sm text-edu-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="transition-all focus:border-edu-primary"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-edu-primary hover:bg-edu-dark btn-animated"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
      
      <div className="text-sm text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <a onClick={() => navigate('/signup')} className="text-edu-primary hover:underline cursor-pointer">
          Create one
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
