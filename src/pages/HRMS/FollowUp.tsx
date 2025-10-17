import { Clock, Search, FileUp, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Filter,
  ChevronRight,
  ChevronLeft,
  PenSquare,
  Bell,
  FileDown,
  Eye,
  Pen,
} from "lucide-react";
import { applicationData } from "@/data/Data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import React from "react";
import { DatePickerWithRange } from "@/components/date-picker";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";


type ApplicationStatus =
  | "Applied"
  | "In Screening"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interviewed"
  | "Final Review"
  | "Selected - Aimshala Team"
  | "Onboarded - Channel Partner"
  | "Onboarded - Career Consultant"
  | "Enrolled - ACT"
  | "Rejected";

interface JobApplication {
  applicationId: string;
  role: string;
  name: string;
  lastCompany: string;
  appliedOn: string;
  type: string;
  status: ApplicationStatus;
  assign: string;
  action: string;
  assignedTo: Array<{
    name: string;
    photo: string;
  }>;
}

// Extending the Coach interface to include specialization

// Application statuses are now handled through search functionality

export function FollowUp() {
  return (
    <div className="flex flex-col gap-2">
        <Topbar />
      <StatCard />
      <Buttonbar />
      <TableSection />
    </div>
  );
}

function Topbar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-head)]">
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Follow Ups</BreadcrumbPage>
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

      {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />}
      </div>
    </div>
  );
} 

function Buttonbar() {
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new">
        <span className="">Follow Up</span>
      </Button>
      <div className="flex gap-4">
        
        <Button variant="delete" size="new">
          <PenSquare className="h-4 w-4" />
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

function AssessFilter({ onClose }: FilterProps) {
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
  const [type, setType] = useState("Full-time");

  const tabList = ["General", "Application Type", "Status", "Date Range"];

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
                  Search by Company / Designation :
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
                  {["New", "Pending", "Approved", "Rejected"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={option}
                        name="status"
                        value={option}
                        checked={status === option}
                        onChange={(e) => setStatus(e.target.value)}
                        className="text-[var(--brand-color)] focus:ring-[var(--brand-color)]"
                      />
                      <label
                        htmlFor={option}
                        className="text-sm text-[var(--text)]"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Application Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Application Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={option}
                          name="type"
                          value={option}
                          checked={type === option}
                          onChange={(e) => setType(e.target.value)}
                          className="text-[var(--brand-color)] focus:ring-[var(--brand-color)]"
                        />
                        <label
                          htmlFor={option}
                          className="text-sm text-[var(--text)]"
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter the Date Range:
                </label>
                <div className="mt-4 min-w-full">
                  <Calendar className="h-4 w-4" />
                </div>
              </>
            )}
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
    <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-4">
      <Card className="xl:rounded-sm shadow-none bg-[var(--background)]">
        <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="text-[var(--text)] text-xs uppercase text-light line-clamp-1">
              Total Applications
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full">
              <Clock className="h-8 w-8 text-[var(--text-head)]" />
            </div>
            <div className="text-[var(--text-head)] text-2xl">1,234</div>
          </div>
        </CardHeader>
      </Card>
      <Card className="xl:rounded-sm shadow-none bg-[var(--background)]">
        <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="text-[var(--text)] text-xs uppercase text-light line-clamp-1">
              Pending Review
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full">
              <Bell className="h-8 w-8 text-[var(--text-head)]" />
            </div>
            <div className="text-[var(--text-head)] text-2xl">567</div>
          </div>
        </CardHeader>
      </Card>
      <Card className="xl:rounded-sm shadow-none bg-[var(--background)]">
        <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="text-[var(--text)] text-xs uppercase text-light line-clamp-1">
              Approved
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full">
              <PenSquare className="h-8 w-8 text-[var(--text-head)]" />
            </div>
            <div className="text-[var(--text-head)] text-2xl">89</div>
          </div>
        </CardHeader>
      </Card>
      <Card className="xl:rounded-sm shadow-none bg-[var(--background)]">
        <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
          <div className="flex justify-between h-full items-center">
            <div className="text-[var(--text)] text-xs uppercase text-light line-clamp-1">
              Rejected
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full">
              <FileDown className="h-8 w-8 text-[var(--text-head)]" />
            </div>
            <div className="text-[var(--text-head)] text-2xl">12</div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export function TableSection() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof JobApplication;
    direction: "ascending" | "descending";
  } | null>(null);
  // Removed filterStatus state as we're using unified search
  const [searchQuery, setSearchQuery] = useState("");
  const [jobApplicationData] = useState<JobApplication[]>(
    applicationData as JobApplication[]
  );
  // No assignment state needed as assignments are read-only

  // Filter by search query only
  const filteredData = jobApplicationData.filter((item) => {
    const searchTerm = searchQuery.toLowerCase();
    return searchTerm === ""
      ? true
      : item.name.toLowerCase().includes(searchTerm) ||
          item.role.toLowerCase().includes(searchTerm) ||
          item.lastCompany.toLowerCase().includes(searchTerm) ||
          item.applicationId.toLowerCase().includes(searchTerm) ||
          item.status.toLowerCase().includes(searchTerm) ||
          item.type.toLowerCase().includes(searchTerm);
  });

  // Sort data
  const sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (Array.isArray(aValue) || Array.isArray(bValue)) {
        // Handle array fields (like assignedTo)
        return sortConfig.direction === "ascending"
          ? (aValue?.length || 0) - (bValue?.length || 0)
          : (bValue?.length || 0) - (aValue?.length || 0);
      }

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  const requestSort = (key: keyof JobApplication) => {
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
      setSelectedUsers(currentRecords.map((user) => user.applicationId));
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // No assignment-related functions needed as assignments are read-only

  return (
    <div className="flex flex-col w-full">
      {/* Table Wrapper */}
      <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
        <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
          <div className="flex items-center justify-between border-b  h-20 p-4 mt-auto">
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
                  <Button variant="border" size="sm">
                    <Eye className="h-4 w-4" />
                    View Selected
                  </Button>
                  <Button variant="border" size="sm">
                    <Pen className="h-4 w-4" />
                    Edit Selected
                  </Button>
                  <Button variant="delete" size="sm">
                    <FileDown className=" h-4 w-4 text-[var(--red)]" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search by name, role, company, status, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-60 sm:w-80"
              />
              <Button
                type="submit"
                size="icon"
                variant="standard"
                className="rounded-none rounded-r-md bg-[var(--button)]"
                aria-label="Search"
                onClick={() => setCurrentPage(1)} // Reset to first page when searching
              >
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
            <Table className="w-full caption-top border-collapse overflow-y-visible">
              <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
                <TableRow>
                  <TableHead className="min-w-[40px]"></TableHead>
                  <TableHead
                    onClick={() => requestSort("applicationId")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Application ID{" "}
                    {sortConfig?.key === "applicationId" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("name")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Name{" "}
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("role")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Role{" "}
                    {sortConfig?.key === "role" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("lastCompany")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Last Company{" "}
                    {sortConfig?.key === "lastCompany" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("appliedOn")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Applied On{" "}
                    {sortConfig?.key === "appliedOn" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("type")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Type{" "}
                    {sortConfig?.key === "type" &&
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
                {currentRecords.map((application) => (
                  <TableRow
                    key={application.applicationId}
                    data-id={application.applicationId}
                    className={cn(
                      "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]"
                    )}
                    onClick={() => {
                      toggleSelectUser(application.applicationId);
                    }}
                  >
                    <TableCell
                      className={cn(
                        "pl-3 transition-all duration-200 border-l-4 border-[var(--background)] group-hover:border-[var(--brand-color)]"
                      )}
                    >
                      <Checkbox
                        checked={selectedUsers.includes(
                          application.applicationId
                        )}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() =>
                          toggleSelectUser(application.applicationId)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {application.applicationId}
                    </TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.role}</TableCell>
                    <TableCell>{application.lastCompany}</TableCell>
                    <TableCell>{application.appliedOn}</TableCell>
                    <TableCell>
                      <Badge variant="standard">{application.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <TooltipProvider>
                            {application.assignedTo?.map((assigned, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                                    <img
                                      src={assigned.photo}
                                      alt={assigned.name}
                                      className="h-8 w-8 object-cover"
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{assigned.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          application.status === "Selected - Aimshala Team" ||
                          application.status ===
                            "Onboarded - Channel Partner" ||
                          application.status ===
                            "Onboarded - Career Consultant" ||
                          application.status === "Enrolled - ACT"
                            ? "success"
                            : application.status === "Rejected"
                            ? "destructive"
                            : application.status === "Shortlisted" ||
                              application.status === "Interview Scheduled" ||
                              application.status === "Interviewed"
                            ? "brand"
                            : "secondary"
                        }
                      >
                        {application.status}
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
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                        <Button variant="actionIcon" size="actionIcon">
                          <Pen className="h-4 w-4" />
                        </Button>
                        </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Details</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                        <Button variant="actionIcon" size="actionIcon">
                          <FileDown className="h-4 w-4" />
                        </Button>
                        </TooltipTrigger>
                          <TooltipContent>
                            <p>Download</p>
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
                {sortedData.length} applications
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
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
      </div>
    </div>
  );
}
