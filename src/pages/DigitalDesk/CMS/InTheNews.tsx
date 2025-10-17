
import {  Search, Check, Users, FileCheck2,   Trash, FileDown, Edit, BadgeQuestionMark, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { NewTable, defaultLogo } from "@/data/Data";

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import DatePick from "@/components/ui/DatePicker"
import { DatePickerWithRange } from "@/components/date-picker";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    title: "Total News Entries",
    value: "93",
    icon: Users,

  },
  {
    title: "Featured News Items",
    value: "19",
    icon: FileCheck2,

  },

 
];



export function InTheNews() {


  return (
    <div className="flex flex-col gap-2">
        <Bar />
      <StatCard />
    
   
 

      <NewsData />
    </div>
  );
}


interface FormProps {
  onClose: () => void;
}


function Form({ onClose }: FormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [newsTitle, setNewsTitle] = useState("");
  const [source, setSource] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onFilesPicked = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) return; // optional: show toast
    const url = URL.createObjectURL(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(url);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onFilesPicked(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Add News Item</CardTitle>
        </div>

        <div className="flex-1 p-6 space-y-6 text-[var(--text)] overflow-y-auto relative">
          <div className="flex flex-col gap-2">
            <Label>News Title</Label>
            <Input placeholder="Enter News Title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Source</Label>
            <Input placeholder="Enter Source" value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Link</Label>
            <Input placeholder="Enter Link" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>

         

          <div className="flex flex-col gap-2">
            <Label>Logo</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFilesPicked(e.target.files)}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={cn(
                "border rounded-sm p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition",
                "bg-[var(--faded)] hover:bg-[var(--brand-color2)]",
                isDragging ? "border-dashed border-[var(--brand-color)]" : "border-1 border-[var(--border)]"
              )}
            >
              {!imagePreview ? (
                <>
                  <div className="text-sm text-[var(--text-head)]">Drag & drop an image here, or click to browse</div>
                  <div className="text-xs text-low">PNG, JPG up to ~5MB</div>
                </>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full aspect-video overflow-hidden rounded-sm border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-low truncate">
                      {imageFile?.name} • {(imageFile!.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <Button variant="delete" size="sm" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Notes</Label>
            <Textarea placeholder="Any optional notes.." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>Cancel</Button>
          <Button variant="brand" onClick={onClose}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}




function Bar() {
  const [showForm, setShowForm] = useState(false);
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>In the News</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex gap-4">
      <Button
          variant="brand"
          size="new"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {showForm && <Form onClose={() => setShowForm(false)} />}
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




interface FilterProps {
  onClose: () => void;
}


function AdvancedFilters ({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("General");

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

  const [group, setGroup] = useState("6-8");
  const [category, setCategory] = useState("Career");
  const [status, setStatus] = useState("Active");

  const tabList = [
    "General",
    "Target Group",
    "Category",
    "Status",
    "Created By",
    "Date Range",
  ];

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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">Enter Assessment Name :</label>
                <Input id="Gen" placeholder="Enter .." type="text" className="mt-4 w-full " />

              </>
            )}

            {activeTab === "Target Group" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Target Group:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "6-8",
                    "9-10",
                    "11-12",
                    "UG",
                    "PG",
                    "Professionals",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={group}
                      onChange={setGroup}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Category" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Category :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Career",
                    "Aptitude",
                    "Personality",
                    "Skills",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={category}
                      onChange={setCategory}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Choose Status :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Active",
                    "Inactive",
                    "Draft",
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

            {activeTab === "Created By" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">Enter The Creator/Coach / Admin Name :</label>
                <Input id="Gen" placeholder="Enter.." type="text" className="mt-4 w-full " />

              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">Enter the Last Assessment Date :</label>
                <div className="mt-4 min-w-full">
                  <DatePick />
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
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-2">
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

function NewsData() {
  const [selectedNews, setSelectedNews] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedNewsStack, setSelectedNewsStack] = useState<typeof NewTable>(NewTable[0] ? [NewTable[0]] : []);
  const [focusedNewsId, setFocusedNewsId] = useState<number | null>(null);

  // Sorting logic
  const sortedData = [...NewTable];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      
      if (sortConfig.key === "Clicks") {
        return sortConfig.direction === "ascending"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }

  const totalPages = Math.ceil(NewTable.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedNews.length === currentRecords.length) {
      setSelectedNews([]);
      setSelectedNewsStack([]);
      setFocusedNewsId(null);
    } else {
      setSelectedNews(currentRecords.map((_, idx: number) => indexOfFirstRecord + idx));
    }
  };

  const bringToTop = (newsIdx: number) => {
    const newsItem = selectedNewsStack.find((_, idx) => idx === newsIdx);
    if (newsItem) {
      setSelectedNewsStack(prev => [newsItem, ...prev.filter((_, idx) => idx !== newsIdx)]);
      setFocusedNewsId(newsIdx);
    }
  };

  const handleRowClick = (newsItem: typeof NewTable[0], idx: number) => {
    const exists = selectedNewsStack.find(item => item.Title === newsItem.Title);
    if (!exists) {
      setSelectedNewsStack(prev => [newsItem, ...prev].slice(0, 5));
      setFocusedNewsId(idx);
    } else {
      bringToTop(idx);
    }
  };

  const toggleSelectNews = (newsIdx: number) => {
    if (selectedNews.includes(newsIdx)) {
      setSelectedNews(selectedNews.filter(id => id !== newsIdx));
      setSelectedNewsStack(prev => prev.filter((_, idx) => idx !== newsIdx));
      if (focusedNewsId === newsIdx) setFocusedNewsId(null);
    } else {
      setSelectedNews([...selectedNews, newsIdx]);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach(row => {
      const id = Number(row.getAttribute("data-id"));
      const isInStack = selectedNewsStack.some(item => 
        item.Title === NewTable.find((_, nidx) => nidx === id)?.Title
      );
      const isTop = focusedNewsId === id;

      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");

      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedNewsStack, focusedNewsId]);

  const renderActionIcon = (action: string) => {
    switch (action) {
      case 'Edit': return <Edit className="h-3 w-3" />;
      case 'Archive': return <Trash className="h-3 w-3" />;
      case 'Review': return <BadgeQuestionMark className="h-3 w-3" />;
      case 'Publish': return <Check className="h-3 w-3" />;
      default: return <Edit className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex items-center justify-between border-b p-4 mt-auto min-h-20 flex-wrap">
          <div className="flex items-center justify-between pl-0 p-4 gap-4 flex-wrap">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all"
                checked={selectedNews.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
                Select All
              </label>
              {selectedNews.length > 0 && (
                <Badge variant="border" className="ml-2">
                  {selectedNews.length} selected
                </Badge>
              )}
            </div>

            {selectedNews.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <Button variant="border" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Publish Selected
                </Button>
                <Button variant="delete" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Archive Selected
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-4">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search news..."
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
                  onClick={() => requestSort("Logo")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Logo
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Title")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Title {sortConfig?.key === "Title" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Source")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Source {sortConfig?.key === "Source" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Link")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Link
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Clicks")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Clicks {sortConfig?.key === "Clicks" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Date")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Date {sortConfig?.key === "Date" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Status")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status {sortConfig?.key === "Status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((news, idx) => (
                <TableRow
                  key={idx}
                  data-id={idx}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedNewsStack.some(item => item.Title === news.Title)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectNews(idx);
                    handleRowClick(news, idx);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedNewsStack.some(item => item.Title === news.Title)
                        ? focusedNewsId === idx
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedNews.includes(idx)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectNews(idx)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <img
                        src={news.Logo || defaultLogo}
                        alt="Logo"
                        className="h-14 w-14 object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {news.Title}
                  </TableCell>
                  <TableCell>
                    {news.Source}
                  </TableCell>
                  <TableCell>
                    <a href="#" className="text-[var(--brand-color)] hover:underline">
                      {news.Link}
                    </a>
                  </TableCell>
                  <TableCell>
                    {news.Clicks.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {news.Date}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "bg-opacity-10",
                      news.Status === "Published" 
                        ? "bg-[var(--green2)] text-[var(--green)]" 
                        : "bg-[var(--yellow2)] text-[var(--yellow)]"
                    )}>
                      {news.Status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        {news.Actions.map((action, actionIdx) => (
                          <Tooltip key={actionIdx}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="actionIcon"
                                size="actionIcon"
                                title={action}
                              >
                                {renderActionIcon(action)}
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
                {[ 10, 25, 50, 100].map((size) => (
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
              {Math.min(indexOfLastRecord, NewTable.length)} of{" "}
              {NewTable.length} items
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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