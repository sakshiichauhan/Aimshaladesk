// components/modals/CoachDetailModal.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import {  Phone, Video, MessageSquare, MapPin, Users, FileText, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import file from "@/assets/icons/file.png";


// ---------- Types you already have ----------
export type ExpertiseMode = {
  call?: boolean;
  video?: boolean;
  chat?: boolean;
  inPerson?: boolean;
  group?: boolean;
  resources?: boolean;
};
export type Expertise = {
  label: string;
  available: boolean;
  modes?: ExpertiseMode;
};
export type CoachExpertiseRow = {
  id: string;
  name: string;
  code: string;
  avatarUrl?: string;
  coachType: "Consultant" | "Coach" | "Mentor";
  expertise: Expertise[];
  feeText: string;
  status: "active" | "inactive";
};

// ---------- Hook so you can open from other files ----------
export function useCoachDetailModal() {
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState<CoachExpertiseRow | null>(null);

  const openCoachDetail = (r: CoachExpertiseRow) => {
    setRow(r);
    setOpen(true);
  };
  const closeCoachDetail = () => setOpen(false);

  const Modal = (
    <CoachDetailModal
      open={open}
      onClose={closeCoachDetail}
      row={row}
    />
  );

  return { openCoachDetail, closeCoachDetail, Modal };
}

// ---------- The modal itself ----------
export function CoachDetailModal({
  open,
  onClose,
  row,
}: {
  open: boolean;
  onClose: () => void;
  row: CoachExpertiseRow | null;
}) {
  if (!open || !row) return null;

  // Tiny helpers (icons line)
  const ModeIcons = ({ m }: { m?: ExpertiseMode }) => {
    if (!m) return null;
    return (
      <span className="inline-flex items-center gap-2 text-[11px] opacity-80">
        {m.call && <Phone className="h-3.5 w-3.5" />}
        {m.video && <Video className="h-3.5 w-3.5" />}
        {m.chat && <MessageSquare className="h-3.5 w-3.5" />}
        {m.inPerson && <MapPin className="h-3.5 w-3.5" />}
        {m.group && <Users className="h-3.5 w-3.5" />}
        {m.resources && <FileText className="h-3.5 w-3.5" />}
      </span>
    );
  };

  // Section: header card (avatar, name, dept)
  const HeaderCard = () => (
    <div className="flex-row items-center"> 
       <h3 className="text-[var(--text-head)] text-[20px] font-semibold pb-[32px]">Coach Expertise</h3>
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src={row.avatarUrl}
          alt={row.name}
          className="h-[75px] w-auto rounded-full object-cover border"
        />
        <span className="absolute right-1.5 bottom-1.5 h-2.5 w-2.5 rounded-full bg-[var(--green)] ring-2 ring-white" />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-[var(--text-head)] text-[24px]">{row.name}</div>
        <div className="text-xs text-[var(--text)] text-[16px]">
          {row.coachType} · {row.code}
        </div>
      </div>
    </div>
    </div>
  );

  
  const ServiceBlock = ({
    title = "Academic Consultation",
    active = true,
    blurb = "Guide students in studying abroad.",
    areas = [
      "Stream Selection",
      "Career Path Guidance",
      "College Selection",
      "Exam Preparation",
      "Study Skills",
      "Interview Prep",
      "Study Abroad",
      "Peer & Parental Pressure",
      "Work-Life Balance",
      "Confidence Building",
      "Resume Help",
    ],
    targetStudents = [
      "Class 5th–8th",
      "Class 9th–10th",
      "Class 11th–12th",
      "College & Graduates",
      "Postgraduates",
    ],
    targetProfessionals = [
      "Professionals",
      "Entrepreneurs",
      "Career Changers",
      "Home Makers",
    ],
    prices = [
      { label: "1:1 Call", mins: 30, price: 999, mrp: 1150, modes: { call: true } },
      { label: "In-Person", mins: 30, price: 999, mrp: 1150, modes: { inPerson: true } },
      { label: "Call", mins: 30, price: 999, mrp: 1150, modes: { call: true } },
      { label: "Chat", mins: 30, price: 999, mrp: 1150, modes: { chat: true } },
    ],
  }: {
    title?: string;
    active?: boolean;
    blurb?: string;
    areas?: string[];
    targetStudents?: string[];
    targetProfessionals?: string[];
    prices?: { label: string; mins: number; price: number; mrp?: number; modes?: ExpertiseMode }[];
  }) => (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-[20px] text-[var(--text-head)]">{title}</div>
          <Badge
            variant="standard"
            className={cn(
              "px-[12px] py-[4px] text-[14px] text-[var(--text)] rounded-full",
              active
                ? "bg-[var(--green2)] text-[var(--green)]"
                : "bg-[var(--red2)] text-[var(--red)]"
            )}
          >
            {active ? "Active" : "Deactivated"}
          </Badge>
        </div>
        <div className="text-[14px] text-[var(--text)] mt-1">
          {blurb}
        </div>
      </div>

      <div className="p-4 space-y-3 text-[13px]">
        <div>
          <span className="font-semibold text-[14px] text-[var(--text)]">Title:</span>{" "}
          <span className="text-[14px] text-[var(--text)]">Education Consultation</span>
        </div>
        <div>
          <span className="font-semibold text-[14px] text-[var(--text)]">Description:</span>{" "}
          <span className="text-[14px] text-[var(--text)]">Education Consultation</span>
        </div>
        <div>
          <div className="font-semibold text-[14px] text-[var(--text)] mb-1">Areas of Expertise</div>
          <div className="flex flex-wrap">
            {areas.map((a) => (
              <span
                key={a}
                className="text-[14px] text-[var(--text)] font-normal leading-normal after:content-['|'] after:mx-2 after:text-[var(--text)] after:opacity-50 last:after:content-['']"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <div className="font-semibold text-[14px] text-[var(--text)] mb-1">Target Group</div>
            <div className="text-[14px] text-[var(--text)]">
              <span className="font-medium text-[14px] text-[var(--text)]">Students: </span>
              {targetStudents.join(" | ")}
            </div>
            <div className="text-[14px] text-[var(--text)]">
              <span className="font-medium">Professionals: </span>
              {targetProfessionals.join(" | ")}
            </div>
          </div>
          <div>
            <div className="font-semibold text-[14px] text-[var(--text)] mb-1">Prices</div>
            <div className="flex flex-row gap-2 w-full flex-wrap">
              {prices.map((p) => (
                <div
                  key={p.label}
                  className="border rounded-lg p-2 flex items-center gap-2 bg-white"
                >
                  <div className="h-8 w-8 rounded-md bg-[var(--faded)] grid place-items-center">
                    <ModeIcons m={p.modes} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] text-[var(--text)] font-medium">{p.label}</div>
                    <div className="text-[14px] text-[var(--text)]">
                      {p.mins} Mins{" "}
                      <span className="ml-2 font-medium text-[var(--brand-color)]">
                        ₹{p.price}
                      </span>
                      {p.mrp && (
                        <span className="ml-1 line-through opacity-70">
                          ₹{p.mrp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourceItem = ({
    title,
    price,
    mrp = 1500,
  }: {
    title: string;
    price: number;
    mrp?: number;
  }) => (
    <div className="rounded-xl border border-black/5 bg-[var(--background)] p-3 sm:px-4 ">
      <div className="flex items-center gap-3">
        {/* file icon tile */}
        <div className="h-full flex items-center justify-center">
        <img src={file} alt={title} className="h-12 w-12 " />
      </div>
  
        {/* text */}
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold leading-5 text-[var(--text)]">{title}</div>
          <div className="text-[14px] text-[var(--text)] truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </div>
          <div className="text-[14px] mt-1">
            <span className="font-semibold text-[var(--text)]">Price: </span>
            <span className="font-semibold text-[var(--brand-color)]">₹{price}</span>{" "}
            <span className="line-through opacity-60">₹{mrp}</span>
          </div>
        </div>
  
        {/* actions */}
        <div className="flex items-start gap-2 ml-2">
          <Button
            variant="border"
            size="sm"
            className="h-8 px-3 rounded-lg bg-[var(--brand-color3)] text-[var(--brand-color)] border-[var(--brand-color2)] hover:bg-[var(--brand-color2)]"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Open
          </Button>
          <Button
            variant="border"
            size="sm"
            className="h-8 px-3 rounded-lg bg-[var(--faded)] text-[color:rgba(0,0,0,0.6)]"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
  
  const ResourcesBlock = ({
    title = "Resources",
    active = false,
    blurb = "Help with educational planning.",
  }: {
    title?: string;
    active?: boolean;
    blurb?: string;
  }) => (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* header */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-semibold text-[var(--text-head)]">
            {title}
          </h3>
          <Badge
            variant="standard"
            className={cn(
              "px-[12px] py-[4px] text-[14px] text-[var(--text)] rounded-full",
              active
                ? "bg-[var(--green2)] text-[var(--green)]"
                : "bg-[var(--red2)] text-[var(--red)]"
            )}
          >
            {active ? "Active" : "Deactivated"}
          </Badge>
        </div>
        <div className="text-[14px] text-[var(--text)] mt-1">
          {blurb}
        </div>
      </div>
  
      {/* list */}
      <div className="px-4 sm:px-5 py-4 space-y-3">
        <ResourceItem title="Title: 10th Class Math Exam Syllabus" price={999} />
        <ResourceItem title="Title: 10th Class Math Exam Syllabus" price={999} />
      </div>
    </div>
  );
  

  // --- Single row (can reuse for many) ---
type DoubtPuchoItemProps = {
    title: string;
    desc?: string;
    price: number;
    mrp?: number;
    followUp?: string;
    responseTime?: string;
    iconSrc?: string; // optional custom icon (e.g., your `file` asset)
  };
  
  const DoubtPuchoItem = ({
    title,
    desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    price,
    mrp = 1500,
    followUp = "None",
    responseTime = "48 Hours",
    iconSrc,
  }: DoubtPuchoItemProps) => (
    <div className="rounded-xl border border-black/5 bg-[var(--background)] p-3 sm:px-4">
      <div className="flex items-center gap-3">
        {/* icon tile (image preferred; falls back to outline icon) */}
        <div className="h-full flex items-center justify-center">
          {iconSrc ? (
        <img src={iconSrc} alt={title} className="h-12 w-12 " />
      ) : (
        <div className="h-full flex items-center justify-center">
          <img src={file} alt={title} className="h-12 w-12 " />
        </div>
      )}
    </div>
  
        {/* content */}
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold leading-5 text-[var(--text)]">
            {title}
          </div>
          <div className="text-[14px] text-[var(--text)]/80 truncate">
            {desc}
          </div>
  
          {/* meta line */}
          <div className="mt-1 text-[13px] flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-[var(--text)]">Price:</span>
            <span className="font-semibold text-[var(--brand-color)]">₹{price}</span>
            <span className="line-through opacity-60">₹{mrp}</span>
  
            <span className="mx-1 text-[var(--text)]/30">|</span>
  
            <span className="font-semibold text-[var(--text)]">Follow Up:</span>
            <span className="text-[var(--text)]/80">{followUp}</span>
  
            <span className="mx-1 text-[var(--text)]/30">|</span>
  
            <span className="font-semibold text-[var(--text)]">Query Response Time:</span>
            <span className="text-[var(--text)]/80">{responseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // --- Block wrapper (header + list) ---
  type DoubtPuchoBlockProps = {
    title?: string;
    active?: boolean;
    blurb?: string;
    items?: DoubtPuchoItemProps[];
    iconSrc?: string; // convenience default icon for all items
  };
  
 const DoubtPuchoBlock = ({
    title = "Doubt Pucho",
    active = true,
    blurb = "Help with educational planning.",
    iconSrc,
    items = [
      {
        title: "Anything Pucho",
        price: 999,
        mrp: 1500,
        followUp: "None",
        responseTime: "48 Hours",
      },
    ],
  }: DoubtPuchoBlockProps) => (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* header */}
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b">
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-semibold text-[var(--text-head)]">{title}</h3>
          <Badge
            variant="standard"
            className={cn(
              "px-[12px] py-[4px] text-[14px] rounded-full",
              active ? "bg-[var(--green2)] text-[var(--green)]" : "bg-[var(--red2)] text-[var(--red)]"
            )}
          >
            {active ? "Active" : "Deactivated"}
          </Badge>
        </div>
        <div className="text-[14px] text-[var(--text)] mt-1">{blurb}</div>
      </div>
  
      {/* list (supports many) */}
      <div className="px-4 sm:px-5 py-4 space-y-3">
        {items.map((it, idx) => (
          <DoubtPuchoItem key={it.title + idx} iconSrc={iconSrc ?? it.iconSrc} {...it} />
        ))}
      </div>
    </div>
  );
  

  // ---------- Portal to body (backdrop + right-half panel) ----------
  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Right half panel */}
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 bg-[var(--background)] shadow-2xl border-l flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <HeaderCard />
        </div>

        {/* Scrollable content */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Two copies of Academic Consultation (as in screenshot) */}
          <ServiceBlock />
          <ServiceBlock />

          {/* Resources section */}
          <ResourcesBlock />

          {/* Doubt Pucho section */}
          <DoubtPuchoBlock />
        </div>
      </div>
    </div>,
    document.body
  );
}
