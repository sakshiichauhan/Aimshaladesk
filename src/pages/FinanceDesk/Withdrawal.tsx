import { Button } from "@/components/ui/button";
import {
  Eye,
  Filter,
  Notebook,
  Search,
  FileDown,
  X,
  MessageCircle,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
import { WithdrawalTable } from "@/data/Data";
//import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    title: "Total",
    value: "₹3,45,000",
    icon: Notebook,
  },
  {
    title: "Pending",
    value: "₹45,000",
    icon: Notebook,
  },
  {
    title: "Approved",
    value: "₹1,20,000",
    icon: Notebook,
  },
  {
    title: "Reversed",
    value: "₹15,000",
    icon: Notebook,
  },
];

export function Withdrawal() {
  return (
      <div className="flex flex-col gap-2">
        
        <Topbar />
        <StatsCards />

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
                <BreadcrumbPage>Withdrawal</BreadcrumbPage>
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
    const [activeTab, setActiveTab] = useState("Status");
  
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
  
    const [type, setType] = useState("Coach");
    const [status, setStatus] = useState("Pending");
    const [payoutMode, setPayoutMode] = useState("Bank");
  
    const tabList = [
      "Status",
      "Type",
      "Payout Mode",
      "Minimum Balance",
      "Name / ID",
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
            {activeTab === "Name / ID" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">Enter Name/ID :</label>
                <Input id="Gen" placeholder="Enter .." type="text" className="mt-4 w-full " /> 

              </>
            )}
            {activeTab === "Minimum Balance" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">Minimum Balance :</label>
                <Input id="Gen" placeholder="Enter .." type="number" className="mt-4 w-full " /> 

              </>
            )}
              {activeTab === "Type" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Search by Type:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Coach",
                      "Partner",
                      "Org",
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
  
              {activeTab === "Status" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Search by Status:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Pending",
                      "Approved",
                      "Declined",
                      "Reversed",
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
  
              {activeTab === "Payout Mode" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Select by Payout Mode:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Bank",
                      "UPI",
                      "Wallet",
                    ].map((option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={payoutMode}
                        onChange={setPayoutMode}
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

function TableSection() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: "ascending" | "descending";
    } | null>(null);
    const [selectedStack, setSelectedStack] = useState<
      typeof WithdrawalTable
    >(WithdrawalTable[0] ? [WithdrawalTable[0]] : []);
    const [focusedId, setFocusedId] = useState<string | null>(WithdrawalTable[0]?.requestId || null);
  
    // Sorting logic
    const sortedData = [...WithdrawalTable];
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
          currentRecords.map((user) => user.requestId)
        );
      }
    };
  
    const bringToTop = (userId: string) => {
      const coach = selectedStack.find((c) => c.requestId === userId);
      if (coach) {
        setSelectedStack((prev) => [
          coach,
          ...prev.filter((c) => c.requestId !== userId),
        ]);
        setFocusedId(userId);
      }
    };
  
    useEffect(() => {
      const allRows = document.querySelectorAll("tr[data-id]");
  
      allRows.forEach((row) => {
        const id = String(row.getAttribute("data-id"));
        const isInStack = selectedStack.some((coach) => coach.requestId === id);
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
  
    const handleRowClick = (user: (typeof WithdrawalTable)[0]) => {
      // Double-click detected
      const exists = selectedStack.find((c) => c.requestId === user.requestId);
      if (!exists) {
        setSelectedStack((prev) => {
          const updated = [user, ...prev];
          return updated.slice(0, 5); // limit to 5
        });
        setFocusedId(user.requestId);
      } else {
        bringToTop(user.requestId);
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
                    <FileDown className="h-4 w-4" />
                    Export Submissions
                  </Button>
                  <Button variant="border" size="sm">
                    <MessageCircle className=" h-4 w-4" />
                    Send Form Link
                  </Button>
                  <Button variant="delete" size="sm">
                    <X className=" h-4 w-4 text-[var(--red)]" />
                    Deactivate / Archive
                  </Button>
                  <Button variant="border" size="sm">
                    <Eye className=" h-4 w-4" />
                    View Analytics
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
                    onClick={() => requestSort("requestId")}
                    className="cursor-pointer text-[var(--text)] text-low"
                  >
                    Request ID {" "}
                    {sortConfig?.key === "requestId" &&
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
                    onClick={() => requestSort("type")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Type{" "}
                    {sortConfig?.key === "type" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("currentBalance")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Current Balance{" "}
                    {sortConfig?.key === "currentBalance" &&
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
                    onClick={() => requestSort("requestedOn")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Requested On{" "}
                    {sortConfig?.key === "requestedOn" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => requestSort("payoutMode")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Payout Mode{" "}
                    {sortConfig?.key === "payoutMode" &&
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
                    onClick={() => requestSort("bankOrUpiId")}
                    className="cursor-pointer text-[var(--text)]"
                  >
                    Bank / UPI ID{" "}
                    {sortConfig?.key === "bankOrUpiId" &&
                      (sortConfig.direction === "ascending" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead> 
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-visible relative z-0">
                {currentRecords.map((user) => (
                  <TableRow
                    key={user.requestId}
                    data-id={user.requestId}
                    className={cn(
                      "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                      selectedStack.some((c) => c.requestId === user.requestId)
                        ? "bg-[var(--brand-color3)]"
                        : ""
                    )}
                    onClick={() => {
                      toggleSelectUser(user.requestId);
                      handleRowClick(user);
                    }}
                  >
                    <TableCell
                      className={cn(
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                        selectedStack.some((c) => c.requestId === user.requestId)
                          ? focusedId === user.requestId
                            ? "border-[var(--brand-color)]"
                            : "border-transparent"
                          : "border-transparent"
                      )}
                    >
                      <Checkbox
                        checked={selectedUsers.includes(user.requestId)}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleSelectUser(user.requestId)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex justify-start flex-col">
                            <div className="font-medium">{user.requestId}</div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-low">{user.name}</div>
                    </TableCell>
                        <TableCell>
                            <div className="text-sm">
                                <div>{`${user.type}`}</div>
                            </div>
                        </TableCell>
                        <TableCell>
                      <div className="text-low">{user.currentBalance}</div>
                    </TableCell>
                        <TableCell>
                            <div className="text-sm">{user.amount}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-sm">{user.requestedOn}</div>
                    </TableCell>
                    <TableCell>
                            <div className="text-sm">{user.payoutMode}</div>
                        </TableCell>
                    <TableCell>
                      <div className="text-sm">{user.status}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{user.bankOrUpiId}</div>
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
                        }}
                        className="hover:text-[var(--brand-color)]"
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
                        className="hover:text-[var(--green)]"
                      >
                        <Check className="h-4 w-4 "/>
                        <span className="sr-only">Add to Degree List</span>
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
                        className="hover:text-[var(--red)]"
                      >
                        <X className="h-4 w-4 " />
                        <span className="sr-only">Reject</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            View
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