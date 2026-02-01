import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/ui/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("citizen");
  
  // Citizen Login
  const [citizenEmail, setCitizenEmail] = useState("");
  const [citizenPassword, setCitizenPassword] = useState("");
  const [citizenError, setCitizenError] = useState("");
  const [citizenLoading, setCitizenLoading] = useState(false);

  // Officer/Admin Login
  const [officerEmail, setOfficerEmail] = useState("");
  const [officerPassword, setOfficerPassword] = useState("");
  const [officerError, setOfficerError] = useState("");
  const [officerLoading, setOfficerLoading] = useState(false);

  const handleCitizenLogin = (e) => {
    e.preventDefault();
    setCitizenError("");

    if (!citizenEmail || !citizenPassword) {
      setCitizenError("Please fill in all fields");
      return;
    }

    if (!citizenEmail.includes("@")) {
      setCitizenError("Please enter a valid email");
      return;
    }

    setCitizenLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCitizenLoading(false);
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  const handleOfficerLogin = (e) => {
    e.preventDefault();
    setOfficerError("");

    if (!officerEmail || !officerPassword) {
      setOfficerError("Please fill in all fields");
      return;
    }

    if (!officerEmail.includes("@")) {
      setOfficerError("Please enter a valid email");
      return;
    }

    setOfficerLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOfficerLoading(false);
      // Redirect to officer dashboard
      navigate("/officer");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-saffron/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-saffron shadow-lg p-2">
                  <Logo className="h-12 w-12" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">JanSeva</h1>
                  <p className="text-sm text-muted-foreground">Grievance Redressal System</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security for your account
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron/10">
                    <span className="text-xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant notifications on complaint status
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <span className="text-xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated support team always available
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-xs text-muted-foreground">Complaints Resolved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-saffron">95%</p>
                <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">48hr</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="citizen">Citizen</TabsTrigger>
                  <TabsTrigger value="officer">Officer/Admin</TabsTrigger>
                </TabsList>

                {/* Citizen Login Tab */}
                <TabsContent value="citizen" className="space-y-4">
                  <form onSubmit={handleCitizenLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="citizen-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="citizen-email"
                          type="email"
                          placeholder="john@example.com"
                          value={citizenEmail}
                          onChange={(e) => {
                            setCitizenEmail(e.target.value);
                            if (citizenError) setCitizenError("");
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="citizen-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="citizen-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={citizenPassword}
                          onChange={(e) => {
                            setCitizenPassword(e.target.value);
                            if (citizenError) setCitizenError("");
                          }}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {citizenError && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive">{citizenError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary hover:shadow-lg"
                      disabled={citizenLoading}
                    >
                      {citizenLoading ? "Signing in..." : "Sign In"}
                      {!citizenLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>

                  <div className="space-y-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-primary hover:bg-primary/10"
                      onClick={() => navigate("/register")}
                    >
                      Don't have an account? Register
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-muted-foreground"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </TabsContent>

                {/* Officer/Admin Login Tab */}
                <TabsContent value="officer" className="space-y-4">
                  <form onSubmit={handleOfficerLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="officer-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="officer-email"
                          type="email"
                          placeholder="officer@gov.in"
                          value={officerEmail}
                          onChange={(e) => {
                            setOfficerEmail(e.target.value);
                            if (officerError) setOfficerError("");
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="officer-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="officer-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={officerPassword}
                          onChange={(e) => {
                            setOfficerPassword(e.target.value);
                            if (officerError) setOfficerError("");
                          }}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {officerError && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive">{officerError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary hover:shadow-lg"
                      disabled={officerLoading}
                    >
                      {officerLoading ? "Signing in..." : "Sign In"}
                      {!officerLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>

                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-muted-foreground"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="currentColor" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="currentColor" />
                  </svg>
                  Aadhaar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Landing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
