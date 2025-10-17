import { useEffect, useState } from "react"
import { Bell, Check, ChevronDown, Mars, MessageCircle, Search, Venus, X } from "lucide-react"
import { Eye, Flag, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import type { User } from "@/components/dashboard-page"
// import { useNavigate } from "react-router-dom"
import { mockUsers } from "@/data/Data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"

// interface ExplorerTableProps {
//     onViewUser: (user: User) => void;
// }
export default function ExplorerTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedCoachStack, setSelectedCoachStack] = useState<
    typeof mockUsers
  >(mockUsers[0] ? [mockUsers[0]] : []);
  const [focusedCoachId, setFocusedCoachId] = useState<string | null>( mockUsers[0]?.id || null);

  // Sorting logic
  const sortedData = [...mockUsers];
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
         currentRecords.map((user): string => user.id.toString())
       );
     }
   };

  const bringToTop = (userId: string) => {
    const coach = selectedCoachStack.find((c) => c.id === userId);
    if (coach) {
      setSelectedCoachStack((prev) => [
        coach,
        ...prev.filter((c) => c.id !== userId),
      ]);
      setFocusedCoachId(userId);
    }
  };

 useEffect(() => {
  const allRows = document.querySelectorAll("tr[data-id]");

  allRows.forEach((row) => {
    const id = String(row.getAttribute("data-id"));
    const isInStack = selectedCoachStack.some((coach) => coach.id === id);
    const isTop = focusedCoachId === id;

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
}, [selectedCoachStack, focusedCoachId]);

  {/*const removeCoach = (userId: string) => {
    setSelectedCoachStack((prev) => prev.filter((c) => c.id !== userId));
    if (focusedCoachId === userId) {
      setFocusedCoachId(null);
    }
  };*/}

  const handleRowClick = (user: (typeof mockUsers)[0]) => {
    // Double-click detected
    const exists = selectedCoachStack.find((c) => c.id === user.id);
    if (!exists) {
      setSelectedCoachStack((prev) => {
        const updated = [user, ...prev];
        return updated.slice(0, 5); // limit to 5
      });
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

  return (
    <div className="flex flex-row gap-4 w-full h-max xl:flex-nowrap flex-wrap">
      <div className="flex-1 rounded-md border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">
        <div className="flex h-20 items-center justify-between border-b p-4 mt-auto">
          <div className="flex items-center justify-between pl-0 p-4">
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
                    <div className="flex gap-2 ml-2">
                        <Button variant="border" size="sm">
                            <Bell className="h-4 w-4" />
                            Send Reminder
                        </Button>
                        <Button variant="border" size="sm">
                            <Check className=" h-4 w-4" />
                             Approve All
                        </Button>
                        <Button variant="delete" size="sm">
                            <X className=" h-4 w-4" />
                            Block / Remove
                        </Button>
                    </div>
                )}
          </div>
          <div className="flex justify-end items-center gap-4 ">
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
                {[5, 10, 25, 50, 100].map((size) => (
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

        <div className="overflow-x-auto text-[var(--text)] w-full px-0 mx-0 text-low">
          <Table className="w-full caption-top border-collapse overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead className="min-w-[40px]"></TableHead>
                <TableHead
                  onClick={() => requestSort("profile.name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Profile{" "}
                  {sortConfig?.key === "profile.name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("UserType")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  User Type{" "}
                  {sortConfig?.key === "UserType" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Contact")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Contact{" "}
                  {sortConfig?.key === "Contact" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("ProfileStage")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Profile Stage{" "}
                  {sortConfig?.key === "ProfileStage" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("assessments")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Assessments{" "}
                  {sortConfig?.key === "assessments" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Sessions")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Sessions{" "}
                  {sortConfig?.key === "Sessions" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("Source")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Source{" "}
                  {sortConfig?.key === "Source" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("lastActive")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Last Active / DOJ{" "}
                  {sortConfig?.key === "lastActive" &&
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
                <TableHead className="text-[var(--text)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {currentRecords.map((user) => (
                <TableRow
                    key={user.id}
                    data-id={user.id}
                    className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    selectedCoachStack.some((c) => c.id === user.id)
                    ? "bg-[var(--brand-color3)]"
                    : ""
                    )}
                    onClick={() => handleRowClick(user)}
                    >
                  <TableCell className={cn(
                    "pl-3 transition-all duration-200 border-l-4 group-hover:border-[var(--brand-color)]", // base classes
                    selectedCoachStack.some((c) => c.id === user.id)
                      ? focusedCoachId === user.id
                        ? "border-[var(--brand-color)]"
                        : "border-transparent"
                      : "border-transparent"
                    )}>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                  <TableCell  
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full overflow-hidden">
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="h-14 w-14 object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-start items-center">
                          <div className="font-medium">{user.name}</div>
                          <div className="flex items-center gap-1 ">
                            {user.gender === "M" ? (
                              <Mars className="h-4" />
                            ) : (
                              <Venus className="h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <div className="text-low">{user.email}</div>
                    <div className="text-xs text-[var(--text)]">
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="standard">{user.profileStage}</Badge>
                  </TableCell>
                  <TableCell>
                      <div className="text-sm">
                          {user.assessments.completed}/{user.assessments.total} Complete
                      </div>
                  </TableCell>
                  <TableCell>
                      <div className="text-sm">
                          {user.sessions.total} ({user.sessions.missed} Missed)
                      </div>
                  </TableCell>
                  <TableCell>{user.source}</TableCell>
                  <TableCell>
                      <div className="text-sm">{user.joinDate}</div>
                      <div className="text-xs text-[var(--text)]">{user.lastLogin}</div>
                  </TableCell>
                  <TableCell>
                      <Badge
                                    //@ts-ignore
                          variant={user.status === "Active" ? "success" : "secondary"}
                          className={user.status === "Active" ? "bg-[var(--green2)] text-[var(--green)]" : "bg-[var(--red2)] text-[var(--red)]"}
                      >
                          {user.status}
                      </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="noborder"
                        size="sm"
                        className="bg-white border-0 shadow-none"
                        // onClick={() => navigate(`/user-details/${user.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="noborder" size="sm" className="bg-[var(--background)] border-0 shadow-none">
                        <MessageCircle className="h-4 w-4" />
                        <span className="sr-only">Chat</span>
                      </Button>

                      <Button variant="noborder" size="sm" className="bg-[var(--background)] border-0 shadow-none">
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

        <div className="flex items-center justify-between flex-wrap gap-2 p-4">
          <div className="flex items-center gap-4">
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



    {/*<div className="xl:block hidden">
      <div className="lg:h-[500px] xl:min-w-90 xxl:min-w-100  sticky xl:top-[10px] shadow-none lg:scale-100 min-w-full h-fit">
        <AnimatePresence>
          {selectedCoachStack.map((coach, index) => {
            const isTopCard =
              coach.id === String(focusedCoachId) ||
              (focusedCoachId === null && index === 0);
            const cardIndex = selectedCoachStack.length - 1 - index;

            return (
              <motion.div
                key={coach.id}
                className="absolute left-0 right-0 mx-auto max-w-md w-full h-max cursor-pointer shadow-none"
                style={{
                  top: `${cardIndex * 30}px`,
                  zIndex: isTopCard ? 100 : 10 + cardIndex,
                }}
                onClick={() => bringToTop(coach.id)}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isTopCard ? 1 : 0.95,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={isTopCard ? {} : { scale: 0.97 }}
              >
                <motion.div
                  className="relative border h-full border-border rounded-lg overflow-hidden bg-background"
                  whileTap={isTopCard ? { scale: 0.98 } : {}}
                >
                  {!isTopCard && (
                    <motion.div
                      className="flex items-center justify-between text-xs text-[var(--text)] px-4 py-2 bg-accent/10 rounded-t-lg z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div>
                        <span className="truncate max-w-[100px] block">
                          {coach.name}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCoach(coach.id);
                          }}
                          className="text-[var(--red)] hover:text-[var(--red)/70] text-[16px]"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {isTopCard && (
                    
                    <motion.div
                      className="flex  flex-col  justify-center items-center p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex-col ">
                      <motion.img
                        src={coach.photo}
                        alt={coach.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg m-auto"
                        whileHover={{ scale: 1.05 }}
                      />
                      <h1 className="text-xl font-semibold mt-4 text-[var(--text-head)]">
                        {coach.name}
                      </h1>
                      <h2 className="text-sm text-[var(--text)] mb-2">
                        {coach.userType}
                      </h2>

                      <div className="flex justify-center gap-3 mt-2">
                        <motion.button
                          className="bg-[var(--green2)] rounded-full p-2 hover:[var(--green2)/80] transition-colors"
                          title="Call"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-5 h-5 text-[var(--green)]" />
                        </motion.button>
                        <motion.button
                          className="bg-[var(--red2)] rounded-full p-2 hover:bg-[var(--red2)/80] dark:bg-[var(--red2)] transition-colors"
                          title="Email"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail className="w-5 h-5 text-[var(--red)]" />
                        </motion.button>
                        <motion.button
                          className="bg-[var(--yellow2)] dark:bg-[var(--yellow2)] rounded-full p-2 hover:bg-[var(--yellow2)/80] transition-colors"
                          title="Message"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="w-5 h-5 text-[var(--yellow)]" />
                        </motion.button>
                      </div>
                      </div>
                      <div className="mt-6 text-sm text-left w-full">
                        <h3 className="font-semibold text-[var(--text-head)] mb-1">
                          PERSONAL INFORMATION
                        </h3>
                        <p className="text-[var(--text)] text-sm mb-4">
                          This coach has not added a bio.
                        </p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-[var(--text)]">
                          <div className="font-medium">Designation</div>
                          <div>{coach.userType}</div>
                          <div className="font-medium">Email ID</div>
                          <div>{coach.email}</div>
                          <div className="font-medium">Phone No</div>
                          <div>{coach.phone}</div>
                          <div className="font-medium">Lead Score</div>
                          <div>-</div>
                          <div className="font-medium">Tags</div>
                          <div className="flex gap-2">
                            <Badge variant="brand" className="text-xs ">
                              Lead
                            </Badge>
                            <Badge variant="brand" className="text-xs">
                              Partner
                            </Badge>
                          </div>
                          <div className="font-medium">Last Contacted</div>
                          <div>{coach.lastLogin}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>*/}
    </div>
  );
}
