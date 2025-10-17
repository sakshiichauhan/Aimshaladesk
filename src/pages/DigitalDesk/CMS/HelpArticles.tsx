// export function HelpArticles() {
//   return <div>HelpArticles</div>;
// }
import { Clock,Search, Users, FileCheck2,   FileDown,  BadgeQuestionMark,  Plus, Bell, X, Pencil, Archive } from "lucide-react";
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { HelpTable } from "@/data/Data";

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePickerWithRange } from "@/components/date-picker";
import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

  const color = "text-[var(--text)]";
  const color2 = "text-[var(--text-head)]";
  
const Stats = [
  {
    title: "Total Articles Published",
    value: "126",
    icon: Users,
    
  },
  {
    title: "Pending Review",
    value: "8",
    icon: FileCheck2,
    
  },
 
  {
    title: "Last Updated",
    value: "18 May 2025",
    icon: Clock,
    
  },
 
];



export  function HelpArticles() {


  return (
    <div className="flex flex-col gap-2">
      <Bar />
      <StatCard />
      <Buttonbar />
    

      <HelpTabledata />
    </div>
  )
}

  function Bar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Help Articles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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

      {showFilter && <AdvancedFilter onClose={() => setShowFilter(false)} />}
        
      <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

function Buttonbar() {
  
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new">
        <Plus className="h-3 w-3" />
        <span className="">Add Help Article</span>
      </Button>
      <div className="flex gap-4 flex-wrap">
        <Button variant="standard" size="new">
          <BadgeQuestionMark className="h-3 w-3" />
          <span className=""> Organize by Category</span>
        </Button>
        <Button variant="standard" size="new">
          <Eye className="h-3 w-3" />
          <span className="">Import Articles (Bulk)</span>
        </Button>
        </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
}


function AdvancedFilter({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Category");

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
  const [category, setCategory] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);


  const tabList = [
    "Category",
    "Status",
    "Audience For",
    "Date Range",
  ];

  // Helper for checkbox
  const handleCategoryChange = (option: string) => {
    setCategory((prev) =>
      prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
    );
  };
  const handleStatusChange = (option: string) => {
    setStatus((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };
  const handleAudienceChange = (option: string) => {
    setAudience((prev) =>
      prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
      >
        <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Filters</CardTitle>
          <Button
            variant="link"
            className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
            onClick={() => {
              setCategory([]);
              setStatus([]);
              setAudience([]);
             
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
                  className={`text-left text-sm px-3 py-3 border-l-3  ${activeTab === tab
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
            {activeTab === "Category" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Category:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Getting Started", "Assessments", "etc."].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={category.includes(option)}
                        onCheckedChange={() => handleCategoryChange(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}
            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Status:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Published", "Draft", "Pending"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={status.includes(option)}
                        onCheckedChange={() => handleStatusChange(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}
            {activeTab === "Audience For" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Audience For:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Students", "Parents", "Coaches", "Admins"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={audience.includes(option)}
                        onCheckedChange={() => handleAudienceChange(option)}
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

function StatCard() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {Stats.map((stat, index) => (
        <Card key={index} className="rounded-sm shadow-none bg-[var(--background)]">
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



function HelpTabledata() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // Filtering (search by Title, Author, Category, For)
  const filteredData: (typeof HelpTable[0] & { id: number })[] = HelpTable.filter(item => {
    const searchLower = search.toLowerCase();
    return (
      item.Title.toLowerCase().includes(searchLower) ||
      item.Author.toLowerCase().includes(searchLower) ||
      item.Category.toLowerCase().includes(searchLower) ||
      item.For.toLowerCase().includes(searchLower)
    );
  }).map((item, idx) => ({ ...item, id: idx }));

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords: (typeof HelpTable[0] & { id: number })[] = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Select All logic (by id)
  const toggleSelectAll = () => {
    if (selectedRows.length === currentRecords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRecords.map((row) => Number(row.id)));
    }
  };

  const toggleSelectRow = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter(id => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex items-center justify-between border-b h-20 p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all"
                checked={selectedRows.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
                Select All
              </label>
              {selectedRows.length > 0 && (
                <>
                  <Badge variant="border" className="ml-2 ">{selectedRows.length} selected</Badge>
                  <div className="flex gap-2 ml-2">
                    <Button variant="border" size="sm">
                      <Bell className="h-4 w-4" />
                      Send Reminder
                    </Button>
                    <Button variant="border" size="sm">
                      <FileDown className="h-4 w-4" />
                      Export list
                    </Button>
                    <Button variant="delete" size="sm">
                      <X className="h-4 w-4 text-[var(--red)]" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 ">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search"
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
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
                <TableHead className="min-w-[40px] text-[var(--text)]"></TableHead>
                <TableHead className="text-[var(--text)]">Title</TableHead>
                <TableHead className="text-[var(--text)]" >Category</TableHead>
                <TableHead className="text-[var(--text)]">Tags</TableHead>
                <TableHead className="text-[var(--text)]">Segment</TableHead>
                <TableHead className="text-[var(--text)]">Author</TableHead>
                <TableHead className="text-[var(--text)]">Last Updated</TableHead>
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-id={row.id}
                    className={cn(
                      "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                      selectedRows.includes(Number(row.id))
                        ? "bg-[var(--brand-color3)]"
                        : ""
                    )}
                    onClick={() => toggleSelectRow(Number(row.id))}
                  >
                    <TableCell
                      className={cn(
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                        selectedRows.includes(Number(row.id))
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                      )}
                    >
                      <Checkbox
                        checked={selectedRows.includes(Number(row.id))}
                        onClick={e => e.stopPropagation()}
                        onCheckedChange={() => toggleSelectRow(Number(row.id))}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{row.Title}</div>
                    </TableCell>
                    <TableCell>{row.Category}</TableCell>
                    <TableCell>
                      {row.Tags && Array.isArray(row.Tags)
                        ? row.Tags.map((tag, i) => (
                            <Badge key={i} variant="border" className="mr-1">{tag}</Badge>
                          ))
                        : null}
                    </TableCell>
                    <TableCell>{row.For}</TableCell>
                    <TableCell>{row.Author}</TableCell>
                    <TableCell>{row["Last Updated"]}</TableCell>
                    <TableCell>
                      <Badge variant={row.Status === "Published" ? "standard" : "border"}>{row.Status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end pr-4">
                        <TooltipProvider>
                          {row.Actions && row.Actions.map((action, i) => (
                            <Tooltip key={i}>
                              <TooltipTrigger asChild>
                                <Button variant="actionIcon" size="actionIcon">
                                  {action === 'View' && <Eye className="h-3 w-3" />}
                                  {action === 'Edit' && <Pencil className="h-3 w-3" />}
                                  {action === 'Delete' && <X className="h-3 w-3 text-[var(--red)]" />}
                                  {action === 'Archive' && <Archive className="h-3 w-3" />}
                                  <span className="sr-only">{action}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{action}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
              {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} help articles
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
