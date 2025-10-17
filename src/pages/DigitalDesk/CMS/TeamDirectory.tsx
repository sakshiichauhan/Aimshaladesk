// export function TeamDirectory() {
//   return <div>TeamDirectory</div>;
// }
import {  Search, Check, Users, FileCheck2,   Trash, FileDown, Edit, BadgeQuestionMark, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ChevronRight, ChevronLeft} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {TeamDirectoryTable, defaultLogo } from "@/data/Data";

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import DatePick from "@/components/ui/DatePicker"
import avatar from "@/assets/avatar.png";
import { Label } from "@/components/ui/label";

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
    title: "Total Members Listed",
    value: "36",
    icon: Users,

  },
  {
    title: "Last Update",
    value: " 18 May 2025",
    icon: FileCheck2,

  },

 
];



export function TeamDirectory() {


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

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [link, setLink] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  return () => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); };
}, [avatarPreview]);

function onPick(files: FileList | null) {
  if (!files || !files[0]) return;
  const file = files[0];
  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");
    return;
  }
  if (avatarPreview) URL.revokeObjectURL(avatarPreview);
  setAvatarFile(file);
  setAvatarPreview(URL.createObjectURL(file));
}

function removeAvatar() {
  if (avatarPreview) URL.revokeObjectURL(avatarPreview);
  setAvatarFile(null);
  setAvatarPreview(null);
}

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40  flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Add Team Member</CardTitle>
        </div>

        <div className="flex-1 p-6 space-y-6 text-[var(--text)] overflow-y-auto relative">
        <div className="flex items-center gap-4">
          {/* Avatar uploader */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files)}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group w-20 h-20 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--faded)] flex items-center justify-center relative"
              title={avatarFile ? "Change photo" : "Upload photo"}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-[var(--text-head)] px-2 text-center leading-4">
                  Upload Photo
                </span>
              )}
            </button>

            {avatarPreview && (
              <Button
                variant="actionIcon"
                size="actionIcon"
                className="absolute -right-1 -top-1 bg-[var(--background)]"
                onClick={(e) => { e.stopPropagation(); removeAvatar(); }}
              >
                <X className="h-2 w-2 text-[var(--red)]" />
              </Button>
            )}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Enter Name</Label>
            <Input
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>


          <div className="flex flex-col gap-2">
            <Label>Designation</Label>
            <Input placeholder="Enter Designation" value={source} onChange={(e) => setSource(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Linkedin</Label>
            <Input placeholder="Add Linkedin Link" value={link} onChange={(e) => setLink(e.target.value)} />
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
                <BreadcrumbPage>Team Directory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex gap-4">
      <Button variant="brand" size="new" onClick={() => setShowForm(true)}>
        <Plus className="h-3 w-3" />
       
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
        <Button variant="standard" size="new">
          <BadgeQuestionMark className="h-3 w-3" />
     
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
  const [selectedNewsStack, setSelectedNewsStack] = useState<typeof TeamDirectoryTable>(TeamDirectoryTable[0] ? [TeamDirectoryTable[0]] : []);
  const [focusedNewsId, setFocusedNewsId] = useState<string | null>(null);

  // Sorting logic
  const sortedData = [...TeamDirectoryTable];
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

  const totalPages = Math.ceil(TeamDirectoryTable.length / recordsPerPage);
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

  const bringToTop = (newsName: string) => {
    const newsItem = selectedNewsStack.find(item => item.name === newsName);
    if (newsItem) {
      setSelectedNewsStack(prev => [newsItem, ...prev.filter(item => item.name !== newsName)]);
      setFocusedNewsId(newsName);
    }
  };

  const handleRowClick = (newsItem: typeof TeamDirectoryTable[0]) => {
    const exists = selectedNewsStack.find(item => item.name === newsItem.name);
    if (!exists) {
      setSelectedNewsStack(prev => [newsItem, ...prev].slice(0, 5));
      setFocusedNewsId(newsItem.name);
    } else {
      bringToTop(newsItem.name);
    }
  };

  const toggleSelectNews = (newsIdx: number) => {
    const newsName = TeamDirectoryTable[newsIdx]?.name;
    if (selectedNews.includes(newsIdx)) {
      setSelectedNews(selectedNews.filter(id => id !== newsIdx));
      setSelectedNewsStack(prev => prev.filter(item => item.name !== newsName));
      if (focusedNewsId === newsName) setFocusedNewsId(null);
    } else {
      setSelectedNews([...selectedNews, newsIdx]);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-name]");
    allRows.forEach(row => {
      const rowName = row.getAttribute("data-name");
      const isInStack = selectedNewsStack.some(item => item.name === rowName);
      const isTop = focusedNewsId === rowName;

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
                placeholder="Search ..."
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
                <TableHead className="text-[var(--text)] text-low">
                  Picture
                </TableHead>
                <TableHead
                  onClick={() => requestSort("name")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Name {sortConfig?.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("role")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Designation {sortConfig?.key === "role" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer text-[var(--text)]"
                >
                  Linkedin
                </TableHead>
                <TableHead
                  onClick={() => requestSort("status")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
              
              
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((news, idx) => {
                const globalIdx = indexOfFirstRecord + idx;
                return (
                <TableRow
                  key={globalIdx}
                  data-name={news.name}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedNewsStack.some(item => item.name === news.name)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectNews(globalIdx);
                    handleRowClick(news);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedNewsStack.some(item => item.name === news.name)
                        ? focusedNewsId === news.name
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedNews.includes(globalIdx)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectNews(globalIdx)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={news.picture === "avatar.png" ? avatar : news.picture || defaultLogo}
                        alt={news.name}
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {news.name}
                  </TableCell>
                  <TableCell>
                    {news.role}
                  </TableCell>
                  <TableCell>
                    <a href="#" className="text-[var(--brand-color)] hover:underline">
                      {news.linkedin}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "bg-opacity-10",
                      news.status === "Active" 
                        ? "bg-[var(--green2)] text-[var(--green)]" 
                        : "bg-[var(--yellow2)] text-[var(--yellow)]"
                    )}>
                      {news.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        {news.actions.map((action, actionIdx) => (
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
              )})}
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
              {Math.min(indexOfLastRecord, TeamDirectoryTable.length)} of{" "}
              {TeamDirectoryTable.length} items
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