import {
  Clock,
  Users,
  FileCheck2,
  FileText,
  CheckCircle2,
  FileDown,
  Plus,
  BadgeQuestionMark,
  ImagePlus,
  ChevronDown,
  X,
  // ImagePlus,
} from "lucide-react";
import { Brain } from "lucide-react";
import { ListCheck } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/store";
import {
  fetchCoachTypes,
  selectCoachTypes,
  selectCoachTypesLoading,
  selectCoachTypesError,
} from "@/store/slices/platformDesk/Session/CoachTypeSlice";
import {
  fetchExpertise,
  createExpertise,
  updateExpertise,
  selectExpertise,
  selectExpertiseLoading,
  selectExpertiseError,
} from "@/store/slices/platformDesk/Session/ExpertiseThunks";

import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { DateRangePicker } from "@/components/ui/RangeCalender";
import { InPoolTable } from "@/pages/PlatformDesk/SessionTables/InPool";
import { UpcomingTable } from "../SessionTables/Upcoming";
import { LiveTable } from "../SessionTables/Live";
import { RefundsTable } from "../SessionTables/Refunds";
import { CancelledTable } from "../SessionTables/Cancelled";
import { CompletedTable } from "../SessionTables/Completed";
import { DatePickerWithRange } from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmModal } from "@/components/PopupConfirm";

import {SegmentsDrawerTrigger} from '@/pages/PlatformDesk/Sessions/AddSpecialties';
import { Switch } from "@/components/ui/switch";
import { Pencil, XCircle } from "lucide-react";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { AllSessionsTable } from "../SessionTables/AllSessions";
import DatePicker from "@/components/ui/DatePicker";

const Stats = [
  {
    title: "Total",
    value: "5,248",
    icon: Users,
  },
  {
    title: "In Pool",
    value: "3,780",
    icon: FileCheck2,
  },
  {
    title: "Live",
    value: "341",
    icon: FileText,
  },
  {
    title: "Upcoming",
    value: "446",
    icon: Clock,
  },
  {
    title: "No-Show",
    value: "12",
    icon: CheckCircle2,
  },
  {
    title: "Refunded",
    value: "298",
    icon: Clock,
  },
];

export function Sessions() {
  return (
    <div className="flex flex-col gap-2">
      <Topbar />
      <SessionStats />
      <Buttonbar />

      <SessionTabs />
    </div>
  );
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
                <BreadcrumbPage>Sessions</BreadcrumbPage>
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

        {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />}

        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

function Buttonbar() {
  const [showForm, setShowForm] = useState(false);
  const [showExpertise, setShowExpertise] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div className="flex gap-4">
        <Button variant="brand" size="new" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
        </Button>
        {showForm && <Form onClose={() => setShowForm(false)} />}
        
      </div>
      <div className="flex gap-4 flex-wrap">
      <Button
          variant="standard"
          size="new"
          onClick={() => navigate("aimshala-sessions-pool")}
        >
          <BadgeQuestionMark className="h-3 w-3" />
          <span className="">Aimshala Expertise</span>
        </Button>
        <Button
          variant="standard"
          size="new"
          onClick={() => navigate("coach-expertise")}
        >
          <Brain className="h-3 w-3" />
          <span className="">coach Expertise</span>
        </Button>
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowExpertise(true)}
        >
          <ListCheck className="h-3 w-3" />
          <span className="">Expertise</span>
        </Button>
        {showExpertise && (
          <ExpertiseModal onClose={() => setShowExpertise(false)} />
        )}
        <SegmentsDrawerTrigger/>
        

        </div>
    </div>
  );
}

interface FormProps {
  onClose: () => void;
}

function Form({ onClose }: FormProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [explorerName, setExplorerName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [discount, setDiscount] = useState("10");
  const [sessionTypes, setSessionTypes] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [objective, setObjective] = useState("Career Consulting");
  const [notes, setNotes] = useState("");
  const [fees, setFees] = useState("");

  // --- Validation state (added)
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasErrors = (e: Record<string, string>) => Object.keys(e).length > 0;

  // --- Confirm popup (added)
  const [confirmOpen, setConfirmOpen] = useState(false);

  const sessionTypesList = [
    "Instant-phone",
    "Instant-video",
    "Introductory-phone",
    "Introductory-video",
    "Phone",
    "B2B-Phone",
    "B2B-Video",
    "Ask Question",
    "In-Person",
  ];

  // Build errors (added)
  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!explorerName.trim()) e.explorerName = "Please enter Explorer Name/Id";
    if (!selectedDate) e.selectedDate = "Please select a date";
    if (!sessionTypes) e.sessionTypes = "Please select a session type";
    if (!amount || Number(amount) <= 0) e.amount = "Please enter a valid amount";
    if (!fees || Number(fees) <= 0) e.fees = "Please enter valid fees";
    return e;
  };

  // Submit → validate → open confirm (added)
  const handleSubmit = () => {
    const e = computeErrors();
    setErrors(e);
    setShowErrors(true);
    if (!hasErrors(e)) setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    const payload = {
      explorerName,
      selectedDate,
      sessionTypes,
      objective,
      amount: Number(amount || 0),
      fees: Number(fees || 0),
      discount: Number(discount || 0),
      notes,
    };
    console.log("Create Session (confirm):", payload);
    onClose();
  };

  const handleCancelConfirm = () => setConfirmOpen(false);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[50] bg-black/40 backdrop-blur-sm flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Add Session
          </CardTitle>
        </div>

        <div className="flex-1 p-6 space-y-6 text-[var(--text)] overflow-y-auto relative">
          {/* Explorer Name */}
          <div className="flex flex-col gap-2">
            <Label>Explorer Name/Id <span className="text-red-500">*</span></Label>
            <Input
              placeholder="Enter Explorer Name/Id"
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
            />
            {showErrors && errors.explorerName && (
              <p className="text-xs text-red-600">{errors.explorerName}</p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <Label>Enter Date <span className="text-red-500">*</span></Label>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
            {showErrors && errors.selectedDate && (
              <p className="text-xs text-red-600">{errors.selectedDate}</p>
            )}
          </div>

          {/* Session Type */}
          <div className="flex flex-col gap-2">
  <Label>
    Session Type <span className="text-red-500">*</span>
  </Label>

  <Select value={sessionTypes} onValueChange={setSessionTypes}>
    <SelectTrigger>
      <SelectValue placeholder="Select Session Type" />
    </SelectTrigger>
    <SelectContent side="bottom" className="z-[9999]">
      {/* Optional: disabled “placeholder” row inside the menu */}
      <SelectItem value="__placeholder" disabled>
        Select Session Type
      </SelectItem>

      {sessionTypesList.map((pt) => (
        <SelectItem key={pt} value={pt}>
          {pt}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {showErrors && errors.sessionTypes && (
    <p className="text-xs text-red-600">{errors.sessionTypes}</p>
  )}
</div>


          {/* Objective */}
          <div className="flex flex-col gap-2">
            <Label>Objective</Label>
            <div className="flex gap-4 mt-2">
              {["Career Consulting", "Career Transition"].map((option) => (
                <RadioButton
                  key={option}
                  label={option}
                  value={option}
                  selected={objective}
                  onChange={setObjective}
                />
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <Label>Amount <span className="text-red-500">*</span></Label>
            <Input
              type="number"
              min={1}
              placeholder="200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {showErrors && errors.amount && (
              <p className="text-xs text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-2">
            <Label>Fees <span className="text-red-500">*</span></Label>
            <Input
              type="number"
              min={1}
              placeholder="100"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
            {showErrors && errors.fees && (
              <p className="text-xs text-red-600">{errors.fees}</p>
            )}
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-2">
            <Label>Discount</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-full">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={discount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 && value <= 100) {
                      setDiscount(e.target.value);
                    } else if (value > 100) {
                      setDiscount("100");
                    }
                  }}
                  className="pr-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Label>Notes (optional)</Label>
            <Textarea
              placeholder="Summer campaign for school students."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex items-center gap-4">
            {showErrors && hasErrors(errors) && (
              <span className="text-sm text-red-600">
                Please fix the highlighted fields before confirming.
              </span>
            )}
            <Button variant="brand" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation popup (same component as before) */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        heading="Confirm new session?"
        description="This will create a session with the details you’ve entered."
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
}


type ExpertiseMap = {
  Consultants: string[];
  Mentors: string[];
  Educators: string[];
};

type ExpertiseModalProps = { onClose: () => void };




type RowItem = { id: string; group: keyof ExpertiseMap; name: string; active: boolean };











interface FilterProps {
  onClose: () => void;
}

function AssessFilter({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("General");

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

  const [coach, setCoach] = useState("Consultant");
  const [session, setSession] = useState("1:1");
  const [booking, setBooking] = useState("Booked");
  const [refund, setRefund] = useState("Not Requested");
  const [mode, setMode] = useState("Manual");

  const tabList = [
    "General",
    "Coach Type",
    "Session Type",
    "Booking Status",
    "Refund Status",
    "Date Range",
    "Acceptance Mode",
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
            {activeTab === "General" && (
              <>
                <label htmlFor="Gen" className="text-[var(--text)]">
                  Search by Name :
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter .."
                  type="text"
                  className="mt-4 w-full "
                />
              </>
            )}

            {activeTab === "Coach Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Coach Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Consultant", "Mentor", "Educator", "Counselor"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={coach}
                        onChange={setCoach}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Session Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Session Type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["1:1", "In-Person", "Ask Question", "Instant", "B2B"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={session}
                        onChange={setSession}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Booking Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Booking Status :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Booked", "Completed", "Missed", "Cancelled"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={booking}
                        onChange={setBooking}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Refund Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Refund Status :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Not Requested", "Requested", "Approved", "Denied"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={refund}
                        onChange={setRefund}
                      />
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Acceptance Mode" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Acceptance Mode :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Manual", "Auto"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={mode}
                      onChange={setMode}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="act" className="text-[var(--text)]">
                  Enter the Last Assessment Date :
                </label>
                <div className="mt-4 min-w-full">
                  <DateRangePicker />
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

function SessionStats() {
  const color = "text-[var(--text)]";
  const color2 = "text-[var(--text-head)]";
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
      {Stats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-sm shadow-none flex justify-center  bg-[var(--background)]"
        >
          <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
            <div className="flex justify-between items-center">
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

const tabs = [
  { label: "All", value: "all" },
  { label: "In Pool", value: "inPool" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Live", value: "live" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refunded", value: "refunded" },
];

function SessionTabs() {
  const [activeTab, setActiveTab] = useState("all");

  const renderTable = () => {
    switch (activeTab) {
      case "all":
        return <AllSessionsTable />;
      case "inPool":
        return <InPoolTable />;
      case "upcoming":
        return <UpcomingTable />;
      case "live":
        return <LiveTable />;
      case "completed":
        return <CompletedTable />;
      case "cancelled":
        return <CancelledTable />;
      case "refunded":
        return <RefundsTable />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "brand" : "border"}
            onClick={() => setActiveTab(tab.value)}
            className="border-b-2 rounded-t-sm rounded-b-none"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Active Table */}
      <div>{renderTable()}</div>
    </div>
  );
}


























function ExpertiseModal({ onClose }: ExpertiseModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Redux store
  const coachTypes = useSelector(selectCoachTypes);
  const expertise = useSelector(selectExpertise);
  const coachTypesLoading = useSelector(selectCoachTypesLoading);
  const expertiseLoading = useSelector(selectExpertiseLoading);
  const coachTypesError = useSelector(selectCoachTypesError);
  const expertiseError = useSelector(selectExpertiseError);

  useEffect(() => {
    dispatch(fetchCoachTypes());
    dispatch(fetchExpertise());
  }, [dispatch]);

  // ---------- helpers ----------
  const normalizeGroup = (name: string): keyof ExpertiseMap | null => {
    const n = String(name).trim().toLowerCase();
    if (n === "consultants" || n === "consultant") return "Consultants";
    if (n === "mentors" || n === "mentor") return "Mentors";
    if (n === "educators" || n === "educator") return "Educators";
    return null;
  };

  // ---------- local state ----------
  const [Expertise, setExpertise] = useState<ExpertiseMap>({
    Consultants: [],
    Mentors: [],
    Educators: [],
  });
  const [expertiseActiveMap, setExpertiseActiveMap] = useState<Record<string, boolean>>({});
  const [extraDataMap, setExtraDataMap] = useState<Record<string, { icon?: string; title?: string }>>({});

  const [mode, setMode] = useState<"list" | "add" | "edit">("list");
  type FilterKey = "All" | keyof ExpertiseMap;
  const GROUPS: (keyof ExpertiseMap)[] = ["Consultants", "Mentors", "Educators"];
  const [filter, setFilter] = useState<FilterKey>("All");

  // form state
  const [formGroup, setFormGroup] = useState<keyof ExpertiseMap>("Consultants");
  const [formName, setFormName] = useState("");
  const [formActive, setFormActive] = useState<boolean>(true);
  const [editingOriginalName, setEditingOriginalName] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formIconUrl, setFormIconUrl] = useState<string | undefined>(undefined);
  const [formIconFile, setFormIconFile] = useState<File | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // const openPicker = () => fileInputRef.current?.click();

// const clearIcon = (e?: React.MouseEvent) => {
//   e?.stopPropagation?.();
//   setFormIconFile(null);
//   setFormIconUrl(undefined);
//   setDirty((d) => ({ ...d, icon: true }));
// };

// const onDropIcon = (e: React.DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
//   const file = e.dataTransfer.files?.[0] ?? null;
//   onPickIcon(file); // uses your existing validator/uploader
// };


  // validation state
  const [showErrors, setShowErrors] = useState(false);
  const [, setDirty] = useState<{ name?: boolean; title?: boolean; icon?: boolean; group?: boolean }>({});

  // Build a coach-by-id map
  const coachById = useMemo(() => {
    const map: Record<number, any> = {};
    (coachTypes || []).forEach((c: any) => {
      map[c.id] = c;
    });
    return map;
  }, [coachTypes]);

  // Rebuild derived local maps from API
  useEffect(() => {
    if (!Array.isArray(expertise) || !coachTypes?.length) return;

    const grouped: ExpertiseMap = { Consultants: [], Mentors: [], Educators: [] };
    const activeMap: Record<string, boolean> = {};
    const extras: Record<string, { icon?: string; title?: string }> = {};

    for (const exp of expertise as any[]) {
      const coach = coachById[exp.coach_id];
      if (!coach) continue;
      const group = normalizeGroup(coach.name);
      if (!group) continue;

      if (!grouped[group].includes(exp.name)) grouped[group].push(exp.name);

      const normalizedActive =
        typeof exp?.status === "string"
          ? exp.status.toLowerCase() === "active"
          : typeof exp?.active === "boolean"
          ? exp.active
          : true;

      activeMap[exp.name] = normalizedActive;

      extras[exp.name] = {
        icon: (exp as any)?.icon ?? undefined,
        title: (exp as any)?.sub_title ?? undefined,
      };
    }

    setExpertise(grouped);
    setExpertiseActiveMap(activeMap);
    setExtraDataMap(extras);
    console.log("ExtraDataMap populated:", extras);
  }, [expertise, coachById]);

  // rows & filtering
  const rows: RowItem[] = useMemo(() => {
    const list: RowItem[] = [];
    (Object.keys(Expertise) as (keyof ExpertiseMap)[]).forEach((g) => {
      Expertise[g].forEach((name, idx) =>
        list.push({ id: `${g}-${name}-${idx}`, group: g, name, active: !!(expertiseActiveMap[name] ?? true) })
      );
    });
    return list;
  }, [Expertise, expertiseActiveMap]);

  const filteredRows = useMemo(
    () => (filter === "All" ? rows : rows.filter((r) => r.group === filter)),
    [rows, filter]
  );

  // helpers
  const resetForm = () => {
    setFormGroup("Consultants");
    setFormName("");
    setFormActive(true);
    setEditingOriginalName(null);
    setFormTitle("");
    setFormIconUrl(undefined);
    setFormIconFile(null);
    setShowErrors(false);
    setDirty({});
  };

  const handleAddClick = () => {
    resetForm();
    if (filter !== "All") setFormGroup(filter);
    setMode("add");
  };

  const onPickIcon = async (file?: File | null) => {
    if (!file) {
      setFormIconFile(null);
      setFormIconUrl(undefined);
      setDirty((d) => ({ ...d, icon: true }));
      return;
    }
    try {
      setFormIconFile(file);
      const url = URL.createObjectURL(file);
      setFormIconUrl(url);
      setDirty((d) => ({ ...d, icon: true }));
    } catch (e) {
      console.error(e);
    }
  };

  // ------------------------------
  // Save implementations (unchanged)
  // ------------------------------
  const saveAddImpl = async () => {
    const name = formName.trim();
    if (!name) return;

    setExpertise((prev) => ({
      ...prev,
      [formGroup]: prev[formGroup].includes(name) ? prev[formGroup] : [...prev[formGroup], name],
    }));
    setExpertiseActiveMap((prev) => ({ ...prev, [name]: formActive }));

    const coach = (coachTypes as any[])?.find((c) => normalizeGroup(c.name) === formGroup);
    if (!coach) return;

    const desiredStatus: "active" | "inactive" = formActive ? "active" : "inactive";
    try {
      await dispatch(
        createExpertise({
          name,
          coach_id: coach.id,
          status: desiredStatus,
          sub_title: formTitle || undefined,
          icon: formIconFile || undefined,
        } as any)
      );

      await dispatch(fetchExpertise() as any);
      resetForm();
      setMode("list");
    } catch (err) {
      console.error("Failed to create expertise:", err);
    }
  };

  const saveEditImpl = async () => {
    if (!editingOriginalName || !formName.trim()) return;

    const coach = (coachTypes as any[])?.find((c) => normalizeGroup(c.name) === formGroup);
    if (!coach) return;

    const toUpdate = (expertise as any[])?.find((e) => e?.name === editingOriginalName);
    if (!toUpdate) return;

    const newName = formName.trim();
    const desiredStatus: "active" | "inactive" = formActive ? "active" : "inactive";

    setExpertise((prev) => {
      const without = prev[formGroup].filter((n) => n !== editingOriginalName);
      const next = without.includes(newName) ? without : [...without, newName];
      return { ...prev, [formGroup]: next };
    });
    setExpertiseActiveMap((prev) => {
      const cp = { ...prev };
      delete cp[editingOriginalName];
      cp[newName] = formActive;
      return cp;
    });

    try {
      const updateData: any = {
        name: newName,
        coach_id: coach.id,
        status: desiredStatus,
        sub_title: formTitle || null,
      };
      
      // Only include icon if a new file is selected
      if (formIconFile) {
        updateData.icon = formIconFile;
      }
      
      console.log("Sending update data:", {
        id: toUpdate.id,
        data: updateData
      });
      
      await dispatch(
        updateExpertise({
          id: toUpdate.id,
          data: updateData,
        } as any)
      );

      await dispatch(fetchExpertise() as any);
      resetForm();
      setMode("list");
    } catch (err) {
      console.error("Failed to update expertise:", err);
      await dispatch(fetchExpertise() as any);
      resetForm();
      setMode("list");
    }
  };

  // ------------------------------
  // Confirm (opens only when valid)
  // ------------------------------
  const [confirm, setConfirm] = useState<{ open: boolean; action: null | "add" | "edit" }>({
    open: false,
    action: null,
  });

  const openConfirmIfValid = (action: "add" | "edit") => {
    setShowErrors(true);
    if (!isValid) return;
    setConfirm({ open: true, action });
  };

  const handleConfirm = async () => {
    try {
      if (confirm.action === "add") await saveAddImpl();
      if (confirm.action === "edit") await saveEditImpl();
    } finally {
      setConfirm({ open: false, action: null });
    }
  };
  const handleCloseConfirm = () => setConfirm({ open: false, action: null });

  // ---------- validation helpers ----------
  const errors = {
    group: !formGroup ? "Please select a coach type" : "",
    name: !formName.trim() ? "Please enter expertise name" : "",
    title: !formTitle.trim() ? "Please enter a title" : "",
    icon: !formIconUrl ? "Please upload an icon" : "",
  };
  const isValid = !errors.group && !errors.name && !errors.title && !errors.icon;

  // ---------- UI ----------
  const DrawerHeader = (
    <div className="flex items-center justify-between border-b p-6">
      <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Expertise</CardTitle>
      {mode === "list" ? (
        <div className="flex gap-2">
          <Button variant="brand" onClick={handleAddClick}>
            Add
          </Button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );

  const Tabs = (
    <div className="px-6 pt-4">
      <div
        role="tablist"
        aria-label="Expertise Tabs"
        className="rounded-2xl border border-[var(--faded)] bg-[var(--faded)] p-1"
      >
        <div className="flex items-center gap-2">
          {["All", ...GROUPS].map((key) => {
            const isActive = filter === (key as FilterKey);
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(key as FilterKey)}
                className={[
                  "flex-1 basis-0 rounded-xl px-4 py-2 text-center transition",
                  isActive
                    ? "!text-[var(--text-head)] bg-white border border-[var(--faded)] shadow-sm"
                    : "text-[var(--text-head)]/70 hover:!text-[var(--text-head)] bg-transparent border border-transparent",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-color)]",
                ].join(" ")}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const AddEditForm = (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {/* Coach Type */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">Coach Type</label>
            <div className="relative">
              <select
                className={`w-full appearance-none rounded border bg-[var(--background)] p-2 pr-10 text-[var(--text)]`}
                value={formGroup}
                onChange={(e) => {
                  setFormGroup(e.target.value as keyof ExpertiseMap);
                  setDirty((d) => ({ ...d, group: true }));
                }}
              >
                {coachTypesLoading ? (
                  <option>Loading...</option>
                ) : coachTypesError ? (
                  <option>Error loading coach types</option>
                ) : (
                  (coachTypes as any[]).map((coach) => (
                    <option key={coach.id} value={normalizeGroup(coach.name) ?? coach.name}>
                      {normalizeGroup(coach.name) ?? coach.name}
                    </option>
                  ))
                )}
              </select>
  
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text)]" />
            </div>
            {showErrors && errors.group && (
              <p className="mt-1 text-xs text-red-600">{errors.group}</p>
            )}
          </div>
  
          {/* Expertise Name */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">Expertise Title<span className="text-red-500">*</span></label>
            <input
              className={`w-full rounded border bg-[var(--background)] p-2 text-[var(--text)]`}
              placeholder="e.g., Academic Consulting"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                setDirty((d) => ({ ...d, name: true }));
              }}
            />
            {showErrors && errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>


            {/* Discription    ------It used to be named title*/}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">Expertise Discription <span className="text-red-500">*</span></label>
            <input
              className={`w-full rounded border bg-[var(--background)] p-2 text-[var(--text)] `}
              placeholder="e.g., Short description"
              value={formTitle}
              onChange={(e) => {
                setFormTitle(e.target.value);
                setDirty((d) => ({ ...d, title: true }));
              }}
            />
            {showErrors && errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>
  
          {/* Icon */}
          {/* Icon */}
<div className="space-y-1">
  <label className="text-sm text-[var(--text)]">
    Icon <span className="text-red-500">*</span>
  </label>

  {/* Dropzone shell */}
  <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={(e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] ?? null;
      if (file && file.type?.startsWith("image/")) onPickIcon(file);
    }}
    onClick={() => fileInputRef.current?.click()}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
    }}
    className="rounded-2xl p-3 bg-[var(--faded)]/50 cursor-pointer focus:outline-none transition-colors"
  >
    <div
      className={[
        "w-full min-h-[140px] rounded-xl border-2 border-dashed",
        "bg-[var(--background)]",
        "flex flex-col items-center justify-center text-center px-6 relative",
        isDragging ? "border-[var(--brand-color)] bg-[var(--brand-color3)]" : "border-[var(--border)]",
      ].join(" ")}
    >
      {/* Preview (or placeholder) */}
      <div>
        {formIconUrl ? (
          <div className="relative inline-block pointer-events-none">
            <img
              src={formIconUrl}
              alt="icon"
              className="h-16 w-16 rounded-md object-cover shadow-sm pointer-events-none"
            />
            {/* Remove (X) */}
            <button
              type="button"
              aria-label="Remove icon"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering file picker
                onPickIcon(null);    // clear selected file
                if (fileInputRef.current) fileInputRef.current.value = ""; // allow re-picking same file
              }}
              className="pointer-events-auto absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[var(--brand-color)] hover:text-white transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <ImagePlus className="h-10 w-10 text-[var(--text)]/50" />
        )}
      </div>

      {/* Helper text */}
      <p className="text-sm text-[var(--text)] ">
        Drop your image here, or{" "}
        <button
          type="button"
          className="text-[var(--brand-color)] hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          browse
        </button>
      </p>
      <p className="mt-1 text-xs text-[var(--text)]/60">
        Supports: JPG, JPEG2000, PNG. Non-square images are center-cropped to square for display.
      </p>
    </div>
  </div>

  {/* Hidden input */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => onPickIcon(e.target.files?.[0] ?? null)}
  />

  {/* Validation error */}
  {showErrors && errors.icon && (
    <p className="mt-1 text-xs text-red-600">{errors.icon}</p>
  )}
</div>


  
          
  
          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">Status</label>
            <div className="flex items-center gap-3">
              <Switch id="active" checked={formActive} onCheckedChange={setFormActive} />
              <span className="text-sm text-[var(--text)]">{formActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Fixed bottom bar (non-scrolling) */}
      <div className="border-t bg-white p-4 md:p-6 flex w-full items-center">
        {/* Show red error ONLY after save attempted */}
        
  
        <div className="flex  justify-between w-full">
          <Button
            variant="border"
            onClick={() => {
              resetForm();
              setMode("list");
            }}
          >
            Back
          </Button>

          <div className="flex justify-end gap-4">
          <div className="min-h-[1.25rem] text-sm flex items-center">
          {showErrors && !isValid && (
            <span className="text-red-600">Please fill all required fields before saving.</span>
          )}
        </div>

          {mode === "add" ? (
            <Button variant="brand" onClick={() => openConfirmIfValid("add")}>
              Add
            </Button>
          ) : (
            <Button variant="brand" onClick={() => openConfirmIfValid("edit")}>
              Save
            </Button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
  

  const ListHeader = (
    <div className="px-6 pt-4 pb-3">
      <div className="grid grid-cols-1 gap-4 text-sm font-medium text-[var(--text)] md:grid-cols-[1fr_auto]">
        <div className="pl-3">Expertise</div>
        <div className="pr-5 text-right">Actions</div>
      </div>
    </div>
  );

  const ListBody = (
    <div className="px-6 pb-6">
      <div className="space-y-2">
        {filteredRows.length === 0 && (
          <div className="rounded border bg-[var(--faded)] p-3 text-sm italic text-[var(--text)]">
            {filter === "All" ? "No expertise yet" : `No expertise under ${filter}`}
          </div>
        )}

        {filteredRows.map((row) => {
          const extras = extraDataMap[row.name] ?? {};
          const showExtras = filter !== "All";
          const fallbackTitle = showExtras ? (extras as any).title || "Speciality title" : undefined;

          return (
            <div
              key={row.id}
              className="grid items-center gap-4 rounded border bg-[var(--surface,#0b0b0b0a)] p-3 md:grid-cols-[1fr_auto]"
            >
              <div className="flex items-center gap-3">
                {showExtras &&
                  ((extras as any).icon ? (
                    <img
                      src={(extras as any).icon}
                      alt={row.name}
                      className="h-6 w-6 rounded border object-cover"
                    />
                  ) : (
                    <div className="grid h-6 w-6 place-items-center rounded border bg-white/60 text-[10px] text-[var(--text)]/70">
                      {row.name.slice(0, 1).toUpperCase()}
                    </div>
                  ))}

                {filter === "All" ? (
                  <span className="flex items-center gap-2 font-medium text-[var(--text)]">
                    {row.group} <span className="opacity-60">›</span> {row.name}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-medium text-[var(--text)]">
                    {row.name}
                    {showExtras && (
                      <span className="text-xs text-[var(--text)]/70">({fallbackTitle})</span>
                    )}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 md:justify-end">
                {row.active ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <Button
                  variant="actionIcon"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => {
                    setFormGroup(row.group);
                    setFormName(row.name);
                    setFormActive(!!row.active);
                    setEditingOriginalName(row.name);
                    const ex = extraDataMap[row.name];
                    setFormTitle(ex?.title ?? "");
                    console.log("Setting icon URL for edit:", ex?.icon);
                    setFormIconUrl(ex?.icon);
                    setFormIconFile(null);
                    setShowErrors(false);
                    setDirty({});
                    setMode("edit");
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
        <div className="absolute right-0 top-0 flex h-full w-full flex-col border-l bg-[var(--background)] shadow-2xl animate-in slide-in-from-right duration-200 sm:w/[560px] lg:w-[720px]">
          {DrawerHeader}

          {(coachTypesLoading || expertiseLoading) && (
            <div className="py-4 text-center">
              <span>Loading...</span>
            </div>
          )}

          {(coachTypesError || expertiseError) && (
            <div className="py-4 text-center text-red-500">
              {coachTypesError || expertiseError}
            </div>
          )}

          {mode === "list" ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {Tabs}
                {ListHeader}
                {ListBody}
              </div>

              <div className="flex justify-between border-t p-6">
                <Button variant="border" onClick={onClose}>
                  Cancel
                </Button>
                <div className="flex gap-3">
                  <Button variant="brand" onClick={onClose}>
                    Save
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>{AddEditForm}</>
          )}
        </div>
      </div>

      {/* Save confirmation */}
      <ConfirmModal
        isOpen={confirm.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirm}
        heading={confirm.action === "add" ? "Save new expertise?" : "Save changes?"}
        description={
          confirm.action === "add"
            ? "This will add the new expertise to the selected group."
            : "This will update the expertise details."
        }
        confirmText="Save"
        cancelText="Cancel"
      />
    </>
  );
}

