import {
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
  Plus,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flag,
  Search,
  MessageCircle,
  FileUp,
  Filter,
  FileWarning,
  Check,
  FileDown,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProblemTableData } from "@/data/Data";
import RadioButton from "@/components/ui/Radiobutton";
import DatePicker from "@/components/ui/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";
import { coachesList } from "@/data/Data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePickerWithRange } from "@/components/date-picker";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";
const stats = [
  {
    title: "Total Problems Reported",
    value: "12,457",
    icon: Users,
  },
  {
    title: "Issues Under Review",
    value: "4.4",
    icon: UserCheck,
  },
  {
    title: "Common Areas: ",
    value: "312",
    icon: UserPlus,
  },
  {
    title: "Last Updated",
    value: "18 May 2025",
    icon: MessageSquare,
  },
];

export function Problems() {
  const navigate = useNavigate();

  const handleViewProblem = (problemId: number) => {
    navigate(`/desk/relation/cases/problems/view`, {
      state: { id: problemId }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Topbar />
      <StatsCards />
      <Buttonbar />
      <ProblemTable onViewProblem={handleViewProblem} />
    </div>
  );
}


function Topbar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
      <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Problems</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex gap-4">
        <DatePickerWithRange />
        <Button
        variant="standard"
        size="new"
        onClick={() => setShowFilter(true)}
      >
        <Filter className="h-3 w-3" />
      </Button>

      {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}
      </div>
    </div>
  );
}


function StatsCards() {
  return (
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="rounded-sm shadow-none bg-[var(--background)]">
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

function Buttonbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new" onClick={() => navigate('addNewProblem')}>
        <Plus className="h-3 w-3" />
        <span className="">New Problem</span>
      </Button>
      <div className="flex gap-4">
        <Button variant="delete" size="new">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="standard" size="new">
          <FileUp className="h-4 w-4" />
          <span className="">Import</span>
        </Button>
      </div>
    </div>
  );
}


interface FilterProps {
  onClose: () => void;
}

function AdvancedFilters({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("General");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // Do nothing if clicking inside modal
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }

      // Do nothing if clicking inside dropdown (Radix renders it in a portal)
      const target = e.target as HTMLElement;
      if (target.closest("[data-radix-popper-content-wrapper]")) {
        return;
      }

      onClose(); // Close modal otherwise
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const [status, setStatus] = useState("New");
  const [type, setType] = useState("Profile");

  const tabList = [
    "General",
    "Issue Type",
    "Status",
    "Date Range",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">

      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
      >
        <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Filters</CardTitle>
          <Button
            variant="link"
            className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
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
                  className={`text-left text-sm px-3 py-3 border-l-3  ${activeTab === tab
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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">Search by User / Keyword :</label>
                <Input id="Gen" placeholder="Enter .." type="text" className="mt-4 w-full " />

              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select from the Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "New",
                    "Under Review",
                    "Resolved",
                    "Archived",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={status}
                      onChange={setStatus}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Issue Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Issue Type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Profile",
                    " Booking",
                    "Assessment",
                    "Interface",
                    "Access"
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={type}
                      onChange={setType}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">Enter the Date Range:</label>
                <div className="mt-4 min-w-full">
                  <DatePicker />
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


interface ProblemTableProps {
  onViewProblem: (problemId: number) => void;
}

function ProblemTable({ onViewProblem }: ProblemTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [problemData, setProblemData] = useState([...ProblemTableData] as Array<{
    id: number;
    user: string;
    submittedOn: string;
    issueType: string;
    description: string;
    screenshot: string;
    status: string;
    assignedTo: Array<{ name: string; photo: string }>;
    actions: string[];
  }>);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentProblemForAssignment, setCurrentProblemForAssignment] = useState<number | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const sortedData = [...problemData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
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

  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        currentRecords.map((user): number => user.id)
      );
    }
  };

  const handleAssignUsers = (problemId: number) => {
    setCurrentProblemForAssignment(problemId);
    const problem = problemData.find(p => p.id === problemId);
    if (problem && problem.assignedTo) {
      setSelectedAssignees(problem.assignedTo.map(assignee => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentProblemForAssignment) {
      const updatedProblems = problemData.map(problem => {
        if (problem.id === currentProblemForAssignment) {
          const selectedCoaches = coachesList.filter(coach => 
            selectedAssignees.includes(coach.name)
          ).map(coach => ({
            name: coach.name,
            photo: coach.photo
          }));
          
          return {
            ...problem,
            assignedTo: selectedCoaches
          };
        }
        return problem;
      });
      
      setProblemData(updatedProblems);
      setShowAssignmentModal(false);
      setCurrentProblemForAssignment(null);
      setSelectedAssignees([]);
    }
  };

  const toggleAssignee = (assigneeName: string) => {
    if (selectedAssignees.includes(assigneeName)) {
      setSelectedAssignees(selectedAssignees.filter(name => name !== assigneeName));
    } else {
      setSelectedAssignees([...selectedAssignees, assigneeName]);
    }
  };

  // Assignment Modal Component
  const AssignmentModal = () => {
    if (!showAssignmentModal) return null;

    const currentProblem = problemData.find(p => p.id === currentProblemForAssignment);
    const currentProblemAssignedImages = currentProblem?.assignedTo || [];

    const availableAssignees = coachesList.map(coach => {
      const currentAssignment = currentProblemAssignedImages.find(assigned => assigned.name === coach.name);
      
      return {
        name: coach.name,
        photo: currentAssignment ? currentAssignment.photo : coach.photo,
        specialization: coach.specialization,
        isCurrentlyAssigned: currentAssignment !== undefined
      };
    });

    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="relative w-full max-w-[500px] rounded-sm bg-[var(--background)] border">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-[var(--text-head)]">
              Assign Users
            </h2>
            <Button
              variant="link"
              onClick={() => setShowAssignmentModal(false)}
              className="text-sm text-[var(--text)] p-0 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6">
            <p className="text-sm text-[var(--text)] mb-4">
              Select users to assign to this problem:
            </p>
            
            {currentProblemAssignedImages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-[var(--text)] mb-2">Currently Assigned:</p>
                <div className="flex -space-x-2">
                  {currentProblemAssignedImages.map((assigned, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                      title={assigned.name}
                    >
                      <img
                        src={assigned.photo}
                        alt={assigned.name}
                        className="h-8 w-8 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableAssignees.map((assignee) => (
                <div
                  key={assignee.name}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-[var(--faded)]`}
                >
                  <Checkbox
                    checked={selectedAssignees.includes(assignee.name)}
                    onCheckedChange={() => toggleAssignee(assignee.name)}
                  />
                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={assignee.photo}
                      alt={assignee.name}
                      className="h-8 w-8 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-[var(--text)]">{assignee.name}</span>
                    <span className="text-xs text-[var(--text)] opacity-70">{assignee.specialization}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 p-6 border-t">
            <Button
              variant="border"
              onClick={() => setShowAssignmentModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="brand"
              onClick={handleSaveAssignment}
            >
              Save Assignment
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto shadow-none">
      <div className="flex-1 rounded-md bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full"></div>

      <div className="flex items-center justify-between h-20 border-b p-4">
        <div className="flex items-center justify-between pl-0 p-4  gap-2">
          <div className="flex items-center gap-2 border-none shadow-none">
            <Checkbox
              id="select-all"
              checked={selectedUsers.length === currentRecords.length && currentRecords.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
              Select All
            </label>
            {selectedUsers.length > 0 && (
              <Badge variant="border" className="ml-2 ">
                {selectedUsers.length} selected
              </Badge>
            )}
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex gap-2">        {/*wrap */}
              <Button variant="border" size="sm">
                <FileWarning className="h-4 w-4" />
                Assign for Resolution
              </Button>
              <Button variant="border" size="sm">
                <Check className="h-4 w-4 text-[var(--green)]" />
                Mark Verified
              </Button>
              <Button variant="delete" size="sm">
                <Trash2 className=" h-4 w-4 text-[var(--red)]" />
                Archive Selected
              </Button>
              <Button variant="border" size="sm">
                <FileDown className=" h-4 w-4" />
                Export Selected
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
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

      {/* Table content */}
      <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
        <Table className="w-full caption-top border-collapse overflow-y-visible">
          <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
            <TableRow>
              <TableHead className="min-w-[40px]"></TableHead>
              <TableHead
                onClick={() => requestSort("user")}
                className="cursor-pointer text-[var(--text)]"
              >
                User{" "}
                {sortConfig?.key === "user" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("submittedOn")}
                className="cursor-pointer text-[var(--text)]"
              >
                Submitted On{" "}
                {sortConfig?.key === "submittedOn" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("issueType")}
                className="cursor-pointer text-[var(--text)]"
              >
                Issue Type{" "}
                {sortConfig?.key === "issueType" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-[var(--text)]">Description</TableHead>
              <TableHead className="text-[var(--text)]">Screenshot</TableHead>
              <TableHead
                onClick={() => requestSort("assignedTo")}
                className="cursor-pointer text-[var(--text)]"
              >
                Assigned To{" "}
                {sortConfig?.key === "assignedTo" &&
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
              <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((problem) => (
              <TableRow
                key={problem.id}
                data-id={problem.id}
                className={cn(
                  "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",

                )}
                onClick={() => {
                  toggleSelectUser(problem.id);
                }}
              >
                <TableCell
                  className={cn(
                    "pl-3 transition-all duration-200 border-l-4 border-[var(--background)] group-hover:border-[var(--brand-color)]",

                  )}
                >
                  <Checkbox
                    checked={selectedUsers.includes(problem.id)}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => toggleSelectUser(problem.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{problem.user}</TableCell>
                <TableCell>{problem.submittedOn}</TableCell>
                <TableCell>{problem.issueType}</TableCell>
                <TableCell>{problem.description}</TableCell>
                <TableCell>{problem.screenshot}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {problem.assignedTo?.map((assigned, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm"
                          title={assigned.name}
                        >
                          <img
                            src={assigned.photo}
                            alt={assigned.name}
                            className="h-8 w-8 object-cover"
                          />
                        </div>
                      ))}
                      {/* Plus icon in circle */}
                      <div className="h-8 w-8 rounded-full border-2 border-white shadow-sm bg-[var(--brand-color2)] flex items-center justify-center cursor-pointer hover:bg-[var(--brand-color3)] transition-colors"
                           onClick={(e) => {
                             e.stopPropagation();
                             handleAssignUsers(problem.id);
                           }}
                           title="Assign Users">
                        <Plus className="h-4 w-4 text-[var(--brand-color)]" />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={problem.status === "Resolved" ? "brand" : "standard"}
                  >
                    {problem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end pr-4 ">
                                            <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="actionIcon" size="actionIcon" onClick={() => onViewProblem(problem.id)}>
                                <Eye className="h-3 w-3" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="actionIcon" size="actionIcon">
                            <MessageCircle className="h-3 w-3" />
                            <span className="sr-only">Message</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send Message</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="actionIcon" size="actionIcon">
                            <Flag className="h-3 w-3" />
                            <span className="sr-only">Flag</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Flag Issue</p>
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

      {/* Pagination */}
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
            <DropdownMenuContent className="text-[var(--text)] dark:bg-[var(--background)]">
              {[ 10, 25, 50, 100].map((size) => (
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
            {sortedData.length} reviews
          </span>
        </div>
        <div className="flex items-center gap-2">
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
              className={`h-8 w-8 p-0 ${page === currentPage ? "text-white" : "text-[var(--text)]"
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
      <AssignmentModal />
    </div>
  );
} 