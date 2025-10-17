
import { Clock,Users, FileCheck2, FileText, CheckCircle2,  } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter,  } from "lucide-react";
import { useState } from "react";
import * as React from "react";

import { useEffect } from "react";
import RadioButton from "@/components/ui/Radiobutton";
import { DateRangePicker } from "@/components/ui/RangeCalender";
import CoachesTable from "./PoolTables/CoachesTable";
import OrganisationTable from "./PoolTables/OrganisationTable"; 
import ChannelPartnerTable from "./PoolTables/ChannelPartnerTable";
import LibraryTable from "./PoolTables/LibraryTable";
import MapListingTable from "./PoolTables/MapListingTable";
import CustomInputTable from "./PoolTables/CustomInputTable";
import ApprovedTable from "./PoolTables/ApprovedTable";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Stats = [
  {
    title: "Coach Profiles",
    value: "34",
    icon: Users,
  },
  {
    title: "Organisations",
    value: "12",
    icon: FileCheck2,
  },
  {
    title: "Channel Partners",
    value: "10",
    icon: FileText,
  },
  {
    title: "Library",
    value: "19",
    icon: Clock,
  },
  {
    title: "Map Listings",
    value: "7",
    icon: CheckCircle2,
  },
   {
    title: "Custom input",
    value: "15",
    icon: Clock,
  },
];

export function Pool() {
  return (
    <div className="flex flex-col gap-2">
      <Topbar />
      <SessionStats />
      <SessionTabs />
    </div>
  );
}

function Topbar() {
  
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Review Pool</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
      <div className="flex gap-4">
        <Button
        variant="standard"
        size="new"
        onClick={() => setShowFilter(true)}
      >
        <Filter className="h-3 w-3" />
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
  const [activeTab, setActiveTab] = useState("Approval Type");

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

  const [approvalType, setApprovalType] = useState("Coach");

  const tabList = [
    "Approval Type",
    "Submitted Date",
    "Search",
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

          <div className="p-6 overflow-y-auto relative w-full">
            {activeTab === "Search" && (
              <>
                <label htmlFor="Search" className="text-[var(--text)]">Search by Name / Email / Organisation :</label>
                <Input id="Search" placeholder="Enter .." type="text" className="mt-4 w-full " />
              </>
            )}

            {activeTab === "Approval Type" && (
              <>
                <p className="text-sm text-[var(--text-head)] mb-4">
                  Select the Approval Type:
                </p>
                <div className="flex flex-col gap-4 text-[var(--text)] ">
                  {[
                    "Coach",
                    "Organisation",
                    "Channel Partner",
                    "Library",
                    "Map Listing",
                    "Custom Input",
                  ].map((option) => (
                    <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={approvalType}
                      onChange={setApprovalType}
                    />
                  ))}
                </div>
              </>
            )}

            
            {activeTab === "Submitted Date" && (
              <>
                <label htmlFor="Submitted Date" className="text-[var(--text)]">Enter the Submitted Date :</label>
                <div className="mt-4 min-w-full">
                  <DateRangePicker />
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

function SessionStats() {
const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
      {Stats.map((stat, index) => (
        <Card key={index} className="rounded-sm shadow-none flex justify-center  bg-[var(--background)]">
          <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
            <div className="flex justify-between items-center">
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




const tabs = [
  { label: "Coaches", value: "Coaches" },
  { label: "Organisations", value: "Organisations" },
  { label: "Channel Partners", value: "Channel Partners" },
  { label: "Library", value: "Library" },
  { label: "Map Listings", value: "Map Listings" },
  { label: "Custom Input", value: "Custom Input" },
  { label: "Approved", value: "Approved" },
];

function SessionTabs() {
  const [activeTab, setActiveTab] = useState("Coaches");

  const renderTable = () => {
    switch (activeTab) {
      case "Coaches":
        return <CoachesTable />;
      case "Organisations":
        return <OrganisationTable />;
      case "Channel Partners":
        return <ChannelPartnerTable />;
      case "Library":
        return <LibraryTable />;  
      case "Map Listings":
        return <MapListingTable />;
        case "Custom Input":
          return <CustomInputTable />;
      case "Approved":
        return <ApprovedTable />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "brand" : "border"}
            onClick={() => setActiveTab(tab.value)}
            className="border-b-2 rounded-t-sm rounded-b-none"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Active Table */}
      <div>{renderTable()}</div>
    </div>
  );
}
