import React, { useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

const LANGUAGE_OPTIONS: Option[] = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "hindi", label: "Hindi" },
];

const LEAD_TYPE_OPTIONS: Option[] = [
  { value: "upsell", label: "Upsell" },
  { value: "guide", label: "Guide" },
];

const LEAD_CATEGORY_OPTIONS: Option[] = [
  { value: "abandoned", label: "Abandoned Cart" },
  { value: "onboarding", label: "Onboarding" },
];

const SOURCE_OPTIONS: Option[] = [
  { value: "website", label: "Website" },
  { value: "walkin", label: "Walk-in" },
  { value: "referral", label: "Referral" },
];

const USER_TYPE_OPTIONS: Option[] = [
  { value: "explorer", label: "Explorer" },
  { value: "coach", label: "Coach" },
  { value: "organisation", label: "Organisation" },
  { value: "partner", label: "Partner" },
  { value: "channel", label: "Channel Partner" },
];

const PRIORITY_OPTIONS: Option[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

type SubmitAction = "me" | "unassigned" | "notify";

export function AddLeadFlow() {
  // 1) Basic Information
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");

  // 2) Lead Classification
  const [leadType, setLeadType] = useState("");
  const [leadCategory, setLeadCategory] = useState("");
  const [source, setSource] = useState("");
  const [concern, setConcern] = useState("");

  // 3) User Type
  const [userType, setUserType] = useState("");

  // 4) Assignment & Priority
  const [assignAgent, setAssignAgent] = useState<SubmitAction>("me");
  const [priority, setPriority] = useState("");
  const [followupDate, setFollowupDate] = useState<string>("");

  // 5) Attachments
  const [attachments, setAttachments] = useState<File[]>([]);
  const [referenceLink, setReferenceLink] = useState("");

  // Validation
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    if (!city.trim()) e.city = "City / Location is required.";
    if (!leadType) e.leadType = "Lead type is required.";
    if (!leadCategory) e.leadCategory = "Lead category is required.";
    if (!source) e.source = "Source is required.";
    if (!priority) e.priority = "Priority is required.";
    if (!followupDate) e.followupDate = "First follow-up date & time is required.";

    if (phone && !/^[\d\+\-\s()]{6,}$/.test(phone)) e.phone = "Enter a valid phone.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email.";
    if (referenceLink && !/^https?:\/\//i.test(referenceLink)) e.referenceLink = "Link must start with http(s)://";
    return e;
  }, [fullName, phone, email, city, leadType, leadCategory, source, priority, followupDate, referenceLink]);

  const isDuplicate = useMemo(() => {
    if (!phone && !email) return false;
    return phone.replace(/\D/g, "").length >= 10;
  }, [phone, email]);

  const canSubmit = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      fullName,
      phone,
      email: email || null,
      city,
      language: language || null,
      leadType,
      leadCategory,
      source,
      concern: concern || null,
      userType: userType || null,
      assignAgent,
      priority,
      followupDate: followupDate ? new Date(followupDate).toISOString() : null,
      referenceLink: referenceLink || null,
      attachmentsCount: attachments.length,
      autoTags: ["New Lead", "Manual Entry"],
      smartSuggestion: concern.trim() ? "Based on concern, assign to [team]?" : null,
    };

    console.log("Submit:", payload);
    alert("Lead added successfully to Relations Desk.");
    window.history.back();
  };

  // Anchors (for in-page nav)
  const basicRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const assignRef = useRef<HTMLDivElement>(null);
  const attachRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Page Header */}
      <header className="sticky -top-4 z-30 border-b border-[var(--faded)] bg-[var(--background)] backdrop-blur w-full p-4">
        <div className="mx-auto w-full px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-lg border border-[var(--faded)] px-3 py-1.5 text-sm hover:bg-[var(--faded)]"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-head)]">Add New Lead</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isDuplicate && (
              <span className="text-xs px-2 py-1 rounded bg-[var(--yellow2)] text-[var(--yellow)] border border-[var(--yellow)]">
                Possible duplicate (phone/email)
              </span>
            )}
            <select
              className="rounded-lg border border-[var(--faded)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
              value={assignAgent}
              onChange={(e) => setAssignAgent(e.target.value as SubmitAction)}
              aria-label="Submit action"
              title="Submit action"
            >
              <option value="me">Save & Assign to Me</option>
              <option value="unassigned">Save to Pool (Unassigned)</option>
              <option value="notify">Save & Notify Agent</option>
            </select>
            <button
              type="submit"
              form="lead-form"
              className={`px-3 py-2 rounded-lg text-white ${canSubmit ? "bg-[var(--brand-color)] hover:opacity-90" : "bg-[var(--button)] cursor-not-allowed text-[var(--text-head)]/70"}`}
              disabled={!canSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full px-4 md:px-6 py-6 grid grid-cols-12 gap-6">
        {/* In-page Nav */}
        <nav className="hidden lg:block col-span-3">
          <div className="sticky top-[120px] space-y-1">
            <SideLink label="Basic Information" onClick={() => scrollTo(basicRef)} />
            <SideLink label="Lead Classification" onClick={() => scrollTo(classRef)} />
            <SideLink label="User Type" onClick={() => scrollTo(userRef)} />
            <SideLink label="Assignment & Priority" onClick={() => scrollTo(assignRef)} />
            <SideLink label="Attachments" onClick={() => scrollTo(attachRef)} />
          </div>
        </nav>

        {/* Form */}
        <form id="lead-form" onSubmit={handleSubmit} className="col-span-12 lg:col-span-9 space-y-8">
          {/* 1. Basic Information */}
          <section ref={basicRef} className="rounded-2xl border border-[var(--faded)] bg-[var(--background)] p-6">
            <SectionTitle>🧍 Basic Information</SectionTitle>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full Name *" error={errors.fullName}>
                <input
                  className={inputCls(!!errors.fullName)}
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={!!errors.fullName}
                />
              </Field>
              <Field label="Phone Number *" error={errors.phone}>
                <input
                  className={inputCls(!!errors.phone)}
                  placeholder="+1 555 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={!!errors.phone}
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  className={inputCls(!!errors.email)}
                  placeholder="optional@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field label="City / Location *" error={errors.city}>
                <input
                  className={inputCls(!!errors.city)}
                  placeholder="New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-invalid={!!errors.city}
                />
              </Field>
              <div className="md:col-span-2">
                <Label>Preferred Language</Label>
                <select
                  className="mt-2 w-full rounded-lg border border-[var(--faded)] bg-[var(--background)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="">Select language</option>
                  {LANGUAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* 2. Lead Classification */}
          <section ref={classRef} className="rounded-2xl border border-[var(--faded)] bg-[var(--background)] p-6">
            <SectionTitle>🧭 Lead Classification</SectionTitle>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Lead Type *" error={errors.leadType}>
                <select
                  className={selectCls(!!errors.leadType)}
                  value={leadType}
                  onChange={(e) => setLeadType(e.target.value)}
                  aria-invalid={!!errors.leadType}
                >
                  <option value="">Select type</option>
                  {LEAD_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Lead Category *" error={errors.leadCategory}>
                <select
                  className={selectCls(!!errors.leadCategory)}
                  value={leadCategory}
                  onChange={(e) => setLeadCategory(e.target.value)}
                  aria-invalid={!!errors.leadCategory}
                >
                  <option value="">Select category</option>
                  {LEAD_CATEGORY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Source *" error={errors.source}>
                <select
                  className={selectCls(!!errors.source)}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  aria-invalid={!!errors.source}
                >
                  <option value="">Select source</option>
                  {SOURCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Label>Concern Summary</Label>
                <textarea
                  className="mt-2 w-full min-h-28 rounded-lg border border-[var(--faded)] bg-[var(--background)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
                  placeholder="Brief note on why they contacted"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* 3. User Type */}
          <section ref={userRef} className="rounded-2xl border border-[var(--faded)] bg-[var(--background)] p-6">
            <SectionTitle>👤 User Type</SectionTitle>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Type">
                <select
                  className="w-full rounded-lg border border-[var(--faded)] bg-[var(--background)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select user type</option>
                  {USER_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* 4. Assignment & Priority */}
          <section ref={assignRef} className="rounded-2xl border border-[var(--faded)] bg-[var(--background)] p-6">
            <SectionTitle>👥 Assignment & Priority</SectionTitle>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Submit Action">
                <select
                  className="w-full rounded-lg border border-[var(--faded)] bg-[var(--background)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
                  value={assignAgent}
                  onChange={(e) => setAssignAgent(e.target.value as SubmitAction)}
                  title="Submit action"
                >
                  <option value="me">Save & Assign to Me</option>
                  <option value="unassigned">Save to Pool (Unassigned)</option>
                  <option value="notify">Save & Notify Agent</option>
                </select>
              </Field>
              <Field label="Priority *" error={errors.priority}>
                <select
                  className={selectCls(!!errors.priority)}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  aria-invalid={!!errors.priority}
                >
                  <option value="">Select priority</option>
                  {PRIORITY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Schedule First Followup *" error={errors.followupDate}>
                <input
                  type="datetime-local"
                  className={inputCls(!!errors.followupDate)}
                  value={followupDate}
                  onChange={(e) => setFollowupDate(e.target.value)}
                  aria-invalid={!!errors.followupDate}
                />
              </Field>

              {concern.trim() && (
                <p className="md:col-span-2 text-sm text-[var(--text)]">
                  Smart suggestion: Based on concern, assign to <span className="font-medium text-[var(--text-head)]">[team]</span>?
                </p>
              )}
            </div>
          </section>

          {/* 5. Attachments */}
          <section ref={attachRef} className="rounded-2xl border border-[var(--faded)] bg-[var(--background)] p-6">
            <SectionTitle>📎 Attachments (Optional)</SectionTitle>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Upload files">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                  className="mt-2 block w-full text-sm
                             file:mr-3 file:rounded-md file:border-0
                             file:bg-[var(--brand-color3)] file:px-3 file:py-2
                             file:text-[var(--brand-color)] hover:file:opacity-90"
                />
                {attachments.length > 0 && (
                  <p className="mt-2 text-xs text-[var(--text)]">{attachments.length} file(s) selected</p>
                )}
              </Field>
              <Field label="Reference link" error={errors.referenceLink}>
                <input
                  className={inputCls(!!errors.referenceLink)}
                  placeholder="Form/CRM/external request URL"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  aria-invalid={!!errors.referenceLink}
                />
              </Field>
            </div>
          </section>

          {/* Mobile actions */}
          <div className="lg:hidden sticky bottom-0 bg-[var(--background)] backdrop-blur border-t border-[var(--faded)] px-3 py-3 flex items-center justify-between gap-2">
            {isDuplicate ? (
              <span className="text-xs px-2 py-1 rounded bg-[var(--yellow2)] text-[var(--yellow)] border border-[var(--yellow)]">
                Possible duplicate
              </span>
            ) : (
              <span className="text-xs text-[var(--text)]">Auto-tags: New Lead · Manual Entry</span>
            )}
            <button
              type="submit"
              className={`px-3 py-2 rounded-lg text-white ${canSubmit ? "bg-[var(--brand-color)] hover:opacity-90" : "bg-[var(--button)] cursor-not-allowed text-[var(--text-head)]/70"}`}
              disabled={!canSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}


function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-[var(--text-head)]">{children}</h2>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-[var(--text-head)]">{children}</label>;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {error ? <span className="text-xs text-[var(--red)]">{error}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SideLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--faded)] transition text-sm text-[var(--text-head)]"
    >
      {label}
    </button>
  );
}

function inputCls(hasError?: boolean) {
  return [
    "w-full rounded-lg border bg-[var(--background)] px-3 py-2 outline-none",
    hasError
      ? "border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]"
      : "border-[var(--faded)] focus:ring-2 focus:ring-[var(--brand-color)]",
  ].join(" ");
}

function selectCls(hasError?: boolean) {
  return [
    "w-full rounded-lg border bg-[var(--background)] px-3 py-2 outline-none",
    hasError
      ? "border-[var(--red)] focus:ring-2 focus:ring-[var(--red)]"
      : "border-[var(--faded)] focus:ring-2 focus:ring-[var(--brand-color)]",
  ].join(" ");
}
