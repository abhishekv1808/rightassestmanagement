import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadPayload {
  full_name: string;
  phone: string;
  email?: string | null;
  service_interested?: string | null;
  message?: string | null;
  source?: string | null;
  city?: string | null;
  state?: string | null;
}

// ─── HTML email builder ───────────────────────────────────────────────────────

function buildEmailHtml(lead: LeadPayload): string {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const row = (label: string, value: string | null | undefined) => {
    if (!value) return "";
    return `
      <tr>
        <td style="padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#1B3A6B;width:35%;vertical-align:top;font-size:13px;">
          ${label}
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #e9ecef;color:#1A1A1A;font-size:13px;vertical-align:top;">
          ${value}
        </td>
      </tr>
    `;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — Right Assets Management</title>
</head>
<body style="margin:0;padding:0;background:#F9F8F5;font-family:'Inter',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F8F5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1B3A6B;padding:28px 32px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.6);">
                Right Assets Management
              </p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;">
                New Lead Enquiry
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">
                ${timestamp} IST
              </p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="background:#C9A84C;height:4px;"></td>
          </tr>

          <!-- Lead details -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p style="margin:0 0 16px;font-size:13px;color:#64748B;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;">
                Contact Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e9ecef;border-radius:8px;overflow:hidden;">
                ${row("Full Name", lead.full_name)}
                ${row("Phone", `+91 ${lead.phone}`)}
                ${row("Email", lead.email)}
                ${row("Service Interested", lead.service_interested)}
                ${row("City", lead.city)}
                ${row("State", lead.state)}
                ${row("Source", lead.source)}
                ${row("Message", lead.message?.replace(/\n/g, "<br/>"))}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <p style="margin:0 0 16px;font-size:13px;color:#64748B;">
                Respond within <strong>24 hours</strong> to maximise conversion.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi+${encodeURIComponent(lead.full_name)}%2C+this+is+the+Right+Asset+Management+team.+We+received+your+enquiry+and+would+love+to+help."
                style="display:inline-block;padding:12px 24px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;"
              >
                Reply via WhatsApp
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F1F5F9;padding:16px 32px;border-top:1px solid #E2E8F0;">
              <p style="margin:0;font-size:11px;color:#94A3B8;text-align:center;">
                This notification was sent automatically by the Right Assets Management website.
                Do not reply to this email directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  // If no API key is configured, log and skip gracefully
  if (!apiKey) {
    console.warn(
      "[notify-lead] RESEND_API_KEY is not set — skipping email notification."
    );
    return NextResponse.json({ skipped: true });
  }

  let lead: LeadPayload;
  try {
    lead = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const subject = `New Lead: ${lead.full_name}${lead.service_interested ? ` — ${lead.service_interested}` : ""}`;
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@rightasset.in";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Right Assets Management <notifications@rightasset.in>",
        to: [adminEmail],
        subject,
        html: buildEmailHtml(lead),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[notify-lead] Resend API error:", res.status, body);
      return NextResponse.json(
        { error: "Email delivery failed", detail: body },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ sent: true, id: data.id });
  } catch (err) {
    console.error("[notify-lead] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
