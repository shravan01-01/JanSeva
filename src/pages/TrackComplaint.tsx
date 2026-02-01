import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import FeedbackForm from "@/components/FeedbackForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  User,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimelineStep {
  status: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface AssignedOfficer {
  name: string;
  designation: string;
  phone: string;
}

interface Complaint {
  id: string;
  subject: string;
  department: string;
  status: string;
  registeredDate: string;
  expectedResolution?: string;
  slaHours?: number;
  slaRemaining?: number;
  location: string;
  priority?: string;
  assignedOfficer?: AssignedOfficer;
  timeline?: TimelineStep[];
  [key: string]: any;
}

const defaultComplaints = [
  {
    id: "2025-12346",
    title: "Water leakage in main pipeline",
    category: "Water Supply",
    status: "In Progress",
    date: "2025-01-28",
    progress: 65,
    subject: "Water leakage in main pipeline",
    department: "Water Supply",
    registeredDate: "2025-01-28",
    location: "Main Road, Ward Complex",
  },
  {
    id: "2025-12345",
    title: "Pothole on main road near market",
    category: "Roads & Traffic",
    status: "Resolved",
    date: "2025-01-25",
    progress: 100,
    subject: "Pothole on main road near market",
    department: "Roads & Traffic",
    registeredDate: "2025-01-25",
    location: "Market Area, Near Junction",
  },
  {
    id: "2025-12344",
    title: "Street light not working for 2 months",
    category: "Municipal Services",
    status: "Resolved",
    date: "2025-01-20",
    progress: 100,
    subject: "Street light not working for 2 months",
    department: "Municipal Services",
    registeredDate: "2025-01-20",
    location: "City Center Road",
  },
  {
    id: "2025-12343",
    title: "Noise pollution from construction site",
    category: "Environment",
    status: "Escalated",
    date: "2025-01-15",
    progress: 45,
    subject: "Noise pollution from construction site",
    department: "Environment",
    registeredDate: "2025-01-15",
    location: "Construction Zone",
  },
];

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  escalated: "bg-red-100 text-red-800",
};

const statusLabels: { [key: string]: string } = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
  escalated: "Escalated",
};


const TrackComplaint = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [searchId, setSearchId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [slaRemaining, setSlaRemaining] = useState(0);
  const [slaElapsed, setSlaElapsed] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Check if complaint ID is passed via URL params
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setSearchId(idParam);
      handleSearchWithId(idParam);
    }
  }, [searchParams]);

  // Show feedback form and notification when complaint is resolved
  useEffect(() => {
    if (complaint && complaint.status === "resolved" && !feedbackSubmitted) {
      // Check if feedback was already submitted for this complaint
      const existingFeedback = JSON.parse(
        localStorage.getItem("complaint_feedback") || "[]"
      );
      const alreadySubmitted = existingFeedback.some(
        (f: any) => f.complaintId === complaint.id
      );

      if (!alreadySubmitted) {
        setShowFeedbackForm(true);
        toast({
          title: "Complaint Resolved! 🎉",
          description: "Your issue has been successfully resolved. Please share your feedback.",
        });
      } else {
        setFeedbackSubmitted(true);
      }
    }
  }, [complaint, feedbackSubmitted, toast]);

  // Update SLA countdown every second
  useEffect(() => {
    if (!complaint || !complaint.registeredDate) return;

    const updateSLA = () => {
      try {
        const registered = new Date(complaint.registeredDate);
        const expectedResolution = new Date(registered.getTime() + 48 * 60 * 60 * 1000);
        const now = new Date();
        const remainingMs = expectedResolution.getTime() - now.getTime();
        const remaining = Math.max(0, remainingMs / (1000 * 60 * 60));
        const elapsed = Math.min(48, 48 - remaining);

        setSlaRemaining(Math.round(remaining * 10) / 10);
        setSlaElapsed(Math.round(elapsed * 10) / 10);
      } catch (error) {
        console.error("Error calculating SLA:", error);
      }
    };

    updateSLA();
    const interval = setInterval(updateSLA, 1000);
    return () => clearInterval(interval);
  }, [complaint]);

  const handleSearchWithId = (id: string) => {
    setIsSearching(true);
    setNotFound(false);
    
    try {
      const storedComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
      
      // Combine stored complaints with default ones
      const combined = [...storedComplaints];
      const ids = new Set(combined.map(c => c.id));
      
      defaultComplaints.forEach(complaint => {
        if (!ids.has(complaint.id)) {
          combined.push(complaint);
        }
      });
      
      const found = combined.find((c: Complaint) => c.id === id);
      
      if (found) {
        // Enhance complaint with timeline if not present
        const enhancedComplaint = {
          ...found,
          timeline: found.timeline || generateDefaultTimeline(found),
          assignedOfficer: found.assignedOfficer || {
            name: "Officer Assigned",
            designation: `${found.department || found.category} Department`,
            phone: "+91 XXXXX XXXXX",
          },
        };
        setComplaint(enhancedComplaint);
      } else {
        setComplaint(null);
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error loading complaint:", error);
      setComplaint(null);
      setNotFound(true);
    }
    
    setIsSearching(false);
  };

  const generateDefaultTimeline = (complaint: Complaint): TimelineStep[] => {
    const registeredDate = new Date(complaint.registeredDate);
    const now = new Date();

    const timeline: TimelineStep[] = [
      {
        status: "received",
        title: "Complaint Received",
        description: "Your complaint has been registered successfully",
        date: registeredDate.toLocaleString("en-IN"),
        completed: true,
      },
      {
        status: "assigned",
        title: "Assigned to Officer",
        description: `Assigned to ${complaint.department}`,
        date: new Date(registeredDate.getTime() + 45 * 60000).toLocaleString("en-IN"),
        completed: true,
      },
    ];

    if (complaint.status === "in_progress" || complaint.status === "resolved") {
      timeline.push({
        status: "in_progress",
        title: "Under Investigation",
        description: "Officer is investigating the issue",
        date: new Date(registeredDate.getTime() + 2 * 60 * 60000).toLocaleString("en-IN"),
        completed: true,
      });
    }

    if (complaint.status === "resolved") {
      timeline.push({
        status: "action",
        title: "Action Taken",
        description: "Field team deployed and action initiated",
        date: new Date(registeredDate.getTime() + 24 * 60 * 60000).toLocaleString("en-IN"),
        completed: true,
      });
      timeline.push({
        status: "resolved",
        title: "Resolved",
        description: "Issue resolved and verified",
        date: now.toLocaleString("en-IN"),
        completed: true,
      });
    } else {
      timeline.push({
        status: "action",
        title: "Action Pending",
        description: "Awaiting field team deployment",
        date: `Expected: ${new Date(registeredDate.getTime() + 24 * 60 * 60000).toLocaleDateString("en-IN")}`,
        completed: false,
      });
      timeline.push({
        status: "resolved",
        title: "Resolution",
        description: "Issue resolution and verification pending",
        date: `Expected: ${new Date(registeredDate.getTime() + 48 * 60 * 60000).toLocaleDateString("en-IN")}`,
        completed: false,
      });
    }

    return timeline;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      handleSearchWithId(searchId);
    }
  };

  const slaProgress = slaElapsed > 0 ? (slaElapsed / 48) * 100 : 0;
  const isSlaCritical = slaRemaining <= 12;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={false} />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Track Your Complaint
            </h1>
            <p className="text-muted-foreground">
              Enter your complaint ID to check the current status and timeline
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter Complaint ID (e.g., 2025-12346)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="pl-11 h-12 text-base"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSearching}
                  className="h-12 bg-saffron hover:bg-saffron/90 text-white"
                >
                  {isSearching ? "Searching..." : "Track Status"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Not Found Message */}
          {notFound && (
            <Card className="mb-8 border-l-4 border-l-destructive bg-red-50">
              <CardContent className="p-6">
                <p className="text-destructive font-medium">
                  Complaint ID not found. Please check the ID and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Complaint Details */}
          {complaint && (
            <div className="space-y-6 animate-fade-in">
              {/* Status Overview */}
              <Card className="shadow-lg overflow-hidden border-t-4 border-t-primary">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardDescription className="text-muted-foreground mb-1">
                        Complaint ID
                      </CardDescription>
                      <CardTitle className="text-2xl text-primary">#{complaint.id}</CardTitle>
                    </div>
                    <Badge 
                      className={`text-sm px-4 py-1.5 ${statusColors[complaint.status as keyof typeof statusColors] || "bg-gray-100"}`}
                    >
                      {statusLabels[complaint.status as keyof typeof statusLabels] || complaint.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Subject</p>
                        <p className="font-semibold text-foreground">{complaint.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Department</p>
                        <p className="font-semibold text-foreground">{complaint.department}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Location</p>
                          <p className="font-semibold text-foreground">{complaint.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Registered On</p>
                          <p className="font-semibold text-foreground">
                            {new Date(complaint.registeredDate).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Expected Resolution</p>
                          <p className="font-semibold text-foreground">
                            {new Date(new Date(complaint.registeredDate).getTime() + 48 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SLA Timer */}
                  <div className={`p-4 rounded-lg border-l-4 ${isSlaCritical ? 'border-l-destructive bg-red-50' : 'border-l-success bg-green-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {isSlaCritical ? (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        ) : (
                          <Clock className="h-5 w-5 text-success" />
                        )}
                        <span className="font-semibold text-foreground">SLA Timeline</span>
                      </div>
                      <span className={`font-bold text-lg ${isSlaCritical ? 'text-destructive' : 'text-success'}`}>
                        {slaRemaining.toFixed(1)} hours remaining
                      </span>
                    </div>
                    <Progress value={slaProgress} className="h-3 mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {slaElapsed.toFixed(1)} of 48 hours elapsed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Assigned Officer */}
              {complaint.assignedOfficer && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <User className="h-5 w-5" />
                      Assigned Officer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{complaint.assignedOfficer.name}</p>
                        <p className="text-sm text-muted-foreground">{complaint.assignedOfficer.designation}</p>
                        <p className="text-sm text-primary flex items-center gap-1 mt-1 font-medium">
                          <Phone className="h-3 w-3" />
                          {complaint.assignedOfficer.phone}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              {complaint.timeline && complaint.timeline.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="text-lg flex items-center gap-2 text-primary">
                      <Clock className="h-5 w-5" />
                      Progress Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="relative">
                      {complaint.timeline.map((step, index) => (
                        <div key={`${step.status}-${index}`} className="flex gap-4 pb-8 last:pb-0">
                          {/* Timeline Line */}
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full border-4 ${
                                step.completed
                                  ? "border-success bg-success text-white"
                                  : "border-muted-foreground bg-muted text-muted-foreground"
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            {index < complaint.timeline.length - 1 && (
                              <div
                                className={`absolute top-10 w-0.5 h-12 ${
                                  step.completed ? "bg-success" : "bg-muted-foreground/30"
                                }`}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <p className={`font-semibold ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                              {step.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Feedback Form Modal */}
      {complaint && (
        <FeedbackForm
          open={showFeedbackForm}
          complaintId={complaint.id}
          complaintSubject={complaint.subject}
          onClose={() => {
            setShowFeedbackForm(false);
            setFeedbackSubmitted(true);
          }}
        />
      )}
    </div>
  );
};

export default TrackComplaint;
