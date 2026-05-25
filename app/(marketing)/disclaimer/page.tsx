import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Right Asset Management",
  description:
    "Important disclaimers for Right Asset Management's financial advisory, real estate, and legal services. Investments are subject to market risk. Read before proceeding.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 May 2026";

const SECTIONS = [
  {
    id: "general",
    title: "1. General Disclaimer",
    content: `The information contained on this Website (rightasset.in) and provided through any channel of communication by Right Asset Management — including in-person consultations, telephone conversations, WhatsApp messages, email correspondence, and written reports — is for general informational and advisory purposes only.

Nothing on this Website or communicated by our team constitutes a guarantee, representation, or warranty of any kind regarding financial performance, property transactions, or legal outcomes. All information is provided in good faith, but Right Asset Management makes no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information.

Users and clients are strongly advised to independently verify all information and to seek qualified professional advice — including from SEBI-registered advisors, RERA-registered agents, practising advocates, and Chartered Accountants — before making any financial, property, or legal decisions.`,
  },
  {
    id: "investment-disclaimer",
    title: "2. Investment & Financial Services Disclaimer",
    content: `**Market Risk:**
Investments in equity, mutual funds, bonds, Non-Convertible Debentures (NCDs), Alternate Investment Funds (AIFs), gold instruments (SGBs, ETFs), and all other securities are subject to market risk. The Net Asset Value (NAV) of mutual fund schemes and the market price of securities fluctuate based on market conditions. There is no assurance or guarantee that the objectives of any investment product will be achieved.

**Past Performance:**
Past performance of any financial instrument, scheme, fund, or portfolio is strictly not indicative of future performance. Any reference to historical returns is for illustrative purposes only and should not be construed as an assurance of similar future returns.

**Capital Risk:**
Investors may receive less than the amount they invested. In certain instruments (equity, derivatives, crypto), investors may lose the entire invested amount.

**Insurance Products:**
Insurance is a subject matter of solicitation. Right Asset Management facilitates insurance advisory but does not bind any insurance contract. All insurance products are subject to the terms and conditions of the respective insurer as approved by IRDAI. The purchase of an insurance product is the sole decision of the policyholder. Please review the policy wordings, exclusions, and claim settlement ratios before purchasing.

**Loan Products:**
Loan facilitation is provided for informational purposes. Interest rates, loan amounts, tenures, and processing fees are determined by the lending bank or NBFC. Right Asset Management does not guarantee loan approvals or the interest rate offered. Failure to repay loans on time may affect your credit score and result in legal action by the lender.

**Tax Planning:**
Tax savings and benefits mentioned in the context of any financial product (e.g., Section 80C, Section 80D, Section 10(10D)) are based on current tax laws as of the date of communication. Tax laws are subject to change. The actual tax benefit available to an individual depends on their income, applicable tax regime, and other factors. Consult a Chartered Accountant for personalised tax advice.

**Conflicts of Interest:**
Right Asset Management is committed to transparency. Where we receive commissions or referral fees from product manufacturers or service providers, such compensation is disclosed to clients before any engagement.`,
  },
  {
    id: "real-estate-disclaimer",
    title: "3. Real Estate Services Disclaimer",
    content: `**Documentation Assistance Only:**
Right Asset Management's real estate services constitute assistance with documentation, government liaison, and process guidance. We are not a real estate broker or developer. Property purchase and sale decisions are solely the responsibility of the buyer and seller.

**Title Verification:**
Extraction of documents such as Encumbrance Certificates (EC), RTC/Pahani records, Khatha certificates, and other government records is done in good faith based on available data. However, these records are sourced from government systems that may contain errors, omissions, or outdated information. Right Asset Management does not guarantee the accuracy or completeness of government records.

Clients are strongly advised to engage an independent property advocate for a comprehensive title search and legal opinion before executing any sale deed or agreement to sell.

**Market Valuations:**
Property valuations provided by us are indicative estimates based on prevailing market rates and comparable transactions. These are not certified valuations. For purposes of home loans, insurance, legal proceedings, or stamp duty calculations, a certified valuer empanelled with the relevant institution or authority must be engaged.

**RERA & Regulatory Compliance:**
Right Asset Management does not verify RERA compliance of individual properties or projects unless explicitly contracted to do so. Buyers of residential or commercial properties in RERA-registered projects should independently verify registration on the Karnataka RERA portal (rera.karnataka.gov.in).

**Government Processing Times:**
Timelines for government approvals (E-Khatha, building plan sanction, land conversion, mutation, etc.) are entirely at the discretion of the respective government departments and are subject to change. We do not guarantee or represent specific timelines.

**Legal Ownership:**
Right Asset Management does not assume any liability for disputes regarding ownership, title defects, encumbrances, or third-party claims on any property that is the subject of our services. Independent legal due diligence by a qualified advocate is strongly recommended.`,
  },
  {
    id: "legal-advisory-disclaimer",
    title: "4. Legal Advisory Services Disclaimer",
    content: `**Not a Law Firm:**
Right Asset Management is not a law firm and does not offer legal services as defined under the Advocates Act, 1961. We do not represent clients in courts, tribunals, or before any judicial or quasi-judicial authority.

**Advisory Only:**
Legal guidance provided by Right Asset Management is general advisory in nature, intended to help you understand your situation and available options. It is not a substitute for a formal legal opinion from a qualified advocate engaged for your specific matter.

**No Advocate-Client Relationship:**
Unless you have signed a formal retainer agreement with an empanelled advocate of Right Asset Management, no advocate-client relationship exists. Information shared with us during initial consultations is not protected by advocate-client privilege.

**Outcome Uncertainty:**
Legal outcomes are inherently uncertain. They depend on the specific facts of each case, the applicable law, the quality of evidence, procedural compliance, and the decisions of courts or authorities. No representation or assurance regarding the outcome of any legal matter is made or implied.

**Empanelled Advocates:**
Advocates empanelled with Right Asset Management are independent professionals and are not employees of the Company. The Company does not supervise or control the professional conduct of empanelled advocates, which is governed by the Bar Council of India and the State Bar Council.

**Jurisdiction:**
Legal advisory is primarily focused on matters arising under Karnataka law and before courts and authorities in Bangalore. For matters in other jurisdictions, clients are advised to engage advocates practising in the relevant jurisdiction.`,
  },
  {
    id: "website-content",
    title: "5. Website Content & Information Accuracy",
    content: `The content on this Website — including service descriptions, FAQs, blog articles, calculators, and interest rate references — is provided for general informational purposes only and is subject to change without notice.

**Interest Rates & Figures:**
Any interest rates, NAV figures, government fees, or financial data referenced on this Website are indicative and may not reflect current rates at the time of your reading. Always verify current rates directly with the relevant institution.

**Calculator Tools:**
The financial calculators on this Website (SIP calculator, EMI calculator, FD calculator, etc.) provide estimates based on the inputs you provide. Results are indicative only. Actual returns or EMI amounts may differ due to varying interest rates, processing fees, and other factors not captured in the calculator.

**External Links:**
This Website may contain links to third-party websites for reference purposes. Right Asset Management does not endorse, control, or take responsibility for the content, accuracy, or practices of any third-party website. Accessing third-party links is at your own risk.`,
  },
  {
    id: "no-professional-relationship",
    title: "6. No Professional Relationship from Website Use",
    content: `Accessing this Website, reading its content, using our calculators, or filling out an enquiry form does not create any professional or advisory relationship between you and Right Asset Management. A formal advisory relationship is established only upon execution of a written engagement agreement signed by an authorised representative of the Company.

Any information you provide through our enquiry form is received on a non-confidential basis and does not constitute privileged communication, unless a formal engagement has been executed.`,
  },
  {
    id: "forward-looking",
    title: "7. Forward-Looking Statements",
    content: `Any statements on this Website or in our communications that are not purely historical in nature may be considered forward-looking statements. These include projections of returns, property value appreciation, tax savings, timelines for government processes, and similar estimates.

Forward-looking statements involve known and unknown risks, uncertainties, and other factors that may cause actual results to differ materially from those expressed or implied. Right Asset Management does not undertake any obligation to update forward-looking statements to reflect new information, future events, or changed circumstances.`,
  },
  {
    id: "limitation-of-liability",
    title: "8. Limitation of Liability",
    content: `To the fullest extent permitted by law, Right Asset Management, its directors, employees, advisors, empanelled advocates, and agents shall not be liable for:

— Any investment losses, reduction in capital, or loss of income arising from financial products recommended or discussed
— Any property transaction losses arising from title defects, regulatory non-compliance, or market movements
— Any adverse legal outcomes in matters for which general advisory was provided
— Any loss or damage arising from reliance on information on this Website
— Any indirect, incidental, special, or consequential damages of any kind

This limitation applies regardless of the legal theory under which liability is claimed (contract, tort, strict liability, or otherwise) and even if Right Asset Management has been advised of the possibility of such damages.`,
  },
  {
    id: "regulatory",
    title: "9. Regulatory Information",
    content: `**Investor Grievances:**
For grievances related to securities market transactions or investment advisory, you may approach SEBI through its SCORES (SEBI Complaints Redress System) portal at scores.sebi.gov.in.

**Insurance Grievances:**
For insurance-related grievances, you may approach the Insurance Regulatory and Development Authority of India (IRDAI) Bima Bharosa portal or the relevant Insurance Ombudsman.

**Consumer Disputes:**
For consumer disputes arising from our services, you may approach the appropriate Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019.`,
  },
  {
    id: "contact",
    title: "10. Contact",
    content: `If you have questions about this Disclaimer or require clarification before engaging our services, please contact:

**Right Asset Management**
Bangalore, Karnataka, India
Email: info@rightasset.in
Phone: +91 99999 99999

We are committed to transparency and will address all queries promptly.`,
  },
];

export default function DisclaimerPage() {
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
            Disclaimer
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

          {/* Risk Warning Box */}
          <div
            className="rounded-2xl p-6 mb-10 flex gap-4"
            style={{ backgroundColor: "#FFF8F0", border: "1.5px solid #F59E0B55" }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#D97706" }} />
            <div>
              <p className="font-bold text-sm mb-1.5" style={{ color: "#92400E" }}>
                Important Risk Disclosure
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#78350F" }}>
                <strong>Investments in securities market are subject to market risks. Read all the related documents carefully before investing.</strong> Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance, investment goal, time frame, risk and reward balance, and the cost associated with the investment before choosing a fund or designing a portfolio that suits your needs.
              </p>
            </div>
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
              Speak to an advisor before you decide
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Our advisors explain risks clearly — no jargon, no pressure.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#1B3A6B", color: "#fff" }}
            >
              Book a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
