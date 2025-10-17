import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import User from "@/assets/Assignuser/assignuser1.jpeg"
import { 

  Phone, 
  MessageCircle, 
  Star, 
  Calendar, 
  MapPin, 
  Building, 
  GraduationCap,

  Activity,
  FileText,

  BarChart3,
  Copy,
  ExternalLink,
  Clock,
  Users,
  BookOpen,

  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  TrendingUp,
  DollarSign,
  Banknote,
  FileText as FileTextIcon,
  Play,
  Edit,

  Bell,
  Settings
} from "lucide-react";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

function Topbar() {
  
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center h-16 mb-4 px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Coaches</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >View Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
    </div>
)}




export const CoachesProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeRatingTab, setActiveRatingTab] = useState("admin");

  const coachData = {
    id: "CNS/DEL/0387",
    name: "Radhika Mehta",
    gender: "Female",
    photo: "/src/assets/avatar.png",
    coachType: "Consultant (Premium)",
    organisation: "EduBridge Pvt. Ltd.",
    segmentsCovered: "UG, Career Changers, Working Professionals",
    specialisation: "Career Transitions, Resume Building, LinkedIn Strategy",
    registrationDate: "14 Feb 2024",
    lastLogin: "18 July 2025",
    publicProfile: "aimshala.com/coach/radhika-mehta",
    availability: {
      weekdays: "Mon–Fri: 10 AM – 6 PM",
      saturday: "Sat: 11 AM – 3 PM"
    }
  };

  

  const adminNotes = {
    comments: "Highly active and responsive, ideal for live student engagements.",
    consultantReviews: [
      { rating: 5.0, feedback: "Impactful for class 12 students." },
      { rating: 3.5, feedback: "Follow-up needs improvement." }
    ],
    flags: {
      current: "None currently",
      history: "Flagged once in Feb 2024 (resolved)"
    }
  };

  const offerings = {
    sessions: [
      { type: "Ask a Question", count: 28, avgRating: 4.6, feedback: "Quick, helpful" },
      { type: "1:1 Call", count: 45, avgRating: 4.8, feedback: "Very insightful" },
      { type: "Video Sessions", count: 12, avgRating: 4.9, feedback: "Clear explanations" },
      { type: "In-Person", count: 3, avgRating: 4.7, feedback: "Great interaction" }
    ],
    resources: [
      "Career Tracker PDF",
      "Interview Strategy Deck", 
      "Personal Pitch Templates"
    ],
    masterclasses: [
      { name: "LinkedIn for Students", attendees: 150 },
      { name: "Career Reset for Professionals", attendees: 94 }
    ],
    courses: [
      { name: "Resume Builder", type: "Self-paced" },
      { name: "Interview Skills", type: "Live Batch – Aug 2025" }
    ]
  };

  const activityLog = [
    { date: "18 Jul 25", type: "Profile Update", description: "Added new masterclass & time slot" },
    { date: "10 Jul 25", type: "Subscription Change", description: "Upgraded to Premium (₹1,999)" },
    { date: "06 Jul 25", type: "Session Delivered", description: "UG Career Call – ID: S4587" },
    { date: "03 Jul 25", type: "Access Code Used", description: "AimCare-2025 (UG Explorer group)" },
    { date: "28 Jun 25", type: "Resource Uploaded", description: "Personal Pitch Template" },
    { date: "20 Jun 25", type: "Payout Processed", description: "₹3,500 for June sessions" }
  ];

  const commission = {
    structure: [
      { type: "Sessions", rate: "20%", status: "Active" },
      { type: "Courses", rate: "15%", status: "Custom Rate" },
      { type: "Masterclass", rate: "25%", status: "Platform Standard" }
    ],
    bankDetails: {
      bankName: "HDFC Bank",
      accountHolder: "Radhika Mehta",
      accountNumber: "●●●●5678",
      ifsc: "HDFC0001234",
      upiId: "radhika@upi"
    },
    financialSummary: {
      totalEarnings: "₹1,42,850",
      availableForWithdrawal: "₹18,200",
      lastPayout: "₹3,500 (20 Jun 25)"
    }
  };

  const supportCases = [
    { id: "TK10234", issue: "Session Link Missing", status: "Resolved", opened: "12 Jul 25", lastUpdate: "13 Jul 25" },
    { id: "TK10445", issue: "Delay in Payout", status: "In Review", opened: "16 Jul 25", lastUpdate: "18 Jul 25" },
    { id: "TK10510", issue: "Request for Public Badge", status: "Open", opened: "19 Jul 25", lastUpdate: "Pending" }
  ];

  return (
    <div className="">
      {/* Header */}
      <Topbar/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <img
                  src={coachData.photo}
                  alt={coachData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--brand-color)] shadow-lg"
                />
              </div>
              <CardTitle className="text-xl text-[var(--text-head)]">
                {coachData.name}
              </CardTitle>
              <p className="text-sm text-[var(--text)]">{coachData.coachType}</p>
              <div className="flex justify-center">
                <Badge variant="brand">
                  {coachData.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {coachData.organisation}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {coachData.segmentsCovered}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {coachData.specialisation}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  Joined: {coachData.registrationDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  Last Login: {coachData.lastLogin}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-4 w-4 text-[var(--text)]" />
                <div className="text-sm text-[var(--text)]">
                  <div>{coachData.availability.weekdays}</div>
                  <div>{coachData.availability.saturday}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3" />
                    Message
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Copy className="h-3 w-3" />
                    Copy Link
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    Profile
                  </Button>
                </div>
              </div>
           
              <Separator />

              {/* Admin Tools */}
              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Admin Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    Feature Coach
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Settings className="h-3 w-3" />
                    Reset Login
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <XCircle className="h-3 w-3" />
                    Deactivate
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Bell className="h-3 w-3" />
                    Send Notification
                  </Button>
                  <Button variant="delete" size="sm" className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3" />
                 View Report
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Details
              </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Right Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-[var(--faded)] p-1 rounded-lg">
            {["overview", "offerings", "activities", "finance", "support"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-[var(--background)] text-[var(--text-head)] shadow-sm"
                    : "text-[var(--text)] hover:text-[var(--text-head)]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)]">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Coach ID</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.id}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Full Name</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Gender</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.gender}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Coach Type</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.coachType}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Organisation</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.organisation}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Segments Covered</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.segmentsCovered}</p>
                    </div>
                    <div >
                      <label className="text-xs text-[var(--text)] uppercase">Areas of Specialisation</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.specialisation}</p>
                    </div>
                    <div >
                      <label className="text-xs text-[var(--text)] uppercase">Last Login</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.lastLogin}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Registration Date</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{coachData.registrationDate}</p>
                    </div>
                    
                    <div >
                      <label className="text-xs text-[var(--text)] uppercase">Public Profile URL</label>
                      <p className="text-sm font-medium text-[var(--brand-color)]">{coachData.publicProfile}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Ratings */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)]">
                    User Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Side - Rating Summary */}
                    <div className="lg:col-span-1">
                      <Card className="bg-[var(--background)] border shadow-sm p-4 h-[250px]">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-[var(--text-head)] text-center text-sm">Rating Summary</h4>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-[var(--text-head)] mb-2">
                              4.0
                            </div>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${
                                    star <= 4 
                                      ? 'text-yellow-500 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <p className="text-xs text-[var(--text-head)] font-medium">Rating</p>
                            <p className="text-xs text-[var(--text)]">5 Total Reviews</p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-2 w-2 ${
                                      star <= 4 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-[var(--text)]'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <div className="flex-1 h-1.5 bg-[var(--faded)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--brand-color)] rounded-full" style={{width: "38%"}}></div>
                              </div>
                              <div className="text-xs text-[var(--text)] font-medium">38%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-2 w-2 ${
                                      star <= 3 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-[var(--text)]'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <div className="flex-1 h-1.5 bg-[var(--faded)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--brand-color)] rounded-full" style={{width: "24%"}}></div>
                              </div>
                              <div className="text-xs text-[var(--text)] font-medium">24%</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-2 w-2 ${
                                      star <= 2 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-[var(--text)]'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <div className="flex-1 h-1.5 bg-[var(--faded)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--brand-color)] rounded-full" style={{width: "45%"}}></div>
                              </div>
                              <div className="text-xs text-[var(--text)] font-medium">45%</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Right Side - Admin Comments & Consultant Reviews */}
                    <div className="lg:col-span-2">
                      <Card className="bg-[var(--background)] border shadow-sm p-4 h-full">
                        <div className="space-y-4 h-full">
                          <h4 className="font-semibold text-[var(--text-head)]">Admin & Consultant Feedback</h4>
                          
                          {/* Tabs */}
                          <div className="flex space-x-1 bg-[var(--faded)] p-1 rounded-full">
                            {["admin", "consultant", "flags"].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveRatingTab(tab)}
                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                  activeRatingTab === tab
                                    ? "bg-[var(--background)] text-[var(--brand-color)] shadow-sm border border-[var(--brand-color)]"
                                    : "text-[var(--text)] hover:text-[var(--text-head)]"
                                }`}
                              >
                                {tab === "admin" && "Admin Comments"}
                                {tab === "consultant" && "Consultant Reviews"}
                                {tab === "flags" && "Flags/Warnings"}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content */}
                          <div className="flex-1">
                            {activeRatingTab === "admin" && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-[var(--text)] uppercase">Admin Comments</label>
                                </div>
                                <div className="space-y-3">
                                  <div className="bg-[var(--faded)] rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                      <img
                                        src="/src/assets/avatar.png"
                                        alt="Admin"
                                        className="w-10 h-10 rounded-full object-cover"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-[var(--text-head)]">Admin User</span>
                                          <Badge variant="secondary" className="text-xs">Admin</Badge>
                                        </div>
                                        <p className="text-sm text-[var(--text-head)]">
                                          {adminNotes.comments}
                                        </p>
                                        <p className="text-xs text-[var(--text)] mt-2">Highly active and responsive, ideal for live student engagements. This coach has consistently demonstrated excellent communication skills and maintains high engagement rates with students.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activeRatingTab === "consultant" && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-[var(--text)] uppercase">Consultant Reviews</label>
                                </div>
                                <div className="space-y-3">
                                  {adminNotes.consultantReviews.map((review, index) => (
                                    <div key={index} className="bg-[var(--faded)] rounded-lg p-4">
                                      <div className="flex items-start gap-3">
                                        <img
                                          src={User}
                                          alt="Consultant"
                                          className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-medium text-[var(--text-head)]">Consultant {index + 1}</span>
                                            <div className="flex items-center gap-1">
                                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                              <span className="text-sm font-medium text-[var(--text-head)]">{review.rating.toFixed(1)}</span>
                                            </div>
                                          </div>
                                          <p className="text-sm text-[var(--text-head)] italic">"{review.feedback}"</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {activeRatingTab === "flags" && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-[var(--text)] uppercase">Flags/Warnings</label>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <span className="text-lg">🚫</span>
                                    <div>
                                      <p className="text-sm font-medium text-green-800">Current Status</p>
                                      <p className="text-sm text-green-700">{adminNotes.flags.current}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <span className="text-lg">🟡</span>
                                    <div>
                                      <p className="text-sm font-medium text-yellow-800">History</p>
                                      <p className="text-sm text-yellow-700">{adminNotes.flags.history}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          )}

          {activeTab === "offerings" && (
             <div className="space-y-6">
              {/* Sessions */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {offerings.sessions.map((session, index) => (
                      <div key={index} className="bg-[var(--background)] rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-medium text-[var(--text-head)]">{session.type}</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                             
                              <span className="text-sm text-[var(--text-head)]">{session.avgRating}</span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${
                                      star <= Math.floor(session.avgRating) 
                                        ? 'text-yellow-400 fill-current' 
                                        : star === Math.ceil(session.avgRating) && session.avgRating % 1 > 0
                                        ? 'text-yellow-400 fill-current opacity-60'
                                        : 'text-[var(--text)]'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[var(--brand-color)]">{session.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              
              

              {/* Resources */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {offerings.resources.map((resource, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-[var(--faded)] rounded">
                        <FileText className="h-4 w-4 text-[var(--text)]" />
                        <span className="text-sm text-[var(--text-head)]">{resource}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Masterclasses */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Masterclasses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {offerings.masterclasses.map((masterclass, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[var(--faded)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Play className="h-4 w-4 text-[var(--brand-color)]" />
                          <span className="text-sm font-medium text-[var(--text-head)]">{masterclass.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {masterclass.attendees} attendees
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Courses */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {offerings.courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[var(--faded)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-[var(--brand-color)]" />
                          <span className="text-sm font-medium text-[var(--text-head)]">{course.name}</span>
                        </div>
                        <Badge variant="outline">
                          {course.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "activities" && (
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--text-head)]">
                  Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activityLog.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[var(--faded)] rounded-lg">
                      <div className="w-2 h-2 bg-[var(--brand-color)] rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text-head)]">{activity.description}</p>
                        <p className="text-xs text-[var(--text)]">{activity.type}</p>
                      </div>
                      <span className="text-xs text-[var(--text)]">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "finance" && (
            <div className="space-y-6">
              {/* Commission Structure */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Commission Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {commission.structure.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[var(--faded)] rounded-lg">
                        <span className="text-sm font-medium text-[var(--text-head)]">{item.type}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[var(--brand-color)]">{item.rate}</div>
                          <div className="text-xs text-[var(--text)]">{item.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bank Details */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <Banknote className="h-5 w-5" />
                    Bank Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Bank Name</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{commission.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Account Holder</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{commission.bankDetails.accountHolder}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Account Number</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{commission.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">IFSC</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{commission.bankDetails.ifsc}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-[var(--text)] uppercase">UPI ID</label>
                      <p className="text-sm font-medium text-[var(--brand-color)]">{commission.bankDetails.upiId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)] flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--brand-color)]">{commission.financialSummary.totalEarnings}</div>
                        <p className="text-sm text-[var(--text)]">Total Earnings</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--text-head)]">{commission.financialSummary.availableForWithdrawal}</div>
                        <p className="text-sm text-[var(--text)]">Available</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-[var(--text)]">{commission.financialSummary.lastPayout}</div>
                        <p className="text-sm text-[var(--text)]">Last Payout</p>
                      </div>
                    </div>
                    {/* <Button className="w-" variant="brand">
                      Request Withdrawal
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "support" && (
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--text-head)]">
                  Support Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportCases.map((case_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[var(--faded)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[var(--brand-color)] rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-head)]">#{case_.id}</p>
                          <p className="text-xs text-[var(--text)]">{case_.issue}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          {case_.status === "Resolved" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {case_.status === "In Review" && <Clock className="h-4 w-4 text-yellow-500" />}
                          {case_.status === "Open" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                          <Badge 
                            variant={case_.status === "Resolved" ? "success" : case_.status === "In Review" ? "secondary" : "outline"}
                          >
                            {case_.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-[var(--text)]">
                          <div>Opened: {case_.opened}</div>
                          <div>Updated: {case_.lastUpdate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Admin Tools */}
      {/* <div className="mt-8">
        <Card className="bg-[var(--background)] border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg text-[var(--text-head)]">
              Admin Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Feature Coach
              </Button>
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Reset Login
              </Button>
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Deactivate
              </Button>
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Send Notification
              </Button>
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                View Report
              </Button>
              <Button variant="border" size="sm" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};




