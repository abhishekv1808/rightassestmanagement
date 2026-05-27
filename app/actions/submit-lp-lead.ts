"use server";

import { createClient } from "@/lib/supabase/server";

type LPLeadInput = {
  fullName: string;
  phone: string;
  email?: string;
  serviceLabel: string;
  lpSlug: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function submitLPLead(
  input: LPLeadInput
): Promise<{ success: boolean }> {
  try {
    const supabase = await createClient();

    const utmParts = [
      input.utmSource && `source=${input.utmSource}`,
      input.utmMedium && `medium=${input.utmMedium}`,
      input.utmCampaign && `campaign=${input.utmCampaign}`,
    ].filter(Boolean);

    const { error } = await supabase.from("leads").insert({
      full_name: input.fullName,
      phone: input.phone,
      email: input.email || null,
      service_interested: input.serviceLabel,
      source: `Google Ads LP — ${input.lpSlug}`,
      message: utmParts.length ? utmParts.join(", ") : null,
    });

    if (error) console.error("LP lead insert error:", error);
  } catch (err) {
    console.error("LP lead error:", err);
  }

  // Always return success — never block the user on a DB error
  return { success: true };
}
