// export function Testimonials() {
//   return <div>Testimonials</div>;
// }
import {  Search,  Users, FileCheck2, FileText, FileDown, Plus, Bell, X, Pencil, Archive } from "lucide-react";
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { testimonialsData } from "@/data/Data";
import placeholder from '@/assets/asset.jpg';
import avatar from '@/assets/avatar.png';

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import DatePick from "@/components/ui/DatePicker"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePickerWithRange } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    title: "Total Testimonials",
    value: "174",
    icon: Users,

  },
  {
    title: "Video Testimonials",
    value: "46",
    icon: FileCheck2,

  },
  {
    title: "Text Testimonials",
    value: "1",
    icon: FileText,

  },

];



export  function Testimonials() {


  return (
      <div className="flex flex-col gap-2">
      <Bar />
      <StatCard />
  
     

      <TestimonialsTable />
    </div>
  )
}

interface FormProps {
  onClose: () => void;
}


function Form({ onClose }: FormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

const [name, setName] = useState("");
const [role, setRole] = useState("");

const [notes, setNotes] = useState("");

const [type, setType] = useState<"Video" | "Text" | "">("");
const [selectedFor, setSelectedFor] = useState<string[]>([]);
const handleForToggle = (forItem: string) => {
  setSelectedFor((prev) =>
    prev.includes(forItem)
      ? prev.filter((f) => f !== forItem)
      : [...prev, forItem]
  );
};

const forList = ["UG", "PG", "Professionals", "11-12", "9-10", "6-8", "NGOs", "Schools", "Colleges", "Organizations"];

// Avatar upload
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

// Text content (shown when Type = Text)
const [textContent, setTextContent] = useState("");

// Video input (shown when Type = Video)
const [videoFile, setVideoFile] = useState<File | null>(null);
const [videoPreview, setVideoPreview] = useState<string | null>(null);
const [videoDuration, setVideoDuration] = useState<number | null>(null);
const [isDraggingVideo, setIsDraggingVideo] = useState(false);
const videoInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  return () => { if (videoPreview) URL.revokeObjectURL(videoPreview); };
}, [videoPreview]);

function onVideoPick(files: FileList | null) {
  if (!files || !files[0]) return;
  const file = files[0];
  if (!file.type.startsWith("video/")) {
    alert("Please upload a video file.");
    return;
  }
  if (videoPreview) URL.revokeObjectURL(videoPreview);
  setVideoFile(file);
  setVideoPreview(URL.createObjectURL(file));
  setVideoDuration(null);
}

function removeVideo() {
  if (videoPreview) URL.revokeObjectURL(videoPreview);
  setVideoFile(null);
  setVideoPreview(null);
  setVideoDuration(null);
}

function onVideoDrop(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault(); e.stopPropagation();
  setIsDraggingVideo(false);
  onVideoPick(e.dataTransfer.files);
}
function onVideoDragOver(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault(); e.stopPropagation();
  setIsDraggingVideo(true);
}
function onVideoDragLeave(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault(); e.stopPropagation();
  setIsDraggingVideo(false);
}

return (
  <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40  flex justify-end">
    <div
      ref={modalRef}
      className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
    >
      <div className="flex items-center justify-between border-b p-6">
        <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Add Testimonial</CardTitle>
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
          <Label>Role</Label>
          <Input placeholder="Enter Role" value={role} onChange={(e) => setRole(e.target.value)} />
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
          <Label>Type</Label>
          <div className="flex gap-4 mt-2">
            {["Video", "Text"].map((option) => (
              <RadioButton
                key={option}
                label={option}
                value={option}
                selected={type}
                onChange={(val: string) => setType(val as "Video" | "Text")}
              />
            ))}
          </div>
        </div>

        {/* === Conditional content by Type === */}
        {type === "Text" && (
          <div className="flex flex-col gap-2">
            <Label>Testimonial Text</Label>
            <Textarea
              placeholder="Write the testimonial here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={6}
            />
          </div>
        )}

        {type === "Video" && (
          <div className="flex flex-col gap-2">
            <Label>Testimonial Video</Label>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"          // set to "video/mp4" if you want only MP4
              className="hidden"
              onChange={(e) => onVideoPick(e.target.files)}
            />
             <Textarea
              placeholder="Write the testimonial here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={6}
            />

            <div
              onClick={() => videoInputRef.current?.click()}
              onDrop={onVideoDrop}
              onDragOver={onVideoDragOver}
              onDragLeave={onVideoDragLeave}
              className={cn(
                "border rounded-sm p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition",
                "bg-[var(--faded)] hover:bg-[var(--brand-color2)]",
                isDraggingVideo ? "border-dashed border-[var(--brand-color)]" : "border-1 border-[var(--border)]"
              )}
            >
              {!videoPreview ? (
                <>
                  <div className="text-sm text-[var(--text-head)]">
                    Drag & drop a video here, or click to browse
                  </div>
                  <div className="text-xs text-low">MP4, MOV, WEBM up to ~200MB</div>
                </>
              ) : (
                <div className="w-full flex flex-col gap-3">
                  <div className="w-full aspect-video overflow-hidden rounded-sm border">
                    <video
                      src={videoPreview}
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                      onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-low truncate">
                      {videoFile?.name}
                      {videoFile ? ` • ${(videoFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
                      {videoDuration != null ? ` • ${new Date(videoDuration * 1000).toISOString().substring(11, 19)}` : ""}
                    </div>
                    <Button
                      variant="delete"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); removeVideo(); }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* (Optional) Keep your existing preview field */}
       

        <div className="flex flex-col gap-2">
          <Label>Notes</Label>
          <Textarea
            placeholder="Any optional notes.."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
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
                <BreadcrumbPage>Testimonials</BreadcrumbPage>
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

      {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />}
        
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


function AssessFilter({ onClose }: FilterProps) {
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


function TestimonialsTable() {
  const dataWithIds = testimonialsData.map((item, index) => ({ ...item, id: typeof item.id === 'number' ? item.id : index }));
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // Filtering by search
  const filteredData = dataWithIds.filter(item => {
    const searchLower = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.role.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.audience.toLowerCase().includes(searchLower) ||
      item.type.toLowerCase().includes(searchLower) ||
      item.contentPreview?.toLowerCase().includes(searchLower) ||
      item.date.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

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
                <TableHead className="text-[var(--text)]">Picture</TableHead>
                <TableHead className="text-[var(--text)]">Name</TableHead>
                <TableHead className="text-[var(--text)]">Role</TableHead>
                <TableHead className="text-[var(--text)]">Category</TableHead>
                <TableHead className="text-[var(--text)]">Segment</TableHead>
                <TableHead className="text-[var(--text)]">Type</TableHead>
                <TableHead className="text-[var(--text)]">Content Preview</TableHead>
                <TableHead className="text-[var(--text)]">Date</TableHead>
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((item) => (
                <TableRow
                  key={item.id}
                  data-id={item.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedRows.includes(Number(item.id))
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => toggleSelectRow(Number(item.id))}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedRows.includes(Number(item.id))
                        ? "border-[var(--brand-color)]"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedRows.includes(Number(item.id))}
                      onClick={e => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectRow(Number(item.id))}
                    />
                  </TableCell>
                  <TableCell>
                    {/* Render image if picture is a valid image src, else fallback */}
                    <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center bg-[var(--faded)]">
                      {typeof item.picture === "string" && item.picture === "avatar.png" ? (
                        <img
                          src={avatar}
                          alt={item.name}
                          className="h-14 w-14 object-cover"
                        />
                      ) : typeof item.picture === "string" && item.picture.endsWith(".jpg") ? (
                        <img
                          src={"/assets/" + item.picture}
                          alt={item.name}
                          className="h-14 w-14 object-cover"
                        />
                      ) : (
                        <img
                          src={placeholder}
                          alt="Avatar"
                          className="h-14 w-14 object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.audience}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.contentPreview}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Published" ? "standard" : "border"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        {item.actions && item.actions.map((action, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <Button variant="actionIcon" size="actionIcon">
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
              {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} testimonials
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
