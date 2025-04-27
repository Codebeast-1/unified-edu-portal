
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/contexts/AuthContext';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select your role:</h3>
      <RadioGroup 
        value={selectedRole || undefined} 
        onValueChange={(value) => onChange(value as UserRole)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-edu-primary transition-all cursor-pointer w-full sm:w-1/3 animate-scale-in">
          <RadioGroupItem value="admin" id="admin" className="text-edu-primary" />
          <Label htmlFor="admin" className="font-medium cursor-pointer">Administrator</Label>
        </div>
        
        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-edu-primary transition-all cursor-pointer w-full sm:w-1/3 animate-scale-in animation-delay-100">
          <RadioGroupItem value="student" id="student" className="text-edu-primary" />
          <Label htmlFor="student" className="font-medium cursor-pointer">Student</Label>
        </div>
        
        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-edu-primary transition-all cursor-pointer w-full sm:w-1/3 animate-scale-in animation-delay-200">
          <RadioGroupItem value="faculty" id="faculty" className="text-edu-primary" />
          <Label htmlFor="faculty" className="font-medium cursor-pointer">Faculty</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RoleSelector;
