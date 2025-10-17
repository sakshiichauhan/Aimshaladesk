import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Eye, 
  Check, 
  X, 
  Plus, 
  Edit, 
  Save, 

  Calendar,
  User,
  FileText,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
 
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomInputTable } from "@/data/Data";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";





function Topbar({ name,status,id }: { name: string,status: string,id: string; }) {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 mb-4 py-3 bg-[var(--background)] h-[64px] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Custom Form</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4">
      <div>Form ID: <span className="text-[var(--text)] text-sm">{id}</span></div>
      <Badge
              className={
                status === "Applied"
                  ? "bg-[var(--green2)] text-[var(--green)]"
                  : "bg-[var(--red2)] text-[var(--red)]"
              }
            >
              {status}
            </Badge>
      </div>
    </div>
  );
}






interface FormEntry {
  id: string;
  fieldName: string;
  submittedValue: string;
  formName: string;
  submittedBy: string;
  date: string;
  status: string;
  actions: string[];
}

export function CustomFormView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formEntry, setFormEntry] = useState<FormEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFieldName, setEditedFieldName] = useState("");
  const [showCreateFieldDialog, setShowCreateFieldDialog] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldDescription, setNewFieldDescription] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [availableFieldNames, setAvailableFieldNames] = useState<string[]>([]);
  const [selectedFieldName, setSelectedFieldName] = useState("");
  const [showDetailedView, setShowDetailedView] = useState(false);

  useEffect(() => {
    // Find the form entry by ID
    const entry = CustomInputTable.find(item => item.id === id);
    if (entry) {
      setFormEntry(entry);
      setEditedFieldName(entry.fieldName);
      setSelectedFieldName(entry.fieldName);
    }
    
    // Get available field names from existing data
    const fieldNames = [...new Set(CustomInputTable.map(item => item.fieldName).filter(Boolean))];
    setAvailableFieldNames(fieldNames);
  }, [id]);

  useEffect(() => {
    // Handle action from URL parameters
    const action = searchParams.get('action');
    if (action === 'approve' && formEntry) {
      handleApprove();
    } else if (action === 'reject' && formEntry) {
      setShowRejectDialog(true);
    }
  }, [searchParams, formEntry]);

  const handleApprove = () => {
    if (formEntry) {
      // Update the status to approved
      const updatedEntry = { ...formEntry, status: "Approved" };
      setFormEntry(updatedEntry);
      
      // Here you would typically make an API call to update the database
      console.log("Approved entry:", updatedEntry);
      
      // Show success message or redirect
      alert("Entry approved successfully!");
    }
  };

  const handleReject = () => {
    if (formEntry && rejectReason.trim()) {
      // Update the status to rejected
      const updatedEntry = { ...formEntry, status: "Rejected" };
      setFormEntry(updatedEntry);
      
      // Here you would typically make an API call to update the database
      console.log("Rejected entry:", updatedEntry, "Reason:", rejectReason);
      
      setShowRejectDialog(false);
      setRejectReason("");
      alert("Entry rejected successfully!");
    }
  };

  const handleCreateField = () => {
    if (newFieldName.trim() && newFieldDescription.trim()) {
      // Here you would typically make an API call to create the new field
      console.log("Creating new field:", {
        name: newFieldName,
        description: newFieldDescription
      });
      
      // Add the new field name to available options
      setAvailableFieldNames(prev => [...prev, newFieldName]);
      
      // Update the form entry with the new field name
      if (formEntry) {
        const updatedEntry = { ...formEntry, fieldName: newFieldName };
        setFormEntry(updatedEntry);
        setSelectedFieldName(newFieldName);
      }
      
      setShowCreateFieldDialog(false);
      setNewFieldName("");
      setNewFieldDescription("");
      alert("New field created successfully!");
    }
  };

  const handleSaveFieldName = () => {
    if (editedFieldName.trim() && formEntry) {
      const updatedEntry = { ...formEntry, fieldName: editedFieldName };
      setFormEntry(updatedEntry);
      setSelectedFieldName(editedFieldName);
      setIsEditing(false);
      
      // Add to available field names if it's new
      if (!availableFieldNames.includes(editedFieldName)) {
        setAvailableFieldNames(prev => [...prev, editedFieldName]);
      }
      
      // Here you would typically make an API call to update the database
      console.log("Updated field name:", updatedEntry);
      alert("Field name updated successfully!");
    }
  };

  const handleFieldNameChange = (value: string) => {
    setSelectedFieldName(value);
    if (formEntry) {
      const updatedEntry = { ...formEntry, fieldName: value };
      setFormEntry(updatedEntry);
    }
  };

  if (!formEntry) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-[var(--red)] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--text-head)] mb-2">
            Entry Not Found
          </h2>
          <p className="text-[var(--text)] mb-4">
            The form entry you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate(-1)} variant="brand">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-[var(--green)]" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-[var(--red)]" />;
      default:
        return <Clock className="h-5 w-5 text-[var(--yellow)]" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[var(--green2)] text-[var(--green)]";
      case "Rejected":
        return "bg-[var(--red2)] text-[var(--red)]";
      default:
        return "bg-[var(--yellow2)] text-[var(--yellow)]";
    }
  };

  return (
    <div className="flex-col gap-4">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-head)]">
              Form Entry Details
            </h1>
            <p className="text-[var(--text)] text-sm">
              ID: {formEntry.id}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getStatusBadgeVariant(formEntry.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(formEntry.status)}
              {formEntry.status}
            </div>
          </Badge>
        </div>
      </div> */}
      
      <Topbar name="Form Entry Details" status={formEntry.status} id={formEntry.id}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Details Card */}
          <Card className="bg-[var(--background)] border">
            <CardHeader>
              <CardTitle className="text-[var(--text-head)] flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Form Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                    Form Name
                  </label>
                  <p className="text-[var(--text-head)]">{formEntry.formName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                    Submitted By
                  </label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[var(--text)]" />
                    <p className="text-[var(--text-head)]">{formEntry.submittedBy}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                    Submission Date
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--text)]" />
                    <p className="text-[var(--text-head)]">{formEntry.date}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                    Status
                  </label>
                  <Badge className={getStatusBadgeVariant(formEntry.status)}>
                    {formEntry.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Details Card */}
          <Card className="bg-[var(--background)] border">
            <CardHeader>
              <CardTitle className="text-[var(--text-head)] flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Field Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                             <div>
                 <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                   Field Name
                 </label>
                 {availableFieldNames.length > 0 ? (
                   isEditing ? (
                     <div className="flex items-center gap-2">
                       <Input
                         value={editedFieldName}
                         onChange={(e) => setEditedFieldName(e.target.value)}
                         className="flex-1"
                       />
                       <Button size="sm" onClick={handleSaveFieldName}>
                         <Save className="h-4 w-4" />
                       </Button>
                       <Button 
                         size="sm" 
                         variant="border" 
                         onClick={() => {
                           setIsEditing(false);
                           setEditedFieldName(formEntry.fieldName);
                         }}
                       >
                         <X className="h-4 w-4" />
                       </Button>
                     </div>
                   ) : (
                     <div className="flex items-center gap-2">
                       <div className="flex-1">
                         <Select value={selectedFieldName} onValueChange={handleFieldNameChange}>
                           <SelectTrigger className="w-full">
                             <SelectValue placeholder="Select field name" />
                           </SelectTrigger>
                           <SelectContent>
                             {availableFieldNames.map((fieldName) => (
                               <SelectItem key={fieldName} value={fieldName}>
                                 {fieldName}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                       </div>
                       <Button 
                         size="sm" 
                         variant="border" 
                         onClick={() => setIsEditing(true)}
                       >
                         <Edit className="h-4 w-4" />
                       </Button>
                     </div>
                   )
                 ) : (
                   <div className="flex items-center gap-2">
                     <p className="text-[var(--text)] italic">No field names available</p>
                     <Button 
                       size="sm" 
                       variant="brand" 
                       onClick={() => setShowCreateFieldDialog(true)}
                     >
                       <Plus className="h-4 w-4 mr-1" />
                       Create Field
                     </Button>
                   </div>
                 )}
                 
                 {availableFieldNames.length > 0 && !isEditing && (
                   <div className="mt-2">
                     <Button 
                       size="sm" 
                       variant="border" 
                       onClick={() => setShowCreateFieldDialog(true)}
                       className="text-xs"
                     >
                       <Plus className="h-3 w-3 mr-1" />
                       Add New Field Type
                     </Button>
                   </div>
                 )}
               </div>
              
              <div>
                <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                  Submitted Value
                </label>
                <div className="p-3 bg-[var(--faded)] rounded-md">
                  <p className="text-[var(--text-head)] whitespace-pre-wrap">
                    {formEntry.submittedValue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card className="bg-[var(--background)] border">
            <CardHeader>
              <CardTitle className="text-[var(--text-head)] text-lg">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                                         <Button 
                       variant="border" 
                       className="w-full justify-start"
                       onClick={() => setShowDetailedView(!showDetailedView)}
                     >
                       <Eye className="h-4 w-4 mr-2" />
                       {showDetailedView ? "Hide Details" : "View Details"}
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View complete form submission details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

                             <TooltipProvider>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button 
                       variant="brand" 
                       className="w-full justify-start"
                       onClick={handleApprove}
                       disabled={formEntry.status === "Approved"}
                     >
                       <Check className="h-4 w-4 mr-2" />
                       {formEntry.fieldName === "Degree" ? "Add to Degree List" : 
                        formEntry.fieldName === "Skill" ? "Add to Skills List" :
                        formEntry.fieldName === "Certification" ? "Add to Certificates" :
                        formEntry.fieldName === "Language Proficiency" ? "Add to Languages" :
                        "Approve & Add to Master List"}
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Approve this entry and add to master data</p>
                   </TooltipContent>
                 </Tooltip>
               </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="delete" 
                      className="w-full justify-start"
                      onClick={() => setShowRejectDialog(true)}
                      disabled={formEntry.status === "Rejected"}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject & Archive
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reject this entry and archive it</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="border" 
                      className="w-full justify-start"
                      onClick={() => setShowCreateFieldDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Field
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create a new field name if none exists</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[var(--background)] border">
            <CardHeader>
              <CardTitle className="text-[var(--text-head)] text-lg">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Total Submissions</span>
                <Badge variant="border">1,234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Pending Review</span>
                <Badge variant="border" className="bg-[var(--yellow2)] text-[var(--yellow)]">
                  38
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Approved Today</span>
                <Badge variant="border" className="bg-[var(--green2)] text-[var(--green)]">
                  12
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Field Dialog */}
      <Dialog open={showCreateFieldDialog} onOpenChange={setShowCreateFieldDialog}>
        <DialogContent className="bg-[var(--background)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--text-head)]">
              Create New Field Name
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                Field Name
              </label>
              <Input
                placeholder="Enter field name (e.g., Degree, Skill, Certification)"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                Description
              </label>
              <Textarea
                placeholder="Describe what this field is for..."
                value={newFieldDescription}
                onChange={(e) => setNewFieldDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="border" onClick={() => setShowCreateFieldDialog(false)}>
              Cancel
            </Button>
            <Button variant="brand" onClick={handleCreateField}>
              Create Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

                    {/* Detailed View Section */}
       {showDetailedView && (
         <div className="space-y-6">
           <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-[var(--text-head)] flex items-center gap-2">
               <Eye className="h-5 w-5" />
               Detailed View - {formEntry?.id}
             </h2>
             <Button 
               variant="border" 
               size="sm"
               onClick={() => setShowDetailedView(false)}
             >
               <X className="h-4 w-4 mr-2" />
               Close Details
             </Button>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {/* Entry Overview */}
             <Card className="bg-[var(--faded)] border">
               <CardHeader>
                 <CardTitle className="text-[var(--text-head)] text-lg flex items-center gap-2">
                   <FileText className="h-5 w-5" />
                   Entry Overview
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div>
                     <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                       Entry ID
                     </label>
                     <p className="text-[var(--text-head)] font-mono">{formEntry?.id}</p>
                   </div>
                   <div>
                     <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                       Status
                     </label>
                     <Badge className={getStatusBadgeVariant(formEntry?.status || "")}>
                       <div className="flex items-center gap-1">
                         {getStatusIcon(formEntry?.status || "")}
                         {formEntry?.status}
                       </div>
                     </Badge>
                   </div>
                   <div>
                     <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                       Submission Date
                     </label>
                     <div className="flex items-center gap-2">
                       <Calendar className="h-4 w-4 text-[var(--text)]" />
                       <p className="text-[var(--text-head)]">{formEntry?.date}</p>
                     </div>
                   </div>
                   <div>
                     <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                       Submitted By
                     </label>
                     <div className="flex items-center gap-2">
                       <User className="h-4 w-4 text-[var(--text)]" />
                       <p className="text-[var(--text-head)]">{formEntry?.submittedBy}</p>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Form Information */}
             <Card className="bg-[var(--faded)] border">
               <CardHeader>
                 <CardTitle className="text-[var(--text-head)] text-lg flex items-center gap-2">
                   <FileText className="h-5 w-5" />
                   Form Information
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div>
                   <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                     Form Name
                   </label>
                   <p className="text-[var(--text-head)] text-lg">{formEntry?.formName}</p>
                 </div>
                 <div>
                   <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                     Field Name
                   </label>
                   <div className="flex items-center gap-2">
                     <Tag className="h-4 w-4 text-[var(--text)]" />
                     <p className="text-[var(--text-head)] text-lg">{formEntry?.fieldName}</p>
                   </div>
                 </div>
                 <div>
                   <label className="text-sm font-medium text-[var(--text)] mb-1 block">
                     Submitted Value
                   </label>
                   <div className="p-4 bg-[var(--background)] rounded-md border">
                     <p className="text-[var(--text-head)] whitespace-pre-wrap text-lg leading-relaxed">
                       {formEntry?.submittedValue}
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Field Analysis */}
             <Card className="bg-[var(--faded)] border">
               <CardHeader>
                 <CardTitle className="text-[var(--text-head)] text-lg flex items-center gap-2">
                   <Tag className="h-5 w-5" />
                   Field Analysis
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="text-center p-4 bg-[var(--background)] rounded-md">
                     <div className="text-2xl font-bold text-[var(--text-head)] mb-1">
                       {formEntry?.submittedValue?.length || 0}
                     </div>
                     <div className="text-sm text-[var(--text)]">Characters</div>
                   </div>
                   <div className="text-center p-4 bg-[var(--background)] rounded-md">
                     <div className="text-2xl font-bold text-[var(--text-head)] mb-1">
                       {formEntry?.submittedValue?.split(' ').length || 0}
                     </div>
                     <div className="text-sm text-[var(--text)]">Words</div>
                   </div>
                   <div className="text-center p-4 bg-[var(--background)] rounded-md">
                     <div className="text-2xl font-bold text-[var(--text-head)] mb-1">
                       {formEntry?.submittedValue?.split('\n').length || 0}
                     </div>
                     <div className="text-sm text-[var(--text)]">Lines</div>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Action History */}
             <Card className="bg-[var(--faded)] border">
               <CardHeader>
                 <CardTitle className="text-[var(--text-head)] text-lg flex items-center gap-2">
                   <Clock className="h-5 w-5" />
                   Action History
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-md">
                     <div className="w-2 h-2 bg-[var(--green)] rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-[var(--text-head)] font-medium">Entry Created</p>
                       <p className="text-sm text-[var(--text)]">{formEntry?.date} by {formEntry?.submittedBy}</p>
                     </div>
                   </div>
                   {formEntry?.status === "Approved" && (
                     <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-md">
                       <div className="w-2 h-2 bg-[var(--green)] rounded-full"></div>
                       <div className="flex-1">
                         <p className="text-[var(--text-head)] font-medium">Entry Approved</p>
                         <p className="text-sm text-[var(--text)]">Added to master data</p>
                       </div>
                     </div>
                   )}
                   {formEntry?.status === "Rejected" && (
                     <div className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-md">
                       <div className="w-2 h-2 bg-[var(--red)] rounded-full"></div>
                       <div className="flex-1">
                         <p className="text-[var(--text-head)] font-medium">Entry Rejected</p>
                         <p className="text-sm text-[var(--text)]">Archived</p>
                       </div>
                     </div>
                   )}
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Related Entries - Full Width */}
           <Card className="bg-[var(--faded)] border">
             <CardHeader>
               <CardTitle className="text-[var(--text-head)] text-lg flex items-center gap-2">
                 <FileText className="h-5 w-5" />
                 Related Entries
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {CustomInputTable
                   .filter(item => item.fieldName === formEntry?.fieldName && item.id !== formEntry?.id)
                   .slice(0, 6)
                   .map((item) => (
                     <div key={item.id} className="p-4 bg-[var(--background)] rounded-md border">
                       <div className="flex items-center justify-between mb-2">
                         <p className="text-[var(--text-head)] font-medium text-sm">{item.id}</p>
                         <Badge className={getStatusBadgeVariant(item.status)}>
                           {item.status}
                         </Badge>
                       </div>
                       <p className="text-sm text-[var(--text)]">{item.submittedValue.substring(0, 80)}...</p>
                     </div>
                   ))}
                 {CustomInputTable.filter(item => item.fieldName === formEntry?.fieldName && item.id !== formEntry?.id).length === 0 && (
                   <p className="text-[var(--text)] italic text-center py-4 col-span-full">No related entries found</p>
                 )}
               </div>
             </CardContent>
           </Card>
         </div>
       )}

       {/* Reject Dialog */}
       <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
         <DialogContent className="bg-[var(--background)]">
           <DialogHeader>
             <DialogTitle className="text-[var(--text-head)]">
               Reject Entry
             </DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <p className="text-[var(--text)]">
               Please provide a reason for rejecting this entry:
             </p>
             <Textarea
               placeholder="Enter rejection reason..."
               value={rejectReason}
               onChange={(e) => setRejectReason(e.target.value)}
               rows={4}
             />
           </div>
           <DialogFooter>
             <Button variant="border" onClick={() => setShowRejectDialog(false)}>
               Cancel
             </Button>
             <Button 
               variant="delete" 
               onClick={handleReject}
               disabled={!rejectReason.trim()}
             >
               Reject Entry
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
   );
 }
