import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Right Assets Management",
  description:
    "Terms of Service governing the use of Right Assets Management's website and financial, real estate, and legal advisory services in Bangalore, India.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 May 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "Client", "you") and Right Assets Management ("Company", "we", "us", "our"), a financial and advisory services firm registered and operating in Bangalore, Karnataka, India.

By accessing this Website (rightasset.in), submitting an enquiry, booking a consultation, or engaging any of our services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our Website or services.

We reserve the right to update or modify these Terms at any time. Continued use of our Website or services after any such modification constitutes your acceptance of the revised Terms. The date of the most recent revision is indicated at the top of this page.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `Right Assets Management provides advisory and facilitation services across three verticals:

**Financial Services:**
Investment advisory, insurance advisory, loan facilitation, tax planning assistance, and related financial guidance for individuals and businesses.

**Real Estate Services:**
Assistance with property transactions, documentation, government record extraction, regulatory approvals, and related real estate facilitation services in Karnataka, with a focus on Bangalore.

**Legal Advisory Services:**
General legal guidance and advisory support through empanelled advocates across civil, family, labour, consumer, cyber crime, criminal, insurance, and banking dispute matters. This is not a law firm.

All services are subject to the specific scope agreed upon between the Company and the Client at the time of engagement. Services may vary and are subject to availability, applicable laws, and the discretion of the Company.`,
  },
  {
    id: "financial-disclosures",
    title: "3. Financial Advisory — Regulatory Disclosures",
    content: `**Risk Disclosure — Investments:**
All investments in securities markets, mutual funds, equity, bonds, and other financial instruments are subject to market risk. Past performance of any fund, scheme, or instrument is not indicative of future results. The value of investments may rise or fall. Clients should read all scheme-related documents carefully before investing.

**Insurance:**
Insurance advisory is provided for general guidance only. Right Assets Management facilitates connection between clients and insurance providers. All insurance products are subject to the terms, conditions, and exclusions of the respective insurer. Policy terms should be reviewed carefully. IRDAI registration details of the insurer should be verified independently.

**Loans:**
Loan facilitation services help clients connect with banks and non-banking financial companies (NBFCs). Right Assets Management does not lend money and is not a lending institution. Approval of loans, interest rates, and terms are determined solely by the lending institution. We do not guarantee loan approvals.

**Tax Planning:**
Tax planning advice is provided for general informational purposes. Individual tax liability depends on personal circumstances, applicable tax laws, and decisions of tax authorities. Clients are advised to consult a qualified Chartered Accountant for their specific tax situation.

**No Guaranteed Returns:**
Right Assets Management makes no representation or warranty, express or implied, regarding the performance of any investment product or the financial outcome of any advisory engagement. No guaranteed returns are promised for any investment product.`,
  },
  {
    id: "real-estate-terms",
    title: "4. Real Estate Services — Scope & Limitations",
    content: `**Facilitation, Not Representation:**
Our real estate services constitute documentation assistance and facilitation only. We are not a real estate agent or broker under RERA unless specifically registered as such. Clients should verify our role and applicable RERA registration for property transaction assistance.

**Title & Due Diligence:**
While we assist with document extraction (Encumbrance Certificate, RTC/Pahani, E-Khatha, etc.), the ultimate responsibility for title verification and legal due diligence rests with the client and their appointed advocate. We do not guarantee the accuracy of records obtained from government portals or offices, as these are subject to errors in official records.

**Government Delays:**
Document processing timelines depend on government departments (BBMP, BDA, Sub-Registrar's Office, Gram Panchayat, Revenue Department, etc.). We do not guarantee specific timelines for government processes and are not liable for delays caused by government authorities.

**Property Valuations:**
Property valuations provided are indicative estimates based on prevailing market data and are not certified valuations for legal or financial purposes unless explicitly stated. For mortgage or legal proceedings, a certified valuer should be engaged.

**RERA Compliance:**
For any property transaction involving a registered RERA project, clients are advised to verify the RERA registration of the project on the Karnataka RERA portal (rera.karnataka.gov.in).`,
  },
  {
    id: "legal-advisory-terms",
    title: "5. Legal Advisory Services — Important Limitations",
    content: `**Not a Law Firm:**
Right Assets Management is not a law firm and does not practice law. Legal advisory services are provided through empanelled advocates who are independent professionals enrolled with the Bar Council of Karnataka or Bar Council of India, as applicable.

**No Solicitor-Client Relationship:**
Accessing legal information through our Website or receiving initial advisory from our team does not create a solicitor-client or advocate-client relationship. A formal advocate-client relationship is established only upon execution of a written engagement agreement directly between the client and the concerned advocate.

**Advisory vs. Representation:**
Legal advisory and consultations are provided to help you understand your situation and options. For legal representation in courts, tribunals, or before any authority, you must formally engage an advocate under a separate retainer.

**Jurisdiction Limitations:**
Our empanelled advocates primarily practise in Karnataka courts, consumer forums, labour tribunals, and cybercrime cells. For matters in other states or before specialised tribunals outside Karnataka, we may refer you to appropriate practitioners.

**Outcome Not Guaranteed:**
Legal outcomes depend on facts, evidence, applicable law, and the decisions of courts or authorities. No guarantees regarding the outcome of any legal matter are made or implied.`,
  },
  {
    id: "user-responsibilities",
    title: "6. User Responsibilities",
    content: `By using our Website and services, you agree to:

— Provide accurate, complete, and truthful information when submitting enquiries or engaging our services
— Not misrepresent your identity, financial situation, or the nature of your enquiry
— Not use our Website for any unlawful purpose or in violation of any applicable laws
— Not attempt to gain unauthorised access to any part of our systems or services
— Promptly inform us of any change in circumstances that may affect ongoing advisory engagements
— Independently verify all information received through our services before making financial, property, or legal decisions
— Not hold us responsible for decisions made on the basis of general information provided on this Website without engaging us formally

You acknowledge that decisions regarding investments, property transactions, and legal matters are your own and should be made after independent verification and, where appropriate, after consulting multiple qualified professionals.`,
  },
  {
    id: "fees",
    title: "7. Fees & Payments",
    content: `**Fee Structure:**
Our fees for specific services are communicated transparently at the time of engagement. We do not charge hidden fees. Any fees, commissions, or referral payments received from third parties (such as insurance companies, mutual fund distributors, or banks) in connection with products we recommend will be disclosed to you as required under SEBI regulations.

**Payment Terms:**
Payment terms are agreed upon in writing prior to commencement of services. We do not accept cash payments for advisory services. All payments should be made through verified banking channels.

**Refund Policy:**
Refunds, if applicable, are governed by the specific service agreement. Consultation fees are generally non-refundable once the consultation has been delivered. For ongoing engagements, pro-rata refunds may be considered at our sole discretion.

**Third-Party Charges:**
Government fees (stamp duty, registration fees, e-filing charges, court fees, etc.) and charges levied by third-party service providers are not included in our advisory fees and are payable directly by the client.`,
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: `All content on this Website — including text, graphics, logos, service descriptions, blog articles, calculator tools, and design elements — is the exclusive property of Right Assets Management or its licensed contributors, and is protected under the Copyright Act, 1957 and applicable intellectual property laws.

You may not reproduce, republish, distribute, or commercially exploit any content from this Website without our prior written consent. You may share links to our Website and print pages for personal, non-commercial use.

The Right Assets Management name, logo, and branding materials are proprietary and may not be used without our express written permission.`,
  },
  {
    id: "limitation-of-liability",
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law:

**No Liability for Investment Losses:**
Right Assets Management is not liable for any financial loss, including loss of capital, arising from investments made on the basis of our advisory services. All investments carry inherent risk which the client acknowledges.

**No Liability for Government or Third-Party Actions:**
We are not liable for losses or damages arising from delays, errors, or decisions of government authorities, courts, financial institutions, insurance companies, or any other third party.

**No Consequential Damages:**
In no event shall Right Assets Management be liable for indirect, incidental, consequential, punitive, or special damages of any kind arising out of or in connection with our services, even if we have been advised of the possibility of such damages.

**Maximum Liability:**
Our total aggregate liability to any client for any claim arising from a specific engagement shall not exceed the total fees paid by that client to us for that specific engagement.

Nothing in these Terms excludes or limits liability for fraud, wilful misconduct, or death or personal injury caused by our negligence.`,
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Right Assets Management, its directors, employees, advisors, and empanelled advocates from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from:

— Your use of our Website or services
— Your violation of these Terms
— Any incorrect or misleading information provided by you
— Your violation of any applicable law or the rights of any third party`,
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of India.

**Jurisdiction:**
Any dispute arising out of or in connection with these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka, India.

**Dispute Resolution:**
In the event of any dispute, both parties agree to first attempt to resolve the matter amicably through good-faith negotiation within 30 days of written notice of the dispute. If the dispute cannot be resolved through negotiation, either party may pursue legal remedies before the competent courts in Bangalore.

**Consumer Rights:**
Nothing in these Terms affects your statutory rights as a consumer under the Consumer Protection Act, 2019.`,
  },
  {
    id: "termination",
    title: "12. Termination of Services",
    content: `Right Assets Management reserves the right to suspend or terminate your access to our services at any time, with or without notice, if:

— You provide false or misleading information
— You engage in conduct that we reasonably believe to be unlawful, harmful, or abusive
— You breach any material provision of these Terms

You may discontinue using our services at any time. Obligations and liabilities incurred prior to termination shall survive termination of these Terms.`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `For questions, clarifications, or concerns regarding these Terms of Service, please contact:

**Right Assets Management**
Bangalore, Karnataka, India
Email: legal@rightasset.in
Phone: +91 99999 99999

We will endeavour to respond to all queries within 5 business days.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative"
        style={{ background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#C9A84C" }}>
            Legal
          </p>
          <h1
            className="font-heading font-bold text-white mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Terms of Service
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

          {/* Important notice box */}
          <div
            className="rounded-2xl p-6 mb-10"
            style={{ backgroundColor: "#FBF5E6", border: "1px solid #C9A84C44" }}
          >
            <p className="font-semibold text-sm mb-1" style={{ color: "#92700F" }}>
              Important Notice
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#7A5C00" }}>
              Right Assets Management operates across three domains — financial advisory,
              real estate facilitation, and legal advisory (through empanelled advocates). Different regulatory frameworks
              apply to each vertical. Please read the relevant sections carefully before engaging our services.
            </p>
          </div>

          {/* Table of Contents */}
          <div
            className="rounded-2xl p-6 mb-12"
            style={{ backgroundColor: "#F9F8F5", border: "1px solid #E5E7EB" }}
          >
            <p className="font-semibold text-sm mb-4" style={{ color: "#1B3A6B" }}>
              Table of Contents
            </p>
            <ol className="space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "#1B3A6B", textDecorationColor: "#C9A84C" }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id}>
                <h2
                  className="font-heading font-bold text-xl mb-4 pb-3"
                  style={{ color: "#1B3A6B", borderBottom: "2px solid #EEF2F8" }}
                >
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("—")) {
                      return (
                        <ul key={i} className="space-y-1.5 pl-2">
                          {para.split("\n").map((line, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                              <span>{line.replace(/^— /, "")}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={i} className="text-sm leading-relaxed text-gray-600">
                        {para.split("**").map((chunk, j) =>
                          j % 2 === 1
                            ? <strong key={j} className="font-semibold text-gray-800">{chunk}</strong>
                            : chunk
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#EEF2F8" }}
          >
            <p className="font-semibold mb-2" style={{ color: "#1B3A6B" }}>
              Have questions about our terms?
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Our team will clarify any aspect of our engagement before you commit to any service.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#1B3A6B", color: "#fff" }}
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
