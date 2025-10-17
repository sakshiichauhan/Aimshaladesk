// import { useState } from "react";
// import {
//   Phone, Video, Users, Mail, MessageCircle,
//   Paperclip, FileText, Star,  
//   UserCheck,
//   ArrowUpRight,
//   Calendar
// } from "lucide-react";

// /* shadcn/ui */
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import avatarImage from "@/assets/avatar.png";

// import {
//   Breadcrumb, BreadcrumbItem, BreadcrumbLink,
//   BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { ReferredBlock } from "./RefferedByCoachtab";

// /* ---------- Types ---------- */
// type Attachment = {
//   id: string;
//   name: string;
//   kind: "image" | "pdf" | "doc" | "sheet" | "zip" | "ppt" | "link" | "other";
//   sizeMB?: number;
//   url?: string;
// };
// type Review = { rating: number; title?: string; comment: string; date: string; tags?: string[]; };
// type Session = {
//   id: string; sessionId: string;
//   explorerId: string; explorerName: string; explorerPhoto?: string; explorerPhone?: string; explorerEmail?: string;
//   coachId: string; coachName: string; coachPhoto?: string; coachPhone?: string; coachSpecialty?: string; coachEmail?: string;
//   bookedOn: string; sessionDateTime: string; durationMin: number; typeMode: "Video" | "Audio" | "In-Person";
//   objective: string; joinLink?: string;
//   amountGross: number; platformFee: number; coachShare: number; paymentMethod: "Stripe"|"Razorpay"|"Cash"|"Other"; transactionId?: string;
//   assessment?: { overall?: string; };
//   attachmentsList?: Attachment[];
//   reviews?: { explorer?: Review; coach?: Review; };
// };
// type ViewSessionPageProps = { session?: Session | null };

// const money = (v: number) => `₹${v.toLocaleString("en-IN")}`;

// /* ---------- Dummy Data tuned to screenshot ---------- */
// const DUMMY_SESSION: Session = {
//   id: "session_001",
//   sessionId: "SES-2024-001",

//   explorerId: "EXP-12016",
//   explorerName: "Dr. Jane Smith",
//   explorerPhoto: avatarImage,
//   explorerPhone: "+91 95 602 97 002",
//   explorerEmail: "hello@aimshala.com",

//   coachId: "Coach-1246",
//   coachName: "Dr. Jane Smith",
//   coachPhoto: avatarImage,
//   coachSpecialty: "Asst. Manager at EY Global Delivery Services",
//   coachPhone: "+91 95 602 97 002",
//   coachEmail: "hello@aimshala.com",

//   bookedOn: "Jan 26, 2024",
//   sessionDateTime: "2024-09-20 12:30 AM",
//   durationMin: 60,
//   typeMode: "Video",
//   objective: "Career Consulting: Goal Setting",
//   joinLink: "#",

//   amountGross: 2500,
//   platformFee: 500,
//   coachShare: 2000,

//   paymentMethod: "Razorpay",
//   transactionId: "TXN-12345",

//   assessment: { overall: "Access Granted" },

//   attachmentsList: [
//     { id: "a1", name: "10th Class Result", kind: "pdf", sizeMB: 3.2, url: "#" },
//     { id: "a2", name: "10th Class Result", kind: "zip", sizeMB: 3.2, url: "#" },
//     { id: "a3", name: "10th Class Result", kind: "pdf", sizeMB: 3.2, url: "#" },
//     { id: "a4", name: "10th Class Result", kind: "zip", sizeMB: 3.2, url: "#" },
//   ],

//   reviews: {
//     explorer: { rating: 5, title: "Great guidance", comment: "Clear plan and next steps.", date: "2024-01-20" },
//     coach: { rating: 4, title: "Strong potential", comment: "Polish resume and practice.", date: "2024-01-20" },
//   },
// };

// function RatingStars({ value }: { value: number }) {
//   return (
//     <div className="inline-flex items-center gap-1">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <Star key={i} className={`h-4 w-4 ${i < value ? "text-[var(--brand-color)] fill-[var(--brand-color)]" : "text-[var(--text)]/30"}`} />
//       ))}
//     </div>
//   );
// }


// // Restore the original ProfileCard UI (as before)

// function ProfileCard({
//   role,
//   name,
//   id,
//   subtitle,
//   phone,
//   email,
//   photo,
// }: {
//   role: "Explorer" | "Coach";
//   name: string;
//   id: string;
//   subtitle?: string;
//   phone?: string;
//   email?: string;
//   photo?: string;
// }) {
//   const expNum = id?.match(/\d+/)?.[0] || id;
//   const badgeText = role === "Explorer" ? `Exp – ${expNum}` : id;

//   return (
//     <Card className="bg-[var(--background)] border shadow-none rounded-sm">
//       <CardHeader className="">
//         <div className="grid grid-cols-[48px_1fr] gap-x-2">
//           {/* avatar */}
//           <div className="relative">
//             <img
//               src={photo || avatarImage}
//               alt={name}
//               className="w-12 h-12 rounded-full object-cover border-2 border-[var(--brand-color)]"
//             />
//             <span className="absolute -bottom-0 -right-0 w-3 h-3 bg-[#2ecc71] border-2 border-white rounded-full" />
//           </div>

//           {/* name + badge */}
//           <div>
//             <div className="flex items-center gap-2">
//               <CardTitle className="text-[var(--text-head)] text-[18px] leading-none">
//                 {name}
//               </CardTitle>
//               <Badge className="rounded-full bg-[#f0e7fd] text-[var(--text-head)]/70 text-[10px]">
//                 {badgeText}
//               </Badge>
//             </div>
//             <div className="mt-1 text-[13px] text-[var(--text)]">{subtitle}</div>
//           </div>

//           {/* phone + email */}
//           <div className="col-span-2 mt-2 flex items-center gap-4 text-[12px] text-[var(--text)]">
//             <span className="inline-flex items-center gap-1">
//               <Phone className="h-3 w-3" /> {phone || "—"}
//             </span>
//             <span className="inline-flex items-center gap-1">
//               <Mail className="h-3 w-3" /> {email || "—"}
//             </span>
//           </div>

//           {/* quick actions */}
//           <div className="col-span-2 mt-2">
//             <div className="text-xs font-medium text-[var(--text)] mb-1">Quick Actions</div>
//             <div className="grid grid-cols-2 gap-2">
//               <Button variant="border" size="sm" className="h-8 justify-start px-2">
//                 <Mail className="h-3 w-3 mr-2" /> Email
//               </Button>
//               <Button variant="border" size="sm" className="h-8 justify-start px-2">
//                 <Phone className="h-3 w-3 mr-2" /> Call
//               </Button>
//               <Button variant="border" size="sm" className="h-8 justify-start px-2">
//                 <MessageCircle className="h-3 w-3 mr-2" /> Message
//               </Button>
//               <Button variant="border" size="sm" className="h-8 justify-start px-2">
//                 <FileText className="h-3 w-3 mr-2" /> Profile
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardHeader>
//     </Card>
//   );
// }


// /* ---------- Small helpers ---------- */
// const kindIcon = (k: Attachment["kind"]) =>
//   ["zip", "ppt", "pdf", "doc", "sheet"].includes(k) ? (
//     <FileText className="h-4 w-4 text-[var(--brand-color)]" />
//   ) : (
//     <Paperclip className="h-4 w-4 text-[var(--brand-color)]" />
//   );

// // Restore the original segmented-control design (only design)

// function PillsTabs({
//   active,
//   set,
// }: {
//   active: "overview" | "reviews" | "timeline";
//   set: (t: "overview" | "reviews" | "timeline") => void;
// }) {
//   const items: Array<{ key: typeof active; label: string }> = [
//     { key: "overview", label: "Overview" },
//     { key: "reviews", label: "Reviews" },
//     { key: "timeline", label: "Timeline" },
//   ];

//   return (
//     // Parent already provides the bg + padding wrapper; keep this just the row
//     <div className="flex space-x-1">
//       {items.map(({ key, label }) => (
//         <button
//           key={key}
//           onClick={() => set(key)}
//           className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
//             active === key
//               ? "bg-[var(--background)] text-[var(--text-head)] shadow-sm"
//               : "text-[var(--text)] hover:text-[var(--text-head)]"
//           }`}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }


// // ---- Small stat card
// function StatsCard({
//   title,
//   value,
//   icon: Icon,
// }: {
//   title: string;
//   value: string | React.ReactNode;
//   icon: React.ComponentType<{ className?: string }>;
// }) {
//   return (
//     <Card className="rounded-sm shadow-none bg-[var(--background)] border">
//       <CardHeader className="px-4 pb-3">
//         <div className="text-xs uppercase text-[var(--text)]">{title}</div>
//         <div className="mt-1 flex items-center gap-3">
//           <Icon className="h-5 w-5 text-[var(--text)]" />
//           <div className="text-xl font-semibold text-[var(--text-head)]">{value}</div>
//         </div>
//       </CardHeader>
//     </Card>
//   );
// }



// // ---- Review card
// function ReviewCard({
//   title,
//   who,
//   avatar,
//   role,
//   review,
// }: {
//   title: string;
//   who: string;
//   avatar?: string;
//   role: "Explorer" | "Coach";
//   review?: Review;
// }) {
//   return (
//     <Card className="bg-[var(--background)] border shadow-none rounded-sm">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg text-[var(--text-head)]">{title}</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-3">
//         {review ? (
//           <>
//             <div className="flex items-start gap-3">
//               <img
//                 src={avatar || avatarImage}
//                 alt={who}
//                 className="w-9 h-9 rounded-full object-cover border-2 border-[var(--brand-color)]"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2">
//                   <div className="text-sm font-semibold text-[var(--text-head)] truncate">{who}</div>
//                   <span className="inline-flex items-center rounded-full bg-[var(--brand-color2)] text-[var(--brand-color)] text-[10px] px-2 py-[2px]">
//                     {role}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 mt-1">
//                   <RatingStars value={review.rating} />
//                   {review.title && (
//                     <span className="text-sm text-[var(--text-head)] font-medium">· {review.title}</span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {review.tags?.length ? (
//               <div className="flex flex-wrap gap-2">
//                 {review.tags.map((t) => (
//                   <span
//                     key={t}
//                     className="inline-flex items-center rounded-full bg-[var(--brand-color2)] text-[var(--brand-color)] text-[11px] px-2 py-[2px]"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             ) : null}

//             <div className="rounded-sm bg-[var(--faded)] p-3 text-sm text-[var(--text)] leading-relaxed">
//               {review.comment}
//             </div>

//             <div className="flex items-center justify-between text-xs text-[var(--text)]">
//               <span>{review.date}</span>
//               <Button variant="border" size="sm" className="h-7 px-2">
//                 Flag
//               </Button>
//             </div>
//           </>
//         ) : (
//           <div className="text-sm text-[var(--text)] bg-[var(--faded)] rounded-sm p-3">
//             No review yet.
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }




// /* ---------- Page ---------- */
// export function ViewSession({ session }: ViewSessionPageProps) {
//   const nav = useNavigate();
//   const s = session || DUMMY_SESSION;
//   const [tab, setTab] = useState<"overview" | "reviews" | "timeline">("overview");

//   return (
//     <div className="flex-col gap-4">
//       {/* Header */}
//       <div className="flex justify-between items-center px-4 h-[64px] py-3 bg-[var(--background)] rounded-sm gap-4 border shadow-none mb-4">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem><BreadcrumbLink onClick={() => nav(-1)} className="cursor-pointer">Sessions</BreadcrumbLink></BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem><BreadcrumbPage>Sessions Detail</BreadcrumbPage></BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* LEFT 2/3 */}
//         <div className="xl:col-span-2 space-y-6">
//           {/* identity row */}
//           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
//             <ProfileCard
//               name="Dr. Jane Smith"
//               subtitle="Asst. Manager at EY Global Delivery Services"
//               id="Exp-12016"
//               role="Explorer"
//               phone={s.explorerPhone}
//               email={s.explorerEmail}
//             />
//             {/* center circular icon rail */}
//             <div className="hidden md:flex items-center justify-center px-2">
//               <div className="relative h-12 w-12">
//                 <span className="absolute inset-[3px] rounded-full border opacity-50" style={{ borderColor: "var(--brand-color2)" }} />
//                 <span className="absolute rounded-full border inset-[7px]" style={{ borderColor: "var(--brand-color2)" }} />
//                 <span className="absolute grid place-items-center rounded-full border-2 inset-[9px]" style={{ background: "var(--brand-color2)", borderColor: "var(--faded)" }}>
//                   <Phone className="h-4 w-4 text-[var(--brand-color)]" />
//                 </span>
//               </div>
//             </div>
//             <ProfileCard
//               name="Dr. Jane Smith"
//               subtitle="Asst. Manager at EY Global Delivery Services"
//               id="Coach-1246"
//               role="Coach"
//               phone={s.coachPhone}
//               email={s.coachEmail}
//             />
//           </div>

//           {/* Tabs bar — Overview / Reviews / Timeline */}
//           <div className="bg-[var(--faded)] p-1 rounded-sm">
//             <PillsTabs active={tab} set={setTab} />
//           </div>

//           {/* TAB CONTENT */}
//           {tab === "overview" && (
//             <div className="space-y-6">
//               {/* Files Attachment (two-column rows like screenshot) */}
//               <Card className="bg-[var(--background)] border shadow-none rounded-sm">
//                 <CardHeader className=""><CardTitle className="text-lg text-[var(--text-head)]">Files Attachment</CardTitle></CardHeader>
//                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {s.attachmentsList?.map((f)=>(
//                     <div key={f.id} className="rounded-sm border p-2">
//                       <div className="flex items-center justify-between gap-3">
//                         <div className="flex items-center gap-2 min-w-0">
//                           <div className="rounded-md bg-[var(--faded)] p-2">{kindIcon(f.kind)}</div>
//                           <div className="min-w-0">
//                             <div className="text-sm text-[var(--text-head)] truncate">{f.name}</div>
//                             <div className="text-[11px] text-[var(--text)]">{f.sizeMB ? `${f.sizeMB} MB` : ""}</div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 shrink-0">
//                           <a href={f.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] rounded-md px-2 py-1 bg-[var(--brand-color2)] text-[var(--brand-color)]">
//                             Open
//                           </a>
//                           <a href={f.url} download className="inline-flex items-center gap-1 text-[11px] rounded-md px-2 py-1 bg-[var(--faded)] text-[var(--text-head)]">
//                             Download
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* Referred by Coach */}
//               <ReferredBlock
//     data={{
//       coach: [
//         { id: "1", name: "Dr. Jane Smith", subtitle: "Senior Software Engineer at Tech Innovations", tag: "CUET", img: avatarImage },
//         { id: "2", name: "Emily Johnson", subtitle: "Chief Data Scientist, DataWise Analytics", tag: "CUET", img: avatarImage },
//         { id: "3", name: "Dr. Jane Smith", subtitle: "Senior Software Engineer at Tech Innovations", tag: "CUET", img: avatarImage },
//         { id: "4", name: "Dr. Jane Smith", subtitle: "Senior Software Engineer at Tech Innovations", tag: "CUET", img: avatarImage },
//       ],
//       resources: [
//         { id: "r1", title: "Title: 10th Class Math Exam Syllabus", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod…", price: 999, mrp: 1500, href: "#" },
//         { id: "r2", title: "Title: 10th Class Math Exam Syllabus", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod…", price: 999, mrp: 1500, href: "#" },
//         { id: "r3", title: "Title: 10th Class Math Exam Syllabus", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod…", price: 999, mrp: 1500, href: "#" },
//         { id: "r4", title: "Title: 10th Class Math Exam Syllabus", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod…", price: 999, mrp: 1500, href: "#" },
//       ],
//       library: [
//         { id: "l1", label: "Accounting & Taxation", badge: "Career", subline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", href: "#" },
//         { id: "l2", label: "MBA (Finance / Marketing / Strategy)", badge: "Career", subline: "Commerce & Finance", href: "#" },
//         { id: "l3", label: "CA Foundation / Intermediate / Final", badge: "Exam", subline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", href: "#" },
//         { id: "l4", label: "CA Foundation / Intermediate / Final", badge: "Exam", subline: "Basic Programming", href: "#" },
//         { id: "l5", label: "Excel & Advanced Excel", badge: "Certification", subline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", href: "#" },
//         { id: "l6", label: "Data Visualization with Power BI", badge: "Courses", subline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", href: "#" },
//         { id: "l7", label: "XLRI Jamshedpur", badge: "College", subline: "Noida, Uttar Pradesh, India", href: "#" },
//         { id: "l8", label: "National Scholarship Portal (NSP, India)", badge: "Scholarship", subline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", href: "#" },
//       ],
//       links: [
//         { id: "x1", title: "Official Website - National Testing Agency", href: "#" },
//         { id: "x2", title: "Download Exam Brochure", href: "#" },
//         { id: "x3", title: "Previous Year Papers", href: "#" },
//       ],
//     }}
//   />

//               {/* Notes By Coach */}
//               <Card className="bg-[var(--background)] border shadow-none rounded-sm">
//                 <CardHeader><CardTitle className="text-lg text-[var(--text-head)]">Notes By Coach</CardTitle></CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-[var(--text)] leading-relaxed">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

// {tab === "reviews" && (
//   <div className="space-y-6">
//     {/* STATS ROW */}
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//       <StatsCard
//         title="Average Rating"
//         value={
//           (() => {
//             const r = [s.reviews?.explorer?.rating, s.reviews?.coach?.rating].filter(
//               (x): x is number => typeof x === "number"
//             );
//             const avg = r.length ? (r.reduce((a, b) => a + b, 0) / r.length).toFixed(1) : "—";
//             return (
//               <span className="flex items-center gap-2">
//                 <RatingStars value={Math.round(Number(avg) || 0)} /> {avg}
//               </span>
//             );
//           })()
//         }
//         icon={Star}
//       />

//       <StatsCard
//         title="Explorer’s Rating"
//         value={
//           <span className="flex items-center gap-2">
//             <RatingStars value={s.reviews?.explorer?.rating || 0} />
//             {s.reviews?.explorer?.rating ?? "—"}
//           </span>
//         }
//         icon={Users}
//       />

//       <StatsCard
//         title="Coach’s Rating"
//         value={
//           <span className="flex items-center gap-2">
//             <RatingStars value={s.reviews?.coach?.rating || 0} />
//             {s.reviews?.coach?.rating ?? "—"}
//           </span>
//         }
//         icon={UserCheck}
//       />
//     </div>

//     {/* TWO REVIEW CARDS */}
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//       <ReviewCard
//         title="Explorer’s Review"
//         who={s.explorerName}
//         avatar={s.explorerPhoto}
//         role="Explorer"
//         review={s.reviews?.explorer}
//       />
//       <ReviewCard
//         title="Coach’s Review"
//         who={s.coachName}
//         avatar={s.coachPhoto}
//         role="Coach"
//         review={s.reviews?.coach}
//       />
//     </div>
//   </div>
// )}


//           {tab === "timeline" && (
//             <Card className="bg-[var(--background)] border shadow-none rounded-sm">
//               <CardHeader className="pb-2"><CardTitle className="text-lg text-[var(--text-head)]">Timeline</CardTitle></CardHeader>
//               <CardContent className="space-y-3 text-sm text-[var(--text)]">
//                 <div>• Session booked — Jan 26, 2024 1:30 PM</div>
//                 <div>• Rescheduled — Jan 26, 2024 5:00 PM</div>
//                 <div>• Assessment uploaded — Jan 28, 2024 9:10 AM</div>
//               </CardContent>
//             </Card>
//           )}
//         </div>

//         {/* RIGHT 1/3 — exactly as screenshot */}
//         <aside className="xl:col-span-1">
//           <div className="space-y-4">
//             {/* Join + Report */}
//             <div className="flex items-center gap-2">
//               <Button variant="brand" size="new" className="flex-1 justify-center"><Video className="h-3 w-3 mr-2" /> Join Session</Button>
//               <Button variant="border" size="new" className="px-3">Report</Button>
//             </div>

//             {/* Assessment Result */}
//             <Card className="bg-[var(--background)] border rounded-sm shadow-none">
//               <CardHeader className=""><CardTitle className="text-lg text-[var(--text-head)]">Assessment Result</CardTitle></CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between rounded-sm border p-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="rounded-md bg-[var(--faded)] p-2"><FileText className="h-4 w-4 text-[var(--brand-color)]" /></div>
//                     <div className="min-w-0">
//                       <div className="text-sm text-[var(--text-head)] truncate">ACE test Result</div>
//                       <div className="text-[11px] text-[var(--text)]">Access Granted</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Badge className="bg-[var(--brand-color2)] text-[var(--brand-color)]">Open</Badge>
//                     <Badge variant="secondary">Download</Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Session Details */}
// <Card className="bg-[var(--background)] border rounded-sm shadow-none">
//   <CardHeader className="">
//     <CardTitle className="text-lg text-[var(--text-head)]">Session Details</CardTitle>
//   </CardHeader>

//   <CardContent className="space-y-3">
//     {/* Top row: time badge + main details */}
//     <div className="flex gap-3">
//       {/* Left: time chip */}
//       <div className="shrink-0 w-[95px] rounded-lg border bg-[var(--faded)] p-2 text-center">
//         <div className="text-[16px] font-semibold leading-tight text-[var(--text-head)] pt-2">
//           {"12:30 AM"}
//         </div>
//         <div className="">
//             <div className="relative left-10 h-[30px]">
//               <span className="absolute h-2 w-2 border-2 border-[var(--brand-color2)] rounded-full bg-[var(--brand-color)] -left-1 -top-0" />
//               <span className="absolute h-1 w-1 rounded-full bg-[var(--brand-color2)] -left-0.5 top-1/2 " />
//               <span className="absolute h-1 w-1 rounded-full bg-[var(--brand-color2)] -left-0.5 bottom-4 " />
//               <span className="absolute h-2 w-2 border-2 border-[var(--brand-color2)] rounded-full bg-[var(--brand-color)] -left-1 -bottom-0" />
//             </div>
//         </div>
        
//         <div className="text-[14px] leading-tight text-[var(--text)]/60">
//           02:40 PM
//         </div>
//       </div>

//       {/* Right: title, id + status, meta rows */}
//       <div className="min-w-0 flex-1">
//         <div className="flex flex-wrap items-center gap-2">
//           <div className="text-[15px] font-semibold text-[var(--text-head)]">
//             <span className="font-semibold">Career Consulting</span>
//             <span className="font-normal">: Goal Setting</span>
//           </div>
          
//         </div>

//         <div className="mt-1 text-[12px] text-[var(--text)] flex items-center gap-2">
//           ID: {s.sessionId}
//           <span className="inline-flex items-center rounded-full bg-[var(--brand-color2)] px-2 py-0.5 text-[11px] font-medium text-[var(--brand-color)]">
//             Scheduled
//           </span>
//         </div>

//         {/* meta rows */}
//         <div className="mt-2 flex items-center gap-2 text-sm text-[var(--text-head)]">
//           <Calendar className="h-4 w-4 text-[var(--text)]" />
//           <div>
//             On <span className="font-semibold">Sep 20, 2024</span> at 5:00 PM
//           </div>
//         </div>
//         <div className="mt-1 flex items-center gap-2 text-sm text-[var(--text-head)]">
//           <Video className="h-4 w-4 text-[var(--text)]" />
//           <div>
//             <span className="font-medium">1:1</span> Call
//             <span className="mx-2 text-[var(--text)]/50">|</span>
//             <span>B2B Non Profit Session</span>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Divider */}
//     <div className="h-px bg-[var(--faded)] mt-1" />

//     {/* Key-Value rows */}
//     <div className="space-y-2">
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-[var(--text)]">Booked / Purchased Time</span>
//         <span className="font-semibold text-[var(--text-head)]">26 Jan 25, 5:00 PM</span>
//       </div>
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-[var(--text)]">Booking ID</span>
//         <span className="font-semibold tracking-wide text-[var(--text-head)]">COUN1565</span>
//       </div>

//       {/* Divider */}
//     <div className="h-px bg-[var(--faded)] mt-1" />

//       <div className="flex items-center justify-between text-sm">
//         <span className="text-[var(--text)]">Rescheduled On</span>
//         <span className="font-semibold text-[var(--text-head)]">26 Jan 25, 5:00 PM</span>
//       </div>
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-[var(--text)]">Reschedule Count</span>
//         <span className="font-semibold text-[var(--text-head)]">1</span>
//       </div>

//       {/* Divider */}
//     <div className="h-px bg-[var(--faded)] mt-1" />

//       <div className="flex items-center justify-between text-sm">
//         <span className="text-[var(--text)]">Recording</span>
//         <a href="#" className="inline-flex items-center gap-1 font-semibold text-[var(--brand-color)]">
//           Preview <ArrowUpRight className="h-3 w-3" />
//         </a>
//       </div>
//     </div>
//   </CardContent>
// </Card>


//             {/* Payment Details */}
//             <Card className="bg-[var(--background)] border rounded-sm shadow-none">
//               <CardHeader className=""><CardTitle className="text-lg text-[var(--text-head)]">Payment Details</CardTitle></CardHeader>
//               <CardContent className="space-y-2 text-sm">
//                 <KV label="Transaction ID" value="TXN-12345" />
//                 <KV label="Payment Date" value="01 Oct 2024 14:30" />
//                 <KV label="Payment Via" value="UPI" />
//                 <div className="h-px bg-[var(--faded)] my-2" />
//                 <KV label="Total Amount" value={money(s.amountGross)} />
//                 <KV label="Coach Share" value={money(s.coachShare)} />
//                 <KV label="Platform Fee" value={money(s.platformFee)} />
//                 <KV label="Discount" value="₹500 (20%)" />
//                 <KV label="Final Paid" value="₹2,000" />
//               </CardContent>
//             </Card>

//             {/* Refund Details */}
//             <Card className="bg-[var(--background)] border rounded-sm shadow-none">
//               <CardHeader className="pb-2"><CardTitle className="text-lg text-[var(--text-head)]">Refund Details</CardTitle></CardHeader>
//               <CardContent className="space-y-2 text-sm">
//                 <KV label="Refund Status" value="Paid" />
//                 <KV label="Reason" value="Missed by Coach" />
//                 <KV label="Refunded On" value="26 Jan 2024 5:00 PM" />
//                 <KV label="Amount" value="₹2,000" />
//                 <KV label="Refunded Via" value="UPI" />
//               </CardContent>
//             </Card>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// /* ---------- Right column helpers ---------- */
// function KV({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span className="text-[var(--text)]">{label}</span>
//       <span className="font-semibold text-[var(--text-head)]">{value}</span>
//     </div>
//   );
// }



export function ViewSession() {
  return (
    <div>
      session view
    </div>
  )
}


