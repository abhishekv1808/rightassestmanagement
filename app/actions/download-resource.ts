"use server";

import { createClient } from "@/lib/supabase/server";
import { ALL_RESOURCES } from "@/lib/resources-data";

// ─── Input / Output types ─────────────────────────────────────────────────────

type DownloadResourceInput = {
  full_name: string;
  phone: string;
  email?: string;
  resource_slug: string;
};

type DownloadResourceResult =
  | { success: true; downloadUrl: string }
  | { success: false; error: string };

// ─── Validation helpers ───────────────────────────────────────────────────────

function validateInput(
  input: DownloadResourceInput
): string | null {
  if (!input.full_name || input.full_name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!input.phone || !/^[6-9]\d{9}$/.test(input.phone.trim())) {
    return "Enter a valid 10-digit Indian mobile number (starting with 6–9).";
  }
  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      return "Enter a valid email address.";
    }
  }
  if (!input.resource_slug) {
    return "Resource slug is required.";
  }
  const resource = ALL_RESOURCES.find((r) => r.slug === input.resource_slug);
  if (!resource) {
    return "The requested resource was not found.";
  }
  return null;
}

// ─── Server action ────────────────────────────────────────────────────────────

export async function downloadResource(
  input: DownloadResourceInput
): Promise<DownloadResourceResult> {
  // 1. Validate
  const validationError = validateInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const resource = ALL_RESOURCES.find((r) => r.slug === input.resource_slug)!;

  // 2. Persist lead to Supabase
  try {
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("leads").insert({
      full_name: input.full_name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      service_interested: `Lead Magnet: ${resource.title}`,
      source: "Lead Magnet",
      message: `Downloaded: ${resource.title}`,
      status: "new",
    });

    if (dbError) {
      // Log but do not block the download — UX must not suffer from a DB outage
      console.error("[downloadResource] Supabase insert error:", dbError);
    }
  } catch (err) {
    // Same: log but don't block
    console.error("[downloadResource] Unexpected Supabase error:", err);
  }

  // 3. Return the download URL regardless of DB outcome
  return {
    success: true,
    downloadUrl: resource.downloadPath,
  };
}
