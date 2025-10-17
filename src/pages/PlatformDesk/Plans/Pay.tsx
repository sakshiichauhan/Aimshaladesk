import { Button } from "@/components/ui/button";
import {
  Search,
  Eye,
  RotateCcw,
  Bell,
  Check,
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
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { paymentsTable } from "@/data/Data";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipContent, Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

// const color = "text-[var(--text)]";
// const color2 = "text-[var(--text-head)]";
// const Up = <CircleArrowUp className="text-[var(--green)] h-4" />;
// const Down = <CircleArrowDown className="text-[var(--red)] h-4" />;

// const stats = [
//   {
//     title: "Total Collected",
//     value: "₹3,200",
//     icon: Notebook,
//     performance: Up,
//   },
//   {
//     title: "Total Platform Fee",
//     value: "₹628",
//     icon: BadgeDollarSign,
//     performance: Up,
//   },
//   {
//     title: "Total Payout (Escrow)",
//     value: "₹2,572",
//     icon: Package,
//     performance: Down,
//   },
//   {
//     title: "Total GST Liability",
//     value: "₹113.04",
//     icon: BadgeDollarSign,
//     performance: Up,
//   },
// ];

export function Pay({ code }: { code: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Topbar/>
      <TableSection code={code} />
    </div>
  );
}

function Topbar() { 
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Access Codes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Payment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
      <Button
          variant="brand"
          size="new"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
        <Button
          variant="standard"
          size="new"
        >
          <Funnel className="h-4 w-4" />
        </Button>
      </div>
      </div>
  );
}


// function StatsCards() {
//   return (
//     <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-4">
//       {stats.map((stat, index) => (
//         <Card key={index} className="xl:rounded-sm shadow-none bg-[var(--background)]">
//           <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
//             <div className="flex justify-between h-full items-center">
//               <div
//                 className={`${color} text-xs uppercase text-light line-clamp-1`}
//               >
//                 {stat.title}
//               </div>
//               {stat.performance}
//             </div>
//             <div className="flex  items-center gap-4">
//               <div className={`rounded-full `}>
//                 <stat.icon className={`h-8 w-8 ${color2}`} />
//               </div>
//               <div className={`${color2} text-2xl`}>{stat.value}</div>
//             </div>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// }




function TableSection({ code }: { code: string }) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  
  const filteredData = paymentsTable.filter((item) => item.Code === code);

  // Sorting logic
  const sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }

  
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

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
        currentRecords.map((user): number => user.id)
      );
    }
  };

  const toggleSelectUser = (userId: number) => {
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
                  onClick={() => requestSort("PaymentID")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Payment ID{" "}
                  {sortConfig?.key === "PaymentID" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Date")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Date{" "}
                  {sortConfig?.key === "Date" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("User")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  User{" "}
                  {sortConfig?.key === "User" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Code")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Code{" "}
                  {sortConfig?.key === "Code" &&
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
                  onClick={() => requestSort("ProductTitle")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Product / Title{" "}
                  {sortConfig?.key === "ProductTitle" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Gross")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Gross ₹{" "}
                  {sortConfig?.key === "Gross" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("PlatformFee")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Platform Fee ₹{" "}
                  {sortConfig?.key === "PlatformFee" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("GST")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  GST ₹{" "}
                  {sortConfig?.key === "GST" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("GSTStatus")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status{" "}
                  {sortConfig?.key === "GSTStatus" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] text-center pr-4 w-1 ">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                  )}
                  onClick={() => {
                    toggleSelectUser(user.id);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 border-l-transparent group-hover:border-[var(--brand-color)]",
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
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">{user.PaymentID}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.User}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      <div>{`${user.ProductTitle}`}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Gross}</div>
                  </TableCell>
                  <TableCell>{user.PlatformFee}</TableCell>
                  <TableCell>
                    <div className="text-low">{user.GST}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.GSTStatus}</Badge>
                  </TableCell>
                  <TableCell>
                  <div className="flex items-center justify-end pr-4">
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                    <Button
                      variant="actionIcon"
                      size="actionIcon"
                    >
                      <Eye className="h-4 w-3" />
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
                    >
                      <RotateCcw className="h-4 w-3" />
                      <span className="sr-only">Retry</span>
                    </Button>
                    </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Retry
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


