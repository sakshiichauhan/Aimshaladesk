import {
  Clock,
  Search,
  Users,
  FileCheck2,
  FileText,
  CheckCircle2,
  Trash,
  FileDown,
  BadgeQuestionMark,
  Plus,
  Download,
  MessageCircle,
  NotebookPen,
  Pen,
  Bell,
  RotateCcw,
  Ban,
  Eye,
  RefreshCw,
  Phone,
  SquarePen,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { coachesList } from "@/data/Data";
import asset from "@/assets/asset.jpg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {SegmentsDrawerTrigger} from '@/pages/PlatformDesk/Assessment/AddSegment'


type AssessmentItem = {
  id: string;
  assessmentName: string;
  userName: string;
  userId: string;
  segments: string;
  date: string;
  source:
    | {
        type: "Direct";
      }
    | {
        type: "Partner";
        partnerName: string;
        commission: string;
        assessmentPrice: number;
        partnerShare: number;
        aimshalaShare: number;
        accessCode: string;
      };
  amountPaid: number;
  amountCode: string;
  status: string;
  assignCoach: string | null;
  result: number | null;
  actions: string[];
};

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import type { DateRange } from "react-day-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAssessments,
  selectAssessmentLoading,
  selectAssessmentError,
  fetchAssessments,
} from "@/store/slices/platformDesk/assessmentSlice";
import type { AppDispatch } from "@/store";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

const Stats = [
  {
    title: "Total Enrollments",
    value: "38",
    icon: Users,
  },
  {
    title: "Progress",
    value: "26",
    icon: FileCheck2,
  },
  {
    title: "Completed",
    value: "7",
    icon: FileText,
  },
  {
    title: "Started",
    value: "5",
    icon: Clock,
  },
  {
    title: "Total Revenue",
    value: "6",
    icon: CheckCircle2,
  },
  {
    title: "Via Partners",
    value: "6",
    icon: CheckCircle2,
  },
];

export function Assessments() {
  return (
    <div className="flex flex-col gap-2">
      <Topbar />
      <StatCard />
      <AssessmentTable />
    </div>
  );
}

function Topbar() {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <h1 className="text-2xl font-bold">
        <Breadcrumb>
        <BreadcrumbList>  
        <BreadcrumbItem>
      <BreadcrumbPage>Assessments</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="cursor-pointer"
          variant="standard"
          size="new"
          onClick={() => navigate("manage")}
        >
          <BadgeQuestionMark className="h-3 w-3" />
          <span className="">Manage</span>
        </Button>
        <SegmentsDrawerTrigger/>

        <Button variant="standard" size="new">
          <FileDown className="h-4 w-4" />
        </Button>
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>

        {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}
      </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
}
function AdvancedFilters({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Search");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }
      const target = e.target as HTMLElement;
      if (target.closest("[data-radix-popper-content-wrapper]")) {
        return;
      }
      onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Filter states
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("9-10");
  const [source, setSource] = useState("Direct");
  const [status, setStatus] = useState("Not Started");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const tabList = ["Search", "Date Range", "Segment", "Source", "Status"];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
      >
        <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Filters
          </CardTitle>
          <Button
            variant="link"
            className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
            onClick={() => {
              setSearch("");
              setSegment("9-10");
              setSource("Direct");
              setStatus("Not Started");
              setDateRange(undefined);
            }}
          >
            Clear All
          </Button>
        </div>
        {/* Sidebar */}
        <div className="flex ">
          <div className="overflow-y-auto min-w-[180px] border-r-1 h-[360px]">
            <div className="flex flex-col ">
              {tabList.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-left text-sm px-3 py-3 border-l-3  ${
                    activeTab === tab
                      ? "bg-[var(--brand-color3)] dark:bg-[var(--brand-color2)] text-[var(--brand-color)] dark:text-[var(--text-head)] font-semibold border-[var(--brand-color)]"
                      : "text-[var(--text)] hover:bg-[var(--faded)] border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto relative w-full">
            {activeTab === "Search" && (
              <>
                <label htmlFor="search" className="text-[var(--text)]">
                  Search (by Name, ID, Assessment, Code):
                </label>
                <Input
                  id="search"
                  placeholder="Enter search query..."
                  type="text"
                  className="mt-4 w-full "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range:
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </>
            )}

            {activeTab === "Segment" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Segment:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["9-10", "11-12", "UG", "PG", "Professionals"].map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2">
                        <Checkbox
                          checked={segment === option}
                          onCheckedChange={() => setSegment(option)}
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Source" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Source:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Direct", "Partners"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={source === option}
                        onCheckedChange={() => setSource(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Choose Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Not Started", "In Progress", "Completed"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={status === option}
                        onCheckedChange={() => setStatus(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}
            {/* Footer */}
          </div>
        </div>
        <div className="relative bottom-0 right-0 w-full px-6 py-4 flex border-t-1 justify-end gap-2">
          <div className="flex gap-4 absolute left-[50%] -translate-x-[50%]">
            <Button variant="border" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="brand" onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-6">
      {Stats.map((stat, index) => (
        <Card
          key={index}
          className="xl:rounded-sm shadow-none bg-[var(--background)]"
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

  const filteredCoaches = coachesList.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (coach: any) => {
    setSearchTerm(`${coach.name} - ${coach.id}`);
    setSelectedCoach(coach.id);
    setShowSuggestions(false);
  };

  const handleAssignCoach = () => {
    if (selectedCoach) {
      onAssignCoach(assessmentId, selectedCoach);
      onClose(); // ✅ close modal after assigning
    }
  };

  const handleRemoveCoach = () => {
    onAssignCoach(assessmentId, ""); // ✅ set to empty string
    onClose(); // ✅ close modal right away
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative w-full max-w-[500px] rounded-xl bg-[var(--background)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[var(--text-head)]">
            Assign Coach
          </h2>
          <button
            className="text-sm text-[var(--brand-color)] p-0 h-auto hover:text-[var(--brand-color2)]"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mb-4 relative">
          <label className="text-base text-[var(--text)] mb-2 block">
            Select Coach:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
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
                <li className="px-4 py-2 text-[var(--text)] text-sm">
                  No matches found
                </li>
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
          <Button variant="border" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="brand"
            size="sm"
            onClick={handleAssignCoach}
            disabled={!selectedCoach}
          >
            Assign Coach
          </Button>
        </div>
      </div>
    </div>
  );
}

function AssessmentTable() {
  const dispatch = useDispatch<AppDispatch>();
  const assessments = useSelector(selectAssessments);
  const loading = useSelector(selectAssessmentLoading);
  const error = useSelector(selectAssessmentError);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [isCoachAssignmentOpen, setIsCoachAssignmentOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [selectedCurrentCoach, setSelectedCurrentCoach] = useState("");

  // Local state for coach assignments
  const [assessmentsWithCoaches, setAssessmentsWithCoaches] = useState<
    AssessmentItem[]
  >([]);

  // Merge Redux data with local coach assignments
  useEffect(() => {
    if (assessments.length > 0) {
      setAssessmentsWithCoaches(
        assessments.map((assessment) => ({
          ...assessment,
          assignCoach: assessment.assignCoach || null, // Preserve existing or set null
        }))
      );
    }
  }, [assessments]);

  // // Loading and error states
  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!assessmentsWithCoaches.length) return <div>No assessments found</div>;
  // ... existing code ...
 
if (loading) return (
  <div className="flex flex-col gap-4 w-full">
    {/* Skeleton for the top bar */}
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div className="h-6 w-48 bg-[var(--faded)] rounded animate-pulse"></div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-24 bg-[var(--faded)] rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
      </div>
    </div>

    {/* Skeleton for the stat cards */}
    <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="p-4 rounded-sm bg-[var(--background)]">
          <div className="h-4 w-24 bg-[var(--faded)] rounded animate-pulse mb-4"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-[var(--faded)] rounded-full animate-pulse"></div>
            <div className="h-6 w-12 bg-[var(--faded)] rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Skeleton for the table */}
    <div className="rounded-md border bg-[var(--background)] overflow-x-auto">
      {/* Table header skeleton */}
      <div className="flex items-center justify-between border-b h-20 p-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-[var(--faded)] rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-[var(--faded)] rounded animate-pulse"></div>
        </div>
        <div className="h-8 w-40 bg-[var(--faded)] rounded animate-pulse"></div>
      </div>

      {/* Table skeleton */}
      <div className="p-4">
        <div className="space-y-4">
          {/* Table header row skeleton */}
          <div className="grid grid-cols-10 gap-4">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="h-6 bg-[var(--faded)] rounded animate-pulse"></div>
            ))}
          </div>

          {/* Table body rows skeleton */}
          {Array(5).fill(0).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-10 gap-4">
              {Array(10).fill(0).map((_, colIndex) => (
                <div key={colIndex} className="h-12 bg-[var(--faded)] rounded animate-pulse"></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between p-4">
        <div className="h-8 w-24 bg-[var(--faded)] rounded animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
          ))}
          <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);


  // Sorting logic
  const sortedData = [...assessmentsWithCoaches];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue && bValue) {
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        currentRecords
          .map((user) => user.id)
          .filter((id): id is string => id !== undefined)
      );
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleOpenCoachAssignment = (
    assessmentId: string,
    currentCoach: string
  ) => {
    setSelectedAssessmentId(assessmentId);
    setSelectedCurrentCoach(currentCoach);
    setIsCoachAssignmentOpen(true);
  };

  const handleCloseCoachAssignment = () => {
    setIsCoachAssignmentOpen(false);
    setSelectedAssessmentId("");
    setSelectedCurrentCoach("");
  };

  // Update the handleAssignCoach function to work with local state
  const handleAssignCoach = (assessmentId: string, coachId: string) => {
    setAssessmentsWithCoaches((prev) =>
      prev.map((assessment) =>
        assessment.id === assessmentId
          ? { ...assessment, assignCoach: coachId || null }
          : assessment
      )
    );
    setIsCoachAssignmentOpen(false);
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex items-center justify-between border-b h-20 p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all"
                checked={
                  selectedUsers.length === currentRecords.length &&
                  currentRecords.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium text-[var(--text)]"
              >
                Select All
              </label>
              {selectedUsers.length > 0 && (
                <Badge variant="border" className="ml-2 ">
                  {selectedUsers.length} selected
                </Badge>
              )}
            </div>

            {selectedUsers.length > 0 && (
              <div className="flex gap-2 ml-2">
                <Button variant="border" size="sm">
                  <Download className="h-4 w-4" />
                  Export Pricing Data
                </Button>
                <Button variant="border" size="sm">
                  <NotebookPen className=" h-4 w-4" />
                  Update Commission Rules
                </Button>
                <Button variant="delete" size="sm">
                  <Trash className=" h-4 w-4" />
                  Mark as Inactive
                </Button>
                <Button variant="border" size="sm">
                  <Pen className=" h-4 w-4" />
                  Assign Category
                </Button>
                <Button variant="border" size="sm">
                  <MessageCircle className=" h-4 w-4" />
                  Notify Consultants
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-4 ">
            <div className="flex justify-around items-center border-1 rounded-sm overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search"
                className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-40 sm:w-45"
              />
              <Button
                type="submit"
                size="icon"
                variant="standard"
                className="rounded-none rounded-r-md bg-[var(--button)]"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("assessmentName")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Assessment Name{" "}
                  {sortConfig?.key === "assessmentName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("userName")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Explorer{" "}
                  {sortConfig?.key === "userName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("segments")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Segment{" "}
                  {sortConfig?.key === "segments" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("date")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Date{" "}
                  {sortConfig?.key === "date" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("source")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Source{" "}
                  {sortConfig?.key === "source" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("amountPaid")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Amount Paid{" "}
                  {sortConfig?.key === "amountPaid" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("status")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status{" "}
                  {sortConfig?.key === "status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("assignCoach")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Assign Coach{" "}
                  {sortConfig?.key === "assignCoach" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("result")}
                  className="cursor-pointer text-[var(--text)] w-[10px] text-center pr-4"
                >
                  Result{" "}
                  {sortConfig?.key === "result" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)] h-25"
                  )}
                  onClick={() => {
                    if (user.id) {
                      toggleSelectUser(user.id);
                    }
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 border-l-[var(--background)] group-hover:border-[var(--brand-color)]"
                    )}
                  >
                    <Checkbox
                      checked={
                        user.id ? selectedUsers.includes(user.id) : false
                      }
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() =>
                        user.id && toggleSelectUser(user.id)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">
                            {user.assessmentName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-start flex-col">
                      <div className="font-medium">{user.userName}</div>
                      <div className="text-xs">{user.userId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.segments}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      {user.source.type === "Direct" ? (
                        "Direct"
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-left">
                              <div className="hover:text-[var(--brand-color)]">
                                {user.source.partnerName}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="p-2 max-w-[200px]"
                            >
                              <div className="flex flex-col gap-1 text-xs">
                                <div>Commission: {user.source.commission}</div>
                                <div>
                                  Assessment Price: ₹
                                  {user.source.assessmentPrice}
                                </div>
                                <div>
                                  Partner Share: ₹{user.source.partnerShare}
                                </div>
                                <div>
                                  Aimshala Share: ₹{user.source.aimshalaShare}
                                </div>
                                <div>Access Code: {user.source.accessCode}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      ₹{user.amountPaid} | {user.amountCode}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="">
                    <div className="w-full max-w-full text-sm group min-w-[180px]">
                      {user.assignCoach ? (
                        (() => {
                          const coach = coachesList.find(
                            (c) =>
                              c.id.toLowerCase() ===
                              (user.assignCoach || "").toLowerCase()
                          );

                          return coach ? (
                            <div className="flex items-start justify-between gap-4 min-w-[210px]">
                              {/* Coach Display */}
                              <div className="flex items-center gap-3">
                                <img
                                  src={coach.photo || asset}
                                  alt={coach.name}
                                  className="w-10 h-10 rounded-full object-cover" 
                                />
                                <div className="flex flex-col justify-center">
                                  <div className="font-semibold text-[var(--text)] flex items-center gap-2">
                                    {coach.name}
                                    <CustomTooltip tooltipText="Re-Assign">
                                    <SquarePen
                                      className="h-3 w-3 hover:h-4 hover:w-4"
                                      onClick={() => handleOpenCoachAssignment(user.id, user.assignCoach || "")}
                                    />
                                  </CustomTooltip>
                                  </div>
                                  <div className="text-xs text-[var(--text)]">
                                    {coach.id}
                                  </div>
                                  <div className="text-xs text-[var(--text)]">
                                    {coach.specialization}
                                  </div>
                                  <div className="flex items-center gap-1">
                                  <CustomTooltip tooltipText="Call"><Phone className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                                  <span className="hidden group-hover:inline-flex items-center text-[15px]">|</span>
                                  <CustomTooltip tooltipText="Message"><MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" /></CustomTooltip>
                                </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-[var(--red)] text-xs">
                              Coach not found
                            </div>
                          );
                        })()
                      ) : (
                        <Button
                          variant="noborder"
                          size="sm"
                          className="text-[var(--text)] hover:bg-[var(--brand-color2)] hover:text-[var(--brand-color)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCoachAssignment(user.id, "");
                          }}
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--faded)] grid place-items-center text-[var(--text)]/70">
                            <Plus className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-[var(--text)]/70">Assign</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center pr-4 ">
                      {user.result ? (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="actionIcon"
                                  size="actionIcon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // navigate(`/result-details/${user.id}`) or your view logic
                                  }}
                                >
                                  <Eye className="h-3 w-3" />
                                  <span className="sr-only">View Result</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Result</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="actionIcon"
                                  size="actionIcon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Add reload logic here
                                  }}
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  <span className="sr-only">Reload Result</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reload Result</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                      ) : (
                        <span className="text-left">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4 ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Bell className="h-3 w-3" />
                              <span className="sr-only">Remind</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remind</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Ban className="h-3 w-3 " />
                              <span className="sr-only">Revoke</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Revoke</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <RotateCcw className="h-3 w-3" />
                              <span className="sr-only">Reset</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reset</p>
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

        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="border"
                  size="sm"
                  className="flex items-center gap-2 text-low text-[var(--text-head)]"
                >
                  {recordsPerPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-[var(--text] dark:bg-[var(--background)]">
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
            <span className="text-low text-[var(--text)]">
              Showing {indexOfFirstRecord + 1}-
              {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
              {sortedData.length} explorers
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <Button
              variant="border"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "brand" : "border"}
                size="sm"
                className={`h-8 w-8 p-0 ${
                  page === currentPage ? "text-white" : "text-[var(--text)]"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="border"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

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
