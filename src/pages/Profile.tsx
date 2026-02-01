import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit2,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Eye,
  EyeOff,
  LogOut,
  Heart,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile data
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91-9876543210",
    address: "123 Main Street",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    accountCreated: "2024-01-15",
    totalComplaints: 12,
    resolvedComplaints: 10,
  });

  const [editData, setEditData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notifications preferences
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsUpdates: true,
    newsLetter: false,
    pushNotifications: true,
  });

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.confirmPassword &&
      passwordData.newPassword === passwordData.confirmPassword
    ) {
      // Simulate API call
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
      alert("Password changed successfully");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={true} />

      <main className="flex-1 py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-6">
              {/* Profile Card */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(true);
                        setEditData(profile);
                      }}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={editData.firstName}
                            onChange={(e) => handleEditChange("firstName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={editData.lastName}
                            onChange={(e) => handleEditChange("lastName", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleEditChange("email", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={editData.phone}
                          onChange={(e) => handleEditChange("phone", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={editData.address}
                          onChange={(e) => handleEditChange("address", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={editData.city}
                            onChange={(e) => handleEditChange("city", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={editData.state}
                            onChange={(e) => handleEditChange("state", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={editData.pincode}
                            onChange={(e) => handleEditChange("pincode", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1 gap-2 bg-success hover:bg-success/90"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 gap-2"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">First Name</p>
                          <p className="text-lg font-semibold text-foreground">{profile.firstName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Last Name</p>
                          <p className="text-lg font-semibold text-foreground">{profile.lastName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold text-foreground">{profile.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-semibold text-foreground">{profile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-semibold text-foreground">
                            {profile.address}, {profile.city}, {profile.state} {profile.pincode}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Account Created</p>
                          <p className="font-semibold text-foreground">{profile.accountCreated}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Account Status</p>
                          <Badge className="bg-success/20 text-success border-0">Active</Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      Security
                    </CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </div>
                  {!showPasswordChange && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPasswordChange(true)}
                      className="gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      Change Password
                    </Button>
                  )}
                </CardHeader>
                {showPasswordChange && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handlePasswordChange}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowPasswordChange(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive updates about your complaints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Email Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get updates via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          emailUpdates: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">SMS Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Get updates via SMS
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.smsUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          smsUpdates: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Instant notifications on your device
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          pushNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Weekly government service updates
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.newsLetter}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          newsLetter: checked,
                        }))
                      }
                    />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Save Preferences
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

export default Profile;
