import {
  Clock,
  Search,
  Users,
  FileCheck2,
  FileText,
  FileDown,

  Bell,
  X,
  SquarePen,
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
import { ChevronDown, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { FaqsTableData } from "@/data/Data";

import * as React from "react";
import { cn } from "@/lib/utils";

import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import type { DateRange } from "react-day-picker";
// import {
//   SelectItem,
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectValue,
// } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
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
    title: "Total FAQ Pages",
    value: "18",
    icon: Users,
  },
  {
    title: "Total Questions",
    value: "246",
    icon: FileCheck2,
  },
  {
    title: "Recently Updated Pages",
    value: "5",
    icon: FileText,
  },
  {
    title: "Last Update",
    value: " 18 May 2025",
    icon: Clock,
  },
];

export function Faq() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [, setCurrentRecords] = useState<any[]>([]);

  // // Handler for select all toggle
  // const toggleSelectAll = () => {
  //   if (selectedRows.length === currentRecords.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(currentRecords.map((_, idx) => idx));
  //   }
  // };

  return (
    <div className="flex flex-col gap-2">
      <Bar />
      <StatCard />
      <FaqsTable
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setCurrentRecords={setCurrentRecords}
      />
    </div>
  );
}

function Bar() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <Breadcrumb>
        <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>FAQs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
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

        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

interface FormProps {
  onClose: () => void;
}

function Form({ onClose }: FormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [pageName, setPageName] = useState("");


  // FAQ state
  type FAQ = { id: number; question: string; answer: string };
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showQAForm, setShowQAForm] = useState(false);
  const [qaDraftQ, setQaDraftQ] = useState("");
  const [qaDraftA, setQaDraftA] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");

 

  const startEdit = (item: FAQ) => {
    setEditingId(item.id);
    setEditQ(item.question);
    setEditA(item.answer);
  };

  const saveEdit = () => {
    if (editingId == null) return;
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === editingId
          ? { ...f, question: editQ.trim(), answer: editA.trim() }
          : f
      )
    );
    setEditingId(null);
    setEditQ("");
    setEditA("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQ("");
    setEditA("");
  };

  const addFAQ = () => {
    const q = qaDraftQ.trim();
    const a = qaDraftA.trim();
    if (!q || !a) return;
    setFaqs((prev) => [{ id: Date.now(), question: q, answer: a }, ...prev]);
    setQaDraftQ("");
    setQaDraftA("");
    setShowQAForm(false);
  };

  const deleteFAQ = (id: number) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40  flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Add FAQ
          </CardTitle>
        </div>

        {/* Scroll Area */}
        <div className="flex-1 p-6 space-y-6 text-[var(--text)] overflow-y-auto relative">
          {/* Basic fields */}
          <div className="flex flex-col gap-2">
            <Label>Page Title</Label>
            <Input
              placeholder="Enter Page Title"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
          </div>

         
          {/* FAQs section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-[var(--text-head)]">
                FAQs
              </CardTitle>
            </div>

            {/* Add new QA composer */}
            {!showQAForm ? (
              <Button
                variant="border"
                onClick={() => setShowQAForm(true)}
                className="w-full justify-center"
              >
                Add Question
              </Button>
            ) : (
              <div className="rounded-sm border p-4  space-y-3">
                <div className="flex flex-col gap-2">
                  <Label>Question</Label>
                  <Input
                    placeholder="Type your question"
                    value={qaDraftQ}
                    onChange={(e) => setQaDraftQ(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Answer</Label>
                  <Textarea
                    placeholder="Type the answer"
                    value={qaDraftA}
                    onChange={(e) => setQaDraftA(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="border"
                    onClick={() => {
                      setShowQAForm(false);
                      setQaDraftQ("");
                      setQaDraftA("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="brand" onClick={addFAQ}>
                    Save
                  </Button>
                </div>
              </div>
            )}

            {/* FAQ list */}
            <div className="space-y-3">
              {faqs.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-sm border p-4 bg-[var(--background)]"
                >
                  {/* Controls top-right */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    {editingId === item.id ? (
                      <>
                        <div className="flex gap-4 justify-end flex-col">
                          <Button size="sm" variant="brand" onClick={saveEdit}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="border"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="noborder"
                          onClick={() => startEdit(item)}
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="noborder"
                          onClick={() => deleteFAQ(item.id)}
                        >
                          <X className="h-4 w-4 text-[var(--red)]" />
                        </Button>
                      </>
                    )}
                  </div>

                  {editingId === item.id ? (
                    <div className="space-y-3 pr-28">
                      <div className="flex flex-col gap-2">
                        <Label>Question</Label>
                        <Input
                          value={editQ}
                          onChange={(e) => setEditQ(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Answer</Label>
                        <Textarea
                          value={editA}
                          onChange={(e) => setEditA(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pr-28">
                      <div className="font-semibold text-[var(--text-head)]">
                        {item.question}
                      </div>
                      <div className="text-[var(--text)] whitespace-pre-wrap">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {faqs.length === 0 && !showQAForm && (
                <div className="text-sm text-low text-center py-6">
                  No FAQs added yet. Click{" "}
                  <span className="font-medium">Add Question</span> to create
                  one.
                </div>
              )}
            </div>
          </div>

          {/* Sticky add button (optional). Uncomment if you want it always visible above footer */}
          {false && (
            <div className="sticky bottom-0 pt-3 bg-[var(--background)]">
              <Button
                variant="border"
                onClick={() => setShowQAForm(true)}
                className="w-full"
              >
                Add Question
              </Button>
            </div>
          )}
        </div>

        {/* Footer (stays fixed because it's outside the scroll area) */}
        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="border">Draft</Button>
            <Button variant="brand">Active</Button>
          </div>
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
  const [activeTab, setActiveTab] = useState("Audience For");
  const [audience, setAudience] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

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

  const tabList = ["Audience For", "Status", "Date Range"];
  const audienceOptions = ["Students", "Parents", "Coaches", "Admins"];
  const statusOptions = ["Active", "Draft", "Archived"];

  const handleAudienceChange = (option: string) => {
    setAudience((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    );
  };
  const handleStatusChange = (option: string) => {
    setStatus((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  };
  const handleClearAll = () => {
    setAudience([]);
    setStatus([]);
    setDateRange(undefined);
  };

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
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </div>
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
          <div className="p-6 overflow-y-auto relative w-full">
            {activeTab === "Audience For" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Audience For:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {audienceOptions.map((option) => (
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
            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Status:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {statusOptions.map((option) => (
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
            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range: Last Updated
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </>
            )}
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
interface FaqsTableProps {
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentRecords: (records: any[]) => void;
}

function FaqsTable({
  selectedRows,
  setSelectedRows,
  setCurrentRecords,
}: FaqsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof FaqsTableData)[0];
    direction: "ascending" | "descending";
  } | null>(null);

  // Filtering (search by Page Title, For, Status)
  const filteredData = FaqsTableData.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item["Page Title"].toLowerCase().includes(searchLower) ||
      item.For.toLowerCase().includes(searchLower) ||
      item.Status.toLowerCase().includes(searchLower)
    );
  });

  // Sorting logic
  const sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      // Special handling for Questions (number) and Last Updated (date)
      if (sortConfig.key === "Questions") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      if (sortConfig.key === "Last Updated") {
        aValue = Date.parse(aValue as string);
        bValue = Date.parse(bValue as string);
      }
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

  // Update currentRecords in parent for select toggle
  React.useEffect(() => {
    setCurrentRecords(currentRecords);
    // eslint-disable-next-line
  }, [currentRecords.length, currentPage, recordsPerPage, search, sortConfig]);

  // Select All logic (like Surveys)
  const toggleSelectAll = () => {
    if (selectedRows.length === currentRecords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRecords.map((_, idx) => idx + indexOfFirstRecord));
    }
  };

  const toggleSelectRow = (rowIdx: number) => {
    if (selectedRows.includes(rowIdx)) {
      setSelectedRows(selectedRows.filter((idx) => idx !== rowIdx));
    } else {
      setSelectedRows([...selectedRows, rowIdx]);
    }
  };

  const requestSort = (key: keyof (typeof FaqsTableData)[0]) => {
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

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI (like Surveys) */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-faqs"
                checked={
                  selectedRows.length === currentRecords.length &&
                  currentRecords.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all-faqs"
                className="text-sm font-medium text-[var(--text)]"
              >
                Select All
              </label>
              {selectedRows.length > 0 && (
                <>
                  <Badge variant="border" className="ml-2 ">
                    {selectedRows.length} selected
                  </Badge>
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
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 ">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
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
                <TableHead
                  className="text-[var(--text)] cursor-pointer"
                  onClick={() => requestSort("Page Title")}
                >
                  Page Title{" "}
                  {sortConfig?.key === "Page Title" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-[var(--text)] cursor-pointer"
                  onClick={() => requestSort("For")}
                >
                  Segment{" "}
                  {sortConfig?.key === "For" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-[var(--text)] cursor-pointer"
                  onClick={() => requestSort("Questions")}
                >
                  Questions{" "}
                  {sortConfig?.key === "Questions" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-[var(--text)] cursor-pointer"
                  onClick={() => requestSort("Last Updated")}
                >
                  Last Updated{" "}
                  {sortConfig?.key === "Last Updated" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="text-[var(--text)] cursor-pointer"
                  onClick={() => requestSort("Status")}
                >
                  Status{" "}
                  {sortConfig?.key === "Status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((item, idx) => {
                const rowIdx = indexOfFirstRecord + idx;
                return (
                  <TableRow
                    key={rowIdx}
                    data-id={rowIdx}
                    className={cn(
                      "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                      selectedRows.includes(rowIdx)
                        ? "bg-[var(--brand-color3)]"
                        : ""
                    )}
                    onClick={() => toggleSelectRow(rowIdx)}
                  >
                    <TableCell
                      className={cn(
                        "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                        selectedRows.includes(rowIdx)
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                      )}
                    >
                      <Checkbox
                        checked={selectedRows.includes(rowIdx)}
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => toggleSelectRow(rowIdx)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item["Page Title"]}</div>
                    </TableCell>
                    <TableCell>{item.For}</TableCell>
                    <TableCell>{item.Questions}</TableCell>
                    <TableCell>{item["Last Updated"]}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.Status === "Active" ? "standard" : "border"
                        }
                      >
                        {item.Status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="standard"
                          size="new"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowForm(true);
                          }}
                        >
                          View FAQs →
                        </Button>
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
              {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
              {sortedData.length} FAQs
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
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </div>
  );
}
