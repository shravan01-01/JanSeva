import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  User,
  FileText,
  Calendar,
  Zap,
  BarChart3,
  Map,
  Home,
} from "lucide-react";

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const officerData = {
    name: "Shri Rajesh Kumar",
    designation: "Junior Engineer",
    department: "Water Supply",
    email: "rajesh.kumar@municipal.gov.in",
    phone: "+91 98765 43210",
  };

  const dashboardStats = [
    {
      title: "New Complaints",
      value: "12",
      change: "+5 today",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Actions",
      value: "8",
      change: "-2 from yesterday",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "SLA Warnings",
      value: "3",
      change: "Critical cases",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Resolved This Week",
      value: "24",
      change: "+12% from last week",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const complaints = [
    {
      id: "2025-12346",
      subject: "Water leakage in main pipeline",
      priority: "high",
      status: "in_progress",
      slaRemaining: "16 hours",
      location: "Sector 15, Block C",
      assignedDate: "2025-01-28",
      progress: 65,
    },
    {
      id: "2025-12350",
      subject: "Pipe burst near residential area",
      priority: "critical",
      status: "escalated",
      slaRemaining: "5 hours",
      location: "Sector 22, Main Road",
      assignedDate: "2025-01-27",
      progress: 40,
    },
    {
      id: "2025-12348",
      subject: "Water supply interruption",
      priority: "high",
      status: "pending",
      slaRemaining: "42 hours",
      location: "Sector 8, Avenue A",
      assignedDate: "2025-01-29",
      progress: 20,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "escalated":
        return "bg-red-100 text-red-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={true} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Officer Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {officerData.name}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-foreground mb-2">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Officer Info */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Officer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">{officerData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Designation</p>
                      <p className="font-semibold text-foreground">{officerData.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-semibold text-foreground">{officerData.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold text-foreground">{officerData.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Resolution Rate</span>
                      <span className="text-sm font-semibold text-green-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">SLA Compliance</span>
                      <span className="text-sm font-semibold text-green-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Average Response Time</span>
                      <span className="text-sm font-semibold text-blue-600">2.3 hours</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Complaints Tab */}
            <TabsContent value="complaints" className="space-y-4">
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Left Section */}
                        <div className="md:col-span-2">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Complaint ID</p>
                              <p className="font-semibold text-lg">#{complaint.id}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getPriorityColor(complaint.priority)}>
                                {complaint.priority.toUpperCase()}
                              </Badge>
                              <Badge className={getStatusColor(complaint.status)}>
                                {complaint.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <p className="font-medium text-foreground mb-2">
                            {complaint.subject}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {complaint.location}
                          </p>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">SLA Remaining</p>
                            <p className={`font-bold ${complaint.slaRemaining.includes("5") ? "text-destructive" : "text-green-600"}`}>
                              {complaint.slaRemaining}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{complaint.progress}%</span>
                            </div>
                            <Progress value={complaint.progress} className="h-2" />
                          </div>
                          <Button size="sm" className="w-full mt-2">
                            <Zap className="mr-1 h-3 w-3" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Map View Tab */}
            <TabsContent value="map">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Map view showing complaint locations across the city
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Calendar view of scheduled actions and deadlines
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Weekly Report</CardTitle>
                  <CardDescription>Summary of complaints handled this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Handled</p>
                      <p className="text-2xl font-bold text-foreground">28</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">24</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Escalated</p>
                      <p className="text-2xl font-bold text-red-600">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default OfficerDashboard;