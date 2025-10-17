
import { CheckCircle2, ChevronDown, List, Pencil, X, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { fetchExpertise, selectExpertise, selectExpertiseLoading, selectExpertiseError } from "@/store/slices/platformDesk/Session/ExpertiseThunks";
import { fetchCoachTypes, selectCoachTypes, selectCoachTypesLoading, selectCoachTypesError } from "@/store/slices/platformDesk/Session/CoachTypeSlice";
import { fetchSpecialities, createSpeciality, updateSpeciality, selectSpecialities, selectSpecialityLoading, selectSpecialityError } from "@/store/slices/platformDesk/Session/Speciality";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import { ConfirmModal } from "@/components/PopupConfirm";
import { useRef, } from "react";

type ExpertiseMap = {
    Consultants: string[];
    Mentors: string[];
    Educators: string[];
  };

export type SpecialtyMap = {
  Consultants: Record<string, string[]>;
  Mentors: Record<string, string[]>;
  Educators: Record<string, string[]>;
};

export type SpecialtiesRowItem = {
  id: string;
  group: keyof ExpertiseMap;
  expertise: string;
  name: string;
};


// ---- Demo Data (unchanged) ----
export const DUMMY_EXPERTISE: ExpertiseMap = {
  Consultants: ["Academic Consulting", "Career Consulting"],
  Mentors: ["Startup Mentoring", "Leadership Coaching"],
  Educators: ["STEM Training", "Soft Skills"],
};

export const DUMMY_SPECIALTIES: SpecialtyMap = {
  Consultants: {
    "Academic Consulting": ["SOP Review", "University Shortlisting"],
    "Career Consulting": ["Interview Prep", "Resume Review"],
  },
  Mentors: {
    "Startup Mentoring": ["Pitch Review"],
    "Leadership Coaching": ["Executive Presence"],
  },
  Educators: {
    "STEM Training": ["Python Basics"],
    "Soft Skills": ["Presentation Skills"],
  },
};

// Remove unused function

// Remove unused constant




type SpecialtiesModalProps = {
  onClose: () => void;
  initialGroup?: keyof ExpertiseMap;
  initialExpertise?: string;
  startInAdd?: boolean;
};


/** Wrap a native <select> to hide the system arrow and render a consistent chevron */
function SelectShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text)]/70"
        aria-hidden="true"
      />
    </div>
  );
}

export function SpecialtiesModal({
  onClose,
  initialGroup,
  initialExpertise,
  startInAdd,
}: SpecialtiesModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux store selectors
  const specialities = useSelector(selectSpecialities);
  const specialityLoading = useSelector(selectSpecialityLoading);
  const specialityError = useSelector(selectSpecialityError);
  const coachTypes = useSelector(selectCoachTypes);
  const coachTypesLoading = useSelector(selectCoachTypesLoading);
  const coachTypesError = useSelector(selectCoachTypesError);
  const expertise = useSelector(selectExpertise);
  const expertiseLoading = useSelector(selectExpertiseLoading);
  const expertiseError = useSelector(selectExpertiseError);

  // Local state for UI
  const [mode, setMode] = React.useState<"list" | "add" | "edit">("list");

  type FilterKey = "All" | keyof ExpertiseMap;
  const GROUPS: (keyof ExpertiseMap)[] = ["Consultants", "Mentors", "Educators"];
  const [filter, setFilter] = React.useState<FilterKey>("All");
  const [expertiseFilter, setExpertiseFilter] = React.useState("");

  // Form state
  const [formGroup, setFormGroup] = React.useState<keyof ExpertiseMap>("Consultants");
  const [formExpertise, setFormExpertise] = React.useState("");
  const [formName, setFormName] = React.useState("");
  const [formTitle, setFormTitle] = React.useState("");
  const [formIconUrl, setFormIconUrl] = React.useState<string | undefined>(undefined);
  const [formIconFile, setFormIconFile] = React.useState<File | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formActive, setFormActive] = React.useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clearIcon = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();                 // don't open the picker
    setFormIconFile(null);
    setFormIconUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = ""; // allow same file re-pick
  };

  // Error handling state
  const [showErrors, setShowErrors] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Initialize form group with first available coach type
  React.useEffect(() => {
    if (coachTypes?.length > 0 && formGroup === "Consultants") {
      const firstCoach = coachTypes[0];
      const group = normalizeGroup(firstCoach.name);
      if (group) {
        setFormGroup(group);
      }
    }
  }, [coachTypes, formGroup]);


  // Load data from API
  useEffect(() => {
    dispatch(fetchCoachTypes());
    dispatch(fetchExpertise());
    dispatch(fetchSpecialities());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log("Coach Types:", coachTypes);
    console.log("Coach Types Loading:", coachTypesLoading);
    console.log("Coach Types Error:", coachTypesError);
    console.log("Expertise:", expertise);
    console.log("Expertise Loading:", expertiseLoading);
    console.log("Expertise Error:", expertiseError);
    console.log("Specialities:", specialities);
  }, [coachTypes, coachTypesLoading, coachTypesError, expertise, expertiseLoading, expertiseError, specialities]);


  // Helper function to normalize coach type names
  const normalizeGroup = (name: string): keyof ExpertiseMap | null => {
    const n = String(name).trim().toLowerCase();
    if (n === "consultants" || n === "consultant") return "Consultants";
    if (n === "mentors" || n === "mentor") return "Mentors";
    if (n === "educators" || n === "educator") return "Educators";
    return null;
  };

  // Build expertise map from API data
  const expertiseMapFromAPI = React.useMemo(() => {
    const map: ExpertiseMap = { Consultants: [], Mentors: [], Educators: [] };
    
    // Add "General" option to all groups for specialities without expertise
    map.Consultants.push("General");
    map.Mentors.push("General");
    map.Educators.push("General");
    
    if (!Array.isArray(expertise) || !coachTypes?.length) return map;

    const coachById = (coachTypes as any[]).reduce((acc: any, coach: any) => {
      acc[coach.id] = coach;
      return acc;
    }, {});

    (expertise as any[]).forEach((exp: any) => {
      const coach = coachById[exp.coach_id];
      if (!coach) return;
      const group = normalizeGroup(coach.name);
      if (!group) return;
      if (!map[group].includes(exp.name)) {
        map[group].push(exp.name);
      }
    });

    return map;
  }, [expertise, coachTypes]);

  // Update form expertise when coach type changes
  React.useEffect(() => {
    if (expertiseMapFromAPI[formGroup]?.length > 0) {
      const firstExpertise = expertiseMapFromAPI[formGroup][0];
      if (firstExpertise && !expertiseMapFromAPI[formGroup].includes(formExpertise)) {
        setFormExpertise(firstExpertise);
      }
    }
  }, [formGroup, expertiseMapFromAPI, formExpertise]);

  // Build specialities map from API data
  const specialitiesMap = React.useMemo(() => {
    const map: SpecialtyMap = { Consultants: {}, Mentors: {}, Educators: {} };
    if (!Array.isArray(specialities)) return map;

    (specialities as any[]).forEach((spec: any) => {
      // Use the nested coach object from the API response
      const coach = spec.coach;
      if (!coach) return;
      
      const group = normalizeGroup(coach.name);
      if (!group) return;

      // Handle cases where expertise_id is null or expertise is null
      let expertiseName = "General";
      if (spec.expertise_id && spec.expertise) {
        expertiseName = spec.expertise.name;
      } else if (spec.expertise_id) {
        // Fallback to expertise from the expertise array if available
        const exp = (expertise as any[])?.find((e: any) => e.id === spec.expertise_id);
        if (exp) {
          expertiseName = exp.name;
        }
      }

      if (!map[group][expertiseName]) {
        map[group][expertiseName] = [];
      }
      if (!map[group][expertiseName].includes(spec.title)) {
        map[group][expertiseName].push(spec.title);
      }
    });

    return map;
  }, [specialities, expertise]);

  // Sync expertise default per group in the form
  React.useEffect(() => {
    const first = expertiseMapFromAPI[formGroup]?.[0] ?? "";
    setFormExpertise((prev) => (prev && expertiseMapFromAPI[formGroup].includes(prev) ? prev : first));
  }, [formGroup, expertiseMapFromAPI]);

  React.useEffect(() => setExpertiseFilter(""), [filter]);

  React.useEffect(() => {
    if (startInAdd) {
      if (initialGroup) setFormGroup(initialGroup);
      if (initialExpertise) setFormExpertise(initialExpertise);
      setMode("add");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startInAdd, initialGroup, initialExpertise]);

  const rows: SpecialtiesRowItem[] = React.useMemo(() => {
    const out: SpecialtiesRowItem[] = [];
    (Object.keys(specialitiesMap) as (keyof SpecialtyMap)[]).forEach((group) => {
      const perGroup = specialitiesMap[group] || {};
      Object.keys(perGroup).forEach((exp) => {
        (perGroup[exp] || []).forEach((sp) => {
          out.push({ id: `${group}::${exp}::${sp}`, group: group as keyof ExpertiseMap, expertise: exp, name: sp });
        });
      });
    });
    return out;
  }, [specialitiesMap]);

  const filteredRows = React.useMemo(
    () =>
      rows.filter((r) => {
        const byGroup = filter === "All" ? true : r.group === filter;
        const byExp = filter === "All" || expertiseFilter === "" ? true : r.expertise === expertiseFilter;
        return byGroup && byExp;
      }),
    [rows, filter, expertiseFilter]
  );

  // Remove unused effect

  // Error handling functions
  const computeErrors = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!formGroup) e.group = "Please select a coach type";
    if (!formExpertise) e.expertise = "Please select an expertise";
    if (!formName.trim()) e.name = "Please enter specialty name";
    if (!formTitle.trim()) e.title = "Please enter a title";
    if (!formIconUrl) e.icon = "Please upload an icon";
    return e;
  };

  const hasErrors = (e: Record<string, string>): boolean => {
    return Object.keys(e).length > 0;
  };

  // helpers
  const resetForm = () => {
    // Set to first available coach type
    const firstCoach = coachTypes?.[0];
    const firstGroup = firstCoach ? normalizeGroup(firstCoach.name) : "Consultants";
    setFormGroup(firstGroup || "Consultants");
    setFormExpertise(expertiseMapFromAPI[firstGroup || "Consultants"]?.[0] ?? "");
    setFormName("");
    setFormTitle("");
    setFormIconUrl(undefined);
    setFormIconFile(null);
    setEditingId(null);
    setFormActive(true);
    setShowErrors(false);
    setErrors({});
  };

  const onPickIcon = React.useCallback(async (file?: File | null) => {
    if (!file) return;
    try {
      setFormIconFile(file);
      // show a preview (use object URL; cleaned up by browser on reload)
      const url = URL.createObjectURL(file);
      setFormIconUrl(url);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddClick = () => {
    let nextGroup: keyof ExpertiseMap;
    if (filter === "All") {
      // Use first available coach type
      const firstCoach = coachTypes?.[0];
      nextGroup = firstCoach ? (normalizeGroup(firstCoach.name) || "Consultants") : "Consultants";
    } else {
      nextGroup = filter;
    }
    
    setFormGroup(nextGroup);
    const exps = expertiseMapFromAPI[nextGroup] || [];
    setFormExpertise(
      expertiseFilter && exps.includes(expertiseFilter)
        ? expertiseFilter
        : exps[0] ?? ""
    );
    setFormName("");
    setFormTitle("");
    setFormIconUrl(undefined);
    setEditingId(null);
    setMode("add");
    setErrors({});
    setShowErrors(false);
  };

  // ------------------------------
  // Save implementations (original)
  // ------------------------------
  const saveAddImpl = async () => {
    const trimmed = formName.trim();
    if (!trimmed) return;

    // Find the coach ID
    const coach = (coachTypes as any[])?.find((c) => normalizeGroup(c.name) === formGroup);
    if (!coach) {
      console.error("Could not find coach");
      return;
    }

    // Find expertise ID (can be null for general specialities)
    let expertiseId = null;
    if (formExpertise && formExpertise !== "General") {
      const exp = (expertise as any[])?.find((e: any) => e.name === formExpertise);
      if (exp) {
        expertiseId = exp.id;
      }
    }


    try {
      await dispatch(
        createSpeciality({
          coach_id: coach.id,
          expertise_id: expertiseId,
          title: trimmed,
          segment_id: 1,
          status: formActive ? 1 : 0,
          icon: formIconFile || undefined,
        })
      ).unwrap();

      // Refresh data from API
      dispatch(fetchSpecialities());
      resetForm();
      setMode("list");
    } catch (err) {
      console.error("Failed to create speciality:", err);
    }
  };

  const saveEditImpl = async () => {
    if (!editingId) return;
    const trimmed = formName.trim();
    if (!trimmed) return;

    // Find the coach ID
    const coach = (coachTypes as any[])?.find((c) => normalizeGroup(c.name) === formGroup);
    if (!coach) {
      console.error("Could not find coach");
      return;
    }

    // Find expertise ID (can be null for general specialities)
    let expertiseId = null;
    if (formExpertise && formExpertise !== "General") {
      const exp = (expertise as any[])?.find((e: any) => e.name === formExpertise);
      if (exp) {
        expertiseId = exp.id;
      }
    }

    try {
      await dispatch(
        updateSpeciality({
          id: parseInt(editingId),
          data: {
            coach_id: coach.id,
            expertise_id: expertiseId,
            title: trimmed,
            status: formActive ? 1 : 0,
            icon: formIconFile || undefined,
          },
        })
      );

      // Refresh data from API
      dispatch(fetchSpecialities());
      resetForm();
      setMode("list");
    } catch (err) {
      console.error("Failed to update speciality:", err);
    }
  };

  // ---------- UI ----------

  const Tabs = (
    <div className="px-6 pt-4">
      <div role="tablist" aria-label="Expertise Tabs" className="rounded-2xl border bg-gray-100 p-1">
        <div className="flex items-center gap-2">
          {["All", ...GROUPS].map((key) => {
            const active = filter === (key as FilterKey);
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(key as FilterKey)}
                className={[
                  "flex-1 basis-0 text-center px-4 py-2 rounded-xl transition",
                  active ? "bg-white border shadow-sm" : "bg-transparent",
                ].join(" ")}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ExpertiseFilterBar =
    filter === "All" ? null : (
      <div className="px-6 pt-3">
        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--text)]">Expertise</label>
          <SelectShell className="w-full md:w-[360px]">
            <select
              className="w-full rounded border bg-white p-2 pr-10 text-[var(--text)]
                         appearance-none [-moz-appearance:none] [-webkit-appearance:none]
                         focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              value={expertiseFilter}
              onChange={(e) => setExpertiseFilter(e.target.value)}
            >
              <option value="">All Expertise</option>
              {expertiseMapFromAPI[filter].map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </SelectShell>
        </div>
      </div>
    );

  const isAll = filter === "All";
  const hasExpertiseFilter = !isAll && expertiseFilter !== "";

  const ListHeader = (
    <div className="px-6 pt-4 pb-3 text-[var(--text-head)]">
      {isAll ? (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 text-sm font-medium">
          <div className="pl-3">Speciality</div>
          <div className="text-right pr-5">Actions</div>
        </div>
      ) : hasExpertiseFilter ? (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 text-sm font-medium">
          <div className="pl-3">Specialty</div>
          <div className="text-right pr-5">Actions</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium">
          <div className="pl-3">Expertise</div>
          <div className="pl-2">Specialty</div>
          <div className="text-right pr-5">Actions</div>
        </div>
      )}
    </div>
  );

  const rowGridClass = isAll
    ? "md:grid-cols-[1fr_auto]"
    : hasExpertiseFilter
    ? "md:grid-cols-[1fr_1fr_auto]"
    : "md:grid-cols-3";

  const ListBody = (
    <div className="flex-1 overflow-y-auto px-6 pb-4 text-[var(--text)]">
      <div className="space-y-2">
        {filteredRows.length === 0 && (
          <div className="text-sm italic p-3 bg-[var(--faded)] rounded border">
            {isAll
              ? "No specialties yet"
              : hasExpertiseFilter
              ? `No specialties under ${filter} > ${expertiseFilter}`
              : `No specialties under ${filter}`}
          </div>
        )}

        {filteredRows.map((row) => {
          // Find the speciality in the API data
          const speciality = (specialities as any[])?.find((s) => s.title === row.name);
          const iconUrl = speciality?.icon;
          const title = speciality?.title || row.name;
          const isActive = speciality?.status === 1;

          return (
            <div
              key={row.id}
              className={`grid grid-cols-1 ${rowGridClass} gap-4 items-center rounded border p-3 text-[var(--text)] bg-[var(--faded)]`}
            >
              {isAll ? (
                <div>
                  <span>{row.group}</span> <span>&gt;</span> {row.expertise} <span>&gt;</span> {row.name}
                </div>
              ) : hasExpertiseFilter ? (
                <>
                  <div className="flex items-center gap-3">
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt="icon"
                        className="h-6 w-6 rounded border overflow-hidden bg-white/60 flex-none shrink-0"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded border bg-white/60 grid place-items-center text-[10px] text-[var(--text)]/70">
                        {row.name.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">{row.name}</span>
                    {title && <span className="text-xs text-[var(--text)]/70">({title})</span>}
                  </div>
                </>
              ) : (
                <>
                  <div>{row.expertise}</div>
                  <div>{row.name} {title && <span className="text-xs text-[var(--text)]/70">({title})</span>}</div>
                  
                </>
              )}

              <div className="flex md:justify-end items-center gap-2">
                {isActive ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <Button
                  variant="actionIcon"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => {
                    // Find the speciality in the API data
                    const speciality = (specialities as any[])?.find((s) => s.title === row.name);
                    if (!speciality) return;

                    setFormGroup(row.group);
                    setFormExpertise(row.expertise);
                    setFormName(row.name);
                    setEditingId(speciality.id.toString());
                    setFormTitle(speciality.title || "");
                    setFormIconUrl(speciality.icon || undefined);
                    setFormActive(speciality.status === 1);
                    setMode("edit");
                    setErrors({});
                    setShowErrors(false);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // --- Submit handler (validates then opens confirm) ---
  const [specConfirmOpen, setSpecConfirmOpen] = React.useState(false);

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const eMap = computeErrors();
    setErrors(eMap);
    setShowErrors(true);

    if (hasErrors(eMap)) return; // keep inline errors visible

    // No errors -> open confirmation popup
    setSpecConfirmOpen(true);
  };

  const handleConfirmSave = () => {
    setSpecConfirmOpen(false);
    if (mode === "add") saveAddImpl();
    else if (mode === "edit") saveEditImpl();
  };

  const handleCloseConfirm = () => setSpecConfirmOpen(false);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
        <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] lg:w-[920px] bg-white shadow-2xl border-l flex flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <CardTitle>Specialties</CardTitle>
            {mode === "list" ? (
              <div className="flex items-center gap-3">
                {/* space reserved for possible list-mode notices */}
                <Button variant="brand" onClick={handleAddClick}>
                  Add
                </Button>
              </div>
            ) : (
              <div />
            )}
          </div>

        {(specialityLoading || coachTypesLoading || expertiseLoading) && (
          <div className="text-center py-4">
            <span>Loading data...</span>
          </div>
        )}

        {(specialityError || coachTypesError || expertiseError) && (
          <div className="text-red-500 text-center py-4 space-y-2">
            {specialityError && <div>Specialities Error: {specialityError}</div>}
            {coachTypesError && <div>Coach Types Error: {coachTypesError}</div>}
            {expertiseError && <div>Expertise Error: {expertiseError}</div>}
          </div>
        )}

          {mode === "list" ? (
            <>
              {Tabs}
              {ExpertiseFilterBar}
              {ListHeader}
              {ListBody}

            {/* fixed footer (list view only) */}
            <div className="border-t p-6 flex justify-between">
              <Button variant="border" onClick={onClose}>
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="brand"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        ) : (
          // ADD / EDIT
          <div className="flex-1 min-h-0 flex flex-col text-[var(--text)]">
            {/* Scrollable form */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 space-y-5">
              <div className="flex flex-col gap-4">
                {/* Category & Expertise */}
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <label className="text-sm text-[var(--text-head)]">
                      Coach Type
                    </label>
                    <select
                      className="w-full rounded border bg-white p-2"
                      value={formGroup}
                      onChange={(e) =>
                        setFormGroup(e.target.value as keyof ExpertiseMap)
                      }
                      disabled={coachTypesLoading}
                    >
                      {coachTypesLoading ? (
                        <option>Loading coach types...</option>
                      ) : coachTypes?.length > 0 ? (
                        coachTypes.map((coach: any) => {
                          const group = normalizeGroup(coach.name);
                          if (!group) return null;
                          return (
                            <option key={coach.id} value={group}>
                              {coach.name}
                            </option>
                          );
                        })
                      ) : (
                        <option>No coach types available</option>
                      )}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-[var(--text-head)]">
                      Expertise
                    </label>
                    <select
                      className="w-full rounded border bg-white p-2"
                      value={formExpertise}
                      onChange={(e) => setFormExpertise(e.target.value)}
                      disabled={expertiseMapFromAPI[formGroup].length === 0 || expertiseLoading}
                    >
                      {expertiseLoading ? (
                        <option>Loading expertise...</option>
                      ) : expertiseMapFromAPI[formGroup]?.length > 0 ? (
                        expertiseMapFromAPI[formGroup].map((exp) => (
                          <option key={exp} value={exp}>
                            {exp}
                          </option>
                        ))
                      ) : (
                        <option>No expertise available</option>
                      )}
                    </select>
                    {expertiseMapFromAPI[formGroup].length === 0 && (
                      <p className="text-xs text-[var(--text-head)] mt-1">
                        No expertise under this category yet. Add expertise
                        first in the Expertise modal.
                      </p>
                    )}
                  </div>
                </div>

                  {/* Specialty Title*/}
                  <div className="space-y-1">
                    <label className="text-sm text-[var(--text-head)]">Specialty Title<span className="text-red-500">*</span></label>
                    <input
                      className="w-full rounded border bg-white p-2"
                      placeholder="e.g., Interview Prep Advanced"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                    {showErrors && errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Discription Used to be named title*/}
                  <div className="space-y-1">
                    <label className="text-sm text-[var(--text-head)]">Specialty Discription<span className="text-red-500">*</span></label>
                    <input
                      className="w-full rounded border bg-white p-2"
                      placeholder="Enter the discription"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                    {showErrors && errors.title && (
                      <p className="mt-1 text-xs text-red-600">{errors.title}</p>
                    )}
                  </div>

                {/* NEW: Icon picker (square) with X */}
<div className="space-y-1">
  <label className="text-sm text-[var(--text-head)]">
    Icon <span className="text-red-500">*</span>
  </label>

  {/* Dropzone */}
  <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={(e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) onPickIcon(file); // ✅ keep API
    }}
    onClick={() => fileInputRef.current?.click()}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
    }}
    className={[
      "rounded-2xl p-3 bg-[var(--faded)]/50",
      "transition-colors",
      "cursor-pointer focus:outline-none",
    ].join(" ")}
    aria-describedby="icon_hint"
  >
    <div
      className={[
        "w-full min-h-[140px] rounded-xl border-2 border-dashed",
        "bg-[var(--background)]",
        "flex flex-col items-center justify-center text-center relative", // relative for X
        "px-6",
        isDragging ? "border-[var(--brand-color)] bg-[var(--brand-color3)]" : "border-[var(--border)]",
      ].join(" ")}
    >
      {/* Preview or placeholder */}
      {formIconUrl ? (
        <div className="relative inline-block pointer-events-none">
          <img
            src={formIconUrl}
            alt="Selected icon"
            className="h-16 w-16 rounded-md object-cover shadow-sm pointer-events-none"
          />

          {/* X to remove */}
          <button
            type="button"
            aria-label="Remove icon"
            onClick={clearIcon}
            className="pointer-events-auto absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white text-[var(--text)] shadow ring-1 ring-black/5 hover:bg-[var(--brand-color)] hover:text-white transition"
          >
            {/* simple X icon */}
            <X className="h-3.5 w-3.5" />
          </button>

        </div>
      ) : (
        <>
          <ImagePlus className="h-10 w-10 text-[var(--text)]/50 mb-3" />
          
        </>
      )}
      <p className="text-sm text-[var(--text-head)]">
            Drop your image here, or{" "}
            <button
              type="button"
              className="text-[var(--brand-color)] hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              browse
            </button>
          </p>
          <p id="icon_hint" className="mt-1 text-xs text-[var(--text)]/70">
            Supports: JPG, JPEG2000, PNG
          </p>
    </div>
  </div>

  {/* Hidden native input (preserves your API) */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => onPickIcon(e.target.files?.[0])} // ✅ same API
  />

  {/* Error */}
  {showErrors && errors.icon && (
    <p className="mt-1 text-xs text-red-600">{errors.icon}</p>
  )}
</div>



                 

                  {/* Active */}
                  <div className="space-y-1">
                    <label className="text-sm text-[var(--text-head)]">Status</label>
                    <div className="flex items-center gap-3">
                      <Switch id="specialty-active" checked={formActive} onCheckedChange={setFormActive} />
                      <span className="text-sm text-[var(--text)]">{formActive ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with left-aligned error summary and Save on the right */}
              <div className="border-t bg-white p-6 flex items-center justify-between">
                

                <div className="flex items-center gap-3 justify-between w-full">
                  <Button
                    variant="border"
                    onClick={() => {
                      resetForm();
                      setMode("list");
                    }}
                  >
                    Back
                  </Button>
                  <div className="flex justify-end gap-4">
                  <div className="min-h-[1.25rem] text-sm flex items-center">
                  {showErrors && hasErrors(errors) && (
                    <span className="text-red-600">Please fill all required fields before saving.</span>
                  )}
                </div>
                  <Button variant="brand" onClick={handleSubmit}>
                    {mode === "add" ? "Save" : "Save"}
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal for ADD/EDIT save */}
      <ConfirmModal
        isOpen={specConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmSave}
        heading={mode === "add" ? "Save new specialty?" : "Save changes?"}
        description={
          mode === "add"
            ? "This will add the new specialty to the selected groups."
            : "This will update the specialty details."
        }
        confirmText="Save"
        cancelText="Cancel"
      />
    </>
  );
}









export function SegmentsDrawerTrigger() {
    const [showSpecialization, setShowSpecialization] = useState(false);
    return (
      <>
        <Button
          variant="standard"
          size="new"
          onClick={() => setShowSpecialization(true)}
        >
          <List className="h-3 w-3" />
          <span className="">Specialty</span>
        </Button>
        {showSpecialization && <SpecialtiesModal onClose={() => setShowSpecialization(false)} />}
      </>
    );
  }
  
