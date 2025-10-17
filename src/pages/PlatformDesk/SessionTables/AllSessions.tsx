import { useEffect, useMemo, useState } from "react";
import {
  Search, Check, X, FileDown, Newspaper, Flag, NotebookIcon,
  Phone, MessageCircle, Calendar1, Plus,
  ChevronDown, ChevronRight, ChevronLeft, Eye,
  SquarePen
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TooltipContent, TooltipTrigger, TooltipProvider, Tooltip } from "@/components/ui/tooltip";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";
import { cn } from "@/lib/utils";
import asset from "@/assets/asset.jpg";
import { coachesList } from "@/data/Data";

/* --------------------------------- DATA --------------------------------- */
const tableData = [
  {
    id: "SES3001",
    explorer: { photo: asset, fullName: "Aayush Kapoor", explorerId: "EXP101", UG: "B.Com (Hons)" },
    coach: { photo: asset, fullName: "Riya Sinha", coachId: "COA101", careerType: "Consultant" },
    date: "2025-07-15",
    time: "10:30 AM",
    type: "Video",
    objective: "Career Counseling",
    amount: 800,
    fees: "800 | 15%",
    share: "Platform: 680 | Coach: 120",
    status: "Cancelled",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Cancelled"],
  },
  {
    id: "SES3002",
    explorer: { photo: asset, fullName: "Priya Jain", explorerId: "EXP102", UG: "BBA" },
    coach: {},
    date: "2025-07-16",
    time: "1:00 PM",
    type: "Ask Q",
    objective: "Career Transition",
    amount: 500,
    fees: "500 | 10%",
    share: "Platform: 450 | Coach: 50",
    status: "inPool",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Cancelled"],
  },
  {
    id: "SES3003",
    explorer: { photo: asset, fullName: "Kunal Verma", explorerId: "EXP103", UG: "B.Sc Mathematics" },
    coach: { photo: asset, fullName: "Sneha Rathi", coachId: "COA103", careerType: "Educator" },
    date: "2025-07-17",
    time: "5:00 PM",
    type: "Phone",
    objective: "Career Planning",
    amount: 1000,
    fees: "1000 | 20%",
    share: "Platform: 800 | Coach: 200",
    status: "Cancelled",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Cancelled"],
  },
  {
    id: "SES2001",
    explorer: { photo: asset, fullName: "Aayush Kapoor", explorerId: "EXP001", UG: "B.Com (Hons)" },
    coach: { photo: asset, fullName: "Riya Sinha", coachId: "COA001", careerType: "Consultant" },
    date: "2025-07-20",
    time: "11:00 AM",
    type: "Video",
    objective: "Career Transition",
    amount: 1200,
    fees: "1200 | 20%",
    share: "Platform: 960 | Coach: 240",
    status: "Completed",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Coach Joined", "Logs:Recording", "Logs:Receipts"],
  },
  {
    id: "SES2002",
    explorer: { photo: asset, fullName: "Neha Sharma", explorerId: "EXP002", UG: "B.Sc Physics" },
    coach: {},
    date: "2025-07-15",
    time: "2:00 PM",
    type: "Phone",
    objective: "Career Consulting",
    amount: 1000,
    fees: "1000 | 18%",
    share: "Platform: 820 | Coach: 180",
    status: "inPool",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Coach Joined", "Logs:Recording", "Logs:Receipts"],
  },
  {
    id: "SES2003",
    explorer: { photo: asset, fullName: "Yuvraj Singh", explorerId: "EXP003", UG: "B.A. History" },
    coach: {},
    date: "2025-07-10",
    time: "4:30 PM",
    type: "In-person",
    objective: "Career Counseling",
    amount: 1500,
    fees: "1500 | 25%",
    share: "Platform: 1125 | Coach: 375",
    status: "inPool",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Coach Joined", "Logs:Recording", "Logs:Receipts"],
  },
  {
    id: "SES2004",
    explorer: { photo: asset, fullName: "Neha Sharma", explorerId: "EXP002", UG: "B.Sc Physics" },
    coach: { photo: asset, fullName: "Raj Mehta", coachId: "COA002", careerType: "Mentor" },
    date: "2025-07-15",
    time: "2:00 PM",
    type: "Phone",
    objective: "Career Consulting",
    amount: 1000,
    fees: "1000 | 18%",
    share: "Platform: 820 | Coach: 180",
    status: "Completed",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Coach Joined", "Logs:Recording", "Logs:Receipts"],
  },
  {
    id: "SES2005",
    explorer: { photo: asset, fullName: "Yuvraj Singh", explorerId: "EXP003", UG: "B.A. History" },
    coach: { photo: asset, fullName: "Sneha Verma", coachId: "COA003", careerType: "Educator" },
    date: "2025-07-10",
    time: "4:30 PM",
    type: "In-person",
    objective: "Career Counseling",
    amount: 1500,
    fees: "1500 | 25%",
    share: "Platform: 1125 | Coach: 375",
    status: "Completed",
    actions: ["View", "Cancel", "Flag", "Logs:Booked", "Logs:Accepted", "Logs:Explorer Joined", "Logs:Coach Joined", "Logs:Recording", "Logs:Receipts"],
  },
];

/* --------------------------- ASSIGN COACH MODAL -------------------------- */
interface CoachAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
  currentCoach: string;
  onAssignCoach: (assessmentId: string, coachId: string) => void;
}

function CoachAssignmentModal({
  isOpen,
  onClose,
  assessmentId,
  currentCoach,
  onAssignCoach,
}: CoachAssignmentModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedCoach("");
      setShowSuggestions(false);
    }
  }, [isOpen]);

  const filteredCoaches = useMemo(
    () =>
      coachesList.filter(
        (coach) =>
          coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coach.id.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const resolveTypedCoachId = () => {
    if (selectedCoach) return selectedCoach;
    const t = searchTerm.trim().toLowerCase();
    if (!t) return "";
    const byId = coachesList.find((c) => c.id.toLowerCase() === t);
    if (byId) return byId.id;
    const byName = coachesList.find((c) => c.name.toLowerCase() === t);
    if (byName) return byName.id;
    const parts = t.split("-").map((s) => s.trim());
    if (parts.length === 2) {
      const maybeId = parts[1];
      const bySplit = coachesList.find((c) => c.id.toLowerCase() === maybeId);
      if (bySplit) return bySplit.id;
    }
    return "";
  };

  const handleSelect = (coach: any) => {
    setSearchTerm(`${coach.name} - ${coach.id}`);
    setSelectedCoach(coach.id);
    setShowSuggestions(false);
  };

  const handleAssignCoach = () => {
    const finalId = resolveTypedCoachId();
    if (finalId) {
      onAssignCoach(assessmentId, finalId);
      onClose();
    }
  };

  const handleRemoveCoach = () => {
    onAssignCoach(assessmentId, ""); // remove
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative w-full max-w-[500px] rounded-xl bg-[var(--background)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--text-head)]">Assign Coach</h2>
          <button className="text-sm text-[var(--brand-color)] p-0 h-auto hover:text-[var(--brand-color2)]" onClick={onClose}>✕</button>
        </div>

        <div className="mb-4 relative">
          <label className="text-base text-[var(--text)] mb-2 block">Select Coach:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setSelectedCoach(""); setShowSuggestions(true); }}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAssignCoach(); } }}
            autoFocus
            className="w-full p-2 border rounded-md bg-[var(--background)] text-[var(--text)] text-sm"
            placeholder="Type coach name or ID..."
          />
          {showSuggestions && searchTerm && (
            <ul className="absolute z-50 w-full bg-[var(--background)] border rounded-md mt-1 max-h-48 overflow-auto">
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <li key={coach.id} className="px-4 py-2 cursor-pointer hover:bg-[var(--faded)] text-sm text-[var(--text)]" onClick={() => handleSelect(coach)}>
                    {coach.name} - {coach.id} ({coach.specialization})
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-[var(--text)] text-sm">No matches found</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          {currentCoach && (
            <Button variant="delete" size="sm" onClick={handleRemoveCoach}>
              Remove Coach
            </Button>
          )}
          <Button variant="border" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="brand" size="sm" onClick={handleAssignCoach} disabled={!resolveTypedCoachId()}>
            Assign Coach
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- MAIN TABLE ------------------------------ */
export function AllSessionsTable() {
  const [rows, setRows] = useState<typeof tableData>(tableData);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof tableData>(rows[0] ? [rows[0]] : []);
  const [focusedId, setFocusedId] = useState<string | null>(rows[0]?.id || null);

  // Assign popup state
  const [isCoachAssignmentOpen, setIsCoachAssignmentOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [selectedCurrentCoach, setSelectedCurrentCoach] = useState("");

  const handleOpenCoachAssignment = (assessmentId: string, currentCoachId?: string) => {
    setSelectedAssessmentId(assessmentId);
    setSelectedCurrentCoach(currentCoachId ?? ""); // always store a string
    setIsCoachAssignmentOpen(true);
  };
  const handleCloseCoachAssignment = () => {
    setIsCoachAssignmentOpen(false);
    setSelectedAssessmentId("");
    setSelectedCurrentCoach("");
  };
  const handleAssignCoach = (assessmentId: string, coachId: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== assessmentId) return r;
        if (!coachId) return { ...r, coach: {} as any }; // remove
        const c = coachesList.find((x) => x.id === coachId);
        if (!c) return r;
        return {
          ...r,
          coach: {
            photo: c.photo || asset,
            fullName: c.name,
            coachId: c.id,
            careerType: c.specialization,
          },
        };
      })
    );
    handleCloseCoachAssignment();
  };

  // Sorting
  const getSortValue = (row: (typeof rows)[number], key: string) => {
    switch (key) {
      case "fullName":
        return row.explorer.fullName?.toLowerCase() ?? "";
      case "assignCoach":
        return row.coach?.coachId?.toLowerCase?.() ?? "";
      case "date":
        return row.date ?? "";
      case "type":
        return row.type ?? "";
      case "objective":
        return row.objective ?? "";
      case "amount":
        return row.amount ?? 0;
      case "fees":
        return row.fees ?? "";
      case "share":
        return row.share ?? "";
      case "status":
        return row.status ?? "";
      default:
        return "";
    }
  };

  const sortedData = [...rows];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const va = getSortValue(a, sortConfig.key);
      const vb = getSortValue(b, sortConfig.key);
      if (va < vb) return sortConfig.direction === "ascending" ? -1 : 1;
      if (va > vb) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) setSelectedUsers([]);
    else setSelectedUsers(currentRecords.map((u) => u.id));
  };

  const bringToTop = (userId: string) => {
    const found = selectedStack.find((c) => c.id === userId);
    if (found) {
      setSelectedStack((prev) => [found, ...prev.filter((c) => c.id !== userId)]);
      setFocusedId(userId);
    }
  };

  useEffect(() => {
    const all = document.querySelectorAll("tr[data-id]");
    all.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedStack.some((c) => c.id === id);
      const isTop = focusedId === id;
      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");
      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedStack, focusedId]);

  const handleRowClick = (user: (typeof rows)[0]) => {
    const exists = selectedStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedStack((prev) => [user, ...prev].slice(0, 5));
      setFocusedId(user.id);
    } else {
      bringToTop(user.id);
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Header row */}
        <div className="flex items-center justify-between border-b h-20 p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">Select All</label>
              {selectedUsers.length > 0 && <Badge variant="border" className="ml-2">{selectedUsers.length} selected</Badge>}
            </div>

            {selectedUsers.length > 0 && (
              <div className="flex gap-2 ml-2">
                <Button variant="border" size="sm"><Check className="h-4 w-4 text-[var(--green)]" />Approve</Button>
                <Button variant="delete" size="sm"><X className="h-4 w-4 text-[var(--red)]" />Archive</Button>
                <Button variant="border" size="sm"><Eye className="h-4 w-4" />View</Button>
                <Button variant="border" size="sm"><Newspaper className="h-4 w-4" />Track</Button>
                <Button variant="border" size="sm"><FileDown className="h-4 w-4" />Export</Button>
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-4">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input placeholder="Search" className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-40 sm:w-45" />
              <Button type="submit" size="icon" variant="standard" className="rounded-none rounded-r-md bg-[var(--button)]" aria-label="Search">
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]" />
                <TableHead onClick={() => requestSort("fullName")} className="cursor-pointer text-[var(--text)] text-low">
                  Explorer {sortConfig?.key === "fullName" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("assignCoach")} className="cursor-pointer text-[var(--text)]">
                  Coach {sortConfig?.key === "assignCoach" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("date")} className="cursor-pointer text-[var(--text)]">
                  When {sortConfig?.key === "date" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("type")} className="cursor-pointer text-[var(--text)]">
                  Type {sortConfig?.key === "type" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("objective")} className="cursor-pointer text-[var(--text)]">
                  Objective {sortConfig?.key === "objective" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("amount")} className="cursor-pointer text-[var(--text)]">
                  Amount {sortConfig?.key === "amount" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("fees")} className="cursor-pointer text-[var(--text)]">
                  Fees / % {sortConfig?.key === "fees" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("share")} className="cursor-pointer text-[var(--text)]">
                  Share {sortConfig?.key === "share" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("status")} className="cursor-pointer text-[var(--text)]">
                  Status {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-10 text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => {
                return (
                  <TableRow
                    key={user.id}
                    data-id={user.id}
                    className={cn(
                      "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                      selectedStack.some((c) => c.id === user.id) ? "bg-[var(--brand-color3)]" : ""
                    )}
                    onClick={() => { toggleSelectUser(user.id); handleRowClick(user); }}
                  >
                    <TableCell
                      className={cn(
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                        selectedStack.some((c) => c.id === user.id)
                          ? focusedId === user.id ? "border-[var(--brand-color)]" : "border-transparent"
                          : "border-transparent"
                      )}
                    >
                      <Checkbox checked={selectedUsers.includes(user.id)} onClick={(e) => e.stopPropagation()} onCheckedChange={() => toggleSelectUser(user.id)} />
                    </TableCell>

                    {/* Explorer */}
                    <TableCell>
                      <div className="flex items-center gap-2 group">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img src={user.explorer.photo} alt={user.explorer.fullName} className="h-10 w-10 object-cover" />
                        </div>
                        <div>
                          <div className="flex justify-start flex-col">
                            <div className="font-medium">{user.explorer.fullName}</div>
                            <div className="text-xs">{user.explorer.explorerId}</div>
                            <div className="text-[10px]">{user.explorer.UG}</div>
                            <div className="flex items-center gap-1">
                              <CustomTooltip tooltipText="Call"><Phone className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                              <span className="hidden group-hover:inline-flex items-center text-[15px]">|</span>
                              <CustomTooltip tooltipText="Message"><MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                   {/* Coach */}
<TableCell>
  <div
    className="w-[180px] text-sm group/coach"
    onClick={(e) => e.stopPropagation()}
  >
    {(() => {
      const hasCoach =
        !!(user as any)?.coach &&
        !!(user as any).coach?.coachId &&
        String((user as any).coach.coachId).trim() !== "";

      // Try to enrich from coachesList, but fall back to the row data
      const coachFromList =
        hasCoach
          ? coachesList.find(
              (c) =>
                c.id.toLowerCase() ===
                String(user.coach.coachId).toLowerCase()
            )
          : null;

      const coachCard = hasCoach
        ? {
            id: coachFromList?.id ?? String(user.coach.coachId),
            name: coachFromList?.name ?? (user.coach as any).fullName ?? "Coach",
            photo: coachFromList?.photo ?? (user.coach as any).photo,
            specialization:
              coachFromList?.specialization ??
              (user.coach as any).careerType ??
              "",
          }
        : null;

      // ── Assigned: mirror Explorer row layout ───────────────────────────────
      if (hasCoach && coachCard) {
        return (
          <div className="flex items-center justify-between gap-3 min-w-[260px]">
            <div className="flex items-center gap-3 group">
              {coachCard.photo ? (
                <img
                  src={coachCard.photo}
                  alt={coachCard.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--faded)] grid place-items-center text-xs">
                  {coachCard.name?.slice(0, 1)?.toUpperCase() ?? "C"}
                </div>
              )}

              <div className="flex flex-col ">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--text)]">
                    {coachCard.name}
                  </span>
                    {user.status === "inPool" && (
                     <CustomTooltip tooltipText="Re-Assign"><SquarePen className="h-3 w-3 hover:h-4 hover:w-4"  onClick={() =>
                      handleOpenCoachAssignment(user.id, coachCard.id)
                    }/>
                    </CustomTooltip>
                  )}
                </div>
                <div className="text-xs text-[var(--text)]">{coachCard.id}</div>
                <div className="text-[10px] text-[var(--text)]">
                  {coachCard.specialization}
                </div>
                <div className="flex items-center gap-1">
                  <CustomTooltip tooltipText="Call"><Phone className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                  <span className="hidden group-hover:inline-flex items-center text-[15px]">|</span>
                  <CustomTooltip tooltipText="Message"><MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // ── Not assigned: round “+” avatar opens popup ─────────────────────────
      return (
        <button
          type="button"
          aria-label="Assign coach"
          className="flex items-center gap-3 min-h-[40px]"
          onClick={() => handleOpenCoachAssignment(user.id, "")}
        >
          <div className="w-10 h-10 rounded-full bg-[var(--faded)] grid place-items-center text-[var(--text)]/70">
            <Plus className="h-4 w-4" />
          </div>
          <span className="text-sm text-[var(--text)]/70">Assign</span>
        </button>
      );
    })()}
  </div>
</TableCell>



                    {/* When */}
                    <TableCell>
                      <div className="text-sm flex flex-col gap-1 group">
                        <div>{user.date}</div>
                        <div>{user.time}</div>
                        <div className="flex items-center gap-1">
                          <CustomTooltip tooltipText="Reschedule"><Calendar1 className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell><div className="text-sm">{user.type}</div></TableCell>
                    <TableCell><div className="text-sm max-w-[160px] break-words whitespace-normal">{user.objective}</div></TableCell>
                    <TableCell><div className="text-sm">{user.amount}</div></TableCell>

                    <TableCell>
                      <div className="text-sm flex flex-col gap-1 items-center">
                        <p className="text-[var(--text)]">{user.fees.split(" | ")[0]}</p>
                        <Badge variant="brand" className="text-[var(--text)] text-xs ml-1">{user.fees.split(" | ")[1]}</Badge>
                      </div>
                    </TableCell>

                    <TableCell><div className="text-sm max-w-[160px] break-words whitespace-normal">{user.share}</div></TableCell>
                    <TableCell><Badge variant="standard">{user.status}</Badge></TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center pr-4">
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <Eye className="h-4 w-4" /><span className="sr-only">View</span>
                            </Button>
                          </TooltipTrigger><TooltipContent side="top" className="text-xs">View</TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <X className="h-4 w-3 text-[var(--red)]" /><span className="sr-only">Cancel</span>
                            </Button>
                          </TooltipTrigger><TooltipContent side="top" className="text-xs">Cancel</TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <Flag className="h-4 w-3" /><span className="sr-only">Flag</span>
                            </Button>
                          </TooltipTrigger><TooltipContent side="top" className="text-xs">Flag</TooltipContent></Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip><TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <NotebookIcon className="h-4 w-3" /><span className="sr-only">Logs</span>
                            </Button>
                          </TooltipTrigger><TooltipContent side="top" className="text-xs">Logs</TooltipContent></Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="border" size="sm" className="flex items-center gap-2 text-low text-[var(--text-head)]">
                  {recordsPerPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-[var(--text] dark:bg-[var(--background)]">
                {[10, 25, 50, 100].map((size) => (
                  <DropdownMenuItem key={size} onClick={() => { setRecordsPerPage(size); setCurrentPage(1); }} className="text-[var(--text)] focus:bg-[var(--faded)]">
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-low text-[var(--text)]">
              Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length} explorers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="border" size="icon" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "brand" : "border"}
                size="sm"
                className={`h-8 w-8 p-0 ${page === currentPage ? "text-white" : "text-[var(--text)]"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="border" size="icon" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Assign/Reassign popup */}
      <CoachAssignmentModal
        isOpen={isCoachAssignmentOpen}
        onClose={handleCloseCoachAssignment}
        assessmentId={selectedAssessmentId}
        currentCoach={selectedCurrentCoach}
        onAssignCoach={handleAssignCoach}
      />
    </div>
  );
}
