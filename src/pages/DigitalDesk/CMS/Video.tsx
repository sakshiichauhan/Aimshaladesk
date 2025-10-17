import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,

  Search,
  ExternalLink,
  Download,
  Eye,
  Bell,
  FileDown,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, BookPlus, Clock, MessageSquare } from "lucide-react";
import { useRef, useState } from "react";
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
import { Trash, Edit} from "lucide-react";
import { VideoTableData } from "@/data/Data";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { Filter } from "lucide-react";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectItem, SelectContent, SelectTrigger, SelectValue, Select } from "@/components/ui/select";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";


const stats = [
  {
    title: "Total Videos",
    value: "236",

    icon: Video,

  },
  {
    title: "Published Videos",
    value: "192",
    icon: BookPlus,

  },
  {
    title: "Pending Review",
    value: "22",
    icon: Clock,

  },
  {
    title: "Video Formats",
    value: "642",
    icon: MessageSquare,

  },
  {
    title: "Total Plays (30d)",
    value: "42,310",
    icon: Eye,

  },
];

export  function VideoLibraries() {
  return (
    <div className="flex flex-col gap-2">
      <Bar />
        <StatsCards />
      
        <VideoTableSection />
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
                <BreadcrumbPage>Video Library</BreadcrumbPage>
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
        <Button variant="standard" size="new">
          <Download className="h-3 w-3" />
        
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

  const [newsTitle, setNewsTitle] = useState("");

  const [category, setCategory] = useState("");
 
  const [notes, setNotes] = useState("");
  const [selectedFor, setSelectedFor] = useState<string[]>([]);
  const handleForToggle = (forItem: string) => {
    setSelectedFor((prev) =>
      prev.includes(forItem)
        ? prev.filter((f) => f !== forItem)
        : [...prev, forItem]
    );
  };


  const categoryList = ["Carrer Guidance", "Skills", "Innovation", "Soft Skills", "Technology"];
  const forList = ["9-10", "11-12", "UG", "PG", "Professionals"];


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  function onFilesPicked(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Optional: validate type/size
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      alert("Please upload a valid video file.");
      return;
    }
    // Example size guard ~200MB
    if (file.size > 200 * 1024 * 1024) {
      alert("Max file size is 200MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreview(url);
    setVideoDuration(null); // will be set after metadata loads
  }

  function removeVideo() {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    setVideoDuration(null);
  }

  // DnD handlers
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onFilesPicked(e.dataTransfer.files);
  }
  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }
  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  // Format helpers
  const sizeMB = videoFile ? (videoFile.size / 1024 / 1024).toFixed(2) : null;
  const durationStr =
    videoDuration != null
      ? new Date(videoDuration * 1000).toISOString().substring(11, 19) // HH:MM:SS
      : null;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40  flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Add Video</CardTitle>
        </div>

        <div className="flex-1 p-6 space-y-6 text-[var(--text)] overflow-y-auto relative">
          <div className="flex flex-col gap-2">
            <Label>Video Title</Label>
            <Input placeholder="Enter Video Title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
          </div>

         

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select For" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {categoryList.map((pt) => (
                  <SelectItem key={pt} value={pt}>{pt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Segments</Label>
            <div className="grid grid-cols-2 gap-2">
              {forList.map((forItem) => (
                <label key={forItem} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedFor.includes(forItem)}
                    onCheckedChange={() => handleForToggle(forItem)}
                  />
                  <span className="text-sm">{forItem}</span>
                </label> 
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
      <Label>Video</Label>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"               // accept any video type
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
        {!videoPreview ? (
          <>
            <div className="text-sm text-[var(--text-head)]">
              Drag & drop a video here, or click to browse
            </div>
            <div className="text-xs text-low">MP4, MOV, WEBM, etc. up to ~200MB</div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <div className="w-full aspect-video overflow-hidden rounded-sm border">
              {/* Use controls so user can scrub; preload metadata to get duration */}
              <video
                src={videoPreview}
                className="h-full w-full object-cover"
                controls
                preload="metadata"
                onLoadedMetadata={(e) => {
                  const vid = e.currentTarget;
                  setVideoDuration(vid.duration || 0);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-low truncate">
                {videoFile?.name}
                {sizeMB ? ` • ${sizeMB} MB` : ""} 
                {durationStr ? ` • ${durationStr}` : ""}
              </div>
              <div className="flex gap-2">
                {/* Optional: If you’ll transcode to MP4 client-side later */}
                {/* <Button variant="standard" size="sm" onClick={(e) => { e.stopPropagation(); convertToMp4(); }}>
                  Convert to MP4
                </Button> */}
                <Button
                  variant="delete"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); removeVideo(); }}
                >
                  Remove
                </Button>
              </div>
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



function StatsCards() {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
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

// function Buttonbar() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
//       <div className="flex gap-4 flex-wrap">
//       <Button
//           variant="brand"
//           size="new"
//           onClick={() => setShowForm(true)}
//         >
//           <Plus className="h-4 w-4" />Add Video
//         </Button>
//         {showForm && <Form onClose={() => setShowForm(false)} />}
//       </div>
//       <div className="flex gap-4">
//         <Button variant="standard" size="new">
//           <Download className="h-3 w-3" />
//           <span className="">Import Bulk Videos</span>
//         </Button>
//         </div>
//     </div>
//   );
// }

interface FilterProps {
  onClose: () => void;
}

function AdvancedFilters({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Video Mode");

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
  const [videoMode, setVideoMode] = useState<string[]>([]);
  const [mapping, setMapping] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>(undefined);

  const tabList = [
    "Video Mode",
    "Mapping",
    "Audience For",
    "Status",
    "Date Range",
  ];

  // Helper for checkbox
  const handleVideoModeChange = (option: string) => {
    setVideoMode((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };
  const handleMappingChange = (option: string) => {
    setMapping((prev) =>
      prev.includes(option) ? prev.filter((m) => m !== option) : [...prev, option]
    );
  };
  const handleAudienceChange = (option: string) => {
    setAudience((prev) =>
      prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]
    );
  };
  const handleStatusChange = (option: string) => {
    setStatus((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
      >
        <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
          <span className="text-2xl font-semibold text-[var(--text-head)]">Filters</span>
          <Button
            variant="link"
            className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
            onClick={() => {
              setVideoMode([]);
              setMapping([]);
              setAudience([]);
              setStatus([]);
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
            {activeTab === "Video Mode" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Video Mode:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["16:9", "9:16"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={videoMode.includes(option)}
                        onCheckedChange={() => handleVideoModeChange(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}
            {activeTab === "Mapping" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Mapping:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Story", "Instagram", "Success Story", "Section Page"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={mapping.includes(option)}
                        onCheckedChange={() => handleMappingChange(option)}
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
                  {["6–8", "9–10", "11–12", "UG", "PG", "Professionals"].map((option) => (
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
            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">Date Range: Filter by Upload Date</label>
                <div className="mt-4 min-w-full">
                  {/* Use your date picker component here, e.g. DatePickerWithRange or similar */}
                  <DatePickerWithRange value={dateRange} onChange={setDateRange} />
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



function VideoTableSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // Selection state for checkboxes
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedVideoStack, setSelectedVideoStack] = useState<typeof VideoTableData>(
    VideoTableData[0] ? [VideoTableData[0]] : []
  );
  const [focusedVideoId, setFocusedVideoId] = useState<string | null>(
    VideoTableData[0]?.id || null
  );

  // Sorting logic
  const sortedData = [...VideoTableData];
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

  // --- Selection helpers ---
  const toggleSelectAll = () => {
    if (selectedVideos.length === currentRecords.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(currentRecords.map((video) => video.id));
    }
  };

  const toggleSelectVideo = (videoId: string) => {
    if (selectedVideos.includes(videoId)) {
      setSelectedVideos(selectedVideos.filter((id) => id !== videoId));
    } else {
      setSelectedVideos([...selectedVideos, videoId]);
    }
  };

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

  const bringToTop = (userId: string) => {
    const video = selectedVideoStack.find((c) => c.id === userId);
    if (video) {
      setSelectedVideoStack((prev) => [
        video,
        ...prev.filter((c) => c.id !== userId),
      ]);
      setFocusedVideoId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");

    allRows.forEach((row) => {
      const id = row.getAttribute("data-id");
      const isInStack = selectedVideoStack.some((video) => video.id === id);
      const isTop = focusedVideoId === id;

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
  }, [selectedVideoStack, focusedVideoId]);

  const handleRowClick = (video: (typeof VideoTableData)[0]) => {
    // Double-click detected
    const exists = selectedVideoStack.find((c) => c.id === video.id);
    if (!exists) {
      setSelectedVideoStack((prev) => {
        const updated = [video, ...prev];
        return updated.slice(0, 5); // limit to 5
      });
      setFocusedVideoId(video.id);
    } else {
      bringToTop(video.id);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedVideos.length === currentRecords.length && currentRecords.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
              Select All
            </label>
            {selectedVideos.length > 0 && (
              <Badge variant="border" className="ml-2">
                {selectedVideos.length} selected
              </Badge>
            )}

            {selectedVideos.length > 0 && (
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
                  Mark Inactive / Remove
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
                  Category{" "}
                  {sortConfig?.key === "category" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("for")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Segment{" "}
                  {sortConfig?.key === "for" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("playCount")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Play Count{" "}
                  {sortConfig?.key === "playCount" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("videoUrl")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Video URL{" "}
                  {sortConfig?.key === "videoUrl" &&
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
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((video) => (
                <TableRow
                  key={video.id}
                  data-id={video.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedVideoStack.some((c) => c.id === video.id)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectVideo(video.id);
                    handleRowClick(video);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedVideoStack.some((c) => c.id === video.id)
                        ? focusedVideoId === video.id
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedVideos.includes(video.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectVideo(video.id)}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">{video.title}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{video.category}</div>
                  </TableCell>
                  <TableCell>{video.for}</TableCell>
                  <TableCell>
                    <div className="text-low">{video.playCount}</div>
                  </TableCell>
                <TableCell>
  <Button
    variant="border"
    size="sm"
    className="h-8"
    onClick={(e) => {
      e.stopPropagation(); // Prevent row click event
      window.open(video.videoUrl, '_blank');
    }}
  >
    <ExternalLink className="h-4 w-4 mr-2" />
    View Video
  </Button>
</TableCell>
                  <TableCell>
                    <Badge variant={video.status === "Published" ? "brand" : "border"}>
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
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
                            <Button variant="actionIcon" size="actionIcon">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="actionIcon" size="actionIcon">
                              <Trash className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
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
            {/* Rows-per-page dropdown */}
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
              {sortedData.length} videos
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
