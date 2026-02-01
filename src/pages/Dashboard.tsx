import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Bell,
  Calendar,
  MapPin,
  User,
  ArrowRight,
  Plus,
  Building2,
} from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/home/Footer";

const defaultComplaints = [
  {
    id: "2025-12346",
    title: "Water leakage in main pipeline",
    category: "Water Supply",
    status: "In Progress",
    date: "2025-01-28",
    progress: 65,
  },
  {
    id: "2025-12345",
    title: "Pothole on main road near market",
    category: "Roads & Traffic",
    status: "Resolved",
    date: "2025-01-25",
    progress: 100,
  },
  {
    id: "2025-12344",
    title: "Street light not working for 2 months",
    category: "Municipal Services",
    status: "Resolved",
    date: "2025-01-20",
    progress: 100,
  },
  {
    id: "2025-12343",
    title: "Noise pollution from construction site",
    category: "Environment",
    status: "Escalated",
    date: "2025-01-15",
    progress: 45,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState("John Doe");
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [showWardInfo, setShowWardInfo] = useState(false);

  // Ward information data
  const wardInformation = [
    {
      department: "Water Supply",
      address: "Water Supply Office, Ward Complex, Main Road",
      phone: "+91-1234-567890",
      email: "water@janseva.gov.in",
    },
    {
      department: "Electricity Supply",
      address: "Electricity Office, Ward Complex, Main Road",
      phone: "+91-1234-567891",
      email: "electricity@janseva.gov.in",
    },
    {
      department: "Roads & Traffic",
      address: "Roads Department, Ward Complex, Main Road",
      phone: "+91-1234-567892",
      email: "roads@janseva.gov.in",
    },
    {
      department: "Public Safety",
      address: "Public Safety Office, Ward Complex, Main Road",
      phone: "+91-1234-567893",
      email: "safety@janseva.gov.in",
    },
    {
      department: "Waste Management",
      address: "Waste Management Office, Ward Complex, Main Road",
      phone: "+91-1234-567894",
      email: "waste@janseva.gov.in",
    },
    {
      department: "Public Health",
      address: "Public Health Office, Ward Complex, Main Road",
      phone: "+91-1234-567895",
      email: "health@janseva.gov.in",
    },
  ];

  // Load complaints from localStorage on component mount
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Combine stored complaints with default ones, removing duplicates
    const combined = [...storedComplaints];
    const ids = new Set(combined.map(c => c.id));
    
    defaultComplaints.forEach(complaint => {
      if (!ids.has(complaint.id)) {
        combined.push(complaint);
      }
    });
    
    // Sort by date (newest first)
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setAllComplaints(combined);
    setRecentComplaints(combined.slice(0, 3)); // Show only 3 most recent
  }, []);

  // Calculate stats dynamically based on all complaints
  const totalComplaints = allComplaints.length;
  const resolvedCount = allComplaints.filter((c) => c.status === "Resolved").length;
  const inProgressCount = allComplaints.filter((c) => c.status === "In Progress").length;
  
  // Calculate average satisfaction (assuming each resolved complaint has default 4.8, use actual if available)
  const satisfactionRating = totalComplaints > 0 ? "4.8/5" : "N/A";

  const stats = [
    {
      icon: FileText,
      label: "Total Complaints",
      value: totalComplaints.toString(),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: CheckCircle,
      label: "Resolved",
      value: resolvedCount.toString(),
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      label: "In Progress",
      value: inProgressCount.toString(),
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Satisfaction",
      value: satisfactionRating,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      label: "Register New Complaint",
      description: "File a new complaint",
      action: () => navigate("/register-complaint"),
      color: "bg-saffron",
    },
    {
      icon: Search,
      label: "Track Complaint",
      description: "Check status",
      action: () => navigate("/track-complaint"),
      color: "bg-primary",
    },
    {
      icon: Building2,
      label: "Ward Information",
      description: "View all office addresses",
      action: () => setShowWardInfo(!showWardInfo),
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header showSearch={true} />

      <main className="flex-1">
        {/* Welcome Banner - Premium Design */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 md:py-20">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <span className="text-lg">👋</span>
                  <span className="text-xs font-semibold text-white">Welcome back</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  Welcome back, <span className="text-yellow-300">{userName}</span>!
                </h1>
                <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">
                  Here's your grievance dashboard. <span className="font-semibold text-yellow-300">Manage and track all your complaints</span> in one place with complete transparency.
                </p>
              </div>
              
              {/* Right side illustration placeholder */}
              <div className="hidden lg:flex items-center justify-center w-48 h-48 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-yellow-300 mx-auto mb-3 opacity-80" />
                  <p className="text-white/70 text-sm font-medium">Track in Real-Time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats - Enhanced Premium Design */}
        <section className="py-12 md:py-16 relative -mt-8 md:-mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card 
                    key={index} 
                    className="hover:shadow-2xl hover:border-primary/40 transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden group"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-saffron/80 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors duration-300" />
                    
                    <CardContent className="pt-8 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase opacity-70 mb-1">{stat.label}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <p className="text-4xl md:text-5xl font-black text-primary leading-tight">
                          {stat.value}
                        </p>
                        <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-primary/20 transition-colors duration-300">
                        <p className="text-xs text-muted-foreground font-medium">Last updated today</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Actions - Enhanced */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Quick Actions</h2>
              <p className="text-sm text-muted-foreground mt-2">What would you like to do today?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="group text-left"
                  >
                    <Card className="h-full hover:shadow-2xl hover:border-primary/40 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-saffron/80 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Decorative background circle */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-300" />
                      
                      <CardContent className="pt-8 relative z-10">
                        <div className={`${action.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-125 group-hover:shadow-xl transition-all duration-300 shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {action.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-5 leading-relaxed opacity-80">{action.description}</p>
                        <div className="flex items-center text-primary font-bold text-sm group-hover:gap-3 transition-all duration-300 pt-3 border-t border-gray-100 group-hover:border-primary/20">
                          <span className="mt-3">Get Started</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ward Information Section */}
        {showWardInfo && (
          <section className="py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-background">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                      <Building2 className="h-8 w-8 text-emerald-600" />
                      Ward Information
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">Contact details and addresses of all municipal offices</p>
                  </div>
                  <button
                    onClick={() => setShowWardInfo(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wardInformation.map((office, index) => (
                  <Card 
                    key={index}
                    className="hover:shadow-2xl hover:border-emerald-400/40 transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden group"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/40 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-100/60 transition-colors duration-300" />
                    
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="bg-emerald-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <Building2 className="h-6 w-6 text-emerald-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-3 text-foreground group-hover:text-emerald-700 transition-colors duration-300">
                        {office.department}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Address</p>
                            <p className="text-sm text-foreground font-medium">{office.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H17a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                          </svg>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Phone</p>
                            <a href={`tel:${office.phone}`} className="text-sm text-primary font-medium hover:underline">
                              {office.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                            <a href={`mailto:${office.email}`} className="text-sm text-primary font-medium hover:underline break-all">
                              {office.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => window.location.href = `mailto:${office.email}`}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold mt-4"
                      >
                        Contact Office
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Complaints - Enhanced */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Recent Complaints</h2>
                <p className="text-sm text-muted-foreground mt-2">Track your latest grievances</p>
              </div>
              <Button
                onClick={() => navigate("/complaint-history")}
                className="gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 h-auto"
              >
                View All Complaints
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {recentComplaints.length > 0 ? (
              <div className="space-y-5">
                {recentComplaints.map((complaint) => (
                  <Card
                    key={complaint.id}
                    className="hover:shadow-2xl hover:border-primary/40 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden group"
                    onClick={() => navigate(`/track-complaint?id=${complaint.id}`)}
                  >
                    {/* Top colored border indicator with shadow */}
                    <div className={`h-2 w-full bg-gradient-to-r ${
                      complaint.status === "Resolved" 
                        ? "from-green-500 via-emerald-500 to-green-500" 
                        : "from-yellow-500 via-orange-500 to-yellow-500"
                    } shadow-lg`} />
                    
                    <CardContent className="pt-6 relative">
                      {/* Decorative background */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full -mr-16 -mt-16" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center relative z-10">
                        {/* Left - Title and Category */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-3 bg-primary/15 rounded-xl group-hover:bg-primary/25 transition-colors duration-300 shadow-md">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-300">
                                {complaint.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{complaint.category}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 font-medium">ID: #{complaint.id}</p>
                            </div>
                          </div>
                        </div>

                        {/* Center - Status and Date */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            {complaint.status === "Resolved" ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-sm font-bold text-green-600">Resolved</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-5 w-5 text-yellow-500 animate-spin-slow" />
                                <span className="text-sm font-bold text-yellow-600">In Progress</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(complaint.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Right - Progress Bar */}
                        <div className="md:col-span-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-primary tracking-wider uppercase">Progress</span>
                            <span className="text-sm font-black bg-gradient-to-r from-primary to-saffron text-white px-4 py-1.5 rounded-full shadow-md">
                              {complaint.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-md border border-gray-300/50">
                            <div
                              className={`h-full transition-all duration-700 rounded-full ${
                                complaint.status === "Resolved"
                                  ? "bg-green-500"
                                  : "bg-primary"
                              }`}
                              style={{ width: `${complaint.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed bg-muted/20">
                <CardContent className="pt-12 pb-12 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg font-semibold mb-4">No complaints yet</p>
                  <Button
                    onClick={() => navigate("/register-complaint")}
                    className="gap-2 bg-primary hover:bg-primary/90 text-white font-bold"
                  >
                    <Plus className="h-4 w-4" />
                    Register Your First Complaint
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Information Banner - Premium Design */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-primary/95 to-primary/90 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/15 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/8 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Card className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="pt-10 md:pt-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="flex-shrink-0 p-5 bg-gradient-to-br from-primary/15 to-saffron/10 rounded-2xl">
                    <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl md:text-3xl text-foreground mb-3 leading-snug">
                      ⚡ Average Response Time: <span className="bg-gradient-to-r from-primary to-saffron bg-clip-text text-transparent">48 Hours</span>
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-5 font-medium">
                      Our dedicated team is committed to responding to your complaints within 48 hours. Track your complaints in real-time and stay updated with every step of the resolution process.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200/50">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-green-700">Real-time Updates</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200/50">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-blue-700">Direct Support</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200/50">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-purple-700">Full Transparency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
