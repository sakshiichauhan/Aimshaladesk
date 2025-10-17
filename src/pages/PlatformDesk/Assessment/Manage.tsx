import { Button } from "@/components/ui/button";
import {
  Filter,
  BadgeQuestionMark,
  Bell,
  Notebook,
  Plus,
  Search,
  Pencil,
  FileDown,
  X,
  FileText,
  BarChart3,
  Trash2,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";

// Add custom scrollbar styles
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--text);
  }
`;
import type { DateRange } from "react-day-picker";
import React, { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCategory,
  deleteCategory,
  updateCategory,
  fetchCategories,
  selectGeneralCategories,
} from "@/store/slices/platformDesk/categoriesThunk";
import {
  fetchManageAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
} from "@/store/slices/platformDesk/ManageThunk";
import {
  selectManageAssessments,
  selectManageAssessmentsLoading,
  selectManageAssessmentsError,
  selectSegments,
} from "@/store/slices/platformDesk/assessmentSlice";
import type { AppDispatch } from "@/store";
import { fetchSegments } from "@/store/slices/platformDesk/segmentThunk";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, BreadcrumbSeparator, Breadcrumb } from "@/components/ui/breadcrumb";
import { ConfirmModal } from "@/components/PopupConfirm";
import { toast } from "sonner";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";


type SegmentItem = {
  id: string;
  label: string;
  children?: SegmentItem[];
};

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
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onToggle} />
      <button type="button" onClick={onToggle} className="text-sm">
        {item.label}
      </button>
    </div>
  );
}

function SegmentStaticPicker({
  tree,
  value,
  onChange,
  openAllByDefault = true,
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
    const newValue = [...next];
    console.log("SegmentStaticPicker - toggleLeaf - new value:", newValue);
    onChange(newValue);
  };

  /* Toggle a parent checkbox: select/deselect ALL descendant leaves */
  const toggleParent = (parentId: string, checked: boolean) => {
    const leafIds = leafIdsByParent.get(parentId) || [];
    const next = new Set(selected);
    leafIds.forEach((id) => {
      if (checked) next.add(id);
      else next.delete(id);
    });
    const newValue = [...next];
    console.log("SegmentStaticPicker - toggleParent - new value:", newValue);
    onChange(newValue);
  };

  const ParentRow: React.FC<{
    item: SegmentItem;
    depth: number;
    childrenContent: React.ReactNode;
  }> = ({ item, depth, childrenContent }) => {
    const isOpen = !!open[item.id];
    const leafIds = leafIdsByParent.get(item.id) || [];
    const selectedCount = leafIds.filter((id) => selected.has(id)).length;
    const isChecked = selectedCount === leafIds.length && leafIds.length > 0;
    const isIndeterminate = selectedCount > 0 && selectedCount < leafIds.length;

    return (
      <div style={{ marginLeft: depth * INDENT }} className="mb-3">
        {/* header box (same design) */}
        <div className="inline-flex items-center gap-2 rounded border bg-white px-3 py-1.5 w-full">
          <button
            type="button"
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.label}`}
            className="grid h-6 w-6 place-items-center rounded hover:bg-muted/80"
            onClick={() => toggleOpen(item.id)}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="text-sm"
            onClick={() => toggleOpen(item.id)}
            aria-label={`Toggle ${item.label} section`}
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






export function Manage() {
  const dispatch = useDispatch<AppDispatch>();

  // Get manage assessments from Redux store using selectors
  const manageAssessments = useSelector(selectManageAssessments);
  const loading = useSelector(selectManageAssessmentsLoading);
  const error = useSelector(selectManageAssessmentsError);
  const categories = useSelector(selectGeneralCategories);
  const segments = useSelector(selectSegments);
  // const segmentsLoading = useSelector(selectSegmentsLoading);
  // const segmentsError = useSelector(selectSegmentsError);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch categories and manage assessments on component mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchManageAssessments());
    dispatch(fetchSegments());
  }, [dispatch]);

  // Categories and manage assessments are fetched on mount; other components in this file read from the store directly

  // Show loading skeleton like in Assessments.tsx
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {/* Skeleton for the top bar */}
        <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
          <div className="h-6 w-48 bg-[var(--faded)] rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-[var(--faded)] rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton for the stat cards */}
        <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4 rounded-sm bg-[var(--background)]">
                <div className="h-4 w-24 bg-[var(--faded)] rounded animate-pulse mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 bg-[var(--faded)] rounded-full animate-pulse"></div>
                  <div className="h-6 w-12 bg-[var(--faded)] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
        </div>

        {/* Skeleton for the table */}
        <div className="rounded-md border bg-[var(--background)] overflow-x-auto">
          {/* Table header skeleton */}
          <div className="flex items-center justify-between border-b h-20 p-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-[var(--faded)] rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-[var(--faded)] rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-40 bg-[var(--faded)] rounded animate-pulse"></div>
          </div>

          {/* Table skeleton */}
          <div className="p-4">
            <div className="space-y-4">
              {/* Table header row skeleton */}
              <div className="grid grid-cols-8 gap-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-6 bg-[var(--faded)] rounded animate-pulse"
                    ></div>
                  ))}
              </div>

              {/* Table body rows skeleton */}
              {Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-8 gap-4">
                    {Array(8)
                      .fill(0)
                      .map((_, colIndex) => (
                        <div
                          key={colIndex}
                          className="h-12 bg-[var(--faded)] rounded animate-pulse"
                        ></div>
                      ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Pagination skeleton */}
          <div className="flex items-center justify-between p-4">
            <div className="h-8 w-24 bg-[var(--faded)] rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"
                  ></div>
                ))}
              <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Topbar
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          categories={categories}
          segments={segments}
        />
        <StatsCards manageAssessments={manageAssessments} />
        <TableSection
          selectedCategories={selectedCategories}
          manageAssessments={manageAssessments}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}








function Topbar({
  selectedCategories,
  onCategoryChange,
  categories,
  segments,
}: {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  categories: any[];
  segments: any[];
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const availableCategories = categories.map((c) => c.name).sort();
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Assessments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Manage</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="brand" size="new" onClick={() => setShowForm(true)}>
          <Plus className="h-3 w-3" />
        </Button>
        {showForm && <CreateAssessmentForm onClose={() => setShowForm(false)} />}

        <div className="flex gap-4 flex-wrap">
          <Button
            variant="standard"
            size="new"
            onClick={() => setIsCategorySheetOpen(true)}
          >
            <BadgeQuestionMark className="h-3 w-3" />
            <span className="">Categories</span>
          </Button>
          {isCategorySheetOpen && (
            <CategoryPopup
              onClose={() => setIsCategorySheetOpen(false)}
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              availableCategories={availableCategories}
            />
          )}
          <Button variant="standard" size="new">
            <FileDown className="h-3 w-3" />
          </Button>
          <Button
            variant="standard"
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 self-end min-h-[40px]"
          >
            <Filter className="h-4 w-4" />
          </Button>
          {showFilter && (
            <AdvancedFilters
              onClose={() => setShowFilter(false)}
              segments={segments}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface FilterProps {
  onClose: () => void;
  segments: any[];
}

function AdvancedFilters({ onClose, segments }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Search");

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
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("");
  const [source, setSource] = useState("Direct");
  const [status, setStatus] = useState("Not Started");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const tabList = ["Search", "Date Range", "Segment", "Source", "Status"];

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
            onClick={() => {
              setSearch("");
              setSegment("");
              setSource("Direct");
              setStatus("Not Started");
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
            {activeTab === "Search" && (
              <>
                <label htmlFor="search" className="text-[var(--text)]">
                  Search (by Name, ID, Assessment, Code):
                </label>
                <Input
                  id="search"
                  placeholder="Enter search query..."
                  type="text"
                  className="mt-4 w-full "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range:
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </>
            )}

            {activeTab === "Segment" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Segment:
                </p>
                <div className="mt-4">
                  <Select value={segment} onValueChange={setSegment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Segments</SelectItem>
                      {segments.map((segmentOption) => (
                        <SelectItem
                          key={segmentOption.name}
                          value={segmentOption.name}
                        >
                          {segmentOption.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {activeTab === "Source" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select Source:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Direct", "Partners"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={source === option}
                        onCheckedChange={() => setSource(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Choose Status:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Not Started", "In Progress", "Completed"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={status === option}
                        onCheckedChange={() => setStatus(option)}
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

function StatsCards({ manageAssessments }: { manageAssessments: any[] }) {
  const totalAssessments = manageAssessments.length;
  const publishedAssessments = manageAssessments.filter(
    (item) => item.status === "Active"
  ).length;
  const draftAssessments = manageAssessments.filter(
    (item) => item.status === "Draft"
  ).length;

  const dynamicStats = [
    {
      title: "Total Assessments",
      value: totalAssessments.toString(),
      icon: Notebook,
    },
    {
      title: "Published",
      value: publishedAssessments.toString(),
      icon: Notebook,
    },
    {
      title: "Drafts",
      value: draftAssessments.toString(),
      icon: Notebook,
    },
  ];

  return (
    <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-3">
      {dynamicStats.map((stat, index) => (
        <Card
          key={index}
          className="xl:rounded-sm shadow-none bg-[var(--background)]"
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

interface TableSectionProps {
  selectedCategories: string[];
  manageAssessments: any[];
  loading: boolean;
  error: string | null;
}

function TableSection({
  selectedCategories,
  manageAssessments,
  loading,
  error,
}: TableSectionProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof manageAssessments>(
    []
  );
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<{
    id: string;
    assessmentName: string;
    segments: string[];
    segmentIds: string[];
    category: string;
    price: number;
    partnerShare: string;
    enrollments: number;
    status: string;
  } | null>(null);

  // Note: Category popup moved to Topbar. No need to read categories here.

  // All the useEffect hooks and other logic that were originally here
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

  // Initialize selectedStack when manageAssessments loads
  useEffect(() => {
    if (manageAssessments.length > 0 && selectedStack.length === 0) {
      setSelectedStack([manageAssessments[0]]);
      setFocusedId(manageAssessments[0].id);
    }
  }, [manageAssessments, selectedStack.length]);

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

  const handleRowClick = (user: (typeof manageAssessments)[0]) => {
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

  const handleFormClose = () => {
    setShowForm(false);
    setEditData(null);
  };

  // Show loading or error states AFTER all hooks are declared
  if (loading) {
    return (
      <div className="flex-1 rounded-md border bg-[var(--background)] p-8 text-center">
        <div className="text-[var(--text)]">Loading assessments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 rounded-md border bg-[var(--background)] p-8 text-center">
        <div className="text-[var(--red)]">Error: {error}</div>
      </div>
    );
  }

  // Filter and sort data
  let filteredData = [...manageAssessments];

  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredData = filteredData.filter((item) =>
      selectedCategories.includes(item.category)
    );
  }

  // Apply sorting
  if (sortConfig !== null) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key as keyof typeof a];
      let bValue = b[sortConfig.key as keyof typeof b];
      // Special handling for 'segments' (array), 'price', 'enrollments' (numbers)
      if (sortConfig.key === "segments") {
        aValue = Array.isArray(aValue) ? aValue.join(", ") : aValue;
        bValue = Array.isArray(bValue) ? bValue.join(", ") : bValue;
      }
      if (sortConfig.key === "price" || sortConfig.key === "enrollments") {
        aValue = Number(aValue);
        bValue = Number(bValue);
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

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
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
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentRecords.map((user) => user.id));
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      {showForm && editData && (
        <EditAssessmentForm
          onClose={handleFormClose}
          editData={editData}
        />
      )}
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-campaigns"
                checked={
                  selectedUsers.length === currentRecords.length &&
                  currentRecords.length > 0
                }
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
            )}
          </div>

          {/* Search Bar */}
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
        {/* Table UI */}
        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("assessmentName")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Assessment Name{" "}
                  {sortConfig?.key === "assessmentName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("segments")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Segments{" "}
                  {sortConfig?.key === "segments" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)]">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[var(--brand-color)] transition-colors">
                    <span>Category</span>
                  </div>
                  {sortConfig?.key === "category" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("price")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Price (₹){" "}
                  {sortConfig?.key === "price" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("discountedPrice")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Discounted Price (₹){" "}
                  {sortConfig?.key === "discountedPrice" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("partnerShare")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Partner Share{" "}
                  {sortConfig?.key === "partnerShare" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("enrollments")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  <div
                    className="fl
                  ex items-center gap-2"
                  >
                    Enrollments
                  </div>
                  {sortConfig?.key === "enrollments" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">
                  Actions
                </TableHead>
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
                          <div className="font-medium">
                            {user.assessmentName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      {Array.isArray(user.segments)
                        ? user.segments.join(", ")
                        : user.segments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.category}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">₹{user.price}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">₹{user.discountedPrice}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.partnerShare}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-low">{user.enrollments}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--brand-color2)] hover:text-[var(--brand-color)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`${user.guid || user.id}`);
                              }}
                            >
                              <FileText className="h-3 w-3" />
                              <span className="sr-only">Questions</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Questions
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--green2)] hover:text-[var(--green)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <BarChart3 className="h-3 w-3" />
                              <span className="sr-only">Results</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Results
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--blue2)] hover:text-[var(--blue)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle Edit action - prepare data for form
                                const assessmentData = {
                                  id: user.id,
                                  assessmentName: user.assessmentName,
                                  segments: Array.isArray(user.segments)
                                    ? user.segments
                                    : user.segments.split(", "),
                                  segmentIds: user.segmentIds || [],
                                  category: user.category,
                                  price: user.price,
                                  partnerShare: user.partnerShare,
                                  enrollments: user.enrollments,
                                  status: user.status,
                                };
                                setEditData(assessmentData);
                                setShowForm(true);
                              }}
                            >
                              <Pencil className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Edit
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle Delete action
                                if (
                                  confirm(
                                    `Are you sure you want to delete "${user.assessmentName}"?`
                                  )
                                ) {
                                  dispatch(deleteAssessment(user.id));
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Delete
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
              {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
              {filteredData.length} assessments
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
                className={`h-8 w-8 p-0 ${page === currentPage ? "text-white" : "text-[var(--text)]"
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









interface CategoryPopupProps {
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  availableCategories: string[];
}

function CategoryPopup({
  onClose,
  selectedCategories,
  onCategoryChange,
  availableCategories,
}: CategoryPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectGeneralCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    status: string;
  } | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryStatus, setEditCategoryStatus] = useState("1");

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInside = path.some((el) => {
      if (!(el instanceof Node)) return false;
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement &&
          el.getAttribute("data-radix-popper-content-wrapper") !== null)
      );
    });

    if (!clickedInside) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const filteredCategories = availableCategories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryToggle = (category: string) => {
    if (category === "All Categories") {
      onCategoryChange([]);
    } else {
      const newSelectedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      onCategoryChange(newSelectedCategories);
    }
  };

  const isAllCategoriesSelected = selectedCategories.length === 0;

  const handleAddCategory = async () => {
    const title = newCategoryName.trim();
    if (!title || availableCategories.includes(title)) return;
    try {
      await dispatch(saveCategory({ title, status: "1" }));
      setNewCategoryName("");
      setShowAddCategory(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (category: string) => {
    try {
      // Find the category ID from the categories list
      const categoryToDelete = categories.find((c) => c.name === category);
      if (!categoryToDelete) {
        console.error("Category not found:", category);
        return;
      }

      // Show confirmation dialog
      if (
        confirm(`Are you sure you want to delete the category "${category}"?`)
      ) {
        await dispatch(deleteCategory(categoryToDelete.id));

        // Remove from selected categories if it was selected
        if (selectedCategories.includes(category)) {
          onCategoryChange(selectedCategories.filter((c) => c !== category));
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (category: string) => {
    const categoryToEdit = categories.find((c) => c.name === category);
    if (categoryToEdit) {
      setEditingCategory({
        id: categoryToEdit.id,
        name: categoryToEdit.name,
        status: "1", // Default status
      });
      setEditCategoryName(categoryToEdit.name);
      setEditCategoryStatus("1");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editCategoryName.trim()) return;

    try {
      await dispatch(
        updateCategory({
          id: editingCategory.id,
          title: editCategoryName.trim(),
          status: editCategoryStatus,
        })
      );
      setEditingCategory(null);
      setEditCategoryName("");
      setEditCategoryStatus("1");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName("");
    setEditCategoryStatus("1");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40  flex justify-end">
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyles }} />
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-2xl h-full w-full max-w-[700px] flex flex-col border-l border-[var(--border)]"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Select Categories
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="border"
              size="sm"
              onClick={() => setShowAddCategory(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label>Search Categories</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text)]" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Add Category Modal */}
          {showAddCategory && (
            <Card className="p-4 border border-[var(--border)] bg-[var(--background)]">
              <div className="flex flex-col gap-2 pt-0">
              <CardTitle className="text-lg font-semibold text-[var(--text)]">
                  Add New Category
                </CardTitle>
                <hr />
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-[var(--text)]">Category Name</Label>
                  <Input
                    placeholder="Enter category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddCategory();
                      }
                    }}
                  />
                  {newCategoryName.trim() &&
                    availableCategories.includes(newCategoryName.trim()) && (
                      <p className="text-xs text-[var(--red)]">
                        Category already exists
                      </p>
                    )}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="border"
                    size="sm"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="brand"
                    size="sm"
                    onClick={handleAddCategory}
                    disabled={
                      !newCategoryName.trim() ||
                      availableCategories.includes(newCategoryName.trim())
                    }
                  >
                    Add Category
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Edit Category Modal */}
          {editingCategory && (
            <Card className="p-4 border border-[var(--border)] bg-[var(--background)]">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-lg font-semibold text-[var(--text-head)]">
                  Edit Category
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Category Name</Label>
                  <Input
                    placeholder="Enter category name..."
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editCategoryStatus === "1"}
                        onCheckedChange={(checked) =>
                          setEditCategoryStatus(checked ? "1" : "0")
                        }
                      />
                      <span className="text-sm">
                        {editCategoryStatus === "1" ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="border"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="brand"
                        size="sm"
                        onClick={handleUpdateCategory}
                        disabled={!editCategoryName.trim()}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="flex flex-col gap-2">
            <Label>Quick Selection</Label>
            <div
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${isAllCategoriesSelected
                  ? "bg-[var(--brand-color3)] border-[var(--brand-color)]"
                  : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--faded)]"
                }`}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <Checkbox
                  checked={isAllCategoriesSelected}
                  onCheckedChange={() => handleCategoryToggle("All Categories")}
                  className="text-[var(--brand-color)] focus:ring-[var(--brand-color)] border-[var(--border)]"
                />
                <div className="flex-1">
                  <div className="font-medium text-[var(--text)]">
                    All Categories
                  </div>
                  <div className="text-xs text-[var(--text)]">
                    Show all assessments
                  </div>
                </div>
                <Badge variant="standard" className="text-xs">
                  All
                </Badge>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Available Categories</Label>
            <div className="space-y-2  overflow-y-auto pr-2 custom-scrollbar">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-[var(--text)] opacity-60">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No categories found</p>
                  <p className="text-xs">Try adjusting your search</p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div
                    key={category}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${selectedCategories.includes(category)
                        ? "bg-[var(--brand-color3)] border-[var(--brand-color)]"
                        : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--faded)]"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          className="text-[var(--brand-color)] focus:ring-[var(--brand-color)] border-[var(--border)]"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-[var(--text)]">
                            {category}
                          </div>
                        </div>
                        <Badge
                          variant={
                            selectedCategories.includes(category)
                              ? "standard"
                              : "border"
                          }
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      </label>

                      {/* Edit and Delete Icons - Only show when category is selected */}
                      {selectedCategories.includes(category) && (
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="noborder"
                                  size="sm"
                                  className="hover:bg-[var(--blue2)] hover:text-[var(--blue)] transition-all duration-200 p-1 rounded-md"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditCategory(category);
                                  }}
                                >
                                  <Pencil className="h-3 w-3" />
                                  <span className="sr-only">Edit Category</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                Edit Category
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="noborder"
                                  size="sm"
                                  className="hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200 p-1 rounded-md"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCategory(category);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">
                                    Delete Category
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                Delete Category
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="brand" onClick={onClose}>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
}







interface CreateAssessmentFormProps {
  onClose: () => void;
}

interface EditAssessmentFormProps {
  onClose: () => void;
  editData: {
    id: string;
    assessmentName: string;
    segments: string[]; // Segment titles for display
    segmentIds: string[]; // Segment IDs for editing
    category: string;
    price: number;
    partnerShare: string;
    enrollments: number;
    status: string;
  };
}

function CreateAssessmentForm({ onClose }: CreateAssessmentFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const segments = useSelector(selectSegments);
  const categories = useSelector(selectGeneralCategories);
  const availableCategories = categories.map((c) => c.name).sort();

  const [assessmentName, setAssessmentName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [sShare, setSShare] = useState("20");
  const [pShare, setPShare] = useState("12");
  const [isActive, setIsActive] = useState(true);
  const [gstPercent, setGstPercent] = useState("18");
  const [gstAmount, setGstAmount] = useState("");
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  const [segmentLeaves, setSegmentLeaves] = useState<string[]>([]);

  // Debug: Log when segmentLeaves changes
  

  // --- Validation state (expanded)
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Confirm popup (Publish)
  const [confirmOpen, setConfirmOpen] = useState(false);

  // --- GST calculation (kept)
  useEffect(() => {
    if (offerPrice && gstPercent) {
      const offer = parseFloat(offerPrice);
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
  }, [offerPrice, gstPercent, isGstInclusive]);

  // --- Derived values for display-only
  const offerNum = parseFloat(offerPrice || "0");
  const gstPctNum = parseFloat(gstPercent || "0");
  const baseFromInclusive = offerNum / (1 + gstPctNum / 100);
  const gstFromExclusive = (offerNum * gstPctNum) / 100;
  const finalFromExclusive = offerNum + gstFromExclusive;

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as EventTarget[];
    const clickedInside = path.some((el) => {
      if (!(el instanceof Node)) return false;
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement &&
          el.getAttribute("data-radix-popper-content-wrapper") !== null)
      );
    });
    if (!clickedInside) onClose();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!assessmentName.trim()) e.assessmentName = "Please enter assessment name";
    if (segmentLeaves.length === 0) e.segments = "Please select at least one segment";
    if (!category) e.category = "Please select a category";
    if (!price || Number(price) <= 0) e.price = "Please enter a valid price";
    if (!offerPrice || Number(offerPrice) <= 0) e.offerPrice = "Please enter a valid offer price";
    return e;
  };
  const hasErrors = (em: Record<string, string>) => Object.keys(em).length > 0;

  // Publish → validate → confirm
  const handlePublishClick = () => {
    const em = computeErrors();
    setErrors(em);
    setShowErrors(true);
    if (!hasErrors(em)) setConfirmOpen(true);
  };

  const handleConfirmPublish = async () => {
    console.log("🚀 handleConfirmPublish - Starting assessment creation...");
    setConfirmOpen(false);
    
    try {
      // Find category ID from category name
      const selectedCategory = categories.find((c) => c.name === category);
      const categoryId = selectedCategory?.id?.toString() || "1";

      console.log("📝 Form Data:");
      console.log("  - Assessment Name:", assessmentName);
      console.log("  - Category:", category, "-> ID:", categoryId);
      console.log("  - Segment Leaves:", segmentLeaves);
      console.log("  - Price:", price);
      console.log("  - Offer Price:", offerPrice);
      console.log("  - GST Amount:", gstAmount);
      console.log("  - GST Percent:", gstPercent);
      console.log("  - Standard Share:", sShare);
      console.log("  - Premium Share:", pShare);
      console.log("  - Is Active:", isActive);

      const assessmentData = {
        assesment_name: assessmentName,
        segment_id: segmentLeaves.map(id => id.toString()),
        assesment_category_id: categoryId,
        price: price,
        offer_price: offerPrice,
        gst_amount: gstAmount,
        gst_percentage: gstPercent,
        partner_share_std: sShare,
        partner_share_pre: pShare,
        status: isActive ? 1 : 0 
      };
      
      console.log("📦 Final API Payload:", JSON.stringify(assessmentData, null, 2));
      console.log("🔄 Dispatching createAssessment thunk...");
      
      const result = await dispatch(createAssessment(assessmentData));
      
      console.log("📨 Dispatch result:", result);
      console.log("📊 Result type:", result.type);
      console.log("📋 Result payload:", result.payload);
      
      if (createAssessment.fulfilled.match(result)) {
        console.log("✅ Assessment created successfully!");
        toast.success("Assessment created successfully!", {
          description: `${assessmentName} has been published.`,
        });
        onClose();
      } else if (createAssessment.rejected.match(result)) {
        console.error("❌ Assessment creation rejected:", result.payload);
        toast.error("Failed to create assessment", {
          description: result.payload as string || "An error occurred while creating the assessment.",
        });
      } else {
        console.warn("⚠️ Unexpected result state:", result);
        toast.error("Failed to create assessment", {
          description: "An unexpected error occurred.",
        });
      }
    } catch (error) {
      console.error("💥 Exception in handleConfirmPublish:", error);
      toast.error("Failed to create assessment", {
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    }
  };

  const handleCancelConfirm = () => setConfirmOpen(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
            Create Assessment
          </CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          {/* Assessment Name */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">
              Assessment Name <span className="text-xs text-[var(--red)]">*</span>
            </Label>
            <Input
              placeholder="e.g., JEE Main Mock Test 1"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
            />
            {showErrors && errors.assessmentName && (
              <p className="text-xs text-red-600">{errors.assessmentName}</p>
            )}
          </div>

          {/* Segments */}
          <div className="space-y-1">
            <div className="text-sm text-[var(--text-head)]">
              Segments <span className="text-xs text-[var(--red)]">*</span>
            </div>
            <SegmentStaticPicker
              tree={(segments as unknown as SegmentItem[]) || []}
              value={segmentLeaves}
              onChange={setSegmentLeaves}
              openAllByDefault={false}
            />
            {showErrors && errors.segments && (
              <p className="mt-1 text-xs text-red-600">{errors.segments}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">
              Category <span className="text-xs text-[var(--red)]">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.category && (
              <p className="text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          {/* ===== PRICING ===== */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Price (₹)</Label>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Price <span className="text-xs text-[var(--red)]">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {showErrors && errors.price && (
                  <p className="text-xs text-red-600">{errors.price}</p>
                )}
              </div>
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Offer Price <span className="text-xs text-[var(--red)]">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Offer Price"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
                {showErrors && errors.discountedPrice && (
                  <p className="text-xs text-red-600">{errors.discountedPrice}</p>
                )}
              </div>
            </div>

            {/* GST % + Toggle */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  GST
                </Label>
                <Select value={gstPercent} onValueChange={setGstPercent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
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
                      onChange={(e) => setIsGstInclusive(e.target.checked)}
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
          </div>
          {/* ===== END PRICING ===== */}

          {/* Partner Fee */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Partner Fee</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm  text-muted-foreground mb-2 font-normal">
                  Standard
                </Label>
                <Input
                  type="number"
                  placeholder="20"
                  value={sShare}
                  onChange={(e) => setSShare(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Premium
                </Label>
                <Input
                  type="number"
                  placeholder="12"
                  value={pShare}
                  onChange={(e) => setPShare(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status</Label>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <Label className="font-normal">Active Status</Label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-color)]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {/* Draft (unchanged; validates segments only and forces status: 0) */}
            <Button
              variant="brand"
              disabled={
                !assessmentName ||
                !category ||
                !price
              }
              onClick={async () => {
                console.log("💾 Draft button clicked");
                
                if (segmentLeaves.length === 0) {
                  console.warn("⚠️ No segments selected");
                  setErrors({ segments: "Please select at least one segment" });
                  setShowErrors(true);
                  return;
                }
                
                setErrors({});
                setShowErrors(false);
                
                try {
                  // Find category ID from category name
                  const selectedCategory = categories.find((c) => c.name === category);
                  const categoryId = selectedCategory?.id?.toString() || "1";

                  console.log("📝 Draft Form Data:");
                  console.log("  - Assessment Name:", assessmentName);
                  console.log("  - Category:", category, "-> ID:", categoryId);
                  console.log("  - Segment Leaves:", segmentLeaves);

                  const assessmentData = {
                    assesment_name: assessmentName,
                    segment_id: segmentLeaves.map(id => id.toString()),
                    assesment_category_id: categoryId,
                    price: price,
                    offer_price: offerPrice,
                    gst_amount: gstAmount,
                    gst_percentage: gstPercent,
                    partner_share_std: sShare,
                    partner_share_pre: pShare,
                    status: 0, // draft
                  };
                  
                  console.log("📦 Draft API Payload:", JSON.stringify(assessmentData, null, 2));
                  console.log("🔄 Dispatching createAssessment thunk (Draft)...");
                  
                  const result = await dispatch(createAssessment(assessmentData));
                  
                  console.log("📨 Draft result:", result);
                  
                  if (createAssessment.fulfilled.match(result)) {
                    console.log("✅ Draft saved successfully!");
                    toast.success("Draft saved successfully!", {
                      description: `${assessmentName} has been saved as draft.`,
                    });
                    onClose();
                  } else if (createAssessment.rejected.match(result)) {
                    console.error("❌ Draft save rejected:", result.payload);
                    toast.error("Failed to save draft", {
                      description: result.payload as string || "An error occurred while saving the draft.",
                    });
                  } else {
                    console.warn("⚠️ Unexpected draft result state:", result);
                    toast.error("Failed to save draft", {
                      description: "An unexpected error occurred.",
                    });
                  }
                } catch (error) {
                  console.error("💥 Exception in Draft handler:", error);
                  toast.error("Failed to save draft", {
                    description: error instanceof Error ? error.message : "An unexpected error occurred.",
                  });
                }
              }}
            >
              Draft
            </Button>

            {/* Publish (validate all required fields, then confirm) */}
            <Button
              variant="brand"
              onClick={handlePublishClick}
              disabled={
                !assessmentName ||
                !category ||
                !price
              }
            >
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation popup (same component as before) */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirmPublish}
        heading="Publish this assessment?"
        description="This will create the assessment and make it available based on the active status."
        confirmText="Publish"
        cancelText="Cancel"
      />
    </div>
  );
}


function EditAssessmentForm({ onClose, editData }: EditAssessmentFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Get segments from Redux store
  const segments = useSelector(selectSegments);

  const [assessmentName, setAssessmentName] = useState(editData.assessmentName);
  const [category, setCategory] = useState(editData.category);
  const [price, setPrice] = useState(editData.price.toString());
  const [discountedPrice, setDiscountedPrice] = useState(editData.price.toString());
  const [sShare, setSShare] = useState(
    editData.partnerShare
      ?.split("|")[0]
      ?.trim()
      ?.replace("[S]", "")
      ?.replace("%", "") || ""
  );
  const [pShare, setPShare] = useState(
    editData.partnerShare
      ?.split("|")[1]
      ?.trim()
      ?.replace("[P]", "")
      ?.replace("%", "") || ""
  );
  const [isActive, setIsActive] = useState(editData.status === "Active");
  const [gstPercent, setGstPercent] = useState("18");
  const [gstAmount, setGstAmount] = useState("");
  const [isGstInclusive, setIsGstInclusive] = useState(true);
  const [segmentLeaves, setSegmentLeaves] = useState<string[]>(editData.segmentIds || []);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Debug: Log when segmentLeaves changes

  // --- GST calculation (kept for API payload), aligned with new display logic ---
  useEffect(() => {
    if (discountedPrice && gstPercent) {
      const offer = parseFloat(discountedPrice);
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
  }, [discountedPrice, gstPercent, isGstInclusive]);

  // --- Derived values for display-only (final calculated field) ---
  const offerNum = parseFloat(discountedPrice || "0");
  const gstPctNum = parseFloat(gstPercent || "0");
  const baseFromInclusive = offerNum / (1 + gstPctNum / 100);
  const gstFromExclusive = (offerNum * gstPctNum) / 100;
  const finalFromExclusive = offerNum + gstFromExclusive;

  const categories = useSelector(selectGeneralCategories);
  const availableCategories = categories.map((c) => c.name).sort();

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as EventTarget[];

    const clickedInside = path.some((el) => {
      if (!(el instanceof Node)) return false;
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement &&
          el.getAttribute("data-radix-popper-content-wrapper") !== null)
      );
    });

    if (!clickedInside) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Validation helper
  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!assessmentName.trim()) e.assessmentName = "Please enter assessment name";
    if (segmentLeaves.length === 0) e.segments = "Please select at least one segment";
    if (!category) e.category = "Please select a category";
    if (!price || Number(price) <= 0) e.price = "Please enter a valid price";
    if (!discountedPrice || Number(discountedPrice) <= 0) e.discountedPrice = "Please enter a valid offer price";
    return e;
  };
  const hasErrors = (em: Record<string, string>) => Object.keys(em).length > 0;

  const handleSubmit = async () => {
    const em = computeErrors();
    setErrors(em);
      setShowErrors(true);
    if (hasErrors(em)) return;

    try {
      // Find category ID from category name
      const selectedCategory = categories.find((c) => c.name === category);
      const categoryId = selectedCategory?.id?.toString() || "1";

      const assessmentData = {
        assesment_name: assessmentName,
        segment_id: segmentLeaves.map(id => id.toString()),
        assesment_category_id: categoryId,
        price: price,
        discounted_price: discountedPrice,
        gst_amount: gstAmount,
        gst_percentage: gstPercent,
        partner_share_std: sShare,
        partner_share_pre: pShare,
        status: isActive ? 1 : 0,
      };

      console.log("EditAssessmentForm - Updating assessment with data:", assessmentData);
      console.log("EditAssessmentForm - segment_id:", assessmentData.segment_id);

      const result = await dispatch(
        updateAssessment({
          id: editData.id,
          ...assessmentData,
        })
      );
      
      if (updateAssessment.fulfilled.match(result)) {
        toast.success("Assessment updated successfully!", {
          description: `${assessmentName} has been updated.`,
        });
        onClose();
      } else {
        toast.error("Failed to update assessment", {
          description: result.payload as string || "An error occurred while updating the assessment.",
        });
      }
    } catch (error) {
      console.error("Error updating assessment:", error);
      toast.error("Failed to update assessment", {
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
            Edit Assessment
          </CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Assessment Name <span className="text-xs text-[var(--red)]">*</span></Label>
            <Input
              placeholder="e.g., JEE Main Mock Test 1"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
            />
            {showErrors && errors.assessmentName && (
              <p className="text-xs text-red-600">{errors.assessmentName}</p>
            )}
          </div>

           <div className="space-y-1">
                    <div className="text-sm text-[var(--text-head)]">Segments <span className="text-xs text-[var(--red)]">*</span></div>
                    <SegmentStaticPicker
                      tree={(segments as unknown as SegmentItem[]) || []}
                      value={segmentLeaves}
                      onChange={setSegmentLeaves}
                      openAllByDefault={false}
                    />
                    {showErrors && errors.segments && (
                      <p className="mt-1 text-xs text-red-600">{errors.segments}</p>
                    )}
                  </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Category <span className="text-xs text-[var(--red)]">*</span></Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && errors.category && (
              <p className="text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          {/* ===== PRICING (UPDATED WORDING, TOGGLE POSITION, AND CALC) ===== */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Price (₹)</Label>

            {/* Price & Offer Price */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Price <span className="text-xs text-[var(--red)]">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {showErrors && errors.price && (
                  <p className="text-xs text-red-600">{errors.price}</p>
                )}
              </div>
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Offer Price <span className="text-xs text-[var(--red)]">*</span>
                </Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter Offer Price"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                />
                {showErrors && errors.discountedPrice && (
                  <p className="text-xs text-red-600">{errors.discountedPrice}</p>
                )}
              </div>
            </div>

            {/* GST % and Toggle (together) */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  GST
                </Label>
                <Select value={gstPercent} onValueChange={setGstPercent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
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
          </div>
          {/* ===== END PRICING ===== */}

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Partner Fee</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm  text-muted-foreground mb-2 font-normal">
                  Standard
                </Label>
                <Input
                  type="number"
                  placeholder="20"
                  value={sShare}
                  onChange={(e) => setSShare(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">
                  Premium
                </Label>
                <Input
                  type="number"
                  placeholder="12"
                  value={pShare}
                  onChange={(e) => setPShare(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Status</Label>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <Label className="font-normal">Active Status</Label>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-color)]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="brand"
              disabled={
                !assessmentName ||
                !category ||
                !price
              }
              onClick={async () => {
                const em = computeErrors();
                setErrors(em);
                setShowErrors(true);
                if (hasErrors(em)) return;

                try {
                  // Find category ID from category name
                  const selectedCategory = categories.find((c) => c.name === category);
                  const categoryId = selectedCategory?.id?.toString() || "1";

                  const assessmentData = {
                    assesment_name: assessmentName,
                    segment_id: segmentLeaves.map(id => id.toString()),
                    assesment_category_id: categoryId,
                    price: price,
                    discounted_price: discountedPrice,
                    gst_amount: gstAmount,
                    gst_percentage: gstPercent,
                    partner_share_std: sShare,
                    partner_share_pre: pShare,
                    status: 0, // Always draft
                  };

                  console.log("EditAssessmentForm - Saving draft with data:", assessmentData);
                  console.log("EditAssessmentForm - segment_id:", assessmentData.segment_id);

                  const result = await dispatch(
                    updateAssessment({
                      id: editData.id,
                      ...assessmentData,
                    })
                  );

                  if (updateAssessment.fulfilled.match(result)) {
                    toast.success("Draft saved successfully!", {
                      description: `${assessmentName} has been saved as draft.`,
                    });
                    onClose();
                  } else {
                    toast.error("Failed to save draft", {
                      description: result.payload as string || "An error occurred while saving the draft.",
                    });
                  }
                } catch (error) {
                  console.error("Error saving draft:", error);
                  toast.error("Failed to save draft", {
                    description: "An unexpected error occurred.",
                  });
                }
              }}
            >
              Draft
            </Button>
            <Button
              variant="brand"
              onClick={handleSubmit}
              disabled={
                !assessmentName ||
                !category ||
                !price
              }
            >
              Update Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;