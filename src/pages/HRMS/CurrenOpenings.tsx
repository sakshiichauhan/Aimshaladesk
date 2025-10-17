import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { DatePickerWithRange } from "@/components/date-picker";
import { CurrenOpeningsTable } from "@/data/Data";
import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileDown,
  Filter,
  Pen,
  PenSquare,
  Pin,
  Plus,
  Search,
  UserCheck,
  Users,
  UserX,
  X,
} from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


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
    title: "Total Users",
    value: "1,234",
    icon: Users,
  },
  {
    title: "Active Users",
    value: "34",
    icon: UserCheck,
  },
  {
    title: "Inactive Users",
    value: "27",
    icon: UserX,
  },
];

export function CurrenOpenings() {
  return (
    <div className="flex flex-col gap-2">
      <Bar />
      <StatsCards />
      <Buttonbar />
      <TableSection />
    </div>
  );
}

function Bar() {
  
  const [, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-head)]">
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Current Openings</BreadcrumbPage>
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
          className="flex items-center gap-2 self-end"
        >
          <Filter className="h-3 w-3" />
        </Button>
      <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
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

function Buttonbar() {
  
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div className="flex gap-4">
        <Button variant="brand" size="new">
          <Plus className="h-3 w-3" />
          <span className="">Add New Opening</span>
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="standard" size="new">
          <Calendar className="h-3 w-3" />
          <span className="">Posted Within</span>
        </Button>
        
      </div>
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
  // Sorting logic
  const sortedData = [...CurrenOpeningsTable];
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
                  <PenSquare className="h-4 w-4" />
                  Change status
                </Button>
                <Button variant="border" size="sm">
                  <Eye className=" h-4 w-4" />
                  View applicants
                </Button>
                <Button variant="border" size="sm">
                  <FileDown className=" h-4 w-4 " />
                  Export
                </Button>
                <Button variant="border" size="sm">
                  <Pin className=" h-4 w-4 " />
                  Feature
                </Button>
                <Button variant="delete" size="sm">
                  <Bell className=" h-4 w-4 " />
                  Send follow-up
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
                  onClick={() => requestSort("title")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Title{" "}
                  {sortConfig?.key === "title" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("category")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Department{" "}
                  {sortConfig?.key === "department" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("location")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Location{" "}
                  {sortConfig?.key === "location" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("applicants")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Applicants{" "}
                  {sortConfig?.key === "applicants" &&
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
                  onClick={() => requestSort("posted")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Posted{" "}
                  {sortConfig?.key === "posted" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] text-center pr-4 w-1">Actions</TableHead>
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
                  onClick={() => {
                    toggleSelectUser(user.id);
                  }}
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
                  <TableCell>
                    <div className="text-low">{user.title}</div>
                    <div className="text-xs text-[var(--text)]">{user.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.department}</div>
                  </TableCell>

                  <TableCell>
                    <div className="text-low">{user.location}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.applicants}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      <Badge variant="standard">{user.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.posted}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                    
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button
                        variant="actionIcon"
                        size="actionIcon"
                        className="border-0 shadow-none"
                      >
                        <Eye className="h-4 w-3" />
                        <span className="sr-only">View</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent>
                            <p>View</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button
                        variant="actionIcon"
                        size="actionIcon"
                        className="border-0 shadow-none"
                      >
                        <Pen className="h-4 w-3" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent>
                              <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button
                        variant="actionIcon"
                        size="actionIcon"
                        className="border-0 shadow-none"
                      >
                        <X className="h-4 w-3" />
                        <span className="sr-only">Close</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent>
                            <p>Close</p>
                          </TooltipContent>
                        </Tooltip>
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
