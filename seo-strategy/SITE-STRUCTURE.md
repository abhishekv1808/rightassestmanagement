# Right Assets Management — Site Structure & URL Architecture
> Information Architecture + Internal Linking Map
> Prepared: May 2026

---

## URL Hierarchy (Full Map)

```
https://rightasset.in/
│
├── /                                    → Home (pillar: all 3 verticals)
├── /about                               → About Us
├── /contact                             → Contact + Lead Form
├── /privacy-policy
├── /terms-of-service
├── /disclaimer                          → Financial Disclaimer (SEBI requirement)
│
├── /financial/                          ← Financial Services HUB
│   ├── /financial/equity-commodity      → Equity & Commodity Market
│   ├── /financial/mutual-funds          → Mutual Funds & SIP ★
│   ├── /financial/health-insurance      → Health Insurance ★
│   ├── /financial/life-insurance        → Life Insurance
│   ├── /financial/home-loan            → Home Loans ★
│   ├── /financial/personal-loan         → Personal Loans
│   ├── /financial/vehicle-loan          → Vehicle Loans
│   ├── /financial/fixed-deposits        → Fixed Deposits
│   ├── /financial/portfolio-management  → Portfolio Management Services ★
│   ├── /financial/bonds-ncd            → Bonds & NCDs
│   ├── /financial/aif                   → Alternate Investment Funds ★
│   ├── /financial/nps                   → National Pension Scheme
│   ├── /financial/ppf                   → Public Provident Fund
│   ├── /financial/sukanya-samriddhi     → Sukanya Samriddhi Yojana
│   ├── /financial/atal-pension          → Atal Pension Yojana
│   ├── /financial/gold-investment       → Gold Investment (SGB, ETF)
│   ├── /financial/startup-funding       → Startup Funding Advisory ★
│   ├── /financial/tax-planning          → Tax Planning & ITR Filing ★
│   ├── /financial/credit-score          → Credit Score Improvement
│   └── /financial/financial-planning    → Comprehensive Financial Planning ★
│
├── /real-estate/                        ← Real Estate Services HUB
│   ├── /real-estate/buy-sell            → Buy & Sell Properties ★
│   ├── /real-estate/sale-deed           → Sale Deed & Agreement to Sell
│   ├── /real-estate/rent-agreement      → Rent Agreement
│   ├── /real-estate/e-khatha            → E-Khatha Status & Application ★
│   ├── /real-estate/land-conversion     → Land Conversion ★
│   ├── /real-estate/building-plan       → Building Plan Approval ★
│   ├── /real-estate/encumbrance         → Encumbrance Certificate ★
│   ├── /real-estate/rtc-pahani          → RTC / Pahani Records ★
│   ├── /real-estate/mutation            → Property Mutation ★
│   ├── /real-estate/vamshavruksha       → Vamshavruksha Document
│   ├── /real-estate/property-valuation  → Property Valuation
│   ├── /real-estate/property-tax        → Property Tax Services
│   ├── /real-estate/noc                 → NOC for Property
│   ├── /real-estate/power-of-attorney   → Power of Attorney (Property)
│   ├── /real-estate/joint-development   → Joint Development Agreement
│   ├── /real-estate/home-loan-property  → Home Loan Against Property
│   └── /real-estate/property-registration → Property Registration ★
│
├── /legal/                              ← Legal Services HUB
│   ├── /legal/property-disputes         → Property Disputes ★
│   ├── /legal/criminal-advisory         → Criminal Case Advisory
│   ├── /legal/family-cases             → Family Case Support ★
│   ├── /legal/labour-cases             → Labour Case Help ★
│   ├── /legal/insurance-claims         → Insurance Claim Cases
│   ├── /legal/banking-cases            → Banking & Financial Cases
│   ├── /legal/cyber-crime              → Cyber Crime Cases ★
│   └── /legal/consumer-cases           → Consumer Dispute Cases
│
├── /tools/
│   ├── /tools/sip-calculator            → SIP Returns Calculator
│   ├── /tools/emi-calculator            → EMI Calculator
│   ├── /tools/fd-calculator             → FD Maturity Calculator
│   ├── /tools/insurance-premium         → Insurance Premium Estimator
│   └── /tools/rent-yield               → Rental Yield Calculator
│
└── /blog/                               ← Blog Hub
    ├── /blog/ekhattha-bangalore-guide
    ├── /blog/sip-vs-lumpsum
    ├── /blog/property-registration-cost
    ├── /blog/cyber-crime-complaint
    ├── /blog/home-loan-guide
    └── [20+ future posts]
```

★ = Priority pages for SEO. Ensure complete content and schema at launch.

---

## Internal Linking Architecture

### Pillar-to-Cluster Model

Each hub page (Financial, Real Estate, Legal) is a **pillar page** that:
1. Links to all its child service pages
2. Is linked from every child service page in "Back to [Vertical] Services" breadcrumb
3. Is linked from the homepage hero/services section

```
Homepage
  ↓ (3 cards)
Financial Hub → 20 service pages
Real Estate Hub → 17 service pages
Legal Hub → 8 service pages
```

### Cross-Vertical Linking (High Priority)

These cross-links reflect real client journeys and strengthen topical authority:

| Source Page | Should Link To | Why |
|-------------|---------------|-----|
| Home Loan page | Property Registration page | Client needs both |
| Property Registration page | Sale Deed page | Sequential process |
| Property Registration page | Property Disputes (Legal) | Risk awareness |
| E-Khatha page | Encumbrance Certificate page | Related documents |
| Mutual Funds page | Tax Planning page | Tax saving investment |
| Tax Planning page | PPF / NPS / ELSS pages | Section 80C instruments |
| AIF page | Portfolio Management page | HNI journey |
| Family Cases (Legal) page | Property Disputes (Legal) | Related cases |
| Insurance Claims (Legal) | Health/Life Insurance (Financial) | Cross-vertical journey |
| Startup Funding page | Tax Planning page | Startup tax needs |

### Blog-to-Service Linking (Every Blog Post)

Every blog post must contain 2–3 links to service pages:

| Blog Post | Links To |
|-----------|---------|
| E-Khatha guide | /real-estate/e-khatha, /real-estate/property-registration |
| SIP vs Lump Sum | /financial/mutual-funds, /tools/sip-calculator |
| Property Registration cost | /real-estate/property-registration, /real-estate/sale-deed |
| Cyber Crime guide | /legal/cyber-crime, /contact |
| Home Loan guide | /financial/home-loan, /tools/emi-calculator |

### Footer Links (All Pages)

Footer must link to all 45+ service pages grouped by vertical. This ensures:
- Every page is max 2 clicks from homepage
- Google can crawl all pages from any entry point
- Strong internal link equity to all service pages

---

## Breadcrumb Structure

All interior pages must show breadcrumbs (schema + visual):

```
Home > Financial Services > Mutual Funds & SIP
Home > Real Estate Services > E-Khatha Bangalore
Home > Legal Services > Cyber Crime Cases
Home > Blog > How to Get E-Khatha in Bangalore
Home > Tools > SIP Calculator
```

Implement with `BreadcrumbList` JSON-LD schema matching the visual breadcrumb.

---

## Page Priority Matrix

### P0 — Must be perfect at launch
- Homepage `/`
- Financial Hub `/financial`
- Real Estate Hub `/real-estate`
- Legal Hub `/legal`
- Contact `/contact`
- Disclaimer `/disclaimer`

### P1 — Top 10 service pages (Tier 1 keyword targets)
- `/financial/mutual-funds`
- `/financial/home-loan`
- `/financial/tax-planning`
- `/financial/financial-planning`
- `/real-estate/e-khatha`
- `/real-estate/property-registration`
- `/real-estate/encumbrance`
- `/legal/cyber-crime`
- `/legal/property-disputes`
- `/legal/family-cases`

### P2 — Remaining service pages (must be complete but can iterate)
All other 36 service pages — complete at launch but can improve over time.

### P3 — Blog (grows over time)
5 posts at launch, 2–4 new posts per month thereafter.

---

## URL Best Practices

All URLs follow these conventions:
- All lowercase: `/real-estate/e-khatha` not `/Real-Estate/E-Khatha`
- Hyphens for word separation: `/mutual-funds` not `/mutual_funds`
- No trailing slash (configured in Next.js)
- No query parameters in canonical URLs
- Maximum 3 URL depth: `/vertical/service` — never go deeper than `/vertical/sub/page`

---

## Sitemap Priority Values (next-sitemap config)

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://rightasset.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/financial': 0.9,
      '/real-estate': 0.9,
      '/legal': 0.9,
      '/about': 0.8,
      '/contact': 0.8,
      '/blog': 0.8,
    };
    const isServicePage = 
      path.startsWith('/financial/') || 
      path.startsWith('/real-estate/') || 
      path.startsWith('/legal/');
    const isBlogPost = path.startsWith('/blog/');
    const isTool = path.startsWith('/tools/');
    
    return {
      loc: path,
      changefreq: isBlogPost ? 'monthly' : 'weekly',
      priority: priorities[path] || (isServicePage ? 0.8 : isTool ? 0.6 : 0.5),
      lastmod: new Date().toISOString(),
    };
  },
};
```

---

*Site structure is locked for launch. Do not add new top-level routes without updating this document and sitemap config.*
