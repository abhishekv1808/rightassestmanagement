"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function fmtINRExact(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

type AmortRow = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const { emi, totalPayable, totalInterest, schedule } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = tenure * 12;
    const emi =
      r === 0
        ? loanAmount / n
        : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;

    // Build amortization schedule
    const rows: AmortRow[] = [];
    let balance = loanAmount;
    let cumPrincipal = 0;
    let cumInterest = 0;

    for (let m = 1; m <= n; m++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      balance = Math.max(0, balance - principalPart);
      cumPrincipal += principalPart;
      cumInterest += interestPart;
      rows.push({
        month: m,
        emi,
        principal: principalPart,
        interest: interestPart,
        balance,
        totalPrincipal: cumPrincipal,
        totalInterest: cumInterest,
      });
    }

    return {
      emi,
      totalPayable,
      totalInterest: totalPayable - loanAmount,
      schedule: rows,
    };
  }, [loanAmount, rate, tenure]);

  const principalPct = Math.round((loanAmount / totalPayable) * 100);
  const interestPct = 100 - principalPct;

  // Group schedule rows by calendar year
  const yearGroups = useMemo(() => {
    const startDate = new Date();
    const groups: {
      year: number;
      months: (AmortRow & { monthName: string })[];
    }[] = [];
    let currentYear = startDate.getFullYear();
    let currentGroup: (AmortRow & { monthName: string })[] = [];

    schedule.forEach((row, idx) => {
      const d = new Date(startDate);
      d.setMonth(d.getMonth() + idx + 1);
      const y = d.getFullYear();
      const monthName = MONTH_NAMES[d.getMonth()];

      if (y !== currentYear) {
        if (currentGroup.length > 0) {
          groups.push({ year: currentYear, months: currentGroup });
        }
        currentYear = y;
        currentGroup = [];
      }
      currentGroup.push({ ...row, monthName });
    });
    if (currentGroup.length > 0) {
      groups.push({ year: currentYear, months: currentGroup });
    }
    return groups;
  }, [schedule]);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  // Excel download
  const downloadExcel = useCallback(async () => {
    const XLSX = await import("xlsx");
    const wsData = [
      ["Loan Amortization Schedule — Right Assets Management"],
      [
        `Loan Amount: ${fmtINR(loanAmount)}`,
        `Interest Rate: ${rate.toFixed(1)}%`,
        `Tenure: ${tenure} years`,
        `Monthly EMI: ${fmtINRExact(emi)}`,
      ],
      [],
      [
        "Month",
        "EMI (₹)",
        "Principal (₹)",
        "Interest (₹)",
        "Balance (₹)",
        "Cumulative Principal (₹)",
        "Cumulative Interest (₹)",
      ],
      ...schedule.map((r) => [
        r.month,
        Math.round(r.emi),
        Math.round(r.principal),
        Math.round(r.interest),
        Math.round(r.balance),
        Math.round(r.totalPrincipal),
        Math.round(r.totalInterest),
      ]),
      [],
      [
        "Total",
        Math.round(emi * tenure * 12),
        Math.round(loanAmount),
        Math.round(totalInterest),
        0,
        "",
        "",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws["!cols"] = [
      { wch: 8 },
      { wch: 14 },
      { wch: 14 },
      { wch: 14 },
      { wch: 16 },
      { wch: 22 },
      { wch: 22 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Amortization");
    XLSX.writeFile(
      wb,
      `Loan_Amortization_${fmtINR(loanAmount)}_${rate}pct_${tenure}yrs.xlsx`,
    );
  }, [schedule, loanAmount, rate, tenure, emi, totalInterest]);

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)", border: "1px solid #EEF0F3" }}
            >
              {/* Card header */}
              <div
                className="px-8 py-5"
                style={{
                  borderBottom: "1px solid #EEF0F3",
                  background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.18em] mb-1"
                      style={{ color: "#C9A84C" }}
                    >
                      Loan Calculator
                    </p>
                    <h2
                      className="font-heading font-bold text-xl text-white"
                    >
                      Enter Loan Details
                    </h2>
                  </div>
                  <div
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
                  >
                    Drag sliders to update
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-4">
                <SliderInput
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={100000}
                  max={50000000}
                  step={100000}
                  display={fmtINR(loanAmount)}
                  minLabel="₹1 L"
                  maxLabel="₹5 Cr"
                />
                <SliderInput
                  label="Annual Interest Rate"
                  value={rate}
                  onChange={setRate}
                  min={5}
                  max={25}
                  step={0.1}
                  display={`${rate.toFixed(1)}%`}
                  minLabel="5%"
                  maxLabel="25%"
                />
                <SliderInput
                  label="Loan Tenure"
                  value={tenure}
                  onChange={setTenure}
                  min={1}
                  max={30}
                  step={1}
                  display={`${tenure} yr${tenure > 1 ? "s" : ""}`}
                  minLabel="1 yr"
                  maxLabel="30 yrs"
                />
              </div>

              {/* Formula footer */}
              <div
                className="mx-7 mb-7 p-4 rounded-xl flex gap-3"
                style={{
                  backgroundColor: "#EEF2F8",
                  border: "1px solid #D6E0F0",
                }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#1B3A6B" }}
                />
                <div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "#1B3A6B" }}
                  >
                    Formula Used
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                    EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ − 1] — where P = principal, r = monthly rate, n = tenure in months. Calculated on reducing balance method.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}
            >
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Monthly EMI
                </p>
                <p
                  className="font-heading font-bold text-white"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
                >
                  {fmtINR(emi)}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  For {tenure} years at {rate.toFixed(1)}% p.a.
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
                {/* Breakdown bar */}
                <div>
                  <div className="flex rounded-full overflow-hidden h-3 mb-2.5">
                    <div
                      style={{
                        width: `${principalPct}%`,
                        backgroundColor: "#1B3A6B",
                        transition: "width 0.4s ease",
                      }}
                    />
                    <div
                      style={{
                        width: `${interestPct}%`,
                        backgroundColor: "#C9A84C",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span
                      className="flex items-center gap-1.5"
                      style={{ color: "#6B7280" }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: "#1B3A6B" }}
                      />
                      Principal ({principalPct}%)
                    </span>
                    <span
                      className="flex items-center gap-1.5"
                      style={{ color: "#6B7280" }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: "#C9A84C" }}
                      />
                      Interest ({interestPct}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "#EEF2F8" }}
                  >
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>
                      Principal Amount
                    </p>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "#1B3A6B" }}
                    >
                      {fmtINR(loanAmount)}
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "#FBF5E6" }}
                  >
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>
                      Total Interest
                    </p>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "#C9A84C" }}
                    >
                      {fmtINR(totalInterest)}
                    </p>
                  </div>
                  <div
                    className="col-span-2 p-4 rounded-xl"
                    style={{
                      backgroundColor: "#F9F8F5",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>
                      Total Amount Payable
                    </p>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "#1A1A1A" }}
                    >
                      {fmtINR(totalPayable)}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Actual EMI may vary by lender. Get the best rates from our
                  advisors.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Get Best Loan Rates — Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919742826804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: "#25D366", color: "white" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Amortization Schedule ─────────────────────────────────── */}
        <div className="mt-12">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #E2E8F0", backgroundColor: "white" }}
          >
            {/* Table header bar */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid #E2E8F0" }}
            >
              <div>
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "#1B3A6B" }}
                >
                  Amortization Schedule
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                  {tenure * 12} months · {fmtINRExact(emi)}/month
                </p>
              </div>
              <button
                onClick={downloadExcel}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium text-xs transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#F1F5F9", color: "#1B3A6B", border: "1px solid #E2E8F0" }}
              >
                <Download className="w-3.5 h-3.5" />
                Download Excel
              </button>
            </div>

            {/* Column headers — sticky inside scroll */}
            <div className="overflow-x-auto">
              <table
                className="w-full"
                style={{
                  borderCollapse: "collapse",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "#64748B", width: "8%" }}>
                      #
                    </th>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "#64748B" }}>
                      Month
                    </th>
                    <th className="text-right px-5 py-3 font-semibold" style={{ color: "#64748B" }}>
                      EMI
                    </th>
                    <th className="text-right px-5 py-3 font-semibold" style={{ color: "#64748B" }}>
                      Principal
                    </th>
                    <th className="text-right px-5 py-3 font-semibold" style={{ color: "#64748B" }}>
                      Interest
                    </th>
                    <th className="text-right px-5 py-3 font-semibold" style={{ color: "#64748B" }}>
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yearGroups.map((group) => {
                    const isOpen = expandedYears.has(group.year);

                    return (
                      <React.Fragment key={group.year}>
                        {/* Year selector row — click to expand monthly breakdown */}
                        <tr
                          key={`yr-${group.year}`}
                          onClick={() => toggleYear(group.year)}
                          style={{
                            backgroundColor: isOpen ? "#EEF2F8" : "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: isOpen ? "none" : "1px solid #E2E8F0",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <td className="px-5 py-3.5" style={{ color: "#94A3B8" }}>
                            {isOpen
                              ? <ChevronUp className="w-4 h-4" style={{ color: "#1B3A6B" }} />
                              : <ChevronDown className="w-4 h-4" />
                            }
                          </td>
                          <td colSpan={5} className="px-5 py-3.5 font-semibold" style={{ color: "#1B3A6B" }}>
                            {group.year}
                            <span className="ml-2 text-xs font-normal" style={{ color: "#94A3B8" }}>
                              ({group.months.length} months)
                            </span>
                            {!isOpen && (
                              <span className="ml-3 text-xs font-normal" style={{ color: "#B0BEC5" }}>
                                — Click to view monthly breakdown
                              </span>
                            )}
                          </td>
                        </tr>

                        {/* Monthly rows — expand on click */}
                        {isOpen && group.months.map((row, i) => (
                          <tr
                            key={row.month}
                            style={{
                              backgroundColor: i % 2 === 0 ? "#F0FDF4" : "#E6F9EC",
                              borderBottom: "1px solid #D1FAE5",
                            }}
                          >
                            <td className="px-5 py-2.5 text-xs" style={{ color: "#CBD5E1" }}>
                              {row.month}
                            </td>
                            <td className="px-5 py-2.5 font-medium" style={{ color: "#374151" }}>
                              {row.monthName} {group.year}
                            </td>
                            <td className="text-right px-5 py-2.5" style={{ color: "#374151" }}>
                              {fmtINRExact(row.emi)}
                            </td>
                            <td className="text-right px-5 py-2.5" style={{ color: "#374151" }}>
                              {fmtINRExact(row.principal)}
                            </td>
                            <td className="text-right px-5 py-2.5" style={{ color: "#374151" }}>
                              {fmtINRExact(row.interest)}
                            </td>
                            <td className="text-right px-5 py-2.5" style={{ color: "#374151" }}>
                              {fmtINRExact(row.balance)}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>

                {/* Grand total footer */}
                <tfoot>
                  <tr style={{ backgroundColor: "#1B3A6B", borderTop: "2px solid #1B3A6B" }}>
                    <td className="px-5 py-3.5" />
                    <td className="px-5 py-3.5 font-bold text-sm" style={{ color: "white" }}>
                      Total
                    </td>
                    <td className="text-right px-5 py-3.5 font-bold text-sm" style={{ color: "white" }}>
                      {fmtINRExact(emi * tenure * 12)}
                    </td>
                    <td className="text-right px-5 py-3.5 font-bold text-sm" style={{ color: "white" }}>
                      {fmtINRExact(loanAmount)}
                    </td>
                    <td className="text-right px-5 py-3.5 font-bold text-sm" style={{ color: "#C9A84C" }}>
                      {fmtINRExact(totalInterest)}
                    </td>
                    <td className="text-right px-5 py-3.5 font-bold text-sm" style={{ color: "white" }}>
                      ₹0
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
