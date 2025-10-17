import  { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
   Download, Printer, CheckCircle2, AlertTriangle, X,
  ClipboardList, Target, Clock, Percent, Hash
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Card, CardHeader } from "@/components/ui/card";
import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



function Topbar({ name,status,id }: { name: string,status: string,id: string; }) {
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 mb-4 bg-[var(--background)] h-[64px] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigator(-2)} className="cursor-pointer">Form</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">{name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-4">
      <div>Form ID: <span className="text-[var(--text)] text-sm">{id}</span></div>
      <Badge
              className={
                status === "Active"
                  ? "bg-[var(--green2)] text-[var(--green)]"
                  : "bg-[var(--red2)] text-[var(--red)]"
              }
            >
              {status}
            </Badge>
      </div>
    </div>
  );
}




/* =========================
   Types
========================= */
type SubmissionStatus = "Pass" | "Fail" | "Incomplete";

type Question = {
  id: string;
  index: number;        // 1-based
  text: string;
  type: "mcq" | "text";
  options?: string[];   // for mcq
  correctAnswer?: string;
  userAnswer?: string;
  marks: number;        // marks for the question
};

type SubmissionDetail = {
  formId: string;
  submissionId: string;
  firstName: string;
  lastName?: string;
  userId: string;
  submittedOn: string;      // ISO
  timeTakenSec: number;
  attempt: number;
  status: SubmissionStatus;
  questions: Question[];
};

type FormMeta = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  totalQuestions: number;
};

/* =========================
   Dummy CONSTs
========================= */
const DUMMY_FORM_META: Record<string, FormMeta> = {
  "FORM-98124": {
    id: "FORM-98124",
    name: "Intro to Product Feedback",
    status: "Active",
    totalQuestions: 10,
  },
  "FORM-77777": {
    id: "FORM-77777",
    name: "Campus Onboarding Quiz",
    status: "Inactive",
    totalQuestions: 8,
  },
};

// Hand-crafted examples (feel free to add more)
const DUMMY_SUBMISSION_DETAILS: Record<string, SubmissionDetail> = {
  "SUB-1000": {
    formId: "FORM-98124",
    submissionId: "SUB-1000",
    firstName: "Aarav",
    lastName: "Sharma",
    userId: "U-7000",
    submittedOn: new Date().toISOString(),
    timeTakenSec: 542,
    attempt: 1,
    status: "Pass",
    questions: [
      { id: "Q1", index: 1, text: "What is NPS?", type: "text", correctAnswer: "Net Promoter Score", userAnswer: "Net Promoter Score", marks: 1 },
      { id: "Q2", index: 2, text: "Primary goal of product discovery?", type: "mcq", options: ["Ship fast", "Find fit", "Add features"], correctAnswer: "Find fit", userAnswer: "Find fit", marks: 1 },
      { id: "Q3", index: 3, text: "Which is not a PM activity?", type: "mcq", options: ["User research", "Roadmapping", "Payroll"], correctAnswer: "Payroll", userAnswer: "Roadmapping", marks: 1 },
      { id: "Q4", index: 4, text: "OKR stands for?", type: "text", correctAnswer: "Objectives and Key Results", userAnswer: "Objectives & Key Results", marks: 1 },
      { id: "Q5", index: 5, text: "Best metric for retention?", type: "mcq", options: ["DAU/MAU", "Churn%", "Pageviews"], correctAnswer: "Churn%", userAnswer: "Churn%", marks: 1 },
      { id: "Q6", index: 6, text: "MVP means?", type: "text", correctAnswer: "Minimum Viable Product", userAnswer: "Minimum Viable Product", marks: 1 },
      { id: "Q7", index: 7, text: "User interviews are qualitative.", type: "mcq", options: ["True", "False"], correctAnswer: "True", userAnswer: "True", marks: 1 },
      { id: "Q8", index: 8, text: "Cohort analysis is used for…", type: "text", correctAnswer: "Retention analysis", userAnswer: "Retention analysis", marks: 1 },
      { id: "Q9", index: 9, text: "Kano model deals with…", type: "mcq", options: ["Pricing", "Delight features", "Security"], correctAnswer: "Delight features", userAnswer: "Security", marks: 1 },
      { id: "Q10", index: 10, text: "A/B testing helps with…", type: "text", correctAnswer: "Causal inference", userAnswer: "Experiments", marks: 1 },
    ],
  },
  "SUB-1001": {
    formId: "FORM-98124",
    submissionId: "SUB-1001",
    firstName: "Isha",
    lastName: "Patel",
    userId: "U-7001",
    submittedOn: new Date(Date.now() - 86400000).toISOString(),
    timeTakenSec: 605,
    attempt: 2,
    status: "Fail",
    questions: [
      { id: "Q1", index: 1, text: "What is NPS?", type: "text", correctAnswer: "Net Promoter Score", userAnswer: "Net Promoter Score", marks: 1 },
      { id: "Q2", index: 2, text: "Primary goal of product discovery?", type: "mcq", options: ["Ship fast", "Find fit", "Add features"], correctAnswer: "Find fit", userAnswer: "Ship fast", marks: 1 },
      { id: "Q3", index: 3, text: "Which is not a PM activity?", type: "mcq", options: ["User research", "Roadmapping", "Payroll"], correctAnswer: "Payroll", userAnswer: "Payroll", marks: 1 },
      { id: "Q4", index: 4, text: "OKR stands for?", type: "text", correctAnswer: "Objectives and Key Results", userAnswer: "Objectives and Key Results", marks: 1 },
      { id: "Q5", index: 5, text: "Best metric for retention?", type: "mcq", options: ["DAU/MAU", "Churn%", "Pageviews"], correctAnswer: "Churn%", userAnswer: "DAU/MAU", marks: 1 },
      { id: "Q6", index: 6, text: "MVP means?", type: "text", correctAnswer: "Minimum Viable Product", userAnswer: "Minimum Viable Product", marks: 1 },
      { id: "Q7", index: 7, text: "User interviews are qualitative.", type: "mcq", options: ["True", "False"], correctAnswer: "True", userAnswer: "False", marks: 1 },
      { id: "Q8", index: 8, text: "Cohort analysis is used for…", type: "text", correctAnswer: "Retention analysis", userAnswer: "Retention", marks: 1 },
      { id: "Q9", index: 9, text: "Kano model deals with…", type: "mcq", options: ["Pricing", "Delight features", "Security"], correctAnswer: "Delight features", userAnswer: "Delight features", marks: 1 },
      { id: "Q10", index: 10, text: "A/B testing helps with…", type: "text", correctAnswer: "Causal inference", userAnswer: "Causal inference", marks: 1 },
    ],
  },
};

/* =========================
   Utils
========================= */
const color = "text-[var(--text)]";
const color2 = "text-[var(--text-head)]";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function computeScore(detail: SubmissionDetail) {
  const total = detail.questions.length;
  let correct = 0;
  detail.questions.forEach((q) => {
    if (
      (q.correctAnswer ?? "").trim().toLowerCase() ===
      (q.userAnswer ?? "").trim().toLowerCase()
    ) {
      correct += 1;
    }
  });
  const scorePct = total ? Math.round((correct / total) * 100) : 0;
  return { correct, total, scorePct };
}

/* =========================
   Page
========================= */
export function FormSubmissionDetailPage() {
  const { formId = "FORM-98124", submissionId = "SUB-1000" } = useParams();

  // pick meta (fallback)
  const meta = DUMMY_FORM_META[formId] || {
    id: formId,
    name: `Form ${formId}`,
    status: "Active" as const,
    totalQuestions: 10,
  };

  // pick detail or fabricate a tiny demo if unknown
  const detail: SubmissionDetail =
    DUMMY_SUBMISSION_DETAILS[submissionId] ??
    makeRandomSubmissionDetail(formId, submissionId);

  const { correct, total, scorePct } = useMemo(
    () => computeScore(detail),
    [detail]
  );

  const isPass = scorePct >= 60;

  return (
    <>
    <Topbar name={meta.name} status={meta.status} id={meta.id}/>

    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Header */}
      {/* <header className="border-b border-[var(--faded)] bg-[var(--background)]">
        <div className="mx-auto w-full px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-head)]">
              View Form — {meta.name}
            </h1>
            <p className="text-xs mt-0.5">
              Form ID: <span className="text-[var(--text-head)]">{meta.id}</span> · Submission:{" "}
              <span className="text-[var(--text-head)]">{detail.submissionId}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={
                detail.status === "Pass"
                  ? "bg-[var(--green2)] text-[var(--green)]"
                  : detail.status === "Incomplete"
                  ? "bg-[var(--yellow2)] text-[var(--yellow)]"
                  : "bg-[var(--red2)] text-[var(--red)]"
              }
            >
              {detail.status}
            </Badge>
            <Button variant="border" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
        </div>
      </header> */}

      {/* Top actions */}
      <section className="mx-auto w-full px-4 py-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-[var(--text-head)] font-medium">
            {detail.firstName} {detail.lastName}
          </span>{" "}
          · User ID: <span className="text-[var(--text-head)]">{detail.userId}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="border" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export PDF
          </Button>
          <Button variant="border" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </section>

      {/* Stats (your requested card design) */}
      <section className="mx-auto w-full px-4 py-2">
        <SubmissionStats
          scorePct={scorePct}
          correct={correct}
          total={total}
          timeTakenSec={detail.timeTakenSec}
          attempt={detail.attempt}
          submittedOn={detail.submittedOn}
          passed={isPass}
        />
      </section>

      {/* Answers Table */}
        <section className="mx-auto w-full px-4 pb-10">
        <div className="rounded-md border border-[var(--faded)] bg-[var(--background)] overflow-hidden">
          <div className="border-b border-[var(--faded)] px-4 py-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--text-head)]">Answers</h2>
            <div className="text-xs text-[var(--text)]">
              Total Marks: <span className="text-[var(--text-head)]">{correct}</span> /{" "}
              <span className="text-[var(--text-head)]">{total}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader className="bg-[var(--faded)]">
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Your Answer</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead className="w-24">Result</TableHead>
                  <TableHead className="w-20">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detail.questions.map((q) => {
                  const correctAns = (q.correctAnswer ?? "").trim().toLowerCase();
                  const userAns = (q.userAnswer ?? "").trim().toLowerCase();
                  const isCorrect = correctAns === userAns;
                  return (
                    <TableRow key={q.id} className="hover:bg-[var(--brand-color2)]">
                      <TableCell className="text-sm">{q.index}</TableCell>
                      <TableCell>
                        <div className="text-[var(--text-head)]">{q.text}</div>
                        {q.type === "mcq" && q.options?.length ? (
                          <div className="text-xs mt-1">
                            Options: {q.options.join(" · ")}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-sm">
                        {q.userAnswer ?? <span className="opacity-60">—</span>}
                      </TableCell>
                      <TableCell className="text-sm">
                        {q.correctAnswer ?? <span className="opacity-60">—</span>}
                      </TableCell>
                      <TableCell>
                        {isCorrect ? (
                          <Badge className="bg-[var(--green2)] text-[var(--green)]">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Correct
                          </Badge>
                        ) : q.userAnswer ? (
                          <Badge className="bg-[var(--red2)] text-[var(--red)]">
                            <X className="h-3.5 w-3.5 mr-1" />
                            Wrong
                          </Badge>
                        ) : (
                          <Badge className="bg-[var(--yellow2)] text-[var(--yellow)]">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                            Skipped
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {isCorrect ? 1 : 0}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

/* ---------------- Stats (same card pattern you wanted) ---------------- */
function SubmissionStats({
  scorePct,
  correct,
  total,
  timeTakenSec,
  attempt,
  submittedOn,
  passed,
}: {
  scorePct: number;
  correct: number;
  total: number;
  timeTakenSec: number;
  attempt: number;
  submittedOn: string;
  passed: boolean;
}) {
  const orgStats = [
    { title: "Score", value: `${scorePct}%`, icon: Percent },
    { title: "Correct / Total", value: `${correct} / ${total}`, icon: ClipboardList },
    { title: "Time Taken", value: formatTime(timeTakenSec), icon: Clock },
    { title: "Attempt #", value: String(attempt), icon: Hash },
    { title: "Submitted On", value: new Date(submittedOn).toLocaleString(), icon: Clock },
    { title: "Result", value: passed ? "Pass" : "Fail", icon: Target },
  ];

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
      {orgStats.map((stat, index) => (
        <Card
          key={index}
          className="rounded-sm shadow-none bg-[var(--background)] border border-[var(--faded)]"
        >
          <CardHeader className="flex-col items-center px-4 gap-4 py-3 h-full">
            <div className="flex justify-between h-full items-center w-full">
              <div className={`${color} text-xs uppercase line-clamp-1`}>
                {stat.title}
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <stat.icon className={`h-8 w-8 ${color2}`} />
              <div className={`${color2} text-2xl`}>{stat.value}</div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
    
  );
}

/* ---------------- Fallback generator for unknown submission IDs ---------------- */
function makeRandomSubmissionDetail(formId: string, submissionId: string): SubmissionDetail {
  const firstNames = ["Mira", "Kabir", "Anaya", "Advait", "Sara", "Arjun", "Riya", "Vihaan"];
  const lastNames = ["Sharma", "Patel", "Rao", "Singh", "Verma", "Das"];

  const f = firstNames[Math.floor(Math.random() * firstNames.length)];
  const l = lastNames[Math.floor(Math.random() * lastNames.length)];

  const totalQ = DUMMY_FORM_META[formId]?.totalQuestions ?? 10;
  const questions: Question[] = Array.from({ length: totalQ }, (_, i) => {
    const idx = i + 1;
    const isMcq = Math.random() > 0.4;
    if (isMcq) {
      const opts = ["A", "B", "C", "D"];
      const correct = opts[Math.floor(Math.random() * opts.length)];
      const user = Math.random() > 0.3 ? opts[Math.floor(Math.random() * opts.length)] : "";
      return {
        id: `Q${idx}`,
        index: idx,
        text: `Sample MCQ Question ${idx}`,
        type: "mcq",
        options: opts,
        correctAnswer: correct,
        userAnswer: user,
        marks: 1,
      };
    }
    const correct = "Sample answer";
    const user = Math.random() > 0.3 ? (Math.random() > 0.5 ? "Sample answer" : "Some text") : "";
    return {
      id: `Q${idx}`,
      index: idx,
      text: `Sample Text Question ${idx}`,
      type: "text",
      correctAnswer: correct,
      userAnswer: user,
      marks: 1,
    };
  });

  const timeTakenSec = 300 + Math.floor(Math.random() * 600);
  const attempt = 1 + Math.floor(Math.random() * 3);

  // compute status quickly
  const { scorePct } = computeScore({ formId, submissionId, firstName: f, lastName: l, userId: "U-RAND", submittedOn: new Date().toISOString(), timeTakenSec, attempt, status: "Pass", questions });
  const status: SubmissionStatus = scorePct >= 60 ? "Pass" : Math.random() > 0.85 ? "Incomplete" : "Fail";

  return {
    formId,
    submissionId,
    firstName: f,
    lastName: l,
    userId: "U-RAND",
    submittedOn: new Date().toISOString(),
    timeTakenSec,
    attempt,
    status,
    questions,
  };
}
