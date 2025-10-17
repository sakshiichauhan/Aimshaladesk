import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Eye, Search, ChevronLeft, ChevronRight, FileDown, Filter, X, CheckCircle2, AlertTriangle,
} from "lucide-react";

// Your design system
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ClipboardList, TrendingUp, Target, Clock, Link as LinkIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* =========================
   Types
========================= */
type SubmissionStatus = "Pass" | "Fail" | "Incomplete";

type Submission = {
  submissionId: string;
  firstName: string;
  lastName?: string;
  userId: string;
  email?: string;
  phone?: string;
  submittedOn: string; // ISO
  correct: number;
  total: number;
  scorePct: number;
  timeTakenSec: number;
  attempt: number;
  status: SubmissionStatus;
  device?: string;   // "Mobile" | "Desktop"
  browser?: string;  // "Chrome" | "Safari" | etc.
  source?: string;   // "Website" | "Referral" | etc.
};

type FormMeta = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdOn: string; // ISO
  totalQuestions: number;
  totalSubmissions: number;
  avgScorePct: number;
  avgTimeSec: number;
  completionRatePct: number;
  lastSubmissionOn?: string; // ISO
};

/* =========================
   Dummy data as CONSTS
   (replace later with API/loader)
========================= */
const DUMMY_FORM_META: Record<string, FormMeta> = {
  "FORM-98124": {
    id: "FORM-98124",
    name: "Intro to Product Feedback",
    status: "Active",
    createdOn: "2025-04-18T10:00:00.000Z",
    totalQuestions: 25,
    totalSubmissions: 1280,
    avgScorePct: 78,
    avgTimeSec: 542,
    completionRatePct: 86,
    lastSubmissionOn: new Date().toISOString(),
  },
  "FORM-77777": {
    id: "FORM-77777",
    name: "Campus Onboarding Quiz",
    status: "Inactive",
    createdOn: "2025-03-02T12:00:00.000Z",
    totalQuestions: 15,
    totalSubmissions: 342,
    avgScorePct: 64,
    avgTimeSec: 421,
    completionRatePct: 72,
    lastSubmissionOn: "2025-08-04T15:20:00.000Z",
  },
};

const pick = (arr: string[], i: number) => arr[i % arr.length];

const DUMMY_SUBMISSIONS_BY_FORM: Record<string, Submission[]> = {
  "FORM-98124": Array.from({ length: 26 }, (_, i) => {
    const total = 25;
    const correct = Math.floor(Math.random() * (total + 1));
    const scorePct = Math.round((correct / total) * 100);
    const status: SubmissionStatus =
      scorePct >= 60 ? "Pass" : Math.random() > 0.85 ? "Incomplete" : "Fail";
    const firstNames = ["Aarav", "Isha", "Vihaan", "Mira", "Kabir", "Anaya", "Advait", "Sara", "Arjun", "Riya"];
    const lastNames = ["Sharma", "Patel", "Rao", "Singh", "Verma", "Das"];
    const f = pick(firstNames, i);
    const l = pick(lastNames, i);
    return {
      submissionId: `SUB-${1000 + i}`,
      firstName: f,
      lastName: l,
      userId: `U-${7000 + i}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.com`,
      phone: `+91-98${(10000000 + i).toString().slice(0, 8)}`,
      submittedOn: new Date(Date.now() - i * 86400000).toISOString(),
      correct,
      total,
      scorePct,
      timeTakenSec: 300 + Math.floor(Math.random() * 600),
      attempt: (i % 3) + 1,
      status,
      device: i % 2 ? "Desktop" : "Mobile",
      browser: ["Chrome", "Safari", "Edge"][i % 3],
      source: ["Website", "Referral", "Walk-in"][i % 3],
    };
  }),
  "FORM-77777": Array.from({ length: 12 }, (_, i) => {
    const total = 15;
    const correct = Math.floor(Math.random() * (total + 1));
    const scorePct = Math.round((correct / total) * 100);
    const status: SubmissionStatus =
      scorePct >= 60 ? "Pass" : Math.random() > 0.8 ? "Incomplete" : "Fail";
    const f = pick(["Noah", "Liam", "Emma", "Olivia", "Ava", "Mia"], i);
    const l = pick(["Brown", "Taylor", "Jones", "Williams", "Wilson"], i);
    return {
      submissionId: `SUB-${2000 + i}`,
      firstName: f,
      lastName: l,
      userId: `U-${8000 + i}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@example.com`,
      submittedOn: new Date(Date.now() - i * 43200000).toISOString(),
      correct,
      total,
      scorePct,
      timeTakenSec: 180 + Math.floor(Math.random() * 420),
      attempt: (i % 2) + 1,
      status,
      device: i % 2 ? "Desktop" : "Mobile",
      browser: ["Chrome", "Safari", "Firefox"][i % 3],
      source: ["Website", "Referral", "Walk-in"][i % 3],
    };
  }),
};

/* =========================
   Utils
========================= */
const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

/* =========================
   Page
========================= */

function Topbar({ name,status,id }: { name: string,status: string,id: string; }) {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] h-[64px] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Form</BreadcrumbLink>
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
                status === "Active"
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



export function FormSubmissionsPage() {
  const { formId = "FORM-98124" } = useParams();
  const navigate = useNavigate();

  const meta: FormMeta =
    DUMMY_FORM_META[formId] ||
    ({
      id: formId,
      name: `Form ${formId}`,
      status: "Active",
      createdOn: new Date().toISOString(),
      totalQuestions: 0,
      totalSubmissions: 0,
      avgScorePct: 0,
      avgTimeSec: 0,
      completionRatePct: 0,
      lastSubmissionOn: undefined,
    } as FormMeta);

  const allSubmissions: Submission[] = DUMMY_SUBMISSIONS_BY_FORM[formId] || [];

  // local UI state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Submission | "scorePct" | "submittedOn";
    direction: "ascending" | "descending";
  } | null>(null);

  // computed rows
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSubmissions;
    return allSubmissions.filter((s) =>
      [s.firstName, s.lastName, s.userId, s.email, s.submissionId, s.browser, s.device, s.source]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [query, allSubmissions]);

  const sorted = useMemo(() => {
    const data = [...filtered];
    if (!sortConfig) return data;
    data.sort((a, b) => {
      const { key, direction } = sortConfig;
      const av = (a as any)[key];
      const bv = (b as any)[key];
      if (av < bv) return direction === "ascending" ? -1 : 1;
      if (av > bv) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    return data;
  }, [filtered, sortConfig]);

  const totalPages = Math.ceil(sorted.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const pageRows = sorted.slice(indexOfFirst, indexOfLast);

  const toggleSelectAll = () => {
    if (selectedIds.length === pageRows.length) setSelectedIds([]);
    else setSelectedIds(pageRows.map((r) => r.submissionId));
  };
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const requestSort = (key: keyof Submission | "scorePct" | "submittedOn") => {
    setSortConfig((prev) =>
      !prev || prev.key !== key
        ? { key, direction: "ascending" }
        : { key, direction: prev.direction === "ascending" ? "descending" : "ascending" }
    );
  };
  const headerSortIcon = (key: keyof Submission | "scorePct" | "submittedOn") =>
    sortConfig?.key === key ? (sortConfig.direction === "ascending" ? "↑" : "↓") : "";

  return (
    <div className="text-[var(--text)] flex-col gap-4">
      {/* Header */}
      <header className="border-b border-[var(--faded)] bg-[var(--background)]">
        {/* <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-head)]">{meta.name}</h1>
            <p className="text-xs mt-0.5">
              Form ID: <span className="text-[var(--text-head)]">{meta.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={
                meta.status === "Active"
                  ? "bg-[var(--green2)] text-[var(--green)]"
                  : "bg-[var(--red2)] text-[var(--red)]"
              }
            >
              {meta.status}
            </Badge>
            <Button variant="border" size="sm" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>
        </div> */}
        <Topbar name={meta.name} status={meta.status} id={meta.id}/>
      </header>

      {/* Overview cards */}
      <section className="py-4">
  <FormStats
    totalQuestions={meta.totalQuestions}
    totalSubmissions={allSubmissions.length || meta.totalSubmissions}
    avgScorePct={meta.avgScorePct}
    avgTimeSec={meta.avgTimeSec}
    completionRatePct={meta.completionRatePct}
  />
</section>

      {/* Table container */}
      <section className="">
        <div className="rounded-md border bg-[var(--background)] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-[var(--faded)] h-20 px-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedIds.length === pageRows.length && pageRows.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All
              </label>
              {selectedIds.length > 0 && (
                <Badge variant="border" className="ml-2">
                  {selectedIds.length} selected
                </Badge>
              )}
              {selectedIds.length > 0 && (
                <div className="flex gap-2 ml-2">
                  <Button variant="border" size="sm">
                    <FileDown className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="delete" size="sm">
                    <X className=" h-4 w-4 text-[var(--red)]" />
                    Deactivate
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md overflow-hidden bg-[var(--faded)]">
                <Input
                  placeholder="Search name, email, id…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-48 sm:w-60 bg-transparent"
                />
                <Button type="button" size="icon" variant="standard" className="rounded-none rounded-r-md bg-[var(--button)]">
                  <Search className="h-5 w-5 text-[var(--text)]" />
                </Button>
              </div>
              <Button variant="border" size="sm">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto text-[var(--text)] w-full">
            <Table className="w-full caption-top border-collapse">
              <TableHeader className="bg-[var(--faded)]">
                <TableRow>
                  <TableHead className="min-w-[40px]"></TableHead>
                  <TableHead onClick={() => requestSort("firstName")} className="cursor-pointer">
                    First Name &nbsp;{headerSortIcon("firstName")}
                  </TableHead>
                  <TableHead>Submission ID</TableHead>
                  <TableHead onClick={() => requestSort("submittedOn")} className="cursor-pointer">
                    Submitted On &nbsp;{headerSortIcon("submittedOn")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("correct")} className="cursor-pointer">
                    Correct / Total &nbsp;{headerSortIcon("correct")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("scorePct")} className="cursor-pointer">
                    Score % &nbsp;{headerSortIcon("scorePct")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("timeTakenSec")} className="cursor-pointer">
                    Time Taken &nbsp;{headerSortIcon("timeTakenSec")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("attempt")} className="cursor-pointer">
                    Attempt # &nbsp;{headerSortIcon("attempt")}
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Device / Browser</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-center w-[120px]">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pageRows.map((s) => (
                  <TableRow key={s.submissionId} className="group hover:bg-[var(--brand-color2)]">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(s.submissionId)}
                        onCheckedChange={() => toggleSelectOne(s.submissionId)}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-[var(--text-head)]">
                          {s.firstName} {s.lastName}
                        </span>
                        <span className="text-xs">{s.userId}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm">{s.submissionId}</TableCell>
                    <TableCell className="text-sm">{new Date(s.submittedOn).toLocaleString()}</TableCell>
                    <TableCell className="text-sm">
                      {s.correct} / {s.total}
                    </TableCell>
                    <TableCell className="text-sm">{s.scorePct}%</TableCell>
                    <TableCell className="text-sm">{formatTime(s.timeTakenSec)}</TableCell>
                    <TableCell className="text-sm">{s.attempt}</TableCell>

                    <TableCell>
                      {s.status === "Pass" && (
                        <Badge className="bg-[var(--green2)] text-[var(--green)]">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Pass
                        </Badge>
                      )}
                      {s.status === "Fail" && (
                        <Badge className="bg-[var(--red2)] text-[var(--red)]">
                          <X className="h-3.5 w-3.5 mr-1" />
                          Fail
                        </Badge>
                      )}
                      {s.status === "Incomplete" && (
                        <Badge className="bg-[var(--yellow2)] text-[var(--yellow)]">
                          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                          Incomplete
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-sm">
                      {s.device} / {s.browser}
                    </TableCell>
                    <TableCell className="text-sm">{s.source}</TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="brand"
                                size="sm"
                                onClick={() =>
                                  navigate(`/desk/platform/forms/${meta.id}/submissions/${s.submissionId}`)
                                }
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Form
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              Open submission details
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer / Pagination */}
          <div className="flex items-center justify-between flex-wrap gap-2 p-4 border-t border-[var(--faded)]">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="border" size="sm" className="flex items-center gap-2 text-[var(--text-head)]">
                    {recordsPerPage}
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[var(--background)]">
                  {[10, 25, 50, 100].map((size) => (
                    <DropdownMenuItem
                      key={size}
                      onClick={() => {
                        setRecordsPerPage(size);
                        setCurrentPage(1);
                      }}
                      className="text-[var(--text)] focus:bg-[var(--faded)]"
                    >
                      {size}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-[var(--text)] text-sm">
                Showing {indexOfFirst + 1}-{Math.min(indexOfLast, sorted.length)} of {sorted.length} submissions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="border"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <Button
                  key={pg}
                  variant={pg === currentPage ? "brand" : "border"}
                  size="sm"
                  className={`h-8 w-8 p-0 ${pg === currentPage ? "text-white" : "text-[var(--text)]"}`}
                  onClick={() => setCurrentPage(pg)}
                >
                  {pg}
                </Button>
              ))}
              <Button
                variant="border"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Small UI ---------------- */
/* ---------------- Stats (requested design) ---------------- */
const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

function FormStats({
  totalQuestions,
  totalSubmissions,
  avgScorePct,
  avgTimeSec,
  completionRatePct,
}: {
  totalQuestions: number;
  totalSubmissions: number;
  avgScorePct: number;
  avgTimeSec: number;
  completionRatePct: number;
}) {
  const orgStats = [
    {
      title: "Total Questions",
      value: String(totalQuestions),
      icon: ClipboardList,
    },
    {
      title: "Total Submissions",
      value: String(totalSubmissions),
      icon: LinkIcon,
    },
    {
      title: "Avg. Score",
      value: `${avgScorePct}%`,
      icon: TrendingUp,
    },
    {
      title: "Avg. Time",
      value: formatTime(avgTimeSec),
      icon: Clock,
    },
    {
      title: "Completion Rate",
      value: `${completionRatePct}%`,
      icon: Target,
    },
    {
      title: "Status",
      value: completionRatePct >= 50 ? "Healthy" : "Low",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
      {orgStats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-sm shadow-none bg-[var(--background)] border"
        >
          <CardHeader className="flex-col items-center px-4 gap-4 py-3 h-full">
            <div className="flex justify-between h-full items-center w-full">
              <div className={`${color} text-xs uppercase line-clamp-1`}>
                {stat.title}
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="rounded-full">
                <stat.icon className={`h-8 w-8 ${color2}`} />
              </div>
              <div className={`${color2} text-2xl`}>{stat.value}</div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

