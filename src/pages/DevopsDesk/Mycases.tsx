import { useEffect, useState } from "react";
import { BugsTableData } from "@/data/Data";
import {
  Users,
  UserCheck,
  UserPlus,
  Plus,
  Trash2,
  ChevronDown,
  Eye,
  Flag,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Check,
  FileDown,
  FileWarning,
  FileUp,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import DatePicker from "@/components/ui/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { coachesList } from "@/data/Data";
import { DatePickerWithRange } from "@/components/date-picker";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";


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
    title: "Total Bugs Reports",
    value: "12,457",
    icon: Users,
  },
  {
    title: "Critical bugs",
    value: "6",
    icon: UserCheck,
  },

  {
    title: "Last Updated",
    value: "18 May 2025",
    icon: UserPlus,
  },
];

export function MyCase() {
  return (
    <div className="flex flex-col gap-2">
      <Bar />
      <StatsCards />
      <Buttonbar />
      <BugTable />
    </div>
  );
}


function Bar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-head)]">
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>My Cases</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h1>
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
        
      <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
} 

function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-sm shadow-none bg-[var(--background)]"
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

function Buttonbar() {
  
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new">
        <Plus className="h-3 w-3" />
        <span className="">Case Report</span>
      </Button>
      <div className="flex gap-4">
        {/*<Buttonbar />*/}
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
  const [module, setModule] = useState("Sessions");
  const [priority, setPriority] = useState("Low");

  const tabList = ["General", "Module", "Priority", "Status", "Date Range"];

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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">
                  Search by User / Keyword :
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter .."
                  type="text"
                  className="mt-4 w-full "
                />
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select from the Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["New", "In Progress", "Fixed", "Verified"].map((option) => (
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

            {activeTab === "Module" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Module :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Sessions", "Assessments", "Platform", "Notifications"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={module}
                        onChange={setModule}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Priority" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Priority:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Low", "Medium", "High", "Critical"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={priority}
                      onChange={setPriority}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter the Date Range:
                </label>
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

function BugTable() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [bugsData, setBugsData] = useState([...BugsTableData] as Array<{
    id: number;
    user: string;
    submittedOn: string;
    module: string;
    priority: string;
    description: string;
    assignedTo: Array<{ name: string; photo: string }>;
    screenshot: string;
    status: string;
    actions: string[];
  }>);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentBugForAssignment, setCurrentBugForAssignment] = useState<number | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const sortedData = [...bugsData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      // Handle undefined or null values
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      // Convert to strings for consistent comparison
      const aString = String(aValue);
      const bString = String(bValue);

      if (aString < bString) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aString > bString) {
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
      setSelectedUsers(currentRecords.map((user): number => user.id));
    }
  };

  const handleAssignUsers = (bugId: number) => {
    setCurrentBugForAssignment(bugId);
    const bug = bugsData.find(b => b.id === bugId);
    if (bug && bug.assignedTo) {
      setSelectedAssignees(bug.assignedTo.map(assignee => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentBugForAssignment) {
      const updatedBugs = bugsData.map(bug => {
        if (bug.id === currentBugForAssignment) {
          const selectedCoaches = coachesList.filter(coach => 
            selectedAssignees.includes(coach.name)
          ).map(coach => ({
            name: coach.name,
            photo: coach.photo
          }));
          
          return {
            ...bug,
            assignedTo: selectedCoaches
          };
        }
        return bug;
      });
      
      setBugsData(updatedBugs);
      setShowAssignmentModal(false);
      setCurrentBugForAssignment(null);
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

    const currentBug = bugsData.find(b => b.id === currentBugForAssignment);
    const currentBugAssignedImages = currentBug?.assignedTo || [];

    const availableAssignees = coachesList.map(coach => {
      const currentAssignment = currentBugAssignedImages.find(assigned => assigned.name === coach.name);
      
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
              Select users to assign to this bug report:
            </p>
            
            {currentBugAssignedImages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-[var(--text)] mb-2">Currently Assigned:</p>
                <div className="flex -space-x-2">
                  {currentBugAssignedImages.map((assigned, index) => (
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
    <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto">
      <div className="flex items-center justify-between border-b  h-18 p-4 mt-auto">
        <div className="flex items-center justify-between pl-0 p-4  gap-2">
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
            <div className="flex gap-2">
              {" "}
              {/*wrap */}
              <Button variant="border" size="sm">
                <FileWarning className="h-4 w-4" />
                Mark In Progress
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
        <div className="flex items-center border-1 rounded-md bg-[var(--faded)]">
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
                onClick={() => requestSort("module")}
                className="cursor-pointer text-[var(--text)]"
              >
                Modules{" "}
                {sortConfig?.key === "module" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("priority")}
                className="cursor-pointer text-[var(--text)]"
              >
                Priority{" "}
                {sortConfig?.key === "priority" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("description")}
                className="cursor-pointer text-[var(--text)]"
              >
                Description{" "}
                {sortConfig?.key === "description" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("assignedTo")}
                className="cursor-pointer text-[var(--text)]"
              >
                Assigned To{" "}
                {sortConfig?.key === "assignedTo" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-[var(--text)]">Screenshot</TableHead>
              <TableHead
                onClick={() => requestSort("status")}
                className="cursor-pointer text-[var(--text)]"
              >
                Status{" "}
                {sortConfig?.key === "status" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-[var(--text)] text-center pr-4 w-1">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((bugs) => (
              <TableRow
                key={bugs.id}
                data-id={bugs.id}
                className={cn(
                  "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]"
                )}
                onClick={() => {
                  toggleSelectUser(bugs.id);
                }}
              >
                <TableCell
                  className={cn(
                    "pl-3 transition-all border-l-transparent duration-200 border-l-4 group-hover:border-[var(--brand-color)]"
                  )}
                >
                  <Checkbox
                    checked={selectedUsers.includes(bugs.id)}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => toggleSelectUser(bugs.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{bugs.user}</TableCell>
                <TableCell>{bugs.submittedOn}</TableCell>
                <TableCell>{bugs.module}</TableCell>
                <TableCell>{bugs.priority}</TableCell>
                <TableCell>{bugs.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {bugs.assignedTo?.map((assigned, index) => (
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
                             handleAssignUsers(bugs.id);
                           }}
                           title="Assign Users">
                        <Plus className="h-4 w-4 text-[var(--brand-color)]" />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {bugs.screenshot}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={bugs.status === "Resolved" ? "brand" : "standard"}
                  >
                    {bugs.status}
                  </Badge>
                </TableCell>
                <TableCell>
                <div className="flex justify-end pr-4">
                     <Tooltip>
                      <TooltipTrigger asChild>
                    <Button variant="actionIcon" size="actionIcon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                          <TooltipContent>
                            <p>View</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                    <Button variant="actionIcon" size="actionIcon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                          <TooltipContent>
                            <p>Comments</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                    <Button variant="actionIcon" size="actionIcon">
                      <Flag className="h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                          <TooltipContent>
                            <p>Logs</p>
                          </TooltipContent>
                        </Tooltip>
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
      <AssignmentModal />
    </div>
  );
}
