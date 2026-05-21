"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Download, ChevronDown, ChevronUp, Table2 } from "lucide-react";
import { SliderInput } from "@/components/tools/SliderInput";

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
  const [showTable, setShowTable] = useState(false);
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("yearly");

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

    return { emi, totalPayable, totalInterest: totalPayable - loanAmount, schedule: rows };
  }, [loanAmount, rate, tenure]);

  const principalPct = Math.round((loanAmount / totalPayable) * 100);
  const interestPct = 100 - principalPct;

  // Yearly aggregation
  const yearlySchedule = useMemo(() => {
    const years: {
      year: number;
      emi: number;
      principal: number;
      interest: number;
      balance: number;
      totalPrincipal: number;
      totalInterest: number;
    }[] = [];

    for (let y = 0; y < tenure; y++) {
      const start = y * 12;
      const end = Math.min(start + 12, schedule.length);
      const slice = schedule.slice(start, end);
      if (slice.length === 0) break;
      const last = slice[slice.length - 1];
      years.push({
        year: y + 1,
        emi: slice.reduce((s, r) => s + r.emi, 0),
        principal: slice.reduce((s, r) => s + r.principal, 0),
        interest: slice.reduce((s, r) => s + r.interest, 0),
        balance: last.balance,
        totalPrincipal: last.totalPrincipal,
        totalInterest: last.totalInterest,
      });
    }
    return years;
  }, [schedule, tenure]);

  // Excel download
  const downloadExcel = useCallback(async () => {
    const XLSX = await import("xlsx");
    const wsData = [
      ["Loan Amortization Schedule — Right Asset Management"],
      [`Loan Amount: ${fmtINR(loanAmount)}`, `Interest Rate: ${rate.toFixed(1)}%`, `Tenure: ${tenure} years`, `Monthly EMI: ${fmtINRExact(emi)}`],
      [],
      ["Month", "EMI (₹)", "Principal (₹)", "Interest (₹)", "Balance (₹)", "Cumulative Principal (₹)", "Cumulative Interest (₹)"],
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
      ["Total", Math.round(emi * tenure * 12), Math.round(loanAmount), Math.round(totalInterest), 0, "", ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws["!cols"] = [
      { wch: 8 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 22 }, { wch: 22 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Amortization");
    XLSX.writeFile(wb, `Loan_Amortization_${fmtINR(loanAmount)}_${rate}pct_${tenure}yrs.xlsx`);
  }, [schedule, loanAmount, rate, tenure, emi, totalInterest]);

  const displayRows = viewMode === "yearly" ? yearlySchedule : schedule;

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Inputs ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>
              <h2 className="font-heading font-bold text-xl mb-7" style={{ color: "#1B3A6B" }}>
                Enter Loan Details
              </h2>
              <div className="space-y-8">
                <SliderInput
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={100000} max={50000000} step={100000}
                  display={fmtINR(loanAmount)}
                  minLabel="₹1 L"
                  maxLabel="₹5 Cr"
                />
                <SliderInput
                  label="Annual Interest Rate"
                  value={rate}
                  onChange={setRate}
                  min={5} max={25} step={0.1}
                  display={`${rate.toFixed(1)}%`}
                  minLabel="5%"
                  maxLabel="25%"
                />
                <SliderInput
                  label="Loan Tenure"
                  value={tenure}
                  onChange={setTenure}
                  min={1} max={30} step={1}
                  display={`${tenure} yr${tenure > 1 ? "s" : ""}`}
                  minLabel="1 yr"
                  maxLabel="30 yrs"
                />
              </div>

              <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#1B3A6B" }}>Formula Used</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>
                  EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ − 1] — where P = principal, r = monthly rate,
                  n = tenure in months. Calculated on reducing balance method.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ backgroundColor: "#1B3A6B" }} className="px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Monthly EMI
                </p>
                <p className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  {fmtINR(emi)}
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  For {tenure} years at {rate.toFixed(1)}% p.a.
                </p>
              </div>

              <div className="bg-white px-7 py-6 space-y-5">
                {/* Breakdown bar */}
                <div>
                  <div className="flex rounded-full overflow-hidden h-3 mb-2.5">
                    <div style={{ width: `${principalPct}%`, backgroundColor: "#1B3A6B", transition: "width 0.4s ease" }} />
                    <div style={{ width: `${interestPct}%`, backgroundColor: "#C9A84C", transition: "width 0.4s ease" }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#1B3A6B" }} />
                      Principal ({principalPct}%)
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: "#6B7280" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: "#C9A84C" }} />
                      Interest ({interestPct}%)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#EEF2F8" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Principal Amount</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>{fmtINR(loanAmount)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "#FBF5E6" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Total Interest</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#C9A84C" }}>{fmtINR(totalInterest)}</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-xl" style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}>
                    <p className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Total Amount Payable</p>
                    <p className="font-heading font-bold text-sm" style={{ color: "#1A1A1A" }}>{fmtINR(totalPayable)}</p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
                  Actual EMI may vary by lender. Get the best rates from our advisors.
                </p>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#C9A84C", color: "#1A1A1A" }}
                >
                  Get Best Loan Rates — Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919999999999"
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

        {/* ── Amortization Table ─────────────────────────────────────── */}
        <div className="mt-12">
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}
          >
            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-8 py-5"
              style={{ borderBottom: "1px solid #E5E7EB" }}
            >
              <button
                onClick={() => setShowTable(!showTable)}
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#EEF2F8" }}
                >
                  <Table2 className="w-5 h-5" style={{ color: "#1B3A6B" }} />
                </div>
                <div className="text-left">
                  <h3 className="font-heading font-bold text-base" style={{ color: "#1B3A6B" }}>
                    Amortization Schedule
                  </h3>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    {tenure * 12} months · {fmtINRExact(emi)}/month
                  </p>
                </div>
                {showTable ? (
                  <ChevronUp className="w-5 h-5 ml-1" style={{ color: "#9CA3AF" }} />
                ) : (
                  <ChevronDown className="w-5 h-5 ml-1" style={{ color: "#9CA3AF" }} />
                )}
              </button>

              <div className="flex items-center gap-3">
                {/* View toggle */}
                {showTable && (
                  <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
                    <button
                      onClick={() => setViewMode("yearly")}
                      className="px-4 py-2 text-xs font-semibold transition-all"
                      style={viewMode === "yearly"
                        ? { backgroundColor: "#1B3A6B", color: "white" }
                        : { backgroundColor: "white", color: "#6B7280" }
                      }
                    >
                      Yearly
                    </button>
                    <button
                      onClick={() => setViewMode("monthly")}
                      className="px-4 py-2 text-xs font-semibold transition-all"
                      style={viewMode === "monthly"
                        ? { backgroundColor: "#1B3A6B", color: "white" }
                        : { backgroundColor: "white", color: "#6B7280" }
                      }
                    >
                      Monthly
                    </button>
                  </div>
                )}

                {/* Download button */}
                <button
                  onClick={downloadExcel}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#059669", color: "white" }}
                >
                  <Download className="w-4 h-4" />
                  Download Excel
                </button>
              </div>
            </div>

            {/* Table */}
            {showTable && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F1F5F9" }}>
                      <th className="text-left px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#1B3A6B" }}>
                        {viewMode === "yearly" ? "Year" : "Month"}
                      </th>
                      <th className="text-right px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#1B3A6B" }}>
                        EMI Paid
                      </th>
                      <th className="text-right px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#1B3A6B" }}>
                        Principal
                      </th>
                      <th className="text-right px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#1B3A6B" }}>
                        Interest
                      </th>
                      <th className="text-right px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#1B3A6B" }}>
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayRows.map((row, idx) => {
                      const period = viewMode === "yearly" ? (row as typeof yearlySchedule[0]).year : (row as AmortRow).month;
                      const principalRatio = row.principal / row.emi;
                      return (
                        <tr
                          key={period}
                          style={{
                            backgroundColor: idx % 2 === 0 ? "white" : "#FAFBFC",
                            borderBottom: "1px solid #F1F5F9",
                          }}
                        >
                          <td className="px-4 sm:px-6 py-3.5">
                            <span className="font-heading font-bold text-sm" style={{ color: "#1B3A6B" }}>
                              {viewMode === "yearly" ? `Year ${period}` : period}
                            </span>
                          </td>
                          <td className="text-right px-4 sm:px-6 py-3.5 font-medium" style={{ color: "#374151" }}>
                            {fmtINRExact(row.emi)}
                          </td>
                          <td className="text-right px-4 sm:px-6 py-3.5">
                            <div className="inline-flex flex-col items-end gap-1">
                              <span className="font-semibold" style={{ color: "#1B3A6B" }}>
                                {fmtINRExact(row.principal)}
                              </span>
                              {/* Mini progress bar */}
                              <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${Math.round(principalRatio * 100)}%`,
                                    backgroundColor: "#1B3A6B",
                                    transition: "width 0.3s ease",
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="text-right px-4 sm:px-6 py-3.5 font-medium" style={{ color: "#C9A84C" }}>
                            {fmtINRExact(row.interest)}
                          </td>
                          <td className="text-right px-4 sm:px-6 py-3.5 font-medium" style={{ color: "#6B7280" }}>
                            {fmtINRExact(row.balance)}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Totals row */}
                    <tr style={{ backgroundColor: "#1B3A6B" }}>
                      <td className="px-4 sm:px-6 py-4 font-heading font-bold text-sm text-white">
                        Total
                      </td>
                      <td className="text-right px-4 sm:px-6 py-4 font-bold text-sm text-white">
                        {fmtINRExact(totalPayable)}
                      </td>
                      <td className="text-right px-4 sm:px-6 py-4 font-bold text-sm" style={{ color: "#93C5FD" }}>
                        {fmtINRExact(loanAmount)}
                      </td>
                      <td className="text-right px-4 sm:px-6 py-4 font-bold text-sm" style={{ color: "#C9A84C" }}>
                        {fmtINRExact(totalInterest)}
                      </td>
                      <td className="text-right px-4 sm:px-6 py-4 font-bold text-sm text-white">
                        ₹0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Collapsed hint */}
            {!showTable && (
              <div className="px-6 sm:px-8 py-4 text-center">
                <p className="text-xs" style={{ color: "#9CA3AF" }}>
                  Click above to view the full month-by-month breakdown of your loan repayment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
