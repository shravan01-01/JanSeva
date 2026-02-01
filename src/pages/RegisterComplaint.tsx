import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Send, CheckCircle, AlertCircle, X, FileIcon } from "lucide-react";
import { toast } from "sonner";

const departments = [
  "Municipal Services",
  "Water Supply",
  "Electricity",
  "Roads & Traffic",
  "Sanitation",
  "Environment",
  "Public Safety",
  "Revenue",
  "Other",
];

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.department || !formData.subject || !formData.description || !formData.location) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload delay
      if (uploadedFiles.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Generate complaint ID
      const complaintId = Date.now().toString();
      
      // Create file metadata (storing file names and sizes, not actual file data for localStorage)
      const fileMetadata = uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      }));

      // Create new complaint object
      const newComplaint = {
        id: complaintId,
        title: formData.subject,
        category: formData.department,
        status: "In Progress",
        date: new Date().toISOString().split('T')[0],
        progress: 15,
        description: formData.description,
        location: formData.location,
        submittedBy: formData.name,
        email: formData.email,
        phone: formData.phone,
        attachments: fileMetadata,
        attachmentCount: uploadedFiles.length,
      };

      // Get existing complaints from localStorage
      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      
      // Add new complaint to the beginning (most recent)
      existingComplaints.unshift(newComplaint);
      
      // Save back to localStorage
      localStorage.setItem('complaints', JSON.stringify(existingComplaints));

      toast.success("Complaint registered successfully!", {
        description: `Your complaint ID is #${complaintId}. You can track it anytime.${uploadedFiles.length > 0 ? ` ${uploadedFiles.length} file(s) attached.` : ''}`,
      });

      setIsSubmitting(false);
      setUploadedFiles([]);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Error submitting complaint. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    if (file.size > maxSize) {
      toast.error(`File ${file.name} is too large. Max 5MB allowed.`);
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      toast.error(`File ${file.name} has invalid format. Only JPG and PNG allowed.`);
      return false;
    }
    
    return true;
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        newFiles.push(file);
      }
    }
    
    const updatedFiles = [...uploadedFiles, ...newFiles];
    
    if (updatedFiles.length > 5) {
      toast.error('Maximum 5 files allowed. Only first 5 files will be kept.');
      setUploadedFiles(updatedFiles.slice(0, 5));
    } else {
      setUploadedFiles(updatedFiles);
      if (newFiles.length > 0) {
        toast.success(`${newFiles.length} file(s) uploaded successfully!`);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    toast.success('File removed');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showSearch={false} />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Register Your Complaint
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to submit your grievance. All fields marked with * are required.
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-lg border-border">
            <CardHeader className="bg-primary/5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Send className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Complaint Form</CardTitle>
                  <CardDescription>Your complaint will be routed to the appropriate department</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Personal Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Complaint Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Complaint Details
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department / Issue Type *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleChange("department", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject of your complaint"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed description of your complaint..."
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter address or landmark"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Upload Photos (Optional)</Label>
                      <Badge variant="outline" className="text-xs">
                        {uploadedFiles.length}/5 files
                      </Badge>
                    </div>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Drag and drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Max 5 files, up to 5MB each (JPG, PNG)
                        </p>
                      </label>
                    </div>

                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium text-foreground">Uploaded Files:</p>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                                  <FileIcon className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="flex-shrink-0 ml-2 p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs text-green-700">
                            ✓ {uploadedFiles.length} file(s) ready to upload with your complaint
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-saffron/10 border border-saffron/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Important Notice</p>
                    <p className="text-muted-foreground">
                      False complaints may result in legal action. Ensure all information provided is accurate.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="saffron"
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Complaint
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterComplaint;
