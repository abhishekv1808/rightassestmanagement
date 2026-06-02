# CLAUDE.md — Right Assets Management Website
> Developer brain file. Read this before touching any file.

---

## 1. PROJECT OVERVIEW

**Client:** Right Assets Management
**Developer:** Abhishek (Solo Freelancer — AVD Studio)
**Project Type:** Full-scale business website — brand-integrated, SEO-optimized, lead-generation focused
**Total Quote:** ₹93,000
**Status:** Active — Build Phase Starting

Right Assets Management is a Bangalore-based multi-vertical firm offering Financial Services, Real Estate Services, and Legal Services under one roof. The website must reflect trust, professionalism, and authority — targeting HNI individuals and businesses in Bangalore.

---

## 2. TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn/UI |
| Database / Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth (admin panel only) |
| Deployment | Vercel |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| SEO | next-sitemap + next-seo |
| Analytics | Vercel Analytics + Google Analytics 4 |


---

## 3. BRAND IDENTITY

### Colors
```
Primary Navy:   #1B3A6B   (headings, navbar, footer, primary buttons)
Gold Accent:    #C9A84C   (highlights, borders, CTA accents, hover states)
Teal Accent:    #0D7E7E   (Real Estate vertical color)
Purple Accent:  #6B46C1   (Legal Services vertical color)
Off-White BG:   #F9F8F5   (page backgrounds)
Dark Text:      #1A1A1A
Muted Text:     #64748B
White:          #FFFFFF
```

### Typography
```
Headings:   Playfair Display (serif) — authority, premium feel
Body:       Inter (sans-serif) — clean, readable
Mono/Tags:  JetBrains Mono — for code-like tags only
```

### Tone of Voice
- Professional, trustworthy, clear
- No jargon dumps — explain services in plain language
- Local Bangalore references where relevant
- Never salesy — always advisory

### Logo Usage
- Navy background: Gold logo
- White background: Navy logo
- Always maintain clear space around logo

---

## 4. SITE ARCHITECTURE & PAGES

### 4.1 Core Pages
```
/                           → Home
/about                      → About Us + Why Right Assets
/contact                    → Contact
/privacy-policy             → Privacy Policy
/terms-of-service           → Terms of Service
/disclaimer                 → Financial Disclaimer
/sitemap.xml                → Auto-generated
```

### 4.2 Financial Services (21 pages)
```
/financial                          → Financial Services Hub
/financial/equity-commodity         → Equity & Commodity Market
/financial/mutual-funds             → Mutual Funds & SIP
/financial/health-insurance         → Health Insurance
/financial/life-insurance           → Life Insurance
/financial/home-loan                → Home Loans
/financial/personal-loan            → Personal Loans
/financial/vehicle-loan             → Vehicle Loans
/financial/fixed-deposits           → Fixed Deposits
/financial/portfolio-management     → Portfolio Management Services
/financial/bonds-ncd                → Bonds & NCDs
/financial/aif                      → Alternate Investment Funds (AIF)
/financial/nps                      → National Pension Scheme (NPS)
/financial/ppf                      → Public Provident Fund (PPF)
/financial/sukanya-samriddhi        → Sukanya Samriddhi Yojana
/financial/atal-pension             → Atal Pension Yojana
/financial/gold-investment          → Gold Investment (SGB, ETF)
/financial/startup-funding          → Startup Funding Advisory
/financial/tax-planning             → Tax Planning & ITR Filing
/financial/credit-score             → Credit Score Improvement
/financial/financial-planning       → Comprehensive Financial Planning
```

### 4.3 Real Estate Services (17 pages)
```
/real-estate                        → Real Estate Hub
/real-estate/buy-sell               → Buy & Sell Properties
/real-estate/sale-deed              → Sale Deed & Agreement to Sell
/real-estate/rent-agreement         → Rent Agreement
/real-estate/e-khatha               → E-Khatha Status & Application
/real-estate/land-conversion        → Land Conversion (Agricultural → Residential)
/real-estate/building-plan          → Building Plan Approval
/real-estate/encumbrance            → Encumbrance Certificate (EC)
/real-estate/rtc-pahani             → RTC / Pahani Records
/real-estate/mutation               → Property Mutation
/real-estate/vamshavruksha          → Vamshavruksha (Family Tree Document)
/real-estate/property-valuation     → Property Valuation
/real-estate/property-tax           → Property Tax Services
/real-estate/noc                    → NOC for Property
/real-estate/power-of-attorney      → Power of Attorney (Property)
/real-estate/joint-development      → Joint Development Agreement
/real-estate/home-loan-property     → Home Loan Against Property
/real-estate/property-registration  → Property Registration Assistance
```

### 4.4 Legal Services (8 pages)
```
/legal                              → Legal Services Hub
/legal/property-disputes            → Property Disputes (Civil)
/legal/criminal-advisory            → Criminal Case Advisory
/legal/family-cases                 → Family Case Support (Divorce, Maintenance)
/legal/labour-cases                 → Labour Case Help
/legal/insurance-claims             → Insurance Claim Cases
/legal/banking-cases                → Banking & Financial Case Advisory
/legal/cyber-crime                  → Cyber Crime Cases
/legal/consumer-cases               → Consumer Dispute Cases
```

### 4.5 Interactive Tools (5 pages)
```
/tools/sip-calculator               → SIP Returns Calculator
/tools/emi-calculator               → Home/Personal Loan EMI Calculator
/tools/fd-calculator                → FD Maturity Calculator
/tools/insurance-premium            → Insurance Premium Estimator
/tools/rent-yield                   → Rental Yield Calculator
```

### 4.6 Blog / SEO Articles (5 initial)
```
/blog                               → Blog Index
/blog/ekhattha-bangalore-guide      → How to Get E-Khatha in Bangalore
/blog/sip-vs-lumpsum                → SIP vs Lump Sum: Which is Better?
/blog/property-registration-cost    → Property Registration Cost in Bangalore 2025
/blog/cyber-crime-complaint         → How to File a Cyber Crime Complaint in India
/blog/home-loan-guide               → Complete Home Loan Guide for First-Time Buyers
```

---

## 5. PAGE-BY-PAGE CONTENT GUIDE

### 5.1 Home Page (/)

**Hero Section**
- Headline: "Your Trusted Partner for Financial, Real Estate & Legal Services in Bangalore"
- Subheadline: "One destination for 48+ expert services — investments, property, and legal help under one roof."
- CTA buttons: "Book a Free Consultation" (primary) | "Explore Services" (secondary)
- Background: Dark navy gradient with subtle gold geometric pattern overlay

**Services Overview Strip**
- 3 cards: Financial Services | Real Estate | Legal Services
- Each card: icon, vertical name, short description, "Explore →" link

**Stats Bar**
- 48+ Services | 500+ Clients Served | 10+ Years Experience | Pan Bangalore Coverage

**Why Right Assets**
- 3 columns: Expert Guidance | End-to-End Support | Transparent Process

**Featured Services** (6 service cards, 2 from each vertical)

**Interactive Tools Teaser**
- "Try our free financial calculators" — link to /tools

**Testimonials** (3–4 client testimonials, carousel on mobile)

**Lead CTA Section**
- "Ready to take control of your finances and property? Let's talk."
- WhatsApp button + Lead enquiry form

**Footer**
- Logo, tagline, all service links, contact details, social links

---

### 5.2 About Page (/about)

**Section 1 — Who We Are**
- Paragraph: Right Assets Management was founded with a single mission — to make financial planning, real estate transactions, and legal support accessible, transparent, and reliable for every Bangalorean. We bring together expertise across three critical areas of life under one roof, so you never have to coordinate between multiple advisors.

**Section 2 — Our Three Verticals**
- Financial: From SIPs to portfolio management, insurance to loans — we are your complete financial guide.
- Real Estate: Buying, selling, legal documentation, government records — we handle all of it.
- Legal: Property disputes, family cases, cyber crime — expert legal advisory without the confusion.

**Section 3 — Why Choose Right Assets**
- 48+ Services Under One Roof
- Transparent fee structure
- End-to-end execution support
- Serving clients across all of Bangalore

**Section 4 — Our Promise**
- "We don't just advise — we execute. From the first consultation to the final outcome, we stay with you."

---

### 5.3 Service Page Template (all 48 service pages use this structure)

```
1. Hero: Service Name + 1-line description + CTA button
2. What is [Service]? — Plain language explanation (2–3 paragraphs)
3. Who is this for? — Target audience bullets
4. What we do — Step-by-step process (numbered list)
5. Benefits of choosing Right Assets for this service
6. Documents required (if applicable — loans, real estate, legal)
7. FAQs (3–5 questions)
8. CTA: Book a Consultation / WhatsApp us
9. Related services (3 cards)
```

---

### 5.4 Contact Page (/contact)

**Left Column**
- Heading: "Let's Talk"
- Address: Bangalore (exact address from client)
- Phone: (from client)
- Email: (from client)
- WhatsApp CTA button
- Google Maps embed

**Right Column — Lead Form (saved to Supabase)**
```
Fields:
- Full Name *
- Phone Number *
- Email
- Service Interested In (dropdown — all 48 services)
- Message
- How did you hear about us? (Google | Referral | Social Media | Other)
- Submit button
```

---

---

## 6. SUPABASE SCHEMA

### Table: leads
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_interested TEXT,
  message TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new'   -- new | contacted | converted | closed
);
```

### Table: blog_posts
```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: testimonials
```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  service TEXT,
  rating INT DEFAULT 5,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. FOLDER STRUCTURE

```
right-asset-management/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Home
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── financial/
│   │   │   ├── page.tsx                # Financial Hub
│   │   │   └── [service]/page.tsx      # Dynamic service pages
│   │   ├── real-estate/
│   │   │   ├── page.tsx
│   │   │   └── [service]/page.tsx
│   │   ├── legal/
│   │   │   ├── page.tsx
│   │   │   └── [service]/page.tsx
│   │   ├── tools/
│   │   │   └── [tool]/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             # Shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── StatsBar.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTASection.tsx
│   ├── service/
│   │   ├── ServiceHero.tsx
│   │   ├── ServiceProcess.tsx
│   │   ├── ServiceFAQ.tsx
│   │   └── RelatedServices.tsx
│   └── forms/
│       └── LeadForm.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── services-data.ts                # All 48 services content
│   └── utils.ts
├── public/
│   ├── logo.svg
│   ├── logo-dark.svg
│   └── og-image.png
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── CLAUDE.md                           # ← this file
└── package.json
```

---

## 8. SERVICES DATA STRUCTURE

All 48 service pages are driven by a single `lib/services-data.ts` file. Structure:

```typescript
export type Service = {
  slug: string;
  title: string;
  vertical: "financial" | "real-estate" | "legal";
  tagline: string;
  description: string;           // 2–3 paragraph plain-language explanation
  whoIsItFor: string[];          // bullet points
  process: { step: number; title: string; description: string }[];
  benefits: string[];
  documentsRequired?: string[];  // for applicable services
  faqs: { question: string; answer: string }[];
  relatedServices: string[];     // slugs of 3 related services
  metaTitle: string;
  metaDescription: string;
};

export const allServices: Service[] = [ ... ];
```

This allows a single `[service]/page.tsx` to render all 48 pages from data — clean, scalable, SEO-friendly.

---

## 9. SEO STRATEGY

- Every service page: unique `<title>`, `<meta description>`, `<h1>`
- Schema markup: `LocalBusiness`, `Service`, `FAQPage` on all service pages
- Dynamic sitemap via `next-sitemap`
- OG images for all major pages
- Target keywords pattern: `"[service name] in Bangalore"` — e.g., "mutual fund advisor in Bangalore", "property registration Bangalore", "cyber crime lawyer Bangalore"
- Blog: 5 SEO articles at launch, targeting high-intent local queries
- Google Search Console + Analytics setup on deployment

---

## 10. KEY COMPONENTS TO BUILD FIRST

Build in this order:

1. `Navbar.tsx` — sticky, mobile-responsive, mega menu for 3 verticals
2. `Footer.tsx` — full link map, contact details, social
3. `LeadForm.tsx` — connects to Supabase `leads` table
4. `Home page` — all sections
5. `ServicesData.ts` — populate all 48 services
6. `[service]/page.tsx` — dynamic template
7. `Financial/Real Estate/Legal hub pages`
8. `Tools pages` — calculators
9. `Contact page` with map embed
10. `Blog pages`
11. `SEO setup` — sitemap, meta, schema

---

## 11. ENV VARIABLES

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Analytics
NEXT_PUBLIC_GA_ID=

# Site
NEXT_PUBLIC_SITE_URL=https://rightasset.in
```

---

## 12. DEPLOYMENT

- **Platform:** Vercel
- **Domain:** (confirm with client — likely rightassetmanagement.in or rightasset.in)
- **Build command:** `next build`
- **Preview:** Vercel preview URLs for each PR
- **Post-launch:** Set up Vercel Analytics, connect Google Search Console

---

## 13. DO NOT

- Do not use WordPress or any template-based builder
- Do not use `pages/` router — use `app/` router only
- Do not hardcode service content inside page components — always use `services-data.ts`
- Do not skip TypeScript types — every component must be typed
- Do not use inline styles — Tailwind only
- Do not deploy without testing lead form → Supabase connection
- Do not go live without `robots.txt`, `sitemap.xml`, and OG images

---

## 14. CLIENT CONTACTS & REFERENCES

- **Client Name:** (confirm with client before adding)
- **WhatsApp:** (confirm)
- **Email:** (confirm)
- **Reference Doc:** Proposal PDF (AVD202688 series)
- **Total Deliverables:** Branding + Collaterals + Social Media Setup + Website (80+ pages)
- **Website Scope:** ₹70,000 of the ₹93,000 total

---

*Last updated: May 2026 | Developer: Abhishek (AVD Studio)*
