import { Search, Check, X, FileDown, Newspaper, Flag, NotebookIcon, Phone, MessageCircle, Calendar1 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown,  ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"
import asset from "@/assets/asset.jpg";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";

const tableData = [
    {
      "id": "SES0001",
      "explorer": {
        "photo": asset,
        "fullName": "Aayush Kapoor",
        "explorerId": "EXP001",
        "UG": "B.Com (Hons)"
      },
      "coach": {
        "photo": asset,
        "fullName": "Riya Sinha",
        "coachId": "COA001",
        "careerType": "Consultant"
      },
      "date": "2025-07-28",
      "time": "11:00 AM",
      "type": "Video",
      "objective": "Career Transition",
      "amount": 1000,
      "fees": "1000 | 20%",
      "share": "Partner: 200 | Platform: 800",
      "status": "Booked",
      "actions": ["View", "Cancel", "Flag", "Logs:Booked"]
    },
    {
      "id": "SES0002",
      "explorer": {
        "photo": asset,
        "fullName": "Neha Sharma",
        "explorerId": "EXP002",
        "UG": "B.A. Psychology"
      },
      "coach": {
        "photo": asset,
        "fullName": "Raj Mehta",
        "coachId": "COA002",
        "careerType": "Mentor"
      },
      "date": "2025-07-29",
      "time": "3:00 PM",
      "type": "Phone",
      "objective": "Career Consulting",
      "amount": 800,
      "fees": "800 | 15%",
      "share": "Partner: 120 | Platform: 680",
      "status": "Accepted",
      "actions": ["View", "Cancel", "Flag", "Logs:Accepted"]
    },
    {
      "id": "SES0003",
      "explorer": {
        "photo": asset,
        "fullName": "Kunal Joshi",
        "explorerId": "EXP003",
        "UG": "B.Sc Physics"
      },
      "coach": {
        "photo": asset,
        "fullName": "Sneha Verma",
        "coachId": "COA003",
        "careerType": "Educator"
      },
      "date": "2025-07-30",
      "time": "10:30 AM",
      "type": "Ask Q",
      "objective": "Career Counseling",
      "amount": 500,
      "fees": "500 | 10%",
      "share": "Partner: 50 | Platform: 450",
      "status": "Need Attention",
      "actions": ["View", "Cancel", "Flag"]
    }
  ]
  

  export function UpcomingTable(){
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "ascending" | "descending";
    } | null>(null);
    const [selectedStack, setSelectedStack] = useState<
      typeof tableData
    >(tableData[0] ? [tableData[0]] : []);
    const [focusedId, setFocusedId] = useState<string | null>(tableData[0]?.id || null);
  
    // Sorting logic
    const sortedData = [...tableData];
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
  
  
    const handleRowClick = (user: (typeof tableData)[0]) => {
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
  
    return (
      <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
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
                    <Check className="h-4 w-4 text-[var(--green)]" />
                    Approve
                  </Button>
                  <Button variant="delete" size="sm">
                    <X className=" h-4 w-4 text-[var(--red)]" />
                    Archive
                  </Button>
                  <Button variant="border" size="sm">
                    <Eye className=" h-4 w-4" />
                    View
                  </Button>
                  <Button variant="border" size="sm">
                    <Newspaper className=" h-4 w-4" />
                    Track
                  </Button>
                  <Button variant="border" size="sm">
                    <FileDown className=" h-4 w-4" />
                    Export
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
                    onClick={() => requestSort("fullName")}
                    className="cursor-pointer text-[var(--text)] text-low"
                  >
                    Explorer{" "}
                    {sortConfig?.key === "fullName" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("assignCoach")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Coach{" "}
                    {sortConfig?.key === "assignCoach" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("date")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    When{" "}
                    {sortConfig?.key === "date" &&
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
                        onClick={() => requestSort("amount")}
                        className="cursor-pointer text-[var(--text)]"
                    >
                            Amount{" "}
                        {sortConfig?.key === "amount" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                        onClick={() => requestSort("feesOrPercent")}
                        className="cursor-pointer text-[var(--text)]"
                    >
                            Fees/%{" "}
                        {sortConfig?.key === "feesOrPercent" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                        onClick={() => requestSort("share")}
                        className="cursor-pointer text-[var(--text)]"
                    >
                            Share{" "}
                        {sortConfig?.key === "share" &&
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
                  <TableHead className="text-[var(--text)] w-10 text-center pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-visible relative z-0">
                {currentRecords.map((user) => (
                  <TableRow
                    key={user.id}
                    data-id={user.id}
                    className={cn(
                      "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
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
                    <TableCell
                  >
                    <div className="flex items-center gap-2 group">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={user.explorer.photo}
                          alt={user.explorer.fullName}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.explorer.fullName}</div>
                          <div className="text-xs">{user.explorer.explorerId}</div>
                          <div className="text-[10px]">{user.explorer.UG}</div>
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
                  <TableCell
                  >
                    <div className="flex items-center gap-2 group">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={user.coach.photo}
                          alt={user.coach.fullName}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.coach.fullName}</div>
                          <div className="text-xs">{user.coach.coachId}</div>
                          <div className="text-[10px]">{user.coach.careerType}</div>
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
                            <div className="text-sm flex flex-col gap-1 group">
                                <div>{`${user.date}`}</div>
                                <div>{`${user.time}`}</div>
                                <div className="flex items-center gap-1">
                             <CustomTooltip tooltipText="Reschedule">
                                <Calendar1 className="h-3 w-3 hover:h-4 hover:w-4" />
                             </CustomTooltip>
                           </div>
                            </div>
                        </TableCell>
                        
                        <TableCell>
                            <div className="text-sm">{user.type}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-sm max-w-[100px] break-words whitespace-normal">{user.objective}</div>
                    </TableCell>
                    <TableCell>
                            <div className="text-sm">{user.amount}</div>
                    </TableCell>
                    <TableCell>
                <div className="text-sm flex flex-col gap-1 items-center">
                  <p className="text-[var(--text)]">{user.fees.split(" | ")[0]}</p>
                  <Badge variant="brand" className="text-[var(--text)] text-xs ml-1">{user.fees.split(" | ")[1]}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm max-w-[100px] break-words whitespace-normal">
                  <p className="text-[var(--text)]">{user.objective.split(" | ")[0]}</p>
                  <div>{user.objective.split(" | ")[1]}</div>
                </div>
              </TableCell>
              <TableCell>
                    <Badge variant="standard">
                      {user.status}
                    </Badge>
                  </TableCell>
                    <TableCell>
                    <div className="flex items-center justify-center pr-4">
                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                    
                  <Button
                    variant="actionIcon"
                    size="actionIcon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        View
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
                    }}
                  >
                    <X className="h-4 w-3 text-[var(--red)]" />
                    <span className="sr-only">Cancle</span>
                  </Button>
                  </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        Cancel
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
                    }}
                  >
                    <Flag className="h-4 w-3" />
                    <span className="sr-only">Flag</span>
                  </Button>
                  </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        Flag
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
                    }}
                  >
                    <NotebookIcon className="h-4 w-3" />
                    <span className="sr-only">Logs</span>
                  </Button>
                  </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        Logs
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