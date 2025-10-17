import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeadExplorersTable } from "@/data/Data";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Play, Square, Activity, Calendar, MapPin, Building, GraduationCap,
  Paperclip, MessageCircle, Mail, Phone, Reply,
  UserPlus2, X, Eye, Download, File as FileIcon, Image as ImageIcon
} from "lucide-react";

/* ---------- helpers ---------- */
const fmtHrsMins = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h} hrs ${m.toString().padStart(2, "0")} min`;
};

// minimal SVG clock ring + seconds hand
function TimeClock({ seconds }: { seconds: number }) {
  const size = 132, r = 56, c = 2 * Math.PI * r;
  const secs = seconds % 3600;
  const ratio = secs / 3600;
  const dash = c * ratio;
  const rotation = (seconds % 60) * 6; // 6° per second

  return (
    <svg width={size} height={size} viewBox="0 0 132 132" className="mx-auto">
      <circle cx="66" cy="66" r={r} fill="none" stroke="var(--faded)" strokeWidth="10" />
      <circle cx="66" cy="66" r={r} fill="none" stroke="var(--brand-color)" strokeWidth="10"
        strokeDasharray={`${dash} ${c - dash}`} transform="rotate(-90 66 66)" strokeLinecap="round" />
      <g transform={`rotate(${rotation} 66 66)`}>
        <line x1="66" y1="66" x2="66" y2="20" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="66" cy="66" r="3" fill="var(--text)" />
      </g>
    </svg>
  );
}

function TLRow({ date, note, step, type }: { date: string; note?: string; step?: string; type?: string }) {
  return (
    <div className="relative pl-8 py-3">
      <div className="absolute left-[13px] top-0 bottom-0 w-px bg-[var(--faded)]" />
      <div className="absolute left-2 top-[18px] h-3 w-3 rounded-full bg-[var(--brand-color)] ring-4 ring-[var(--brand-color3)]" />
      <div className="flex flex-col gap-1">
        {step && <div className="text-sm text-[var(--text)] font-bold">{step}</div>}
        <div className="flex items-center gap-2 text-sm text-[var(--text)]">
          <div className="font-medium">{date}</div>
          {type && (
            <Badge className="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs bg-[var(--faded)] text-[var(--text)]">
              {type}
            </Badge>
          )}
        </div>
        <div className="text-[15px] text-[var(--text)] leading-snug">{note}</div>
      </div>
    </div>
  );
}

const sections = [
  { id: "activityTimeline", label: "Activity Timeline", icon: Activity },
  { id: "followUp1", label: "Follow-Up 1", icon: Phone },
  { id: "followUp2", label: "Follow-Up 2", icon: Mail },
] as const;

type SectionId = (typeof sections)[number]["id"];
type Assignee = { name: string; photo?: string };

/* ---------- Component ---------- */
export function ViewExplorerLead() {
  const { id } = useParams();
  const explorerData = LeadExplorersTable.find((u) => u.id === id);

  const [active, setActive] = useState<SectionId>("activityTimeline");
  const counts = useMemo(
    () => ({ activityTimeline: 3, followUp1: 2, followUp2: 2 } as Record<SectionId, number>),
    []
  );

  const [status, setStatus] = useState("In Reviews");
  const navigator = useNavigate();
  // time tracking
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  const totalFormatted = useMemo(() => fmtHrsMins(elapsed), [elapsed]);

  // ----- Assigned To state (local) -----
  const [assignees, setAssignees] = useState<Assignee[]>(
    explorerData?.assignedTo ?? []
  );
  const owner = assignees[0]?.name ?? "Unassigned";

  // Assign/Reassign modal state
  const [showAssign, setShowAssign] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  // Replace this pool with your real team list
  const COACH_POOL: Assignee[] = [
    { name: "Riya Sinha" },
    { name: "Dr. Priya Singh" },
    { name: "Deepak Sharma" },
    { name: "Aisha Khan" },
    { name: "Anil Gupta" },
    { name: "Meera Iyer" },
  ];

  const toggleAssignee = (name: string) =>
    setSelectedAssignees((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const openAssign = () => {
    setSelectedAssignees(assignees.map((a) => a.name));
    setShowAssign(true);
  };

  const saveAssign = () => {
    const newTeam = COACH_POOL.filter((p) => selectedAssignees.includes(p.name));
    setAssignees(newTeam);
    setShowAssign(false);
  };

  // ----- Attachments (demo list) -----
  const [attachments] = useState<
    { name: string; type: "pdf" | "image" | "doc"; size: string; added: string; by: string }[]
  >([
    { name: "Lead-Brief.pdf", type: "pdf", size: "820 KB", added: "10 Jul 2025", by: owner },
    { name: "Profile-Screenshot.png", type: "image", size: "1.4 MB", added: "11 Jul 2025", by: "Ops Bot" },
    { name: "Call-Notes.docx", type: "doc", size: "96 KB", added: "12 Jul 2025", by: owner },
  ]);

  if (!explorerData) return <div className="p-4 text-center text-[var(--text)]">User not found</div>;

  const renderTimeline = (items: { date: string; note: string; step?: string; type?: string }[]) => (
    <ScrollArea className="h-[360px] pr-2"><div className="relative">
      {items.map((item, i) => (
        <TLRow key={i} date={item.date} note={item.note} step={item.step} type={item.type} />
      ))}
    </div></ScrollArea>
  );

  return (
    <section className="w-full">
      {/* Page title (kept) */}
      <div className="mb-4">
      <h1 className="flex justify-between h-[64px] items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Leads Explorers</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >View Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Time Tracking */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[var(--text-head)]">Time Tracking</CardTitle>
              <CardDescription className="text-[var(--text)]">Track effort on this lead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <TimeClock seconds={elapsed} />
                <div className="flex-1">
                  <div className="text-2xl font-semibold text-[var(--text-head)]">{totalFormatted}</div>
                  <div className="text-sm text-[var(--text)]">Worklog · Lead research & calls</div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" className="bg-[var(--red)] text-white"
                      onClick={() => setRunning(false)} disabled={!running}>
                      <Square className="h-4 w-4 mr-1" /> Stop
                    </Button>
                    <Button size="sm" className="bg-[var(--green)] text-white"
                      onClick={() => setRunning(true)} disabled={running}>
                      <Play className="h-4 w-4 mr-1" /> Start
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile / Overview (kept) */}
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4">
                <img
                  src={explorerData.photo}
                  alt={explorerData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--brand-color)] shadow-lg"
                />
              </div>
              <CardTitle className="text-xl text-[var(--text-head)]">{explorerData.name}</CardTitle>
              <p className="text-sm text-[var(--text)]">{explorerData.segment}</p>
              <Badge className="mt-2 bg-[var(--brand-color3)] text-[var(--brand-color)]">{explorerData.id}</Badge>
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
                <span className="text-sm text-[var(--text)]">Owner: <span className="text-[var(--text-head)]">{owner}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-[var(--text)]" />
                <span className="text-sm text-[var(--text)]">Objective: {explorerData.objective}</span>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--text-head)]">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Phone className="h-3 w-3" /> Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3" /> Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Activity className="h-3 w-3" /> Log Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Meta (kept) */}
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Reviews">In Reviews</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Lead No</span><span className="text-[var(--text-head)]">{explorerData.id}</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Lead Title</span><span className="text-[var(--text-head)]">Explorer Lead</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Project</span><span className="text-[var(--text-head)]">Lead Management</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Priority</span><span className="rounded-md bg-[var(--red2)] text-[var(--red)] px-2 py-0.5">High</span></div>
                <div className="flex items-center justify-between"><span className="text-[var(--text)]">Channel</span><span className="text-[var(--text-head)]">{explorerData.source}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Assigned To (NEW) */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-base">Assigned To</CardTitle>
              <Button variant="outline" size="sm" onClick={openAssign} className="flex items-center gap-2">
                <UserPlus2 className="h-4 w-4" /> Assign / Reassign
              </Button>
            </CardHeader>
            <CardContent>
              {assignees.length === 0 ? (
                <div className="text-sm text-[var(--text)]">No assignees yet.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {assignees.map((a) => (
                    <div key={a.name} className="flex items-center gap-2 rounded-full border px-2 py-1">
                      <div className="h-6 w-6 rounded-full overflow-hidden bg-[var(--brand-color3)] grid place-items-center text-[10px] text-[var(--brand-color)]">
                        {a.photo ? <img src={a.photo} className="h-6 w-6 object-cover" /> : a.name.split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase()}
                      </div>
                      <span className="text-sm text-[var(--text-head)]">{a.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[var(--text-head)]">Summary</CardTitle>
              <CardDescription className="text-[var(--text)]">
                Brief context of this lead (editable later).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-[var(--text)] leading-relaxed">
                Origin: <span className="text-[var(--text-head)]">{explorerData.source}</span>. Assigned owner:{" "}
                <span className="text-[var(--text-head)]">{owner}</span>. Segment:{" "}
                <span className="text-[var(--text-head)]">{explorerData.segment}</span>.
              </div>
            </CardContent>
          </Card>

          {/* Sub-tasks + Tags */}
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="font-semibold text-[var(--text-head)] mb-2">Sub-Tasks</div>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-start gap-2"><Checkbox /> <span className="text-[var(--text-head)]">Verify contact details</span></label>
                    <label className="flex items-start gap-2"><Checkbox defaultChecked /> <span className="text-[var(--text-head)]">Share brochure + booking link</span></label>
                    <label className="flex items-start gap-2"><Checkbox /> <span className="text-[var(--text-head)]">Schedule discovery call</span></label>
                    <label className="flex items-start gap-2"><Checkbox /> <span className="text-[var(--text-head)]">Update CRM notes</span></label>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-head)] mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[var(--faded)] text-[var(--text)]">UG Track</Badge>
                    <Badge className="bg-[var(--brand-color3)] text-[var(--brand-color)]">{explorerData.segment}</Badge>
                    <Badge className="bg-[var(--green2)] text-[var(--green)]">New Lead</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments (NEW) */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-2 flex-row items-center justify-between">
              <CardTitle className="text-[var(--text-head)]">Attachments</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" /> Add File
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {attachments.map((f, i) => {
                const icon =
                  f.type === "image" ? <ImageIcon className="h-4 w-4" /> :
                  f.type === "doc" ? <FileIcon className="h-4 w-4" /> :
                  <FileIcon className="h-4 w-4" />;
                return (
                  <div key={i} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-[var(--brand-color3)] text-[var(--brand-color)] grid place-items-center">
                        {icon}
                      </div>
                      <div className="leading-tight">
                        <div className="text-sm text-[var(--text-head)]">{f.name}</div>
                        <div className="text-xs text-[var(--text)]">{f.size} · Added {f.added} · by {f.by}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1"><Eye className="h-4 w-4" /> Preview</Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1"><Download className="h-4 w-4" /> Download</Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tabs/content (kept) */}
          <Card className="border p-0 rounded-md shadow-none w-full bg-[var(--background)]">
            {/* mobile select */}
            <div className="md:hidden p-4 border-b">
              <Select value={active} onValueChange={(v: SectionId) => setActive(v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Choose section" /></SelectTrigger>
                <SelectContent>
                  {sections.map(({ id, label }) => (<SelectItem key={id} value={id}>{label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-[280px_1fr] gap-0">
              {/* left nav (kept) */}
              <aside className="hidden md:block border-r rounded-l-md">
                <div className="p-4">
                  <div className="text-xs uppercase tracking-wide text-[var(--text)] py-4">Lead</div>
                  <nav className="flex flex-col gap-1">
                    {sections.map(({ id, label, icon: Icon }) => {
                      const isActive = active === id;
                      return (
                        <Button
                          key={id}
                          onClick={() => setActive(id)}
                          variant="ghost"
                          className={`justify-between w-full px-3 py-2 rounded-sm hover:bg-[var(--brand-color3)] hover:text-[var(--text-head)] ${
                            isActive ? "bg-[var(--brand-color3)] text-[var(--text-head)] ring-1 ring-[var(--brand-color2)]" : "text-[var(--text)]"
                          }`}
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

              {/* content (kept) */}
              <div className="min-h-[420px]">
                <CardHeader className="px-4 sm:px-6 py-4">
                  <CardTitle className="text-lg text-[var(--text-head)]">
                    {sections.find((s) => s.id === active)?.label}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-4 sm:p-6">
                  {active === "activityTimeline" && renderTimeline([
                    { date: "10 Jul 2025, 10:42 AM", note: "Lead submitted via “Get Started” form", step: "Created" },
                    { date: "10 Jul 2025, 11:05 AM", note: "Assigned to owner", type: owner, step: "Assigned" },
                    { date: "10 Jul 2025, 01:30 PM", note: "“Hi, welcome to Aimshala! Let’s connect for a quick call.”", type: "First Response", step: "Message" },
                  ])}

                  {active === "followUp1" && renderTimeline([
                    { date: "11 Jul 2025, 10:15 AM", note: "Connected. Shared session options. Interested in finance career support.", type: "Call" },
                    { date: "11 Jul 2025, 11:00 AM", note: "Sent brochure + calendar link for 1:1 booking", type: "Message" },
                  ])}

                  {active === "followUp2" && renderTimeline([
                    { date: "13 Jul 2025, 03:40 PM", note: "Call not answered. Left voicemail.", type: "Call" },
                    { date: "13 Jul 2025, 04:10 PM", note: "Reminder sent: “Just checking in—ready to book your session?”", type: "Message" },
                  ])}
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Comments composer (kept) */}
          <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base">Comments</CardTitle></CardHeader>
            <CardContent className="p-4">
              <div className="rounded-2xl border p-3">
                <div className="flex items-start gap-3">
                  <img src={explorerData.photo} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <Textarea rows={3} placeholder="Write a comment…" className="min-h-[88px]" />
                    <div className="mt-2 flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-[var(--text)]">
                        <Paperclip className="h-4 w-4 mr-1" /> Attach
                      </Button>
                      <Button className="bg-[var(--brand-color)] text-white hover:opacity-90">Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* example comment */}
              <div className="mt-4 py-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <img src={explorerData.photo} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-medium text-[var(--text-head)]">{owner}</div>
                    <div className="text-xs text-[var(--text)]">Just now</div>
                  </div>
                </div>
                <div className="mt-2 text-[var(--text)] text-sm leading-relaxed">
                  Logged today’s call outcome. Next follow-up scheduled for tomorrow.
                </div>
                <Button variant="ghost" size="sm" className="mt-2 text-[var(--text)]">
                  <Reply className="h-4 w-4 mr-1" /> Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assign / Reassign modal (lightweight) */}
      {showAssign && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="relative w-full max-w-[520px] rounded-md bg-[var(--background)] border">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-[var(--text-head)]">Assign Users</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAssign(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 space-y-2 max-h-[60vh] overflow-auto">
              {COACH_POOL.map((person) => (
                <label key={person.name} className="flex items-center gap-3 p-2 rounded-md border cursor-pointer hover:bg-[var(--faded)]">
                  <Checkbox
                    checked={selectedAssignees.includes(person.name)}
                    onCheckedChange={() => toggleAssignee(person.name)}
                  />
                  <div className="h-8 w-8 rounded-full grid place-items-center bg-[var(--brand-color3)] text-[var(--brand-color)] text-xs font-semibold">
                    {person.name.split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase()}
                  </div>
                  <span className="text-sm text-[var(--text-head)]">{person.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowAssign(false)}>Cancel</Button>
              <Button className="bg-[var(--brand-color)] text-white" onClick={saveAssign}>Save Assignment</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
