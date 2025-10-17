import { Button } from "@/components/ui/button";
import {
  Eye,
  Filter,
  BadgeQuestionMark,
  Plus,
  Search,
  Check,
  Phone,
  MessageCircle,
  Clock,
  Notebook,
  ArrowBigLeft,
  X,
} from "lucide-react";

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
import { MyPipelineTable as PipelineTable, coachesList } from "@/data/Data";
//import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";

import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function MyPipeline() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <MyPipelineTopbar />
        <Topbar />

        <MyPipelineTable />
      </div>
    </div>
  );
}


function MyPipelineTopbar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>My Pipeline</BreadcrumbPage>
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

function Topbar() {
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new">
        <ArrowBigLeft className="h-3 w-3" />
        <span>Back</span>
      </Button>
      <div className="flex gap-4 flex-wrap">
        <Button variant="standard" size="new">
          <BadgeQuestionMark className="h-3 w-3" />
          <span className="">Transfer Account</span>
        </Button>
        <Button variant="standard" size="new">
          <Eye className="h-3 w-3" />
          <span className="">Overdue Followups</span>
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
  const [activeTab, setActiveTab] = useState("Type");

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

  const [type, setType] = useState("Explorer");
  const [status, setStatus] = useState("Active");
  const [leadType, setLeadType] = useState("Upsell");
  const [stage, setStage] = useState("Step 1");
  const [concern, setConcern] = useState("Abandoned Cart");

  const tabList = [
    "Type",
    "Lead Type",
    "Stage",
    "Status",
    "Concern",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-sm bg-[var(--background)] "
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
          {activeTab === "Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Search by Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Explorer",
                    "Coach",
                    "Org",
                    "Partner",
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

            {activeTab === "Lead Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Search by Lead Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Upsell",
                    "Downsell",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={leadType}
                      onChange={setLeadType}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Stage" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select by Stage:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Step 1",
                    "Step 2",
                    "Step 3",
                    "All"
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={stage}
                      onChange={setStage}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select by Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Active",
                    "Converted",
                    "Deferred"
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

{activeTab === "Concern" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select by Concern:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Abandoned Cart",
                    " Assessments",
                    "Session",
                    "Feedback",
                    "Onboarding",
                    "Setup",
                    "Feedback",
                    "Retention",
                    "Visitor"
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={concern}
                      onChange={setConcern}
                    />
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





function MyPipelineTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<
    typeof PipelineTable
  >(PipelineTable[0] ? [PipelineTable[0]] : []);
  const [focusedId, setFocusedId] = useState<string | null>(PipelineTable[0]?.id || null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentUserForAssignment, setCurrentUserForAssignment] = useState<string | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [pipelineData, setPipelineData] = useState(PipelineTable);

  // Sorting logic
  const sortedData = [...pipelineData];
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

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        currentRecords.map((user) => user.id)
      );
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
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedStack.some((coach) => coach.id === id);
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


    const handleRowClick = (user: (typeof PipelineTable)[0]) => {
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
    const user = pipelineData.find(u => u.id === userId);
    if (user && user.assignedTo) {
      setSelectedAssignees(user.assignedTo.map(assignee => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentUserForAssignment) {
      const updatedUsers = pipelineData.map(user => {
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
      
      setPipelineData(updatedUsers);
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
                Select users to assign to this pipeline:
              </p>
              
              {(() => {
                const currentUser = pipelineData.find(u => u.id === currentUserForAssignment);
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
      <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex items-center justify-between border-b h-20 p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
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
              <div className="flex gap-2 ml-2">
                <Button variant="border" size="sm">
                  <Phone className="h-4 w-4 text-[var(--green)]" />
                  Call Now
                </Button>
                <Button variant="border" size="sm">
                  <MessageCircle className=" h-4 w-4 " />
                  Message
                </Button>
                <Button variant="border" size="sm">
                  <Check className=" h-4 w-4 text-[var(--green)]" />
                  Mark as Done
                </Button>
                <Button variant="border" size="sm">
                  <Clock className=" h-4 w-4" />
                  Followup
                </Button>
                <Button variant="border" size="sm">
                  <Notebook className=" h-4 w-4" />
                  Pass
                </Button>
              </div>
            )}
          </div>
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

        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("Name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Name{" "}
                  {sortConfig?.key === "Name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Type")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Type{" "}
                  {sortConfig?.key === "Type" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Objective")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Objective{" "}
                  {sortConfig?.key === "Objective" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Concern")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Concern{" "}
                  {sortConfig?.key === "Concern" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Source")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Source{" "}
                  {sortConfig?.key === "Source" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("NextFollowup")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Next Followup{" "}
                  {sortConfig?.key === "NextFollowup" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Stage")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Stage{" "}
                  {sortConfig?.key === "Stage" &&
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
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
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
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.Name}</div>
                          <div className="text-xs">{user.id}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Type}</div>
                  </TableCell>
                      <TableCell>
                          <div className="text-sm">
                              <div>{`${user.Objective}`}</div>
                          </div>
                      </TableCell>
                      
                      <TableCell>
                          <div className="text-sm">{user.Concern}</div>
                      </TableCell>
                      <TableCell>
                          <div className="text-sm">{user.Source}</div>
                  </TableCell>
                  <TableCell>
                          <div className="text-sm">{user.NextFollowup}</div>
                      </TableCell>
                      <TableCell>
                          <div className="text-sm"><Badge variant="border" className="text-sm">{user.Stage}</Badge></div>
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
                    <div className="flex items-center justify-end pr-4 ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
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
                              <Phone className="h-3 w-3 text-[var(--green)]" />
                              <span className="sr-only">Call Now</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Call Now</p>
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
                              <Clock className="h-3 w-3" />
                              <span className="sr-only">Followup</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Schedule Followup</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Notebook className="h-3 w-3" />
                              <span className="sr-only">Pass</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Pass to Team</p>
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
                className={`h-8 w-8 p-0 ${page === currentPage ? "text-white" : "text-[var(--text)]"}`}
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
