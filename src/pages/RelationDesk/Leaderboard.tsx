import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, ChevronLeft,  Search, X, Bell, Check, } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function Leaderboard() {
    return (
        <div className="flex flex-col gap-2">
          <Topbar />
            <LeaderboardTable />
            <TeamLeaderboard />
        </div>
    )
}

function Topbar() {
  
    return (
      <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-head)]">
            Leaderboard
          </h1>
        </div>
      </div>
    );
  }

  function LeaderboardTable() {
    return (
      <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
        <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
          <div className="overflow-x-auto w-full text-[var(--text)]">
            <Table>
              <TableHeader className="bg-[var(--faded)]">
                <TableRow>
                  <TableHead className="text-[var(--text)]">Metric</TableHead>
                  <TableHead className="text-[var(--text)]">This Week</TableHead>
                  <TableHead className="text-[var(--text)]">Target</TableHead>
                  <TableHead className="text-[var(--text)]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LeaderboardTableData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer group hover:bg-[var(--brand-color2)]"
                  >
                    <TableCell className="text-[var(--text)] font-medium">
                      {item.metric}
                    </TableCell>
                    <TableCell className="text-[var(--text)]">{item.thisWeek}</TableCell>
                    <TableCell className="text-[var(--text)]">{item.target}</TableCell>
                    <TableCell className="text-[var(--text)]">{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }


const LeaderboardTableData = [
    {
        "id": 1,
        "metric": "Leads Claimed",
        "thisWeek": 18,
        "target": 20,
        "status": "Almost There"
    },
    {
        "id": 2,
        "metric": "Followups Completed",
        "thisWeek": 42,
        "target": 40,
        "status": "Achieved"
    },
    {
        "id": 3,
        "metric": "Conversions (Sales)",
        "thisWeek": 6,
        "target": 8,
        "status": "Push More"
    },
    {
        "id": 4,
        "metric": "Response Time (Avg)",
        "thisWeek": "3h 20m",
        "target": "<4h",
        "status": "On Track"
    },
    {
        "id": 5,
        "metric": "Stale Leads",
        "thisWeek": 2,
        "target": 0,
        "status": "Review Needed"
    }
]


function TeamLeaderboard() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "ascending" | "descending";
    } | null>(null);
    const [selectedCoachStack, setSelectedCoachStack] = useState<
      typeof TeamLeaderboardData
    >(TeamLeaderboardData[0] ? [TeamLeaderboardData[0]] : []);
    const [focusedCoachId, setFocusedCoachId] = useState<string | null>(TeamLeaderboardData[0]?.id || null);
  
    // Sorting logic
    const sortedData = [...TeamLeaderboardData];
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
          currentRecords.map((user): string => user.id)
        );
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
  
    {/*const removeCoach = (userId: number) => {
      setSelectedCoachStack((prev) => prev.filter((c) => c.id !== userId));
      if (focusedCoachId === userId) {
        setFocusedCoachId(null);
      }
    };*/}
  
    const handleRowClick = (user: (typeof TeamLeaderboardData)[0]) => {
   
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
          <div className="flex items-center justify-between border-b  h-20 p-4 mt-auto">
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
                    onClick={() => requestSort("rank")}
                    className="cursor-pointer text-[var(--text)] text-low"
                  >
                    Rank{" "}
                    {sortConfig?.key === "rank" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("agentName")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Agent Name{" "}
                    {sortConfig?.key === "agentName" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("leadsClaimed")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Leads Claimed{" "}
                    {sortConfig?.key === "leadsClaimed" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("followups")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Followups{" "}
                    {sortConfig?.key === "followups" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("conversions")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Conversions{" "}
                    {sortConfig?.key === "conversions" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("score")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Score{" "}
                    {sortConfig?.key === "score" &&
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
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
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
                      <div className="text-low">{user.rank}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.agentName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-low">{user.leadsClaimed}</div>
                      
                    </TableCell>
                    <TableCell>
                      <Badge variant="standard">{user.followups}</Badge>
                    </TableCell>
                    <TableCell>{user.conversions}</TableCell>
                    <TableCell>
                      <div className="text-low">{user.score}</div>
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


const TeamLeaderboardData = [
    {
        "id": "LDB0001",
        "rank": "1",
        "agentName": "Aisha Khan",
        "leadsClaimed": 24,
        "followups": 50,
        "conversions": 8,
        "score": 96
    },
    {
        "id": "LDB0002",
        "rank": "2",
        "agentName": "Rohan Gupta",
        "leadsClaimed": 22,
        "followups": 47,
        "conversions": 6,
        "score": 89
    },
    {
        "id": "LDB0003",
        "rank": "3",
        "agentName": "Deepak Sharma",
        "leadsClaimed": 18,
        "followups": 42,
        "conversions": 7,
        "score": 85
    },
    {
        "id": "LDB0004",
        "rank": "4",
        "agentName": "Mansi Patel",
        "leadsClaimed": 17,
        "followups": 38,
        "conversions": 5,
        "score": 78
    },
    {
        "id": "LDB0005",
        "rank": "5",
        "agentName": "Nikhil Raj",
        "leadsClaimed": 14,
        "followups": 32,
        "conversions": 3,
        "score": 66
    }
]