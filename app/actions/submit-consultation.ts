"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ConsultationInput = {
  fullName: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  pincode?: string; // 6-digit; drives franchise routing on the lead
  city?: string;
  state?: string;
  mode: "call" | "video" | "in-person";
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // "10:00"
  notes?: string;
};

export async function submitConsultation(
  input: ConsultationInput
): Promise<{ success: boolean; error?: string; slotTaken?: boolean }> {
  if (!input.fullName?.trim()) return { success: false, error: "Name is required" };
  if (!/^[6-9]\d{9}$/.test(input.phone)) return { success: false, error: "Invalid mobile number" };
  if (!input.preferredDate || !input.preferredTime)
    return { success: false, error: "Please select a date and time" };

  try {
    const supabase = await createClient();

    const { error } = await supabase.from("consultations").insert({
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      service: input.service?.trim() || null,
      address: input.address?.trim() || null,
      mode: input.mode,
      preferred_date: input.preferredDate,
      preferred_time: input.preferredTime,
      notes: input.notes?.trim() || null,
      status: "pending",
    });

    if (error) {
      // Unique-index violation → slot was taken between selection and submit
      if (error.code === "23505") {
        return {
          success: false,
          slotTaken: true,
          error: "That slot was just booked. Please pick another time.",
        };
      }
      console.error("Consultation insert error:", error);
      return { success: false, error: "Could not book. Please try again." };
    }

    // Also drop a lead so it appears in the main pipeline.
    const pin = input.pincode?.trim() || null;
    const locationLine = [
      pin && `Pincode: ${pin}`,
      input.city?.trim() && `City: ${input.city.trim()}`,
      input.state?.trim() && `State: ${input.state.trim()}`,
    ]
      .filter(Boolean)
      .join(", ");

    const leadMessage = [
      `Consultation booked — ${input.mode} on ${input.preferredDate} at ${input.preferredTime}`,
      input.address ? `Address: ${input.address}` : "",
      locationLine ? `Location — ${locationLine}` : "",
      input.notes ? `Note: ${input.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    await supabase.from("leads").insert({
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      service_interested: input.service?.trim() || "Consultation Booking",
      pincode: pin, // structured column — routing reads this first
      message: leadMessage,
      source: "Booking Widget",
      status: "new",
    });

    return { success: true };
  } catch (err) {
    console.error("Consultation submit error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateConsultationStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("consultations").update({ status }).eq("id", id);
  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
}
