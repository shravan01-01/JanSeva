import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  open: boolean;
  complaintId: string;
  complaintSubject: string;
  onClose: () => void;
}

const FeedbackForm = ({
  open,
  complaintId,
  complaintSubject,
  onClose,
}: FeedbackFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      toast({
        title: "Required",
        description: "Please provide your feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store feedback in localStorage
      const feedbackData = {
        complaintId,
        rating,
        feedback,
        submittedAt: new Date().toISOString(),
      };

      const existingFeedback = JSON.parse(
        localStorage.getItem("complaint_feedback") || "[]"
      );
      existingFeedback.push(feedbackData);
      localStorage.setItem("complaint_feedback", JSON.stringify(existingFeedback));

      toast({
        title: "Thank You! 🎉",
        description: "Your feedback has been submitted successfully.",
      });

      // Reset form
      setRating(5);
      setFeedback("");
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-green-700">
            Complaint Resolved! 🎊
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            We're glad we could help! Please share your feedback on the resolution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Complaint Details */}
          <Card className="bg-blue-50 border-blue-200 p-4">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
              Complaint ID
            </p>
            <p className="font-bold text-primary mb-3">{complaintId}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">
              Subject
            </p>
            <p className="text-sm font-medium text-foreground">{complaintSubject}</p>
          </Card>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              How satisfied are you with the resolution?
            </Label>
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-all duration-200 hover:scale-125"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          {/* Feedback Text */}
          <div className="space-y-3">
            <Label htmlFor="feedback" className="text-base font-semibold">
              Your Feedback (Optional)
            </Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you liked or what could be improved..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-24 resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {feedback.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmitFeedback}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
