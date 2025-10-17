
import { Button } from "@/components/ui/button";
import {
  Filter,
  Notebook,
  Search,
  MessageSquare,
  Phone,
  FileDown,
  MessageCircle,
  Tag,
  User2,
  PenSquare,
  X,
  Plus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {LeadOrganisationTable, coachesList   } from "@/data/Data";
//import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { DateRangePicker } from "@/components/ui/RangeCalender";
import { DatePickerWithRange } from "@/components/date-picker";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";


const stats = [
  {
    title: "Total Leads",
    value: "64",
    icon: Notebook,
  },
  {
    title: "High Lead Score",
    value: "19",
    icon: Notebook,
  },
  {
    title: "Assigned",
    value: "48",
    icon: Notebook,
  },
  {
    title: "New & Unassigned",
    value: "7",
    icon: Notebook,
    },
    {
      title: "Engaged/Active",
      value: "16",
      icon: Notebook,
    },
    {
      title: "Converted Organisation",
      value: "9",
      icon: Notebook,
    },
 
  
  

];

export function Organisation() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Topbar />
        <StatsCards />
        <TableSection />
      </div>
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
                <BreadcrumbPage>Organisation Leads</BreadcrumbPage>
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
  const [organisationType, setOrganisationType] = useState("School");
  const [leadScore, setLeadScore] = useState("High");
  const [objective, setObjective] = useState("Sessions");
  const [assignedTo, setAssignedTo] = useState("Team Member 1");
  const [channelPartner, setChannelPartner] = useState("Yes");

  const tabList = [
    "General",
    "Organisation Type",
    "Status",
    "Lead Score",
    "Objective",
    "Assigned To",
    "Channel Partner",
    "Date Range",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">

      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-sm bg-[var(--background)] "
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
                <label htmlFor="Gen" className="text-[var(--text)]">Search By Name : :</label>
                <Input id="Gen" placeholder="Enter .." type="text" className="mt-4 w-full " />

              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select your current Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "New",
                    "Contacted",
                    "In Follow-Up",
                    "Engaged",
                    "Closed",
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

            {activeTab === "Organisation Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Organisation Type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "School",
                    "Institute",
                    "College",
                    "University",
                    "Corporation",
                    "NGO"
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={organisationType}
                      onChange={setOrganisationType}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Lead Score" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Lead Score :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "High",
                    "Medium",
                    "Low",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={leadScore}
                      onChange={setLeadScore}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Objective" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Objective :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {[
                    "Sessions",
                    "Career",
                    "Programs",
                    "Listing",
                    "Collaboration",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={objective}
                      onChange={setObjective}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Assigned To" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Assigned To :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {[
                    "Team Member 1",
                    "Team Member 2",
                    "Team Member 3",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={assignedTo}
                      onChange={setAssignedTo}
                    />
                  ))}
                </div>
              </>
            )}

              {activeTab === "Channel Partner" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Channel Partner :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {[
                    "Yes",
                    "No",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={channelPartner}
                      onChange={setChannelPartner}
                    />
                  ))}
                </div>
              </>
            )}

                {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">Select Your Date Range:</label>
                <div className="mt-4 min-w-full">
                  <DateRangePicker />
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


function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
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

function TableSection() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof LeadOrganisationTable>(
    LeadOrganisationTable[0] ? [LeadOrganisationTable[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    LeadOrganisationTable[0]?.id || null
  );
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentUserForAssignment, setCurrentUserForAssignment] = useState<string | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [organisationData, setOrganisationData] = useState(LeadOrganisationTable);

  // Sorting logic
  const sortedData = [...organisationData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof typeof a];
      let bValue: any = b[sortConfig.key as keyof typeof b];
      
      // Handle assignedTo array sorting
      if (sortConfig.key === "assignedTo") {
        aValue = aValue && Array.isArray(aValue) ? aValue.length : 0;
        bValue = bValue && Array.isArray(bValue) ? bValue.length : 0;
      }
      
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

  // Select All logic
  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRecords.map((user) => user.id));
    }
  };

  const bringToTop = (userId: string) => {
    const coach = selectedStack.find((c) => c.id === userId);
    if (coach) {
      setSelectedStack((prev) => [
        coach,
        ...prev.filter((c) => c.id !== userId),
      ]);
      setFocusedId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");

    allRows.forEach((row) => {
      const id = row.getAttribute("data-id");
      const isInStack = selectedStack.some((us) => us.id === id);
      const isTop = focusedId === id;

      // Remove previous styles
      row.classList.remove(
        "bg-[var(--brand-color3)]",
        "border-l-[var(--brand-color)]"
      );

      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");

        if (isTop) {
          row.classList.add("border-l-[var(--brand-color)]");
        }
      }
    });
  }, [selectedStack, focusedId]);

  const handleRowClick = (user: (typeof LeadOrganisationTable)[0]) => {
    // Double-click detected
    const exists = selectedStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedStack((prev) => {
        const updated = [user, ...prev];
        return updated.slice(0, 5); // limit to 5
      });
      setFocusedId(user.id);
    } else {
      bringToTop(user.id);
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleAssignUsers = (userId: string) => {
    setCurrentUserForAssignment(userId);
    const user = organisationData.find(u => u.id === userId);
    if (user && user.assignedTo) {
      setSelectedAssignees(user.assignedTo.map(assignee => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentUserForAssignment) {
      const updatedUsers = organisationData.map(user => {
        if (user.id === currentUserForAssignment) {
          const selectedCoaches = coachesList.filter(coach => 
            selectedAssignees.includes(coach.name)
          ).map(coach => ({
            name: coach.name,
            photo: coach.photo
          }));
          
          return {
            ...user,
            assignedTo: selectedCoaches
          };
        }
        return user;
      });
      
      setOrganisationData(updatedUsers);
      setShowAssignmentModal(false);
      setCurrentUserForAssignment(null);
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

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      {/* Assignment Modal */}
      {showAssignmentModal && (
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
                Select users to assign to this organisation:
              </p>
              
              {(() => {
                const currentUser = organisationData.find(u => u.id === currentUserForAssignment);
                const currentUserAssignedImages = currentUser?.assignedTo || [];
                
                return (
                  <>
                    {currentUserAssignedImages.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-[var(--text)] mb-2">Currently Assigned:</p>
                        <div className="flex -space-x-2">
                          {currentUserAssignedImages.map((assigned, index) => (
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
                      {coachesList.map((coach) => {
                        const currentAssignment = currentUserAssignedImages.find(assigned => assigned.name === coach.name);
                        
                        return (
                          <div
                            key={coach.name}
                            className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-[var(--faded)]`}
                          >
                            <Checkbox
                              checked={selectedAssignees.includes(coach.name)}
                              onCheckedChange={() => toggleAssignee(coach.name)}
                            />
                            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                              <img
                                src={currentAssignment ? currentAssignment.photo : coach.photo}
                                alt={coach.name}
                                className="h-8 w-8 object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-[var(--text)]">{coach.name}</span>
                              <span className="text-xs text-[var(--text)] opacity-70">{coach.specialization}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
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
      )}
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-campaigns"
                checked={
                  selectedUsers.length === currentRecords.length &&
                  currentRecords.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all-campaigns"
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
                <PenSquare className="h-4 w-4" />
                Assign to Team Member
              </Button>
              <Button variant="border" size="sm">
                <User2 className=" h-4 w-4" />
                Update Status or Objective
              </Button>
              <Button variant="border" size="sm">
                <Tag className=" h-4 w-4 " />
                Tag by Lead Score
              </Button>
              <Button variant="border" size="sm">
                <MessageCircle className=" h-4 w-4" />
                Send Email/WhatsApp
              </Button>
              <Button variant="border" size="sm">
                <FileDown className=" h-4 w-4 " />
                Export List (.CSV/.XLS)
              </Button>
            </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex justify-end items-center gap-4 ">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
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
        {/* Table UI */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("Name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Organisation Name{" "}
                  {sortConfig?.key === "organisation_name" &&
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
                  onClick={() => requestSort("objective")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Objective{" "}
                  {sortConfig?.key === "objective" &&
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
                  onClick={() => requestSort("lead_score")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Lead Score{" "} 
                  {sortConfig?.key === "lead_score" &&
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
                  onClick={() => requestSort("created_on")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Created On{" "}
                  {sortConfig?.key === "created_on" &&
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
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead> 
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedStack.some((c) => c.id === user.id)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectUser(user.id);
                    handleRowClick(user);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 border-l-transparent group-hover:border-[var(--brand-color)]",
                      selectedStack.some((c) => c.id === user.id)
                        ? focusedId === user.id
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">{user.organisation_name}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.objective}</div>
                  </TableCell>
                  <TableCell>
                  <Badge variant="standard">{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                  <Badge variant="standard">{user.lead_score}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.source}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.created_on}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {user.assignedTo?.map((assigned, index) => (
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
                               handleAssignUsers(user.id);
                             }}
                             title="Assign Users">
                          <Plus className="h-4 w-4 text-[var(--brand-color)]" />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Phone className="h-3 w-3" />
                              <span className="sr-only">Call</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Call</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <MessageSquare className="h-3 w-3" />
                              <span className="sr-only">Message</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Message</p>
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
    </div>
  );
}
