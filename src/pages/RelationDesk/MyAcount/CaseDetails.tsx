

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
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


function Topbar({ name,status,id }: { name: string,status: string,id: string; }) {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 mb-2 bg-[var(--background)] h-[64px] rounded-sm gap-4 border flex-wrap shadow-none">
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
      <div>Lead ID: <span className="text-[var(--text)] text-sm">{id}</span></div>
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

export const CaseDetails = () => {
  // Lead data
  const lead = {
    name: "Ritika Sharma",
    type: "Explorer",
    leadType: "Guide / Upsell",
    concern: "Onboarding Follow-up",
    status: "In Progress",
    source: "Website",
    assignedSince: "8 July 2025",
    accountManager: "Aisha Khan (Auto)",
    email: "ritika.sharma@example.com",
    phone: "+91 98XX-XX-1234",
    location: "Delhi, India",
    timezone: "IST (UTC+5:30)",
    tags: ["UG", "Career Switch"],
    activities: {
      lastSession: "10 July (Missed)",
      lastLogin: "11 July – Web",
      lastMessage: "WhatsApp Follow-up Sent",
    },
    transactions: [
      { title: "Intro Session (₹499)", status: "Paid" },
      { title: "Assessment", status: "Not Started" },
    ],
    notes: [
      "Session not confirmed after invite.",
      "Asked about stream change.",
    ],
  };

  // Follow-up state (Right panel)
  const [followUpType, setFollowUpType] = useState<string>("Call");
  const [nextFollowUpDate, setNextFollowUpDate] = useState<string>("2025-07-12");
  const [stepInfo, setStepInfo] = useState<string>("2/3 – Engagement Completed");
  const [concernText, setConcernText] = useState<string>("Send onboarding resources");
  const [logNote, setLogNote] = useState<string>("");

  const history = [
    { date: "10 July", action: "Missed Session", by: "User", note: "Session not attended" },
    { date: "9 July", action: "WhatsApp Sent", by: "Aisha Khan", note: "Shared onboarding pack" },
    { date: "8 July", action: "Call Logged", by: "Aisha Khan", note: "Confirmed interest in career map" },
  ];

  return (
    <div className="">
      {/* <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-head)]">Lead Details</h1>
          <p className="text-sm text-[var(--text)]">Accessed from Followups / Pool / Accounts</p>
        </div>
        <Badge variant="brand" className="text-xs">{lead.status}</Badge>
      </div> */}
      
      <Topbar name="Lead NAme" status={lead.status} id="DUMMY ID"/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead Summary & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Basic Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Name</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.name}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Type</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.type}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Lead Type</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.leadType}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Concern</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.concern}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Source</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.source}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Assigned Since</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.assignedSince}</p>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Account Manager</label>
                  <p className="text-sm font-medium text-[var(--text-head)]">{lead.accountManager}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Snapshot */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Profile Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--text)]" />
                  <span className="text-sm text-[var(--text-head)]">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[var(--text)]" />
                  <span className="text-sm text-[var(--text-head)]">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--text)]" />
                  <span className="text-sm text-[var(--text-head)]">{lead.location} • {lead.timezone}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Activities */}
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-[var(--text-head)]">Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Last Session</span><span className="text-[var(--text-head)]">{lead.activities.lastSession}</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Last Login</span><span className="text-[var(--text-head)]">{lead.activities.lastLogin}</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Last Message</span><span className="text-[var(--text-head)]">{lead.activities.lastMessage}</span></div>
              </CardContent>
            </Card>
            {/* Transactions */}
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-[var(--text-head)]">Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {lead.transactions.map((t, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[var(--text-head)]">{t.title}</span>
                    <Badge variant={t.status === "Paid" ? "success" : "outline"}>{t.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            {/* Cases / Notes */}
            <Card className="bg-[var(--background)] border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-[var(--text-head)]">Cases / Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {lead.notes.map((n, i) => (
                  <div key={i} className="p-2 rounded bg-[var(--faded)] text-[var(--text-head)]">“{n}”</div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right: Action Tools & Timeline */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Follow-Up */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Current Follow-Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Type</label>
                 
                  <div className="flex gap-2">
                    {(["Call", "Message", "Email"] as const).map((t) => (
                      <Button
                        key={t}
                        size="sm"
                        variant={followUpType === t ? "brand" : "border"}
                        onClick={() => setFollowUpType(t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Next Follow-Up Date</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-[var(--text)]" />
                    <Input type="date" value={nextFollowUpDate} onChange={(e) => setNextFollowUpDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Step</label>
                  <Input value={stepInfo} onChange={(e) => setStepInfo(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Concern</label>
                  <Input value={concernText} onChange={(e) => setConcernText(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-[var(--text)] uppercase">Log Update</label>
                  <Textarea rows={3} placeholder="Write a quick update..." value={logNote} onChange={(e) => setLogNote(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="border" className="flex items-center gap-2"><Phone className="h-4 w-4" />Call Now</Button>
                <Button variant="border" className="flex items-center gap-2"><MessageCircle className="h-4 w-4" />Send WhatsApp</Button>
                <Button variant="border" className="flex items-center gap-2"><Mail className="h-4 w-4" />Send Email</Button>
                <Button variant="brand" className="flex items-center gap-2"><CheckCircle className="h-4 w-4" />Mark Step Done</Button>
                <Button variant="border" className="flex items-center gap-2"><Clock className="h-4 w-4" />Reschedule</Button>
                <Button variant="border" className="flex items-center gap-2"><ArrowRight className="h-4 w-4" />Transfer Lead</Button>
              </div>
            </CardContent>
          </Card>

          {/* Follow-Up History */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Follow-Up History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.map((h, i) => (
                  <div key={i} className="flex items-start justify-between p-3 bg-[var(--faded)] rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-head)]">{h.date} • {h.action}</p>
                      <p className="text-xs text-[var(--text)]">{h.note}</p>
                    </div>
                    <span className="text-xs text-[var(--text)]">{h.by}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Closure Options */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Closure Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="brand" className="justify-start"><CheckCircle className="h-4 w-4 mr-2" />Close as Converted (3/3 steps)</Button>
                <Button variant="destructive" className="justify-start"><XCircle className="h-4 w-4 mr-2" />Disqualify Lead (with reason)</Button>
                <Button variant="border" className="justify-start"><ArrowRight className="h-4 w-4 mr-2" />Transfer to another agent</Button>
              </div>
            </CardContent>
          </Card>

          {/* Smart Suggestions */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-[var(--text-head)]">Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 rounded bg-[var(--faded)] text-[var(--text-head)]">“Re-engage with a new masterclass invite.”</div>
              <div className="p-2 rounded bg-[var(--faded)] text-[var(--text-head)]">“Offer free career assessment to re-initiate.”</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};






