
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Check, ChevronDown, ChevronLeft, ChevronRight, Eye, Funnel, Plus, Search, SquarePen, X, } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { accessCodeTable } from "@/data/Data";
import { Input } from "@/components/ui/input";
import React from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/RangeCalender";
import { MultiSelect } from "@/components/ui/multi-select";
import { useNavigate } from "react-router-dom";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";


export function AccessCode() {
    return (
      <div className="flex flex-col gap-2">
        <Topbar />
        <CodeTableSection/>
      </div>
  );
}

function Topbar() {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Access Codes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
      <Button
          variant="brand"
          size="new"
          onClick={() => setShowForm(true)}
          aria-label={showForm ? "Hide Form" : "Show Form"}
        >
          <Plus className="h-4 w-4" />
        </Button>
        {showForm && <Form onClose={() => setShowForm(false)} />}
      </div>
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
          aria-label={showFilter ? "Hide Filters" : "Show Filters"}
        >
          <Funnel className="h-4 w-4" />
        </Button>
        {showFilter && <AdvanceFilter onClose={() => setShowFilter(false)} />}
      </div>
      </div>
  );
}

interface FilterProps {
  onClose: () => void;
}


function AdvanceFilter({ onClose }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Product Type");

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

  const [product, setProduct] = useState("product 1");
  const [partner, setPartner] = useState("partner 1");
  const [status, setStatus] = useState("Success");
  const [code, setCode] = useState("Single");

  const tabList = [
    "Product Type",
    "Partner Type",
    "Expiry Status",
    "Code Type"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">

      <div
        ref={modalRef}
        data-inside-modal="true"
        className="relative w-full max-w-[700px] h-[500px] rounded-sm bg-[var(--background)] "
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

            {activeTab === "Code Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Code Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Single",
                    "Group",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={code}
                      onChange={setCode}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Status of Payment:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Success",
                    "Failed",
                    "Pending",
                    "Refunded",
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

            {activeTab === "Product Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the product type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "product 1",
                    "product 2",
                    "product 3",
                    "product 4",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={product}
                      onChange={setProduct}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Partner Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the partner type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "partner 1",
                    "partner 2",
                    "partner 3",
                    "partner 4",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={partner}
                      onChange={setPartner}
                    />
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

interface FormProps {
  onClose: () => void;
}


function Form({ onClose }: FormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [codeName, setCodeName] = useState("");
  const [discount, setDiscount] = useState("");
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [partnerType, setPartnerType] = useState("Admin");
  const [partnerName, setPartnerName] = useState("");
  const [totalUses, setTotalUses] = useState("");
  const [status, setStatus] = useState(true);
  const [notes, setNotes] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const partnerOptions: Record<string, string[]> = {
    Admin: ["Admin One", "Admin Two"],
    Educator: ["Edu A", "Edu B"],
    Consultant: ["Consult X", "Consult Y"],
    Institute: ["Inst 1", "Inst 2"],
    College: ["College A", "College B"],
    University: ["Uni Alpha", "Uni Beta"],
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">Create Access Code</CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label>Code Name</Label>
            <Input placeholder="eg : AIMWELCOME2025" value={codeName} onChange={(e) => setCodeName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Discount</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-full">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  step={1}
                  value={discount || 10}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= 100) setDiscount(e.target.value);
                  }}
                  className="pr-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
              </div>
              
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Product Type</Label>
            <MultiSelect
              options={["Assessment", "Session", "Masterclass", "Learning"]}
              selected={productTypes}
              onChange={setProductTypes}
              placeholder="Select product types"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Partner Type</Label>
            <Select value={partnerType} onValueChange={setPartnerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select partner type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(partnerOptions).map((pt) => (
                  <SelectItem key={pt} value={pt}>{pt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
  <Label>Partner Name</Label>
  <div className="relative">
    <Input
      type="text"
      placeholder="Type to search..."
      value={partnerName}
      onChange={(e) => {
        setPartnerName(e.target.value);
        setIsSearching(true);
      }}
      className="w-full"
    />
    {isSearching &&
      partnerOptions[partnerType]
        ?.filter((name) =>
          name.toLowerCase().includes(partnerName.toLowerCase())
        )
        .map((name) => (
          <div
            key={name}
            className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto"
          >
            <div
              className="px-4 py-2 cursor-pointer hover:bg-muted"
              onClick={() => {
                setPartnerName(name);
                setIsSearching(false);
              }}
            >
              {name}
            </div>
          </div>
        ))}
  </div>
</div>

          <div className="flex flex-col gap-2">
            <Label>Total Uses Allowed</Label>
            <Input
              type="number"
              min={1}
              placeholder="200"
              value={totalUses}
              onChange={(e) => setTotalUses(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Validity Period</Label>
            <DateRangePicker />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <div className="flex gap-4 mt-2">
              {["Active", "Inactive"].map((option) => (
                <RadioButton
                  key={option}
                  label={option}
                  value={option}
                  selected={status ? "Active" : "Inactive"}
                  onChange={(val) => setStatus(val === "Active")}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Notes (optional)</Label>
            <Textarea placeholder="Summer campaign for school students." value={notes} onChange={(e) => setNotes(e.target.value)} />
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


function CodeTableSection() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<
    typeof accessCodeTable
  >(accessCodeTable[0] ? [accessCodeTable[0]] : []);
  const [focusedId, setFocusedId] = useState<number | null>(accessCodeTable[0]?.id || null);

  // Sorting logic
  const sortedData = [...accessCodeTable];
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

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentRecords.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        currentRecords.map((user): number => user.id)
      );
    }
  };
  

  const bringToTop = (userId: number) => {
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
      const id = Number(row.getAttribute("data-id"));
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

  {/*const removeCoach = (userId: number) => {
    setSelectedCoachStack((prev) => prev.filter((c) => c.id !== userId));
    if (focusedCoachId === userId) {
      setFocusedCoachId(null);
    }
  };*/}

  const handleRowClick = (user: (typeof accessCodeTable)[0]) => {
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

  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex items-center justify-between border-b  h-20 p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4  gap-2">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all"
                checked={selectedUsers.length === currentRecords.length && currentRecords.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-[var(--text)]">
                Select All
              </label>
              {selectedUsers.length > 0 && (
                <Badge variant="border" className="ml-2 ">
                  {selectedUsers.length} selected
                </Badge>
              )}
            </div>

            {selectedUsers.length > 0 && (
              <div className="flex gap-2">        {/*wrap */}
                <Button variant="border" size="sm">
                  <Bell className="h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="border" size="sm">
                  <Check className=" h-4 w-4 text-[var(--green)]" />
                  Approve All
                </Button>
                <Button variant="delete" size="sm">
                  <X className=" h-4 w-4 text-[var(--red)]" />
                  Block / Remove
                </Button>
              </div>
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


        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("CodeName")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Code Name{" "}
                  {sortConfig?.key === "CodeName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Type")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Type{" "}
                  {sortConfig?.key === "Type" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Discount")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Discount{" "}
                  {sortConfig?.key === "Discount" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Product")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Product{" "}
                  {sortConfig?.key === "Product" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("PartnerType")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Partner Type{" "}
                  {sortConfig?.key === "PartnerType" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("PartnerName")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Partner Name{" "}
                  {sortConfig?.key === "PartnerName" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Uses")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Uses{" "}
                  {sortConfig?.key === "Uses" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Validity")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Validity{" "}
                  {sortConfig?.key === "Validity" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Status")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Status{" "}
                  {sortConfig?.key === "Status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] text-center pr-4 w-[10px]">Actions</TableHead>
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
                  <TableCell
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">{user.CodeName}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.Type}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.Discount}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-low max-w-[200px] break-words whitespace-normal">{user.Product}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">
                      <div>{`${user.PartnerType}`}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low">{user.PartnerName}</div>
                  </TableCell>
                  <TableCell>{user.Uses}</TableCell>
                  <TableCell>
                    <div className="text-low">{user.Validity}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.Status}</Badge>
                  </TableCell>
                  <TableCell>

                    <div className="flex items-center justify-center pr-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                          <Button
          variant="actionIcon"
          size="actionIcon"
          onClick={() => setShowForm(true)}
        >
          <SquarePen className="h-4 w-3" />
        </Button>
        
                      </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            Edit
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {showForm && <Form onClose={() => setShowForm(false)} />}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button
                        variant="actionIcon"
                        size="actionIcon"
                        onClick={() => navigate(`pay/${user.CodeName}`)}
                      >
                        <Eye className="h-4 w-3" />
                        <span className="sr-only">View</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            View
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
              {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
              {sortedData.length} explorers
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
