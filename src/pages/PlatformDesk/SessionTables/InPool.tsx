import { useEffect, useMemo, useState } from "react";
import {
  Search, Check, X, FileDown, Newspaper, Flag, NotebookIcon,
  Phone, MessageCircle, Plus, Calendar1, Eye,
  ChevronDown, ChevronRight, ChevronLeft, SquarePen
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";
import { cn } from "@/lib/utils";
import asset from "@/assets/asset.jpg";
import { coachesList } from "@/data/Data";
import { useNavigate } from "react-router-dom";

/* -------------------------- DUMMY DATA (in-pool) -------------------------- */
/* All entries begin with NO coach assigned */
const tData = [
  {
    id: "APP1001",
    explorer: { photo: asset, fullName: "Aayush Kapoor", explorerId: "EX12345", UG: "B.Com" },
    assignCoach: "",
    date: "2025-07-30",
    time: "10:00 AM",
    type: "Instant - Phone",
    objective: "Career Consulting",
    amount: 1200,
    feesOrPercent: "500 | 20%",
    share: "600",
    status: "Booked",
    actions: ["View", "Cancel", "Flag", "Logs"]
  },
  {
    id: "APP1002",
    explorer: { photo: asset, fullName: "Tanya Mehra", explorerId: "EX12346", UG: "BA Psychology" },
    assignCoach: "",
    date: "2025-07-29",
    time: "12:30 PM",
    type: "Introductory - Video",
    objective: "Career Transition",
    amount: 1500,
    feesOrPercent: "300 | 25%",
    share: "750",
    status: "Pending",
    actions: ["View", "Cancel", "Logs"]
  },
  {
    id: "APP1003",
    explorer: { photo: asset, fullName: "Harshdeep Kaur", explorerId: "EX12347", UG: "B.Tech" },
    assignCoach: "",
    date: "2025-07-28",
    time: "2:00 PM",
    type: "Phone",
    objective: "Career Consulting",
    amount: 1000,
    feesOrPercent: "200 | 20%",
    share: "500",
    status: "Completed",
    actions: ["View", "Logs"]
  },
  {
    id: "APP1004",
    explorer: { photo: asset, fullName: "Manav Khanna", explorerId: "EX12348", UG: "B.Sc" },
    assignCoach: "",
    date: "2025-08-01",
    time: "4:30 PM",
    type: "B2B - Video",
    objective: "Career Transition",
    amount: 2500,
    feesOrPercent: "750 | 30%",
    share: "1250",
    status: "Booked",
    actions: ["View", "Cancel", "Logs"]
  },
  {
    id: "APP1005",
    explorer: { photo: asset, fullName: "Nikhil Sharma", explorerId: "EX12349", UG: "BBA" },
    assignCoach: "",
    date: "2025-08-03",
    time: "11:00 AM",
    type: "AskQ",
    objective: "Career Consulting",
    amount: 700,
    feesOrPercent: "150 | 21%",
    share: "350",
    status: "Cancelled",
    actions: ["View", "Logs"]
  }
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
  onAssignCoach
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

  const handleSelect = (coach: any) => {
    setSearchTerm(`${coach.name} - ${coach.id}`);
    setSelectedCoach(coach.id);
    setShowSuggestions(false);
  };

  const handleAssignCoach = () => {
    if (selectedCoach) {
      onAssignCoach(assessmentId, selectedCoach);
      onClose();
    }
  };

  const handleRemoveCoach = () => {
    onAssignCoach(assessmentId, "");
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
            onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
            className="w-full p-2 border rounded-md bg-[var(--background)] text-[var(--text)] text-sm"
            placeholder="Type coach name or ID..."
          />
          {showSuggestions && searchTerm && (
            <ul className="absolute z-10 w-full bg-[var(--background)] border rounded-md mt-1 max-h-48 overflow-auto">
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <li
                    key={coach.id}
                    className="px-4 py-2 cursor-pointer hover:bg-[var(--faded)] text-sm text-[var(--text)]"
                    onClick={() => handleSelect(coach)}
                  >
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
          <Button variant="brand" size="sm" onClick={handleAssignCoach} disabled={!selectedCoach}>
            Assign Coach
          </Button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- TABLE --------------------------------- */
export function InPoolTable() {
  const [data, setData] = useState<typeof tData>(tData);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending"; } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof data>(data[0] ? [data[0]] : []);
  const [focusedId, setFocusedId] = useState<string | null>(data[0]?.id || null);

  const [isCoachAssignmentOpen, setIsCoachAssignmentOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [selectedCurrentCoach, setSelectedCurrentCoach] = useState("");

  const navigate = useNavigate();

  /* ------------------------------ Sorting map ----------------------------- */
  const getSortValue = (row: (typeof data)[number], key: string) => {
    switch (key) {
      case "fullName": return row.explorer.fullName?.toLowerCase() ?? "";
      case "assignCoach": return row.assignCoach?.toLowerCase?.() ?? "";
      case "date": return row.date ?? "";
      case "type": return row.type ?? "";
      case "objective": return row.objective ?? "";
      case "amount": return row.amount ?? 0;
      case "feesOrPercent": return row.feesOrPercent ?? "";
      case "share": return row.share ?? "";
      case "status": return row.status ?? "";
      default: return "";
    }
  };

  const sortedData = [...data];
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
    else setSelectedUsers(currentRecords.map((user) => user.id));
  };

  const bringToTop = (userId: string) => {
    const found = selectedStack.find((c) => c.id === userId);
    if (found) {
      setSelectedStack((prev) => [found, ...prev.filter((c) => c.id !== userId)]);
      setFocusedId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedStack.some((coach) => coach.id === id);
      const isTop = focusedId === id;

      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");
      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedStack, focusedId]);

  const handleRowClick = (user: (typeof data)[0]) => {
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

  const handleOpenCoachAssignment = (assessmentId: string, currentCoach: string) => {
    setSelectedAssessmentId(assessmentId);
    setSelectedCurrentCoach(currentCoach);
    setIsCoachAssignmentOpen(true);
  };

  const handleCloseCoachAssignment = () => {
    setIsCoachAssignmentOpen(false);
    setSelectedAssessmentId("");
    setSelectedCurrentCoach("");
  };

  const handleAssignCoach = (assessmentId: string, coachId: string) => {
    // remove
    if (!coachId) {
      setData((prev) => prev.map((row) => (row.id === assessmentId ? { ...row, assignCoach: "" } : row)));
      handleCloseCoachAssignment();
      return;
    }
    // normal assign
    const coach = coachesList.find((c) => c.id === coachId);
    if (!coach) return;
    setData((prev) => prev.map((row) => (row.id === assessmentId ? { ...row, assignCoach: coach.id } : row)));
    handleCloseCoachAssignment();
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Top Bar */}
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
                <TableHead className="min-w-[40px]}"></TableHead>
                <TableHead onClick={() => requestSort("fullName")} className="cursor-pointer text-[var(--text)] text-low">
                  Explorer {sortConfig?.direction && sortConfig.key === "fullName" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("assignCoach")} className="cursor-pointer text-[var(--text)]">
                  Coach {sortConfig?.direction && sortConfig.key === "assignCoach" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("date")} className="cursor-pointer text-[var(--text)]">
                  When {sortConfig?.direction && sortConfig.key === "date" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("type")} className="cursor-pointer text-[var(--text)]">
                  Type {sortConfig?.direction && sortConfig.key === "type" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("objective")} className="cursor-pointer text-[var(--text)]">
                  Objective {sortConfig?.direction && sortConfig.key === "objective" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("amount")} className="cursor-pointer text-[var(--text)]">
                  Amount {sortConfig?.direction && sortConfig.key === "amount" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("feesOrPercent")} className="cursor-pointer text-[var(--text)]">
                  Fees / % {sortConfig?.direction && sortConfig.key === "feesOrPercent" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("share")} className="cursor-pointer text-[var(--text)]">
                  Share {sortConfig?.direction && sortConfig.key === "share" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("status")} className="cursor-pointer text-[var(--text)]">
                  Status {sortConfig?.direction && sortConfig.key === "status" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="text-[var(--text)] text-center pr-4 w-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                    selectedStack.some((c) => c.id === user.id) ? "bg-[var(--brand-color3)]" : ""
                  )}
                  onClick={() => { toggleSelectUser(user.id); handleRowClick(user); }}
                >
                  {/* Select */}
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 hover:border-[var(--brand-color)]",
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
                            <span className="group-hover:text-[var(--text)] hidden group-hover:inline-flex items-center gap-1 text-[15px]">|</span>
                            <CustomTooltip tooltipText="Message"><MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Coach */}
                  <TableCell>
                    <div className="w-[180px] text-sm group/coach" onClick={(e) => e.stopPropagation()}>
                      {user.assignCoach ? (() => {
                        const coach = coachesList.find((c) => c.id.toLowerCase() === user.assignCoach.toLowerCase());
                        return coach ? (
                          <div className="flex items-center justify-between gap-3 min-w-[260px]">
                            <div className="flex items-center gap-3 group">
                              {coach.photo ? (
                                <img src={coach.photo} alt={coach.name} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-[var(--faded)] grid place-items-center text-xs">
                                  {coach.name?.slice(0, 1)?.toUpperCase() ?? "C"}
                                </div>
                              )}

                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-[var(--text)]">{coach.name}</span>
                                  <CustomTooltip tooltipText="Re-Assign">
                                    <SquarePen
                                      className="h-3 w-3 hover:h-4 hover:w-4"
                                      onClick={() => handleOpenCoachAssignment(user.id, user.assignCoach)}
                                    />
                                  </CustomTooltip>
                                </div>
                                <div className="text-xs text-[var(--text)]">{coach.id}</div>
                                <div className="text-[10px] text-[var(--text)]">{coach.specialization}</div>
                                <div className="flex items-center gap-1">
                                  <CustomTooltip tooltipText="Call"><Phone className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                                  <span className="hidden group-hover:inline-flex items-center text-[15px]">|</span>
                                  <CustomTooltip tooltipText="Message"><MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[var(--red)] text-xs">Coach not found</div>
                        );
                      })() : (
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
                      )}
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

                  <TableCell><div className="text-sm max-w-[100px] break-words whitespace-normal">{user.type}</div></TableCell>
                  <TableCell><div className="text-sm max-w-[100px] break-words whitespace-normal">{user.objective}</div></TableCell>
                  <TableCell><div className="text-sm">{user.amount}</div></TableCell>

                  <TableCell>
                    <div className="text-sm flex flex-col gap-1 items-center">
                      <p className="text-[var(--text)]">{user.feesOrPercent.split(" | ")[0]}</p>
                      <Badge variant="brand" className="text-[var(--text)] text-xs ml-1">{user.feesOrPercent.split(" | ")[1]}</Badge>
                    </div>
                  </TableCell>

                  <TableCell><div className="text-sm">{user.share}</div></TableCell>
                  <TableCell><Badge variant="standard">{user.status}</Badge></TableCell>

                  {/* Row actions */}
                  <TableCell>
                    <div className="flex items-center justify-center pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              onClick={(e) => { e.stopPropagation(); navigate(`view-session`); }}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">View</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <X className="h-4 w-3 text-[var(--red)]" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">Cancel</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <Flag className="h-4 w-3" />
                              <span className="sr-only">Flag</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">Flag</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon" onClick={(e) => e.stopPropagation()}>
                              <NotebookIcon className="h-4 w-3" />
                              <span className="sr-only">Logs</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">Logs</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
                  <DropdownMenuItem
                    key={size}
                    onClick={() => { setRecordsPerPage(size); setCurrentPage(1); }}
                    className="text-[var(--text)] focus:bg-[var(--faded)]"
                  >
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
            <Button variant="border" size="icon" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
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
            <Button
              variant="border"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Popup */}
            <CoachAssignmentModal
              isOpen={isCoachAssignmentOpen}
              onClose={handleCloseCoachAssignment}
              assessmentId={selectedAssessmentId}
              currentCoach={selectedCurrentCoach}
              onAssignCoach={handleAssignCoach}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
