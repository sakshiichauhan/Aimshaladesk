import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Upload,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";



import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";



function Topbar() {
  
  const navigator = useNavigate();
  return (
    <div className="flex justify-between w-full items-center px-4 py-3 mb-2 h-16 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Problems</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >Add Problem Case</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
    </div>
)}


export const AddProblem = () => {
  
  // Get props from navigation state or props
  const currentText = 'Problem';
  const [caseType] = useState<string>(currentText);
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [assignTeam, setAssignTeam] = useState<string>("");
  const [autoAssign, setAutoAssign] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!subject.trim()) e.subject = "Subject / Title is required.";
    if (!description.trim()) e.description = "Description is required.";
    if (!priority) e.priority = "Priority is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSelectFiles: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const list = ev.target.files;
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
    ev.currentTarget.value = "";
  };

  const removeFile = (name: string) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  const handleSubmit = () => {
    if (!validate()) return;
    // Build payload
    const payload = {
      caseType,
      subject,
      description,
      priority,
      tag: tag || undefined,
      assignment: autoAssign ? "AUTO" : assignTeam || undefined,
      filesCount: files.length,
    };
    console.log("Submit Case:", payload);
    // TODO: call API
  };
  const handleDraft = () => {
    const payload = {
      caseType,
      subject,
      description,
      priority,
      tag,
      assignment: autoAssign ? "AUTO" : assignTeam,
      filesCount: files.length,
      status: "DRAFT",
    };
    console.log("Save Draft:", payload);
    // TODO: call API
  };

  const goBack = () => {
    // You can replace with useNavigate if you prefer
    window.history.back();
  };

  return (
    <div className="">
      {/* Header */}
      <Topbar/>

      <div className="">
        

        {/* Right Column - Case Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[var(--background)] border shadow-none">
            <CardContent className="space-y-8">
              {/* 2. Case Details */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--text-head)] mb-3">
                  Problem Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Case Type (required) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Case Type 
                    </label>
                    <Select value="Problem" disabled>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Problem">Problem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject (required) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Subject / Title <span className="text-[var(--red)]">*</span>
                    </label>
                    <Input
                      placeholder='e.g., "Assessment not opening" or "Session missed"'
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    {errors.subject && (
                      <p className="text-[10px] text-[var(--red)]">{errors.subject}</p>
                    )}
                  </div>

                  {/* Description (required) - full width */}
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Description / Details <span className="text-[var(--red)]">*</span>
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Add as much detail as possible…"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <p className="text-[10px] text-[var(--red)]">{errors.description}</p>
                    )}
                  </div>

                  {/* Attachments (optional) - full width */}
                  <div className="md:col-span-2">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Attachments (optional)
                    </label>
                    <div className="border rounded-sm p-3 bg-[var(--faded)]">
                      <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <Upload className="h-4 w-4 text-[var(--text)]" />
                        <span className="text-[var(--text-head)]">Upload files</span>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={onSelectFiles}
                          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                        />
                      </label>
                      {files.length > 0 && (
                        <ul className="mt-3 space-y-1 text-xs text-[var(--text)]">
                          {files.map((f) => (
                            <li key={f.name} className="flex justify-between">
                              <span className="truncate">{f.name}</span>
                              <button
                                type="button"
                                className="text-[var(--red)]"
                                onClick={() => removeFile(f.name)}
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 3. Priority & Tags */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--text-head)] mb-3">
                  Priority &amp; Tags
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Priority (required) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Priority <span className="text-[var(--red)]">*</span>
                    </label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Low", "Medium", "High", "Urgent"].map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="text-[10px] text-[var(--red)]">{errors.priority}</p>
                    )}
                  </div>

                  {/* Tag (optional) */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Tag (optional)
                    </label>
                    <Input
                      placeholder="e.g., payment, app, session, coach"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* 4. Problem Assignment (Optional) */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--text-head)] mb-3">
                  Problem Assignment (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="auto-assign"
                      checked={autoAssign}
                      onCheckedChange={(checked) => setAutoAssign(checked === "indeterminate" ? false : checked)}
                    />
                    <label htmlFor="auto-assign" className="text-sm text-[var(--text-head)]">
                      Auto-assign based on Problem Type
                    </label>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text)] uppercase">
                      Assign To (disable if Auto-assign)
                    </label>
                    <Select
                      value={assignTeam}
                      onValueChange={setAssignTeam}
                      disabled={autoAssign}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Support", "Tech Team", "Manager"].map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
        
      </div>
      {/* Bottom action bar (3 buttons) */}
      <div className="flex w-full gap-2 justify-between mt-4">
            <Button
              variant="border"
              onClick={goBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex flex-wrap gap-4 justify-end">
            <Button
              variant="border"
              onClick={handleDraft}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 text-[var(--brand-color)]" />
              Save as Draft
            </Button>
            <Button
              variant="brand"
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4" />
              Submit Problem
            </Button>
          </div>
          </div>
    </div>
  );
};
