# Right Assets Management — SEO Implementation Roadmap
> Phased Action Plan: Launch to Month 12
> Prepared: May 2026

---

## Phase 1 — Foundation (Weeks 1–4)
**Goal:** Get indexed, establish technical correctness, launch with full on-page SEO.

### Week 1: Technical Setup

- [ ] Configure `next-sitemap` to generate `/sitemap.xml` covering all 80+ pages
- [ ] Add `robots.txt` (allow all, block `/api/*`, `/admin/*`)
- [ ] Add `og:image` for homepage (1200x630px, branded navy + gold)
- [ ] Add `og:image` templates for all 3 hub pages (Financial, Real Estate, Legal)
- [ ] Configure `next-seo` with default SEO config (site name, OG defaults)
- [ ] Add `canonical` tags — self-referencing on all pages
- [ ] Add `hreflang` tag (not needed — English only)
- [ ] Verify `<html lang="en">` is set

### Week 1: Analytics & Search Console

- [ ] Set up Google Analytics 4 property
- [ ] Install GA4 tag via `NEXT_PUBLIC_GA_ID` env variable
- [ ] Set up Google Search Console — verify ownership via HTML meta tag
- [ ] Submit `sitemap.xml` to GSC on launch day
- [ ] Set up Bing Webmaster Tools (submit same sitemap)
- [ ] Set up Vercel Analytics

### Week 2: Schema Implementation

- [ ] Add `LocalBusiness` + `Organization` schema to root layout (appears on all pages)
- [ ] Add `Service` + `FAQPage` schema to all 46 service page templates
- [ ] Add `Article` + `FAQPage` schema to blog post template
- [ ] Add `WebApplication` schema to `/tools/[tool]` pages
- [ ] Add `BreadcrumbList` schema to all interior pages
- [ ] Add `WebSite` schema with `SearchAction` to homepage
- [ ] Validate all schemas at schema.org validator before launch

### Week 2–3: On-Page Content (All Service Pages)

- [ ] Verify every service page has unique `metaTitle` and `metaDescription` (check `services-data.ts`)
- [ ] Ensure every `<h1>` includes primary keyword ("in Bangalore" pattern)
- [ ] Every service page must have 5 FAQs minimum
- [ ] Every service page must have "Related Services" section (internal links)
- [ ] Every hub page (Financial/Real Estate/Legal) links to all child service pages

### Week 3–4: Performance & Mobile

- [ ] All images use `next/image` with `width`, `height`, and `alt` attributes
- [ ] All images are WebP format
- [ ] Fonts preloaded: Playfair Display + Inter (`<link rel="preload">`)
- [ ] Run Lighthouse audit — target LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Test all pages on mobile (375px viewport minimum)
- [ ] Verify click-to-call works on all phone number mentions
- [ ] Add `loading="lazy"` to below-fold images only

### Week 4: Launch Checklist

- [ ] `sitemap.xml` accessible at `rightasset.in/sitemap.xml`
- [ ] `robots.txt` accessible at `rightasset.in/robots.txt`
- [ ] All 5 launch blog posts live with full schema
- [ ] All 46 service pages live with unique content
- [ ] Lead form connects to Supabase `leads` table — tested
- [ ] WhatsApp button works on mobile
- [ ] Google Search Console verified + sitemap submitted
- [ ] GBP listing created and verified

---

## Phase 2 — Expansion (Weeks 5–12)
**Goal:** Begin ranking for Tier 1 keywords. Build local citation profile. Start blog cadence.

### Weeks 5–6: Local Citations

- [ ] Submit NAP to Justdial
- [ ] Submit NAP to Sulekha
- [ ] Submit NAP to IndiaMart
- [ ] Submit NAP to Yellow Pages India
- [ ] Submit to Bing Places
- [ ] Submit to Apple Business Connect
- [ ] Create LinkedIn Company Page
- [ ] Verify NAP consistency across all listings: Name, Address, Phone must be identical

**NAP Standard (confirm with client before submitting anywhere):**
```
Name:    Right Assets Management
Address: [Full address — confirm with client]
Phone:   [Client phone — confirm with client]
Email:   [Client email — confirm with client]
Website: https://rightasset.in
```

### Weeks 5–8: Blog Launch

- [ ] Publish 5 launch blog posts (already written for launch)
- [ ] Add post #1 to GBP as an update with image
- [ ] Share each post on Instagram (create infographic version)
- [ ] Share on LinkedIn with commentary
- [ ] Monitor GSC for initial impressions data at week 8

### Weeks 7–10: Internal Linking Audit

- [ ] Every service page links to at least 3 other service pages (cross-vertical preferred)
- [ ] Blog posts link to 2–3 relevant service pages each
- [ ] Hub pages (Financial/RE/Legal) act as pillar pages — linked from all child pages
- [ ] Create "You might also need" section on service pages linking to cross-vertical services

**Cross-vertical linking examples:**
- Home loan page → link to Property Registration page → link to Property Disputes Legal page
- Mutual Funds page → link to Tax Planning page → link to ITR Filing blog post
- E-Khatha guide blog → link to Property Registration service page → link to Power of Attorney page

### Weeks 9–12: Content Expansion

- [ ] Publish 4 new blog posts (Months 3–4 from content calendar)
- [ ] Add OG images to all blog posts (generate branded 1200x630 images)
- [ ] Review GSC data: which queries are generating impressions? Optimize those pages first.
- [ ] Check for crawl errors in GSC — fix any 404s or redirect issues
- [ ] Monitor Core Web Vitals in GSC — fix any failing pages

---

## Phase 3 — Scale (Weeks 13–24)
**Goal:** Consolidate top 20 rankings for Tier 1 keywords. Launch location pages. Build backlinks.

### Months 4–5: Review Generation Campaign

- [ ] Create a Google Review QR code — place in office, on WhatsApp after service
- [ ] Send personal WhatsApp message to 50 existing clients requesting a review
- [ ] Respond to every new review within 24 hours
- [ ] Target: 25 reviews by end of month 5

### Month 4–6: Blog Scale-Up

- [ ] Publish 4 new posts/month
- [ ] Update all Month 1–2 posts with "Last Updated: [current date]" to signal freshness
- [ ] Identify top-performing posts via GSC and add more depth/sections to them
- [ ] Add internal links from new posts to older posts (link equity distribution)

### Month 5–6: Location Pages (If justified by data)

Trigger: If Bangalore-wide service pages are ranking #3–10, create neighborhood-specific pages.

- [ ] Analyze GSC data: are users searching "[service] in Koramangala/Whitefield/etc."?
- [ ] If yes, create 5–10 location-specific landing pages
- [ ] Each page must have genuinely unique content (local references, not just keyword swap)
- [ ] Quality gate: Min 600 words, 60% unique content per page

### Month 5–8: Backlink Outreach

- [ ] Identify 20 personal finance blogs for guest post opportunities
- [ ] Write 3–4 high-quality guest posts targeting real estate and legal topics
- [ ] Monitor competitors' backlinks (use Ahrefs/Semrush free trial) — target same sources
- [ ] Get listed on "Best Financial Advisors in Bangalore" roundup posts
- [ ] Engage in relevant Quora/Reddit threads with helpful answers + site link

---

## Phase 4 — Authority (Months 7–12)
**Goal:** Establish Right Assets Management as the go-to Bangalore financial/real estate/legal brand.

### Month 7–9: E-E-A-T Signals

- [ ] Add team member page with credentials, qualifications, SEBI registration
- [ ] Add author bios to all blog posts with photo and qualification
- [ ] Get mentioned in at least 2 local publications (Times of India Bangalore, Deccan Herald)
- [ ] Create detailed case studies page (anonymized: "How we helped a Bangalore family with property + home loan + legal in one engagement")
- [ ] Add SEBI/RERA registration details to footer and About page

### Month 8–10: Advanced Schema

- [ ] Add `AggregateRating` schema once 20+ Google Reviews are live
- [ ] Add `Event` schema if any webinars/seminars are hosted
- [ ] Add `VideoObject` schema if explainer videos are added
- [ ] Add `HowTo` schema to step-by-step service pages

### Month 9–12: PR & Authority Links

- [ ] Pitch personal finance angle to Moneycontrol / ET / Business Standard
- [ ] Partner with 2–3 CA firms or real estate agents for mutual referral + link exchange
- [ ] Sponsor one local Bangalore community event for event-page link
- [ ] Apply for "Best of Bangalore" business awards for citation and media coverage

### Month 10–12: GEO Optimization (AI Search)

- [ ] Add `llms.txt` file listing all 80+ pages with descriptions
- [ ] Ensure every service description is 2–3 sentence plain-language summary (quotable by AI)
- [ ] Check if ChatGPT / Perplexity mentions Right Assets for key queries — if not, focus on citation building
- [ ] Update FAQ sections with questions phrased exactly as people ask AI assistants

---

## Ongoing (Monthly, Every Month)

| Task | Frequency | Owner |
|------|-----------|-------|
| GSC performance review | Monthly | Developer |
| GBP post update | 2x/month | Client/Developer |
| New blog post publish | 2–4x/month | Developer |
| Review response | Within 24hr of new review | Client |
| Sitemap resubmission (if new pages) | As needed | Developer |
| Core Web Vitals check | Monthly | Developer |
| Backlink profile check | Monthly | Developer |

---

## Key Dependencies

| Action | Depends On |
|--------|-----------|
| GBP verification | Client's physical address confirmed |
| Local citations | Confirmed NAP (Name, Address, Phone, Email) from client |
| Schema `telephone` field | Confirmed phone number from client |
| SEBI/RERA E-E-A-T signals | Client provides registration numbers |
| Author bios | Client provides team photos + credentials |

---

*Roadmap Version 1.0 | May 2026 | Review at Month 3 based on GSC data*
