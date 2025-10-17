import { useState } from "react";
import { Eye,X, Pen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


interface Role {
  id: string;
  name: string;
  department: string;
  totalUsers: number;
}

const rolesData: Role[] = [
  { id: "1", name: "Admin", department: "Admin", totalUsers: 4 },
  { id: "2", name: "HOD", department: "Digital", totalUsers: 2 },
  { id: "3", name: "DevOps Executive", department: "Relations", totalUsers: 13 },
  { id: "4", name: "Executive", department: "Finance", totalUsers: 1 },
  { id: "5", name: "Executive", department: "DevOps", totalUsers: 4 },
  { id: "6", name: "Team Lead", department: "Relations", totalUsers: 2 },
  { id: "7", name: "Manager", department: "Relations", totalUsers: 2 },
];


function Topbar() {
  
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] h-[64px] mb-4 rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">DeskIAM</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Manage Roles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
    </div>
)}



export function ManageRoles() {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  // Sorting logic
  const sortedData = [...rolesData];
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


  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <>
    <Topbar/>
    <div className="flex flex-col gap-4 w-1/2 h-max xl:flex-nowrap flex-wrap">
      <div>
        <Button variant="brand" size="new" className="text-white"
        onClick={() => navigate("addRole")}>
          <Plus className="h-4 w-4" />
          <span>Add Role</span>
        </Button>
      </div>
      <div className="flex-1 rounded-md rounded-tl-none border bg-[var(--background)] overflow-x-auto xl:min-w-auto min-w-full">

        <div className="overflow-x-auto lg:overflow-x-visible text-[var(--text)] w-full px-0 mx-0 text-low">
<Table className="caption-top border-collapse  overflow-y-visible">
            <TableHeader className="bg-[var(--faded)] hover:bg-[var(--faded)] dark:bg-[var(--faded)] opacity-100">
              <TableRow>
                <TableHead
                  onClick={() => requestSort("name")}
                  className="cursor-pointer text-[var(--text)] text-low"
                >
                  Role Name{" "}
                  {sortConfig?.key === "name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  onClick={() => requestSort("department")}
                  className="cursor-pointer text-[var(--text)]"
                >
                  Department{" "}
                  {sortConfig?.key === "department" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-[var(--text)] w-[10px] text-center pr-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-visible relative z-0">
              {rolesData.map((role) => (
                <TableRow
                  key={role.id}
                  data-id={role.id}
                  className={cn(
                    "relative z-10 cursor-pointer transition-all duration-200 group hover:bg-[var(--brand-color2)]",
                    
                  )}
                  onClick={() => {
                    toggleSelectUser(role.id);
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex justify-start flex-col">
                          <div className="font-medium">{role.name}</div>
                          <div className="text-xs">TotalUsers : {role.totalUsers}</div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                      <TableCell>
                          <div className="text-sm">
                              <div>{`${role.department}`}</div>
                          </div>
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
                        className="hover:text-[var(--brand-color)]"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            View
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button
                        variant="actionIcon"
                        size="actionIcon"
                        onClick={() => {
                          navigate("editRole");
                        }}
                      >
                        <Pen className="h-4 w-4 "/>
                        <span className="sr-only">Add to Degree List</span>
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="hover:text-[var(--red)]"
                      >
                        <X className="h-4 w-4 " />
                        <span className="sr-only">Reject</span>
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
      </div>
    </div>
    </>
  );
}
