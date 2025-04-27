
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'student' | 'faculty' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@edu.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@edu.com',
    role: 'student',
  },
  {
    id: '3',
    name: 'Faculty User',
    email: 'faculty@edu.com',
    role: 'faculty',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('eduPortalUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock login logic
    if (!email || !password || !role) return false;
    
    // For demo purposes, accept any non-empty password
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('eduPortalUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock signup - normally would send to backend
    if (!name || !email || !password || !role) return false;
    
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email === email);
    if (userExists) return false;
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      role,
    };
    
    // Add to mock users (in a real app, this would be a backend call)
    mockUsers.push(newUser);
    
    // Log user in
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('eduPortalUser', JSON.stringify(newUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('eduPortalUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
