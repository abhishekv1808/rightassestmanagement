"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ProfileInput = {
  full_name: string;
  phone: string;
  area: string;
  service_interests: string[];
};

export async function saveProfile(
  input: ProfileInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: user.email,
      full_name: input.full_name.trim(),
      phone: input.phone.trim(),
      area: input.area,
      service_interests: input.service_interests,
    });

  if (error) return { success: false, error: error.message };
  revalidatePath("/profile");
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}
