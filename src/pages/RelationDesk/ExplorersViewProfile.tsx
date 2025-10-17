import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  
  Download, 
  Mail, 
  Phone, 
  MessageCircle, 
  Star, 
  Calendar, 
  MapPin, 
  Building, 
  GraduationCap,
  CreditCard,
 
  Activity,
  FileText,
  Send,
  UserCheck,
  Flag,
  BarChart3,
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
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Explorers</BreadcrumbLink>
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


export const ViewProfile = () => {

  const [activeTab, setActiveTab] = useState("overview");

  const explorerData = {
    id: "EXP-UG/DEL/0145",
    name: "Aayush Kapoor",
    gender: "Male",
    dob: "18 March 2004",
    segment: "Undergraduate (UG)",
    institution: "Delhi University",
    careerInterest: "Finance, Investment Banking",
    location: "New Delhi, India",
    joinedOn: "10 Jan 2024",
    lastLogin: "17 Jul 2025",
    publicProfile: "aimshala.com/explorer/aayush",
    photo: "/src/assets/avatar.png"
  };

  

  const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";


const stats = [
  {
    title: "Sessions Attended",
    value: "18",
  },
  {
    title: "Questions Asked",
    value: "12",
  },
  
  {
    title: "Masterclasses Joined",
    value: "5",
  },
  
  {
    title: "Courses Enrolled",
    value: "2",
  },
  
  {
    title: "Feedback Given",
    value: "14",
  },
  {
    title: "Average Rating",
    value: "4.7",
  },
  
];

function formatDayMon(dateStr: string) {
  // Accepts "YYYY-MM-DD" or already-short like "10 Jul"
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso.test(dateStr)) return dateStr;
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}

  const payments = [
    { type: "Sessions", amount: "₹2,800", lastPayment: "15 Jul 25", method: "UPI", codeUsed: "AimSUMMER" },
    { type: "Courses", amount: "₹3,500", lastPayment: "28 Jun 25", method: "Debit Card", codeUsed: "ReferWin25" },
    { type: "Masterclasses", amount: "₹1,200", lastPayment: "10 Jul 25", method: "UPI", codeUsed: "-" }
  ];

  const recentActivities = [
    { date: "17 Jul 25", type: "Session Attended", description: "Resume Tips – Coach Neha" },
    { date: "15 Jul 25", type: "Payment Made", description: "₹1,000 for Masterclass" },
    { date: "10 Jul 25", type: "Feedback Given", description: "Rated Coach Radhika – ⭐ 5.0" },
    { date: "05 Jul 25", type: "Course Enrolled", description: "Excel for Analysts" }
  ];

  const channelPartner = {
    name: "Campus Spark (DU Chapter)",
    code: "CSP-DU-014",
    joinedVia: "Partner Referral Form",
    commissionStatus: "Approved (for 3% Referral)"
  };

  const totalSpent = payments.reduce((sum, payment) => sum + parseInt(payment.amount.replace('₹', '').replace(',', '')), 0);

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
                  src={explorerData.photo}
                  alt={explorerData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--brand-color)] shadow-lg"
                />
              </div>
              <CardTitle className="text-xl text-[var(--text-head)]">
                {explorerData.name}
              </CardTitle>
              <p className="text-sm text-[var(--text)]">{explorerData.segment}</p>
              <div className="flex justify-center">
              <Badge variant="brand" >
                {explorerData.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  Joined: {explorerData.joinedOn}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  Last Login: {explorerData.lastLogin}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {explorerData.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {explorerData.institution}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">
                  {explorerData.careerInterest}
                </span>
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
                    <FileText className="h-3 w-3" />
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
                    <Send className="h-3 w-3" />
                    Send Update
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <Download className="h-3 w-3" />
                    Download Report
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <UserCheck className="h-3 w-3" />
                    Assign Coach
                  </Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3" />
                    View Analytics
                  </Button>
                  <Button variant="delete" size="sm" className="flex items-center gap-2">
                    <Flag className="h-3 w-3" />
                    Flag Account
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
            {["overview", "engagement", "payments", "activities"].map((tab) => (
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
                      <label className="text-xs text-[var(--text)] uppercase">Explorer ID</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.id}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Full Name</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Gender</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.gender}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Date of Birth</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.dob}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Segment</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.segment}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Institution</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.institution}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Career Interest</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.careerInterest}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Location</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.location}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Joined On</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.joinedOn}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Last Login</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{explorerData.lastLogin}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-[var(--text)] uppercase">Public Profile</label>
                      <p className="text-sm font-medium text-[var(--brand-color)]">{explorerData.publicProfile}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ratings */}
              <div className="grid grid-cols-2 gap-4">
              <div className="">
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
                                          Highly active and responsive, ideal for live student engagements. This coach has consistently demonstrated excellent communication skills and maintains high engagement rates with students.
                                        </p>
                                        <p className="text-xs text-[var(--text)] mt-2">Highly active and responsive, ideal for live student engagements. This coach has consistently demonstrated excellent communication skills and maintains high engagement rates with students.</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

              </div>

              {/* Channel Partner */}
              <Card className="bg-[var(--background)] border shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--text-head)]">
                    Channel Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Partner Name</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{channelPartner.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Partner Code</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{channelPartner.code}</p>
                    </div>
                    <div>
                      <label className="text-xs text-[var(--text)] uppercase">Joined via</label>
                      <p className="text-sm font-medium text-[var(--text-head)]">{channelPartner.joinedVia}</p>
                    </div>
                    <div>
                      <label className="flex flex-col gap-4 text-xs text-[var(--text)] uppercase">Commission Status</label>
                      <Badge variant="success" className="text-xs">
                        {channelPartner.commissionStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "engagement" && (
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--text-head)]">
                  Engagement Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-sm shadow-none bg-[var(--background)]"
        >
          <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
            <div className="flex justify-between h-full items-center">
              <div
                className={`${color} text-xs uppercase text-light line-clamp-1`}
              >
                {stat.title}
              </div>
            </div>
            <div className="flex  items-center gap-4">
              <div className={`rounded-full `}>
              </div>
              <div className={`${color2} text-2xl`}>{stat.value}</div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
                
              </CardContent>
            </Card>
          )}

          {activeTab === "payments" && (
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-lg text-[var(--text-head)]">
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[var(--text-head)]">Payment Type</TableHead>
                        <TableHead className="text-[var(--text-head)]">Amount</TableHead>
                        <TableHead className="text-[var(--text-head)]">Last Payment</TableHead>
                        <TableHead className="text-[var(--text-head)]">Method</TableHead>
                        <TableHead className="text-[var(--text-head)]">Code Used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell className="flex items-center gap-3">
                            <CreditCard className="h-4 w-4 text-[var(--text)]" />
                            <span className="text-sm font-medium text-[var(--text-head)]">{payment.type}</span>
                          </TableCell>
                          <TableCell className="text-lg font-bold text-[var(--text-head)]">{payment.amount}</TableCell>
                          <TableCell className="text-sm text-[var(--text)]">{payment.lastPayment}</TableCell>
                          <TableCell className="text-sm text-[var(--text)]">{payment.method}</TableCell>
                          <TableCell className="text-sm text-[var(--text)]">
                            {payment.codeUsed === "-" ? (
                              <span className="text-[var(--text)]">-</span>
                            ) : (
                              <Badge variant="secondary" className="text-xs">{payment.codeUsed}</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[var(--text-head)]">Total Paid</span>
                    <span className="text-2xl font-bold text-[var(--brand-color)]">₹{totalSpent.toLocaleString()}</span>
                  </div>
                  
                
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "activities" && (
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[var(--text-head)]">
                  Recent Activities
                </CardTitle>
              </CardHeader>
        
              <CardContent>
                {(!recentActivities || recentActivities.length === 0) ? (
                  <div className="text-sm text-[var(--text)] bg-[var(--faded)] rounded-lg p-4">
                    No recent activity yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[var(--faded)] rounded-lg">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--brand-color)] mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-[var(--text-head)]">
                              {formatDayMon(activity.date)}
                            </span>
                            {activity.type && (
                              <Badge variant="secondary" className="text-xs">
                                {activity.type}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-head)] leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>


    </div>
  );
};


