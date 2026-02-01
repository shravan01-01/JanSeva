import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RegisterComplaint from "./pages/RegisterComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import ComplaintHistory from "./pages/ComplaintHistory";
import Profile from "./pages/Profile";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SahayakAssistant from "./components/SahayakAssistant";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Add page transition class on route change
    const mainContent = document.querySelector('main, [role="main"]');
    if (mainContent) {
      mainContent.classList.add('page-enter');
      setTimeout(() => {
        mainContent.classList.remove('page-enter');
        mainContent.classList.add('page-enter-active');
      }, 10);
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Routes location={location}>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Authenticated User Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register-complaint" element={<RegisterComplaint />} />
      <Route path="/track-complaint" element={<TrackComplaint />} />
      <Route path="/complaint-history" element={<ComplaintHistory />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Officer Routes */}
      <Route path="/officer" element={<OfficerDashboard />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
        <SahayakAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
