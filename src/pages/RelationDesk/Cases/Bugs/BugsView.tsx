
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import User1 from "@/assets/Assignuser/assignuser1.jpeg";
import User2 from "@/assets/Assignuser/assignuser2.jpg";
import Avatar1 from "@/assets/asset.jpg"
import { Textarea } from "@/components/ui/textarea";
import { 
  User,
  FileImage,
  Settings,
  Mail,
  Phone,
  MessageCircle,
  Download,
  Send,
  Flag,
  BarChart3,
  // AlertTriangle,
  // CheckCircle,
  // XCircle,
  FileText,
  Reply,
  Image as ImageIcon,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { BugsTableData } from "@/data/Data";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";



function Topbar({ name,status,id }: { name: string,status: string,id: string; }) {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] h-[64px] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Bugs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4">
      <div>Bug ID: <span className="text-[var(--text)] text-sm">{id}</span></div>
      <Badge
              className={
                status === "Low"
                  ? "bg-[var(--green2)] text-[var(--green)]"
                  : status === "Moderate"
                  ? "bg-[var(--yellow2)] text-[var(--yellow)]"
                  : "bg-[var(--red2)] text-[var(--red)]"
              }
            >
              {status}
            </Badge>
      </div>
    </div>
  );
}



interface BugsViewProps {
  bugId?: number | null;
}

export const BugsView = ({ bugId }: BugsViewProps) => {
  const [searchParams] = useSearchParams();
  
  // Get bugId from URL params if not passed as prop
  const currentBugId = bugId || searchParams.get('bugId');

  // Find the bug data from BugsTableData
  const bugData = BugsTableData.find(bug => bug.id === Number(currentBugId)) || BugsTableData[0];

  const bugViewData = {
    id: currentBugId ? `BUG-${currentBugId.toString().padStart(3, '0')}` : "BUG-001",
    title: `Bug Report - ${bugData.module} Module`,
    userName: bugData.user,
    userId: `USR-${bugData.id.toString().padStart(5, '0')}`,
    userRole: "Platform User",
    createDate: bugData.submittedOn,
    dueDate: "29 Dec, 2024",
    status: bugData.status,
    priority: bugData.priority,
    lastActivity: "14 min ago",
    assignedTo: bugData.assignedTo || [],
    labels: [bugData.module, bugData.priority, "Bug Report"],
    attachments: ["Bug-report.pdf", "screenshot.png", "error-log.txt"],
    // Form data from the submitted bug report
    formData: {
      category: "Bug Report",
      description: `Bug report submitted for the ${bugData.module} module: ${bugData.description}. This bug affects the user experience and needs to be addressed by the development team. The issue has been reported with ${bugData.priority} priority and requires immediate attention.\n\nThe bug was discovered during normal usage of the platform and has been documented with supporting evidence. The assigned team members should review the issue and implement a fix according to the priority level.`,
      urgency: bugData.priority,
      stepsToReproduce: `1. Navigate to the ${bugData.module} section\n2. Perform the action that triggers the bug\n3. Observe the unexpected behavior: "${bugData.description}"\n4. Document the steps taken\n5. Report the issue with supporting evidence`,
      contactMethods: ["Email", "Message"],
      otherCategory: "",
      submittedBy: bugData.user,
      submittedEmail: `${bugData.user.toLowerCase().replace(' ', '.')}@example.com`,
      submittedPhone: "+1 (555) 123-4567"
    },
    // Comments data
    comments: [
      {
        id: 1,
        author: "Alexis Clarke",
        avatar: User1,
        timestamp: "26 min ago",
        content: "I've reproduced the bug and can confirm the issue exists. The development team has been notified and will prioritize this based on the severity level.",
        attachments: [
          { type: "image", url: Avatar1, name: "bug-screenshot-1.png" }, 
          { type: "image", url: Avatar1, name: "bug-screenshot-2.png" }
        ]
      },
      {
        id: 2,
        author: "Donald Palmer",
        avatar: User2,
        timestamp: "8 sec ago",
        content: "The bug has been fixed and is ready for testing. Please verify the fix in the staging environment.",
        attachments: []
      }
    ]
  };

  



  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      {/* <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-head)]">
              #{bugViewData.id} - {bugViewData.title}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-[var(--text)]">{bugViewData.userName}</p>
              <p className="text-sm text-[var(--text)]">Create Date: {bugViewData.createDate}</p>
              <p className="text-sm text-[var(--text)]">Due Date: {bugViewData.dueDate}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="standard" className="bg-blue-100 text-blue-800">
            {bugViewData.status}
          </Badge>
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            {bugViewData.priority}
          </Badge>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="border" size="sm" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button variant="border" size="sm" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="border" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div> */}
      
      <Topbar name={bugViewData.title} status={bugViewData.priority} id={bugViewData.id}/>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Column - Ticket Details Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[var(--text-head)]">
                Ticket Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Ticket ID</label>
                  <p className="text-sm font-semibold text-[var(--text-head)]">#{bugViewData.id}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">User Name</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.userName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">User ID</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.userId}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">User Role</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.userRole}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Assigned Team</label>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {bugViewData.assignedTo.map((assignee, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                          title={assignee.name}
                        >
                          <img
                            src={assignee.photo}
                            alt={assignee.name}
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                      ))}
                      <div className="h-8 w-8 rounded-full border-2 border-white shadow-sm bg-[var(--brand-color2)] flex items-center justify-center">
                        <User className="h-4 w-4 text-[var(--brand-color)]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Status</label>
                  <div className="mt-2">
                    <Badge variant="standard" className="bg-blue-100 text-blue-800 font-medium">
                      {bugViewData.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Priority</label>
                  <div className="mt-2">
                    <Badge variant="destructive" className="bg-red-100 text-red-800 font-medium">
                      {bugViewData.priority}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Created</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.createDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Due Date</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.dueDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Last Activity</label>
                  <div className="flex items-center gap-2">
                    <Settings className="h-3 w-3 text-[var(--brand-color)]" />
                    <span className="text-sm text-[var(--text)]">{bugViewData.lastActivity}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text)] uppercase tracking-wide">Labels</label>
                  <div className="flex flex-wrap gap-1">
                    {bugViewData.labels.map((label, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

           

            
              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3" />
                    Message
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Admin Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Send className="h-3 w-3" />
                    Send Update
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Download className="h-3 w-3" />
                    Download Report
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Assign User
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3" />
                    View Analytics
                  </Button>
                  <Button variant="delete" size="sm" className="flex items-center gap-2">
                    <Flag className="h-3 w-3" />
                    Flag Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Bug Report Details */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">
                Bug Report Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 grid grid-cols-2">
              {/* Bug Category */}
              <div className="space-y-2 ">
                <label className="text-sm font-medium text-[var(--text-head)]">Bug Category</label>
                <div className="flex items-center gap-2">
                  {/* <AlertTriangle className="h-4 w-4 text-[var(--brand-color)]" /> */}
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {bugViewData.formData.category}
                  </Badge>
                </div>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-head)]">Urgency Level</label>
                <div className="flex items-center gap-2">
                  {/* {bugViewData.formData.urgency === "High" && <XCircle className="h-4 w-4 text-red-500" />}
                  {bugViewData.formData.urgency === "Medium" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {bugViewData.formData.urgency === "Low" && <CheckCircle className="h-4 w-4 text-green-500" />} */}
                  <Badge 
                    variant={bugViewData.formData.urgency === "High" ? "destructive" : 
                           bugViewData.formData.urgency === "Medium" ? "standard" : "secondary"}
                    className={
                      bugViewData.formData.urgency === "High" ? "bg-red-100 text-red-800" :
                      bugViewData.formData.urgency === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }
                  >
                    {bugViewData.formData.urgency}
                  </Badge>
                </div>
              </div>

              {/* Submitted By */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-head)]">Submitted By</label>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[var(--brand-color2)] flex items-center justify-center">
                    <User className="h-4 w-4 text-[var(--brand-color)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-head)]">{bugViewData.formData.submittedBy}</p>
                    <p className="text-xs text-[var(--text)]">{bugViewData.formData.submittedEmail}</p>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-head)]">Preferred Contact Methods</label>
                <div className="flex items-center gap-2">
                  {bugViewData.formData.contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-1">
                      {method === "Email" && <Mail className="h-3 w-3 text-[var(--text)]" />}
                      {method === "Phone" && <Phone className="h-3 w-3 text-[var(--text)]" />}
                      {method === "Message" && <MessageCircle className="h-3 w-3 text-[var(--text)]" />}
                      <span className="text-xs text-[var(--text)]">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            </CardContent>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">
                Bug Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--text-head)] leading-relaxed whitespace-pre-line">
                {bugViewData.formData.description}
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">
                Attachments & Supporting Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bugViewData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[var(--faded)] rounded-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[var(--brand-color2)] flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[var(--brand-color)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-head)]">{file}</p>
                        <p className="text-xs text-[var(--text)]">
                          {file.includes('.pdf') ? 'PDF Document' : 
                           file.includes('.png') || file.includes('.jpg') ? 'Image File' : 
                           'Text File'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="border" size="sm" className="flex items-center gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      <Button variant="border" size="sm" className="flex items-center gap-2">
                        <FileImage className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bug Description Section */}
        

          {/* Steps to Reproduce Section */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">
                Steps to Reproduce the Issue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[var(--faded)] rounded-sm p-4">
                <pre className="text-sm text-[var(--text-head)] whitespace-pre-line font-sans">
                  {bugViewData.formData.stepsToReproduce}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Comments */}
              <div className="space-y-4">
                {bugViewData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Comment Content */}
                    <div className="flex-1 space-y-2">
                      {/* Author and Timestamp */}
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[var(--text-head)] text-sm">
                          {comment.author}
                        </h4>
                        <span className="text-xs text-[var(--text)]">
                          {comment.timestamp}
                        </span>
                      </div>
                      
                      {/* Comment Text */}
                      <p className="text-sm text-[var(--text-head)] leading-relaxed">
                        {comment.content}
                      </p>
                      
                      {/* Attachments */}
                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {comment.attachments.map((attachment, index) => (
                            <div key={index} className="h-16 w-24 rounded-md overflow-hidden border border-gray-200">
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Reply Button */}
                      <div className="pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-[var(--text)] hover:text-[var(--text-head)] p-0 h-auto"
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Leave a Comment Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-head)]">
                  Leave a Comment
                </h3>
                
                <div className="space-y-3">
                  <Textarea
                    placeholder="Enter comments"
                    className="min-h-[100px] resize-none border-gray-200 focus:border-[var(--brand-color)] focus:ring-[var(--brand-color)]"
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[var(--text)] hover:text-[var(--text-head)]"
                      >
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Attach Image
                      </Button>
                    </div>
                    
                    <Button 
                      className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/90 text-white px-6"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

         
        </div>
      </div>
    </div>
  );
};


