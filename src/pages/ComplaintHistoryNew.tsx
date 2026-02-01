import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Eye, Trash2, MapPin, Calendar } from "lucide-react";

const mockComplaints = [
  {
    id: "2025-12346",
    subject: "Water leakage in main pipeline",
    department: "Water Supply",
    status: "in_progress",
    priority: "high",
    date: "2025-01-28",
    progress: 65,
  },
  {
    id: "2025-12345",
    subject: "Pothole on main road near market",
    department: "Roads & Traffic",
    status: "resolved",
    priority: "medium",
    date: "2025-01-25",
    progress: 100,
  },
  {
    id: "2025-12344",
    subject: "Street light not working for 2 months",
    department: "Municipal Services",
    status: "resolved",
    priority: "low",
    date: "2025-01-20",
    progress: 100,
  },
  {
    id: "2025-12343",
    subject: "Noise pollution from construction site",
    department: "Environment",
    status: "escalated",
    priority: "high",
    date: "2025-01-15",
    progress: 45,
  },
];

const ComplaintHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filtered = mockComplaints.filter((complaint) => {
    const matchesSearch = 
      complaint.id.includes(searchTerm) || 
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 99) - 
             (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 99);
    }
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-success/10 text-success";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "escalated":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={false} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Complaint History
            </h1>
            <p className="text-muted-foreground">
              View and manage all your submitted complaints
            </p>
          </div>

          {/* Filters Section */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date (Newest)</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Complaints List */}
          <div className="space-y-4">
            {sorted.length > 0 ? (
              sorted.map((complaint) => (
                <Card key={complaint.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                      {/* Left Section */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Complaint ID</p>
                            <p className="font-semibold text-lg text-foreground">#{complaint.id}</p>
                          </div>
                          <Badge className={`${getStatusColor(complaint.status)}`}>
                            {getStatusLabel(complaint.status)}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">{complaint.subject}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {complaint.department}
                        </p>
                      </div>

                      {/* Center Section */}
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="font-medium text-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {complaint.date}
                        </p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{complaint.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                complaint.progress === 100 ? "bg-success" : "bg-primary"
                              }`}
                              style={{ width: `${complaint.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" className="w-full md:w-auto">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="hidden md:flex">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hidden md:flex">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Complaints Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComplaintHistory;
