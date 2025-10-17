import { Building2, UserCheck, Globe, Clock, Link } from "lucide-react";
import { Card, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Filter, } from "lucide-react";
import { useState } from "react";

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import DatePick from "@/components/ui/DatePicker"
import CitySelection from "@/components/ui/CitySelection";
import { DatePickerWithRange } from "@/components/date-picker";

import{
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
  


const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";
const orgStats = [
    {
        title: "Total Organisations",
        value: "1438",
        icon: Building2,
    },
    {
        title: "Claimed Profiles",
        value: "456",
        icon: UserCheck,
    },
    {
        title: "Public (Unclaimed)",
        value: "982",
        icon: Globe,
    },
    {
        title: "Pending Approvals",
        value: "12",
        icon: Clock,
    },
    {
        title: "Representative Assigned",
        value: "182",
        icon: Link,
    },
];



export function Organisation() {

    return (
        <div className="flex flex-col gap-2">
            <Topbar />
            <OrgCard />
            <OrganisationTables />
        </div>
    )
}

function Topbar() {
  
    const [showFilter, setShowFilter] = useState(false);
    return (
      <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-head)]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Organisation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </h1>
        </div>
        <div className="flex gap-4">
          <DatePickerWithRange />
          <Button
          variant="standard"
          size="new"
          onClick={() => setShowFilter(true)}
        >
          <Filter className="h-3 w-3" />
        </Button>
  
        {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}
        </div>
      </div>
    );
  }
  

interface OrgFilterProps {
    onClose: () => void;
}


function AdvancedFilters({ onClose }: OrgFilterProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("General");

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

    const [type, setType] = useState("School");
    const [claim, setClaim] = useState("Claimed");
    const [coach, setCoach] = useState("Yes");
    const [session, setSession] = useState("10+");

    const tabList = [
        "General",
        "Type",
        "Claim Status",
        "Location",
        "Affiliated Coaches",
        "Sessions Conducted",
        "Last Activity",
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">

            <div
                ref={modalRef}
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
                        {activeTab === "General" && (
                            <>
                                <label htmlFor="Gen" className="text-[var(--text)]">Enter Name/Email/Phone :</label>
                                <Input id="Gen" placeholder="Enter .." type="text" className="mt-4 w-full " />

                            </>
                        )}

                        {activeTab === "Type" && (
                            <>
                                <p className="text-sm text-[var(--text-head)] mb-4">
                                    Select the type of Organisation you are:
                                </p>
                                <div className="flex flex-col gap-4 text-[var(--text)] ">
                                    {[
                                        "School",
                                        "Institute",
                                        "Collage",
                                        "University",
                                        "NGO",
                                        "Corporation",
                                    ].map((option) => (
                                        <RadioButton
                                            key={option}
                                            label={option}
                                            value={option}
                                            selected={type}
                                            onChange={setType}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === "Claim Status" && (
                            <>
                                <p className="text-sm text-[var(--text-head)] mb-4">
                                    Select Your Current Claim Status:
                                </p>
                                <div className="flex flex-col gap-4 text-[var(--text)] ">
                                    {[
                                        "Claimed",
                                        "Public (Unclaimed)",
                                        "Pending Approval",
                                    ].map((option) => (
                                        <RadioButton
                                            key={option}
                                            label={option}
                                            value={option}
                                            selected={claim}
                                            onChange={setClaim}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === "Location" && (
                            <>
                                <CitySelection />
                            </>
                        )}

                        {activeTab === "Affiliated Coaches" && (
                            <>
                                <p className="text-sm text-[var(--text-head)] mb-4">
                                    Are you Affiliated with Coaches:
                                </p>
                                <div className="flex flex-col gap-4 text-[var(--text)] ">
                                    {[
                                        "Yes",
                                        "No",
                                    ].map((option) => (
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

                        {activeTab === "Sessions Conducted" && (
                            <>
                                <p className="text-sm text-[var(--text-head)] mb-4">
                                    How Many Sessions have you Conducted:
                                </p>
                                <div className="flex flex-col gap-4 text-[var(--text)]  ">
                                    {[
                                        "0",
                                        "1-10",
                                        "10+",
                                    ].map((option) => (
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

                        {activeTab === "Last Activity" && (
                            <>
                                <label htmlFor="act" className="text-[var(--text)]">Enter You Last Activity Date:</label>
                                <div className="mt-4 min-w-full">
                                    <DatePick />
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

function OrgCard() {
    return (
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
            {orgStats.map((stat, index) => (
                <Card key={index} className="rounded-sm shadow-none bg-[var(--background)]">
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


const statusTabs = [
  { label: "Colleges",     value: "College" },
  { label: "Companies",    value: "Corporation" },
  { label: "institutes",   value: "Institute" },
  { label: "NGOs",         value: "NGO" },
  { label: "Schools",      value: "School" },
  { label: "Universities", value: "University" },
] as const;

type TabValue = typeof statusTabs[number]["value"];

// Import each table (same design inside each)
import CollegeTable from "./Organisation/Colleges";
import CompanyTable from "./Organisation/Companies";
import InstituteTable from "./Organisation/Institute";
import NgoTable from "./Organisation/Ngo";
import SchoolTable from "./Organisation/Schools";
import UniversityTable from "./Organisation/Universities";

// Map tab value → component
const TabComponents: Record<TabValue, React.ComponentType<any>> = {
  College: CollegeTable,
  Corporation: CompanyTable,
  Institute: InstituteTable,
  NGO: NgoTable,
  School: SchoolTable,
  University: UniversityTable,
};

type OrganisationTablesProps = {
  data?: any[]; // optional single-API dataset to pass down if you want
  onView?: (id: string) => void;
  onApprove?: (id: string) => void;
  onBlock?: (id: string) => void;
};

export default function OrganisationTables({
  data,
  onView,
  onApprove,
  onBlock,
}: OrganisationTablesProps) {
  const [active, setActive] = useState<TabValue>("College");
  const ActiveTable = TabComponents[active] ?? CollegeTable;

  return (
    <div className="flex flex-col w-full">
      {/* Tabs */}
      <div className="flex text-sm font-medium">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              "px-4 py-2 rounded-t-sm border transition-colors",
              active === tab.value
                ? "text-white bg-[var(--brand-color)]"
                : "text-[var(--text)] bg-[var(--background)] hover:bg-[var(--faded)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active table mounts here */}
      <div className="rounded-md border bg-[var(--background)]">
        <ActiveTable
          key={active}   // remount on tab change to isolate per-table state
          data={data}    // pass through if your tables use it
          type={active}  // optional hint to child
          onView={onView}
          onApprove={onApprove}
          onBlock={onBlock}
        />
      </div>
    </div>
  );
}

