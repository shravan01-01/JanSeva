import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Download, Eye, Trash2, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react";

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

const ComplaintHistory = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load complaints from localStorage on mount and whenever it changes
  useEffect(() => {
    const loadComplaints = () => {
      const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      // Combine stored complaints with defaults, avoiding duplicates
      const combined = [...storedComplaints];
      const ids = new Set(combined.map(c => c.id));
      
      defaultComplaints.forEach(complaint => {
        if (!ids.has(complaint.id)) {
          combined.push(complaint);
        }
      });
      
      setComplaints(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    loadComplaints();

    // Listen for storage changes (when complaints are added from other pages)
    window.addEventListener('storage', loadComplaints);
    return () => window.removeEventListener('storage', loadComplaints);
  }, []);

  const filtered = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.id.includes(searchTerm) || 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "in_progress") {
      matchesStatus = complaint.status === "In Progress";
    } else if (statusFilter === "resolved") {
      matchesStatus = complaint.status === "Resolved";
    } else if (statusFilter === "escalated") {
      matchesStatus = complaint.status === "Escalated";
    }
    
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

  const handleDelete = (id: string) => {
    const updatedComplaints = complaints.filter(c => c.id !== id);
    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setDeleteConfirm(null);
  };

  const handleViewComplaint = (id: string) => {
    // Remove # if it exists before navigating
    const cleanId = id.replace("#", "");
    navigate(`/track-complaint?id=${cleanId}`);
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
              sorted.map((complaint) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case "Resolved":
                      return "bg-green-100 text-green-700";
                    case "In Progress":
                      return "bg-blue-100 text-blue-700";
                    case "Escalated":
                      return "bg-red-100 text-red-700";
                    default:
                      return "bg-gray-100 text-gray-700";
                  }
                };

                const getStatusIcon = (status: string) => {
                  switch (status) {
                    case "Resolved":
                      return <CheckCircle className="h-4 w-4 mr-1" />;
                    case "Escalated":
                      return <AlertCircle className="h-4 w-4 mr-1" />;
                    default:
                      return null;
                  }
                };

                return (
                  <Card key={complaint.id} className="shadow-md hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                        {/* Left Section */}
                        <div className="md:col-span-2">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase">Complaint ID</p>
                              <p className="font-bold text-lg text-foreground">#{complaint.id}</p>
                            </div>
                            <Badge className={`${getStatusColor(complaint.status)} border-0 flex items-center`}>
                              {getStatusIcon(complaint.status)}
                              {complaint.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-semibold text-foreground mb-2">{complaint.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                            <MapPin className="h-3 w-3" />
                            {complaint.category}
                          </p>
                        </div>

                        {/* Center Section */}
                        <div>
                          <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase mb-1">Submitted</p>
                          <p className="font-semibold text-foreground flex items-center gap-1 mb-3">
                            <Calendar className="h-4 w-4" />
                            {complaint.date}
                          </p>
                          <div>
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-muted-foreground font-bold">Progress</span>
                              <span className="font-black bg-gradient-to-r from-primary to-saffron text-white px-2.5 py-0.5 rounded-full text-xs">
                                {complaint.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  complaint.progress === 100 ? "bg-green-500" : "bg-primary"
                                }`}
                                style={{ width: `${complaint.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="flex gap-2 justify-end flex-wrap md:flex-nowrap">
                          <Button 
                            onClick={() => handleViewComplaint(complaint.id)}
                            variant="outline" 
                            size="sm" 
                            className="flex-1 md:flex-none hover:bg-primary hover:text-white transition-colors"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="hidden md:flex hover:bg-blue-50"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={() => setDeleteConfirm(complaint.id)}
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 md:flex"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No Complaints Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button 
                    onClick={() => navigate("/register-complaint")}
                    className="bg-primary hover:bg-primary/90 text-white font-bold"
                  >
                    File a New Complaint
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this complaint? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 mt-4">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default ComplaintHistory;
