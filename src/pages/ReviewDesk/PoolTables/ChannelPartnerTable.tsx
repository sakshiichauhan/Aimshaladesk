import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

import {
  Bell,
  FileDown,
  Search,
  X,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import type { User } from "@/components/dashboard-page"
// import { useNavigate } from "react-router-dom"
import { ChannelPartnerReview, coachesList } from "@/data/Data";
import { cn } from "@/lib/utils";

export default function ChannelPartnerTable() {
    const [usersData, setUsersData] = useState(ChannelPartnerReview);
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
  
    const handleRowClick = (user: (typeof ChannelPartnerReview)[0]) => {
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
                    onClick={() => requestSort("name")}
                    className="cursor-pointer text-[var(--text)] text-low"
                  >
                    Name {" "}
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("speciality")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Speciality{" "}
                    {sortConfig?.key === "speciality" &&
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
                    onClick={() => requestSort("Profile")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Profile{" "}
                    {sortConfig?.key === "Profile" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("assignedTo")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Assign{" "}
                    {sortConfig?.key === "assignedTo" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
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
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]", // base classes
                        selectedStack.some((c) => c.id === user.id)
                          ? focusedId === user.id
                            ? "border-[var(--brand-color)]"
                            : "border-transparent"
                          : "border-transparent"
                      )}
                    >
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="text-low">{user.name}</div>
                      <div className="text-xs text-[var(--text)]">
                        {user.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="standard">{user.speciality}</Badge>
                    </TableCell>
                    
                    <TableCell>{user.submittedOn}</TableCell>
                    <TableCell>{user.Profile}</TableCell>
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
        <AssignmentModal />
      </div>
    );
  }