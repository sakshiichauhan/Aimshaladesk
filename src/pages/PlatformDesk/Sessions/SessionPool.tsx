import {
  Clock,
  CircleArrowUp,
  CircleArrowDown,
  Flag,
  MessageCircle,
  Search,
  X,
  Check,
  Users,
  FileCheck2,
  FileText,
  CheckCircle2,
  FileDown,
  BadgeQuestionMark,
  Plus,
  Eye,
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
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  instant_sessions,
  introductory_sessions,
  b2b_sessions,
  pending_approvals,
} from "@/data/Data";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";
const Up = <CircleArrowUp className="text-[var(--green)] h-4" />;
const Down = <CircleArrowDown className="text-[var(--red)] h-4" />;
const Stats = [
  {
    title: "Total Pooled Sessions",
    value: "326",
    icon: Users,
    performance: Up,
  },
  {
    title: "Instant Sessions Available",
    value: "112",
    icon: FileCheck2,
    performance: Down,
  },
  {
    title: "Introductory Sessions Listed",
    value: "89",
    icon: FileText,
    performance: Up,
  },
  {
    title: "B2B Sessions Published",
    value: "125",
    icon: Clock,
    performance: Up,
  },
  {
    title: "Waiting for Coach to Accept",
    value: "21",
    icon: CheckCircle2,
    performance: Up,
  },
];

export function SessionPool() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-[var(--text-head)]">
        Sessions Pool{" "}
      </h1>
      <StatCard />
      <Buttonbar />
      <SessionsPool />
    </div>
  );
}

function Buttonbar() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Button variant="brand" size="new">
        <Plus className="h-3 w-3" />
        <span className=""> Add Session to Pool</span>
      </Button>
      <div className="flex gap-4 flex-wrap">
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
        >
          <Filter className="h-4 w-4" />
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>

        {showFilter && <AssessFilter onClose={() => setShowFilter(false)} />}

        <Button variant="standard" size="new">
          <Eye className="h-3 w-3" />
          <span className="">Assign Slots</span>
        </Button>
        <Button variant="standard" size="new">
          <FileDown className="h-3 w-3" />
          <span className="">Export Pool List</span>
        </Button>
        <Button variant="standard" size="new">
          <BadgeQuestionMark className="h-3 w-3" />
          <span className="">Manage Availability</span>
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
  const [activeTab, setActiveTab] = useState("Session Type");

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

  const [session, setSession] = useState("Instant");
  const [coach, setCoach] = useState("Consultant");
  const [status, setStatus] = useState("Active");
  const [availability, setAvailabilitys] = useState("Available Now");
  const [segment, setSegment] = useState("UG");

  const tabList = [
    "Session Type",
    "Coach Type",
    "Availability",
    "Status",
    "Segment",
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
                      ? "bg-[var(--brand-color3)] text-[var(--brand-color)] border-[var(--brand-color)]"
                      : "text-[var(--text)] hover:bg-[var(--faded)] border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 overflow-y-auto relative w-full">
            {activeTab === "Session Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Session Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Instant", "Introductory", "B2B"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={session}
                      onChange={setSession}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Coach Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Coach Type :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Consultant", "Mentor", "Educator"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={coach}
                      onChange={setCoach}
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
                  {["Active", "Inactive", "Pending"].map((option) => (
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

            {activeTab === "Availability" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  select Availability :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Available Now", "Scheduled", "Full"].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={availability}
                      onChange={setAvailabilitys}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === "Segment" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  select the Segment :
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["UG", "PG", "Career Changer", "Professional"].map(
                    (option) => (
                      <RadioButton
                        key={option}
                        label={option}
                        value={option}
                        selected={segment}
                        onChange={setSegment}
                      />
                    )
                  )}
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
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
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
              {stat.performance}
            </div>
            <div className="flex items-center gap-4">
              <div className={`rounded-full`}>
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

function SessionsPool() {
  const [activeTab, setActiveTab] = useState("instant");
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  interface ItemWithId {
    id: number;
    [key: string]: any;
  }
  const [selectedStack, setSelectedStack] = useState<ItemWithId[]>([]);
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const getCurrentData = () => {
    switch (activeTab) {
      case "instant":
        return instant_sessions;
      case "introductory":
        return introductory_sessions;
      case "b2b":
        return b2b_sessions;
      case "pending":
        return pending_approvals;
      default:
        return [];
    }
  };

  const getBadgeStyles = (condition: boolean) => {
    return condition
      ? "bg-[var(--green2)] text-[var(--green)]"
      : "bg-[var(--red2)] text-[var(--red)]";
  };

  const currentData = getCurrentData();
  let sortedData = [...currentData] as Record<string, any>[];
  if (
    sortConfig &&
    typeof sortConfig.key === "string" &&
    typeof sortConfig.direction === "string"
  ) {
    sortedData = sortedData.filter((item) => item && typeof item === "object");

    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
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

  const requestSort = (key: any) => {
    let direction = "ascending";

    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };
  const toggleSelectAll = () => {
    if (selectedSessions.length === currentRecords.length) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(currentRecords.map((item) => item.id));
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

  const handleRowClick = (user: ItemWithId) => {
    const exists = selectedStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedStack((prev) => [user, ...prev].slice(0, 5));
      setFocusedId(user.id);
    } else {
      bringToTop(user.id);
    }
  };

  const toggleSelectUser = (userId: number) => {
    if (selectedSessions.includes(userId)) {
      setSelectedSessions(selectedSessions.filter((id) => id !== userId));
    } else {
      setSelectedSessions([...selectedSessions, userId]);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");
    allRows.forEach((row) => {
      const id = Number(row.getAttribute("data-id"));
      const isInStack = (selectedStack as ItemWithId[]).some(
        (coach) => coach.id === id
      );
      const isTop = focusedId === id;
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

  // getTableHeaders and renderTableCells must be moved **outside** the return
  const getTableHeaders = () => {
    switch (activeTab) {
      case "instant":
        return (
          <>
            <TableHead
              onClick={() => requestSort("coach")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach{" "}
              {sortConfig?.key === "coach" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("coach_type")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach Type{" "}
              {sortConfig?.key === "coach_type" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("segment")}
              className="cursor-pointer text-[var(--text)]"
            >
              Segment{" "}
              {sortConfig?.key === "segment" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("topic")}
              className="cursor-pointer text-[var(--text)]"
            >
              Topic{" "}
              {sortConfig?.key === "topic" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("price")}
              className="cursor-pointer text-[var(--text)]"
            >
              Price / Code{" "}
              {sortConfig?.key === "price" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("slots")}
              className="cursor-pointer text-[var(--text)]"
            >
              Slots{" "}
              {sortConfig?.key === "slots" &&
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
          </>
        );

      case "introductory":
        return (
          <>
            <TableHead
              onClick={() => requestSort("coach")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach{" "}
              {sortConfig?.key === "coach" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("coach_type")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach Type{" "}
              {sortConfig?.key === "coach_type" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("organisation")}
              className="cursor-pointer text-[var(--text)]"
            >
              Organisation{" "}
              {sortConfig?.key === "organisation" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("topic")}
              className="cursor-pointer text-[var(--text)]"
            >
              Topic{" "}
              {sortConfig?.key === "topic" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("price")}
              className="cursor-pointer text-[var(--text)]"
            >
              Price / Code{" "}
              {sortConfig?.key === "price" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("slots")}
              className="cursor-pointer text-[var(--text)]"
            >
              Slots{" "}
              {sortConfig?.key === "slots" &&
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
          </>
        );

      case "b2b":
        return (
          <>
            <TableHead
              onClick={() => requestSort("organisation")}
              className="cursor-pointer text-[var(--text)]"
            >
              Organisation{" "}
              {sortConfig?.key === "organisation" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("coach")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach{" "}
              {sortConfig?.key === "coach" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("coach_type")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach Type{" "}
              {sortConfig?.key === "coach_type" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("topic")}
              className="cursor-pointer text-[var(--text)]"
            >
              Topic{" "}
              {sortConfig?.key === "topic" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("price")}
              className="cursor-pointer text-[var(--text)]"
            >
              Price / Code{" "}
              {sortConfig?.key === "price" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("slots")}
              className="cursor-pointer text-[var(--text)]"
            >
              Slots{" "}
              {sortConfig?.key === "slots" &&
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
          </>
        );

      case "pending":
        return (
          <>
            <TableHead
              onClick={() => requestSort("coach")}
              className="cursor-pointer text-[var(--text)]"
            >
              Coach{" "}
              {sortConfig?.key === "coach" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("session_type")}
              className="cursor-pointer text-[var(--text)]"
            >
              Session Type{" "}
              {sortConfig?.key === "session_type" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("topic")}
              className="cursor-pointer text-[var(--text)]"
            >
              Topic{" "}
              {sortConfig?.key === "topic" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("price")}
              className="cursor-pointer text-[var(--text)]"
            >
              Price / Code{" "}
              {sortConfig?.key === "price" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => requestSort("submitted_on")}
              className="cursor-pointer text-[var(--text)]"
            >
              Submitted On{" "}
              {sortConfig?.key === "submitted_on" &&
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
          </>
        );

      default:
        return null;
    }
  };

  const renderTableCells = (session: any) => {
    switch (activeTab) {
      case "instant":
        return (
          <>
            <TableCell className="font-medium">{session.coach}</TableCell>
            <TableCell>{session.coach_type}</TableCell>
            <TableCell>{session.segment}</TableCell>
            <TableCell>{session.topic}</TableCell>
            <TableCell>
              {session.price} / {session.code}
            </TableCell>
            <TableCell>
              <Badge className="bg-[var(--faded)] text-[var(--text)]">
                {session.slots}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getBadgeStyles(session.status === "Active")}>
                {session.status}
              </Badge>
            </TableCell>
          </>
        );

      case "introductory":
        return (
          <>
            <TableCell className="font-medium">{session.coach}</TableCell>
            <TableCell>{session.coach_type}</TableCell>
            <TableCell>{session.organisation}</TableCell>
            <TableCell>{session.topic}</TableCell>
            <TableCell>
              {session.price} / {session.code}
            </TableCell>
            <TableCell>
              <Badge className="bg-[var(--faded)] text-[var(--text)]">
                {session.slots}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                className={
                  session.status === "Active"
                    ? "bg-[var(--green2)] text-[var(--green)]"
                    : "bg-[var(--red2)] text-[var(--red)]"
                }
              >
                {session.status}
              </Badge>
            </TableCell>
          </>
        );

      case "b2b":
        return (
          <>
            <TableCell className="font-medium">
              {session.organisation}
            </TableCell>
            <TableCell>{session.coach}</TableCell>
            <TableCell>{session.coach_type}</TableCell>
            <TableCell>{session.topic}</TableCell>
            <TableCell>
              {session.price} / {session.code}
            </TableCell>
            <TableCell>
              <Badge className="bg-[var(--faded)] text-[var(--text)]">
                {session.slots}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getBadgeStyles(session.status === "Active")}>
                {session.status}
              </Badge>
            </TableCell>
          </>
        );

      case "pending":
        return (
          <>
            <TableCell className="font-medium">{session.coach}</TableCell>
            <TableCell>{session.session_type}</TableCell>
            <TableCell>{session.topic}</TableCell>
            <TableCell>
              {session.price} / {session.code}
            </TableCell>
            <TableCell>{session.submitted_on}</TableCell>
            <TableCell>
              <Badge className="bg-[var(--red2)] text-[var(--red)]">
                {session.status}
              </Badge>
            </TableCell>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* Tab Navigation */}
      <div className="flex">
        <Button
          variant={activeTab === "instant" ? "brand" : "border"}
          className="rounded-b-none rounded-r-sm rounded-l-sm"
          onClick={() => {
            setActiveTab("instant");
            setCurrentPage(1);
            setSelectedSessions([]);
          }}
        >
          Instant Sessions
        </Button>
        <Button
          variant={activeTab === "introductory" ? "brand" : "border"}
          className="rounded-b-none rounded-r-sm rounded-l-sm flex items-center gap-2"
          onClick={() => {
            setActiveTab("introductory");
            setCurrentPage(1);
            setSelectedSessions([]);
          }}
        >
          <span>Introductory Sessions</span>
        </Button>
        <Button
          variant={activeTab === "b2b" ? "brand" : "border"}
          className="rounded-b-none rounded-r-sm rounded-l-sm flex items-center gap-2"
          onClick={() => {
            setActiveTab("b2b");
            setCurrentPage(1);
            setSelectedSessions([]);
          }}
        >
          <span>B2B Sessions</span>
        </Button>
        <Button
          variant={activeTab === "pending" ? "brand" : "border"}
          className="rounded-b-none rounded-r-sm rounded-l-sm flex items-center gap-2"
          onClick={() => {
            setActiveTab("pending");
            setCurrentPage(1);
            setSelectedSessions([]);
          }}
        >
          <span>Pending Approvals</span>
        </Button>
      </div>

      {/* Table Controls */}
      <div className="flex-1 rounded-md  rounded-tl-none border bg-[var(--background)] overflow-x-auto">
        <div className="flex items-center justify-between border-b h-20 p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={
                selectedSessions.length === currentRecords.length &&
                currentRecords.length > 0
              }
              onCheckedChange={toggleSelectAll}
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-[var(--text)]"
            >
              Select All
            </label>
            {selectedSessions.length > 0 && (
              <Badge variant="border" className="ml-2">
                {selectedSessions.length} selected
              </Badge>
            )}
            {selectedSessions.length > 0 && (
              <div className="flex gap-2 ml-2">
                <Button variant="border" size="sm">
                  <Check className="h-4 w-4 text-[var(--green)]" />
                  Approve Selected
                </Button>
                {activeTab === "refund" && (
                  <Button variant="delete" size="sm">
                    <X className="h-4 w-4" />
                    Remove from Pool
                  </Button>
                )}
                <Button variant="border" size="sm">
                  <FileDown className="h-4 w-4" />
                  Export to CSV
                </Button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-sm overflow-hidden bg-[var(--faded)]">
              <Input
                placeholder="Search"
                className="border-none focus:ring-0 focus:outline-none px-2 py-1 w-40"
              />
              <Button
                type="submit"
                size="icon"
                variant="default"
                className="bg-[var(--button)] rounded-none rounded-r-md"
              >
                <Search className="h-5 w-5 text-[var(--text)]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto text-[var(--text)] w-full">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-[var(--faded)]">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                {getTableHeaders()}
                <TableHead className="text-[var(--text)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((session) => (
                <TableRow
                  key={session.id}
                  data-id={session.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedStack.some((c) => c.id === session.id)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectUser(session.id);
                    handleRowClick(session as ItemWithId);
                  }}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedStack.some((c) => c.id === session.id)
                        ? focusedId === session.id
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedSessions.includes(session.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectUser(session.id)}
                    />
                  </TableCell>
                  {renderTableCells(session)}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="noborder" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="noborder" size="sm">
                        <MessageCircle className="h-4 w-4" />
                        <span className="sr-only">Chat</span>
                      </Button>
                      <Button variant="noborder" size="sm">
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Flag</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {recordsPerPage}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[var(--background)] text-[var(--text)]">
                {[10, 25, 50, 100].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => {
                      setRecordsPerPage(size);
                      setCurrentPage(1);
                    }}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-[var(--text)]">
              Showing {indexOfFirstRecord + 1}–
              {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
              {sortedData.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
