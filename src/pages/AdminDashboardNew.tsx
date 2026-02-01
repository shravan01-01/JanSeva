import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Users,
  Building2,
  Settings,
  FileText,
  Shield,
  Home,
  PieChart,
  Activity,
  Clock,
  Zap,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");

  const adminStats = [
    {
      title: "Total Complaints",
      value: "5,234",
      change: "+12% this month",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Resolution Rate",
      value: "87%",
      change: "+3% from last month",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "SLA Breaches",
      value: "142",
      change: "-8% from last month",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Officers",
      value: "156",
      change: "Across 12 departments",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const departmentData = [
    {
      name: "Water Supply",
      total: 856,
      resolved: 742,
      pending: 87,
      slaBreached: 27,
      avgResolutionTime: "2.3 days",
    },
    {
      name: "Roads & Traffic",
      total: 623,
      resolved: 589,
      pending: 28,
      slaBreached: 6,
      avgResolutionTime: "1.8 days",
    },
    {
      name: "Municipal Services",
      total: 1204,
      resolved: 1087,
      pending: 98,
      slaBreached: 19,
      avgResolutionTime: "2.1 days",
    },
    {
      name: "Environment",
      total: 445,
      resolved: 378,
      pending: 56,
      slaBreached: 11,
      avgResolutionTime: "3.2 days",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={true} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  System analytics and configuration
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
            {adminStats.map((stat) => {
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
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="sla">SLA Manager</TabsTrigger>
              <TabsTrigger value="users">Users & Roles</TabsTrigger>
              <TabsTrigger value="logs">System Logs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Complaint Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <Activity className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Monthly complaint trend chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Department Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p>Complaints by department</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                      <p className="text-2xl font-bold text-foreground">2.4 days</p>
                      <Badge className="bg-green-100 text-green-700">↓ 0.3 days</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">First Contact Resolution</p>
                      <p className="text-2xl font-bold text-foreground">34%</p>
                      <Badge className="bg-blue-100 text-blue-700">↑ 5%</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Citizen Satisfaction</p>
                      <p className="text-2xl font-bold text-foreground">4.2/5.0</p>
                      <Badge className="bg-green-100 text-green-700">↑ 0.3</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">System Uptime</p>
                      <p className="text-2xl font-bold text-foreground">99.9%</p>
                      <Badge className="bg-green-100 text-green-700">Excellent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-4">
              <div className="space-y-4">
                {departmentData.map((dept) => (
                  <Card key={dept.name} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
                        <div className="md:col-span-2">
                          <p className="font-semibold text-lg text-foreground">
                            {dept.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Total: {dept.total} complaints
                          </p>
                        </div>

                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Resolved</p>
                          <p className="text-xl font-bold text-blue-600">{dept.resolved}</p>
                        </div>

                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Pending</p>
                          <p className="text-xl font-bold text-yellow-600">{dept.pending}</p>
                        </div>

                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">SLA Breached</p>
                          <p className="text-xl font-bold text-red-600">{dept.slaBreached}</p>
                        </div>

                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Avg Time</p>
                          <p className="text-xl font-bold text-purple-600">{dept.avgResolutionTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* SLA Manager Tab */}
            <TabsContent value="sla" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>SLA Configuration</CardTitle>
                  <CardDescription>Set Service Level Agreements for each department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {["Water Supply", "Roads & Traffic", "Municipal Services", "Environment"].map(
                      (dept) => (
                        <div key={dept} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          <div>
                            <Label className="text-sm font-medium">{dept}</Label>
                          </div>
                          <div>
                            <Label className="text-sm">Target Resolution (Hours)</Label>
                            <Input type="number" placeholder="48" defaultValue="48" />
                          </div>
                          <Button size="sm" variant="outline">
                            Update
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users & Roles Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage officers and system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Active Users</p>
                        <p className="text-2xl font-bold text-foreground">342</p>
                      </div>
                      <Button>
                        <Users className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Admin Users</p>
                            <p className="text-sm text-muted-foreground">12 users</p>
                          </div>
                          <Badge>High Access</Badge>
                        </div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Officers</p>
                            <p className="text-sm text-muted-foreground">156 users</p>
                          </div>
                          <Badge>Medium Access</Badge>
                        </div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Citizens</p>
                            <p className="text-sm text-muted-foreground">5234+ users</p>
                          </div>
                          <Badge>Limited Access</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>System Activity Logs</CardTitle>
                  <CardDescription>Recent system activities and audit trail</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        action: "Complaint #2025-12346 escalated",
                        user: "Officer Rajesh Kumar",
                        timestamp: "2025-01-31 14:30",
                        type: "escalation",
                      },
                      {
                        action: "User role changed for Officer Priya Singh",
                        user: "Admin Sharma",
                        timestamp: "2025-01-31 13:15",
                        type: "user_update",
                      },
                      {
                        action: "SLA breached - 3 complaints",
                        user: "System",
                        timestamp: "2025-01-31 12:00",
                        type: "alert",
                      },
                      {
                        action: "Daily backup completed successfully",
                        user: "System",
                        timestamp: "2025-01-31 00:30",
                        type: "system",
                      },
                    ].map((log, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-border rounded-lg flex items-start justify-between"
                      >
                        <div>
                          <p className="font-medium text-foreground">{log.action}</p>
                          <p className="text-xs text-muted-foreground mt-1">{log.user}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                          <Badge className="mt-1" variant="outline">
                            {log.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">System Name</Label>
                      <Input defaultValue="JanSeva Portal" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Max File Upload Size (MB)</Label>
                      <Input type="number" defaultValue="5" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">SMS Notifications</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="saffron" className="w-full">
                    <Zap className="mr-2 h-4 w-4" />
                    Save Configuration
                  </Button>
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

export default AdminDashboard;
