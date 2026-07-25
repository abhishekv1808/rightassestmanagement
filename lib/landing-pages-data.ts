export type LandingPage = {
  slug: string;
  metaTitle: string;
  vertical: "financial" | "real-estate" | "legal";
  accentColor: string;
  lightBg: string;
  // Hero
  eyebrow: string;
  headline: string;
  subheadline: string;
  // Form
  serviceLabel: string;
  ctaText: string;
  whatsappMessage: string;
  // Stats strip (4)
  stats: { value: string; label: string }[];
  // How it works (3 steps)
  processSteps: { title: string; body: string; duration: string }[];
  // Trust points (3 cards)
  trustPoints: { heading: string; body: string }[];
  // Benefits grid (6 items)
  benefits: { heading: string; body: string }[];
  // Partner / institution names
  partnerNames: string[];
  partnerLabel: string;
  // Testimonials (3)
  testimonials: { quote: string; name: string; location: string }[];
  // Comparison table (5 rows)
  comparisonRows: { aspect: string; alone: string; withUs: string }[];
  // Risk reversal
  guarantee: string;
  // FAQs
  faqs: { q: string; a: string }[];
};

export const ALL_LANDING_PAGES: LandingPage[] = [
  // ── 1. HOME LOAN ─────────────────────────────────────────────────────────────
  {
    slug: "home-loan",
    metaTitle:
      "Home Loan | Free Expert Guidance — Right Assets Management",
    vertical: "financial",
    accentColor: "#1B3A6B",
    lightBg: "#EEF2F8",
    eyebrow: "Trusted Home Loan Advisors",
    headline: "Get the Best Home Loan — Without the Confusion",
    subheadline:
      "We compare offers from 20+ banks and NBFCs, handle all documentation, and get you approved faster. 100% free advisory — no hidden charges.",
    serviceLabel: "Home Loan",
    ctaText: "Get Free Loan Guidance",
    whatsappMessage: "Hi, I need help with a Home Loan",
    stats: [
      { value: "20+", label: "Banks Compared" },
      { value: "₹500Cr+", label: "Loans Facilitated" },
      { value: "7.5%*", label: "Starting Rate" },
      { value: "48 Hrs", label: "Avg. Approval Time" },
    ],
    processSteps: [
      {
        title: "Fill the form (30 seconds)",
        body: "Tell us your loan requirement and basic details. Our advisor will call you back within 2 hours.",
        duration: "2 min",
      },
      {
        title: "Free consultation & profile check",
        body: "We assess your income, CIBIL score, and property details. We tell you exactly what you qualify for — honestly.",
        duration: "Same day",
      },
      {
        title: "We compare banks & get you approved",
        body: "We submit to the right lenders, negotiate the best rate, and follow up until disbursement. You sit back.",
        duration: "3–7 days",
      },
    ],
    trustPoints: [
      {
        heading: "We compare 20+ lenders for you",
        body: "SBI, HDFC, ICICI, Axis, LIC HFL — we check all and recommend the best rate for your income profile.",
      },
      {
        heading: "Zero advisory fee — ever",
        body: "Our guidance is completely free. We earn from the bank, not from you. No processing fees charged by us.",
      },
      {
        heading: "Doorstep documentation",
        body: "Our team visits you to collect and verify documents. No running to multiple bank branches.",
      },
    ],
    benefits: [
      {
        heading: "Lowest possible interest rate",
        body: "We negotiate with multiple lenders simultaneously — borrowers who use us typically save 0.25–0.5% vs going direct.",
      },
      {
        heading: "Pre-approval in 24 hours",
        body: "We know which lender will approve your profile fastest. No wasted time on rejections.",
      },
      {
        heading: "Complete document checklist",
        body: "We give you an exact list of documents needed for your specific case — no back-and-forth with banks.",
      },
      {
        heading: "CIBIL score guidance",
        body: "If your score needs improvement, we tell you exactly what to do before applying so you get the best rate.",
      },
      {
        heading: "Doorstep service, wherever you are",
        body: "Our team comes to you for document collection and verification. No bank visits until final signing.",
      },
      {
        heading: "Post-disbursement support",
        body: "EMI start date, insurance requirements, part-prepayment advice — we stay with you after disbursement.",
      },
    ],
    partnerLabel: "We work with leading lenders",
    partnerNames: [
      "SBI",
      "HDFC Bank",
      "ICICI Bank",
      "Axis Bank",
      "Kotak Mahindra",
      "LIC HFL",
      "PNB Housing",
      "Bank of Baroda",
    ],
    testimonials: [
      {
        quote:
          "I was comparing home loan rates for 2 months and getting nowhere. Right Assets sorted my ₹65 lakh loan in 10 days at 8.4% — lower than what my own bank had offered. Absolutely recommend.",
        name: "Suresh Reddy",
        location: "Delhi, India",
      },
      {
        quote:
          "My CIBIL score was 720 and I was worried no bank would give me a good rate. The team advised me to clear one old credit card due and reapply — got 8.6% from HDFC. Genuine advisors.",
        name: "Meera Krishnaswamy",
        location: "Hyderabad, India",
      },
      {
        quote:
          "First-time home buyer, completely clueless. Right Assets explained everything — EMI, tenure, prepayment — and got my loan sanctioned in 4 days. The doorstep service saved me 2 days of leave.",
        name: "Arun Nair",
        location: "Kolkata, India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Time to approval",
        alone: "3–6 weeks of bank visits and follow-ups",
        withUs: "48–72 hours with expert handling",
      },
      {
        aspect: "Banks compared",
        alone: "1–2 banks you already know",
        withUs: "20+ lenders, best rate negotiated",
      },
      {
        aspect: "Interest rate",
        alone: "Whatever the bank offers you",
        withUs: "Typically 0.25–0.5% lower via negotiation",
      },
      {
        aspect: "Documentation effort",
        alone: "Multiple bank visits, frequent callbacks",
        withUs: "Doorstep collection, zero running around",
      },
      {
        aspect: "Cost to you",
        alone: "Your time + possibly rejections",
        withUs: "Zero — completely free advisory",
      },
    ],
    guarantee:
      "If we genuinely cannot get you a better deal than what you already have, we will tell you honestly. We never push a loan that is not in your interest.",
    faqs: [
      {
        q: "What is the minimum salary required for a home loan?",
        a: "Most banks require a minimum monthly income of ₹25,000–₹30,000 for salaried applicants. Self-employed applicants need 2 years of ITR filed. We assess your profile and match you with the right lender.",
      },
      {
        q: "How long does home loan approval take?",
        a: "With proper documentation, most loans are sanctioned within 48–72 hours and disbursed within 7–10 working days. Our team ensures documents are complete before submission to avoid delays.",
      },
      {
        q: "Do you charge any fee for home loan guidance?",
        a: "No. Our advisory service is completely free for home loan clients. We work with banks who pay us a referral fee — so you get expert guidance at zero cost.",
      },
      {
        q: "Can I get a home loan for an under-construction property?",
        a: "Yes. We help with loans for ready-to-move, under-construction (RERA-registered projects), resale, and plot + construction loans.",
      },
    ],
  },

  // ── 2. MUTUAL FUNDS / SIP ──────────────────────────────────────────────────
  {
    slug: "mutual-funds",
    metaTitle:
      "Mutual Fund Investment | SEBI-Registered Advisor — Right Assets Management",
    vertical: "financial",
    accentColor: "#1B3A6B",
    lightBg: "#EEF2F8",
    eyebrow: "SEBI-Registered Investment Advisor",
    headline: "Start Building Wealth with Mutual Fund Investing — Guided by Experts",
    subheadline:
      "Get a personalised mutual fund portfolio built by SEBI-registered advisors. Start investing with just ₹500/month and grow wealth systematically.",
    serviceLabel: "Mutual Fund Investment",
    ctaText: "Get Free Portfolio Advice",
    whatsappMessage: "Hi, I want to start mutual fund investments and need expert guidance",
    stats: [
      { value: "₹50Cr+", label: "AUM Managed" },
      { value: "500+", label: "Active Portfolios Managed" },
      { value: "12–15%*", label: "Historical CAGR" },
      { value: "SEBI", label: "Registered Advisor" },
    ],
    processSteps: [
      {
        title: "Tell us your goal",
        body: "Retirement, child's education, house purchase — share your target amount and timeline. We listen, not pitch.",
        duration: "15 min call",
      },
      {
        title: "We build your personalised portfolio",
        body: "We select the right funds based on your risk profile, goal, and tax situation. No generic, one-size-fits-all recommendations.",
        duration: "Within 24 hrs",
      },
      {
        title: "We manage, review & rebalance",
        body: "Quarterly portfolio reviews, fund switches when needed, and tax harvesting strategies — ongoing, forever.",
        duration: "Ongoing",
      },
    ],
    trustPoints: [
      {
        heading: "Personalised portfolio — not generic advice",
        body: "We build a fund mix based on your goal, risk appetite, and timeline — not a one-size-fits-all fund list.",
      },
      {
        heading: "Direct funds — zero commission products",
        body: "We recommend direct mutual funds where possible, saving you 0.5–1% in annual returns vs regular fund plans.",
      },
      {
        heading: "Quarterly portfolio reviews included",
        body: "We review your portfolio every quarter and rebalance when needed. You are never left alone after the first investment.",
      },
    ],
    benefits: [
      {
        heading: "Goal-based planning",
        body: "Every fund we pick has a purpose linked to your specific goal — retirement, education, or a future purchase.",
      },
      {
        heading: "Higher returns via direct funds",
        body: "Direct plans have lower expense ratios. On ₹10L invested for 10 years, that's ₹1–2L extra in your pocket.",
      },
      {
        heading: "Tax-efficient investing",
        body: "We optimise your portfolio to minimise capital gains tax impact and make full use of available tax-saving fund options (ELSS).",
      },
      {
        heading: "Step-up investment automation",
        body: "We set up automatic investment increases each year so your portfolio grows with your income — zero effort from you.",
      },
      {
        heading: "Emergency fund planning",
        body: "We ensure you always have liquid investments before committing to long-term funds. Basics first.",
      },
      {
        heading: "No push products",
        body: "We are fee-based, not commission-driven. We have zero incentive to recommend bad products to you.",
      },
    ],
    partnerLabel: "We invest across top AMCs in India",
    partnerNames: [
      "HDFC MF",
      "Axis MF",
      "Mirae Asset",
      "Parag Parikh",
      "SBI MF",
      "Nippon India",
      "ICICI Pru MF",
      "Kotak MF",
    ],
    testimonials: [
      {
        quote:
          "Started a ₹10,000/month investment plan through Right Assets 3 years ago. My portfolio is up 41% and they reviewed it twice without me even asking. Genuine advisors who actually care.",
        name: "Priya Menon",
        location: "Mumbai, India",
      },
      {
        quote:
          "I was putting money in FDs for years — safe but terrible returns. Right Assets moved me to a balanced portfolio with 13% CAGR over 4 years. I wish I had done this 10 years ago.",
        name: "Rajesh Iyer",
        location: "Delhi, India",
      },
      {
        quote:
          "They showed me I was paying 1.2% extra per year in a regular plan through my bank. Switched to direct, added a ELSS for tax saving. The difference over 20 years is huge.",
        name: "Deepa Shankar",
        location: "Chennai, India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Fund selection",
        alone: "Generic lists from online platforms",
        withUs: "Curated portfolio matched to your goal & risk",
      },
      {
        aspect: "Expense ratio",
        alone: "Regular plans (1–2.5% per year)",
        withUs: "Direct plans (0.1–1%), saving ₹1–2L over 10 yrs",
      },
      {
        aspect: "Monitoring",
        alone: "You track yourself or forget",
        withUs: "Quarterly review & rebalancing by advisor",
      },
      {
        aspect: "Tax efficiency",
        alone: "Rarely considered at investment stage",
        withUs: "Built in — capital gains harvesting, debt vs equity mix",
      },
      {
        aspect: "Accountability",
        alone: "Platform doesn't call you back",
        withUs: "Dedicated advisor, reachable by call & WhatsApp",
      },
    ],
    guarantee:
      "If after our free consultation you feel our advice did not add value, there is absolutely no obligation to invest through us. We earn only when you genuinely benefit.",
    faqs: [
      {
        q: "What is the minimum amount to start investing in mutual funds?",
        a: "You can start with as little as ₹500/month. We recommend starting with a comfortable amount and increasing it by 10% each year using a step-up investment strategy.",
      },
      {
        q: "Are mutual fund investments safe?",
        a: "Mutual funds are market-linked and carry risk. However, with a long-term horizon (5+ years) and the right fund selection, equity funds have historically delivered 12–15% CAGR. Debt funds carry lower risk.",
      },
      {
        q: "How is Right Assets different from online platforms like Groww or Zerodha?",
        a: "Online platforms are self-service — you choose funds yourself. We are advisors who understand your complete financial picture and build a strategy. We also assist with tax implications, goal planning, and rebalancing.",
      },
    ],
  },

  // ── 3. PROPERTY REGISTRATION ──────────────────────────────────────────────
  {
    slug: "property-registration",
    metaTitle:
      "Property Registration | Expert End-to-End Help — Right Assets Management",
    vertical: "real-estate",
    accentColor: "#0D7E7E",
    lightBg: "#E6F4F4",
    eyebrow: "Property Registration Experts Serving All of India",
    headline:
      "Property Registration — Handled End-to-End by Experts",
    subheadline:
      "Stamp duty calculation, document preparation, and Sub-Registrar Office coordination — all handled by our team so you don't face rejections or delays.",
    serviceLabel: "Property Registration",
    ctaText: "Get Registration Help",
    whatsappMessage: "Hi, I need help with property registration",
    stats: [
      { value: "1000+", label: "Properties Registered" },
      { value: "100%", label: "Success Rate" },
      { value: "3 Days", label: "Avg. Completion" },
      { value: "All Areas", label: "Global Coverage" },
    ],
    processSteps: [
      {
        title: "Share property details with us",
        body: "Send us the sale deed draft, EC, and property details. We review everything for accuracy before you spend a rupee on stamp paper.",
        duration: "Same day review",
      },
      {
        title: "We prepare all documents",
        body: "We calculate stamp duty, prepare the final deed, collect encumbrance certificate, khata papers, and verify title documents.",
        duration: "1–2 days",
      },
      {
        title: "We accompany you to the SRO",
        body: "We schedule the Sub-Registrar appointment, coordinate with buyer and seller, and ensure registration is completed without a single rejection.",
        duration: "Registration day",
      },
    ],
    trustPoints: [
      {
        heading: "Exact stamp duty & registration charge calculation",
        body: "We calculate stamp duty, registration fees, and BBMP charges based on your specific property type, location, and ownership structure.",
      },
      {
        heading: "Document checklist & legal verification",
        body: "We verify title documents, encumbrance certificates, khata papers, and BBMP records before you step into the Sub-Registrar Office.",
      },
      {
        heading: "Sub-Registrar Office coordination",
        body: "We schedule the appointment, accompany you to the SRO, and ensure smooth registration without rejections or callbacks.",
      },
    ],
    benefits: [
      {
        heading: "Zero rejection risk",
        body: "We verify all documents for completeness and legal validity before submission. Rejections at SRO are completely avoidable.",
      },
      {
        heading: "Accurate stamp duty calculation",
        body: "Overpaying or underpaying stamp duty are both costly mistakes. We get the exact figure first time.",
      },
      {
        heading: "Khata & EC verification",
        body: "We confirm the property has a clear title, no pending dues, and an unencumbered EC before you pay the seller.",
      },
      {
        heading: "Guidance on joint ownership benefits",
        body: "Joint ownership with a female co-owner gives 1% stamp duty concession in Karnataka — we ensure you benefit from this.",
      },
      {
        heading: "BBMP & BDA compliance check",
        body: "We verify that the property is properly converted, approved, and not on a lake buffer or road widening zone.",
      },
      {
        heading: "Post-registration support",
        body: "Khata transfer, property tax update, and mutation after registration — we handle the follow-up paperwork too.",
      },
    ],
    partnerLabel: "We work with official Karnataka government portals",
    partnerNames: [
      "BBMP",
      "Kaveri Online",
      "Karnataka SRO",
      "Bhoomi Portal",
      "BDA",
      "RERA Karnataka",
      "BBMP Khata",
      "Sub-Registrar Offices",
    ],
    testimonials: [
      {
        quote:
          "My property registration was stuck for 6 months due to a khata issue. Right Assets resolved it in 3 weeks — they handled the BBMP, the SRO, everything. Absolute lifesavers.",
        name: "Anand Kumar",
        location: "Mumbai, India",
      },
      {
        quote:
          "First time buying a property. I didn't know anything about stamp duty or EC. The team walked me through every step, calculated the exact charges, and came with me to the SRO. Highly recommend.",
        name: "Sangeetha Rajan",
        location: "Ahmedabad, India",
      },
      {
        quote:
          "The seller's property had a wrong survey number in the old deed. Right Assets caught it before we registered and got it corrected. Could have been a very expensive mistake.",
        name: "Vivek Sharma",
        location: "Hyderabad, India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Document preparation",
        alone: "Figure it out yourself — often incomplete",
        withUs: "Expert-prepared, verified checklist, zero gaps",
      },
      {
        aspect: "Stamp duty accuracy",
        alone: "Calculated manually, often wrong",
        withUs: "Exact calculation with all concessions applied",
      },
      {
        aspect: "SRO experience",
        alone: "Long queues, frequent rejections",
        withUs: "Pre-scheduled appointment, zero rejections",
      },
      {
        aspect: "Title verification",
        alone: "Typically skipped or surface-level",
        withUs: "Full EC, khata, tax receipt, BBMP check",
      },
      {
        aspect: "Post-registration work",
        alone: "Mutation and khata transfer forgotten",
        withUs: "We handle mutation, khata update, tax transfer",
      },
    ],
    guarantee:
      "If we find any title issue or legal problem with the property, we will tell you before you register — even if it means you walk away from the deal. Protecting your money always comes first.",
    faqs: [
      {
        q: "How much stamp duty do I pay for property registration?",
        a: "Stamp duty in Karnataka is 5% of the property value for properties above ₹45 lakh, plus 1% registration charge. For joint female ownership, there is a 1% concession. We calculate the exact amount for your property.",
      },
      {
        q: "What documents are required for property registration?",
        a: "You will need the sale deed (drafted by a lawyer), PAN and Aadhar of buyer and seller, property tax receipts, encumbrance certificate, and khata certificate. We provide a complete checklist for your specific case.",
      },
      {
        q: "Can you help if there is a legal dispute or encumbrance on the property?",
        a: "Yes. We verify the property title and EC before proceeding. If issues exist, our legal team helps resolve them before registration to protect your investment.",
      },
    ],
  },

  // ── 4. TAX PLANNING ──────────────────────────────────────────────────────
  {
    slug: "tax-planning",
    metaTitle:
      "Tax Planning & ITR Filing | Save More Tax — Right Assets Management",
    vertical: "financial",
    accentColor: "#1B3A6B",
    lightBg: "#EEF2F8",
    eyebrow: "Expert Tax Planning & CA-Guided ITR Filing",
    headline: "Stop Overpaying Tax — Expert Tax Planning",
    subheadline:
      "We maximise every deduction available to you under prevailing tax laws — across eligible investments, health insurance, HRA, and NPS — and file error-free ITR returns for salaried, self-employed, and business owners.",
    serviceLabel: "Tax Planning & ITR Filing",
    ctaText: "Get Free Tax Review",
    whatsappMessage: "Hi, I need help with tax planning and ITR filing",
    stats: [
      { value: "₹2Cr+", label: "Tax Saved for Clients" },
      { value: "1000+", label: "Returns Filed" },
      { value: "Both Regimes", label: "Old & New Compared" },
      { value: "AY 26–27", label: "Latest Filing Support" },
    ],
    processSteps: [
      {
        title: "Share your income details",
        body: "Salary slips, Form 16, investment statements — share what you have. We identify every deduction you are currently missing.",
        duration: "15 min",
      },
      {
        title: "Free tax review & strategy",
        body: "We compare old vs new regime, identify all eligible deductions, and show you exactly how much you can save this year.",
        duration: "Same day",
      },
      {
        title: "We file your return — error-free",
        body: "We prepare the return, verify all figures with Form 26AS and AIS, and file before the deadline. You just review and approve.",
        duration: "2–3 days",
      },
    ],
    trustPoints: [
      {
        heading: "Every deduction identified — nothing missed",
        body: "Eligible investments (PPF, ELSS, insurance), health insurance, HRA, home loan interest, NPS — we check every applicable section under prevailing tax laws.",
      },
      {
        heading: "Old vs New tax regime comparison",
        body: "We calculate your liability under both regimes and recommend which saves more for your specific income and deductions.",
      },
      {
        heading: "Error-free, on-time filing",
        body: "All returns filed before deadlines with proper verification. Zero notices for discrepancies or mismatched figures.",
      },
    ],
    benefits: [
      {
        heading: "Maximum eligible-investment deduction",
        body: "We ensure every rupee you are entitled to under prevailing tax laws is utilised — PPF, ELSS, insurance, provident fund, housing loan principal.",
      },
      {
        heading: "Health insurance premium deduction",
        body: "Deductions for self and for senior citizen parents as per prevailing tax laws. Many taxpayers miss this. We find and claim every rupee you're entitled to.",
      },
      {
        heading: "HRA exemption calculation",
        body: "HRA calculations are complex with rent receipts and city limits. We calculate the exact exempt amount — not an estimate.",
      },
      {
        heading: "Capital gains optimisation",
        body: "LTCG from equity, debt funds, and property — we calculate accurately and show you how to minimise the liability legally.",
      },
      {
        heading: "NPS tax benefit",
        body: "NPS offers an additional exclusive deduction over and above other eligible investments, as per prevailing tax laws — most salaried employees are not using this.",
      },
      {
        heading: "Advance tax reminders",
        body: "If you have freelance or business income, we track advance tax deadlines and ensure you pay on time to avoid interest.",
      },
    ],
    partnerLabel: "We file through official government portals",
    partnerNames: [
      "Income Tax Portal",
      "TRACES",
      "ClearTax",
      "Form 26AS",
      "AIS Portal",
      "MCA Portal",
      "GSTN",
      "EPF Portal",
    ],
    testimonials: [
      {
        quote:
          "I was paying ₹1.2L in tax every year. Right Assets showed me I was missing HRA and NPS deductions. My tax came down to ₹68,000 that same year. Wish I had known sooner.",
        name: "Kavitha Narayan",
        location: "Bangalore, India",
      },
      {
        quote:
          "I had freelance income alongside my salary and had no idea about advance tax. Got a demand notice from IT dept last year. Right Assets fixed everything and filed a revised return. Stress-free now.",
        name: "Rohit Desai",
        location: "Chennai, India",
      },
      {
        quote:
          "They switched me to the old regime after comparing both — saved ₹42,000 in a single year. My CA never even mentioned the option. Will never go back to self-filing.",
        name: "Sunita Prasad",
        location: "Jaipur, India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Deductions found",
        alone: "Only what you already know about",
        withUs: "Every applicable section checked, nothing missed",
      },
      {
        aspect: "Regime choice",
        alone: "Often default, not calculated",
        withUs: "Both regimes compared, optimal one chosen",
      },
      {
        aspect: "Capital gains",
        alone: "Frequently miscalculated or missed",
        withUs: "Accurate calculation, optimised for tax",
      },
      {
        aspect: "Filing accuracy",
        alone: "Cross-verification with 26AS often skipped",
        withUs: "Verified against 26AS, AIS, and Form 16",
      },
      {
        aspect: "Notice risk",
        alone: "Higher — errors trigger scrutiny",
        withUs: "Near zero — clean, well-documented return",
      },
    ],
    guarantee:
      "If we can't find a way to reduce your tax liability compared to your current situation, we will tell you upfront and not charge anything. We only proceed when it genuinely makes sense for you.",
    faqs: [
      {
        q: "When should I start tax planning?",
        a: "Ideally at the start of the financial year (April). However, we can still optimise significantly if you come to us by December. Last-minute planning from January–March limits options like ELSS investments.",
      },
      {
        q: "What is the ITR filing deadline for FY 2025–26?",
        a: "The due date for individual returns is July 31, 2026 (AY 2026–27). Late filing attracts a penalty of ₹5,000 and interest. We ensure you file on time.",
      },
      {
        q: "Do you handle business income and self-employed ITR?",
        a: "Yes. We handle ITR-1 (salaried), ITR-2 (capital gains), ITR-3 (business income), and ITR-4 (presumptive income). For complex returns, we work with our empanelled CAs.",
      },
    ],
  },

  // ── 5. HEALTH INSURANCE ──────────────────────────────────────────────────
  {
    slug: "health-insurance",
    metaTitle:
      "Best Health Insurance Plans | Compare & Buy — Right Assets Management",
    vertical: "financial",
    accentColor: "#1B3A6B",
    lightBg: "#EEF2F8",
    eyebrow: "Health Insurance Advisors — Unbiased Comparison",
    headline:
      "Find the Right Health Insurance for Your Family",
    subheadline:
      "We compare 30+ health insurance plans and recommend the one that gives maximum coverage at the best premium — with no hidden exclusions explained in fine print.",
    serviceLabel: "Health Insurance",
    ctaText: "Compare Plans Free",
    whatsappMessage: "Hi, I want to compare health insurance plans",
    stats: [
      { value: "30+", label: "Insurers Compared" },
      { value: "500+", label: "Families Insured" },
      { value: "₹3L–₹2Cr", label: "Cover Options" },
      { value: "24/7", label: "Claim Support" },
    ],
    processSteps: [
      {
        title: "Tell us about your family",
        body: "Age, pre-existing conditions, hospitalisations in the past 3 years, and your budget. Takes 10 minutes.",
        duration: "10 min",
      },
      {
        title: "We shortlist the right 3 plans",
        body: "From 30+ options, we pick the 3 that best match your family profile — explaining every exclusion and sub-limit clearly.",
        duration: "Same day",
      },
      {
        title: "You choose, we apply",
        body: "We fill the application, guide you through medical declarations, and ensure the policy is issued with zero errors.",
        duration: "1–3 days",
      },
    ],
    trustPoints: [
      {
        heading: "Unbiased comparison across all major insurers",
        body: "Star Health, Niva Bupa, HDFC Ergo, Care, Aditya Birla — we compare all and show you the best option for your family.",
      },
      {
        heading: "Claim support when it matters most",
        body: "We assist with claims paperwork and hospital coordination so you are not alone during a health emergency.",
      },
      {
        heading: "Pre-existing disease coverage guidance",
        body: "We explain waiting periods, exclusions, and sub-limits clearly before you buy — no nasty surprises at claim time.",
      },
    ],
    benefits: [
      {
        heading: "Right cover, not over-sold",
        body: "We recommend a cover amount based on your actual hospitalisation risk and medical inflation — not the most expensive plan.",
      },
      {
        heading: "Exclusions explained in plain language",
        body: "We go through every exclusion, waiting period, and sub-limit in plain language before you sign — no unpleasant surprises.",
      },
      {
        heading: "Cashless hospital network check",
        body: "We verify that your nearest hospitals are covered under the plan's cashless network before recommending it.",
      },
      {
        heading: "Super top-up strategy",
        body: "A base cover + super top-up is often 40% cheaper than a large single cover. We show you the most cost-effective structure.",
      },
      {
        heading: "Annual renewal reminders",
        body: "We remind you before renewal, review if the plan still suits you, and flag better options if the market has improved.",
      },
      {
        heading: "Claim assistance included",
        body: "If you face a hospitalisation, we help you file the cashless/reimbursement claim and follow up with the insurer on your behalf.",
      },
    ],
    partnerLabel: "We compare plans from all leading health insurers",
    partnerNames: [
      "Star Health",
      "Niva Bupa",
      "HDFC Ergo",
      "Care Health",
      "Aditya Birla",
      "ICICI Lombard",
      "Bajaj Allianz",
      "Reliance Health",
    ],
    testimonials: [
      {
        quote:
          "I had a health insurance plan for 4 years and thought I was fully covered. Right Assets reviewed it and found 3 critical exclusions I had no idea about. Switched to a better plan the same week.",
        name: "Ramesh Gowda",
        location: "Bangalore, India",
      },
      {
        quote:
          "My mother has diabetes and I could not find a plan that would cover her without a 4-year waiting period. Right Assets found a Care Supreme plan with a 2-year PED waiting period at a fair premium.",
        name: "Anitha Murthy",
        location: "Lucknow, India",
      },
      {
        quote:
          "When my husband was hospitalised, Right Assets helped us file the claim the same day. We did not have to worry about paperwork — they handled everything. That is the real value.",
        name: "Divya Menon",
        location: "Pune, India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Plans compared",
        alone: "1–3 plans from known brands",
        withUs: "30+ plans, right one recommended for your family",
      },
      {
        aspect: "Exclusions awareness",
        alone: "Often discovered only at claim time",
        withUs: "Every exclusion explained before you buy",
      },
      {
        aspect: "Cover structure",
        alone: "Single slab — often over or under insured",
        withUs: "Base + super top-up for best cost-benefit ratio",
      },
      {
        aspect: "Claim support",
        alone: "On your own during a stressful hospitalisation",
        withUs: "We handle claim filing and insurer follow-up",
      },
      {
        aspect: "Annual review",
        alone: "Same plan renewed every year by default",
        withUs: "Annual review, better options flagged proactively",
      },
    ],
    guarantee:
      "If we cannot find a plan that is genuinely better than what you currently have, we will tell you to stay with your existing insurer. We will never recommend a switch unless it clearly benefits you.",
    faqs: [
      {
        q: "How much health insurance cover does my family need?",
        a: "For a family of 4, we recommend a minimum of ₹10 lakh base cover with a super top-up of ₹50 lakh. Medical inflation runs at 15–18% per year — under-insurance is a real risk.",
      },
      {
        q: "What is the difference between individual and family floater plans?",
        a: "A family floater covers all members under one sum insured and is cheaper for young families. If any member is older or has health issues, individual plans may be better. We recommend based on your family profile.",
      },
      {
        q: "Can I get health insurance with a pre-existing condition like diabetes?",
        a: "Yes. Most insurers cover pre-existing conditions after a 2–4 year waiting period. Some plans have shorter waiting periods. We find the best option for your specific health condition.",
      },
    ],
  },

  // ── 6. TERM LIFE INSURANCE ───────────────────────────────────────────────
  {
    slug: "term-life-insurance",
    metaTitle:
      "Term Life Insurance | ₹1 Crore Cover from ₹500/Month — Right Assets Management",
    vertical: "financial",
    accentColor: "#1B3A6B",
    lightBg: "#EEF2F8",
    eyebrow: "Term Life Insurance Advisors",
    headline:
      "₹1 Crore Life Cover from ₹500/Month — Protect Your Family Today",
    subheadline:
      "Term insurance is the most affordable way to secure your family's future. We compare top plans and get you the right cover at the best premium — in 30 minutes.",
    serviceLabel: "Term Life Insurance",
    ctaText: "Compare Term Plans Free",
    whatsappMessage: "Hi, I want to get term life insurance. Can you help me compare plans?",
    stats: [
      { value: "₹500/mo*", label: "Starting Premium" },
      { value: "₹1 Cr+", label: "Cover Available" },
      { value: "20+", label: "Insurers Compared" },
      { value: "98%+", label: "Claim Settlement" },
    ],
    processSteps: [
      {
        title: "Tell us your income & liabilities",
        body: "Annual income, outstanding loans, number of dependents. We calculate the exact cover amount your family actually needs.",
        duration: "10 min",
      },
      {
        title: "We compare 20+ plans for you",
        body: "We shortlist plans with 98%+ claim settlement ratios, explain all riders, and recommend based on your specific profile and health.",
        duration: "Same day",
      },
      {
        title: "We guide you through application & issuance",
        body: "Medical declarations, underwriting queries, medical test coordination — we handle it all until your policy document is in hand.",
        duration: "3–7 days",
      },
    ],
    trustPoints: [
      {
        heading: "Right cover amount calculated for you",
        body: "We calculate the ideal cover based on income, liabilities, and family needs — typically 10–15x annual income.",
      },
      {
        heading: "Only high claim-settlement insurers",
        body: "We only recommend insurers with 98%+ claim settlement ratios — a policy is worthless if the claim gets rejected.",
      },
      {
        heading: "Riders that actually protect you",
        body: "Critical illness, accidental death, and disability riders can be essential. We explain which ones are worth buying for your profile.",
      },
    ],
    benefits: [
      {
        heading: "Exactly right cover amount",
        body: "Too little leaves your family unprotected. Too much wastes premium. We calculate the precise amount — no guessing.",
      },
      {
        heading: "Lowest premium at your age",
        body: "Every year you delay, premiums rise by 8–12%. We lock in the lowest rate available right now for your age and health.",
      },
      {
        heading: "98%+ claim settlement only",
        body: "We only recommend insurers whose claims are actually paid. A low-premium plan from an insurer with 90% CSR is not worth it.",
      },
      {
        heading: "Critical illness rider guidance",
        body: "A CI rider pays a lump sum on diagnosis of cancer, heart attack, or stroke. We evaluate whether it is worth adding for your profile.",
      },
      {
        heading: "Medical test coordination",
        body: "If a medical test is required, we coordinate with the insurer's empanelled centre near your home — at zero cost to you.",
      },
      {
        heading: "Nominee & payout structure advice",
        body: "We advise on nominee details, payout options (lump sum vs income), and ensure the policy structure is right for your family's needs.",
      },
    ],
    partnerLabel: "We compare plans from India's leading life insurers",
    partnerNames: [
      "LIC",
      "HDFC Life",
      "Max Life",
      "ICICI Prudential",
      "Tata AIA",
      "Bajaj Allianz Life",
      "SBI Life",
      "Kotak Life",
    ],
    testimonials: [
      {
        quote:
          "Took a ₹1.5 Cr term plan at 31 for just ₹850/month. Right Assets helped me choose a plan with a critical illness rider that my bank agent had never even mentioned. Very thorough.",
        name: "Vikram Shetty",
        location: "Jaipur, India",
      },
      {
        quote:
          "I had a ULIP that my old LIC agent had sold me as 'life cover'. Right Assets showed me I was getting ₹8L cover for ₹1,500/month. Switched to a ₹1 Cr term plan for ₹720/month. Eye-opening.",
        name: "Karthik Rao",
        location: "Chandigarh, India",
      },
      {
        quote:
          "My husband passed away last year. Because Right Assets had helped us get a term plan with the right nominee details and payout structure, the claim was settled in 12 days. In that moment, it was everything.",
        name: "Name withheld on request",
        location: "India",
      },
    ],
    comparisonRows: [
      {
        aspect: "Cover amount",
        alone: "Chosen arbitrarily — often too low",
        withUs: "Calculated precisely based on income & liabilities",
      },
      {
        aspect: "Insurer selection",
        alone: "Most advertised brand or bank's in-house plan",
        withUs: "Only 98%+ CSR insurers, best premium compared",
      },
      {
        aspect: "Rider evaluation",
        alone: "Added without understanding",
        withUs: "Each rider evaluated for your specific needs",
      },
      {
        aspect: "Underwriting support",
        alone: "Handle queries alone, risk of rejection",
        withUs: "We respond to underwriting queries, reducing rejection risk",
      },
      {
        aspect: "Nominee & payout setup",
        alone: "Often default, not thought through",
        withUs: "Nominee structure and payout option reviewed carefully",
      },
    ],
    guarantee:
      "We will never recommend a more expensive plan unless it genuinely offers better protection. If your existing policy already provides adequate cover, we will tell you honestly — no upsell.",
    faqs: [
      {
        q: "What is the right age to buy term insurance?",
        a: "The earlier the better — premiums are lowest in your 20s and early 30s. A ₹1 Cr policy for a 28-year-old costs ₹600–800/month. The same policy at 40 costs ₹1,500–2,000/month. Buy early and lock in a low premium.",
      },
      {
        q: "Should I buy online or through an advisor?",
        a: "Buying through us is completely free — the premium is exactly the same as buying directly online. But we help you compare plans, choose the right riders, and assist with claim settlement. Online buying means you are on your own.",
      },
      {
        q: "What documents are required for term insurance?",
        a: "Aadhar card, PAN card, income proof (salary slips or ITR), and sometimes a medical test depending on age and cover amount. We guide you through the complete application and issuance process.",
      },
    ],
  },
];

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return ALL_LANDING_PAGES.find((p) => p.slug === slug);
}
