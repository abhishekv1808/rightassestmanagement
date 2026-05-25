import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Right Asset Management",
  description:
    "Privacy Policy of Right Asset Management — how we collect, use, and protect your personal information in compliance with India's Digital Personal Data Protection Act, 2023.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 May 2026";

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Right Asset Management ("we", "our", "us"), a financial advisory and services firm based in Bangalore, Karnataka, India, is committed to protecting the privacy and personal data of every individual who visits our website or engages our services.

This Privacy Policy explains what personal information we collect, how we use it, how it is stored, with whom it may be shared, and what rights you hold over your data. This Policy applies to all visitors to rightasset.in (the "Website") and to all clients who engage us for Financial, Real Estate, or Legal advisory services.

By accessing our Website or submitting any information through our contact or enquiry forms, you acknowledge that you have read and understood this Policy. If you do not agree to this Policy, please do not use our Website or services.`,
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: `We collect only the information necessary to respond to your enquiries and deliver our services effectively.

**Information you provide directly:**
— Full name
— Mobile/telephone number
— Email address (optional)
— Service you are interested in (selected from a dropdown)
— Message or description of your requirement
— How you heard about us (Google, Referral, Social Media, or Other)

**Information collected automatically:**
— Browser type and version
— Device type (desktop, mobile, tablet)
— Operating system
— Pages visited and duration of visit
— Referring URL (website that directed you to us)
— Approximate geographic location (city/region level, derived from IP address)

We do not collect sensitive personal data such as Aadhaar numbers, PAN, financial account details, or biometric data through this Website. Such information, if required for a specific service engagement, is collected directly and handled under a separate client confidentiality agreement.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use your personal information for the following purposes:

**Service Delivery:**
— To contact you in response to your enquiry via phone, WhatsApp, or email
— To understand your service requirements and recommend appropriate solutions
— To schedule consultations and follow up on ongoing engagements

**Operations & Improvement:**
— To understand which services are most frequently enquired about
— To improve the content, navigation, and usefulness of our Website
— To maintain internal records of client interactions for service continuity

**Compliance & Legal Obligations:**
— To meet our regulatory obligations as an advisory firm
— To maintain records as required under applicable Indian laws including the Prevention of Money Laundering Act, 2002 (PMLA) where applicable

**We do not use your personal information for:**
— Unsolicited marketing or promotional messages without your consent
— Selling, renting, or trading your data to third parties for commercial purposes
— Automated decision-making or profiling that produces legal or significant effects`,
  },
  {
    id: "data-storage",
    title: "4. Data Storage & Security",
    content: `**Where your data is stored:**
Enquiry and contact form data submitted through our Website is stored in a secure PostgreSQL database managed through Supabase, a cloud infrastructure provider operating on AWS. Data may be processed and stored on servers located outside India; however, appropriate contractual safeguards are in place with our service providers.

**Security measures we implement:**
— HTTPS encryption across all pages of the Website
— Row-level security policies on our database to prevent unauthorised access
— Access to client data is restricted to authorised personnel of Right Asset Management only
— Regular review of access permissions and third-party integrations

**Limitations:**
No method of transmission over the internet or electronic storage is 100% secure. While we implement commercially reasonable security measures, we cannot guarantee absolute security. In the event of a data breach that is likely to result in a risk to your rights, we will notify you as required under applicable law.`,
  },
  {
    id: "third-parties",
    title: "5. Third-Party Services",
    content: `We use the following third-party services in the operation of our Website. Each operates under its own privacy policy.

**Vercel (Hosting & Deployment):**
Our Website is hosted on Vercel Inc. Vercel may collect IP addresses and technical logs as part of its infrastructure operations. Refer to Vercel's Privacy Policy for details.

**Supabase (Database):**
Enquiry form submissions are stored in Supabase's managed database infrastructure. Supabase operates on AWS and is GDPR-compliant. Personal data is not used by Supabase for any purpose other than data storage.

**Google Analytics 4 (Website Analytics):**
We use Google Analytics to understand how visitors use our Website. Google Analytics collects anonymised usage data. IP addresses are anonymised before processing. You can opt out of Google Analytics tracking using the Google Analytics Opt-out Browser Add-on.

**Vercel Analytics:**
We use Vercel Analytics for performance monitoring. This service collects aggregated, anonymised metrics and does not store personally identifiable information.

We do not sell, license, or transfer your personal information to any third party for marketing or commercial purposes.`,
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: `Our Website uses minimal cookies. We do not use advertising cookies or cross-site tracking cookies.

**Cookies we use:**
— **Session cookies:** Temporary cookies that expire when you close your browser. Used to maintain your browsing session.
— **Analytics cookies:** Set by Google Analytics to distinguish unique users and sessions. These are anonymised and cannot identify you personally.

**Managing cookies:**
You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of the Website. Most browsers allow you to refuse cookies or to be alerted when cookies are being sent.`,
  },
  {
    id: "your-rights",
    title: "7. Your Rights Under the DPDP Act, 2023",
    content: `Under India's Digital Personal Data Protection Act, 2023 (DPDP Act), you have the following rights with respect to your personal data:

**Right to Access:** You have the right to obtain a summary of the personal data we hold about you and the purposes for which it is being processed.

**Right to Correction:** You have the right to request correction of inaccurate or incomplete personal data we hold about you.

**Right to Erasure:** You have the right to request erasure of your personal data where it is no longer necessary for the purpose for which it was collected, subject to our legal and regulatory obligations to retain certain records.

**Right to Grievance Redressal:** You have the right to raise a grievance regarding the processing of your personal data. We will respond to all verifiable requests within a reasonable time and in no case later than 30 days from receipt.

**Right to Nominate:** You have the right to nominate another individual to exercise your rights in the event of your death or incapacity.

To exercise any of these rights, please contact us using the details in Section 11 of this Policy.`,
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: `We retain personal data only for as long as it is necessary for the purposes for which it was collected or as required by applicable law.

**Enquiry form submissions:** Retained for a period of 3 years from the date of submission, or for the duration of an active client relationship, whichever is longer.

**Client records:** For clients who engage our services, records are retained for a minimum of 5 years following the conclusion of the engagement, in compliance with applicable regulations.

**Analytics data:** Aggregated, anonymised analytics data does not identify individuals and may be retained indefinitely for operational improvement purposes.

Upon expiry of the retention period, personal data is securely deleted or anonymised.`,
  },
  {
    id: "childrens-privacy",
    title: "9. Children's Privacy",
    content: `Our Website and services are not directed at individuals under the age of 18 years. We do not knowingly collect personal data from minors. If you are a parent or guardian and believe that your child has submitted personal information to us, please contact us immediately and we will take prompt steps to delete such information.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes, we will update the "Last Updated" date at the top of this page.

We encourage you to review this Policy periodically. Your continued use of our Website or services after any change constitutes your acceptance of the updated Policy.`,
  },
  {
    id: "contact",
    title: "11. Contact & Grievance Officer",
    content: `For any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, you may contact us at:

**Right Asset Management**
Bangalore, Karnataka, India
Email: privacy@rightasset.in
Phone: +91 99999 99999
WhatsApp: +91 99999 99999

We will acknowledge your request within 72 hours and resolve it within 30 days. If you are not satisfied with our response, you may approach the Data Protection Board of India as constituted under the DPDP Act, 2023.`,
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">

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
                    if (para.startsWith("**") && para.endsWith("**")) {
                      return (
                        <p key={i} className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>
                          {para.replace(/\*\*/g, "")}
                        </p>
                      );
                    }
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
              Questions about your data?
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Reach out and we will respond within 72 hours.
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
