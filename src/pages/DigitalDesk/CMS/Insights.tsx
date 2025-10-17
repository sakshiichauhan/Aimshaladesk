
import {
  Clock,
  MessageCircle,
  Flag,
  Search,
  X,
  Check,
  Bell,
 
  Users,
  FileCheck2,
  FileText,
 
  FileDown,
  BadgeQuestionMark,
  Plus,
  Eye,
  Edit,
  Archive,
  Trash2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileDown as Download,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  PublishedTableData,
  DraftsTableData,
  PendingApprovalTableData,
  ArchivedTableData, 
} from "@/data/Data";
import * as React from "react";

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
    title: "Total Published",
    value: "468",
    icon: Users,
    
  },
  {
    title: "Pending Approval",
    value: "23",
    icon: FileCheck2,
    
  },
  {
    title: "Total Views Last",
    value: "19,320",
    icon: FileText,
    
  },
  {
    title: "Total Comments",
    value: "412",
    icon: Clock,
    
  },
 
];

export function Insights() {
  return (
    <div className="flex flex-col gap-2">
      <Bar />
      <StatCard />
      <Buttonbar />
      <SessionTabs />
    </div>
  );
}

function Bar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Insights</BreadcrumbPage>
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

      {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />}
        
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
        <span className="">Add New Insight </span>
      </Button>
      <div className="flex gap-4 flex-wrap">
        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
          <span className=""> Manage Categories & Tags</span>
        </Button>
        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
          <span className=""> Assign Editors</span>
        </Button>
        <Button variant="standard" size="new">
          <Eye className="h-3 w-3" />
          <span className=""> Import Bulk Content (Excel/CSV)</span>
        </Button>
        </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
}

function AssessFilter({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Status");

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
  const [status, setStatus] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  const [authorRole, setAuthorRole] = useState<string[]>([]);

  const tabList = [
    "Status",
    "Category",
    "Tag",
    "Date Range",
    "Author Role",
  ];

  // Helper for checkbox
  const handleStatusChange = (option: string) => {
    setStatus((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };
  const handleCategoryChange = (option: string) => {
    setCategory((prev) =>
      prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
    );
  };
  const handleAuthorRoleChange = (option: string) => {
    setAuthorRole((prev) =>
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
              setStatus([]);
              setCategory([]);
              setTag("");
           
              setAuthorRole([]);
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
            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Status:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Published", "Draft", "Pending", "Archived"].map((option) => (
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

            {activeTab === "Category" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Category:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Careers", "Exams", "Skills", "Colleges", "Trends"].map((option) => (
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

            {activeTab === "Tag" && (
              <>
                <label htmlFor="tag" className="text-[var(--text)]">Tag:</label>
                <Input
                  id="tag"
                  placeholder="e.g. AI, Communication, NEET, Resume, Coding, etc."
                  type="text"
                  className="mt-4 w-full "
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                />
              </>
            )}

          

            {activeTab === "Author Role" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Author Role:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Admin", "Coach", "Contributor"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={authorRole.includes(option)}
                        onCheckedChange={() => handleAuthorRoleChange(option)}
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
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
      {Stats.map((stat, index) => (
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

const actionIconMap: Record<string, React.ReactNode> = {
  Edit: <Edit className="h-3 w-3" />,
  Archive: <Archive className="h-3 w-3" />,
  Publish: <Check className="h-3 w-3" />,
  Approve: <Check className="h-3 w-3" />,
  Reject: <X className="h-3 w-3" />,
  View: <Eye className="h-3 w-3" />,
  Invoice: <FileText className="h-3 w-3" />,
  Activate: <Check className="h-3 w-3" />,
  Delete: <Trash2 className="h-3 w-3" />,
  Review: <FileCheck2 className="h-3 w-3" />,
  Flag: <Flag className="h-3 w-3" />,
  Assign: <Users className="h-3 w-3" />,
  Resolve: <Check className="h-3 w-3" />,
  Close: <X className="h-3 w-3" />,
  Restore: <Check className="h-3 w-3" />,
  Respond: <MessageCircle className="h-3 w-3" />,
  Remove: <Trash2 className="h-3 w-3" />,
  Reply: <MessageCircle className="h-3 w-3" />,
  Note: <FileText className="h-3 w-3" />,
  Done: <Check className="h-3 w-3" />,
  Questions: <BadgeQuestionMark className="h-3 w-3" />,
  Results: <FileDown className="h-3 w-3" />,
  Details: <Eye className="h-3 w-3" />,
  Debug: <FileCheck2 className="h-3 w-3" />,
  Fix: <Check className="h-3 w-3" />,
  Verify: <Check className="h-3 w-3" />,
  Comment: <MessageCircle className="h-3 w-3" />,
  Download: <Download className="h-3 w-3" />,
  Cancel: <X className="h-3 w-3" />,
  Suspend: <Flag className="h-3 w-3" />,
  Deactivate: <X className="h-3 w-3" />,
  Investigate: <Search className="h-3 w-3" />,
  Refund: <FileDown className="h-3 w-3" />,
};

function SessionTabs() {
  const [activeTab, setActiveTab] = useState("published");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "ascending",
  });

  // Assign IDs to rows if not present (for selection)
  const addIds = (data: any[]) =>
    data.map((item, idx) => ({ id: idx + 1, ...item }));

  const getCurrentData = () => {
    switch (activeTab) {
      case "published":
        return addIds(PublishedTableData);
      case "drafts":
        return addIds(DraftsTableData);
      case "pending":
        return addIds(PendingApprovalTableData);
      case "archived":
        return addIds(ArchivedTableData); // Add archived data
      default:
        return [];
    }
  };

  const currentData = getCurrentData();
  let sortedData = [...currentData];
  if (sortConfig && typeof sortConfig.key === "string" && typeof sortConfig.direction === "string") {
    sortedData = sortedData.filter((item) => item && typeof item === "object");
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === undefined || bValue === undefined) return 0;
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentRecords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRecords.map((item) => item.id));
    }
  };

  const toggleSelectRow = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  // Table headers for each tab
  const getTableHeaders = () => {
    switch (activeTab) {
      case "published":
        return (
          <>
            <TableHead onClick={() => requestSort("title")} className="cursor-pointer text-[var(--text)]">Title {sortConfig?.key === "title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("author")} className="cursor-pointer text-[var(--text)]">Author {sortConfig?.key === "author" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("category")} className="cursor-pointer text-[var(--text)]">Category {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("tags")} className="cursor-pointer text-[var(--text)]">Tags {sortConfig?.key === "tags" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("For")} className="cursor-pointer text-[var(--text)]">Segment {sortConfig?.key === "For" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("views")} className="cursor-pointer text-[var(--text)]">Views {sortConfig?.key === "views" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("Status")} className="cursor-pointer text-[var(--text)]">Status {sortConfig?.key === "Status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>

          </>
        );
      case "drafts":
        return (
          <>
            <TableHead onClick={() => requestSort("title")} className="cursor-pointer text-[var(--text)]">Title {sortConfig?.key === "title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("author")} className="cursor-pointer text-[var(--text)]">Author {sortConfig?.key === "author" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("category")} className="cursor-pointer text-[var(--text)]">Category {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("lastEdited")} className="cursor-pointer text-[var(--text)]">Last Edited {sortConfig?.key === "lastEdited" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("suggestedTags")} className="cursor-pointer text-[var(--text)]">Suggested Tags {sortConfig?.key === "suggestedTags" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
          </>
        );
      case "pending":
        return (
          <>
            <TableHead onClick={() => requestSort("title")} className="cursor-pointer text-[var(--text)]">Title {sortConfig?.key === "title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("author")} className="cursor-pointer text-[var(--text)]">Author {sortConfig?.key === "author" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("category")} className="cursor-pointer text-[var(--text)]">Category {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("submittedOn")} className="cursor-pointer text-[var(--text)]">Submitted On {sortConfig?.key === "submittedOn" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("assignedEditor")} className="cursor-pointer text-[var(--text)]">Assigned Editor {sortConfig?.key === "assignedEditor" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
          </>
        );
      case "archived":
        return (
          <>
            <TableHead onClick={() => requestSort("title")} className="cursor-pointer text-[var(--text)]">Title {sortConfig?.key === "title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("author")} className="cursor-pointer text-[var(--text)]">Author {sortConfig?.key === "author" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("category")} className="cursor-pointer text-[var(--text)]">Category {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("archivedOn")} className="cursor-pointer text-[var(--text)]">Archived On {sortConfig?.key === "archivedOn" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
            <TableHead onClick={() => requestSort("reason")} className="cursor-pointer text-[var(--text)]">Reason {sortConfig?.key === "reason" && (sortConfig.direction === "ascending" ? "↑" : "↓")}</TableHead>
          </>
        );
      default:
        return null;
    }
  };


  const renderTableCells = (row: Record<string, any>) => {
    switch (activeTab) {
      case "published":
        return (
          <>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.tags && Array.isArray(row.tags) ? row.tags.join(", ") : ""}</TableCell>
            <TableCell>{row.for}</TableCell>
            <TableCell>{row.views}</TableCell>
            <TableCell>{row.status}</TableCell>
          </>
        );
      case "drafts":
        return (
          <>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.lastEdited}</TableCell>
            <TableCell>{row.suggestedTags && Array.isArray(row.suggestedTags) ? row.suggestedTags.join(", ") : ""}</TableCell>
          </>
        );
      case "pending":
        return (
          <>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.submittedOn}</TableCell>
            <TableCell>{row.assignedEditor}</TableCell>
          </>
        );
      case "archived":
        return (
          <>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.author}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.archivedOn}</TableCell>
            <TableCell>{row.reason}</TableCell>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <Button
          variant={activeTab === "published" ? "brand" : "border"}
          className="rounded-b-none rounded-tr-sm rounded-tl-sm"
          onClick={() => {
            setActiveTab("published");
            setCurrentPage(1);
            setSelectedRows([]);
          }}
        >
          Published
        </Button>
        <Button
          variant={activeTab === "drafts" ? "brand" : "border"}
          className="rounded-b-none rounded-tr-sm rounded-tl-sm"
          onClick={() => {
            setActiveTab("drafts");
            setCurrentPage(1);
            setSelectedRows([]);
          }}
        >
          Drafts
        </Button>
        <Button
          variant={activeTab === "pending" ? "brand" : "border"}
          className="rounded-b-none rounded-tr-sm rounded-tl-sm"
          onClick={() => {
            setActiveTab("pending");
            setCurrentPage(1);
            setSelectedRows([]);
          }}
        >
          Pending Approval
        </Button>
        <Button
          variant={activeTab === "archived" ? "brand" : "border"}
          className="rounded-b-none rounded-tr-sm rounded-tl-sm"
          onClick={() => {
            setActiveTab("archived");
            setCurrentPage(1);
            setSelectedRows([]);
          }}
        >
          Archived
        </Button>
      </div>

      {/* Table Controls */}
      <div className="flex-1 rounded-tl-none rounded-md border bg-[var(--background)] overflow-x-auto">
        <div className="flex items-center justify-between border-b h-20 p-4">
          <div className="flex items-center gap-2">
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
                <Badge variant="border" className="ml-2">
                  {selectedRows.length} selected
                </Badge>
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
        {/* Table */}
        <div className="overflow-x-auto text-[var(--text)] w-full">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-[var(--faded)]">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                {getTableHeaders()}
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((row) => (
                <TableRow
                  key={row.id}
                  data-id={row.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]"
                  )}
                  onClick={() => toggleSelectRow(row.id)}
                >
                  <TableCell className="pl-3 transition-all border-l-transparent duration-200 border-l-4 group-hover:border-[var(--brand-color)]">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectRow(row.id)}
                    />
                  </TableCell>
                  {renderTableCells(row)}
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        {row.actions && row.actions.map((action: string, idx: number) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <Button variant="actionIcon" size="actionIcon" aria-label={action}>
                                {actionIconMap[action]}
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
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  {recordsPerPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[var(--background)] text-[var(--text)]">
                {[ 10, 25, 50, 100].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => {
                      setRecordsPerPage(size);
                      setCurrentPage(1);
                    }}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-[var(--text)]">
              Showing {indexOfFirstRecord + 1}–{Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
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
  );
}
