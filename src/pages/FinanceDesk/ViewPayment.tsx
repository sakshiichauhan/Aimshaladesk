import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Receipt,
  ShoppingBag,
  CreditCard,
  Building2,
  Smartphone,
  ChevronLeft,
} from "lucide-react";

import { paymentsTable } from "@/data/Data";

import{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Topbar() {
  
  const navigator = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 py-3 h-16 mb-4 bg-[var(--background)] rounded-sm gap-4 border flex-wrap shadow-none">
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigator(-1)} className="cursor-pointer">Payments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage >View Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>
    </div>
)}

// Match your table shape
type Row = {
  id: number;
  PaymentID: string;
  Date: string;            // e.g. "11 Jul '25" (no time? fine, we show as-is)
  User: string;
  Email?: string;
  Product: string;         // e.g. "Masterclass: ACT"
  Code?: string;
  Type: string;            // e.g. "Masterclass"
  ProductTitle: string;    // e.g. "“Design Careers 101”"
  Gross: string;           // "₹500"
  PlatformFee: string;     // "₹100"
  GST: string;             // "₹18"
  GSTStatus: "Success" | "Failed" | "Pending";
  Status?: "Success" | "Failed" | "Pending";
  Gateway?: string;        // optional
  Mode?: string;           // optional
};

function StatusBadge({ s }: { s: Row["GSTStatus"] | Row["Status"] | undefined }) {
  const label = s ?? "Pending";
  if (label === "Success")
    return <Badge className="bg-[var(--green2)] text-[var(--green)]">✅ {label}</Badge>;
  if (label === "Failed")
    return <Badge className="bg-[var(--red2)] text-[var(--red)]">❌ {label}</Badge>;
  return <Badge className="bg-[var(--yellow2)] text-[var(--yellow)]">⌛ {label}</Badge>;
}

const RowLine: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">{icon}</div>
    <div className="flex-1">
      <div className="text-xs text-[var(--text)] uppercase">{label}</div>
      <div className="text-sm font-medium text-[var(--text-head)]">{value}</div>
    </div>
  </div>
);

const moneyToNum = (s?: string) => (s ? Number(String(s).replace(/[₹,\s]/g, "")) || 0 : 0);

export function ViewPayment() {
  const { pid, id: rid } = useParams<{ pid?: string; id?: string }>();
  const paramRaw = (pid ?? rid ?? "").trim();
  const param = decodeURIComponent(paramRaw);
  const navigate = useNavigate();

  const { row, } = useMemo(() => {
    const list = (paymentsTable as unknown as Row[]) || [];

    // Normalize helpers
    const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();

    // Try by PaymentID (string)
    let idx = list.findIndex((r) => norm(r.PaymentID) === norm(param));

    // Fallback: numeric id in URL
    if (idx === -1 && /^\d+$/.test(param)) {
      const num = Number(param);
      idx = list.findIndex((r) => r.id === num);
    }

    return {
      row: idx >= 0 ? list[idx] : undefined,
      prevPid: idx > 0 ? list[idx - 1].PaymentID : null,
      nextPid: idx >= 0 && idx < list.length - 1 ? list[idx + 1].PaymentID : null,
    };
  }, [param]);

  if (!row) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-head)]">Payment Details</h1>
        </div>
        <Card className="bg-[var(--background)] border shadow-none p-6">
          <div className="text-[var(--text)]">Payment not found.</div>
          <div className="mt-4">
            <Button variant="border" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Derive fee %
  const gross = moneyToNum(row.Gross);
  const fee = moneyToNum(row.PlatformFee);
  const feePct = gross > 0 ? Math.round((fee / gross) * 100) : null;

  const status = row.Status ?? row.GSTStatus ?? "Pending";
  const gateway = row.Gateway ?? "Razorpay";
  const mode = row.Mode ?? "UPI";
  const email = row.Email ?? "—";

  return (
    <div className="">
      {/* Header + Prev/Next */}
      <Topbar/>
      {/* <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-head)]">Payment Details</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="border"
            disabled={!prevPid}
            onClick={() => prevPid && navigate(`/finance/payments/${encodeURIComponent(prevPid)}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="brand"
            disabled={!nextPid}
            onClick={() => nextPid && navigate(`/finance/payments/${encodeURIComponent(nextPid)}`)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD — same design, new fields */}
        <div className="lg:col-span-1">
          <Card className="bg-[var(--background)] border shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-[var(--text-head)]">
                {row.Type}
              </CardTitle>
              <p className="text-sm text-[var(--text)]">{row.ProductTitle}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge variant="brand">{row.PaymentID}</Badge>
                <StatusBadge s={status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <RowLine
                icon={<Calendar className="h-4 w-4 text-[var(--text)]" />}
                label="Date & Time"
                value={row.Date}
              />
              <RowLine
                icon={<User className="h-4 w-4 text-[var(--text)]" />}
                label="User Name / Email"
                value={
                  <span>
                    {row.User} <span className="text-[var(--text)]">/</span> {email}
                  </span>
                }
              />
              <Separator />
              <RowLine
                icon={<ShoppingBag className="h-4 w-4 text-[var(--text)]" />}
                label="Product Type"
                value={row.Type}
              />
              <RowLine
                icon={<Receipt className="h-4 w-4 text-[var(--text)]" />}
                label="Platform Fee"
                value={feePct !== null ? `${row.PlatformFee} (${feePct}%)` : row.PlatformFee}
              />
              <RowLine
                icon={<Receipt className="h-4 w-4 text-[var(--text)]" />}
                label="GST Charged"
                value={`${row.GST} (on platform fee)`}
              />
              <RowLine
                icon={<Building2 className="h-4 w-4 text-[var(--text)]" />}
                label="Coach / Org Payout"
                value={"₹" + Math.max(gross - fee - moneyToNum(row.GST), 0)}
              />
              <Separator />
              <RowLine
                icon={<CreditCard className="h-4 w-4 text-[var(--text)]" />}
                label="Payment Gateway"
                value={gateway}
              />
              <RowLine
                icon={<Smartphone className="h-4 w-4 text-[var(--text)]" />}
                label="Payment Mode"
                value={mode}
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN — spare for notes/receipt */}
        <div className="lg:col-span-2">
          <Card className="bg-[var(--background)] border shadow-none p-6">
            <div className="text-[var(--text)]">
              {/* You can add line items, invoice, or notes here */}
              This area is available for receipts, line items, or admin notes.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
