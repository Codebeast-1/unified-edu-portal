
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequestsPage from "./pages/admin/RequestsPage";
import HighPriorityPage from "./pages/admin/HighPriorityPage";

// User pages (student/faculty)
import UserDashboard from "./pages/user/UserDashboard";
import VenueBookingPage from "./pages/user/VenueBookingPage";
import EventBookingPage from "./pages/user/EventBookingPage";
import ActivityPage from "./pages/user/ActivityPage";

// Shared pages
import NotificationsPage from "./pages/shared/NotificationsPage";
import ContactPage from "./pages/shared/ContactPage";

const queryClient = new QueryClient();

// Protected route component to check authentication and role
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/requests" element={
              <ProtectedRoute requiredRole="admin">
                <RequestsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/high-priority" element={
              <ProtectedRoute requiredRole="admin">
                <HighPriorityPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute requiredRole="admin">
                <NotificationsPage />
              </ProtectedRoute>
            } />
            
            {/* Student routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute requiredRole="student">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/venue-booking" element={
              <ProtectedRoute requiredRole="student">
                <VenueBookingPage />
              </ProtectedRoute>
            } />
            <Route path="/student/event-booking" element={
              <ProtectedRoute requiredRole="student">
                <EventBookingPage />
              </ProtectedRoute>
            } />
            <Route path="/student/activity" element={
              <ProtectedRoute requiredRole="student">
                <ActivityPage />
              </ProtectedRoute>
            } />
            <Route path="/student/notifications" element={
              <ProtectedRoute requiredRole="student">
                <NotificationsPage />
              </ProtectedRoute>
            } />
            
            {/* Faculty routes */}
            <Route path="/faculty/dashboard" element={
              <ProtectedRoute requiredRole="faculty">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/venue-booking" element={
              <ProtectedRoute requiredRole="faculty">
                <VenueBookingPage />
              </ProtectedRoute>
            } />
            <Route path="/faculty/event-booking" element={
              <ProtectedRoute requiredRole="faculty">
                <EventBookingPage />
              </ProtectedRoute>
            } />
            <Route path="/faculty/activity" element={
              <ProtectedRoute requiredRole="faculty">
                <ActivityPage />
              </ProtectedRoute>
            } />
            <Route path="/faculty/notifications" element={
              <ProtectedRoute requiredRole="faculty">
                <NotificationsPage />
              </ProtectedRoute>
            } />
            
            {/* Shared routes */}
            <Route path="/contact" element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
