"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function approveTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").update({ approved: true }).eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  const supabase = await createClient();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
