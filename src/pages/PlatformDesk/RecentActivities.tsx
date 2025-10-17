import { Button } from "@/components/ui/button";
import {
  Search,
  Check,
  Eye,
  Bell,
  X,
  Funnel,
  Plus,
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown, } from "lucide-react";
import { coachesList, RecentActivityTable, } from "@/data/Data";
//import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import { CardTitle } from "@/components/ui/card";
import RadioButton from "@/components/ui/Radiobutton";
import DatePicker from "@/components/ui/DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/date-picker";
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


const stats = [
  {
    title: "Active Users",
    value: 1234,
    icon: "Users",
    performance: "Up",
    activityLabel: 1050,
  },
  {
    title: "Live Users",
    value: 678,
    icon: "Live",
    performance: "Down",
    activityLabel: 590,
  },
  {
    title: "Guest Users",
    value: 432,
    icon: "Guest",
    performance: "Up",
    activityLabel: 410,
  },
  {
    title: "Registered Users",
    value: 5210,
    icon: "UserPlus",
    performance: "Up",
    activityLabel: 4900,
  },
  {
    title: "New Signups",
    value: 89,
    icon: "UserAdd",
    performance: "Up",
    activityLabel: 76,
  },
  {
    title: "New Leads",
    value: 54,
    icon: "Leads",
    performance: "Down",
    activityLabel: 60,
  },
  {
    title: "New Cases",
    value: 21,
    icon: "Cases",
    performance: "Up",
    activityLabel: 18,
  },
  {
    title: "Payments",
    value: 120500,
    icon: "Payments",
    performance: "Up",
    activityLabel: 113000,
  },
  {
    title: "Payouts",
    value: 95300,
    icon: "Payouts",
    performance: "Down",
    activityLabel: 100000,
  },
  {
    title: "Sessions",
    value: 3145,
    icon: "Sessions",
    performance: "Up",
    activityLabel: 2990,
  },
  {
    title: "Comments",
    value: 210,
    icon: "Comments",
    performance: "Up",
    activityLabel: 185,
  },
  {
    title: "Helpfuls",
    value: 124,
    icon: "Helpful",
    performance: "Up",
    activityLabel: 112,
  },
  {
    title: "Feedback",
    value: 38,
    icon: "Feedback",
    performance: "Down",
    activityLabel: 44,
  },
  {
    title: "Review",
    value: 67,
    icon: "Review",
    performance: "Up",
    activityLabel: 60,
  },
  {
    title: "Calls",
    sections: [
      {
        subtitle: "Inbound",
        value: 76,
        icon: "CallInbound",
        performance: "Up",
        activityLabel: 70,
      },
      {
        subtitle: "Outbound",
        value: 53,
        icon: "CallOutbound",
        performance: "Down",
        activityLabel: 59,
      },
    ],
  },
  {
    title: "Emails",
    value: 134,
    icon: "Mail",
    performance: "Down",
    activityLabel: 148,
  },
  {
    title: "Whatsapp",
    sections: [
      {
        subtitle: "Sent",
        value: 198,
        icon: "WhatsappSent",
        performance: "Up",
        activityLabel: 180,
      },
      {
        subtitle: "Received",
        value: 212,
        icon: "WhatsappReceived",
        performance: "Up",
        activityLabel: 205,
      },
    ],
  },
];

function StatsCards() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-sm border bg-[var(--background)] min-w-[120px] max-w-[200px] flex-shrink-0 min-h-[55px] p-2"
          >
            <div className="flex flex-col items-center gap-1">
              {"sections" in stat ? (
                <div className="w-full flex gap-2">
                  {stat.sections?.map((section, idx) => (
                    <div key={idx} className="flex-1">
                      <div className="flex items-center">
                        <div className="text-base font-semibold">
                          {section.value}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[11px] uppercase text-light line-clamp-1">
                          {section.subtitle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex items-center">
                    <div className="text-base font-semibold">{stat.value}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[11px] uppercase text-light line-clamp-1">
                      {stat.title}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentActivities() {
  return (
    <div className="flex gap-2 flex-col">
      <Topbar />
      <StatsCards />
      <ActivityTable />
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
                <BreadcrumbPage>Recent Activities</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <DatePickerWithRange />
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
          aria-label={showFilter ? "Hide Filters" : "Show Filters"}
        >
          <Funnel className="h-4 w-4" />
        </Button>
        {showFilter && <AdvanceFilter onClose={() => setShowFilter(false)} />}
      </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
}

function AdvanceFilter({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Date Range");

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

  const [entitytype, setEntity] = useState("Coach");
  const [act, setAct] = useState("Update");
  const [status, setStatus] = useState("Pending");

  const tabList = ["Date Range", "Entity Type", "Activity Type", "Status"];

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

          <div className="p-6 overflow-y-auto relative w-full">
            {activeTab === "Entity Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Entity Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Coach", "Explorer", "School", "Finance", "Support"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={entitytype}
                        onChange={setEntity}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Activity Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Activity Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Update", "Payment", "Report", "Resource", "Session"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={act}
                        onChange={setAct}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select from Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {["Pending", "Completed", "Flagged"].map((option) => (
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

            {activeTab === "Last Activity" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter the Data Range:
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

function ActivityTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [recentActivityTable, setRecentActivityTable] = useState(RecentActivityTable);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentUserForAssignment, setCurrentUserForAssignment] = useState<string | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  // Sorting logic
  const sortedData = [...recentActivityTable];
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
  const toggleSelectUser = (userId: string) => {
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
      setSelectedUsers(currentRecords.map((user): string => user.id));
    }
  };

  const handleAssignUsers = (userId: string) => {
    setCurrentUserForAssignment(userId);
    const user = recentActivityTable.find(u => u.id === userId);
    if (user && user.assignedTo) {
      setSelectedAssignees(user.assignedTo.map((assignee: any) => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentUserForAssignment) {
      // Update the usersData with new assignments
      const updatedUsers = recentActivityTable.map((user: any) => {
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
      
      // Update the state with new data
      setRecentActivityTable(updatedUsers);

      // In a real app, you would update the backend here
      console.log('Updated assignments:', updatedUsers);
      
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

  const AssignmentModal = () => {
    if (!showAssignmentModal) return null;

    // Get the current user's assigned coaches to show their images
    const currentUser = recentActivityTable.find(u => u.id === currentUserForAssignment);
    const currentUserAssignedImages = currentUser?.assignedTo || [];

    // Create a list of all available assignees with their current assignment status and correct images
    const availableAssignees = coachesList.map((coach: any) => {
      // Check if this coach is currently assigned to get the correct image
      const currentAssignment = currentUserAssignedImages.find((assigned: any) => assigned.name === coach.name);
      
      return {
        name: coach.name,
        photo: currentAssignment ? currentAssignment.photo : coach.photo, // Use assigned image if available
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
              Select users to assign to this explorer:
            </p>
            
            {/* Show current assigned images */}
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
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
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
                {" "}
                {/*wrap */}
                <Button variant="border" size="sm">
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="border" size="sm">
                  <Check className=" h-4 w-4 text-[var(--green)]" />
                  Approve All
                </Button>
                <Button variant="delete" size="sm">
                  <X className=" h-4 w-4 text-[var(--red)]" />
                  Block / Remove
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
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("dateTime")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span>Date & Time</span>
                    {sortConfig?.key === "dateTime" ? (
                      sortConfig.direction === "ascending" ? (
                        <ChevronUp className="h-4 w-4 text-[var(--brand-color)]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[var(--brand-color)]" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 text-[var(--text-light)]" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("activityType")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Activity Type{" "}
                  {sortConfig?.key === "activityType" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("entity")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Entity{" "}
                  {sortConfig?.key === "entity" &&
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
                <TableHead className="text-[var(--text)] ">Assign to</TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]"
                  )}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 border-l-[var(--background)] group-hover:border-[var(--brand-color)]"
                    )}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {user.dateTime.split(",")[0]}
                      </span>
                      <span className="text-xs text-[var(--text-light)]">
                        {user.dateTime.split(",")[1]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.activityType}</TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.entity}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[3000px] break-words whitespace-normal">{user.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                            {user.assignedTo?.map((assigned: any, index: any) => (
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
{/* 
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Check className="h-3 w-3 " />
                              <span className="sr-only">Verify</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verify Activity</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Star className="h-3 w-3" />
                              <span className="sr-only">Review</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Review</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Newspaper className="h-3 w-3" />
                              <span className="sr-only">Followups</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Followups</p>
                          </TooltipContent>
                        </Tooltip> */}
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
      </div>
      <AssignmentModal />
    </div>
  );
}
