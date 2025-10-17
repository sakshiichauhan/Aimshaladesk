import { Button } from "@/components/ui/button";
import {
  Filter,
  BadgeQuestionMark,
  Bell,
  Notebook,
  Plus,
  Search,
  Pencil,
  FileDown,
  X,
  FileText,
  BarChart3,
  Trash2,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
import {SurveyManages } from "@/data/Data";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { DateRange } from "react-day-picker";
import React, { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

const stats = [
  {
    title: "Total Surveys",
    value: "10",
    icon: Notebook,
  },
  {
    title: "Published",
    value: "17",
    icon: Notebook,
  },
  {
    title: "Drafts",
    value: "13",
    icon: Notebook,
  },
];

export function ManageQuestion() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Topbar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
        <StatsCards />
        <TableSection
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      </div>
    </div>
  );
}

function Topbar({
  selectedCategories,
  onCategoryChange,
}: {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}) {
  const navigator = useNavigate();
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const availableCategories = Array.from(
    new Set(SurveyManages.map((item) => item.category))
  ).sort();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Surveys</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Manage Surveys</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="brand" size="new" onClick={() => setShowForm(true)}>
          <Plus className="h-3 w-3" />
        </Button>
        {showForm && <SurveyForm onClose={() => setShowForm(false)} />}

        <div className="flex gap-4 flex-wrap">
        <Button
            variant="standard"
            size="new"
            onClick={() => setIsCategorySheetOpen(true)}
          >
            <BadgeQuestionMark className="h-3 w-3" />
            <span className="">Categories</span>
          </Button>
          {isCategorySheetOpen && (
                    <CategoryPopup
                      onClose={() => setIsCategorySheetOpen(false)}
                      selectedCategories={selectedCategories}
                      onCategoryChange={onCategoryChange}
                      availableCategories={availableCategories}
                    />
          )}
          <Button variant="standard" size="new">
            <FileDown className="h-3 w-3" />
          </Button>
          <Button
            variant="standard"
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 self-end min-h-[40px]"
          >
            <Filter className="h-4 w-4" />
          </Button>
          {showFilter && (
            <AdvancedFilters onClose={() => setShowFilter(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
}

function AdvancedFilters({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Search");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }
      const target = e.target as HTMLElement;
      if (target.closest("[data-radix-popper-content-wrapper]")) {
        return;
      }
      onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Filter states
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("9-10");
  const [source, setSource] = useState("Direct");
  const [status, setStatus] = useState("Not Started");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const tabList = ["Search", "Date Range", "Segment", "Source", "Status"];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
      >
        <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Filters
          </CardTitle>
          <Button
            variant="link"
            className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
            onClick={() => {
              setSearch("");
              setSegment("9-10");
              setSource("Direct");
              setStatus("Not Started");
              setDateRange(undefined);
            }}
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
            {activeTab === "Search" && (
              <>
                <label htmlFor="search" className="text-[var(--text)]">
                  Search (by Name, ID, Assessment, Code):
                </label>
                <Input
                  id="search"
                  placeholder="Enter search query..."
                  type="text"
                  className="mt-4 w-full "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range:
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </>
            )}

            {activeTab === "Segment" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Segment:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["9-10", "11-12", "UG", "PG", "Professionals"].map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2">
                        <Checkbox
                          checked={segment === option}
                          onCheckedChange={() => setSegment(option)}
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Source" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Source:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Direct", "Partners"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={source === option}
                        onCheckedChange={() => setSource(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Choose Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Not Started", "In Progress", "Completed"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={status === option}
                        onCheckedChange={() => setStatus(option)}
                      />
                      {option}
                    </label>
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
    <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="xl:rounded-sm shadow-none bg-[var(--background)]"
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

interface TableSectionProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

function TableSection({
  selectedCategories,
  onCategoryChange,
}: TableSectionProps) {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof SurveyManages>(
    SurveyManages[0] ? [SurveyManages[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    SurveyManages[0]?.id || null
  );
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<{
    id: string;
    name: string;
    segments: string[];
    category: string;
    description: string;
    status: string;
  } | null>(null);

  // Available categories from the data
  const availableCategories = Array.from(
    new Set(SurveyManages.map((item) => item.category))
  ).sort();

  // Filter and sort data
  let filteredData = [...SurveyManages];

  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredData = filteredData.filter((item) =>
      selectedCategories.includes(item.category)
    );
  }

  // Apply sorting
  if (sortConfig !== null) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key as keyof typeof a];
      let bValue = b[sortConfig.key as keyof typeof b];
      // Special handling for 'segments' (array), 'price', 'enrollments' (numbers)
      if (sortConfig.key === "segments") {
        aValue = Array.isArray(aValue) ? aValue.join(", ") : aValue;
        bValue = Array.isArray(bValue) ? bValue.join(", ") : bValue;
      }
    
      
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
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

  // Select All logic
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
      const id = row.getAttribute("data-id");
      const isInStack = selectedStack.some((us) => us.id === id);
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

  const handleRowClick = (user: (typeof SurveyManages)[0]) => {
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

  const handleFormClose = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      {showForm && (
        <SurveyForm
          onClose={handleFormClose}
          editData={editData || undefined}
        />
      )}
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-campaigns"
                checked={
                  selectedUsers.length === currentRecords.length &&
                  currentRecords.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all-campaigns"
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

          {/* Search Bar */}
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
        {/* Table UI */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Survey Name{" "}
                  {sortConfig?.key === "name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("segments")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Segments{" "}
                  {sortConfig?.key === "segments" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)]">
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-[var(--brand-color)] transition-colors"
                    onClick={() => setIsCategorySheetOpen(true)}
                  >
                    <span>Category</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  {isCategorySheetOpen && (
                    <CategoryPopup
                      onClose={() => setIsCategorySheetOpen(false)}
                      selectedCategories={selectedCategories}
                      onCategoryChange={onCategoryChange}
                      availableCategories={availableCategories}
                    />
                  )}
                  {sortConfig?.key === "category" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("description")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Description{" "}
                  {sortConfig?.key === "description" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("createdBy")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Created By{" "}
                  {sortConfig?.key === "createdBy" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
               
                <TableHead className="text-[var(--text)]">Status</TableHead>
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
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      {Array.isArray(user.segments)
                        ? user.segments.join(", ")
                        : user.segments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.category}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.createdBy}</div>
                  </TableCell>
                
                  <TableCell>
                    <Badge variant="standard">{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--brand-color2)] hover:text-[var(--brand-color)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("survey-question");
                              }}
                            >
                              <FileText className="h-3 w-3" />
                              <span className="sr-only">Questions</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Questions
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--green2)] hover:text-[var(--green)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <BarChart3 className="h-3 w-3" />
                              <span className="sr-only">Results</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Results
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--blue2)] hover:text-[var(--blue)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle Edit action
                                const surveyData = {
                                  id: user.id,
                                  name: user.name,
                                  segments: user.segments,
                                  category: user.category,
                                  description: user.description,
                                  status: user.status,
                                };
                                setShowForm(true);
                                setEditData(surveyData);
                              }}
                            >
                              <Pencil className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Edit
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle Delete action
                                if (
                                  confirm(
                                    `Are you sure you want to delete "${user.name}"?`
                                  )
                                ) {
                                  console.log("Deleting assessment:", user.id);
                                  // In a real app, you would make an API call here
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Delete
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
              {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
              {filteredData.length} surveys
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

interface CategoryPopupProps {
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  availableCategories: string[];
}

function CategoryPopup({
  onClose,
  selectedCategories,
  onCategoryChange,
  availableCategories,
}: CategoryPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInside = path.some((el) => {
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement &&
          el.getAttribute("data-radix-popper-content-wrapper") !== null)
      );
    });

    if (!clickedInside) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const filteredCategories = availableCategories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryToggle = (category: string) => {
    if (category === "All Categories") {
      onCategoryChange([]);
    } else {
      const newSelectedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      onCategoryChange(newSelectedCategories);
    }
  };

  const isAllCategoriesSelected = selectedCategories.length === 0;

  const handleAddCategory = () => {
    if (
      newCategoryName.trim() &&
      !availableCategories.includes(newCategoryName.trim())
    ) {
      // In a real app, you would make an API call here
      console.log("Adding category:", newCategoryName.trim());
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (category: string) => {
    // In a real app, you would make an API call here
    console.log("Deleting category:", category);
    // You would typically update the availableCategories list here
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40  flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-2xl h-full w-full max-w-[700px] flex flex-col border-l border-[var(--border)]"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Select Categories
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="border"
              size="sm"
              onClick={() => setShowAddCategory(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label>Search Categories</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text)]" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add Category Modal */}
          {showAddCategory && (
            <div className="flex flex-col gap-2">
              <Label>Add New Category</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddCategory();
                    }
                  }}
                />
                <Button
                  variant="brand"
                  size="sm"
                  onClick={handleAddCategory}
                  disabled={
                    !newCategoryName.trim() ||
                    availableCategories.includes(newCategoryName.trim())
                  }
                >
                  Add
                </Button>
                <Button
                  variant="border"
                  size="sm"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
              {newCategoryName.trim() &&
                availableCategories.includes(newCategoryName.trim()) && (
                  <p className="text-xs text-[var(--red)]">
                    Category already exists
                  </p>
                )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label>Quick Selection</Label>
            <div
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                isAllCategoriesSelected
                  ? "bg-[var(--brand-color3)] border-[var(--brand-color)]"
                  : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--faded)]"
              }`}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <Checkbox
                  checked={isAllCategoriesSelected}
                  onCheckedChange={() => handleCategoryToggle("All Categories")}
                  className="text-[var(--brand-color)] focus:ring-[var(--brand-color)] border-[var(--border)]"
                />
                <div className="flex-1">
                  <div className="font-medium text-[var(--text-head)]">
                    All Categories
                  </div>
                  <div className="text-xs text-[var(--text)]">
                    Show all assessments
                  </div>
                </div>
                <Badge variant="standard" className="text-xs">
                  All
                </Badge>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Available Categories</Label>
            <div className="space-y-2  overflow-y-auto pr-2 custom-scrollbar">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-[var(--text)] opacity-60">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No categories found</p>
                  <p className="text-xs">Try adjusting your search</p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div
                    key={category}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      selectedCategories.includes(category)
                        ? "bg-[var(--brand-color3)] border-[var(--brand-color)]"
                        : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--faded)]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          className="text-[var(--brand-color)] focus:ring-[var(--brand-color)] border-[var(--border)]"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-[var(--text-head)]">
                            {category}
                          </div>
                        </div>
                        <Badge
                          variant={
                            selectedCategories.includes(category)
                              ? "standard"
                              : "border"
                          }
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      </label>

                      {/* Delete Icon - Only show when category is selected */}
                      {selectedCategories.includes(category) && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="noborder"
                                size="sm"
                                className="hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200 p-1 rounded-md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCategory(category);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">Delete Category</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              Delete Category
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onClose}>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SurveyFormProps {
  onClose: () => void;
  editData?: {
    id: string;
    name: string;
    segments: string[];
    category: string;
    description: string;
    status: string;
  };
}

function SurveyForm({ onClose, editData }: SurveyFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [surveyName, setSurveyName] = useState(
    editData?.name || ""
  );
  const [selectedSegments, setSelectedSegments] = useState<string[]>(
    editData?.segments || []
  );
  const [category, setCategory] = useState(editData?.category || ""); 
  const [description, setDescription] = useState(editData?.description || "");
  const [isActive, setIsActive] = useState(editData?.status === "Active");

  const availableSegments = ["9-10", "11-12", "UG", "PG", "Professionals"];
  const availableCategories = Array.from(
    new Set(SurveyManages.map((item) => item.category))
  ).sort();

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInside = path.some((el) => {
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement &&
          el.getAttribute("data-radix-popper-content-wrapper") !== null)
      );
    });

    if (!clickedInside) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSegmentToggle = (segment: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );
  };

  const handleSubmit = () => {
    // In a real app, you would make an API call here
    const surveyData = {
      id: editData?.id || `SUR${Date.now()}`,
      name: surveyName,
      segments: selectedSegments,
      category,
      description,
      status: isActive ? "Active" : "Inactive",
    };

    console.log(
      editData ? "Updated survey data:" : "New survey data:",
      surveyData
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
            {editData ? "Edit Survey" : "Create Survey"}
          </CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Survey Name</Label>
            <Input
              placeholder="e.g., Student Satisfaction Survey"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Segments</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableSegments.map((segment) => (
                <label key={segment} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedSegments.includes(segment)}
                    onCheckedChange={() => handleSegmentToggle(segment)}
                  />
                  <span className="text-sm">{segment}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Description</Label>
            <Textarea
              placeholder="Enter survey description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status</Label>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <Label className="font-normal">Active Status</Label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-color)]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="brand"
              disabled={
                !surveyName ||
                selectedSegments.length === 0 ||
                !category
              }
            >
              Draft
            </Button>
            <Button
              variant="brand"
              onClick={handleSubmit}
              disabled={
                !surveyName ||
                selectedSegments.length === 0 ||
                !category
              }
            >
              {editData ? "Update Survey" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
