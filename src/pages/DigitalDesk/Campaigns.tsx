import { Button } from "@/components/ui/button";
import {
  Eye,
  Filter,
  BadgeDollarSign,
  Bell,
  Notebook,
  Plus,
  Search,
  Pen,
  FileDown,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
import { CampaignTable } from "@/data/Data";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/DatePicker";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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

const stats = [
  {
    title: "Total Delivered",
    value: "342",
    icon: Notebook,
  },
  {
    title: "Open Rate (Email/Web)",
    value: "38%",
    icon: Notebook,
  },
  {
    title: "Click Rate (WhatsApp/Web)",
    value: "17%",
    icon: Notebook,
  },

  {
    title: "Failed Sends",
    value: "19 (with reason)",
    icon: BadgeDollarSign,
  },
];

// --- CreateCampaignModal component ---

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

export function CreateCampaignModal({
  open,
  onOpenChange,
}: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    audience: "",
    purpose: "",
    channels: [] as string[],
    messages: {
      web: { title: "", body: "", cta: "" },
      app: { title: "", body: "", cta: "" },
      whatsapp: { body: "", cta: "" },
      email: { subject: "", body: "", cta: "" },
    },
    scheduleDate: undefined as Date | undefined,
    scheduleTime: "",
  });

  const channels = [
    { id: "web", label: "Web Push", icon: "🌐" },
    { id: "app", label: "Mobile App", icon: "📱" },
    { id: "whatsapp", label: "WhatsApp", icon: "💬" },
    { id: "email", label: "Email", icon: "📧" },
  ];

  const handleChannelToggle = (channelId: string) => {
    setCampaignData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFinish = () => {
    // Handle campaign creation
    console.log("Creating campaign:", campaignData);
    onOpenChange(false);
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignData.name}
                onChange={(e) =>
                  setCampaignData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter campaign name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select
                value={campaignData.audience}
                onValueChange={(value) =>
                  setCampaignData((prev) => ({ ...prev, audience: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explorer">Explorer</SelectItem>
                  <SelectItem value="coach">Coach</SelectItem>
                  <SelectItem value="org">Organisation</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose/Tag</Label>
              <Select
                value={campaignData.purpose}
                onValueChange={(value) =>
                  setCampaignData((prev) => ({ ...prev, purpose: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promo">Promo</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center space-x-2 p-4 border rounded-lg"
                >
                  <Checkbox
                    id={channel.id}
                    checked={campaignData.channels.includes(channel.id)}
                    onCheckedChange={() => handleChannelToggle(channel.id)}
                  />
                  <label
                    htmlFor={channel.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl">{channel.icon}</span>
                    <span className="font-medium">{channel.label}</span>
                  </label>
                </div>
              ))}
            </div>
            {campaignData.channels.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Selected channels:
                </p>
                <div className="flex flex-wrap gap-2">
                  {campaignData.channels.map((channelId) => {
                    const channel = channels.find((c) => c.id === channelId);
                    return (
                      <Badge key={channelId} variant="secondary">
                        {channel?.icon} {channel?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {campaignData.channels.map((channelId) => {
              const channel = channels.find((c) => c.id === channelId);
              return (
                <div key={channelId} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <span>{channel?.icon}</span>
                    {channel?.label} Message
                  </h4>
                  <div className="space-y-3">
                    {channelId === "email" && (
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input placeholder="Email subject" />
                      </div>
                    )}
                    {(channelId === "web" || channelId === "app") && (
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input placeholder="Notification title" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Message Body</Label>
                      <Textarea
                        placeholder="Enter your message here..."
                        className="h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Call to Action (Optional)</Label>
                      <Input placeholder="Button text or link" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Schedule Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !campaignData.scheduleDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {campaignData.scheduleDate ? (
                      format(campaignData.scheduleDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={campaignData.scheduleDate}
                    onSelect={(date) =>
                      setCampaignData((prev) => ({
                        ...prev,
                        scheduleDate: date,
                      }))
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduleTime">Schedule Time</Label>
              <Input
                id="scheduleTime"
                type="time"
                value={campaignData.scheduleTime}
                onChange={(e) =>
                  setCampaignData((prev) => ({
                    ...prev,
                    scheduleTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Or</h4>
              <Button variant="outline" className="w-full">
                Send Now
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-card border rounded-lg">
              <h4 className="font-medium mb-3">Campaign Summary</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong>{" "}
                  {campaignData.name || "Untitled Campaign"}
                </p>
                <p>
                  <strong>Audience:</strong>{" "}
                  {campaignData.audience || "Not selected"}
                </p>
                <p>
                  <strong>Purpose:</strong>{" "}
                  {campaignData.purpose || "Not selected"}
                </p>
                <p>
                  <strong>Channels:</strong> {campaignData.channels.length}{" "}
                  selected
                </p>
                {campaignData.scheduleDate && (
                  <p>
                    <strong>Scheduled:</strong>{" "}
                    {format(campaignData.scheduleDate, "PPP")} at{" "}
                    {campaignData.scheduleTime}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={handleFinish}
              className="w-full bg-success hover:bg-success/90 text-success-foreground"
            >
              Schedule Campaign
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Campaign Info",
    "Choose Channels",
    "Message Editor",
    "Schedule or Send",
    "Confirm & Publish",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🧾 Create New Campaign - Step {currentStep}:{" "}
            {stepTitles[currentStep - 1]}
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  i + 1 <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {i + 1}
              </div>
              {i < 4 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-2",
                    i + 1 < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">{renderStep()}</div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentStep < 5 && (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Campaigns() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Bar />
        <StatsCards />
        <Topbar setCreateOpen={setCreateOpen} />
        <CreateCampaignModal open={createOpen} onOpenChange={setCreateOpen} />
        <TableSection />
      </div>
    </div>
  );
}

function Bar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-head)]">
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Campaign Manager</BreadcrumbPage>
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

function Topbar({ setCreateOpen }: { setCreateOpen: (open: boolean) => void }) {

  const [showStats, setShowStats] = useState(false);

  // Calculate campaign statistics based on table data
  const campaignStats = {
    total: CampaignTable.length,
    sent: CampaignTable.filter(campaign => campaign.status === "Sent").length,
    scheduled: CampaignTable.filter(campaign => campaign.status === "Scheduled").length,
    failed: CampaignTable.filter(campaign => campaign.status === "Failed").length,
    draft: CampaignTable.filter(campaign => campaign.status === "Draft").length,
  };

  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="brand" size="new" onClick={() => setCreateOpen(true)}>
          <Plus className="h-3 w-3" />
          <span> Create New Campaign</span>
        </Button>
        </div>
        {/* Campaign Statistics Dropdown Toggle */}
        <div className="flex justify-end relative">
          <Button
            variant="standard"
            size="new"
            className="flex items-center gap-2"
            onClick={() => setShowStats((prev) => !prev)}
          >
            <span>Campaign Status</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          {showStats && (
            <div className="absolute left-0 top-7 mt-2 z-50 min-w-[220px] bg-white dark:bg-[var(--background)] border rounded-lg shadow-lg p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text)]">Total:</span>
                <Badge variant="secondary" className="font-medium">{campaignStats.total}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text)]">Sent:</span>
                <Badge variant="standard" style={{backgroundColor:'#bbf7d0', color:'#166534'}} className="font-medium">{campaignStats.sent}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text)]">Scheduled:</span>
                <Badge variant="standard" style={{backgroundColor:'#dbeafe', color:'#1e40af'}} className="font-medium">{campaignStats.scheduled}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text)]">Failed:</span>
                <Badge variant="standard" style={{backgroundColor:'#fecaca', color:'#991b1b'}} className="font-medium">{campaignStats.failed}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text)]">Draft:</span>
                <Badge variant="standard" style={{backgroundColor:'#f3f4f6', color:'#374151'}} className="font-medium">{campaignStats.draft}</Badge>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

interface FilterProps {
  onClose: () => void;
}

function AdvancedFilters({ onClose }: FilterProps) {
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

  const [status, setStatus] = useState("Scheduled");
  const [channel, setChannel] = useState("Web");
  const [audience, setAudience] = useState("Explorer");

  const tabList = ["General", "Channel", "Audience", "Status", "Date Range"];

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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">
                  Enter Name/Email/Phone :
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter .."
                  type="text"
                  className="mt-4 w-full "
                />
              </>
            )}

            {activeTab === "Channel" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Channel:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Web", "App", "WhatsApp", "Email"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={channel}
                      onChange={setChannel}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Audience" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Audience:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Explorer", "Coach", "Org", "Partner", "Custom"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={audience}
                      onChange={setAudience}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Scheduled", "Sent", "Draft", "Failed"].map((option) => (
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

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter You Last Activity Date:
                </label>
                <div className="mt-4 min-w-full">
                  <DatePicker />
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
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
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

function TableSection() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof CampaignTable>(
    CampaignTable[0] ? [CampaignTable[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    CampaignTable[0]?.id || null
  );

  // Search and sorting logic
  const filteredData = CampaignTable.filter((campaign) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      campaign.campaignName.toLowerCase().includes(query) ||
      campaign.audience.toLowerCase().includes(query) ||
      campaign.status.toLowerCase().includes(query) ||
      (Array.isArray(campaign.channels) 
        ? campaign.channels.some(channel => channel.toLowerCase().includes(query))
        : String(campaign.channels).toLowerCase().includes(query)
      )
    );
  });

  const sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof typeof a];
      let bValue: any = b[sortConfig.key as keyof typeof b];
      
      // Handle special cases for different field types
      if (sortConfig.key === "channels") {
        // Sort by first channel in the array
        aValue = Array.isArray(aValue) ? aValue[0] || "" : "";
        bValue = Array.isArray(bValue) ? bValue[0] || "" : "";
      } else if (sortConfig.key === "scheduledFor") {
        // Convert date strings to Date objects for proper comparison
        aValue = new Date(aValue || "");
        bValue = new Date(bValue || "");
      }
      
      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = "";
      if (bValue === null || bValue === undefined) bValue = "";
      
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
    if (selectedUsers.length === currentRecords.length && currentRecords.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRecords.map((user) => user.id));
    }
  };

  // Helper function to check if all current records are selected
  const areAllCurrentRecordsSelected = currentRecords.length > 0 && 
    selectedUsers.length === currentRecords.length &&
    currentRecords.every(record => selectedUsers.includes(record.id));

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

  const handleRowClick = (user: (typeof CampaignTable)[0]) => {
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

  // Campaign-specific action functions
  const handleSendReminder = () => {
    const selectedCampaigns = CampaignTable.filter(campaign => selectedUsers.includes(campaign.id));
    console.log("Sending reminders for campaigns:", selectedCampaigns.map(c => c.campaignName));
    // Add your reminder logic here
  };

  const handleExportCampaigns = () => {
    const selectedCampaigns = CampaignTable.filter(campaign => selectedUsers.includes(campaign.id));
    console.log("Exporting campaigns:", selectedCampaigns);
    // Add your export logic here
  };

  const handleMarkInactive = () => {
    const selectedCampaigns = CampaignTable.filter(campaign => selectedUsers.includes(campaign.id));
    console.log("Marking campaigns as inactive:", selectedCampaigns.map(c => c.campaignName));
    // Add your inactive logic here
  };

  const handleRetryFailed = () => {
    const failedCampaigns = CampaignTable.filter(campaign => 
      selectedUsers.includes(campaign.id) && campaign.status === "Failed"
    );
    console.log("Retrying failed campaigns:", failedCampaigns.map(c => c.campaignName));
    // Add your retry logic here
  };

  const handleCancelScheduled = () => {
    const scheduledCampaigns = CampaignTable.filter(campaign => 
      selectedUsers.includes(campaign.id) && campaign.status === "Scheduled"
    );
    console.log("Canceling scheduled campaigns:", scheduledCampaigns.map(c => c.campaignName));
    // Add your cancel logic here
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-campaigns"
                checked={areAllCurrentRecordsSelected}
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
                <Button variant="border" size="sm" onClick={handleSendReminder}>
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="border" size="sm" onClick={handleExportCampaigns}>
                  <FileDown className=" h-4 w-4" />
                  Export Campaigns
                </Button>
                {CampaignTable.filter(campaign => 
                  selectedUsers.includes(campaign.id) && campaign.status === "Failed"
                ).length > 0 && (
                  <Button variant="border" size="sm" onClick={handleRetryFailed}>
                    <Bell className="h-4 w-4" />
                    Retry Failed
                  </Button>
                )}
                {CampaignTable.filter(campaign => 
                  selectedUsers.includes(campaign.id) && campaign.status === "Scheduled"
                ).length > 0 && (
                  <Button variant="border" size="sm" onClick={handleCancelScheduled}>
                    <X className="h-4 w-4" />
                    Cancel Scheduled
                  </Button>
                )}
                <Button variant="delete" size="sm" onClick={handleMarkInactive}>
                  <X className=" h-4 w-4 text-[var(--red)]" />
                  Mark Inactive
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex justify-end items-center gap-4 ">
            <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  onClick={() => requestSort("campaignName")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Campaign Name{" "}
                  {sortConfig?.key === "campaignName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("channels")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Channels{" "}
                  {sortConfig?.key === "channels" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("scheduledFor")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Scheduled For{" "}
                  {sortConfig?.key === "scheduledFor" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("audience")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Audience{" "}
                  {sortConfig?.key === "audience" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
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
                          <div className="font-medium">{user.campaignName}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      {Array.isArray(user.channels) ? user.channels.join(", ") : user.channels}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      {user.scheduledFor ? new Date(user.scheduledFor).toLocaleDateString() : "Not scheduled"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.audience}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.status}</Badge>
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
                              <Pen className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
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
              {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
              {sortedData.length} campaigns
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
