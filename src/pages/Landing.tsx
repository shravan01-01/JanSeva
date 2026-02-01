import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Shield,
  Users,
  BookOpen,
  Phone,
  Users2,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    fullName: "",
    email: "",
    category: "General Feedback",
    message: "",
  });

  const features = [
    {
      icon: FileText,
      title: "Easy Registration",
      description: "Submit complaints in just 3 simple steps with our intuitive form",
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your complaint status 24/7 with instant updates",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated support team to help resolve your issues quickly",
    },
    {
      icon: BarChart3,
      title: "Performance Metrics",
      description: "Transparent reporting on resolution rates and timelines",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Auto-detect location and route to right department",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Complaints Resolved",
    },
    {
      number: "95%",
      label: "Satisfaction Rate",
    },
    {
      number: "24hrs",
      label: "Average Response",
    },
    {
      number: "156",
      label: "Active Officers",
    },
  ];

  const partners = [
    {
      name: "NIC",
      fullName: "National Informatics Centre",
      logo: "https://www.nic.in/sites/default/files/NIC%20Logo.png",
    },
    {
      name: "SI",
      fullName: "Skill India",
      logo: "https://www.skillindia.gov.in/Content/document/img/Logo_Blue.png",
    },
    {
      name: "DI",
      fullName: "Digital India",
      logo: "https://www.digitalindia.gov.in/sites/default/files/Digital%20India%20Logo_1.png",
    },
    {
      name: "CSC",
      fullName: "CSC e-Governance",
      logo: "https://www.csc.gov.in/sites/default/files/csc-logo-new.png",
    },
    {
      name: "MII",
      fullName: "Make in India",
      logo: "https://www.makeinindia.com/assets/image/logo.png",
    },
  ];

  const supportServices = [
    {
      icon: BookOpen,
      title: "Help Center",
      description: "Comprehensive guides and tutorials",
      action: "Browse Articles →",
    },
    {
      icon: Phone,
      title: "Technical Support",
      description: "24/7 assistance for platform issues",
      action: "Contact Support →",
    },
    {
      icon: Users2,
      title: "Training Resources",
      description: "Learning materials for communities",
      action: "Access Training →",
    },
    {
      icon: Code,
      title: "Developer APIs",
      description: "Integration documentation",
      action: "View Docs →",
    },
  ];

  const handleFeedbackChange = (
    field: string,
    value: string
  ) => {
    setFeedbackData({
      ...feedbackData,
      [field]: value,
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !feedbackData.fullName ||
      !feedbackData.email ||
      !feedbackData.message
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Save to localStorage
    const feedbackList = JSON.parse(
      localStorage.getItem("feedback") || "[]"
    );
    const newFeedback = {
      ...feedbackData,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString(),
    };
    feedbackList.unshift(newFeedback);
    localStorage.setItem("feedback", JSON.stringify(feedbackList));

    setFeedbackSubmitted(true);
    toast.success("Thank you for your feedback!");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackData({
        fullName: "",
        email: "",
        category: "General Feedback",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10" />
            <span className="font-bold text-foreground hidden md:inline">JanSeva</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-saffron to-orange-500 hover:shadow-lg"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                    ✨ Citizen Grievance Redressal System
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Your Voice,{" "}
                  <span className="bg-gradient-to-r from-primary to-saffron bg-clip-text text-transparent">
                    Our Priority
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  JanSeva connects citizens with government services. Report issues, track
                  progress, and get timely resolutions with complete transparency.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary via-primary to-primary hover:shadow-xl text-white"
                  onClick={() => navigate("/login")}
                >
                  Register Complaint
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Track Complaint
                </Button>
              </div>

              {/* Social Proof */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.number}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-saffron/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-border">
                  <div className="space-y-6">
                    {/* Complaint Card Preview */}
                    <div className="border-l-4 border-primary p-4 rounded bg-primary/5">
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Status: In Progress
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Broken streetlight on Main Street
                      </p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-saffron h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>

                    {/* Stats Preview */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-success/10 rounded-lg text-center">
                        <p className="text-2xl font-bold text-success">87%</p>
                        <p className="text-xs text-muted-foreground">Resolved</p>
                      </div>
                      <div className="p-3 bg-warning/10 rounded-lg text-center">
                        <p className="text-2xl font-bold text-warning">2.4h</p>
                        <p className="text-xs text-muted-foreground">Avg Time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose JanSeva?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience transparent, efficient, and citizen-centric grievance redressal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-all hover:border-primary/20">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to resolve your grievances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Register",
                description: "Fill a simple form with your complaint details",
              },
              {
                number: "02",
                title: "Submit",
                description: "Upload documents and photos if needed",
              },
              {
                number: "03",
                title: "Track",
                description: "Monitor progress with real-time updates",
              },
              {
                number: "04",
                title: "Resolve",
                description: "Get resolution with complete transparency",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-saffron rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-16"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-2xl mx-auto">
          {!feedbackSubmitted ? (
            <Card className="shadow-xl border-0">
              <CardContent className="p-0">
                {/* Green Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-lg p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-3">
                      <Users2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Share Your Experience</h2>
                      <p className="text-emerald-100 text-sm">Help us improve the platform</p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground font-semibold">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your name"
                        value={feedbackData.fullName}
                        onChange={(e) =>
                          handleFeedbackChange("fullName", e.target.value)
                        }
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-semibold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={feedbackData.email}
                        onChange={(e) =>
                          handleFeedbackChange("email", e.target.value)
                        }
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-foreground font-semibold">
                        Category
                      </Label>
                      <Select
                        value={feedbackData.category}
                        onValueChange={(value) =>
                          handleFeedbackChange("category", value)
                        }
                      >
                        <SelectTrigger className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Feedback">
                            General Feedback
                          </SelectItem>
                          <SelectItem value="Bug Report">
                            Bug Report
                          </SelectItem>
                          <SelectItem value="Feature Request">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="Complaint Process">
                            Complaint Process
                          </SelectItem>
                          <SelectItem value="UX">UX</SelectItem>
                          <SelectItem value="Performance">
                            Performance
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-semibold">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Share your thoughts and suggestions..."
                        value={feedbackData.message}
                        onChange={(e) =>
                          handleFeedbackChange("message", e.target.value)
                        }
                        rows={4}
                        className="border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all"
                      size="lg"
                    >
                      Submit Feedback
                    </Button>
                  </form>

                  {/* Info Cards */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-3xl mb-2">⚡</p>
                      <p className="text-sm font-semibold text-foreground">Quick Response</p>
                      <p className="text-xs text-muted-foreground">Within 48hrs</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-3xl mb-2">🎯</p>
                      <p className="text-sm font-semibold text-foreground">Your Voice Matters</p>
                      <p className="text-xs text-muted-foreground">We Listen</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-3xl mb-2">🔒</p>
                      <p className="text-sm font-semibold text-foreground">Confidential</p>
                      <p className="text-xs text-muted-foreground">Safe & Secure</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center space-y-6 py-16">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-foreground">
                  Thank You!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We appreciate your valuable feedback and will use it to improve
                  our platform. Your response matters to us.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Get Support Section */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help you succeed on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card
                  key={idx}
                  className="hover:shadow-lg transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="text-primary font-semibold p-0 h-auto hover:bg-transparent"
                      >
                        {service.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by Government Initiatives
              <br />
              Collaborating with leading government platforms to deliver
              comprehensive digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center justify-center">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-8 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all hover:shadow-lg"
              >
                <img
                  src={partner.logo}
                  alt={partner.fullName}
                  className="h-16 object-contain mb-4"
                />
                <p className="text-sm font-semibold text-foreground text-center mb-1">
                  {partner.name}
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  {partner.fullName}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-900">
              🏛️ Supported by Government of India initiatives and digital
              transformation programs
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 md:px-8 py-20 bg-gradient-to-r from-primary/5 to-saffron/5 rounded-3xl mx-4 md:mx-8 my-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground">
              Get latest news about government services and updates
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-gradient-to-r from-primary to-saffron hover:shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo className="h-10" />
                <span className="font-bold text-foreground">JanSeva</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering citizens through transparent grievance redressal
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Home</a></li>
                <li><a href="#" className="hover:text-primary">Register Complaint</a></li>
                <li><a href="#" className="hover:text-primary">Track Complaint</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@janseva.gov</li>
                <li>Phone: 1800-JANSEVA</li>
                <li>Available: 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 JanSeva. All rights reserved.</p>
            <p>Built with ❤️ for citizen empowerment</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
