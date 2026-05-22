/**
 * Typed GA4 event helpers for Right Asset Management.
 *
 * All functions are safe to call server-side or before gtag loads —
 * they silently no-op when window / gtag is unavailable.
 *
 * GA4 conventions used:
 *   generate_lead   → form / enquiry submissions
 *   view_item       → service page views
 *   select_content  → tool interactions / blog reads
 *   begin_checkout  → funnel entry (lead form focus)
 *   click           → outbound clicks (WhatsApp, phone)
 */

// ─── Internal utility ─────────────────────────────────────────────────────────

function gtag(event: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, params);
  }
}

// ─── Lead Form ────────────────────────────────────────────────────────────────

/**
 * Fires once when the user first interacts with the lead form.
 * Maps to the GA4 `begin_checkout` event (top of the enquiry funnel).
 */
export function trackLeadFormStart() {
  gtag("begin_checkout", {
    event_category: "lead_form",
    event_label: "form_focus",
  });
}

/**
 * Fires on successful Supabase insert — i.e., a confirmed lead capture.
 * Maps to the GA4 `generate_lead` standard event.
 */
export function trackLeadFormSubmit(service?: string) {
  gtag("generate_lead", {
    event_category: "lead_form",
    event_label: service ?? "general",
    value: 1,
    currency: "INR",
    ...(service ? { service_name: service } : {}),
  });
}

// ─── WhatsApp & Phone ─────────────────────────────────────────────────────────

/**
 * Fires when a visitor taps/clicks a WhatsApp link.
 * @param source "navbar" | "footer" | "cta" | "widget" | "service_page"
 */
export function trackWhatsAppClick(source: string) {
  gtag("click", {
    event_category: "engagement",
    event_label: "whatsapp_click",
    link_source: source,
    outbound: true,
  });
}

/**
 * Fires when a visitor clicks a tel: phone link.
 */
export function trackCallClick() {
  gtag("click", {
    event_category: "engagement",
    event_label: "phone_call_click",
    outbound: true,
  });
}

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * Fires when a service detail page is viewed.
 * Maps to the GA4 `view_item` standard event.
 */
export function trackServiceView(serviceName: string, vertical: string) {
  gtag("view_item", {
    event_category: "services",
    event_label: serviceName,
    item_category: vertical,
    items: [
      {
        item_id: serviceName.toLowerCase().replace(/\s+/g, "_"),
        item_name: serviceName,
        item_category: vertical,
      },
    ],
  });
}

// ─── Tools ───────────────────────────────────────────────────────────────────

/**
 * Fires when a visitor interacts with a financial calculator / tool.
 * Maps to GA4 `select_content`.
 */
export function trackToolUse(toolName: string) {
  gtag("select_content", {
    content_type: "tool",
    item_id: toolName.toLowerCase().replace(/\s+/g, "_"),
    event_category: "tools",
    event_label: toolName,
  });
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

/**
 * Fires when a blog article page is read (mounted).
 * Maps to GA4 `select_content`.
 */
export function trackBlogRead(title: string, category: string) {
  gtag("select_content", {
    content_type: "article",
    item_id: title.toLowerCase().replace(/\s+/g, "_"),
    event_category: "blog",
    event_label: title,
    item_category: category,
  });
}

// ─── Exit Intent ─────────────────────────────────────────────────────────────

/**
 * Fires when the exit-intent overlay is displayed.
 */
export function trackExitIntentShown() {
  gtag("view_promotion", {
    event_category: "exit_intent",
    event_label: "overlay_shown",
  });
}

/**
 * Fires when a visitor converts via the exit-intent overlay.
 */
export function trackExitIntentConvert() {
  gtag("select_promotion", {
    event_category: "exit_intent",
    event_label: "overlay_converted",
  });
}
