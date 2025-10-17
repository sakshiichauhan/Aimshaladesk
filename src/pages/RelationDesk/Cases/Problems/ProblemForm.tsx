// import { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import {
//   Upload,
//   FileText,
//   Send,
//   ArrowLeft,
//   Download,
//   Mail,
//   Phone,
//   MessageCircle,
//   Clock,
//   Flag,
//   BarChart3,
//   User,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface ProblemFormProps {
//   onBack?: () => void;
// }

// export const ProblemForm = ({ onBack }: ProblemFormProps) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     category: "",
//     description: "",
//     urgency: "",
//     stepsToReproduce: "",
//     contactMethods: [] as string[],
//     otherCategory: "",
//   });

//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const newFiles = Array.from(e.dataTransfer.files);
//       setUploadedFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setUploadedFiles((prev) => [...prev, ...newFiles]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleContactMethodChange = (method: string, checked: boolean) => {
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         contactMethods: [...prev.contactMethods, method],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         contactMethods: prev.contactMethods.filter((m) => m !== method),
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData, uploadedFiles);
//     // Navigate to problem view or success page
//     if (onBack) {
//       onBack();
//     } else {
//       navigate("view");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--background)] p-6">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <Button
//           variant="border"
//           size="sm"
//           onClick={onBack || (() => navigate(-1))}
//           className="flex items-center gap-2"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back
//         </Button>
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--text-head)]">
//             Report a Problem
//           </h1>
//           <p className="text-sm text-[var(--text)]">
//             Submit a detailed problem report for review
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Form */}
//         <div className="lg:col-span-2">
//           <Card className="bg-[var(--background)] border shadow-none">
//             <CardHeader>
//               <CardTitle className="text-lg text-[var(--text-head)]">
//                 Problem Report Form
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Problem Category */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="category"
//                     className="text-sm font-medium text-[var(--text-head)]"
//                   >
//                     Problem Category *
//                   </Label>
//                   <Select
//                     value={formData.category}
//                     onValueChange={(value) =>
//                       setFormData((prev) => ({ ...prev, category: value }))
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="technical">Technical Issue</SelectItem>
//                       <SelectItem value="payment">Payment Issue</SelectItem>
//                       <SelectItem value="information">
//                         Incorrect Information
//                       </SelectItem>
//                       <SelectItem value="account">
//                         Account/Login Issue
//                       </SelectItem>
//                       <SelectItem value="content">
//                         Content Access Problem
//                       </SelectItem>
//                       <SelectItem value="other">
//                         Other (Please specify)
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {formData.category === "other" && (
//                     <Input
//                       placeholder="Please specify the problem category"
//                       value={formData.otherCategory}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           otherCategory: e.target.value,
//                         }))
//                       }
//                       className="mt-2"
//                     />
//                   )}
//                 </div>

//                 {/* Describe the Issue */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="description"
//                     className="text-sm font-medium text-[var(--text-head)]"
//                   >
//                     Describe the Issue *
//                   </Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Please provide a detailed description of the problem you're experiencing..."
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                     rows={4}
//                     className="resize-none"
//                   />
//                 </div>

//                 {/* Screenshot or Supporting File */}
//                 <div className="space-y-2">
//                   <Label className="text-sm font-medium text-[var(--text-head)]">
//                     Screenshot or Supporting File
//                   </Label>
//                   <div
//                     className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                       dragActive
//                         ? "border-[var(--brand-color)] bg-[var(--brand-color2)]"
//                         : "border-[var(--text)]/20 hover:border-[var(--text)]/40"
//                     }`}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                     onDrop={handleDrop}
//                   >
//                     <Upload className="h-8 w-8 mx-auto mb-2 text-[var(--text)]" />
//                     <p className="text-sm text-[var(--text-head)] mb-1">
//                       Drag and drop files here or{" "}
//                       <label className="text-[var(--brand-color)] cursor-pointer hover:underline">
//                         Browse file
//                       </label>
//                     </p>
//                     <p className="text-xs text-[var(--text)]">
//                       Supported formats: .jpg, .png, .mp4, .pdf, .doc, .docx,
//                       etc.
//                     </p>
//                     <input
//                       type="file"
//                       multiple
//                       accept=".jpg,.jpeg,.png,.mp4,.pdf,.doc,.docx"
//                       onChange={handleFileInput}
//                       className="hidden"
//                       id="file-upload"
//                     />
//                     <label htmlFor="file-upload" className="sr-only">
//                       Upload files
//                     </label>
//                   </div>

//                   {/* Uploaded Files */}
//                   {uploadedFiles.length > 0 && (
//                     <div className="space-y-2">
//                       <p className="text-sm text-[var(--text-head)]">
//                         Uploaded Files:
//                       </p>
//                       {uploadedFiles.map((file, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between p-2 bg-[var(--faded)] rounded"
//                         >
//                           <div className="flex items-center gap-2">
//                             <FileText className="h-4 w-4 text-[var(--text)]" />
//                             <span className="text-sm text-[var(--text-head)]">
//                               {file.name}
//                             </span>
//                             <span className="text-xs text-[var(--text)]">
//                               ({(file.size / 1024 / 1024).toFixed(2)} MB)
//                             </span>
//                           </div>
//                           <Button
//                             type="button"
//                             variant="link"
//                             size="sm"
//                             onClick={() => removeFile(index)}
//                             className="text-[var(--red)] hover:text-[var(--red)] p-0 h-auto"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Urgency Level */}
//                 <div className="space-y-2">
//                   <Label className="text-sm font-medium text-[var(--text-head)]">
//                     Urgency Level *
//                   </Label>
//                   <RadioGroup
//                     value={formData.urgency}
//                     onValueChange={(value) =>
//                       setFormData((prev) => ({ ...prev, urgency: value }))
//                     }
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="low" id="low" />
//                       <Label
//                         htmlFor="low"
//                         className="text-sm text-[var(--text)]"
//                       >
//                         Low (Can be addressed later)
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="medium" id="medium" />
//                       <Label
//                         htmlFor="medium"
//                         className="text-sm text-[var(--text)]"
//                       >
//                         Medium (Needs resolution soon)
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="high" id="high" />
//                       <Label
//                         htmlFor="high"
//                         className="text-sm text-[var(--text)]"
//                       >
//                         High (Urgent attention required)
//                       </Label>
//                     </div>
//                   </RadioGroup>
//                 </div>

//                 {/* Steps to Reproduce */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="steps"
//                     className="text-sm font-medium text-[var(--text-head)]"
//                   >
//                     Steps to Reproduce the Issue
//                   </Label>
//                   <Textarea
//                     id="steps"
//                     placeholder="Please describe the steps that led to this problem..."
//                     value={formData.stepsToReproduce}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         stepsToReproduce: e.target.value,
//                       }))
//                     }
//                     rows={3}
//                     className="resize-none"
//                   />
//                 </div>

//                 {/* Preferred Method of Contact */}
//                 <div className="space-y-2">
//                   <Label className="text-sm font-medium text-[var(--text-head)]">
//                     Preferred Method of Contact
//                   </Label>
//                   <div className="space-y-2">
//                     {["Email", "Phone", "Message"].map((method) => (
//                       <div key={method} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={method.toLowerCase()}
//                           checked={formData.contactMethods.includes(method)}
//                           onCheckedChange={(checked) =>
//                             handleContactMethodChange(
//                               method,
//                               checked as boolean
//                             )
//                           }
//                         />
//                         <Label
//                           htmlFor={method.toLowerCase()}
//                           className="text-sm text-[var(--text)]"
//                         >
//                           {method}
//                         </Label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <Separator />

//                 {/* Submit Button */}
//                 <div className="flex justify-end">
//                   <Button
//                     type="submit"
//                     variant="brand"
//                     className="flex items-center gap-2"
//                   >
//                     <Send className="h-4 w-4" />
//                     Submit Problem Report
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Ticket Details Sidebar */}
//         <div className="lg:col-span-1">
//           <Card className="bg-[var(--background)] border shadow-none sticky top-6">
//             <CardHeader>
//               <CardTitle className="text-lg text-[var(--text-head)]">
//                 Ticket Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-3">
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Ticket
//                   </label>
//                   <p className="text-sm font-medium text-[var(--text-head)]">
//                     #PRB-001
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Client
//                   </label>
//                   <p className="text-sm font-medium text-[var(--text-head)]">
//                     Aimshala
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Project
//                   </label>
//                   <p className="text-sm font-medium text-[var(--text-head)]">
//                     Platform Dashboard
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Assigned To
//                   </label>
//                   <div className="flex items-center gap-2 mt-1">
//                     <div className="h-8 w-8 rounded-full bg-[var(--brand-color2)] flex items-center justify-center">
//                       <User className="h-4 w-4 text-[var(--brand-color)]" />
//                     </div>
//                     <span className="text-sm text-[var(--text)]">
//                       Support Team
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Status
//                   </label>
//                   <Badge variant="standard" className="mt-1">
//                     New
//                   </Badge>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Priority
//                   </label>
//                   <Badge variant="destructive" className="mt-1">
//                     High
//                   </Badge>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Create Date
//                   </label>
//                   <p className="text-sm font-medium text-[var(--text-head)]">
//                     {new Date().toLocaleDateString("en-US", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Due Date
//                   </label>
//                   <p className="text-sm font-medium text-[var(--text-head)]">
//                     {new Date(
//                       Date.now() + 7 * 24 * 60 * 60 * 1000
//                     ).toLocaleDateString("en-US", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Last Activity
//                   </label>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Clock className="h-3 w-3 text-[var(--text)]" />
//                     <span className="text-sm text-[var(--text)]">Just now</span>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-[var(--text)] uppercase">
//                     Labels
//                   </label>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     <Badge variant="secondary" className="text-xs">
//                       Support
//                     </Badge>
//                     <Badge variant="secondary" className="text-xs">
//                       Bug Report
//                     </Badge>
//                     <Badge variant="secondary" className="text-xs">
//                       User Issue
//                     </Badge>
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               <div className="space-y-3">
//                 <h4 className="font-semibold text-[var(--text-head)]">
//                   Quick Actions
//                 </h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Mail className="h-3 w-3" />
//                     Email
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Phone className="h-3 w-3" />
//                     Call
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <MessageCircle className="h-3 w-3" />
//                     Message
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Download className="h-3 w-3" />
//                     Export
//                   </Button>
//                 </div>
//               </div>

//               <Separator />

//               <div className="space-y-3">
//                 <h4 className="font-semibold text-[var(--text-head)]">
//                   Admin Tools
//                 </h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Send className="h-3 w-3" />
//                     Send Update
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Download className="h-3 w-3" />
//                     Download Report
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <User className="h-3 w-3" />
//                     Assign User
//                   </Button>
//                   <Button
//                     variant="border"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <BarChart3 className="h-3 w-3" />
//                     View Analytics
//                   </Button>
//                   <Button
//                     variant="delete"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Flag className="h-3 w-3" />
//                     Flag Issue
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
