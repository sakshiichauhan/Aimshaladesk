import { Button } from "@/components/ui/button";
import {
  Eye,
  Filter,
  BadgeQuestionMark,
  Bell,
  Notebook,
  Plus,
  Search,

  FileDown,
  X,
  Trash2,

  Edit3,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
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
import { SurveyQuestionsTable } from "@/data/Data";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import type { DateRange } from "react-day-picker";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

const stats = [
  {
    title: "Total Questions",
    value: "42",
    icon: BadgeQuestionMark,
  },
  {
    title: "Active Questions",
    value: "35",
    icon: BadgeQuestionMark,
  },
  {
    title: "Question Categories",
    value: "8",
    icon: Notebook,
  },
  {
    title: "Draft Questions",
    value: "7",
    icon: BadgeQuestionMark,
  },
];

export function SurveyQuestion() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Bar />
        <StatsCards />
        
        <TableSection />
      </div>
    </div>
  );
}

function Bar() {
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-2)} className="cursor-pointer">Surveys</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Manage Surveys</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Survey Questions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      <div className="flex gap-4">
        <Button variant="brand" size="new" onClick={() => setShowForm(true)}>
          <Plus className="h-3 w-3" />
        </Button>
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
          <Eye className="h-3 w-3" />
        </Button>
      </div>
      {showForm && (
        <QuestionForm 
          onClose={() => setShowForm(false)} 
        />
      )}
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

interface FilterProps {
  onClose: () => void;
}

function AdvancedFilters({ onClose }: FilterProps) {
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

  // Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [questionType, setQuestionType] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const tabList = ["General", "Status", "Category", "Question Type", "Date Range"];

  // Helper for checkbox
  const handleStatusChange = (option: string) => {
    setStatus((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  };
  
  const handleCategoryChange = (option: string) => {
    setCategory((prev) =>
      prev.includes(option)
        ? prev.filter((c) => c !== option)
        : [...prev, option]
    );
  };

  const handleQuestionTypeChange = (option: string) => {
    setQuestionType((prev) =>
      prev.includes(option)
        ? prev.filter((t) => t !== option)
        : [...prev, option]
    );
  };

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
              setStatus([]);
              setCategory([]);
              setQuestionType([]);
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
                  Search by Question Text / Creator:
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter question text or creator..."
                  type="text"
                  className="mt-4 w-full "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </>
            )}

            {activeTab === "Status" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">Status:</p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Active", "Draft", "Inactive"].map((option) => (
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

            {activeTab === "Category" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Category:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {Array.from(new Set(SurveyQuestionsTable.map(q => q.category))).map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2">
                        <Checkbox
                          checked={category.includes(option)}
                          onCheckedChange={() => handleCategoryChange(option)}
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Question Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Question Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {["Multiple Choice", "Rating Scale", "Text", "Yes/No"].map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2">
                        <Checkbox
                          checked={questionType.includes(option)}
                          onCheckedChange={() => handleQuestionTypeChange(option)}
                        />
                        {option}
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range: Created or Last Active
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
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
function TableSection() {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof SurveyQuestionsTable>(
    SurveyQuestionsTable[0] ? [SurveyQuestionsTable[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    SurveyQuestionsTable[0]?.id || null
  );
  const [editingQuestion, setEditingQuestion] = useState<typeof SurveyQuestionsTable[0] | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditQuestion = (question: typeof SurveyQuestionsTable[0]) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  // Sorting logic
  const sortedData = [...SurveyQuestionsTable];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      let aValue = a[sortConfig.key as keyof typeof a];
      let bValue = b[sortConfig.key as keyof typeof b];
      
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
    if (selectedQuestions.length === currentRecords.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(currentRecords.map((question) => question.id));
    }
  };

  const bringToTop = (questionId: string) => {
    const question = selectedStack.find((q) => q.id === questionId);
    if (question) {
      setSelectedStack((prev) => [
        question,
        ...prev.filter((q) => q.id !== questionId),
      ]);
      setFocusedId(questionId);
    }
  };

  useEffect(() => {
    const allRows = document.querySelectorAll("tr[data-id]");

    allRows.forEach((row) => {
      const id = row.getAttribute("data-id");
      const isInStack = selectedStack.some((q) => q.id === id);
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

  const handleRowClick = (question: (typeof SurveyQuestionsTable)[0]) => {
    // Double-click detected
    const exists = selectedStack.find((q) => q.id === question.id);
    if (!exists) {
      setSelectedStack((prev) => {
        const updated = [question, ...prev];
        return updated.slice(0, 5); // limit to 5
      });
      setFocusedId(question.id);
    } else {
      bringToTop(question.id);
    }
  };

  const handleRowDoubleClick = (question: (typeof SurveyQuestionsTable)[0]) => {
    handleEditQuestion(question);
  };

  const toggleSelectQuestion = (questionId: string) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        {/* Select All and badge UI */}
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
            <div className="flex items-center gap-2 border-none shadow-none">
              <Checkbox
                id="select-all-questions"
                checked={
                  selectedQuestions.length === currentRecords.length &&
                  currentRecords.length > 0
                }
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all-questions"
                className="text-sm font-medium text-[var(--text)]"
              >
                Select All
              </label>
              {selectedQuestions.length > 0 && (
                <Badge variant="border" className="ml-2 ">
                  {selectedQuestions.length} selected
                </Badge>
              )}
            </div>

            {selectedQuestions.length > 0 && (
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
                  onClick={() => requestSort("question")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Question{" "}
                  {sortConfig?.key === "question" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)]">Option 1</TableHead>
                <TableHead className="text-[var(--text)]">Option 2</TableHead>
                <TableHead className="text-[var(--text)]">Option 3</TableHead>
                <TableHead className="text-[var(--text)]">Option 4</TableHead>
              
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((question) => (
                <TableRow
                  key={question.id}
                  data-id={question.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedStack.some((q) => q.id === question.id)
                      ? "bg-[var(--brand-color3)]"
                      : ""
                  )}
                  onClick={() => {
                    toggleSelectQuestion(question.id);
                    handleRowClick(question);
                  }}
                  onDoubleClick={() => handleRowDoubleClick(question)}
                >
                  <TableCell
                    className={cn(
                      "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
                      selectedStack.some((q) => q.id === question.id)
                        ? focusedId === question.id
                          ? "border-[var(--brand-color)]"
                          : "border-transparent"
                        : "border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={selectedQuestions.includes(question.id)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleSelectQuestion(question.id)}
                    />
                  </TableCell>
                
                  <TableCell>
                    <div className="text-low max-w-[200px] truncate" title={question.question}>
                      {question.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low max-w-[120px] truncate" title={question.option1}>
                      {question.option1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low max-w-[120px] truncate" title={question.option2}>
                      {question.option2}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low max-w-[120px] truncate" title={question.option3}>
                      {question.option3}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-low max-w-[120px] truncate" title={question.option4}>
                      {question.option4}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="standard">{question.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <EditQuestionButton question={question} />
                      <DeleteQuestionButton questionId={question.id} />
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
              {sortedData.length} questions
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
      {showForm && (
        <QuestionForm 
          onClose={handleCloseForm} 
          editData={editingQuestion || undefined}
        />
      )}
    </div>
  );
}


interface QuestionFormProps {
  onClose: () => void;
  editData?:{
    id: string;
    category: string;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    status: string;
  };
}

function QuestionForm({ onClose, editData }: QuestionFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState(editData?.category || "");
  const [question, setQuestion] = useState(editData?.question || "");
  const [option1, setOption1] = useState(editData?.option1 || "");
  const [option2, setOption2] = useState(editData?.option2 || "");
  const [option3, setOption3] = useState(editData?.option3 || "");
  const [option4, setOption4] = useState(editData?.option4 || "");
  const [isActive, setIsActive] = useState(editData?.status === "Active");

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInside = path.some((el) => {
      return (
        (modalRef.current && modalRef.current.contains(el)) ||
        (el instanceof HTMLElement && el.getAttribute("data-radix-popper-content-wrapper") !== null)
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

  const handleSubmit = () => {
    // In a real app, you would make an API call here
    const questionData = {
      id: editData?.id || `Q${Date.now()}`,
      category,
      question,
      option1,
      option2,
      option3,
      option4,
      status: isActive ? "Active" : "Inactive",
    };

    console.log(
      editData ? "Updated question data:" : "New question data:",
      questionData
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-xl font-semibold text-[var(--text-head)]">
            {editData ? "Edit Question" : "Create Question"}
          </CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Question Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(new Set(SurveyQuestionsTable.map(q => q.category))).map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Question</Label>
            <Textarea
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Options</Label>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">Option 1</Label>
                <Input
                  placeholder="Enter option 1..."
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">Option 2</Label>
                <Input
                  placeholder="Enter option 2..."
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">Option 3</Label>
                <Input
                  placeholder="Enter option 3..."
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground mb-2 font-normal">Option 4</Label>
                <Input
                  placeholder="Enter option 4..."
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
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
              disabled={!category || !question || !option1 || !option2}
            >
              Draft
            </Button>
            <Button
              variant="brand"
              onClick={handleSubmit}
              disabled={!category || !question || !option1 || !option2}
            >
              {editData ? "Update Question" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


function EditQuestionButton({ question }: { question: typeof SurveyQuestionsTable[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="noborder"
                size="sm"
                className="bg-white border-0 shadow-none hover:bg-[var(--blue2)] hover:text-[var(--blue)] transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Edit3 className="h-4 w-3" />
                <span className="sr-only">Edit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Edit Question
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Question - {question.id}</DialogTitle>
          <DialogDescription>
            Update the question details below.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <p className="text-center text-muted-foreground">
            This question is being edited in the main form. Please use the edit functionality from the table row.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="border" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteQuestionButton({ questionId }: { questionId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Here you would typically make an API call to delete the question
    console.log("Deleting question:", questionId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="noborder"
                size="sm"
                className="bg-white border-0 shadow-none hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-3" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Delete Question
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Question</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete question {questionId}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="border" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="delete" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
