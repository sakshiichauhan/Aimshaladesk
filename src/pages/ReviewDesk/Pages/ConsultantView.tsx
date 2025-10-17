import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileImage from "@/assets/Assignuser/assignuser1.jpeg";
import IntroVideo from "@/assets/TempVideo/0_Viking_Warrior_3840x2160.mp4";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Image,
  User,
  GraduationCap,
  Shield,
  Video,
  Target,
  RefreshCw,
  CreditCard,
  FileText,
  Building2,
  UserCheck,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ApprovalStatus {
  profilePicture: "pending" | "approved" | "objection" | "suggested";
  basicInfo: "pending" | "approved" | "objection" | "suggested";
  qualifications: "pending" | "approved" | "objection" | "suggested";
  ekyc: "pending" | "approved" | "objection" | "suggested";
  introVideo: "pending" | "approved" | "objection" | "suggested";
}

interface ConsultantData {
  id: string;
  name: string;
  profilePicture: string;
  username: string;
  bio: string;
  city: string;
  timezone: string;
  education: string[];
  experience: string[];
  certifications: string[];
  isEducator: boolean;
  isConsultant: boolean;
  ekycStatus: {
    aadhaar: boolean;
    pan: boolean;
    bankDetails: boolean;
    personalInfo: boolean;
  };
  introVideo: string;
}

export function ConsultantView() {
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({
    profilePicture: "pending",
    basicInfo: "pending",
    qualifications: "pending",
    ekyc: "pending",
    introVideo: "pending",
  });
  const [comments, setComments] = useState<Record<string, string>>({});
  const [finalComment, setFinalComment] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // Mock data - replace with actual data
  const consultant: ConsultantData = {
    id: "CON001",
    name: "Dr. Sarah Johnson",
    profilePicture: "/path/to/profile.jpg",
    username: "sarah.johnson",
    bio: "Experienced business consultant with 15+ years in strategic planning and organizational development. Specialized in digital transformation and change management.",
    city: "Mumbai",
    timezone: "IST (UTC+5:30)",
    education: [
      "MBA - Harvard Business School",
      "PhD - Organizational Psychology",
    ],
    experience: [
      "Senior Consultant - McKinsey & Company",
      "Strategy Director - TechCorp",
    ],
    certifications: ["PMP", "Six Sigma Black Belt", "Agile Coach"],
    isEducator: false,
    isConsultant: true,
    ekycStatus: {
      aadhaar: true,
      pan: true,
      bankDetails: true,
      personalInfo: true,
    },
    introVideo: IntroVideo,
  };

  const steps = [
    {
      id: "profilePicture",
      title: "Profile Picture",
      icon: <Image className="w-5 h-5" />,
    },
    {
      id: "basicInfo",
      title: "Basic Identity Info",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "qualifications",
      title: "Qualifications & Background",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      id: "ekyc",
      title: "eKYC Verification",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "introVideo",
      title: "Introduction Video",
      icon: <Video className="w-5 h-5" />,
    },
  ];

  const handleApproval = (
    step: keyof ApprovalStatus,
    action: "approve" | "objection" | "suggest"
  ) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [step]:
        action === "approve"
          ? "approved"
          : action === "objection"
          ? "objection"
          : "suggested",
    }));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-800",
      objection: "bg-red-100 text-red-800",
      suggested: "bg-yellow-100 text-yellow-800",
      pending: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const canActivateProfile = Object.values(approvalStatus).every(
    (status) => status === "approved"
  );

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];
    const currentStepId = currentStepData.id as keyof ApprovalStatus;

    switch (currentStepId) {
      case "profilePicture":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" /> Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-6">
                <Avatar className="w-40 h-40">
                  <AvatarImage src={ProfileImage} alt={consultant.name} />
                  <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--text-head)]">
                      Photo Requirements:
                    </h4>
                    <ul className="text-xs text-[var(--text)] space-y-1">
                      <li> Clear, high-quality image</li>
                      <li> Face should be clearly visible</li>
                      <li> No logos or placeholder images</li>
                      <li> Professional appearance</li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleApproval("profilePicture", "approve")
                      }
                      variant="brand"
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() =>
                        handleApproval("profilePicture", "objection")
                      }
                      variant="destructive"
                      size="sm"
                    >
                      Objection
                    </Button>
                    <Button
                      onClick={() =>
                        handleApproval("profilePicture", "suggest")
                      }
                      variant="outline"
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>

                  {approvalStatus.profilePicture === "suggested" && (
                    <Textarea
                      placeholder="Enter suggestions for profile picture changes..."
                      value={comments.profilePicture || ""}
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          profilePicture: e.target.value,
                        }))
                      }
                      className="min-h-[100px]"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "basicInfo":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Identity Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-head)]">
                    Username
                  </label>
                  <div className="p-3 border rounded-md bg-[var(--faded)]">
                    {consultant.username}
                  </div>
                  <p className="text-xs text-[var(--text-light)]">
                    Check: Real name, no emojis/numbers
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-head)]">
                    City & Timezone
                  </label>
                  <div className="p-3 border rounded-md bg-[var(--faded)]">
                    {consultant.city} - {consultant.timezone}
                  </div>
                  <p className="text-xs text-[var(--text-light)]">
                    Check: City mentioned and matches timezone
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-head)]">
                  Bio
                </label>
                <div className="p-3 border rounded-md bg-[var(--faded)] min-h-[80px]">
                  {consultant.bio}
                </div>
                <p className="text-xs text-[var(--text-light)]">
                  Check: Clear, relevant, no slang
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproval("basicInfo", "approve")}
                  variant="brand"
                  size="sm"
                >
                  Approve All
                </Button>
                <Button
                  onClick={() => handleApproval("basicInfo", "objection")}
                  variant="destructive"
                  size="sm"
                >
                  Objection All
                </Button>
                <Button
                  onClick={() => handleApproval("basicInfo", "suggest")}
                  variant="outline"
                  size="sm"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              {approvalStatus.basicInfo === "suggested" && (
                <Textarea
                  placeholder="Enter suggestions for basic info changes..."
                  value={comments.basicInfo || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      basicInfo: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              )}
            </CardContent>
          </Card>
        );

      case "qualifications":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Qualifications & Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--text-head)]">
                    Education
                  </h4>
                  <div className="space-y-2">
                    {consultant.education.map((edu, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md bg-[var(--faded)] text-sm text-[var(--text)]"
                      >
                        {edu}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-light)]">
                    Check: Relevant to area of expertise
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--text-head)]">
                    Experience
                  </h4>
                  <div className="space-y-2">
                    {consultant.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md bg-[var(--faded)] text-sm text-[var(--text)]"
                      >
                        {exp}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-light)]">
                    Check: Career history aligns with role
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--text-head)]">
                    Certifications
                  </h4>
                  <div className="space-y-2">
                    {consultant.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md bg-[var(--faded)] text-sm text-[var(--text)]"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-light)]">
                    Required for Consultants
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproval("qualifications", "approve")}
                  variant="brand"
                  size="sm"
                >
                  Approve All
                </Button>
                <Button
                  onClick={() => handleApproval("qualifications", "objection")}
                  variant="destructive"
                  size="sm"
                >
                  Objection All
                </Button>
                <Button
                  onClick={() => handleApproval("qualifications", "suggest")}
                  variant="outline"
                  size="sm"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              {approvalStatus.qualifications === "suggested" && (
                <Textarea
                  placeholder="Enter suggestions for qualifications changes..."
                  value={comments.qualifications || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      qualifications: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              )}
            </CardContent>
          </Card>
        );

      case "ekyc":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                eKYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg bg-[var(--faded)]">
                  <div className="text-2xl mb-2">
                    <CreditCard className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="font-medium text-[var(--text-head)]">
                    Aadhaar
                  </div>
                  <Badge
                    className={
                      consultant.ekycStatus.aadhaar
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {consultant.ekycStatus.aadhaar ? "Verified" : "Pending"}
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg bg-[var(--faded)]">
                  <div className="text-2xl mb-2">
                    <FileText className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="font-medium text-[var(--text-head)]">PAN</div>
                  <Badge
                    className={
                      consultant.ekycStatus.pan
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {consultant.ekycStatus.pan ? "Verified" : "Pending"}
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg bg-[var(--faded)]">
                  <div className="text-2xl mb-2">
                    <Building2 className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="font-medium text-[var(--text-head)]">
                    Bank Details
                  </div>
                  <Badge
                    className={
                      consultant.ekycStatus.bankDetails
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {consultant.ekycStatus.bankDetails ? "Verified" : "Pending"}
                  </Badge>
                </div>

                <div className="text-center p-4 border rounded-lg bg-[var(--faded)]">
                  <div className="text-2xl mb-2">
                    <UserCheck className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="font-medium text-[var(--text-head)]">
                    Personal Info
                  </div>
                  <Badge
                    className={
                      consultant.ekycStatus.personalInfo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {consultant.ekycStatus.personalInfo
                      ? "Verified"
                      : "Pending"}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleApproval("ekyc", "approve")}
                  variant="brand"
                  size="sm"
                  disabled={
                    !Object.values(consultant.ekycStatus).every(Boolean)
                  }
                >
                  Approve eKYC
                </Button>
                <Button
                  onClick={() => handleApproval("ekyc", "objection")}
                  variant="destructive"
                  size="sm"
                >
                  Objection eKYC
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "introVideo":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Introduction Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <img
                        src={ProfileImage}
                        alt="thumbnail"
                        className="rounded-sm w-30 hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Introduction Video Preview</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <video
                        src={IntroVideo}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-[var(--text-head)]">
                    Video Requirements:
                  </h4>
                  <ul className="text-xs text-[var(--text)] space-y-1">
                    <li> Must cover introduction and motivation</li>
                    <li> Clear audio and video quality</li>
                    <li> Relevant content and language</li>
                    <li> Professional presentation</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl">
                    <DialogHeader>
                      <DialogTitle>Introduction Video Preview</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                      <video
                        src={IntroVideo}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => handleApproval("introVideo", "approve")}
                  variant="brand"
                  size="sm"
                >
                  Approve Video
                </Button>
                <Button
                  onClick={() => handleApproval("introVideo", "objection")}
                  variant="destructive"
                  size="sm"
                >
                  Objection Video
                </Button>
                <Button
                  onClick={() => handleApproval("introVideo", "suggest")}
                  variant="outline"
                  size="sm"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              {approvalStatus.introVideo === "suggested" && (
                <Textarea
                  placeholder="Enter reason for re-upload request..."
                  value={comments.introVideo || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      introVideo: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-head)]">
            Consultant Profile Review
          </h1>
          <p className="mt-2 text-[var(--text)]">
            Review and approve consultant profile
            <Badge variant="outline" className="ml-3">
              {consultant.name}
            </Badge>
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          ID: {consultant.id}
        </Badge>
      </div>

      {/* Progress Steps Bar */}
      <div className="rounded-sm border bg-[var(--background)] overflow-x-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-[var(--text-head)] mb-4">
            Approval Progress
          </h2>
          <div className="relative flex items-center">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center flex-1 cursor-pointer"
                onClick={() => setCurrentStep(index)}
              >
                {/* Connecting line behind the circles */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-6 left-1/2 h-1 z-0 ${
                      approvalStatus[step.id as keyof ApprovalStatus] ===
                      "approved"
                        ? "bg-green-400"
                        : approvalStatus[step.id as keyof ApprovalStatus] ===
                          "objection"
                        ? "bg-red-400"
                        : approvalStatus[step.id as keyof ApprovalStatus] ===
                          "suggested"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                    style={{
                      width: "calc(100% - 1.5rem)",
                      marginLeft: "0.75rem",
                    }}
                  />
                )}

                {/* Step circle with border and shadow */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg border-4 border-white shadow-lg transition-all duration-200 ${
                    currentStep === index
                      ? "ring-4 ring-blue-300 scale-110"
                      : ""
                  } ${
                    approvalStatus[step.id as keyof ApprovalStatus] ===
                    "approved"
                      ? "bg-green-500 text-white"
                      : approvalStatus[step.id as keyof ApprovalStatus] ===
                        "objection"
                      ? "bg-red-500 text-white"
                      : approvalStatus[step.id as keyof ApprovalStatus] ===
                        "suggested"
                      ? "bg-yellow-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {approvalStatus[step.id as keyof ApprovalStatus] ===
                  "approved" ? (
                    <div className="scale-75">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  ) : approvalStatus[step.id as keyof ApprovalStatus] ===
                    "objection" ? (
                    <div className="scale-75">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                  ) : approvalStatus[step.id as keyof ApprovalStatus] ===
                    "suggested" ? (
                    <div className="scale-75">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="scale-75">{step.icon}</div>
                  )}
                </div>

                {/* Step content */}
                <div className="flex flex-col items-center space-y-2 mt-3">
                  <span className="text-sm font-medium text-[var(--text)] text-center">
                    {step.title}
                  </span>
                  <Badge
                    className={getStatusBadge(
                      approvalStatus[step.id as keyof ApprovalStatus]
                    )}
                  >
                    {approvalStatus[step.id as keyof ApprovalStatus]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Step Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text-head)]">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </h3>
        </div>

        {renderStepContent()}
      </div>

      {/* Final Submit Panel - Only show when all steps are completed */}
      {Object.values(approvalStatus).every(
        (status) =>
          status === "approved" ||
          status === "objection" ||
          status === "suggested"
      ) && (
        <Card className="border-blue-200">
          <CardHeader className="border-b border-blue-200">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Target className="w-5 h-5" /> Final Submit Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            <div className="relative flex items-center mt-5">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center flex-1"
                >
                  {/* Connecting line behind the circles */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 left-1/2 h-1 z-0 ${
                        approvalStatus[step.id as keyof ApprovalStatus] ===
                        "approved"
                          ? "bg-green-400"
                          : approvalStatus[step.id as keyof ApprovalStatus] ===
                            "objection"
                          ? "bg-red-400"
                          : approvalStatus[step.id as keyof ApprovalStatus] ===
                            "suggested"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                      }`}
                      style={{
                        width: "calc(100% - 1.5rem)",
                        marginLeft: "0.75rem",
                      }}
                    />
                  )}

                  {/* Step circle with border and shadow */}
                  <div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg border-4 border-white shadow-lg ${
                      approvalStatus[step.id as keyof ApprovalStatus] ===
                      "approved"
                        ? "bg-green-500 text-white"
                        : approvalStatus[step.id as keyof ApprovalStatus] ===
                          "objection"
                        ? "bg-red-500 text-white"
                        : approvalStatus[step.id as keyof ApprovalStatus] ===
                          "suggested"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {approvalStatus[step.id as keyof ApprovalStatus] ===
                    "approved" ? (
                      <div className="scale-75">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : approvalStatus[step.id as keyof ApprovalStatus] ===
                      "objection" ? (
                      <div className="scale-75">
                        <XCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : approvalStatus[step.id as keyof ApprovalStatus] ===
                      "suggested" ? (
                      <div className="scale-75">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="scale-75">{step.icon}</div>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex flex-col items-center space-y-2 mt-3">
                    <span className="text-sm font-medium text-[var(--text)] text-center">
                      {step.title}
                    </span>
                    <Badge
                      className={getStatusBadge(
                        approvalStatus[step.id as keyof ApprovalStatus]
                      )}
                    >
                      {approvalStatus[step.id as keyof ApprovalStatus]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--text-head)]">
                  Final Comment (Optional)
                </label>
                <Textarea
                  placeholder="Add any final comments or notes..."
                  value={finalComment}
                  onChange={(e) => setFinalComment(e.target.value)}
                  className="min-h-[100px] bg-white"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="brand"
                  size="sm"
                  disabled={!canActivateProfile}
                >
                  Activate Profile
                </Button>

                <Button
                  variant="border"
                  size="sm"
                  disabled={Object.values(approvalStatus).every(
                    (status) => status === "approved"
                  )}
                >
                  <RefreshCw className="w-4 h-4" /> Send for Corrections
                </Button>

                <Button variant="destructive" size="sm">
                  Reject Profile
                </Button>
              </div>

              {!canActivateProfile && (
                <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ All sections must be approved before activating the
                    profile. Current status:{" "}
                    {
                      Object.values(approvalStatus).filter(
                        (s) => s === "approved"
                      ).length
                    }
                    /{Object.keys(approvalStatus).length} approved
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center gap-2 mt-2">
        <Button
          onClick={prevStep}
          variant="outline"
          size="sm"
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          onClick={nextStep}
          variant="outline"
          size="sm"
          disabled={currentStep === steps.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
