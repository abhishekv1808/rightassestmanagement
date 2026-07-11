export type Resource = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: "financial" | "real-estate" | "legal";
  pages: number;
  highlights: string[];
  forWhom: string;
  color: string;
  lightBg: string;
  downloadPath: string;
  metaTitle: string;
  metaDescription: string;
};

export const ALL_RESOURCES: Resource[] = [
  {
    slug: "sip-starter-kit",
    title: "SIP Starter Kit",
    subtitle: "Begin your wealth journey with ₹500/month",
    description:
      "This 12-page guide strips away the complexity of mutual fund investing and shows you exactly how to start a SIP today — even with just ₹500 a month. You will see real rupee examples of how compounding works over time, and leave with a clear action plan to open your first SIP account.",
    category: "financial",
    pages: 12,
    highlights: [
      "How SIP compounding works with real ₹ examples",
      "5 beginner-friendly mutual fund categories explained",
      "Step-by-step: open a SIP account in 20 minutes",
      "SIP vs FD: 10-year wealth comparison chart",
    ],
    forWhom: "Salaried professionals starting their investment journey",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    downloadPath: "/downloads/sip-starter-kit.pdf",
    metaTitle: "SIP Starter Kit — Free Guide | Right Assets Management",
    metaDescription:
      "Download our free 12-page SIP Starter Kit to learn how mutual fund SIPs work, how compounding builds wealth, and how to start investing in 20 minutes.",
  },
  {
    slug: "home-loan-guide",
    title: "Home Loan Buyer's Guide",
    subtitle: "Everything first-time buyers need to know before applying",
    description:
      "Applying for a home loan without preparation can cost you lakhs in avoidable interest and rejected applications. This 16-page guide walks you through how banks calculate your eligibility, what documents you need to keep ready, how to compare lenders beyond the headline rate, and exactly which tax deductions you can claim after disbursement.",
    category: "financial",
    pages: 16,
    highlights: [
      "Eligibility calculator: how banks decide your loan amount",
      "Complete document checklist (salaried vs self-employed)",
      "How to compare lenders beyond just the interest rate",
      "Tax benefits: Section 24, 80C, and 80EE explained",
    ],
    forWhom: "First-time home buyers planning to apply for a loan",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    downloadPath: "/downloads/home-loan-guide.pdf",
    metaTitle: "Home Loan Buyer's Guide — Free Download | Right Assets Management",
    metaDescription:
      "Free 16-page home loan guide for first-time buyers across India. Covers eligibility, document checklist, lender comparison, and tax benefits.",
  },
  {
    slug: "property-registration-checklist",
    title: "Property Registration Checklist",
    subtitle: "Step-by-step guide for India property buyers",
    description:
      "Property registration across India involves stamp duty, SRO appointments, and a stack of documents that can overwhelm any first-time buyer. This 10-page checklist walks you through every step — from document preparation to post-registration follow-up — with 2025-updated stamp duty rates for Karnataka so there are no surprises on registration day.",
    category: "real-estate",
    pages: 10,
    highlights: [
      "Complete document checklist for buyer and seller",
      "Stamp duty rates for Karnataka (2025 updated)",
      "How to book your SRO appointment on Kaveri Online",
      "5 common registration mistakes that cause delays",
    ],
    forWhom: "Anyone buying or selling property across India",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    downloadPath: "/downloads/property-registration-checklist.pdf",
    metaTitle: "Property Registration Checklist India 2025 — Free Guide | Right Assets Management",
    metaDescription:
      "Free 10-page property registration checklist for India with 2025 stamp duty rates, document requirements, and SRO appointment booking steps.",
  },
  {
    slug: "khata-certificate-guide",
    title: "Khata Certificate Application Guide",
    subtitle: "Get your India property Khatha without the run-around",
    description:
      "Khatha is mandatory for property tax payment, construction approvals, and most property transactions across India — yet getting it can feel like a maze. This 8-page guide explains the difference between BBMP and Gram Panchayat Khatha, walks through the online application process step by step, and tells you exactly how to handle rejection notices.",
    category: "real-estate",
    pages: 8,
    highlights: [
      "BBMP vs Gram Panchayat Khatha — key differences",
      "Online application walkthrough with screenshots guide",
      "Documents required for new vs transfer applications",
      "How to handle rejection notices and appeals",
    ],
    forWhom:
      "India property owners needing Khatha for transactions or tax payment",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    downloadPath: "/downloads/khata-certificate-guide.pdf",
    metaTitle: "Khata Certificate Application Guide India — Free Download | Right Assets Management",
    metaDescription:
      "Free 8-page guide to applying for Khata Certificate across India. Covers BBMP vs Gram Panchayat Khatha, online process, documents, and handling rejections.",
  },
  {
    slug: "tax-saving-guide",
    title: "Tax Saving Guide 2025–26",
    subtitle: "Legally reduce your tax burden before March 31st",
    description:
      "With the choice between the new and old tax regimes now permanent, picking the wrong regime can cost you tens of thousands every year. This 18-page guide compares both regimes with real salary examples, ranks every 80C investment by returns and lock-in period, and gives you a pre-March filing checklist so you never scramble at the last minute.",
    category: "financial",
    pages: 18,
    highlights: [
      "New regime vs Old regime: which saves you more money",
      "All 80C investments ranked by returns and lock-in",
      "HRA, home loan, NPS — maximising every deduction",
      "ITR filing checklist so you never miss a deadline",
    ],
    forWhom:
      "Salaried employees and self-employed professionals planning tax savings",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    downloadPath: "/downloads/tax-saving-guide.pdf",
    metaTitle: "Tax Saving Guide 2025–26 — Free Download | Right Assets Management",
    metaDescription:
      "Free 18-page tax saving guide for 2025–26. Compare new vs old tax regime, maximise 80C deductions, and file your ITR without missing a deadline.",
  },
  {
    slug: "property-due-diligence",
    title: "Before You Buy: Property Checklist",
    subtitle: "50-point due diligence before buying any property",
    description:
      "Buying property without proper due diligence is one of the most expensive mistakes you can make. This 14-page checklist gives you a 50-point framework to verify title documents, check for encumbrances, assess builder credibility on RERA Karnataka, and spot the red flags that signal a disputed or fraudulent property before you sign anything.",
    category: "real-estate",
    pages: 14,
    highlights: [
      "Title search: how to trace ownership back 30 years",
      "Encumbrance certificate — what to look for",
      "Builder due diligence using RERA Karnataka portal",
      "Red flags that signal a fraudulent or disputed property",
    ],
    forWhom:
      "Home buyers doing their own research before making an offer",
    color: "#0D7E7E",
    lightBg: "#E6F4F4",
    downloadPath: "/downloads/property-due-diligence.pdf",
    metaTitle: "Property Due Diligence Checklist India — Free Guide | Right Assets Management",
    metaDescription:
      "Free 14-page property due diligence checklist. Covers title search, encumbrance certificates, RERA verification, and fraud red flags for India buyers.",
  },
  {
    slug: "insurance-planning-starter",
    title: "Insurance Planning Starter",
    subtitle: "How much cover do you actually need?",
    description:
      "Most people in India are either underinsured or paying for the wrong kind of cover. This 10-page guide gives you a simple formula to calculate the right term life and health insurance cover for your household, compares individual versus family floater plans, and shows you exactly what to do if your insurer rejects a claim.",
    category: "financial",
    pages: 10,
    highlights: [
      "Term life cover formula: salary × years × dependants",
      "Health insurance: individual vs family floater comparison",
      "Top 5 mistakes people make when buying insurance",
      "Claims guide: what to do when the insurer rejects your claim",
    ],
    forWhom:
      "Young professionals and families building their insurance safety net",
    color: "#1B3A6B",
    lightBg: "#EEF2F8",
    downloadPath: "/downloads/insurance-planning-starter.pdf",
    metaTitle: "Insurance Planning Starter Guide — Free Download | Right Assets Management",
    metaDescription:
      "Free 10-page insurance planning guide. Learn how much term life and health cover you need, avoid common mistakes, and handle claim rejections.",
  },
  {
    slug: "tenant-landlord-guide",
    title: "Tenant & Landlord Rights Guide",
    subtitle: "Know your legal rights before signing any rent agreement",
    description:
      "Disputes between tenants and landlords across India most often arise from one thing: a poorly drafted or misunderstood rent agreement. This 12-page guide explains the legal difference between a registered and a notarised agreement, outlines Karnataka Rent Act rules on security deposits and rent increases, and tells you the exact legal process to follow if things go wrong.",
    category: "legal",
    pages: 12,
    highlights: [
      "Registered vs notarised agreement — the critical difference",
      "Security deposit rules under Karnataka Rent Act",
      "Legal process if landlord refuses to return deposit",
      "Rent increase limits and proper notice procedures",
    ],
    forWhom:
      "Tenants and landlords across India navigating rental agreements",
    color: "#6B46C1",
    lightBg: "#F0EBF9",
    downloadPath: "/downloads/tenant-landlord-guide.pdf",
    metaTitle: "Tenant & Landlord Rights Guide India — Free Download | Right Assets Management",
    metaDescription:
      "Free 12-page guide to tenant and landlord rights across India under the Karnataka Rent Act. Covers rent agreements, security deposits, and legal remedies.",
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return ALL_RESOURCES.find((r) => r.slug === slug);
}
