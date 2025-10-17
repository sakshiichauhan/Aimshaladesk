// export function MyPipeline() {
//   return <div>MyPipeline</div>;
// }
// import { Button } from "@/components/ui/button";
// import {
//   Eye,
//   Filter,
//   BadgeQuestionMark,
//   Bell,
//   Notebook,
//   Plus,
//   Search,
//   Pen,
//   FileDown,
//   X,
// } from "lucide-react";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// import { CircleArrowDown, CircleArrowUp } from "lucide-react";
// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
// import { SurveysTable } from "@/data/Data";
// //import { motion, AnimatePresence } from "motion/react";
// import { useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
// import type { DateRange } from "react-day-picker";
// import React from "react";

// const color = "text-[var(--text)]";
// const color2 = "text-[var(--text-head)]";
// const Up = <CircleArrowUp className="text-[var(--green)] h-4" />;
// const Down = <CircleArrowDown className="text-[var(--red)] h-4" />;

// const stats = [
//   {
//     title: "Total Surveys Created",
//     value: "42",
//     icon: Notebook,
//     performance: Up,
//   },
//   {
//     title: "Active Surveys",
//     value: "17",
//     icon: Notebook,
//     performance: Up,
//   },
//   {
//     title: "Total Responses Collected",
//     value: "13,580",
//     icon: Notebook,
//     performance: Down,
//   },
// ];

// export function MyPipeline() {
//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex flex-col gap-2">
//         <h1 className="text-2xl font-bold text-[var(--text-head)]">Surveys</h1>
//         <StatsCards />
//         <Topbar />

//         <TableSection />
//       </div>
//     </div>
//   );
// }

// function Topbar() {
//   const [showFilter, setShowFilter] = useState(false);
//   return (
//     <div className="flex justify-between px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
//       <Button variant="brand" size="new">
//         <Plus className="h-3 w-3" />
//         <span> Create New Survey</span>
//       </Button>
//       <div className="flex gap-4 flex-wrap">
//         <Button variant="standard" size="new">
//           <BadgeQuestionMark className="h-3 w-3" />
//           <span className="">Manage Questions</span>
//         </Button>
//         <Button variant="standard" size="new">
//           <Eye className="h-3 w-3" />
//           <span className="">Import Questions (Excel/CSV)</span>
//         </Button>
//         <Button variant="standard" size="new">
//           <Eye className="h-3 w-3" />
//           <span className="">View Survey Results</span>
//         </Button>
//         <Button variant="standard" size="new">
//           <FileDown className="h-3 w-3" />
//           <span className="">Export Survey Data</span>
//         </Button>
//         <Button
//           variant="border"
//           onClick={() => setShowFilter(true)}
//           className="flex items-center gap-2 self-end min-h-[40px]"
//         >
//           <Filter className="h-4 w-4" />
//           {showFilter ? "Hide Filters" : "Show Filters"}
//         </Button>
//         {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}
//       </div>
//     </div>
//   );
// }

// interface FilterProps {
//   onClose: () => void;
// }

// function AdvancedFilters({ onClose }: FilterProps) {
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

//   // Filter states
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState<string[]>([]);
//   const [audience, setAudience] = useState<string[]>([]);
//   const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

//   const tabList = ["General", "Status", "Audience For", "Date Range"];

//   // Helper for checkbox
//   const handleStatusChange = (option: string) => {
//     setStatus((prev) =>
//       prev.includes(option)
//         ? prev.filter((s) => s !== option)
//         : [...prev, option]
//     );
//   };
//   const handleAudienceChange = (option: string) => {
//     setAudience((prev) =>
//       prev.includes(option)
//         ? prev.filter((a) => a !== option)
//         : [...prev, option]
//     );
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
//       <div
//         ref={modalRef}
//         className="relative w-full max-w-[700px] h-[500px] rounded-xl bg-[var(--background)] "
//       >
//         <div className="flex items-center justify-between mb-0 pb-4 p-6 min-w-full border-b-1">
//           <CardTitle className="text-2xl font-semibold text-[var(--text-head)]">
//             Filters
//           </CardTitle>
//           <Button
//             variant="link"
//             className="text-sm text-[var(--brand-color)] p-0 h-auto block hover:no-underline hover:cursor-pointer"
//             onClick={() => {
//               setSearch("");
//               setStatus([]);
//               setAudience([]);
//               setDateRange(undefined);
//             }}
//           >
//             Clear All
//           </Button>
//         </div>
//         {/* Sidebar */}
//         <div className="flex ">
//           <div className="overflow-y-auto min-w-[180px] border-r-1 h-[360px]">
//             <div className="flex flex-col ">
//               {tabList.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`text-left text-sm px-3 py-3 border-l-3  ${
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

//           {/* Tab Content */}
//           <div className="p-6 overflow-y-auto relative w-full">
//             {activeTab === "General" && (
//               <>
//                 <label htmlFor="Gen" className="text-[var(--text)]">
//                   Search by Survey Title / Creator:
//                 </label>
//                 <Input
//                   id="Gen"
//                   placeholder="Enter title or creator..."
//                   type="text"
//                   className="mt-4 w-full "
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </>
//             )}

//             {activeTab === "Status" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">Status:</p>
//                 <div className="flex flex-col gap-4 text-[var(--text)] ">
//                   {["Active", "Inactive", "Draft"].map((option) => (
//                     <label key={option} className="flex items-center gap-2">
//                       <Checkbox
//                         checked={status.includes(option)}
//                         onCheckedChange={() => handleStatusChange(option)}
//                       />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               </>
//             )}

//             {activeTab === "Audience For" && (
//               <>
//                 <p className="text-sm text-[var(--text-head)] mb-4">
//                   Audience For:
//                 </p>
//                 <div className="flex flex-col gap-4 text-[var(--text)] ">
//                   {["9–10", "11–12", "UG", "PG", "Professionals"].map(
//                     (option) => (
//                       <label key={option} className="flex items-center gap-2">
//                         <Checkbox
//                           checked={audience.includes(option)}
//                           onCheckedChange={() => handleAudienceChange(option)}
//                         />
//                         {option}
//                       </label>
//                     )
//                   )}
//                 </div>
//               </>
//             )}

//             {activeTab === "Date Range" && (
//               <>
//                 <label htmlFor="date-range" className="text-[var(--text)]">
//                   Date Range: Created or Last Active
//                 </label>
//                 <div className="mt-4 min-w-full">
//                   <DatePickerWithRange
//                     value={dateRange}
//                     onChange={setDateRange}
//                   />
//                 </div>
//               </>
//             )}
//             {/* Footer */}
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

// function StatsCards() {
//   return (
//     <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-4">
//       {stats.map((stat, index) => (
//         <Card
//           key={index}
//           className="xl:rounded-sm shadow-none bg-[var(--background)]"
//         >
//           <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
//             <div className="flex justify-between h-full items-center">
//               <div
//                 className={`${color} text-xs uppercase text-light line-clamp-1`}
//               >
//                 {stat.title}
//               </div>
//               {stat.performance}
//             </div>
//             <div className="flex  items-center gap-4">
//               <div className={`rounded-full `}>
//                 <stat.icon className={`h-8 w-8 ${color2}`} />
//               </div>
//               <div className={`${color2} text-2xl`}>{stat.value}</div>
//             </div>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// }

// function TableSection() {
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "ascending" | "descending";
//   } | null>(null);
//   const [selectedStack, setSelectedStack] = useState<typeof SurveysTable>(
//     SurveysTable[0] ? [SurveysTable[0]] : []
//   );
//   const [focusedId, setFocusedId] = useState<string | null>(
//     SurveysTable[0]?.id || null
//   );

//   // Sorting logic
//   const sortedData = [...SurveysTable];
//   if (sortConfig !== null) {
//     sortedData.sort((a, b) => {
//       let aValue = a[sortConfig.key as keyof typeof a];
//       let bValue = b[sortConfig.key as keyof typeof b];
//       // Special handling for 'for' (array), 'questions', 'responses', and 'lastUpdated' (date)
//       if (sortConfig.key === "for") {
//         aValue = Array.isArray(aValue) ? aValue.join(", ") : aValue;
//         bValue = Array.isArray(bValue) ? bValue.join(", ") : bValue;
//       }
//       if (sortConfig.key === "questions" || sortConfig.key === "responses") {
//         aValue = Number(aValue);
//         bValue = Number(bValue);
//       }
//       if (sortConfig.key === "lastUpdated") {
//         // Parse as date
//         aValue = Date.parse(aValue as string);
//         bValue = Date.parse(bValue as string);
//       }
//       if (aValue < bValue) {
//         return sortConfig.direction === "ascending" ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === "ascending" ? 1 : -1;
//       }
//       return 0;
//     });
//   }

//   const totalPages = Math.ceil(sortedData.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sortedData.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );

//   const requestSort = (key: string) => {
//     let direction: "ascending" | "descending" = "ascending";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "ascending"
//     ) {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Select All logic
//   const toggleSelectAll = () => {
//     if (selectedUsers.length === currentRecords.length) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(currentRecords.map((user) => user.id));
//     }
//   };

//   const bringToTop = (userId: string) => {
//     const coach = selectedStack.find((c) => c.id === userId);
//     if (coach) {
//       setSelectedStack((prev) => [
//         coach,
//         ...prev.filter((c) => c.id !== userId),
//       ]);
//       setFocusedId(userId);
//     }
//   };

//   useEffect(() => {
//     const allRows = document.querySelectorAll("tr[data-id]");

//     allRows.forEach((row) => {
//       const id = row.getAttribute("data-id");
//       const isInStack = selectedStack.some((us) => us.id === id);
//       const isTop = focusedId === id;

//       // Remove previous styles
//       row.classList.remove(
//         "bg-[var(--brand-color3)]",
//         "border-l-[var(--brand-color)]"
//       );

//       if (isInStack) {
//         row.classList.add("bg-[var(--brand-color3)]");

//         if (isTop) {
//           row.classList.add("border-l-[var(--brand-color)]");
//         }
//       }
//     });
//   }, [selectedStack, focusedId]);

//   const handleRowClick = (user: (typeof SurveysTable)[0]) => {
//     // Double-click detected
//     const exists = selectedStack.find((c) => c.id === user.id);
//     if (!exists) {
//       setSelectedStack((prev) => {
//         const updated = [user, ...prev];
//         return updated.slice(0, 5); // limit to 5
//       });
//       setFocusedId(user.id);
//     } else {
//       bringToTop(user.id);
//     }
//   };

//   const toggleSelectUser = (userId: string) => {
//     if (selectedUsers.includes(userId)) {
//       setSelectedUsers(selectedUsers.filter((id) => id !== userId));
//     } else {
//       setSelectedUsers([...selectedUsers, userId]);
//     }
//   };

//   return (
//     <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
//       <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
//         {/* Select All and badge UI */}
//         <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
//           <div className="flex items-center justify-between pl-0 p-4">
//             <div className="flex items-center gap-2 border-none shadow-none">
//               <Checkbox
//                 id="select-all-campaigns"
//                 checked={
//                   selectedUsers.length === currentRecords.length &&
//                   currentRecords.length > 0
//                 }
//                 onCheckedChange={toggleSelectAll}
//               />
//               <label
//                 htmlFor="select-all-campaigns"
//                 className="text-sm font-medium text-[var(--text)]"
//               >
//                 Select All
//               </label>
//               {selectedUsers.length > 0 && (
//                 <Badge variant="border" className="ml-2 ">
//                   {selectedUsers.length} selected
//                 </Badge>
//               )}
//             </div>

//             {selectedUsers.length > 0 && (
//               <div className="flex gap-2 ml-2">
//                 <Button variant="border" size="sm">
//                   <Bell className="h-4 w-4" />
//                   Send Reminder
//                 </Button>
//                 <Button variant="border" size="sm">
//                   <FileDown className=" h-4 w-4" />
//                   Export list
//                 </Button>
//                 <Button variant="delete" size="sm">
//                   <X className=" h-4 w-4 text-[var(--red)]" />
//                   Mark Inactive / Remove
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Search Bar */}
//           <div className="flex justify-end items-center gap-4 ">
//             <div className="flex justify-around items-center border-1 rounded-md overflow-hidden bg-[var(--faded)]">
//               <Input
//                 placeholder="Search"
//                 className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-2 py-1 w-40 sm:w-45"
//               />
//               <Button
//                 type="submit"
//                 size="icon"
//                 variant="standard"
//                 className="rounded-none rounded-r-md bg-[var(--button)]"
//                 aria-label="Search"
//               >
//                 <Search className="h-5 w-5 text-[var(--text)]" />
//               </Button>
//             </div>
//           </div>
//         </div>
//         {/* Table UI */}
//         <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
//           <Table className="w-full caption-top border-collapse overflow-y-visible">
//             <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
//               <TableRow>
//                 <TableHead className="min-w-[40px]"></TableHead>
//                 <TableHead
//                   onClick={() => requestSort("title")}
//                   className="cursor-pointer text-[var(--text)] text-low"
//                 >
//                   Title{" "}
//                   {sortConfig?.key === "title" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>
//                 <TableHead
//                   onClick={() => requestSort("createdBy")}
//                   className="cursor-pointer text-[var(--text)]"
//                 >
//                   Created By{" "}
//                   {sortConfig?.key === "createdBy" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>
//                 <TableHead
//                   onClick={() => requestSort("for")}
//                   className="cursor-pointer text-[var(--text)]"
//                 >
//                   For{" "}
//                   {sortConfig?.key === "for" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>
//                 <TableHead
//                   onClick={() => requestSort("questions")}
//                   className="cursor-pointer text-[var(--text)]"
//                 >
//                   Questions{" "}
//                   {sortConfig?.key === "questions" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>
//                 <TableHead
//                   onClick={() => requestSort("responses")}
//                   className="cursor-pointer text-[var(--text)]"
//                 >
//                   Responses{" "}
//                   {sortConfig?.key === "responses" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>
//                 <TableHead className="text-[var(--text)]">Status</TableHead>
//                 <TableHead
//                   onClick={() => requestSort("lastUpdated")}
//                   className="cursor-pointer text-[var(--text)]"
//                 >
//                   Last Updated{" "}
//                   {sortConfig?.key === "lastUpdated" &&
//                     (sortConfig.direction === "ascending" ? "↑" : "↓")}
//                 </TableHead>

//                 <TableHead className="text-[var(--text)]">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className="overflow-visible relative z-0">
//               {currentRecords.map((user) => (
//                 <TableRow
//                   key={user.id}
//                   data-id={user.id}
//                   className={cn(
//                     "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
//                     selectedStack.some((c) => c.id === user.id)
//                       ? "bg-[var(--brand-color3)]"
//                       : ""
//                   )}
//                   onClick={() => {
//                     toggleSelectUser(user.id);
//                     handleRowClick(user);
//                   }}
//                 >
//                   <TableCell
//                     className={cn(
//                       "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]",
//                       selectedStack.some((c) => c.id === user.id)
//                         ? focusedId === user.id
//                           ? "border-[var(--brand-color)]"
//                           : "border-transparent"
//                         : "border-transparent"
//                     )}
//                   >
//                     <Checkbox
//                       checked={selectedUsers.includes(user.id)}
//                       onClick={(e) => e.stopPropagation()}
//                       onCheckedChange={() => toggleSelectUser(user.id)}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-4">
//                       <div>
//                         <div className="flex justify-start items-center">
//                           <div className="font-medium">{user.title}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-low">{user.createdBy}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-low">{user.for}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-low">{user.questions}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-low">{user.responses}</div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="standard">{user.status}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-low">{user.lastUpdated}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="noborder"
//                         size="sm"
//                         className="bg-white border-0 shadow-none"
//                       >
//                         <Eye className="h-4 w-3" />
//                         <span className="sr-only">View</span>
//                       </Button>
//                       <Button
//                         variant="noborder"
//                         size="sm"
//                         className="bg-white border-0 shadow-none"
//                       >
//                         <Pen className="h-4 w-3" />
//                         <span className="sr-only">Edit</span>
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         <div className="flex items-center justify-between flex-wrap gap-2 p-4">
//           <div className="flex items-center gap-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="border"
//                   size="sm"
//                   className="flex items-center gap-2 text-low text-[var(--text-head)]"
//                 >
//                   {recordsPerPage}
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="text-[var(--text] dark:bg-[var(--background)]">
//                 {[10, 25, 50, 100].map((size) => (
//                   <DropdownMenuItem
//                     key={size}
//                     onClick={() => {
//                       setRecordsPerPage(size);
//                       setCurrentPage(1);
//                     }}
//                     className="text-[var(--text)] focus:bg-[var(--faded)]"
//                   >
//                     {size}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <span className="text-low text-[var(--text)]">
//               Showing {indexOfFirstRecord + 1}-
//               {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
//               {sortedData.length} explorers
//             </span>
//           </div>
//           <div className="flex items-center gap-2 ">
//             <Button
//               variant="border"
//               size="icon"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <Button
//                 key={page}
//                 variant={page === currentPage ? "brand" : "border"}
//                 size="sm"
//                 className={`h-8 w-8 p-0 ${
//                   page === currentPage ? "text-white" : "text-[var(--text)]"
//                 }`}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </Button>
//             ))}
//             <Button
//               variant="border"
//               size="icon"
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
