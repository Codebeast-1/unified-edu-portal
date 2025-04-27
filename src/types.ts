
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface Venue {
  id: string;
  name: string;
  type: 'LT' | 'CR' | 'CL' | 'MPH'; // Lecture Theater, Classroom, Computer Lab, Multi-purpose Hall
  capacity: number;
  facilities: string[];
  image?: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userRole: 'student' | 'faculty';
  venueId: string;
  venueName: string;
  purpose: string;
  description: string;
  attendees: number;
  timeSlots: string[]; // TimeSlot IDs
  status: 'pending' | 'approved' | 'rejected' | 'high-priority';
  facultyRecommendation?: {
    facultyId: string;
    facultyName: string;
    comment: string;
  };
  adminFeedback?: {
    adminId: string;
    comment: string;
    date: string;
  };
  createdAt: string;
  targetAudience?: string; // Which year/department the event is for
}

export interface EventPackage {
  id: string;
  name: string;
  description: string;
  capacity: number;
  venues: string[]; // Venue IDs
  minAttendees: number;
  maxAttendees: number;
  image?: string;
}
