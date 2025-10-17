import React, { useMemo, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Activity, FileText, MessageSquare, ArrowUpRight, Receipt, Users, Target,
  GraduationCap, Share2, Sparkles, MessageCircle, Phone, Mail, MapPin, Building, Calendar,
  Clock, Play, Square
} from "lucide-react";
import { useParams } from "react-router-dom";
import { LeadExplorersTable } from "@/data/Data";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

/* ---------- UI helpers ---------- */

const statusColor = (s: string) => {
  const key = s.toLowerCase();
  if (["success", "completed", "attended", "accepted", "resolved"].some(k => key.includes(k)))
    return "bg-[var(--green2)] text-[var(--green)]";
  if (["failed", "missed", "rejected"].some(k => key.includes(k)))
    return "bg-[var(--red2)] text-[var(--red)]";
  if (["open", "not started", "pending"].some(k => key.includes(k)))
    return "bg-[var(--yellow2)] text-[var(--yellow)]";
  return "bg-[var(--faded)] text-[var(--text)]";
};

function TLRow({
  date, title, meta, status,
}: { date: string; title: React.ReactNode; meta?: React.ReactNode; status?: string }) {
  return (
    <div className="relative pl-8 py-3">
      <div className="absolute left-[13px] top-0 bottom-0 w-px bg-[var(--faded)]" />
      <div className="absolute left-2 top-[18px] h-3 w-3 rounded-full bg-[var(--brand-color)] ring-4 ring-[var(--brand-color3)]" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-[var(--text)]">
          <span className="font-medium text-[var(--text)]">{date}</span>
          {status && (
            <span className={`ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs ${statusColor(status)}`}>
              {status}
            </span>
          )}
        </div>
        <div className="text-[15px] text-[var(--text-head)] leading-snug">{title}</div>
        {meta && <div className="text-sm text-[var(--text)]">{meta}</div>}
      </div>
    </div>
  );
}

/* ---------- Sections & Types ---------- */

const sections = [
  { id: "recent",        label: "Recent",         icon: Activity },
  { id: "notes",         label: "Agent Notes",    icon: FileText },
  { id: "interactions",  label: "Interactions",   icon: MessageSquare },
  { id: "cases",         label: "Cases",          icon: ArrowUpRight },
  { id: "transactions",  label: "Transactions",   icon: Receipt },
  { id: "sessions",      label: "Sessions",       icon: Users },
  { id: "assessments",   label: "Assessments",    icon: Target },
  { id: "masterclass",   label: "Masterclass",    icon: GraduationCap },
  { id: "referred",      label: "Referred",       icon: Share2 },
  { id: "offers",        label: "Upsell / Offers",icon: Sparkles },
] as const;

type SectionId = typeof sections[number]["id"];

type TimelineItem = {
  section: Exclude<SectionId, "recent"> | "recent"; // "recent" allowed but tab aggregates all anyway
  date: string;            // "10 Jul" or "YYYY-MM-DD"
  title: string;
  meta?: string;
  status?: string;
};

/* Parse "YYYY-MM-DD" or "10 Jul" safely for sorting (fallback: Date.parse) */
function parseFlexibleDate(s: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(s + "T00:00:00").getTime();
  const m = s.match(/^(\d{1,2})\s+([A-Za-z]{3,})$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const monthStr = m[2];
    const year = new Date().getFullYear();
    const month = new Date(`${monthStr} 1, ${year}`).getMonth();
    return new Date(year, month, day).getTime();
  }
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
}

/* ---------- Mock: single API feed (replace with real fetch later) ---------- */
const initialTimeline: TimelineItem[] = [
  // classic "recent" only items
  { section: "recent", date: "2025-07-10", title: "Logged in via App" },
  { section: "recent", date: "9 Jul",      title: "Clicked Masterclass link", meta: "UG Track" },
  { section: "recent", date: "8 Jul",      title: "Downloaded Career Guide PDF" },

  // notes
  { section: "notes", date: "9 Jul", title: "Shared WhatsApp onboarding checklist", meta: "Aisha Khan" },
  { section: "notes", date: "7 Jul", title: "User asked about switching to Science stream", meta: "Deepak Sharma" },

  // interactions
  { section: "interactions", date: "8 Jul", title: "Session reminder sent", meta: "WhatsApp" },
  { section: "interactions", date: "7 Jul", title: "Confirmed UG focus & shared steps", meta: "Phone Call" },

  // cases
  { section: "cases", date: "6 Jul", title: "Coach no-show, rescheduled.", status: "Resolved", meta: "Feedback" },
  { section: "cases", date: "4 Jul", title: "Assessment not loading", status: "Open", meta: "Technical" },

  // transactions
  { section: "transactions", date: "3 Jul",  title: "UG Assessment - ₹299", status: "Failed" },
  { section: "transactions", date: "2025-06-26", title: "Intro Session Booking - ₹499", status: "Success" },

  // sessions
  { section: "sessions", date: "10 Jul", title: "No-show, to be rescheduled", status: "Missed", meta: "Aarti Verma" },
  { section: "sessions", date: "2025-06-25", title: "UG Streams guidance session", status: "Completed", meta: "Mentor Rakesh" },

  // assessments
  { section: "assessments", date: "5 Jul", title: "Career Interest Test", status: "Not Started" },
  { section: "assessments", date: "2025-06-02", title: "Learning Style Quiz - Visual + Kinesthetic", status: "Completed" },

  // masterclass
  { section: "masterclass", date: "9 Jul", title: "Careers After 12th", status: "Attended" },
  { section: "masterclass", date: "2025-06-28", title: "Crack Campus Interviews", status: "Missed" },

  // referred
  { section: "referred", date: "3 Jul", title: "Classmate (email)", meta: "Mansi Patel" },
  { section: "referred", date: "2025-06-25", title: "Shared referral link" },

  // offers
  { section: "offers", date: "8 Jul", title: "Premium UG Pack", status: "Rejected", meta: "Deepak Sharma" },
  { section: "offers", date: "6 Jul", title: "Career Plan Add-on", status: "Accepted", meta: "Aisha Khan" },
];

/* ---------- Component ---------- */

export function UserTimeline() {
  const { id } = useParams();
  const explorerData = LeadExplorersTable.find(user => user.id === id);

  const [active, setActive] = useState<SectionId>("recent");
  
  const navigator = useNavigate();
  // Time tracking state
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // In real app: load from API once by explorer id and setTimeline(...)
  const [timeline] = useState<TimelineItem[]>(initialTimeline);

  // Time tracking functions
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTracking, startTime]);

  const startTracking = () => {
    const now = Date.now();
    setStartTime(now);
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setStartTime(null);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours} hrs ${minutes} min`;
    } else if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  // Counts per section (recent = all)
  const counts = useMemo(() => {
    const map = Object.fromEntries(sections.map(s => [s.id, 0])) as Record<SectionId, number>;
    for (const item of timeline) {
      map[item.section as SectionId] = (map[item.section as SectionId] ?? 0) + 1;
    }
    map.recent = timeline.length;
    return map;
  }, [timeline]);

  // Filtered + sorted list for the active tab
  const itemsForActive = useMemo(() => {
    const list = active === "recent"
      ? timeline
      : timeline.filter(t => t.section === active);
    return [...list].sort((a, b) => parseFlexibleDate(b.date) - parseFlexibleDate(a.date));
  }, [active, timeline]);

  const renderTimeline = (items: TimelineItem[]) => (
    <ScrollArea className="h-full pr-2 overflow-y-auto">
      <div className="relative">
        {items.map((item, i) => (
          <TLRow key={i} date={item.date} title={item.title} meta={item.meta} status={item.status} />
        ))}
      </div>
    </ScrollArea>
  );

  if (!explorerData) {
    return <div className="p-4 text-center text-[var(--text)]">User not found</div>;
  }

  return (
    <section className="w-full">
      <div className="mb-2">
      <h1 className="flex justify-between h-[64px] items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Leads Explorers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage >Explorer Timeline</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Left Column - Time Tracker and Profile Card */}
        <div className="lg:col-span-1 space-y-4">
          {/* Time Tracking Card */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg text-[var(--text-head)] flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                Time Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {/* Clock Icon */}
              <div className="mx-auto w-20 h-20 rounded-full border-4 border-[var(--brand-color)] flex items-center justify-center bg-[var(--faded)]">
                <Clock className="h-8 w-8 text-[var(--brand-color)]" />
              </div>
              
              {/* Elapsed Time Display */}
              <div className="space-y-2">
                <div className="text-2xl font-bold text-[var(--text-head)]">
                  {formatTime(elapsedTime)}
                </div>
                <div className="text-sm text-[var(--text)]">
                  {explorerData?.name} - Timeline Review
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex gap-3 justify-center">
                {isTracking ? (
                  <Button 
                    onClick={stopTracking}
                    variant="destructive" 
                    size="sm" 
                    className="flex items-center gap-2"
                  >
                    <Square className="h-4 w-4" />
                    Stop
                  </Button>
                ) : (
                  <Button 
                    onClick={startTracking}
                    variant="default" 
                    size="sm" 
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4" />
                    Start
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Card */}
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
              <Badge variant="brand" className="mt-2">{explorerData.id}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Created: {explorerData.created_on}</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Status: {explorerData.status}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Source: {explorerData.source}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Segment: {explorerData.segment}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Objective: {explorerData.objective}</span>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="border" size="sm" className="flex items-center gap-2"><Mail className="h-3 w-3" />Email</Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2"><Phone className="h-3 w-3" />Call</Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2"><MessageCircle className="h-3 w-3" />Message</Button>
                  <Button variant="border" size="sm" className="flex items-center gap-2"><FileText className="h-3 w-3" />Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Card */}
        <Card className="border p-0 rounded-md shadow-none w-full bg-[var(--background)] lg:col-span-2">
          <div className="md:hidden p-4 border-b">
            <Select value={active} onValueChange={(v: any) => setActive(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map(({ id, label }) => (
                  <SelectItem key={id} value={id}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-0 h-full">
            {/* Side Nav */}
            <aside className="hidden md:block border-r rounded-l-md h-full">
              <div className="p-4 pb-0 h-full">
                <div className="text-xs uppercase tracking-wide text-[var(--text)] py-4">Timeline</div>
                <nav className="flex flex-col gap-1">
                  {sections.map(({ id, label, icon: Icon }) => {
                    const isActive = active === id;
                    return (
                      <Button
                        key={id}
                        onClick={() => setActive(id)}
                        variant="ghost"
                        className={`justify-between w-full px-3 py-2 rounded-sm hover:bg-[var(--brand-color3)] hover:text-[var(--text-head)] ${isActive ? "bg-[var(--brand-color3)] text-[var(--text-head)] ring-1 ring-[var(--brand-color2)]" : "text-[var(--text)]"}`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${isActive ? "text-[var(--brand-color)]" : "text-[var(--text)]"}`} />
                          <span className="text-sm">{label}</span>
                        </span>
                        <Badge className={`rounded-md ${isActive ? "bg-[var(--brand-color2)] text-[var(--brand-color)]" : "bg-[var(--faded)] text-[var(--text)]"}`}>
                          {counts[id]}
                        </Badge>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="h-full">
              <CardHeader className="px-4 sm:px-6 py-4 ">
                <CardTitle className="text-lg text-[var(--text-head)]">
                  {sections.find(s => s.id === active)?.label}
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-4 sm:p-6 flex-1 overflow-hidden h-[calc(100vh-200px)]">
                {renderTimeline(itemsForActive)}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
