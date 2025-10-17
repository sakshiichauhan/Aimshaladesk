import { Button } from "@/components/ui/button";
import {
  Search,
  Eye,
  Building2,
  Filter,
  Check,
  X,
  Bell,
  Plus,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserPlus } from "lucide-react";
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
import { coachTableData, coachesList } from "@/data/Data";
//import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/DatePicker";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import CitySelection from "@/components/ui/CitySelection";
import { DatePickerWithRange } from "@/components/date-picker";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";
import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";


interface AssignedUser {
  name: string;
  photo: string;
}

interface CoachData {
  id: string;
  type: string;
  profile: {
    name: string;
    photo: string;
    gender: string;
    type: string;
    userid: string;
  };
  specialty: string;
  contact: {
    email: string;
    phone: string;
  };
  status: string;
  orgLinked: string;
  lastActive: string;
  joined: string;
  sessions: {
    total: number;
    completed: number;
  };
  assessments: number;
  actions: string[];
  assignedTo?: AssignedUser[];
}

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

const stats = [
  {
    title: "Total Coaches",
    value: "1,234",
    icon: Users,
  },
  {
    title: "New This Week",
    value: "27",
    icon: UserPlus,
  },
  {
    title: "Pending Approvals",
    value: "34",
    icon: UserCheck,
  },
  {
    title: "Coaches with Orgs",
    value: "182",
    icon: Building2,
  },
];

export function Coaches() {
  return (
    <div className="flex flex-col gap-2">
      <Topbar />
      <StatsCards />
      <CoachTableSection />
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
                <BreadcrumbPage>Coaches</BreadcrumbPage>
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

  const [status, setStatus] = useState("Approved");
  const [specialisation, setSpecialisation] = useState("Career");
  const [org, setOrg] = useState("Yes");
  const [session, setSession] = useState("1:1");

  const tabList = [
    "General",
    "Status",
    "Specialisation",
    "Session Type",
    "Organisation Linked",
    "Location",
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

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select your current Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Approved", "Pending", "Blocked"].map((option) => (
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

            {activeTab === "Specialisation" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Your Specialisation :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Career", "Psychology", "STEM", "Law", "Design"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={specialisation}
                        onChange={setSpecialisation}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Location" && (
              <>
                <CitySelection />
              </>
            )}

            {activeTab === "Organisation Linked" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Are you Linkrd with any Organisation :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Yes", "No"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={org}
                      onChange={setOrg}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Session Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Session type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                  {["1:1", "Group", "Instant", "B2B"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={session}
                      onChange={setSession}
                    />
                  ))}
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

function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
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

function CoachTableSection() {
  const navigate = useNavigate();
  const handleAssignUsers = (coachId: string) => {
    setCurrentCoachForAssignment(coachId);
    const coach = coachData.find((c: CoachData) => c.id === coachId);
    if (coach && coach.assignedTo) {
      setSelectedAssignees(
        coach.assignedTo.map((assignee: AssignedUser) => assignee.name)
      );
    } else {
      setSelectedAssignees([]);
    }
    setShowAssignmentModal(true);
  };

  const handleSaveAssignment = () => {
    if (currentCoachForAssignment) {
      const updatedCoaches = coachData.map((coach: CoachData) => {
        if (coach.id === currentCoachForAssignment) {
          const selectedCoaches = coachesList
            .filter(
              (c: { name: string; photo: string; specialization: string }) =>
                selectedAssignees.includes(c.name)
            )
            .map((c: { name: string; photo: string }) => ({
              name: c.name,
              photo: c.photo,
            }));

          return {
            ...coach,
            assignedTo: selectedCoaches,
          };
        }
        return coach;
      });

      // Update the data
      setCoachData(updatedCoaches);
      setShowAssignmentModal(false);
      setCurrentCoachForAssignment(null);
      setSelectedAssignees([]);
    }
  };

  const toggleAssignee = (assigneeName: string) => {
    if (selectedAssignees.includes(assigneeName)) {
      setSelectedAssignees(
        selectedAssignees.filter((name) => name !== assigneeName)
      );
    } else {
      setSelectedAssignees([...selectedAssignees, assigneeName]);
    }
  };

  const AssignmentModal = () => {
    if (!showAssignmentModal) return null;

    const currentCoach = coachData.find(
      (c: CoachData) => c.id === currentCoachForAssignment
    );
    const currentCoachAssignedImages = currentCoach?.assignedTo || [];

    const availableAssignees = coachesList.map(
      (coach: { name: string; photo: string; specialization: string }) => {
        const currentAssignment = currentCoachAssignedImages.find(
          (assigned: AssignedUser) => assigned.name === coach.name
        );

        return {
          name: coach.name,
          photo: coach.photo,
          specialization: coach.specialization,
          isCurrentlyAssigned: currentAssignment !== undefined,
        };
      }
    );

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
              Select users to assign to this coach:
            </p>

            {currentCoachAssignedImages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-[var(--text)] mb-2">
                  Currently Assigned:
                </p>
                <div className="flex -space-x-2">
                  {currentCoachAssignedImages.map(
                    (assigned: AssignedUser, index: number) => (
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
                    )
                  )}
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
                    <span className="text-sm text-[var(--text)]">
                      {assignee.name}
                    </span>
                    <span className="text-xs text-[var(--text)] opacity-70">
                      {assignee.specialization}
                    </span>
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
            <Button variant="brand" onClick={handleSaveAssignment}>
              Save Assignment
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [coachData, setCoachData] = useState<CoachData[]>(
    coachTableData as CoachData[]
  );
  const [selectedCoachStack, setSelectedCoachStack] = useState<CoachData[]>(
    coachTableData[0] ? [coachTableData[0] as CoachData] : []
  );
  const [focusedCoachId, setFocusedCoachId] = useState<string | null>(
    coachTableData[0]?.id || null
  );
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentCoachForAssignment, setCurrentCoachForAssignment] = useState<
    string | null
  >(null);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  // Sorting logic
  const sortedData = [...coachTableData];
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

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRecords.map((user): string => user.id));
    }
  };

  const bringToTop = (userId: string) => {
    const coach = selectedCoachStack.find((c) => c.id === userId);
    if (coach) {
      setSelectedCoachStack((prev) => [
        coach,
        ...prev.filter((c) => c.id !== userId),
      ]);
      setFocusedCoachId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");

    allRows.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedCoachStack.some((coach) => coach.id === id);
      const isTop = focusedCoachId === id;

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
  }, [selectedCoachStack, focusedCoachId]);

  {
    /*const removeCoach = (userId: number) => {
    setSelectedCoachStack((prev) => prev.filter((c) => c.id !== userId));
    if (focusedCoachId === userId) {
      setFocusedCoachId(null);
    }
  };*/
  }

  const handleRowClick = (user: (typeof coachTableData)[0]) => {
    const exists = selectedCoachStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedCoachStack((prev) => {
        const updated = [user, ...prev];
        return updated.slice(0, 5); // limit to 5
      });
      setFocusedCoachId(user.id);
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

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <AssignmentModal />
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
                  onClick={() => requestSort("profile.name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Profile{" "}
                  {sortConfig?.key === "profile.name" &&
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
                  onClick={() => requestSort("Specialty")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Specialty{" "}
                  {sortConfig?.key === "Specialty" &&
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
                  onClick={() => requestSort("orgLinked")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Organisation{" "}
                  {sortConfig?.key === "orgLinked" &&
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
                  onClick={() => requestSort("lastActive")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Last Active / DOJ{" "}
                  {sortConfig?.key === "lastActive" &&
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
                    "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                    selectedCoachStack.some((c) => c.id === user.id)
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
                      selectedCoachStack.some((c) => c.id === user.id)
                        ? focusedCoachId === user.id
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
                            src={user.profile.photo}
                          alt={user.profile.name}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.profile.name}</div>
                          <div className="text-xs">{user.id}</div>
                          <div className="text-[10px]">{user.profile.type}</div>
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
                  <TableCell>
                    <div className="text-low">{user.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.specialty.split(",").map((special, id) => (
                        <Badge key={id} variant="standard">
                          {special}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.orgLinked}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {user.assignedTo?.map(
                          (assigned: AssignedUser, index: number) => (
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
                          )
                        )}
                        <div
                          className="h-8 w-8 rounded-full border-2 border-white shadow-sm bg-[var(--brand-color2)] flex items-center justify-center cursor-pointer hover:bg-[var(--brand-color3)] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignUsers(user.id);
                          }}
                          title="Assign Users"
                        >
                          <Plus className="h-4 w-4 text-[var(--brand-color)]" />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.lastActive}</div>
                    <div className="text-xs text-[var(--text)]">
                      {user.joined}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
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
                              <Check className="h-3 w-3 text-[var(--green)]" />
                              <span className="sr-only">Approve</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Approve</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <X className="h-3 w-3 text-[var(--red)]" />
                              <span className="sr-only">Block</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Block</p>
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
    <div className="lg:h-[500px] xl:min-w-90 xxl:min-w-100 sticky xl:top-[10px] shadow-none lg:scale-100 min-w-full h-fit">
    <AnimatePresence>
      {selectedCoachStack.map((coach, index) => {
        const isTopCard =
          coach.id === Number(focusedCoachId) ||
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
            <div className="relative border h-full border-border rounded-lg overflow-hidden bg-background">
              
              {!isTopCard && (
                <div className="flex items-center justify-between text-xs text-[var(--text)] px-4 py-2 bg-accent/10 rounded-t-lg z-10">
                  <span className="truncate max-w-[100px] block">{coach.profile.name}</span>
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
              )}

              
              {isTopCard && (
                <div className="flex flex-col justify-center items-center p-6">
                  <div className="w-full max-w-md space-y-6">

                    
                    <section className="text-center">
                      <img
                        src={coach.profile.photo}
                        alt={coach.profile.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-primary mx-auto shadow-md"
                      />
                      <h1 className="text-xl font-semibold mt-4 text-[var(--text-head)]">{coach.profile.name}</h1>
                      <div className="text-sm text-[var(--text)] mb-2">
                        {coach.profile.gender === "M" ? "Male" : "Female"} &bull; {coach.orgLinked}
                      </div>

                      <div className="flex justify-center gap-3 mt-2">
                        <button className="bg-[var(--green2)] rounded-full p-2" title="Call">
                          <Phone className="w-5 h-5 text-[var(--green)]" />
                        </button>
                        <button className="bg-[var(--red2)] rounded-full p-2" title="Email">
                          <Mail className="w-5 h-5 text-[var(--red)]" />
                        </button>
                        <button className="bg-[var(--yellow2)] rounded-full p-2" title="Message">
                          <MessageCircle className="w-5 h-5 text-[var(--yellow)]" />
                        </button>
                      </div>
                    </section>

                    
                    <section className="text-sm text-[var(--text)]">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="font-medium">Email ID</div>
                        <div>{coach.contact.email}</div>
                        <div className="font-medium">Phone No</div>
                        <div>{coach.contact.phone}</div>
                        <div className="font-medium">Public Profile</div>
                        <div className="text-blue-600 underline cursor-pointer">View Profile</div>
                      </div>
                    </section>

                    
                    <section className="text-sm text-[var(--text)]">
                      <h3 className="font-semibold text-[var(--text-head)] mb-1">Activities</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="font-medium">Sessions Delivered</div>
                        <div>{coach.sessions?.total || 0}</div>
                        <div className="font-medium">Ratings</div>
                        <div>⭐ 4.5</div>
                        <div className="font-medium">Assessments Used</div>
                        <div>{coach.assessments || 0}</div>
                        <div className="font-medium">Masterclasses</div>
                        <div>—</div>
                        <div className="font-medium">Topics Covered</div>
                        <div>—</div>
                      </div>
                    </section>

                    
                    <section className="text-sm text-[var(--text)]">
                      <h3 className="font-semibold text-[var(--text-head)] mb-1">Organisation & Assignments</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="font-medium">Linked Institutions</div>
                        <div>{coach.orgLinked}</div>
                        <div className="font-medium">Segments</div>
                        <div>UG, Career Changers</div>
                        <div className="font-medium">Availability</div>
                        <div>Weekends</div>
                      </div>
                    </section>

                    
                    <section className="text-sm text-[var(--text)]">
                      <h3 className="font-semibold text-[var(--text-head)] mb-1">Internal Notes</h3>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="font-medium">Admin Comments</div>
                        <div>—</div>
                        <div className="font-medium">Consultant Reviews</div>
                        <div>—</div>
                        <div className="font-medium">Warnings</div>
                        <div>None</div>
                      </div>
                    </section>

                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
</div>*/}
    </div>
  );
}
