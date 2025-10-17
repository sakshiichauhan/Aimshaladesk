import { Button } from "@/components/ui/button";
import {
  Filter,
  Bell,
  Plus,
  Search,
  FileDown,
  X,
  Trash2,
  Edit3,
  BadgeQuestionMark,
  Pencil,
} from "lucide-react";
import { CardTitle,CardHeader,Card } from "@/components/ui/card";

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
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import type { DateRange } from "react-day-picker";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  fetchQuestionsByGuid,
  selectQuestions,
  selectQuestionsLoading,
  selectQuestionsError,
  createQuestion,

  deleteQuestion,
} from "@/store/slices/platformDesk/questionSlice";
import {
  fetchCategories,
  saveCategory,
  updateCategory,
  deleteCategory,
  selectQuestionCategories,
} from "@/store/slices/platformDesk/QuestionCategory";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, Breadcrumb } from "@/components/ui/breadcrumb";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
// import { Dialog,  } from "@/components/ui/dialog";

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--faded);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--brand-color);
  }
`;

export function Question() {
  const { guid } = useParams<{ guid: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectQuestionsLoading);
  const error = useSelector(selectQuestionsError);

  // Fetch questions when component mounts or guid changes
  useEffect(() => {
    if (guid) {
      dispatch(fetchQuestionsByGuid(guid));
    }
  }, [guid, dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
          <div className="h-6 w-48 bg-[var(--faded)] rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-[var(--faded)] rounded animate-pulse"></div>
          </div>
        </div>
        <div className="rounded-md border bg-[var(--background)] p-8 text-center">
          <div className="text-[var(--text)]">Loading questions...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <Topbar guid={guid} />
        <div className="rounded-md border bg-[var(--background)] p-8 text-center">
          <div className="text-[var(--red)]">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Topbar guid={guid}
         />
        <TableSection questions={questions} />
      </div>
    </div>
  );
}

function Topbar({ guid }: { guid?: string }) {
  const [showForm, setShowForm] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-2)} className="cursor-pointer">Assessments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Manage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Question</BreadcrumbPage>
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
          {showForm && (
            <QuestionForm onClose={() => setShowForm(false)} guid={guid} />
          )}
        </div>
        <Button
            variant="standard"
            size="new"
            onClick={() => setIsCategorySheetOpen(true)}
          >
            <BadgeQuestionMark className="h-3 w-3" />
            <span className="">Categories</span>
          </Button>
          {isCategorySheetOpen && (
            <QuestionCategoryPopup
              onClose={() => setIsCategorySheetOpen(false)}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          )}
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
          aria-label={showFilter ? "Hide Filters" : "Show Filters"}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}
      </div>
    </div>
  );
}
interface QuestionCategoryPopupProps {
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

function QuestionCategoryPopup({
  onClose,
  selectedCategories,
  onCategoryChange,
}: QuestionCategoryPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectQuestionCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    status: number;
  } | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryStatus, setEditCategoryStatus] = useState<number>(1);

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (!title) return;
    
    // Check if category already exists
    const categoryExists = categories.some(cat => cat.name.toLowerCase() === title.toLowerCase());
    if (categoryExists) {
      toast.error("Category already exists");
      return;
    }
    
    try {
      await dispatch(saveCategory({ title, status: 1, service_assesment_id: 1 })).unwrap();
      setNewCategoryName("");
      setShowAddCategory(false);
      toast.success("Category added successfully");
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast.error(error?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (category: string) => {
    try {
      // Find the category ID from the categories list
      const categoryToDelete = categories.find((c) => c.name === category);
      if (!categoryToDelete) {
        toast.error("Category not found");
        return;
      }

      // Show confirmation dialog
      if (
        confirm(`Are you sure you want to delete the category "${category}"?`)
      ) {
        await dispatch(deleteCategory(categoryToDelete.id)).unwrap();

        // Remove from selected categories if it was selected
        if (selectedCategories.includes(category)) {
          onCategoryChange(selectedCategories.filter((c) => c !== category));
        }
        
        toast.success("Category deleted successfully");
      }
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error?.message || "Failed to delete category");
    }
  };

  const handleEditCategory = (category: string) => {
    const categoryToEdit = categories.find((c) => c.name === category);
    if (categoryToEdit) {
      setEditingCategory({
        id: categoryToEdit.id,
        name: categoryToEdit.name,
        status: 1, // Default status
      });
      setEditCategoryName(categoryToEdit.name);
      setEditCategoryStatus(1);
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
          service_assesment_id: 1,
        })
      ).unwrap();
      setEditingCategory(null);
      setEditCategoryName("");
      setEditCategoryStatus(1);
      toast.success("Category updated successfully");
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(error?.message || "Failed to update category");
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName("");
    setEditCategoryStatus(1);
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
                    categories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase()) && (
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
                      categories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())
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
                        checked={editCategoryStatus === 1}
                        onCheckedChange={(checked) =>
                          setEditCategoryStatus(checked ? 1 : 0)
                        }
                      />
                      <span className="text-sm">
                        {editCategoryStatus === 1 ? "Active" : "Inactive"}
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
                    key={category.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${selectedCategories.includes(category.name)
                        ? "bg-[var(--brand-color3)] border-[var(--brand-color)]"
                        : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--faded)]"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Checkbox
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryToggle(category.name)}
                          className="text-[var(--brand-color)] focus:ring-[var(--brand-color)] border-[var(--border)]"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-[var(--text)]">
                            {category.name}
                          </div>
                        </div>
                        <Badge
                          variant={
                            selectedCategories.includes(category.name)
                              ? "standard"
                              : "border"
                          }
                          className="text-xs"
                        >
                          {category.name}
                        </Badge>
                      </label>

                      {/* Edit and Delete Icons - Only show when category is selected */}
                      {selectedCategories.includes(category.name) && (
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
                                    handleEditCategory(category.name);
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
                                    handleDeleteCategory(category.name);
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const tabList = ["General", "Status", "Category", "Date Range"];

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
                  Search by Question / Assessment:
                </label>
                <Input
                  id="Gen"
                  placeholder="Enter question or assessment..."
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
                  Question Category:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Career Planning",
                    "Learning Preferences",
                    "Technical Skills",
                    "Professional Development",
                    "Study Habits",
                    "International Education",
                    "Digital Learning",
                    "Student Life",
                    "Career Development",
                    "Work Environment",
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={category.includes(option)}
                        onCheckedChange={() => handleCategoryChange(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Date Range" && (
              <>
                <label htmlFor="date-range" className="text-[var(--text)]">
                  Date Range: Created or Last Updated
                </label>
                <div className="mt-4 min-w-full">
                  <DatePickerWithRange
                    value={dateRange}
                    onChange={setDateRange}
                  />
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

interface QuestionFormProps {
  onClose: () => void;
  guid?: string;
}

function QuestionForm({ onClose }: QuestionFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectQuestionCategories);

  const [assessment, setAssessment] = useState("");
  const [qCategory, setQCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [status, setStatus] = useState<string>("Active");

  function handleClickOutside(e: MouseEvent) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInside = path.some((el) => {
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40  flex justify-end">
      <div
        ref={modalRef}
        className="animate-slide-in-from-right bg-[var(--background)] shadow-xl h-full w-full max-w-[700px] flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-6">
          <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
            Create Question
          </CardTitle>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[var(--text)]">
          <div className="flex flex-col gap-2">
            <Label>Assessment</Label>
            <Input
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Enter assessment name"
              readOnly
              className="bg-[var(--faded)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Question Category</Label>
            <Select value={qCategory} onValueChange={setQCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Question</Label>
            <Textarea
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Options</Label>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Option 1</Label>
                <Input
                  placeholder="Enter option 1..."
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Option 2</Label>
                <Input
                  placeholder="Enter option 2..."
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Option 3</Label>
                <Input
                  placeholder="Enter option 3..."
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Option 4</Label>
                <Input
                  placeholder="Enter option 4..."
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Option 5</Label>
                <Input
                  placeholder="Enter option 5..."
                  value={option5}
                  onChange={(e) => setOption5(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Correct Answer</Label>
            <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
              <SelectTrigger>
                <SelectValue placeholder="Select correct answer" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: option1, label: "Option 1" },
                  { value: option2, label: "Option 2" },
                  { value: option3, label: "Option 3" },
                  { value: option4, label: "Option 4" },
                  { value: option5, label: "Option 5" },
                ]
                  .filter((opt) => opt.value.trim())
                  .map((opt, index) => (
                    <SelectItem key={index} value={opt.value}>
                      {opt.label}: {opt.value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <div className="flex gap-4 mt-2">
              {["Active", "Draft", "Inactive"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <Checkbox
                    checked={status === option}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setStatus(option);
                      }
                    }}
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-4">
          <Button variant="border" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="brand"
            onClick={async () => {
              if (!question || !qCategory || !correctAnswer) return;

              try {
                // Get user ID from localStorage
                const authState = localStorage.getItem("authState");
                let userId = 1; // Default user ID
                
                if (authState) {
                  const parsedAuth = JSON.parse(authState);
                  userId = parsedAuth.user?.id || parsedAuth.userId || 1;
                }

                // Format answers as array (filter out empty options)
                const answers = [option1, option2, option3, option4, option5]
                  .filter((opt) => opt.trim());

                await dispatch(
                  createQuestion({
                    assessment_question_category_id: Number(qCategory),
                    qualification_id: 1, // Default qualification ID
                    title: question,
                    answers: answers,
                    correct_answer: correctAnswer,
                    added_by: userId,
                    status: status === "Active" ? 1 : 0,
                  })
                );

                onClose();
              } catch (error) {
                console.error("Error creating question:", error);
              }
            }}
            disabled={!question || !qCategory || !correctAnswer}
          >
            Create Question
          </Button>
        </div>
      </div>
    </div>
  );
}

function TableSection({ questions }: { questions: any[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedStack, setSelectedStack] = useState<typeof questions>(
    questions[0] ? [questions[0]] : []
  );
  const [focusedId, setFocusedId] = useState<string | null>(
    questions[0]?.id || null
  );

  // Update selectedStack when questions change
  useEffect(() => {
    if (questions.length > 0 && selectedStack.length === 0) {
      setSelectedStack([questions[0]]);
      setFocusedId(questions[0].id);
    }
  }, [questions, selectedStack.length]);

  // Sorting logic
  const sortedData = [...questions];
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

  const handleRowClick = (question: (typeof questions)[0]) => {
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
                  onClick={() => requestSort("qCategory")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Q Category{" "}
                  {sortConfig?.key === "qCategory" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
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
                <TableHead className="text-[var(--text)]">Option 5</TableHead>
                <TableHead className="text-[var(--text)]">Answer</TableHead>
                <TableHead className="text-[var(--text)]">Status</TableHead>
                <TableHead className="text-[var(--text)] pr-4 w-1">
                  Actions
                </TableHead>
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
                    <div className="text-low">{question.qCategory}</div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[200px] truncate"
                      title={question.question}
                    >
                      {question.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.option1}
                    >
                      {question.option1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.option2}
                    >
                      {question.option2}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.option3}
                    >
                      {question.option3}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.option4}
                    >
                      {question.option4}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.option5}
                    >
                      {question.option5}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-low max-w-[120px] truncate"
                      title={question.ans.join(", ")}
                    >
                      {question.ans.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{question.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center pr-4 justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="actionIcon"
                              size="actionIcon"
                              className="hover:bg-[var(--brand-color2)] hover:text-[var(--brand-color)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
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
                              className="hover:bg-[var(--brand-color2)] hover:text-[var(--brand-color)] transition-all duration-200 p-2 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  confirm(
                                    `Are you sure you want to delete this question?`
                                  )
                                ) {
                                  dispatch(deleteQuestion(question.id));
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
            {(() => {
              const getPaginationItems = () => {
                const items = [];
                const showDots = totalPages > 7;

                if (!showDots) {
                  // Show all pages if 7 or fewer
                  for (let i = 1; i <= totalPages; i++) {
                    items.push(i);
                  }
                } else {
                  // Always show first page
                  items.push(1);

                  if (currentPage > 4) {
                    items.push("...");
                  }

                  // Show pages around current page
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);

                  for (let i = start; i <= end; i++) {
                    if (i !== 1 && i !== totalPages) {
                      items.push(i);
                    }
                  }

                  if (currentPage < totalPages - 3) {
                    items.push("...");
                  }

                  // Always show last page if more than 1 page
                  if (totalPages > 1) {
                    items.push(totalPages);
                  }
                }

                return items;
              };

              return getPaginationItems().map((item, index) => {
                if (item === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="flex h-8 w-8 items-center justify-center text-[var(--text)]"
                    >
                      ...
                    </span>
                  );
                }

                const page = item as number;
                return (
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
                );
              });
            })()}
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

// function EditQuestionButton({ question }: { question: typeof QuestionsTable[0] }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     assessment: question.assessment,
//     qCategory: question.qCategory,
//     question: question.question,
//     option1: question.option1,
//     option2: question.option2,
//     option3: question.option3,
//     option4: question.option4,
//     option5: question.option5,
//     status: question.status
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically make an API call to update the question
//     console.log("Updating question:", question.id, formData);
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="noborder"
//                 size="sm"
//                 className="bg-white border-0 shadow-none hover:bg-[var(--blue2)] hover:text-[var(--blue)] transition-all duration-200"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Edit3 className="h-4 w-3" />
//                 <span className="sr-only">Edit</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="top" className="text-xs">
//               Edit Question
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Question - {question.id}</DialogTitle>
//           <DialogDescription>
//             Update the question details below.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="assessment">Assessment</Label>
//               <Select value={formData.assessment} onValueChange={(value) => setFormData({...formData, assessment: value})}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from(new Set(QuestionsTable.map(q => q.assessment))).map(assessment => (
//                     <SelectItem key={assessment} value={assessment}>{assessment}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="qCategory">Question Category</Label>
//               <Select value={formData.qCategory} onValueChange={(value) => setFormData({...formData, qCategory: value})}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Array.from(new Set(QuestionsTable.map(q => q.qCategory))).map(category => (
//                     <SelectItem key={category} value={category}>{category}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="question">Question</Label>
//             <Textarea
//               id="question"
//               placeholder="Enter your question here..."
//               value={formData.question}
//               onChange={(e) => setFormData({...formData, question: e.target.value})}
//               className="min-h-[100px]"
//             />
//           </div>

//           <div className="space-y-4">
//             <Label>Options</Label>
//             <div className="grid grid-cols-1 gap-3">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <div key={num} className="space-y-2">
//                   <Label htmlFor={`option${num}`}>Option {num}</Label>
//                   <Input
//                     id={`option${num}`}
//                     placeholder={`Enter option ${num}...`}
//                     value={formData[`option${num}` as keyof typeof formData] as string}
//                     onChange={(e) => setFormData({...formData, [`option${num}`]: e.target.value})}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="status">Status</Label>
//             <div className="flex gap-4 mt-2">
//               {["Active", "Draft", "Inactive"].map((option) => (
//                 <label key={option} className="flex items-center space-x-2">
//                   <Checkbox
//                     checked={formData.status === option}
//                     onCheckedChange={(checked) => {
//                       if (checked) {
//                         setFormData({...formData, status: option});
//                       }
//                     }}
//                   />
//                   <span className="text-sm">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button type="button" variant="border" onClick={() => setIsOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="brand">
//               <Save className="h-4 w-4 mr-2" />
//               Update Question
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// function DeleteQuestionButton({ questionId }: { questionId: string }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleDelete = () => {
//     // Here you would typically make an API call to delete the question
//     console.log("Deleting question:", questionId);
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="noborder"
//                 size="sm"
//                 className="bg-white border-0 shadow-none hover:bg-[var(--red2)] hover:text-[var(--red)] transition-all duration-200"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <Trash2 className="h-4 w-3" />
//                 <span className="sr-only">Delete</span>
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent side="top" className="text-xs">
//               Delete Question
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Delete Question</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to delete question {questionId}? This action cannot be undone.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <Button variant="border" onClick={() => setIsOpen(false)}>
//             Cancel
//           </Button>
//           <Button variant="delete" onClick={handleDelete}>
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete Question
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
