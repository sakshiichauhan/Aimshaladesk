import {
  FileDown,
  Plus,
  Filter,
  Search,
  Bell,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  ImagePlus,
  Pencil,
} from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import * as React from "react";
import { useEffect } from "react";
import { DatePickerWithRange } from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AimshalaSessionsPoolData, type AimshalaSessionsPoolItem } from "@/data/Data";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "@/components/PopupConfirm";
import { useDispatch, useSelector } from "react-redux";
import { selectSegments } from "@/store/slices/platformDesk/assessmentSlice";
import type { AppDispatch } from "@/store";
import { Switch } from "@/components/ui/switch";


export function AimshalaSessionsPool() {
  return (
    <div className="flex flex-col">
      <Topbar />
      <SessionsTable />
    </div>
  );
}

function Topbar() {
  // const [showFilter, setShowFilter] = useState(false);
  
  const [showForm, setShowForm] = useState(false);
  const navigator = useNavigate();
  return (
    <div className="flex justify-between mb-2 items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Sessions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Aimshala Expertise</BreadcrumbPage>
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
        {showForm && <AddPoolSessionForm onClose={() => setShowForm(false)} />}
        <DatePickerWithRange />
        <Button
          variant="standard"
          size="new"
          // onClick={() => setShowFilter(true)}
        >
          <Filter className="h-3 w-3" />
        </Button>
        {/* {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />} */}
        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
        </Button>
        <div className="flex gap-4">
        
      </div>
      </div>
    </div>
  );
}


interface FormProps {
  onClose: () => void;
}

/* ---------- Options & dummy data ---------- */
const coachTypes = ["Consultant", "Mentor", "Educator"] as const;

const CATEGORIES_BY_COACH: Record<(typeof coachTypes)[number], string[]> = {
  Consultant: [
    "Academic Consulting",
    "Career Consulting",
    "International Studies",
    "Emotional Well-Being",
  ],
  Mentor: ["Skill Mentors", "Leadership Mentors", "Academic Mentors"],
  Educator: ["STEM Educator", "Language Educator"],
};

const SPECIALITIES_BY_CATEGORY: Record<string, string[]> = {
  "Academic Consulting": ["Stream Selection", "Course Planning", "Profile Building"],
  "Career Consulting": ["Resume Review", "Interview Prep", "Career Transition"],
  "International Studies": ["Visa Guidance", "SOP Review", "LOR Drafting"],
  "Emotional Well-Being": ["Stress Management", "Time Management"],
  "Skill Mentors": ["Excel Basics", "Python Basics"],
  "Leadership Mentors": ["Team Building", "Conflict Resolution"],
  "Academic Mentors": ["Exam Strategy", "Study Plans"],
  "STEM Educator": ["Robotics Club", "Math Olympiad Prep"],
  "Language Educator": ["Spoken English", "IELTS Prep"],
};

const serviceTypes = ["Phone", "Video", "In-Person","Ask Q"] as const;

interface FormProps {
  onClose: () => void;
}


function SuffixInput({
  value,
  onChange,
  placeholder,
  type = "number",
  min,
  max,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <div className="relative w-full">
      <Input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10"
      />
      {suffix ? (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)] text-xs">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}




















export type SegmentItem = {
  id: string;
  label: string;
  children?: SegmentItem[];
};

const SEGMENTS_DATA: SegmentItem[] = [
  {
    id: "school",
    label: "School",
    children: [
      { id: "school:class:6-8", label: "Class 6th to 8th" },
      { id: "school:class:9-10", label: "Class 9th & 10th" },
      { id: "school:class:PMC", label: "Class 11th & 12th (PCM)" },
      { id: "school:class:PBC", label: "Class 11th & 12th (PCB)" },
      {
        id: "school:class:Cm",
        label: "Class 11th & 12th (Commerce with Maths)",
      },
      {
        id: "school:class:Ce",
        label: "Class 11th & 12th (Commerce with Economics)",
      },
      { id: "school:class:Ah", label: "Class 11th & 12th (Arts / Humanities)" },
    ],
  },

  {
    id: "college",
    label: "College",
    children: [
      {
        id: "college:ug",
        label: "Undergraduate",
        children: [
          { id: "college:ug:engineering", label: "Engineering" },
          { id: "college:ug:business", label: "Business" },
          { id: "college:ug:sciences", label: "Sciences" },
          { id: "college:ug:arts", label: "Arts" },
        ],
      },
      {
        id: "college:pg",
        label: "Postgraduate",
        children: [
          { id: "college:pg:mba", label: "MBA" },
          { id: "college:pg:ms", label: "MS" },
          { id: "college:pg:ma", label: "MA" },
        ],
      },
    ],
  },

  {
    id: "entrepreneur",
    label: "Entrepreneur",
    children: [
      { id: "entrepreneur:idea", label: "Idea Stage" },
      { id: "entrepreneur:seed", label: "Seed Stage" },
      { id: "entrepreneur:growth", label: "Growth Stage" },
    ],
  },
];

export type SegmentStaticPickerProps = {
  tree: SegmentItem[];
  value: string[]; // selected leaf ids
  onChange: (next: string[]) => void;
  openAllByDefault?: boolean;
  className?: string;
};

const INDENT = 20;

/* --------- Leaf (regular checkbox row) --------- */
function LeafCheckbox({
  item,
  checked,
  onToggle,
}: {
  item: SegmentItem;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center rounded-md px-2 py-1.5 hover:bg-muted/60">
      <div className="mr-1 h-6 w-6" />
      <div className="mr-2">
        <Checkbox checked={checked} onCheckedChange={onToggle} />
      </div>
      <button type="button" className="text-sm" onClick={onToggle}>
        {item.label}
      </button>
    </div>
  );
}

function SegmentStaticPicker({
  tree,
  value,
  onChange,
  openAllByDefault = false,
  className,
}: SegmentStaticPickerProps) {
  const selected = React.useMemo(() => new Set(value), [value]);

  /* Build: set of parent ids (for open state) */
  const parentIds = React.useMemo(() => {
    const ids = new Set<string>();
    const walk = (nodes: SegmentItem[]) =>
      nodes.forEach((n) => {
        if (n.children?.length) {
          ids.add(n.id);
          walk(n.children);
        }
      });
    walk(tree);
    return ids;
  }, [tree]);

  /* Build: parent id -> ALL descendant leaf ids (deep) */
  const leafIdsByParent = React.useMemo(() => {
    const map = new Map<string, string[]>();

    const collectLeaves = (node: SegmentItem): string[] => {
      if (!node.children || node.children.length === 0) {
        return [node.id]; // leaf
      }
      const acc: string[] = [];
      node.children.forEach((child) => {
        acc.push(...collectLeaves(child));
      });
      map.set(node.id, acc);
      return acc;
    };

    tree.forEach((root) => collectLeaves(root));
    return map;
  }, [tree]);

  /* Open/close state */
  const [open, setOpen] = React.useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    parentIds.forEach((id) => (o[id] = openAllByDefault));
    return o;
  });

  React.useEffect(() => {
    setOpen((prev) => {
      const next = { ...prev };
      parentIds.forEach((id) => {
        if (next[id] === undefined) next[id] = openAllByDefault;
      });
      return next;
    });
  }, [parentIds, openAllByDefault]);

  const toggleOpen = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  const toggleLeaf = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  };

  /* Toggle a parent checkbox: select/deselect ALL descendant leaves */
  const toggleParent = (parentId: string, shouldCheck: boolean) => {
    const leafIds = leafIdsByParent.get(parentId) ?? [];
    if (leafIds.length === 0) return;
    const next = new Set(selected);
    if (shouldCheck) {
      leafIds.forEach((id) => next.add(id));
    } else {
      leafIds.forEach((id) => next.delete(id));
    }
    onChange([...next]);
  };

  /* --------- Parent header row (with parent checkbox) --------- */
  const ParentRow: React.FC<{
    item: SegmentItem;
    depth: number;
    childrenContent: React.ReactNode;
  }> = ({ item, depth, childrenContent }) => {
    const isOpen = !!open[item.id];
    const leafIds = leafIdsByParent.get(item.id) ?? [];
    const selectedCount = leafIds.reduce(
      (acc, id) => acc + (selected.has(id) ? 1 : 0),
      0
    );
    const isChecked = leafIds.length > 0 && selectedCount === leafIds.length;
    const isIndeterminate = selectedCount > 0 && selectedCount < leafIds.length;

    return (
      <div style={{ marginLeft: depth * INDENT }} className="mb-3">
        {/* header box (same design) */}
        <div className="inline-flex items-center gap-2 rounded border bg-white px-3 py-1.5 w-full">
          <button
            type="button"
            aria-label="Toggle"
            aria-expanded={isOpen}
            className="grid h-6 w-6 place-items-center rounded hover:bg-muted/80"
            onClick={() => toggleOpen(item.id)}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          <button
            type="button"
            className="text-sm"
            onClick={() => toggleOpen(item.id)}
          >
            {item.label}
          </button>

          {/* parent checkbox on the right */}
          <div className="ml-auto">
            <Checkbox
              checked={
                isChecked ? true : isIndeterminate ? "indeterminate" : false
              }
              disabled={leafIds.length === 0}
              onCheckedChange={(state) => toggleParent(item.id, state === true)}
            />
          </div>
        </div>

        {/* animated body */}
        <div
          className={[
            "grid transition-all motion-safe:duration-300",
            isOpen
              ? "grid-rows-[1fr] opacity-100 translate-y-0"
              : "grid-rows-[0fr] opacity-0 -translate-y-1",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="mt-2">{childrenContent}</div>
          </div>
        </div>
      </div>
    );
  };

  /* Render: leaves first, then parents (unchanged) */
  const renderChildren = (
    nodes: SegmentItem[],
    depth: number
  ): React.ReactNode => {
    const leaves: SegmentItem[] = [];
    const parents: SegmentItem[] = [];
    for (const n of nodes) {
      if (n.children?.length) parents.push(n);
      else leaves.push(n);
    }

    return (
      <>
        {leaves.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
            style={{ marginLeft: depth * INDENT + 24 }}
          >
            {leaves.map((leaf) => (
              <LeafCheckbox
                key={leaf.id}
                item={leaf}
                checked={selected.has(leaf.id)}
                onToggle={() => toggleLeaf(leaf.id)}
              />
            ))}
          </div>
        )}

        {parents.map((p) => (
          <ParentRow
            key={p.id}
            item={p}
            depth={depth}
            childrenContent={renderChildren(p.children!, depth + 1)}
          />
        ))}
      </>
    );
  };

  return (
    <div className={className}>
      {tree.map((root) =>
        root.children?.length ? (
          <ParentRow
            key={root.id}
            item={root}
            depth={0}
            childrenContent={renderChildren(root.children!, 1)}
          />
        ) : (
          <div key={root.id} className="mb-2">
            <LeafCheckbox
              item={root}
              checked={selected.has(root.id)}
              onToggle={() => toggleLeaf(root.id)}
            />
          </div>
        )
      )}
    </div>
  );
}


















/* ---------- Component ---------- */
function AddPoolSessionForm({ onClose }: FormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const segments = useSelector(selectSegments);

  const [coachType, setCoachType] = useState<(typeof coachTypes)[number] | "">("");
  const [category, setCategory] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ICON: upload + auto square-crop
  const [iconFile, ] = useState<File | null>(null);
  const [iconSrc, ] = useState<string | null>(null);
  const [iconSquareSrc, ] = useState<string | null>(null);
  const [formIconUrl, setFormIconUrl] = useState<string | null>(null);

  const [serviceType, setServiceType] = useState<(typeof serviceTypes)[number] | "">("");

  // PRICING
  const [price, setPrice] = useState("");
  const [offeredPrice, setOfferedPrice] = useState("");
  const [gstPercent, setGstPercent] = useState("18");
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  const [gstAmount, setGstAmount] = useState("");

  const [standardPercent, setStandardPercent] = useState("20");
  const [premiumPercent, setPremiumPercent] = useState("12");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // STATUS toggle
  const [isActive, setIsActive] = useState(true);

  // ✅ VALIDATION STATE (added)
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ CONFIRM POPUP (added)
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Segments state
  const [segmentLeaves, setSegmentLeaves] = useState<string[]>([]);

  const categories = coachType ? CATEGORIES_BY_COACH[coachType] : [];
  const specialities = category ? SPECIALITIES_BY_CATEGORY[category] ?? [] : [];

  // Load segments from API
  useEffect(() => {
    (async () => {
      const { fetchSegments } = await import("@/store/slices/platformDesk/segmentThunk");
      dispatch(fetchSegments());
    })();
  }, [dispatch]);

  React.useEffect(() => {
    setCategory("");
    setSpeciality("");
  }, [coachType]);
  React.useEffect(() => {
    setSpeciality("");
  }, [category]);

  // ===== Pricing math =====
  const offerNum = parseFloat(offeredPrice || "0");
  const gstPctNum = parseFloat(gstPercent || "0");
  const baseFromInclusive = offerNum / (1 + gstPctNum / 100);
  const gstFromExclusive = (offerNum * gstPctNum) / 100;
  const finalFromExclusive = offerNum + gstFromExclusive;

  useEffect(() => {
    if (offeredPrice && gstPercent) {
      const offer = parseFloat(offeredPrice);
      const pct = parseFloat(gstPercent);
      if (isGstInclusive) {
        const gstVal = offer - offer / (1 + pct / 100);
        setGstAmount(gstVal.toFixed(2));
      } else {
        const gstVal = (offer * pct) / 100;
        setGstAmount(gstVal.toFixed(2));
      }
    } else {
      setGstAmount("");
    }
  }, [offeredPrice, gstPercent, isGstInclusive]);

  // ===== Icon: center-crop to square on input =====
  const onPickIcon = (file: File | null) => {
    setFormIconUrl((prevUrl) => {
      if (prevUrl && prevUrl.startsWith("blob:")) {
        try { URL.revokeObjectURL(prevUrl); } catch {}
      }
      if (!file) return "";
      if (!file.type || !file.type.startsWith("image/")) return "";
      try { return URL.createObjectURL(file); } catch { return ""; }
    });
  };

  // ✅ Clear icon helper for the X button (added)
  const clearIcon = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    onPickIcon(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Validation helpers (added)
  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!coachType) e.coachType = "Please select a coach type";
    if (!category) e.category = "Please select expertise";
    if (!speciality) e.speciality = "Please select a speciality";
    // if (!title.trim()) e.title = "Please enter a title";
    // if (!description.trim()) e.description = "Please enter a description";
    // if (!formIconUrl) e.icon = "Please upload an icon";
    if (!serviceType) e.serviceType = "Please select a service type";
    if (!price || Number(price) <= 0) e.price = "Please enter a valid price";
    if (!offeredPrice || Number(offeredPrice) <= 0) e.offeredPrice = "Please enter a valid offered price";
    if (segmentLeaves.length === 0) e.segments = "Please select at least one segment";
    return e;
  };
  const hasErrors = (e: Record<string, string>) => Object.keys(e).length > 0;

  // ✅ Submit → validate → open confirm (added)
  const handleSubmit = () => {
    const e = computeErrors();
    setErrors(e);
    setShowErrors(true);
    if (!hasErrors(e)) setConfirmOpen(true);
  };

  // ✅ Confirm handler (added)
  const handleConfirm = () => {
    setConfirmOpen(false);
    const payload = {
      coachType,
      category,
      speciality,
      title,
      description,
      icon: {
        fileName: iconFile?.name ?? "",
        original: iconSrc,
        square: iconSquareSrc,
        preview: formIconUrl,
      },
      serviceType,
      segments: segmentLeaves,
      pricing: {
        price: Number(price || 0),
        offerPrice: Number(offeredPrice || 0),
        gstPercent: Number(gstPercent || 0),
        gstInclusive: isGstInclusive,
        gstAmount: Number(gstAmount || 0),
        displayCalculated: Number(
          (
            isGstInclusive
              ? (isFinite(baseFromInclusive) ? baseFromInclusive : 0)
              : (isFinite(finalFromExclusive) ? finalFromExclusive : 0)
          ).toFixed(2)
        ),
        standard: standardPercent ? Number(standardPercent) : "",
        premium: premiumPercent ? Number(premiumPercent) : "",
      },
      status: isActive ? "active" : "inactive",
    };
    console.log("Add Pool Session (confirm):", payload);
    onClose();
  };

  const handleCancelConfirm = () => setConfirmOpen(false);

  return (
    <div className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm flex justify-end">
      {/* Right Drawer */}
      <div className="relative bg-[var(--background)] shadow-xl h-full w-full max-w-[900px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
              Aimshala Expertise
            </CardTitle>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 text-[var(--text)] overflow-y-auto p-4 space-y-4">
          {/* Coach Type */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Coach Type <span className="text-[var(--red)]">*</span></Label>
            <Select value={coachType} onValueChange={(v) => setCoachType(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Coach Type" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {coachTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.coachType && (
              <p className="text-xs text-red-600">{errors.coachType}</p>
            )}
          </div>

          {/* Category (Expertise) */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Expertise <span className="text-[var(--red)]">*</span></Label>
            <Select value={category} onValueChange={setCategory} disabled={!coachType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.category && (
              <p className="text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Specialities */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Specialities <span className="text-[var(--red)]">*</span></Label>
            <Select value={speciality} onValueChange={setSpeciality} disabled={!category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Speciality" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {specialities.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.speciality && (
              <p className="text-xs text-red-600">{errors.speciality}</p>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Title (optional)</Label>
            <Input
              className="w-full"
              placeholder="e.g., Stream Selection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* {showErrors && errors.title && (
              <p className="text-xs text-red-600">{errors.title}</p>
            )} */}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Description (optional)</Label>
            <Input
              className="w-full"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
              {/* {showErrors && errors.description && (
              <p className="text-xs text-red-600">{errors.description}</p>
            )} */}
          </div>

          {/* Icon (with X) */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">
              Icon (optional)
            </label>

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
                <div>
                  {formIconUrl ? (
                    <div className="relative inline-block pointer-events-none">
                      <img
                        src={formIconUrl}
                        alt="icon"
                        className="h-16 w-16 rounded-md object-cover shadow-sm pointer-events-none"
                      />
                      {/* X button */}
                      <button
                        type="button"
                        aria-label="Remove icon"
                        onClick={clearIcon}
                        className="pointer-events-auto absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[var(--brand-color)] hover:text-white transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <ImagePlus className="h-10 w-10 text-[var(--text)]/50" />
                  )}
                </div>

                <p className="text-sm text-[var(--text)]">
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

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickIcon(e.target.files?.[0] ?? null)}
            />

            {/* {showErrors && errors.icon && (
              <p className="text-xs text-red-600">{errors.icon}</p>
            )} */}
          </div>

          {/* Service Type */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Service Type <span className="text-[var(--red)]">*</span></Label>
            <Select value={serviceType} onValueChange={(v) => setServiceType(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {serviceTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.serviceType && (
              <p className="text-xs text-red-600">{errors.serviceType}</p>
            )}
          </div>

          {/* PRICING */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label>Price <span className="text-[var(--red)]">*</span></Label>
              <SuffixInput value={price} onChange={setPrice} placeholder="Enter Price" suffix="₹" />
              {showErrors && errors.price && (
                <p className="text-xs text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label>Offered Price <span className="text-[var(--red)]">*</span></Label>
              <SuffixInput value={offeredPrice} onChange={setOfferedPrice} placeholder="Enter Offered price" suffix="₹" />
              {showErrors && errors.offeredPrice && (
                <p className="text-xs text-red-600">{errors.offeredPrice}</p>
              )}
            </div>
          </div>

          {/* GST + Toggle in same row */}
          <div className="flex gap-4 w-full items-end">
            <div className="flex-1 flex flex-col gap-2">
              <Label>GST</Label>
              <Select value={gstPercent} onValueChange={setGstPercent}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select GST %" />
                </SelectTrigger>
                <SelectContent side="bottom" className="z-[9999]">
                  {["0","5","12","18","28"].map((v) => (
                    <SelectItem key={v} value={v}>{v}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label className="mb-2 block">GST</Label>
              <div className="inline-flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsGstInclusive(false)}
                  className={`text-sm ${!isGstInclusive ? "text-[var(--text-head)]" : "text-[var(--text)]/60"}`}
                >
                  Exclusive
                </button>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isGstInclusive}
                    onChange={() => setIsGstInclusive(!isGstInclusive)}
                    aria-checked={isGstInclusive}
                    role="switch"
                  />
                  <div className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-[var(--brand-color)] peer-checked:[&>span]:translate-x-[20px]">
                    <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out" />
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => setIsGstInclusive(true)}
                  className={`text-sm ${isGstInclusive ? "text-[var(--text-head)]" : "text-[var(--text)]/60"}`}
                >
                  Inclusive
                </button>
              </div>
            </div>
          </div>

          {/* Calculated field */}
          <div className="flex flex-col gap-2 w-full">
            <Label>{isGstInclusive ? "Price (without GST)" : "Price (with GST)"}</Label>
            <Input
              className="w-full bg-[var(--faded)]"
              readOnly
              value={
                isGstInclusive
                  ? (isFinite(baseFromInclusive) ? baseFromInclusive : 0).toFixed(2)
                  : (isFinite(finalFromExclusive) ? finalFromExclusive : 0).toFixed(2)
              }
              placeholder={isGstInclusive ? "Base amount" : "Final amount"}
            />
          </div>

          {/* Partner Fees */}
          <p className="font-bold pt-2">Partner Fees</p>
          <div className="flex gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <Label>Standard</Label>
              <SuffixInput value={standardPercent} onChange={setStandardPercent} placeholder="20" suffix="%" min={0} max={100} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label>Premium</Label>
              <SuffixInput value={premiumPercent} onChange={setPremiumPercent} placeholder="12" suffix="%" min={0} max={100} />
            </div>
          </div>



           {/* Segments */}
           <div className="space-y-1">
                    <div className="text-sm text-[var(--text-head)]">Segments <span className="text-red-500">*</span></div>
                    <SegmentStaticPicker
                      tree={(Array.isArray(segments) && segments.length ? (segments as unknown as SegmentItem[]) : SEGMENTS_DATA)}
                      value={segmentLeaves}
                      onChange={setSegmentLeaves}
                      openAllByDefault={false}
                    />
                    {showErrors && errors.segments && (
                      <p className="mt-1 text-xs text-red-600">{errors.segments}</p>
                    )}
            </div>





          {/* Status */}
          <div className="space-y-1">
                    <label className="text-sm text-[var(--text-head)]">Status</label>
                    <div className="flex items-center gap-3">
                      <Switch id="specialty-active" checked={isActive} onCheckedChange={setIsActive} />
                      <span className="text-sm text-[var(--text)]">{isActive ? "Active" : "Inactive"}</span>
                    </div>
                  </div>

          <div className="h-4" />
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t flex justify-between gap-4 bg-[var(--background)]">
          <Button variant="border" onClick={onClose}>Cancel</Button>
          <div className="flex items-center gap-4">
            {showErrors && hasErrors(errors) && (
              <span className="text-sm text-red-600">
                Please fix the highlighted fields before saving.
              </span>
            )}
            <Button variant="brand" onClick={handleSubmit}>Add Session</Button>
          </div>
        </div>
      </div>

      {/* ✅ Confirmation popup (uses your existing ConfirmModal) */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        heading="Add this pool session?"
        description="This will create a new session with the details you’ve entered."
        confirmText="Add Session"
        cancelText="Cancel"
      />
    </div>
  );
}



// interface FilterProps {
//   onClose: () => void;
// }

// function AssessFilter({ onClose }: FilterProps) {
//   const modalRef = React.useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState("General");

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (modalRef.current && modalRef.current.contains(e.target as Node)) {
//         return;
//       }
//       const target = e.target as HTMLElement;
//       if (target.closest("[data-radix-popper-content-wrapper]")) {
//         return;
//       }
//       onClose();
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   const tabList = [
//     "General",
//     "Coach Category",
//     "Status",
//     "Price Range",
//     "Availability",
//   ];

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
//       <div
//         ref={modalRef}
//         className="relative w-full max-w-[700px] h-[500px] rounded-sm bg-[var(--background)] "
//       >
//         <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
//           <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
//             Filters
//           </CardTitle>
//           <Button
//             variant="link"
//             className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
//           >
//             Clear All
//           </Button>
//         </div>
//         <div className="flex ">
//           <div className="overflow-y-auto min-w-[180px] border-r-1 h-[360px]">
//             <div className="flex flex-col ">
//               {tabList.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`text-left text-sm px-3 py-3 border-l-3 ${
//                     activeTab === tab
//                       ? "bg-[var(--brand-color3)] dark:bg-[var(--brand-color2)] text-[var(--brand-color)] dark:text-[var(--text-head)] font-semibold border-[var(--brand-color)]"
//                       : "text-[var(--text)] hover:bg-[var(--faded)] border-transparent"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-6 overflow-y-auto relative w-full">
//             {activeTab === "General" && (
//               <>
//                 <label htmlFor="Gen" className="text-[var(--text)]">
//                   Search by Name :
//                 </label>
//                 <Input
//                   id="Gen"
//                   placeholder="Enter .."
//                   type="text"
//                   className="mt-4 w-full "
//                 />
//               </>
//             )}

//             {activeTab === "Coach Category" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">
//                   Select Coach Category:
//                 </p>
//                 <div className="text-center py-8">
//                   <p className="text-[var(--text)]">Filter options coming soon...</p>
//                 </div>
//               </>
//             )}

//             {activeTab === "Status" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">
//                   Select Status:
//                 </p>
//                 <div className="text-center py-8">
//                   <p className="text-[var(--text)]">Filter options coming soon...</p>
//                 </div>
//               </>
//             )}

//             {activeTab === "Price Range" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">
//                   Select Price Range:
//                 </p>
//                 <div className="text-center py-8">
//                   <p className="text-[var(--text)]">Filter options coming soon...</p>
//                 </div>
//               </>
//             )}

//             {activeTab === "Availability" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">
//                   Select Availability:
//                 </p>
//                 <div className="text-center py-8">
//                   <p className="text-[var(--text)]">Filter options coming soon...</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="relative bottom-0 right-0 w-full px-6 py-4 flex border-t-1 justify-end gap-2">
//           <div className="flex gap-4 absolute left-[50%] -translate-x-[50%]">
//             <Button variant="border" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button variant="brand" onClick={onClose}>
//               Apply Filters
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



function SessionsTable() {
  const [activeCoachTab, setActiveCoachTab] = useState<
    "All" | "Consultant" | "Mentor" | "Educator"
  >("All");

  const [editingItem, setEditingItem] = useState<AimshalaSessionsPoolItem | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const [selectedCoachStack, setSelectedCoachStack] = useState<AimshalaSessionsPoolItem[]>(
    AimshalaSessionsPoolData[0] ? [AimshalaSessionsPoolData[0] as AimshalaSessionsPoolItem] : []
  );
  const [focusedCoachId, setFocusedCoachId] = useState<string | null>(
    AimshalaSessionsPoolData[0]?.id || null
  );


  // --- filter by active tab first, then sort ---
  const filteredByCoach =
    activeCoachTab === "All"
      ? [...AimshalaSessionsPoolData]
      : AimshalaSessionsPoolData.filter((r) => r.coachCategory === activeCoachTab);

  const sortedData = React.useMemo(() => {
    const arr = [...filteredByCoach];
    if (!sortConfig) return arr;
    const { key, direction } = sortConfig;
    arr.sort((a: any, b: any) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === "ascending" ? -1 : 1;
      if (bValue == null) return direction === "ascending" ? 1 : -1;
      // simple string/number compare
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredByCoach, sortConfig]);

  // --- pagination works on sorted + filtered data ---
  const totalPages = Math.ceil(sortedData.length / recordsPerPage) || 1;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  // reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedUsers([]); // optional: clear selection on tab change
  }, [activeCoachTab]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRecords.map((user: { id: string }) => user.id));
    }
  };

  const bringToTop = (userId: string) => {
    const coach = selectedCoachStack.find((c) => c.id === userId);
    if (coach) {
      setSelectedCoachStack((prev) => [coach, ...prev.filter((c) => c.id !== userId)]);
      setFocusedCoachId(userId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach((row) => {
      const id = String(row.getAttribute("data-id"));
      const isInStack = selectedCoachStack.some((coach) => coach.id === id);
      const isTop = focusedCoachId === id;
      row.classList.remove("bg-[var(--brand-color3)]", "border-l-[var(--brand-color)]");
      if (isInStack) {
        row.classList.add("bg-[var(--brand-color3)]");
        if (isTop) row.classList.add("border-l-[var(--brand-color)]");
      }
    });
  }, [selectedCoachStack, focusedCoachId]);

  const handleRowClick = (user: AimshalaSessionsPoolItem) => {
    const exists = selectedCoachStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedCoachStack((prev) => [user, ...prev].slice(0, 5));
      setFocusedCoachId(user.id);
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

  // --- UI ---
  const coachTabs: Array<"All" | "Consultant" | "Mentor" | "Educator"> = [
    "All",
    "Consultant",
    "Mentor",
    "Educator",
  ];

  return (
    <>
<div className="">
  <div className="flex items-center">
    {coachTabs.map((tab) => {
      const isActive = activeCoachTab === tab;
      return (
        <button
          key={tab}
          onClick={() => setActiveCoachTab(tab)}
          className={[
            "inline-flex items-center gap-2 rounded-md px-4 rounded-b-none py-2 text-sm transition-all",
            "border-1", // keep your border scale
            isActive
              ? "bg-[var(--brand-color)] text-white border-[var(--brand-color)] shadow-sm"
              : "bg-white dark:bg-[var(--background)] text-[var(--text-head)] border-[var(--faded)] hover:bg-[var(--faded)]"
          ].join(" ")}
        >
          <span className="font-medium">{tab}</span>
          {/* <span
            className={
              "text-xs rounded-full px-2 py-0.5 " +
              (isActive
                ? "bg-white/20 text-white"
                : "bg-[var(--faded)] text-[var(--text)]/70")
            }
          >
            {counts[tab]}
          </span> */}
        </button>
      );
    })}
  </div>
</div>

    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap ">
      <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b h-20 p-4">
          {/* Left: bulk actions */}
          <div className="flex items-center gap-2 p-4 pl-0">
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
                Select All
              </label>
              {selectedUsers.length > 0 && (
                <Badge variant="border" className="ml-2">
                  {selectedUsers.length} selected
                </Badge>
              )}
            </div>
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <Button variant="border" size="sm">
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="border" size="sm">
                  <Check className="h-4 w-4 text-[var(--green)]" />
                  Approve All
                </Button>
                <Button variant="delete" size="sm">
                  <X className="h-4 w-4 text-[var(--red)]" />
                  Block / Remove
                </Button>
              </div>
            )}
          </div>

          {/* Right: search */}
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center border-1 rounded-sm overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search"
                className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-40 sm:w-45"
              />
              <Button type="submit" size="icon" variant="standard" className="rounded-none rounded-r-md bg-[var(--button)]" aria-label="Search">
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead onClick={() => requestSort("id")} className="cursor-pointer text-[var(--text)] text-low">
                  ID {sortConfig?.key === "id" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("coachCategory")} className="cursor-pointer text-[var(--text)]">
                  Coach Category {sortConfig?.key === "coachCategory" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("expertise")} className="cursor-pointer text-[var(--text)]">
                  Expertise {sortConfig?.key === "expertise" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("segments")} className="cursor-pointer text-[var(--text)]">
                  Segments {sortConfig?.key === "segments" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("category")} className="cursor-pointer text-[var(--text)]">
                  Services {sortConfig?.key === "category" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("mrp")} className="cursor-pointer text-[var(--text)]">
                  MRP {sortConfig?.key === "mrp" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("offeredPrice")} className="cursor-pointer text-[var(--text)]">
                  Offered Price {sortConfig?.key === "offeredPrice" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("gstPercentage")} className="cursor-pointer text-[var(--text)]">
                  GST % {sortConfig?.key === "gstPercentage" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("originalPrice")} className="cursor-pointer text-[var(--text)]">
                  Original Price {sortConfig?.key === "originalPrice" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("standard")} className="cursor-pointer text-[var(--text)]">
                  Standard {sortConfig?.key === "standard" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("premium")} className="cursor-pointer text-[var(--text)]">
                  Premium {sortConfig?.key === "premium" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => requestSort("status")} className="cursor-pointer text-[var(--text)]">
                  Status {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user: any) => (
                <TableRow
                  key={user.id}
                  data-id={user.id}
                  className={cn(
                    "relative z-10 h-[90px] cursor-pointer transition-all duration-200 hover:bg-[var(--brand-color2)]",
                    selectedCoachStack.some((c) => c.id === user.id) ? "bg-[var(--brand-color3)]" : ""
                  )}
                  onClick={() => {
                    toggleSelectUser(user.id);
                    handleRowClick(user);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 hover:border-[var(--brand-color)]",
                      selectedCoachStack.some((c) => c.id === user.id)
                        ? focusedCoachId === user.id
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

                  <TableCell><div className="font-medium">{user.id}</div></TableCell>
                  <TableCell><Badge variant="standard">{user.coachCategory}</Badge></TableCell>
                  <TableCell><div className="text-low">{user.expertise}</div></TableCell>
                  <TableCell><div className="text-low">{user.segments}</div></TableCell>

                  {/* If you've migrated to services: string[] replace user.category accordingly */}
                  <TableCell>
                    <div className="text-low">
                      {/* replace with services if present */}
                      {"services" in user && Array.isArray((user as any).services)
                        ? (user as any).services.slice(0, 2).join(", ") +
                          (((user as any).services?.length ?? 0) > 2 ? "…" : "")
                        : (user as any).category}
                    </div>
                  </TableCell>

                  <TableCell><div className="font-medium">₹{user.mrp.toLocaleString()}</div></TableCell>
                  <TableCell><div className="font-medium">₹{user.offeredPrice.toLocaleString()}</div></TableCell>
                  <TableCell><div className="text-low">{user.gstPercentage}%</div></TableCell>
                  <TableCell><div className="font-medium">₹{user.originalPrice.toLocaleString()}</div></TableCell>
                  <TableCell><Badge variant="standard">{user.standard}</Badge></TableCell>
                  <TableCell><Badge variant="standard">{user.premium}</Badge></TableCell>
                  <TableCell>
                    <Badge
                      variant="standard"
                      className={
                        user.status === "active"
                          ? "bg-[var(--green2)] text-[var(--green)]"
                          : "bg-[var(--red2)] text-[var(--red)]"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Eye className="h-3 w-3" />
                              <span className="sr-only">View</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>View Details</p></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingItem(user); // open editor with this row
                              }}
                            >
                              <Pencil />
                              <span className="sr-only">Edit</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Edit</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="border" size="sm" className="flex items-center gap-2 text-low text-[var(--text-head)]">
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
              Showing {sortedData.length === 0 ? 0 : indexOfFirstRecord + 1}-
              {Math.min(indexOfLastRecord, sortedData.length)} of {sortedData.length} sessions
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="border" size="icon" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
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
            <Button variant="border" size="icon" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {editingItem && (
          <EditPoolSessionForm
            item={editingItem}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
    </>
  );
}




































// EditPoolSessionForm.tsx
// import { ImagePlus } from "lucide-react";

type EditFormProps = {
  onClose: () => void;
  item: AimshalaSessionsPoolItem; // the row you clicked
};

function EditPoolSessionForm({ onClose, item }: EditFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const segments = useSelector(selectSegments);

  // Load segments from API (unchanged)
  useEffect(() => {
    (async () => {
      const { fetchSegments } = await import("@/store/slices/platformDesk/segmentThunk");
      dispatch(fetchSegments());
    })();
  }, [dispatch]);

  // ===== Prefill helpers =====
  const inferGstInclusive = (offer: number, gstPct: number, original: number) => {
    if (!offer || !gstPct || !original) return true; // default inclusive
    const r = gstPct / 100;
    const exclusiveFinal = offer * (1 + r);
    // if original ≈ offer + GST (within ₹1), treat as Exclusive data
    return Math.abs(original - exclusiveFinal) > 1;
  };

  // ===== Prefill values from the row =====
  const [coachType, setCoachType] = useState<(typeof coachTypes)[number] | "">(
    (item.coachCategory as any) || ""
  );
  const [category, setCategory] = useState<string>(() => {
    const list = coachType ? CATEGORIES_BY_COACH[coachType] || [] : [];
    const fromData = (item as any).category as string | undefined;
    return fromData && list.includes(fromData) ? fromData : "";
  });
  const [speciality, setSpeciality] = useState<string>(() => {
    const services = (item as any).services as string[] | undefined;
    return services?.[0] ?? "";
  });
  const [title, setTitle] = useState<string>(`${item.expertise} Session`);
  const [description, setDescription] = useState<string>("");

  // ICON: upload (same UX as Add form: preview with objectURL + X to clear)
  const [iconFile] = useState<File | null>(null);
  const [iconSrc] = useState<string | null>(null);
  const [iconSquareSrc] = useState<string | null>(null);
  const [formIconUrl, setFormIconUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Service type
  const [serviceType, setServiceType] = useState<(typeof serviceTypes)[number] | "">("");

  // PRICING (prefilled from item)
  const [price, setPrice] = useState<string>(String(item.mrp ?? ""));
  const [offeredPrice, setOfferedPrice] = useState<string>(String(item.offeredPrice ?? ""));
  const [gstPercent, setGstPercent] = useState<string>(String(item.gstPercentage ?? "18"));
  const [isGstInclusive, setIsGstInclusive] = useState<boolean>(
    inferGstInclusive(item.offeredPrice, item.gstPercentage, item.originalPrice)
  );
  const [gstAmount, setGstAmount] = useState<string>("");

  // Partner fees (kept)
  const [standardPercent, setStandardPercent] = useState<string>(
    item.standard === "Available" ? "25" : "0"
  );
  const [premiumPercent, setPremiumPercent] = useState<string>(
    item.premium === "Available" ? "50" : "0"
  );

  // STATUS toggle — copy same Switch behavior
  const [isActive, setIsActive] = useState<boolean>(item.status === "active");

  // Segments (closed by default & with validation)
  const [segmentLeaves, setSegmentLeaves] = useState<string[]>([]);

  const categories = coachType ? CATEGORIES_BY_COACH[coachType] : [];
  const specialities = category ? SPECIALITIES_BY_CATEGORY[category] ?? [] : [];

  useEffect(() => {
    setCategory("");
    setSpeciality("");
  }, [coachType]);
  useEffect(() => {
    setSpeciality("");
  }, [category]);

  // ===== Pricing math (same as add form) =====
  const offerNum = parseFloat(offeredPrice || "0");
  const gstPctNum = parseFloat(gstPercent || "0");
  const baseFromInclusive = offerNum / (1 + gstPctNum / 100);
  const gstFromExclusive = (offerNum * gstPctNum) / 100;
  const finalFromExclusive = offerNum + gstFromExclusive;

  useEffect(() => {
    if (offeredPrice && gstPercent) {
      const offer = parseFloat(offeredPrice);
      const pct = parseFloat(gstPercent);
      if (isGstInclusive) {
        const gstVal = offer - offer / (1 + pct / 100);
        setGstAmount(gstVal.toFixed(2));
      } else {
        const gstVal = (offer * pct) / 100;
        setGstAmount(gstVal.toFixed(2));
      }
    } else {
      setGstAmount("");
    }
  }, [offeredPrice, gstPercent, isGstInclusive]);

  // ===== Icon: simple objectURL preview (same as Add) =====
  const onPickIcon = (file: File | null) => {
    setFormIconUrl((prevUrl) => {
      if (prevUrl && prevUrl.startsWith("blob:")) {
        try { URL.revokeObjectURL(prevUrl); } catch {}
      }
      if (!file) return "";
      if (!file.type || !file.type.startsWith("image/")) return "";
      try { return URL.createObjectURL(file); } catch { return ""; }
    });
  };
  const clearIcon = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    onPickIcon(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ===== Validation (same rules as Add form) =====
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!coachType) e.coachType = "Please select a coach type";
    if (!category) e.category = "Please select expertise";
    if (!speciality) e.speciality = "Please select a speciality";
    if (!serviceType) e.serviceType = "Please select a service type";
    if (!price || Number(price) <= 0) e.price = "Please enter a valid price";
    if (!offeredPrice || Number(offeredPrice) <= 0) e.offeredPrice = "Please enter a valid offered price";
    if (segmentLeaves.length === 0) e.segments = "Please select at least one segment";
    return e;
  };
  const hasErrors = (e: Record<string, string>) => Object.keys(e).length > 0;

  // ===== Confirm popup (same as Add) =====
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleSubmit = () => {
    const e = computeErrors();
    setErrors(e);
    setShowErrors(true);
    if (!hasErrors(e)) setConfirmOpen(true);
  };
  const handleConfirm = () => {
    setConfirmOpen(false);
    const payload = {
      id: item.id,
      coachType,
      category,
      speciality,
      title,
      description,
      icon: {
        fileName: iconFile?.name ?? "",
        original: iconSrc,
        square: iconSquareSrc,
        preview: formIconUrl,
      },
      serviceType,
      segments: segmentLeaves,
      pricing: {
        price: Number(price || 0),
        offerPrice: Number(offeredPrice || 0),
        gstPercent: Number(gstPercent || 0),
        gstInclusive: isGstInclusive,
        gstAmount: Number(gstAmount || 0),
        displayCalculated: Number(
          (
            isGstInclusive
              ? (isFinite(baseFromInclusive) ? baseFromInclusive : 0)
              : (isFinite(finalFromExclusive) ? finalFromExclusive : 0)
          ).toFixed(2)
        ),
        standard: standardPercent ? Number(standardPercent) : "",
        premium: premiumPercent ? Number(premiumPercent) : "",
      },
      status: isActive ? "active" : "inactive",
    };
    console.log("UPDATE Pool Session (confirm):", payload);
    onClose();
  };
  const handleCancelConfirm = () => setConfirmOpen(false);

  return (
    <div className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-sm flex justify-end">
      {/* Right Drawer */}
      <div className="relative bg-[var(--background)] shadow-xl h-full w-full max-w-[900px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
              Edit Expertise — {item.id}
            </CardTitle>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 text-[var(--text)] overflow-y-auto p-4 space-y-4">
          {/* Coach Type */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Coach Type <span className="text-[var(--red)]">*</span></Label>
            <Select value={coachType} onValueChange={(v) => setCoachType(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Coach Type" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {coachTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.coachType && (
              <p className="text-xs text-red-600">{errors.coachType}</p>
            )}
          </div>

          {/* Category (Expertise) */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Expertise <span className="text-[var(--red)]">*</span></Label>
            <Select value={category} onValueChange={setCategory} disabled={!coachType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.category && (
              <p className="text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Specialities */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Specialities <span className="text-[var(--red)]">*</span></Label>
            <Select value={speciality} onValueChange={setSpeciality} disabled={!category}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Speciality" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {specialities.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.speciality && (
              <p className="text-xs text-red-600">{errors.speciality}</p>
            )}
          </div>

          {/* Title (optional) */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Title (optional)</Label>
            <Input
              className="w-full"
              placeholder="e.g., Stream Selection"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description (optional) */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Description (optional)</Label>
            <Input
              className="w-full"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Icon (with X) */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text)]">
              Icon (optional)
            </label>

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
                <div>
                  {formIconUrl ? (
                    <div className="relative inline-block pointer-events-none">
                      <img
                        src={formIconUrl}
                        alt="icon"
                        className="h-16 w-16 rounded-md object-cover shadow-sm pointer-events-none"
                      />
                      {/* X button */}
                      <button
                        type="button"
                        aria-label="Remove icon"
                        onClick={clearIcon}
                        className="pointer-events-auto absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-white text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[var(--brand-color)] hover:text-white transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <ImagePlus className="h-10 w-10 text-[var(--text)]/50" />
                  )}
                </div>

                <p className="text-sm text-[var(--text)]">
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

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickIcon(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Service Type */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Service Type <span className="text-[var(--red)]">*</span></Label>
            <Select value={serviceType} onValueChange={(v) => setServiceType(v as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Service Type" />
              </SelectTrigger>
              <SelectContent side="bottom" className="z-[9999]">
                {serviceTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.serviceType && (
              <p className="text-xs text-red-600">{errors.serviceType}</p>
            )}
          </div>

          {/* ===== PRICING ===== */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label>Price <span className="text-[var(--red)]">*</span></Label>
              <SuffixInput value={price} onChange={setPrice} placeholder="Enter Price" suffix="₹" />
              {showErrors && errors.price && (
                <p className="text-xs text-red-600">{errors.price}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label>Offered Price <span className="text-[var(--red)]">*</span></Label>
              <SuffixInput value={offeredPrice} onChange={setOfferedPrice} placeholder="Enter Offered price" suffix="₹" />
              {showErrors && errors.offeredPrice && (
                <p className="text-xs text-red-600">{errors.offeredPrice}</p>
              )}
            </div>
          </div>

          {/* GST + Toggle in same row (matches Add) */}
          <div className="flex gap-4 w-full items-end">
            <div className="flex-1 flex flex-col gap-2">
              <Label>GST</Label>
              <Select value={gstPercent} onValueChange={setGstPercent}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select GST %" />
                </SelectTrigger>
                <SelectContent side="bottom" className="z-[9999]">
                  {["0","5","12","18","28"].map((v) => (
                    <SelectItem key={v} value={v}>{v}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label className="mb-2 block">GST</Label>
              <div className="inline-flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsGstInclusive(false)}
                  className={`text-sm ${!isGstInclusive ? "text-[var(--text-head)]" : "text-[var(--text)]/60"}`}
                >
                  Exclusive
                </button>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isGstInclusive}
                    onChange={() => setIsGstInclusive(!isGstInclusive)}
                    aria-checked={isGstInclusive}
                    role="switch"
                  />
                  <div className="relative h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-[var(--brand-color)] peer-checked:[&>span]:translate-x-[20px]">
                    <span className="absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out" />
                  </div>
                </label>
                <button
                  type="button"
                  onClick={() => setIsGstInclusive(true)}
                  className={`text-sm ${isGstInclusive ? "text-[var(--text-head)]" : "text-[var(--text)]/60"}`}
                >
                  Inclusive
                </button>
              </div>
            </div>
          </div>

          {/* Calculated field */}
          <div className="flex flex-col gap-2 w-full">
            <Label>{isGstInclusive ? "Price (without GST)" : "Price (with GST)"}</Label>
            <Input
              className="w-full bg-[var(--faded)]"
              readOnly
              value={
                isGstInclusive
                  ? (isFinite(baseFromInclusive) ? baseFromInclusive : 0).toFixed(2)
                  : (isFinite(finalFromExclusive) ? finalFromExclusive : 0).toFixed(2)
              }
              placeholder={isGstInclusive ? "Base amount" : "Final amount"}
            />
          </div>

          {/* Partner Fees */}
          <p className="font-bold pt-2">Partner Fees</p>
          <div className="flex gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <Label>Standard</Label>
              <SuffixInput value={standardPercent} onChange={setStandardPercent} placeholder="20" suffix="%" min={0} max={100} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Label>Premium</Label>
              <SuffixInput value={premiumPercent} onChange={setPremiumPercent} placeholder="12" suffix="%" min={0} max={100} />
            </div>
          </div>

          {/* Segments (closed by default + error) */}
          <div className="space-y-1">
            <div className="text-sm text-[var(--text-head)]">Segments <span className="text-red-500">*</span></div>
            <SegmentStaticPicker
              tree={(Array.isArray(segments) && segments.length ? (segments as unknown as SegmentItem[]) : SEGMENTS_DATA)}
              value={segmentLeaves}
              onChange={setSegmentLeaves}
              openAllByDefault={false}
            />
            {showErrors && errors.segments && (
              <p className="mt-1 text-xs text-red-600">{errors.segments}</p>
            )}
          </div>

          {/* Status (Switch) */}
          <div className="space-y-1">
            <label className="text-sm text-[var(--text-head)]">Status</label>
            <div className="flex items-center gap-3">
              <Switch id="specialty-active" checked={isActive} onCheckedChange={setIsActive} />
              <span className="text-sm text-[var(--text)]">{isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t flex justify-between gap-4 bg-[var(--background)]">
          <Button variant="border" onClick={onClose}>Cancel</Button>
          <div className="flex items-center gap-4">
            {showErrors && hasErrors(errors) && (
              <span className="text-sm text-red-600">
                Please fix the highlighted fields before saving.
              </span>
            )}
            <Button variant="brand" onClick={handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </div>

      {/* Confirmation popup (same component) */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        heading="Save changes to this session?"
        description="This will update the session with the details you’ve entered."
        confirmText="Save Changes"
        cancelText="Cancel"
      />
    </div>
  );
}

