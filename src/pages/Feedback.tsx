import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: "General Feedback",
    message: "",
  });

  const categories = [
    "General Feedback",
    "Bug Report",
    "Feature Request",
    "Complaint Process",
    "User Experience",
    "Performance",
    "Other",
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const feedbackEntry = {
        id: Date.now().toString(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
      existingFeedback.push(feedbackEntry);
      localStorage.setItem('feedback', JSON.stringify(existingFeedback));

      toast.success("Thank you for your feedback!", {
        description: "Your feedback helps us improve the platform.",
      });

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        category: "General Feedback",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Error submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={false} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Share Your Experience
            </h1>
            <p className="text-muted-foreground">
              Help us improve the platform and make it better for everyone
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg border-b-4 border-emerald-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Share Your Experience</CardTitle>
                  <p className="text-sm text-emerald-100 mt-1">Help us improve the platform</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We appreciate your feedback. It helps us create a better experience for everyone.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Share your thoughts and suggestions..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-200 flex items-center justify-center mb-4">
                  <span className="text-xl">💡</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  We review all feedback within 48 hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-green-200 flex items-center justify-center mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Your Voice Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Your feedback shapes our product roadmap
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-purple-200 flex items-center justify-center mb-4">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">Confidential</h3>
                <p className="text-sm text-muted-foreground">
                  Your feedback is treated with utmost privacy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
