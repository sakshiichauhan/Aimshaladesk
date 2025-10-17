import { useEffect, useMemo, useState } from "react";
import {
  Eye, Search,
  ChevronDown, ChevronLeft, ChevronRight,
  FileText,
  Users,
  MapPin,
  Video,
  MessageSquare,
  Phone
} from "lucide-react";

/* shadcn/ui */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import{
  Breadcrumb,
BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

/* utils */
import { cn } from "@/lib/utils";
import { useCoachDetailModal } from "./coachExpertiseViewDetails";



export default function CoachExpertise() {

  return (
    <div className="flex flex-col gap-2">
        <Topbar />
        <CoachExpertiseTable/>
      </div>
  );
}

function Topbar() {
  
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center h-16 px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Sessions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Coach Expertise</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
    </div>
)}





type ExpertiseMode = {
  call?: boolean;
  video?: boolean;
  chat?: boolean;
  inPerson?: boolean;
  group?: boolean;
  resources?: boolean;
};

type Expertise = {
  label: string;
  available: boolean;   // ⟵ single on/off status
  modes?: ExpertiseMode;
};

type CoachExpertiseRow = {
  id: string;
  name: string;
  code: string;
  avatarUrl?: string;
  coachType: "Consultant" | "Coach" | "Mentor";
  expertise: Expertise[];  // ⟵ pills with single status color
  feeText: string;
  status: "active" | "inactive";
};

export const COACH_EXPERTISE_DATA: CoachExpertiseRow[] = [
  {
    id: "c1",
    name: "Dr. Jane Smith",
    code: "Cons1254",
    avatarUrl: "https://i.pravatar.cc/64?img=47",
    coachType: "Consultant",
    feeText: "Standard -20%",
    status: "active",
    expertise: [
      { label: "Academic Consultation",  available: true,  modes: { call: true, video: true, chat: true } },
      { label: "International Study",    available: false, modes: { call: true, video: true, resources: true } },
      { label: "Career Consultation",     available: true,  modes: { call: true, video: true, inPerson: true } },
      { label: "Emotional Well-being",    available: true,  modes: { video: true, chat: true, group: true } },
      { label: "Doubt Pucho",             available: true,  modes: { chat: true } },
      { label: "Resources",               available: false, modes: { resources: true } },
    ],
  },
  {
    id: "c2",
    name: "Arun Mehra",
    code: "Coach9821",
    avatarUrl: "https://i.pravatar.cc/64?img=12",
    coachType: "Coach",
    feeText: "Premium -10%",
    status: "active",
    expertise: [
      { label: "Career Consultation",     available: true,  modes: { call: true, video: true } },
      { label: "Interview Prep",          available: true,  modes: { video: true, chat: true, resources: true } },
      { label: "Leadership Coaching",     available: false, modes: { call: true, inPerson: true } },
    ],
  },
  {
    id: "c3",
    name: "Prof. Kavita Rao",
    code: "Ment4510",
    avatarUrl: "https://i.pravatar.cc/64?img=30",
    coachType: "Mentor",
    feeText: "Standard",
    status: "active",
    expertise: [
      { label: "Academic Consultation",   available: true,  modes: { video: true, chat: true } },
      { label: "Scholarship Guidance",    available: false, modes: { resources: true, video: true } },
      { label: "International Study",     available: true,  modes: { call: true, video: true } },
    ],
  },
];


function CoachExpertiseTable() {
  // table state
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: "name" | "coachType" | "feeText" | "status"; direction: "ascending" | "descending"; } | null>(null);

  // highlight stack (kept)
  const [selectedStack, setSelectedStack] = useState<CoachExpertiseRow[]>(COACH_EXPERTISE_DATA[0] ? [COACH_EXPERTISE_DATA[0]] : []);
  const [focusedId, setFocusedId] = useState<string | null>(COACH_EXPERTISE_DATA[0]?.id || null);

  //view details
  const { openCoachDetail, Modal } = useCoachDetailModal();

  // search
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return COACH_EXPERTISE_DATA;
    const q = query.toLowerCase();
    return COACH_EXPERTISE_DATA.filter((row) => {
      const expText = row.expertise.map(e => e.label).join(" ").toLowerCase();
      return (
        row.name.toLowerCase().includes(q) ||
        row.code.toLowerCase().includes(q) ||
        row.coachType.toLowerCase().includes(q) ||
        expText.includes(q)
      );
    });
  }, [query]);

  // sorting
  const sortedData = useMemo(() => {
    const data = [...filtered];
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    data.sort((a, b) => {
      const av = (a as any)[key] ?? "";
      const bv = (b as any)[key] ?? "";
      if (av < bv) return direction === "ascending" ? -1 : 1;
      if (av > bv) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    return data;
  }, [filtered, sortConfig]);

  // pagination
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const requestSort = (key: "name" | "coachType" | "feeText" | "status") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentRecords.length) setSelectedRows([]);
    else setSelectedRows(currentRecords.map((r) => r.id));
  };

  const toggleSelectRow = (rowId: string) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const bringToTop = (rowId: string) => {
    const row = selectedStack.find((r) => r.id === rowId);
    if (row) {
      setSelectedStack((prev) => [row, ...prev.filter((r) => r.id !== rowId)]);
      setFocusedId(rowId);
    }
  };

  const handleRowClick = (row: CoachExpertiseRow) => {
    const exists = selectedStack.find((r) => r.id === row.id);
    if (!exists) {
      setSelectedStack((prev) => [row, ...prev].slice(0, 5));
      setFocusedId(row.id);
    } else bringToTop(row.id);
    toggleSelectRow(row.id);
  };

  // highlight styles (kept)
  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedStack.some((r) => r.id === id);
      const isTop = focusedId === id;
      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");
      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedStack, focusedId]);

  const ModeIcons = ({ m }: { m?: ExpertiseMode }) => {
    if (!m) return null;
    return (
      <span className="inline-flex items-center gap-1 ml-2 text-[10px] opacity-80">
        {m.call && <Phone className="h-3 w-3" />}
        {m.video && <Video className="h-3 w-3" />}
        {m.chat && <MessageSquare className="h-3 w-3" />}
        {m.inPerson && <MapPin className="h-3 w-3" />}
        {m.group && <Users className="h-3 w-3" />}
        {m.resources && <FileText className="h-3 w-3" />}
      </span>
    );
  };

  const ExpertisePill = ({ e }: { e: Expertise }) => (
    <div className="whitespace-nowrap rounded-full border px-2 py-1 text-xs flex items-center gap-2 bg-[var(--background)]">
      <span
      className={cn(
        "h-2.5 w-2.5 rounded-full inline-block",
        e.available ? "bg-[var(--green)]" : "bg-[var(--red)]"
      )}
      aria-label={e.available ? "Available" : "Unavailable"}
    />
      <span className="font-medium">{e.label}</span>
      <ModeIcons m={e.modes} />
    </div>
  );

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b h-20 p-4 mt-auto">
          <div className="flex items-center pl-0 p-4 gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedRows.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">Select All</label>
              {selectedRows.length > 0 && <Badge variant="border" className="ml-2">{selectedRows.length} selected</Badge>}
            </div>
          </div>

          <div className="flex justify-end items-center gap-4">
            <div className="flex justify-around items-center rounded-sm overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search by name, code, type or expertise…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-52 sm:w-60"
              />
              <Button type="button" size="icon" variant="standard" className="rounded-none rounded-r-md bg-[var(--button)]" aria-label="Search">
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0">
          <Table className="w-full caption-top border-collapse">
            <TableHeader className="bg-[var(--faded)]">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead onClick={() => requestSort("name")} className="cursor-pointer min-w-[260px]">
                  Coach Info. {sortConfig?.key === "name" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead onClick={() => requestSort("coachType")} className="cursor-pointer min-w-[120px]">
                  Type {sortConfig?.key === "coachType" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="min-w-[520px]">All Expertise</TableHead>
                <TableHead onClick={() => requestSort("feeText")} className="cursor-pointer min-w-[140px]">
                  Aimshala Fees {sortConfig?.key === "feeText" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="w-[10px] text-center pr-4">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentRecords.map((row) => (
                <TableRow
                  key={row.id}
                  data-id={row.id}
                  className={cn(
                    "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                    selectedStack.some((r) => r.id === row.id) ? "bg-[var(--brand-color3)]" : ""
                  )}
                  onClick={() => handleRowClick(row)}
                >
                  {/* selection */}
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 hover:border-[var(--brand-color)]",
                      selectedStack.some((r) => r.id === row.id)
                        ? focusedId === row.id
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectRow(row.id)}
                    />
                  </TableCell>

                  {/* Coach Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={row.avatarUrl} alt={row.name} className="h-10 w-10 rounded-full object-cover border" />
                        <span className="absolute -right-0 -bottom-0 h-2.5 w-2.5 rounded-full bg-[var(--green)] ring-2 ring-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-xs text-[var(--text)]/70">{row.code}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <Badge variant="standard">{row.coachType}</Badge>
                  </TableCell>

                  {/* All Expertise */}
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {row.expertise.map((e, idx) => (
                        <ExpertisePill key={row.id + idx} e={e} />
                      ))}
                    </div>
                  </TableCell>

                  {/* Fees */}
                  <TableCell>
                    <div className="text-sm">{row.feeText}</div>
                  </TableCell>

                  {/* actions */}
                  <TableCell>
                    <div className="flex items-center justify-center pr-4">
                      <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
  <Button
    variant="actionIcon"
    size="actionIcon"
    onClick={(e) => {
      e.stopPropagation();
      openCoachDetail(row); 
    }}
  >
    <Eye className="h-3 w-3" />
    <span className="sr-only">View</span>
  </Button>
</TooltipTrigger>

                          <TooltipContent><p>View Details</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="border" size="sm" className="flex items-center gap-2 text-[var(--text-head)]">
                  {recordsPerPage} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-[var(--text)]">
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
            <span className="text-[var(--text)]">
              Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length} rows
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
        {Modal}
      </div>
    </div>
  );
}