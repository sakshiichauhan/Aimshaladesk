import { Search, Bell, Check, X, Flag, ChevronDown, ChevronRight, ChevronLeft, Eye, Phone, MessageCircle  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { orgTableData } from "@/data/Data";
import { CustomTooltip } from "@/components/application-component/CustomTooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useEffect, useState } from "react";


export default function UniversityTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  // side "stack" highlight behavior
  const [selectedStack, setSelectedStack] = useState<typeof orgTableData>(
    orgTableData[0] ? [orgTableData[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(orgTableData[0]?.id || null);

  // 🔒 Always show only Colleges
  const filteredData = orgTableData.filter((entry) => entry.type === "University");

  // Sorting
  const sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      // basic comparator with a small guard for "contact"
      const getVal = (row: any, key: string) => {
        if (key === "contact") return row.contact?.email ?? "";
        return row[key as keyof typeof row];
      };
      const aValue = getVal(a, sortConfig.key);
      const bValue = getVal(b, sortConfig.key);

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

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
      setSelectedStack((prev) => [coach, ...prev.filter((c) => c.id !== userId)]);
      setFocusedId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedStack.some((coach) => coach.id === id);
      const isTop = focusedId === id;

      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");

      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedStack, focusedId]);

  const handleRowClick = (user: (typeof orgTableData)[0]) => {
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
    <div className="flex flex-col w-full">
      {/* Header actions (no tabs) */}
      <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
        <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
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
              <div className="flex justify-around items-center border rounded-md overflow-hidden bg-[var(--faded)]">
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

          {/* Table */}
          <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
            <Table className="w-full caption-top border-collapse overflow-y-visible">
              <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] opacity-100">
                <TableRow>
                  <TableHead className="min-w-[40px]"></TableHead>
                  <TableHead onClick={() => requestSort("name")} className="cursor-pointer text-[var(--text)]">
                    Organization {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("location")} className="cursor-pointer text-[var(--text)]">
                    Location {sortConfig?.key === "location" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("type")} className="cursor-pointer text-[var(--text)]">
                    Type {sortConfig?.key === "type" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("claimStatus")} className="cursor-pointer text-[var(--text)]">
                    Claimed Status {sortConfig?.key === "claimStatus" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("representative")} className="cursor-pointer text-[var(--text)]">
                    Representative {sortConfig?.key === "representative" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead onClick={() => requestSort("registered")} className="cursor-pointer text-[var(--text)]">
                    Registered/Last Active {sortConfig?.key === "registered" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-[var(--text)] text-center pr-4 w-2">Actions</TableHead>
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
                      "pl-3 transition-all duration-200 border-l-4 hover:border-[var(--brand-color)]",
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
                    <div className="flex items-center gap-2 group">
                      {/* <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                            src={user.photo}
                          alt={user.name}
                          className="h-10 w-10 object-cover"
                        />
                      </div> */}
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs">{user.id}</div>
                          <div className="text-[10px]">{user.type}</div>
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
                      <div className="text-sm">
                        <div>{`${user.location}`}</div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="standard">{user.type}</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">{user.claimStatus}</div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">{user.representative}</div>
                    </TableCell>

                    <TableCell>
                      <div className="text-low">{user.registered}</div>
                      <div className="text-xs text-[var(--text)]">{user.lastActive}</div>
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
                                  // navigate(`/user-details/${user.id}`)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="actionIcon"
                                size="actionIcon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // approve logic
                                }}
                              >
                                <Check className="h-4 w-3 text-[var(--green)]" />
                                <span className="sr-only">Approve</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Approve</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="actionIcon"
                                size="actionIcon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // block logic
                                }}
                              >
                                <Flag className="h-4 w-3" />
                                <span className="sr-only">Flag</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Flag</p>
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

          {/* Footer / Pagination */}
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
                {Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length} explorers
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
