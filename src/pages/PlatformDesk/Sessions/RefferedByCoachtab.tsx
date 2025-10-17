/* ================= Referred by Coach (4-tab block) ================= */
import file from "@/assets/icons/file.png"
import {
  ExternalLink, Link as LinkIcon, Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import avatarImage from "@/assets/avatar.png";
import { useState } from "react";

/* ---------- Types ---------- */
type CoachItem = {
  id: string;
  name: string;
  subtitle: string;
  tag?: string;
  img?: string;
  href?: string;
};

type ResourceItem = {
  id: string;
  title: string;
  desc?: string;         // short description
  price?: number | string;
  mrp?: number | string; // shown with strikethrough
  href?: string;
  // backward compat
  meta?: string;
};

type LibraryItem = {
  id: string;
  label: string;
  badge?: string;        // Career / Exam / Certification / College / Courses / Scholarship
  subline?: string;      // e.g., "Commerce & Finance" or location
  href?: string;
};

type LinkItem = {
  id: string;
  title: string;
  href: string;
};

type ReferredBlockProps = {
  data: {
    coach: CoachItem[];
    resources?: ResourceItem[];
    library?: LibraryItem[];
    links?: LinkItem[];
  };
  defaultTab?: "Coach" | "Resources" | "Library" | "Link";
};

/* ---------- Header Pills (tabs) ---------- */
function SubTabs({
  active,
  setActive,
}: {
  active: "Coach" | "Resources" | "Library" | "Link";
  setActive: (v: "Coach" | "Resources" | "Library" | "Link") => void;
}) {
  const items: Array<"Coach" | "Resources" | "Library" | "Link"> = ["Coach", "Resources", "Library", "Link"];
  return (
    <div className="flex items-center gap-2">
      {items.map((t) => {
        const isActive = active === t;
        return (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={[
              "px-3 py-1.5 rounded-sm text-[12px] transition border",
              isActive
                ? "text-[var(--brand-color)] border-[var(--brand-color)]/40 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                : "bg-white text-[var(--text)] border-black/10 hover:text-[var(--text-head)]",
            ].join(" ")}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Coach tab (unchanged) ---------- */
function CoachCard({ name, subtitle, tag = "CUET", img, href }: CoachItem) {
  return (
    <div className="rounded-[10px] border border-black/10 bg-white p-4">
      <div className="flex flex-col items-center text-center">
        <img
          src={img || avatarImage}
          alt={name}
          className="h-[68px] w-[68px] rounded-full object-cover border border-black/10"
        />
        <span className="mt-3 inline-flex items-center rounded-[6px] border border-black/10 bg-white px-2 py-1 text-[10px] text-[var(--text)]">
          {tag}
        </span>
        <div className="mt-3 text-[18px] font-semibold leading-tight text-[var(--text-head)]">
          {name}
        </div>
        <div className="mt-1 w-11/12 text-[12px] leading-5 text-[var(--text)]">{subtitle}</div>
        <Button
          asChild={!!href}
          variant="border"
          size="sm"
          className="mt-4 h-9 w-full justify-center rounded-[8px] border border-[var(--brand-color)]/30 text-[var(--brand-color)] hover:bg-[var(--brand-color2)]"
        >
          {href ? <a href={href} target="_blank" rel="noreferrer">View Profile</a> : <span>View Profile</span>}
        </Button>
      </div>
    </div>
  );
}

/* ---------- Resources tab (matches screenshot) ---------- */
function ResourceCard({ title, desc, price, mrp, href, meta }: ResourceItem) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noreferrer"
      className="rounded-[10px] border border-black/10 bg-white p-3 flex items-start gap-3 hover:bg-[var(--faded)] transition"
    >
      <div className="h-full flex items-center justify-center">
        <img src={file} alt={title} className="h-12 w-12 " />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-[var(--text-head)] truncate">
          {title}
        </div>
        <div className="mt-1 text-[12px] text-[var(--text)] truncate">
          {desc || meta || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..."}
        </div>
        <div className="mt-1 text-[12px]">
          <span className="font-semibold text-[var(--text-head)]">Price: </span>
          <span className="font-semibold text-[var(--text-head)]">
            {typeof price === "number" ? `₹${price}` : price || "₹999"}
          </span>
          <span className="ml-2 line-through text-[var(--text)]/70">
            {typeof mrp === "number" ? `₹${mrp}` : mrp || "₹1500"}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------- Library tab (two-column list with arrow button) ---------- */
function LibraryRow({ label, badge, subline, href }: LibraryItem) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-[10px] border border-black/10 bg-white px-3 py-2 hover:bg-[var(--faded)] transition"
    >
      <div className="flex items-start gap-3 min-w-0">
        <div className="h-10 w-10 rounded-md bg-[var(--faded)] grid place-items-center">
          <ImageIcon className="h-5 w-5 text-[var(--text)]" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-[15px] font-semibold text-[var(--text-head)]">{label}</div>
            {badge && (
              <span className="rounded-sm border border-black/10 px-2 py-[2px] text-[10px] text-[var(--text)]">
                {badge}
              </span>
            )}
          </div>
          {subline && <div className="text-[12px] text-[var(--text)]">{subline}</div>}
        </div>
      </div>
      <span className="h-8 w-8 rounded-full bg-[var(--faded)] border border-black/10 grid place-items-center text-[var(--text)]/70 group-hover:text-[var(--brand-color)]">
        <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  );
}

/* ---------- Link tab (full-width rows) ---------- */
function LinkRow({ title, href }: LinkItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between rounded-[10px] border border-black/10 bg-white px-3 py-2 hover:bg-[var(--faded)] transition"
    >
      <span className="inline-flex items-center gap-2 text-[var(--text-head)]">
        <LinkIcon className="h-4 w-4 text-[var(--text)]" />
        {title} 
        <ArrowUpRight className="h-4 w-4 text-[var(--brand-color)]" />
      </span>
    </a>
  );
}

/* ---------- Main block ---------- */
export function ReferredBlock({
  data,
  defaultTab = "Coach",
}: ReferredBlockProps) {
  const [tab, setTab] = useState<"Coach" | "Resources" | "Library" | "Link">(defaultTab);

  return (
    <Card className="bg-[var(--background)] border shadow-none rounded-sm">
      <CardHeader className="flex flex-col gap-2 items-start">
        <CardTitle className="text-lg text-[var(--text-head)]">Referred by Coach</CardTitle>
        <SubTabs active={tab} setActive={setTab} />
      </CardHeader>

      <CardContent>
        {tab === "Coach" && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {data.coach.map((c) => (
              <CoachCard key={c.id} {...c} />
            ))}
          </div>
        )}

        {tab === "Resources" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(data.resources || []).map((r) => (
              <ResourceCard key={r.id} {...r} />
            ))}
          </div>
        )}

        {tab === "Library" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(data.library || []).map((l) => (
              <LibraryRow key={l.id} {...l} />
            ))}
          </div>
        )}

        {tab === "Link" && (
          <div className="space-y-2">
            {(data.links || []).map((lnk) => (
              <LinkRow key={lnk.id} {...lnk} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

