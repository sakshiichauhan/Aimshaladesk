import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  UserRound,
  ArrowUpDown,
  CalendarDays,
  XCircle,
} from "lucide-react";

type LeadStatus = "Hot" | "Warm" | "Cold";
type StepState =
  | "Not Started"
  | "Step 1/3"
  | "Step 2/3"
  | "Step 3/3"
  | "Disqualified/Deferred"
  | "3-Step Closed";

interface Lead {
  id: number;
  name: string;
  status: LeadStatus;
  agent: string;
  nextFollowUp: string; // YYYY-MM-DD or ""
  overdue: boolean;
  isStale: boolean;
  closureStep: StepState;
  previousSummary: string;
}

// --- helpers ---
const formatYYYYMMDD = (d: Date) => d.toLocaleDateString("en-CA");
const addDays = (base: Date, days: number) => {
  const copy = new Date(base.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
};
const suggestNextByStatus = (status: LeadStatus): string => {
  const today = new Date();
  const days = status === "Hot" ? 1 : status === "Warm" ? 3 : 6;
  return formatYYYYMMDD(addDays(today, days));
};
const getStepIndex = (step: StepState): number => {
  if (step === "Not Started") return 0;
  if (step === "Step 1/3") return 1;
  if (step === "Step 2/3") return 2;
  if (step === "Step 3/3") return 3;
  if (step === "3-Step Closed") return 4;
  return -1; // Disqualified/Deferred
};
const stepFromIndex = (i: number): StepState => {
  if (i <= 0) return "Not Started";
  if (i === 1) return "Step 1/3";
  if (i === 2) return "Step 2/3";
  if (i === 3) return "Step 3/3";
  return "3-Step Closed";
};
const initials = (full: string) =>
  full
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

// --- mock data ---
const agentPool = ["Aarav Kapoor", "Neha Singh", "Rohit Patel", "Isha Mehta"];
const initialLeads: Lead[] = [
  { id: 1, name: "John Doe",   status: "Hot",  agent: "Aarav Kapoor", nextFollowUp: "2025-08-21", overdue: false, isStale: false, closureStep: "Not Started", previousSummary: "Initial contact made." },
  { id: 2, name: "Jane Smith", status: "Warm", agent: "Neha Singh",   nextFollowUp: "2025-08-22", overdue: false, isStale: false, closureStep: "Step 1/3",    previousSummary: "Logged a call to discuss needs." },
  { id: 3, name: "Peter Jones",status: "Cold", agent: "Rohit Patel",  nextFollowUp: "2025-08-27", overdue: true,  isStale: false, closureStep: "Step 2/3",    previousSummary: "Follow-up call missed. Left a message." },
  { id: 4, name: "Mary White", status: "Hot",  agent: "Isha Mehta",   nextFollowUp: "2025-08-14", overdue: false, isStale: true,  closureStep: "Step 1/3",    previousSummary: "Sent introductory email." },
  { id: 5, name: "Lisa Ray",   status: "Warm", agent: "Aarav Kapoor", nextFollowUp: "2025-08-20", overdue: false, isStale: false, closureStep: "Not Started", previousSummary: "Initial email sent." },
];

type DueFilter = "all" | "overdue" | "today" | "week";
type DueSort = "asc" | "desc";

export const NextFollowUpFlow: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Toolbar: filter/sort
  const [dueFilter, setDueFilter] = useState<DueFilter>("all");
  const [dueSort, setDueSort] = useState<DueSort>("asc");

  // Inspector local state
  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedId) || null,
    [leads, selectedId]
  );
  const [inspectorDate, setInspectorDate] = useState<string>("");
  const [inspectorStep, setInspectorStep] = useState<StepState>("Not Started");
  const [thisSummary, setThisSummary] = useState<string>("");
  const [dateErr, setDateErr] = useState<string>("");

  // actions popover
  const [reassignOpenFor, setReassignOpenFor] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // click-outside to close reassign menu
  useEffect(() => {
    if (reassignOpenFor === null) return;
    const onDocClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setReassignOpenFor(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [reassignOpenFor]);

  // Date helpers for filtering
  const isOverdue = (s: string) => !!s && new Date(s) < new Date(formatYYYYMMDD(new Date()));
  const isToday = (s: string) => !!s && s === formatYYYYMMDD(new Date());
  const isThisWeek = (s: string) => {
    if (!s) return false;
    const d = new Date(s);
    const now = new Date(formatYYYYMMDD(new Date()));
    const in7 = addDays(now, 7);
    return d >= now && d <= in7;
  };

  // Derived counts
  const overdueCount = useMemo(() => leads.filter((l) => isOverdue(l.nextFollowUp)).length, [leads]);
  const staleCount = useMemo(() => leads.filter((l) => l.isStale).length, [leads]);
  const todayCount = useMemo(() => leads.filter((l) => isToday(l.nextFollowUp)).length, [leads]);

  // Visible list with filter/sort
  const visibleLeads = useMemo(() => {
    let list = [...leads];
    list = list.map((l) => ({ ...l, overdue: l.nextFollowUp ? isOverdue(l.nextFollowUp) : l.overdue }));

    list = list.filter((l) => {
      if (dueFilter === "all") return true;
      if (dueFilter === "overdue") return isOverdue(l.nextFollowUp);
      if (dueFilter === "today") return isToday(l.nextFollowUp);
      if (dueFilter === "week") return isThisWeek(l.nextFollowUp);
      return true;
    });

    const toNum = (s: string) => (s ? new Date(s).getTime() : Number.POSITIVE_INFINITY);
    list.sort((a, b) => {
      const da = toNum(a.nextFollowUp);
      const db = toNum(b.nextFollowUp);
      return dueSort === "asc" ? da - db : db - da;
    });

    return list;
  }, [leads, dueFilter, dueSort]);

  const openInspector = (lead: Lead, autoPrefill = false) => {
    setSelectedId(lead.id);
    const suggested = suggestNextByStatus(lead.status);
    const next = autoPrefill ? suggested : lead.nextFollowUp || suggested;
    setInspectorDate(next);
    setInspectorStep(lead.closureStep);
    setThisSummary("");
    setDateErr("");
  };

  // --- actions ---
  const saveInspector = () => {
    if (!selectedLead) return;
    const mustHaveDate =
      inspectorStep !== "3-Step Closed" && inspectorStep !== "Disqualified/Deferred";
    if (mustHaveDate && !inspectorDate) {
      setDateErr("Next follow-up date is required.");
      return;
    }
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLead.id
          ? {
              ...l,
              nextFollowUp: mustHaveDate ? inspectorDate : "",
              closureStep: inspectorStep,
              previousSummary: thisSummary ? thisSummary : l.previousSummary,
              overdue: false,
              isStale: false,
            }
          : l
      )
    );
    setDateErr("");
  };

  const nextStep = () => {
    if (!selectedLead) return;
    const curIdx = getStepIndex(inspectorStep);
    if (curIdx >= 0 && curIdx < 3) setInspectorStep(stepFromIndex(curIdx + 1));
  };

  const markDone = () => {
    if (!selectedLead) return;
    if (inspectorStep === "Step 3/3") {
      setInspectorStep("3-Step Closed");
      setInspectorDate("");
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id
            ? {
                ...l,
                closureStep: "3-Step Closed",
                nextFollowUp: "",
                overdue: false,
                isStale: false,
                previousSummary: thisSummary ? thisSummary : l.previousSummary,
              }
            : l
        )
      );
      setDateErr("");
    }
  };

  const disqualifySelected = () => {
    if (!selectedLead) return;
    if (inspectorStep === "3-Step Closed") return;
    setInspectorStep("Disqualified/Deferred");
    setInspectorDate("");
    setLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLead.id
          ? {
              ...l,
              closureStep: "Disqualified/Deferred",
              nextFollowUp: "",
              overdue: false,
              isStale: false,
              previousSummary: thisSummary ? thisSummary : l.previousSummary,
            }
          : l
      )
    );
    setDateErr("");
  };

  const reassignLead = (leadId: number, agent: string) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, agent } : l)));
    setReassignOpenFor(null);
  };

  // UI helpers
  const statusChip = (s: LeadStatus) => {
    const base = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    if (s === "Hot") return `${base} bg-[var(--red2)] text-[var(--red)]`;
    if (s === "Warm") return `${base} bg-[var(--yellow2)] text-[var(--yellow)]`;
    return `${base} bg-[var(--brand-color2)] text-[var(--brand-color)]`;
  };

  const stepChip = (step: StepState) => {
    const base = "px-2 py-0.5 text-xs font-medium rounded-full";
    if (step === "3-Step Closed") return `${base} bg-[var(--green2)] text-[var(--green)]`;
    if (step === "Disqualified/Deferred") return `${base} bg-[var(--red2)] text-[var(--red)]`;
    return `${base} bg-[var(--brand-color3)] text-[var(--text-head)]`;
  };

  // Strong selected highlight (brand-color2), no borders/rings
  const rowAccentClass = (isActive: boolean) => {
    const base = "transition-colors duration-200 ease-out";
    const hover = "hover:bg-[var(--brand-color3)]/40";
    const selected = isActive ? "bg-[var(--brand-color2)]/80" : "bg-white";
    return `${base} ${hover} ${selected}`;
  };

  // Icon button helper
  const iconBtn = (variant: "brand" | "green" | "red" | "muted") => {
    const base =
      "h-9 w-9 rounded-full inline-flex items-center justify-center transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
    if (variant === "brand")
      return `${base} bg-[var(--brand-color3)] text-[var(--brand-color)] hover:opacity-90 focus:ring-[var(--brand-color)]`;
    if (variant === "green")
      return `${base} bg-[var(--green2)] text-[var(--green)] hover:opacity-90 focus:ring-[var(--green)]`;
    if (variant === "red")
      return `${base} bg-[var(--red2)] text-[var(--red)] hover:opacity-90 focus:ring-[var(--red)]`;
    return `${base} bg-[var(--faded)] text-[var(--text-head)] hover:opacity-90 focus:ring-[var(--text-head)]`;
  };

  // Step pill
  const StepPill: React.FC<{
    index: 1 | 2 | 3;
    activeIndex: number;
  }> = ({ index, activeIndex }) => {
    const isDone = activeIndex > index;
    const isCurrent = activeIndex === index;
    const base = "flex items-center gap-2 px-4 py-2 rounded-full text-sm select-none cursor-default";
    const classes = isCurrent
      ? `${base} bg-[var(--brand-color)] text-white`
      : isDone
      ? `${base} bg-[var(--green2)] text-[var(--green)]`
      : `${base} bg-[var(--brand-color3)] text-[var(--text-head)]`;
    return (
      <div className={classes} aria-current={isCurrent ? "step" : undefined} aria-disabled="true">
        {isDone ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <span className="h-4 w-4 rounded-full bg-[var(--button)] inline-block" />
        )}
        <span>Step {index}</span>
      </div>
    );
  };

  // Top summary cards
  const summaryCard = (
    bg: string,
    fg: string,
    Icon: React.ComponentType<any>,
    text: React.ReactNode
  ) => (
    <div className={`flex items-center gap-3 p-4 rounded-lg ${bg} ${fg} shadow-sm transition-transform duration-200 hover:-translate-y-0.5`}>
      <Icon className="h-5 w-5" />
      <div className="text-sm">{text}</div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-8 bg-[var(--layout)] text-[var(--text)]">
      {/* Header + Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-head)]">My Follow-ups</h1>

        <div className="flex items-center gap-2">
          <select
            value={dueFilter}
            onChange={(e) => setDueFilter(e.target.value as DueFilter)}
            className="px-2 py-1 rounded-md bg-[var(--background)] border border-[var(--faded)] text-[var(--text-head)] text-sm"
            title="Filter by due date"
          >
            <option value="all">All</option>
            <option value="overdue">Overdue</option>
            <option value="today">Due Today</option> 
            <option value="week">Due in 7 days</option>
          </select>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--background)] border border-[var(--faded)] text-[var(--text-head)] text-sm hover:opacity-90"
            onClick={() => setDueSort((s) => (s === "asc" ? "desc" : "asc"))}
            title="Sort by Next Follow-Up"
          >
            <ArrowUpDown className="h-4 w-4" /> {dueSort === "asc" ? "Oldest" : "Newest"}
          </button>
        </div>
      </div>

      {/* Top summary (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {summaryCard(
          "bg-[var(--red2)]",
          "text-[var(--red)]",
          AlertCircle,
          <>You have <span className="font-semibold">{overdueCount}</span> overdue follow-ups.</>
        )}
        {summaryCard(
          "bg-[var(--yellow2)]",
          "text-[var(--yellow)]",
          Clock,
          <><span className="font-semibold">{staleCount}</span> leads are flagged as stale.</>
        )}
        {summaryCard(
          "bg-[var(--brand-color3)]",
          "text-[var(--brand-color)]",
          CalendarDays,
          <><span className="font-semibold">{todayCount}</span> follow-ups due today.</>
        )}
      </div>

      {/* Main grid: table + inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead list */}
        <div className="lg:col-span-2 rounded-lg shadow-sm overflow-hidden bg-[var(--background)]">
          <table className="min-w-full">
            <thead className="bg-[var(--faded)]">
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Lead Name</th>
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Current Step</th>
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Next Follow-Up</th>
                <th className="px-6 py-3 text-xs font-medium text-[var(--text-head)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleLeads.map((lead) => {
                const isActive = lead.id === selectedId;
                const idx = getStepIndex(lead.closureStep);
                const canMarkDone = lead.closureStep === "Step 3/3";
                const isClosed = lead.closureStep === "3-Step Closed";
                const isDisq = lead.closureStep === "Disqualified/Deferred";
                const showNextStep = idx >= 0 && idx < 3;

                const toggleReassign = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  setReassignOpenFor((cur) => (cur === lead.id ? null : lead.id));
                };

                return (
                  <tr
                    key={lead.id}
                    onClick={() => openInspector(lead)}
                    className={rowAccentClass(isActive)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[var(--text-head)]">{lead.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={statusChip(lead.status)}>{lead.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={stepChip(lead.closureStep)}>{lead.closureStep}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-[var(--brand-color2)] text-[var(--brand-color)] flex items-center justify-center text-[10px] font-semibold">
                          {initials(lead.agent)}
                        </div>
                        <span className="text-[var(--text-head)]">{lead.agent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={lead.overdue ? "text-[var(--red)] font-semibold" : ""}>
                        {lead.nextFollowUp || "—"}
                      </span>
                    </td>

                    {/* ACTIONS: icons only */}
                    <td className="px-6 py-4 text-sm relative">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {showNextStep && !isDisq && !isClosed && (
                          <button
                            aria-label="Next Step"
                            title="Next Step"
                            className={iconBtn("brand")}
                            onClick={() => {
                              setSelectedId(lead.id);
                              const next = stepFromIndex(idx + 1);
                              setLeads((prev) =>
                                prev.map((l) => (l.id === lead.id ? { ...l, closureStep: next } : l))
                              );
                              openInspector({ ...lead, closureStep: next }, true);
                            }}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        )}

                        {canMarkDone && !isDisq && (
                          <button
                            aria-label="Mark Done"
                            title="Mark Done"
                            className={iconBtn("green")}
                            onClick={() => {
                              setSelectedId(lead.id);
                              setInspectorStep("Step 3/3");
                              openInspector(lead);
                              setTimeout(() => markDone(), 0);
                            }}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}

                        {/* Re-assign (hidden when closed OR disqualified) */}
                        {!isClosed && !isDisq && (
                          <div className="relative" ref={reassignOpenFor === lead.id ? popoverRef : null}>
                            <button
                              aria-label="Re-assign"
                              title="Re-assign"
                              className={iconBtn("muted")}
                              onClick={toggleReassign}
                            >
                              <UserRound className="h-5 w-5" />
                            </button>
                            {reassignOpenFor === lead.id && (
                              <div className="absolute right-0 mt-2 z-20 w-44 rounded-md border border-[var(--faded)] bg-[var(--background)] shadow-md">
                                {agentPool.map((a) => (
                                  <button
                                    key={a}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--brand-color3)]/50 text-[var(--text-head)]"
                                    onClick={() => reassignLead(lead.id, a)}
                                  >
                                    {a}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {!isClosed && !isDisq && (
                          <button
                            aria-label="Disqualify"
                            title="Disqualify"
                            className={iconBtn("red")}
                            onClick={() => {
                              setSelectedId(lead.id);
                              disqualifySelected();
                            }}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Inspector panel */}
        <div className="lg:col-span-1">
          <div
            className={`rounded-lg shadow-sm bg-[var(--background)] p-5 sticky top-6 transition-all duration-300 ease-out ${
              selectedLead ? "opacity-100 translate-y-0" : "opacity-90 translate-y-1"
            }`}
          >
            {!selectedLead ? (
              <div className="text-sm text-[var(--text)]">
                Select a lead to review details and schedule the next follow-up.
              </div>
            ) : (
              <>
                {/* header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[var(--text-head)]">
                      {selectedLead.name}
                    </h2>
                    <span className={statusChip(selectedLead.status)}>{selectedLead.status}</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--text)]">
                    Current: <span className="font-medium">{inspectorStep}</span>
                  </div>
                </div>

                {/* Agent inline (read-only) */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[var(--brand-color2)] text-[var(--brand-color)] flex items-center justify-center text-[11px] font-semibold">
                    {initials(selectedLead.agent)}
                  </div>
                  <div className="text-sm text-[var(--text-head)]">{selectedLead.agent}</div>
                </div>

                {/* previous summary */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-[var(--text-head)] mb-1">
                    Previous Follow-Up Summary
                  </div>
                  <div className="rounded-md border border-[var(--faded)] bg-[var(--brand-color3)]/40 p-3">
                    <div className="text-[var(--text-head)] text-sm">
                      {selectedLead.previousSummary || "No previous notes."}
                    </div>
                  </div>
                </div>

                {/* STEP PROGRESS – non-clickable pills */}
                <div className="mb-5">
                  <div className="text-xs font-medium text-[var(--text-head)] mb-2">Progress</div>

                  <div className="relative rounded-lg border border-[var(--brand-color2)] bg-[var(--brand-color3)]/40 p-4">
                    {/* track line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--brand-color2)]" />
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <StepPill index={1} activeIndex={Math.min(getStepIndex(inspectorStep), 3)} />
                      <StepPill index={2} activeIndex={Math.min(getStepIndex(inspectorStep), 3)} />
                      <StepPill index={3} activeIndex={Math.min(getStepIndex(inspectorStep), 3)} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        getStepIndex(inspectorStep) >= 3 ||
                        inspectorStep === "Disqualified/Deferred" ||
                        inspectorStep === "3-Step Closed"
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm transition
                        ${
                          getStepIndex(inspectorStep) < 3 &&
                          inspectorStep !== "Disqualified/Deferred" &&
                          inspectorStep !== "3-Step Closed"
                            ? "bg-[var(--brand-color3)] text-[var(--text-head)] hover:opacity-90"
                            : "bg-[var(--faded)] text-[var(--text)] cursor-not-allowed"
                        }`}
                    >
                      Move to Next Step <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* next follow-up + this note (compact) */}
                <div className="space-y-3 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-[var(--text-head)] mb-1">
                      Next Follow-Up (required unless Closed/Disqualified)
                    </label>
                    <input
                      type="date"
                      className={`w-full p-2 rounded-md bg-[var(--layout)] text-[var(--text-head)] border ${
                        dateErr ? "border-[var(--red)]" : "border-[var(--faded)]"
                      }`}
                      value={inspectorDate}
                      onChange={(e) => {
                        setInspectorDate(e.target.value);
                        setDateErr("");
                      }}
                      min={formatYYYYMMDD(new Date())}
                      disabled={
                        inspectorStep === "3-Step Closed" ||
                        inspectorStep === "Disqualified/Deferred"
                      }
                    />
                    {dateErr && (
                      <div className="mt-1 text-[10px] text-[var(--red)]">{dateErr}</div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-[var(--text-head)] mb-1">
                      This Follow-Up Note
                    </label>
                    <textarea
                      value={thisSummary}
                      onChange={(e) => setThisSummary(e.target.value)}
                      rows={2}
                      placeholder="Brief note…"
                      className="w-full p-2 rounded-md bg-[var(--layout)] text-[var(--text-head)] border border-[var(--faded)] text-sm"
                    />
                  </div>
                </div>

                {/* actions */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {!(inspectorStep === "3-Step Closed") && (
                    <button
                      type="button"
                      className="px-3 py-2 rounded-md bg-[var(--red2)] text-[var(--red)] hover:opacity-90 transition"
                      onClick={disqualifySelected}
                    >
                      Disqualify
                    </button>
                  )}

                  <div className="ml-auto" />

                  <button
                    type="button"
                    disabled={inspectorStep !== "Step 3/3"}
                    className={`px-3 py-2 rounded-md transition
                      ${
                        inspectorStep === "Step 3/3"
                          ? "bg-[var(--green2)] text-[var(--green)] hover:opacity-90"
                          : "bg-[var(--faded)] text-[var(--text)] cursor-not-allowed"
                      }`}
                    onClick={markDone}
                    title="Completes the 3-step process"
                  >
                    Mark Done
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-[var(--brand-color)] text-white hover:opacity-90 transition"
                    onClick={saveInspector}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
