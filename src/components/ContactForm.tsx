
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="animate-slide-in">
        <CardHeader className="pb-4">
          <div className="w-12 h-12 rounded-full bg-edu-primary bg-opacity-10 flex items-center justify-center mb-4">
            <MessageSquare size={24} className="text-edu-primary" />
          </div>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
          <CardDescription>
            Have questions or need assistance? We're here to help! Fill out the form below, and our team will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Message subject"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
                required
              />
            </div>
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-edu-primary hover:bg-edu-dark btn-animated"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in animation-delay-300">
        <Card className="p-6 hover:shadow-md card-animated">
          <h3 className="font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-600 text-sm">123 Education St.<br />Campus Block, University District<br />City, State 12345</p>
        </Card>
        
        <Card className="p-6 hover:shadow-md card-animated">
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 text-sm">Main Office: (123) 456-7890<br />Support: (123) 456-7891<br />Hours: 9AM - 5PM, Mon-Fri</p>
        </Card>
        
        <Card className="p-6 hover:shadow-md card-animated">
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 text-sm">General: info@edu-portal.com<br />Support: help@edu-portal.com<br />Admissions: admissions@edu-portal.com</p>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;
