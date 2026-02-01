import { useState } from "react";
import { Users2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const FeedbackFormSection = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    fullName: "",
    email: "",
    category: "General Feedback",
    message: "",
  });

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
    <section className="px-4 md:px-8 py-20 bg-white">
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        {!feedbackSubmitted ? (
          <Card className="shadow-xl border-0 transition-all duration-500 hover:shadow-2xl">
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
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                    size="lg"
                  >
                    Submit Feedback
                  </Button>
                </form>

                {/* Info Cards */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-emerald-50 hover:border-emerald-200">
                    <p className="text-3xl mb-2 transition-transform duration-300 hover:scale-125">⚡</p>
                    <p className="text-sm font-semibold text-foreground">Quick Response</p>
                    <p className="text-xs text-muted-foreground">Within 48hrs</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-emerald-50 hover:border-emerald-200">
                    <p className="text-3xl mb-2 transition-transform duration-300 hover:scale-125">🎯</p>
                    <p className="text-sm font-semibold text-foreground">Your Voice Matters</p>
                    <p className="text-xs text-muted-foreground">We Listen</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-emerald-50 hover:border-emerald-200">
                    <p className="text-3xl mb-2 transition-transform duration-300 hover:scale-125">🔒</p>
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
  );
};

export default FeedbackFormSection;

