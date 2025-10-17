import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function EditRole() {
  return (
    <div className="flex gap-4 flex-row">
      <div className="flex flex-col p-6 gap-2 bg-[var(--background)] rounded-sm">
        <div className="flex justify-center items-center ">
          <div className="bg-[var(--brand-color2)] flex flex-col border-l-4 gap-2 border-l-[var(--brand-color)] p-4">
            <p className="text-sm text-[var(--text)]">
              Changing role permissions won't affected current staff members
              permissions that are using this role.
            </p>
            <div className="flex gap-2">
              <Checkbox className="text-sm text-[var(--text)]" />
              <span className="text-sm font-semibold text-[var(--text)]">
                Update all staff members permissions that are using this role
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4 text-[var(--text)] flex flex-col">
        <div className="flex flex-col pb-4 w-full gap-4">
          <div className="col-span-1 w-full flex flex-col gap-2">
            <Label className="text-sm font-semibold">Role Name</Label>
            <Input placeholder="Enter Role Name" className="" />
          </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label className="text-sm font-semibold">Department</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="HOD">HOD</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Roles />
      </div>
    </div>
  );
}

const HeaderRow = () => (
  <div className="grid grid-cols-8 gap-2 px-4 pt-0 mt-0 py-2 items-center rounded-t-sm text-sm font-medium">
    <span className="col-span-2">Roles & Permissions</span>
    <span className="text-center">Edit</span>
    <span className="text-center">Add</span>
    <span className="text-center">Delete</span>
    <div></div>
    <div className="col-span-1">
      <div className="text-center">View</div>
      <div className="flex gap-4 justify-center text-xs font-normal px-4 mt-1">
        <span>Global</span>
        <span>Branch</span>
        <span>Own</span>
      </div>
    </div>
  </div>
);

function PermissionSection({
  title,
  rows,
  isOpen,
  onToggle,
  checkboxState,
  setCheckboxState,
}: {
  title: string;
  rows: string[];
  isOpen: boolean;
  onToggle: () => void;
  checkboxState: boolean[][];
  setCheckboxState: React.Dispatch<React.SetStateAction<boolean[][]>>;
}) {
  const handleToggle = (rowIdx: number, colIdx: number) => {
    const updated = [...checkboxState];
    updated[rowIdx][colIdx] = !updated[rowIdx][colIdx];
    setCheckboxState(updated);
  };

  const handleSelectAllCol = (colIdx: number) => {
    const isAllChecked = checkboxState.every((row) => row[colIdx]);
    const updated = checkboxState.map((row) => {
      const newRow = [...row];
      newRow[colIdx] = !isAllChecked;
      return newRow;
    });
    setCheckboxState(updated);
  };

  return (
    <div className="border rounded-sm overflow-hidden">
      {/* Header row */}
      <div className="bg-[var(--faded)] grid grid-cols-8 px-4 py-3 text-sm font-semibold w-full gap-2 items-center">
        {/* Title */}
        <div className="col-span-2 flex items-center">
          <span>{title}</span>
        </div>
        {isOpen && (
          <>
            {/* Select All Checkboxes */}
            {[...Array(3)].map((_, colIdx) => (
              <div key={colIdx} className="text-center">
                <Checkbox
                  checked={checkboxState.every((row) => row[colIdx])}
                  onCheckedChange={() => handleSelectAllCol(colIdx)}
                />
                {/* Optional: add label like 'Edit' if needed */}
              </div>
            ))}
            <div></div>
            <div className="col-span-1 justify-center flex  gap-8 px-4">
              {[...Array(3)].map((_, colIdx) => (
                <div key={colIdx + 3} className="text-center">
                  <Checkbox
                    checked={checkboxState.every((row) => row[colIdx + 3])}
                    onCheckedChange={() => handleSelectAllCol(colIdx + 3)}
                  />
                  {/* Optional: add label like 'Edit' if needed */}
                </div>
              ))}
            </div>
          </>
        )}
        <div className={` ${isOpen ? "hidden" : "block col-span-5"}`}></div>
        {/* Chevron Toggle */}
        <div className="flex justify-end">
          <ChevronDown
            onClick={onToggle}
            className={`transition-transform cursor-pointer ${
              isOpen ? "rotate-180" : ""
            }`}
            size={18}
          />
        </div>
      </div>

      {/* Animated Section Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`${title}-section`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {rows.map((label, rowIdx) => (
              <div
                key={label}
                className="grid grid-cols-8 gap-2 px-4 py-2 items-center border-t text-sm"
              >
                <span className="col-span-2">{label}</span>

                {[...Array(3)].map((_, colIdx) => (
                  <div key={colIdx} className="text-center">
                    <Checkbox
                      checked={checkboxState[rowIdx][colIdx]}
                      onCheckedChange={() => handleToggle(rowIdx, colIdx)}
                    />
                  </div>
                ))}
                <div className="col-span-1"></div>
                <div className="col-span-1 justify-center flex gap-8 px-4">
                  {[...Array(3)].map((_, colIdx) => (
                    <div key={colIdx + 3} className="text-right">
                      <Checkbox
                        checked={checkboxState[rowIdx][colIdx + 3]}
                        onCheckedChange={() => handleToggle(rowIdx, colIdx + 3)}
                      />
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Roles() {
  const Segments = [
    "Select All",
    "6 Students",
    "7-8 Students",
    "9-10 Students",
    "11-12 Students",
    "UG Students",
    "PG Students",
    "Professionals",
    "Entrepreneurs",
    "Career Changers",
    "Home Makers",
    "Coaches",
    "Consultants",
    "Mentors",
    "Educators",
    "Partners",
    "Colleges",
    "Schools",
    "Universities",
    "Corporates",
    "NGO's",
    "Institutes",
  ];

  const PlatformDesk = [
    "Select All",
    "Recent Activity",
    "Explorers",
    "Plans",
    "Products",
    "Desk IAM",
  ];

  const RelationDesk = [
    "Select All",
    "Search",
    "My Pipeline",
    "Leads",
    "Explorers",
    "Coaches",
    "Organisations",
    "Channel Partner",
    "Partners",
    "Cases",
    "Problems",
    "Bugs",
    "Abuses",
    "My Accounts",
    "My Teams",
    "Leaderboard",
  ];

  const DigitalDesk = [
    "Select All",
    "Compaigns",
    "Web",
    "App",
    "WhatsApp",
    "Email",
    "Insights",
    "Comments",
    "Feedback",
    "Review",
    "Video",
    "FAQs",
    "Surveys",
    "Help Articles",
    "Helpful",
    "In the News",
    "Templates",
    "Testimonials",
    "Teams Directory",
  ];

  const ReviewDesk = [
    "Select All",
    "Partners",
    "Coach Profiles",
    "Organisations",
    "Institutes",
    "Schools",
    "Colleges",
    "Universities",
    "Companies",
    "NGO's",
    "Channel Partners",
    "Libraries",
    "Careers",
    "Skills",
    "Degrees",
    "Exams",
    "Courses",
    "Scholarships",
    "Study Materials",
    "Map Listing",
    "Forms",
  ];

  const DevOpsDesk = [
    "Select All",
    "My Pipeline",
    "Cases",
    "My Segment",
    "Leaderboard",
  ];

  const FinanceDesk = [
    "Select All",
    "Payments",
    "Commisions",
    "Payouts",
    "Platform",
    "Earnings",
    "P&L",
    "Reports",
  ];

  const [openSection, setOpenSection] = useState<string | null>("Segments");

  const [segment, setSegment] = useState(
    Array(Segments.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [platformState, setPlatformState] = useState(
    Array(PlatformDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [relationState, setRelationState] = useState(
    Array(RelationDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [DigitalState, setDigitalState] = useState(
    Array(DigitalDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [reviewState, setReviewState] = useState(
    Array(ReviewDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [devOpsState, setDevOpsState] = useState(
    Array(DevOpsDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  const [financeState, setFinanceState] = useState(
    Array(FinanceDesk.length)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  return (
    <div className="space-y-4 text-[var(--text)] flex flex-col">
      <div className="space-y-2 text-sm font-medium">
        <HeaderRow />

        <PermissionSection
          title="Segments"
          rows={Segments}
          isOpen={openSection === "Segments"}
          onToggle={() =>
            setOpenSection((prev) => (prev === "Segments" ? null : "Segments"))
          }
          checkboxState={segment}
          setCheckboxState={setSegment}
        />

        <PermissionSection
          title="Platform Desk"
          rows={PlatformDesk}
          isOpen={openSection === "Platform Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "Platform Desk" ? null : "Platform Desk"
            )
          }
          checkboxState={platformState}
          setCheckboxState={setPlatformState}
        />

        <PermissionSection
          title="Relations Desk"
          rows={RelationDesk}
          isOpen={openSection === "Relations Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "Relations Desk" ? null : "Relations Desk"
            )
          }
          checkboxState={relationState}
          setCheckboxState={setRelationState}
        />

        <PermissionSection
          title="Digital Desk"
          rows={DigitalDesk}
          isOpen={openSection === "Digital Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "Digital Desk" ? null : "Digital Desk"
            )
          }
          checkboxState={DigitalState}
          setCheckboxState={setDigitalState}
        />

        <PermissionSection
          title="Review Desk"
          rows={ReviewDesk}
          isOpen={openSection === "Review Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "Review Desk" ? null : "Review Desk"
            )
          }
          checkboxState={reviewState}
          setCheckboxState={setReviewState}
        />

        <PermissionSection
          title="DevOps Desk"
          rows={DevOpsDesk}
          isOpen={openSection === "DevOps Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "DevOps Desk" ? null : "DevOps Desk"
            )
          }
          checkboxState={devOpsState}
          setCheckboxState={setDevOpsState}
        />

        <PermissionSection
          title="Finance Desk"
          rows={FinanceDesk}
          isOpen={openSection === "Finance Desk"}
          onToggle={() =>
            setOpenSection((prev) =>
              prev === "Finance Desk" ? null : "Finance Desk"
            )
          }
          checkboxState={financeState}
          setCheckboxState={setFinanceState}
        />
      </div>
    </div>
  );
}
