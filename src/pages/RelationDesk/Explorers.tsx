import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, NotebookText, Phone, Plus } from "lucide-react";
import {
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import CitySelection from "@/components/ui/CitySelection";
import DatePicker from "@/components/ui/DatePicker";
import {
  Bell,
  FileDown,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { Eye, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { mockUsers, coachesList } from "@/data/Data";
import { cn } from "@/lib/utils";
import CountUp from "@/components/ui/countup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePickerWithRange } from "@/components/date-picker";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";


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
    title: "Total Explorers",
    value: 12457,
    icon: Users,
  },
  {
    title: "Active Explorers (30 Days)",
    value: 4385,
    icon: UserCheck,
  },
  {
    title: "New Signups (This Week)",
    value: 312,
    icon: UserPlus,
  },
  {
    title: "New Signups (This Month)",
    value: 1038,
    icon: MessageSquare,
  },
  {
    title: "Total Enquiries",
    value: 642,
    icon: NotebookText,
  },
];

export function Explorers() {


  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-2">
        <Topbar />
        <StatsCards />
        <Buttonbar/>
       
        <div className="">
          <ExplorerTable />
        </div>
      </main>
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
                <BreadcrumbPage>Explorers</BreadcrumbPage>
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
      </div>
    </div>
  );
}


function Buttonbar() {
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <div className="flex gap-4">
      <Button variant="brand" size="new">
        <Plus className="h-3 w-3" />
        <span className="">Add Explorer</span>
      </Button>

      </div>
    </div>
  );
}


function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
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
              <div className={`${color2} text-2xl`}>
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
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

  const [type, setType] = useState("Registered");
  const [age, setAge] = useState("10-13");
  const [grade, setGrade] = useState("6-12");
  const [test, setTest] = useState("Taken");
  const [session, setSession] = useState("Booked");
  const [referral, setReferral] = useState("BA");

  const tabList = [
    "General",
    "User Type",
    "Age Group",
    "Class / Grade",
    "State / City",
    "Test Status",
    "Session Status",
    "Referral Source",
    "Last Activity",
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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">
                  Enter Name/Email/Phone :
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter .."
                  type="text"
                  className="mt-4 w-full "
                />
              </>
            )}

            {activeTab === "User Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select User Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Registered", "Enquiry", "Inactive (30/60/90 Days)"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={type}
                        onChange={setType}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Age Group" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Age Group :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["10-13", "14-17", "18=25", "25+"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={age}
                      onChange={setAge}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "State / City" && (
              <>
                <CitySelection />
              </>
            )}

            {activeTab === "Class / Grade" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Class / Grade :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["6-12", "College", "Graduate"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={grade}
                      onChange={setGrade}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Test Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Test Status :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {["Taken", "Not Taken", "In Progress"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={test}
                      onChange={setTest}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Session Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Session Status :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {["Booked", "Completed", "Missed", "No Sessions"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={session}
                        onChange={setSession}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Referral Source" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Referral Source :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {["BA", "Consultant", "Organisation", "Organic"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={referral}
                        onChange={setReferral}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Last Activity" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter You Last Activity Date:
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

function ExplorerTable() {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof usersData>(
    usersData[0] ? [usersData[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    usersData[0]?.id || null
  );
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentUserForAssignment, setCurrentUserForAssignment] = useState<string | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  // Sorting logic
  const sortedData = [...usersData];
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
        currentRecords.map((user): string => user.id.toString())
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
      const isInStack = selectedStack.some((key) => key.id === id);
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

  {
    /*const removeCoach = (userId: string) => {
    setSelectedCoachStack((prev) => prev.filter((c) => c.id !== userId));
    if (focusedCoachId === userId) {
      setFocusedCoachId(null);
    }
  };*/
  }

  const handleRowClick = (user: (typeof mockUsers)[0]) => {
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
    const user = usersData.find(u => u.id === userId);
    if (user && user.assignedTo) {
      setSelectedAssignees(user.assignedTo.map(assignee => assignee.name));
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentUserForAssignment) {
      // Update the usersData with new assignments
      const updatedUsers = usersData.map(user => {
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
      setUsersData(updatedUsers);
      
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

  // Assignment Modal Component
  const AssignmentModal = () => {
    if (!showAssignmentModal) return null;

    // Get the current user's assigned coaches to show their images
    const currentUser = usersData.find(u => u.id === currentUserForAssignment);
    const currentUserAssignedImages = currentUser?.assignedTo || [];

    // Create a list of all available assignees with their current assignment status and correct images
    const availableAssignees = coachesList.map(coach => {
      // Check if this coach is currently assigned to get the correct image
      const currentAssignment = currentUserAssignedImages.find(assigned => assigned.name === coach.name);
      
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
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
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
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="border" size="sm">
                  <FileDown className=" h-4 w-4" />
                  Export list
                </Button>
                <Button variant="delete" size="sm">
                  <X className=" h-4 w-4 text-[var(--red)]" />
                  Mark Inactive / Remove
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
                  onClick={() => requestSort("profile.name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Profile{" "}
                  {sortConfig?.key === "profile.name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("UserType")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  User Type{" "}
                  {sortConfig?.key === "UserType" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("ProfileStage")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Profile Stage{" "}
                  {sortConfig?.key === "ProfileStage" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Sessions")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Source{" "}
                  {sortConfig?.key === "Source" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("assignedTo")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Assigned to{" "}
                  {sortConfig?.key === "assignedTo" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("lastActive")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Last Active / DOJ{" "}
                  {sortConfig?.key === "lastActive" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Status")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status{" "}
                  {sortConfig?.key === "Status" &&
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
                    "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                    selectedUsers.some((c) => c === user.id)
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
                      "pl-3 transition-all duration-200 border-l-4 hover:border-[var(--brand-color)]",
                      selectedUsers.some((c) => c === user.id)
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
                    <div className="flex items-center gap-2 group">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                            src={user.photo}
                          alt={user.name}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs">{user.id}</div>
                          <div className="text-[10px]">{user.userType}</div>
                          <div className="flex items-center gap-1">
                             <CustomTooltip tooltipText="Call">
                               <Phone className="h-3 w-3 hover:h-4 hover:w-4" />
                             </CustomTooltip>
                             <span className="group-hover:text-[var(--text)] hidden group-hover:inline-flex items-center gap-1 text-[15px]">|</span>
                             <CustomTooltip tooltipText="Message">
                               <MessageCircle className="h-3 w-3 hover:h-4 hover:w-4" />
                             </CustomTooltip>
                           </div>
                        </div>
                      </div>

                    </div>
                  </TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.profileStage}</Badge>
                  </TableCell>
                  
                  <TableCell>{user.source}</TableCell>
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
                    <div className="text-sm">{user.joinDate}</div>
                    <div className="text-xs text-[var(--text)]">
                      {user.lastLogin}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      //@ts-ignore
                      variant={
                        user.status === "Active" ? "success" : "secondary"
                      }
                      className={
                        user.status === "Active"
                          ? "bg-[var(--green2)] text-[var(--green)]"
                          : "bg-[var(--red2)] text-[var(--red)]"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4 ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="actionIcon" 
                              size="actionIcon"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("view-profile");
                              }}
                            >
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
                              <span className="sr-only">Chat</span>
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
                            <p>Flag User</p>
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

      {/*<div className="xl:block hidden">
      <div className="lg:h-[500px] xl:min-w-90 xxl:min-w-100  sticky xl:top-[10px] shadow-none lg:scale-100 min-w-full h-fit">
        <AnimatePresence>
          {selectedCoachStack.map((coach, index) => {
            const isTopCard =
              coach.id === String(focusedCoachId) ||
              (focusedCoachId === null && index === 0);
            const cardIndex = selectedCoachStack.length - 1 - index;

            return (
              <motion.div
                key={coach.id}
                className="absolute left-0 right-0 mx-auto max-w-md w-full h-max cursor-pointer shadow-none"
                style={{
                  top: `${cardIndex * 30}px`,
                  zIndex: isTopCard ? 100 : 10 + cardIndex,
                }}
                onClick={() => bringToTop(coach.id)}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isTopCard ? 1 : 0.95,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={isTopCard ? {} : { scale: 0.97 }}
              >
                <motion.div
                  className="relative border h-full border-border rounded-lg overflow-hidden bg-background"
                  whileTap={isTopCard ? { scale: 0.98 } : {}}
                >
                  {!isTopCard && (
                    <motion.div
                      className="flex items-center justify-between text-xs text-[var(--text)] px-4 py-2 bg-accent/10 rounded-t-lg z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div>
                        <span className="truncate max-w-[100px] block">
                          {coach.name}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCoach(coach.id);
                          }}
                          className="text-[var(--red)] hover:text-[var(--red)/70] text-[16px]"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {isTopCard && (
                    
                    <motion.div
                      className="flex  flex-col  justify-center items-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex-col ">
                      <motion.img
                        src={coach.photo}
                        alt={coach.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg m-auto"
                        whileHover={{ scale: 1.05 }}
                      />
                      <h1 className="text-xl font-semibold mt-4 text-[var(--text-head)]">
                        {coach.name}
                      </h1>
                      <h2 className="text-sm text-[var(--text)] mb-2">
                        {coach.userType}
                      </h2>

                      <div className="flex justify-center gap-3 mt-2">
                        <motion.button
                          className="bg-[var(--green2)] rounded-full p-2 hover:[var(--green2)/80] transition-colors"
                          title="Call"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-5 h-5 text-[var(--green)]" />
                        </motion.button>
                        <motion.button
                          className="bg-[var(--red2)] rounded-full p-2 hover:bg-[var(--red2)/80] dark:bg-[var(--red2)] transition-colors"
                          title="Email"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail className="w-5 h-5 text-[var(--red)]" />
                        </motion.button>
                        <motion.button
                          className="bg-[var(--yellow2)] dark:bg-[var(--yellow2)] rounded-full p-2 hover:bg-[var(--yellow2)/80] transition-colors"
                          title="Message"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="w-5 h-5 text-[var(--yellow)]" />
                        </motion.button>
                      </div>
                      </div>
                      <div className="mt-6 text-sm text-left w-full">
                        <h3 className="font-semibold text-[var(--text-head)] mb-1">
                          PERSONAL INFORMATION
                        </h3>
                        <p className="text-[var(--text)] text-sm mb-4">
                          This coach has not added a bio.
                        </p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-[var(--text)]">
                          <div className="font-medium">Designation</div>
                          <div>{coach.userType}</div>
                          <div className="font-medium">Email ID</div>
                          <div>{coach.email}</div>
                          <div className="font-medium">Phone No</div>
                          <div>{coach.phone}</div>
                          <div className="font-medium">Lead Score</div>
                          <div>-</div>
                          <div className="font-medium">Tags</div>
                          <div className="flex gap-2">
                            <Badge variant="brand" className="text-xs ">
                              Lead
                            </Badge>
                            <Badge variant="brand" className="text-xs">
                              Partner
                            </Badge>
                          </div>
                          <div className="font-medium">Last Contacted</div>
                          <div>{coach.lastLogin}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>*/}
      <AssignmentModal />
    </div>
  );
}
