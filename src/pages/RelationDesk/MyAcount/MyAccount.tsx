import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AccountTable } from "@/data/Data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, ChevronLeft, Eye, Search, X, Bell, Check, Notebook, ArrowBigLeft, BadgeQuestionMark, Calendar, Filter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/date-picker";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";


export function MyAccounts() {
    return (
        <div className="flex flex-col gap-2">
          <Topbar />
            <ButtonBar />
            <AccountTableComponent />
        </div>
    )
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
                <BreadcrumbPage>My Accounts</BreadcrumbPage>
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
    const [activeTab, setActiveTab] = useState("Type");
  
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
  
    const [type, setType] = useState("Explorer");
    const [daysLeft, setDaysLeft] = useState("<30");
    const [leadType, setLeadType] = useState("Upsell");
    const [stage, setStage] = useState("Step 1");
    const [concern, setConcern] = useState("Missed Session");
  
    const tabList = [
      "Type",
      "Lead Type",
      "Stage",
      "Days Left",
      "Concern",
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
            {activeTab === "Type" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Search by Type:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Explorer",
                      "Coach",
                      "Org",
                      "Partner",
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
  
              {activeTab === "Lead Type" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Search by Lead Type:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Upsell",
                      "Downsell",
                    ].map((option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={leadType}
                        onChange={setLeadType}
                      />
                    ))}
                  </div>
                </>
              )}
  
              {activeTab === "Stage" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Select by Stage:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Step 1",
                      "Step 2",
                      "Step 3",
                      "All"
                    ].map((option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={stage}
                        onChange={setStage}
                      />
                    ))}
                  </div>
                </>
              )}
  
              {activeTab === "Days Left" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Select by Days Left:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "<30",
                      "<90",
                      "<180"
                    ].map((option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={daysLeft}
                        onChange={setDaysLeft}
                      />
                    ))}
                  </div>
                </>
              )}
  
  {activeTab === "Concern" && (
                <>
                  <p className="text-sm text-[var(--text-head)] mb-4">
                    Select by Concern:
                  </p>
                  <div className="flex flex-col gap-4 text-[var(--text)] ">
                    {[
                      "Missed Session",
                      "Feedback",
                      "Onboarding",
                      "Cart",
                    ].map((option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={concern}
                        onChange={setConcern}
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

  function ButtonBar() {
    return (
      <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <Button variant="brand" size="new">
          <ArrowBigLeft className="h-3 w-3" />
          <span>Back</span>
        </Button>
        <div className="flex gap-4 flex-wrap">
          <Button variant="standard" size="new">
            <Calendar className="h-3 w-3" />
            <span className="">Days Remaining</span>
          </Button>
          <Button variant="standard" size="new">
            <BadgeQuestionMark className="h-3 w-3" />
            <span className="">Transfer Account</span>
          </Button>
          </div>
      </div>
    );
  }

function AccountTableComponent() {
    const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    // Filter data based on search term
    const filteredData = AccountTable.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.lastActivity.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
    const sortedData = [...filteredData];
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
    const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

    const requestSort = (key: string) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const toggleSelectAll = () => {
        if (selectedAccounts.length === currentRecords.length) {
            setSelectedAccounts([]);
        } else {
            setSelectedAccounts(currentRecords.map(account => account.id));
        }
    };

    



    

    const toggleSelectAccount = (accountId: number) => {
        if (selectedAccounts.includes(accountId)) {
            setSelectedAccounts(selectedAccounts.filter(id => id !== accountId));
        } else {
            setSelectedAccounts([...selectedAccounts, accountId]);
        }
    };

    return (
        <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap ">
            <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
                <div className="flex items-center justify-between border-b h-20 p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="select-all"
                                checked={selectedAccounts.length === currentRecords.length && currentRecords.length > 0}
                                onCheckedChange={toggleSelectAll}
                            />
                            <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
                                Select All
                            </label>
                            {selectedAccounts.length > 0 && (
                                <Badge variant="secondary" className="bg-[var(--faded)] text-[var(--text)]">
                                    {selectedAccounts.length} selected
                                </Badge>
                            )}
                        </div>

                        {selectedAccounts.length > 0 && (
                            <div className="flex gap-2">
                                <Button variant="border" size="sm">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Send Reminder
                                </Button>
                                <Button variant="border" size="sm">
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as Done
                                </Button>
                                <Button variant="delete" size="sm">
                                    <X className="h-4 w-4 mr-2" />
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative bg-[var(--faded)] rounded-sm overflow-hidden">
                            <Input
                                placeholder="Search accounts..."
                                className="pl-8 pr-4 py-2 w-48 sm:w-64 bg-transparent border-none focus:ring-0"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--text-low)]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto w-full text-[var(--text)]">
                    <Table>
                        <TableHeader className="bg-[var(--faded)]">
                            <TableRow>
                                <TableHead className="w-10"></TableHead>
                                <TableHead
                                    onClick={() => requestSort("name")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Name {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("type")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Type {sortConfig?.key === "type" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("lastActivity")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Last Activity {sortConfig?.key === "lastActivity" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("nextFollowUp")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Next Followup {sortConfig?.key === "nextFollowUp" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("stage")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Stage {sortConfig?.key === "stage" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead
                                    onClick={() => requestSort("daysLeft")}
                                    className="cursor-pointer text-[var(--text)]"
                                >
                                    Days Left {sortConfig?.key === "daysLeft" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead> 
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentRecords.map((account) => (
                                <TableRow
                                    key={account.id}
                                    data-id={account.id}
                                    className={cn(
                                        "cursor-pointer group hover:bg-[var(--brand-color2)]",
                                         )}
                                    onClick={() => {
                                        toggleSelectAccount(account.id);
                                    }}
                                >
                                    <TableCell className="w-10">
                                        <Checkbox
                                            checked={selectedAccounts.includes(account.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            onCheckedChange={() => toggleSelectAccount(account.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-[var(--text)]">{account.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="standard">{account.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-[var(--text)]">{account.lastActivity}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-[var(--faded)] text-[var(--text)]">{account.nextFollowUp}</Badge>
                                    </TableCell>
                                    <TableCell className="text-[var(--text)]">{account.stage}</TableCell>
                                    <TableCell className="text-[var(--text)]">{account.daysLeft}</TableCell>
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
                                navigate("case-details");
                              }}
                            >
                              <Eye className="h-3 w-3" />
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
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // done logic
                                                            }}
                                                        >
                                                            <Check className="h-3 w-3 text-[var(--green)]" />
                                                            <span className="sr-only">Done</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Done</p>
                                                    </TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="actionIcon"
                                                            size="actionIcon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // note logic
                                                            }}
                                                        >
                                                            <Notebook className="h-3 w-3" />
                                                            <span className="sr-only">Note</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Note</p>
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

                <div className="flex items-center justify-between p-4 border-t">
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="border" className="flex items-center gap-2 text-[var(--text)]">
                                    {recordsPerPage}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[var(--background)] text-[var(--text)]">
                                {[10, 25, 50, 100].map((size) => (
                                    <DropdownMenuItem
                                        key={size}
                                        onClick={() => {
                                            setRecordsPerPage(size);
                                            setCurrentPage(1);
                                        }}
                                        className="focus:bg-[var(--faded)]"
                                    >
                                        {size}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-sm text-[var(--text-low)]">
                            Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length} accounts
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="border"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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