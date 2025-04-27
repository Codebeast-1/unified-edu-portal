
import { Notification, Venue, TimeSlot, Booking, EventPackage } from '../types';

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Booking Approved',
    message: 'Your LT1 booking for tomorrow has been approved',
    date: '2025-04-26T10:30:00',
    read: false,
    type: 'success'
  },
  {
    id: 'notif2',
    title: 'Event Request',
    message: 'New event booking request needs your approval',
    date: '2025-04-25T16:45:00',
    read: true,
    type: 'info'
  },
  {
    id: 'notif3',
    title: 'System Maintenance',
    message: 'Portal will be down for maintenance on Sunday',
    date: '2025-04-24T09:15:00',
    read: false,
    type: 'warning'
  },
  {
    id: 'notif4',
    title: 'Booking Rejected',
    message: 'Your request for MPH has been declined due to schedule conflict',
    date: '2025-04-23T14:20:00',
    read: true,
    type: 'error'
  }
];

// Mock venues
export const venues: Venue[] = [
  {
    id: 'venue1',
    name: 'LT1',
    type: 'LT',
    capacity: 150,
    facilities: ['Projector', 'Sound System', 'AC', 'Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=600&h=400'
  },
  {
    id: 'venue2',
    name: 'LT2',
    type: 'LT',
    capacity: 200,
    facilities: ['Projector', 'Sound System', 'AC', 'Wi-Fi', 'Recording System'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&h=400'
  },
  {
    id: 'venue3',
    name: 'CR101',
    type: 'CR',
    capacity: 60,
    facilities: ['Whiteboard', 'Projector', 'AC'],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&h=400'
  },
  {
    id: 'venue4',
    name: 'CL1',
    type: 'CL',
    capacity: 40,
    facilities: ['Computers', 'Projector', 'AC', 'Specialized Software'],
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=600&h=400'
  },
  {
    id: 'venue5',
    name: 'MPH',
    type: 'MPH',
    capacity: 500,
    facilities: ['Stage', 'Sound System', 'Lighting', 'Seating Arrangements', 'AC'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&h=400'
  }
];

// Generate time slots for the next 7 days
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate slots from 8 AM to 6 PM
    for (let hour = 8; hour < 18; hour++) {
      const startHour = hour;
      const endHour = hour + 1;
      
      slots.push({
        id: `slot_${dateStr}_${startHour}`,
        date: dateStr,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        isAvailable: Math.random() > 0.3 // 70% available, 30% booked
      });
    }
  }
  
  return slots;
};

export const timeSlots = generateTimeSlots();

// Mock bookings
export const bookings: Booking[] = [
  {
    id: 'booking1',
    userId: '2',
    userName: 'Student User',
    userRole: 'student',
    venueId: 'venue1',
    venueName: 'LT1',
    purpose: 'Club Meeting',
    description: 'Weekly meeting of the Robotics Club',
    attendees: 45,
    timeSlots: ['slot_2025-04-28_14'],
    status: 'pending',
    createdAt: '2025-04-25T09:30:00',
    targetAudience: '2nd Year'
  },
  {
    id: 'booking2',
    userId: '3',
    userName: 'Faculty User',
    userRole: 'faculty',
    venueId: 'venue2',
    venueName: 'LT2',
    purpose: 'Guest Lecture',
    description: 'Special lecture on AI advancements',
    attendees: 150,
    timeSlots: ['slot_2025-04-29_10', 'slot_2025-04-29_11'],
    status: 'approved',
    createdAt: '2025-04-24T11:45:00',
    adminFeedback: {
      adminId: '1',
      comment: 'Approved. Please ensure proper coordination with AV team.',
      date: '2025-04-25T14:20:00'
    },
    targetAudience: 'All Computer Science Students'
  },
  {
    id: 'booking3',
    userId: '2',
    userName: 'Student User',
    userRole: 'student',
    venueId: 'venue5',
    venueName: 'MPH',
    purpose: 'Annual Tech Fest',
    description: 'The college annual technical festival',
    attendees: 350,
    timeSlots: ['slot_2025-04-30_9', 'slot_2025-04-30_10', 'slot_2025-04-30_11', 'slot_2025-04-30_12'],
    status: 'high-priority',
    facultyRecommendation: {
      facultyId: '3',
      facultyName: 'Faculty User',
      comment: 'This is an important annual event. Highly recommended for approval.'
    },
    createdAt: '2025-04-23T16:00:00',
    targetAudience: 'All College Students'
  },
  {
    id: 'booking4',
    userId: '2',
    userName: 'Student User',
    userRole: 'student',
    venueId: 'venue3',
    venueName: 'CR101',
    purpose: 'Study Group',
    description: 'Exam preparation for Mathematics',
    attendees: 25,
    timeSlots: ['slot_2025-04-27_16'],
    status: 'rejected',
    createdAt: '2025-04-22T13:15:00',
    adminFeedback: {
      adminId: '1',
      comment: 'Room already booked for faculty meeting. Try another slot.',
      date: '2025-04-23T09:10:00'
    },
    targetAudience: '1st Year'
  }
];

// Mock event packages
export const eventPackages: EventPackage[] = [
  {
    id: 'package1',
    name: 'Club Event Package',
    description: 'Perfect for club activities, meetings, and small-scale events',
    capacity: 150,
    venues: ['venue1', 'venue3', 'venue4'], // LT1, CR101, CL1
    minAttendees: 30,
    maxAttendees: 150,
    image: 'https://images.unsplash.com/photo-1538681105587-85640961bf8b?auto=format&fit=crop&w=600&h=400'
  },
  {
    id: 'package2',
    name: 'Department Conference Package',
    description: 'Comprehensive package for department-level conferences and large events',
    capacity: 500,
    venues: ['venue5', 'venue2', 'venue3', 'venue4'], // MPH, LT2, CR101, CL1
    minAttendees: 100,
    maxAttendees: 500,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&h=400'
  }
];
