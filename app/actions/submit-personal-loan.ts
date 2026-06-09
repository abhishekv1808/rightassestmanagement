"use server";

import { createClient } from "@/lib/supabase/server";

export type PersonalLoanInput = {
  fullName: string;
  phone: string;
  email?: string;
  pincode: string;
  city?: string;
  state?: string;
  monthlySalary: number;
  loanAmount: number;
};

function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export async function submitPersonalLoan(
  input: PersonalLoanInput
): Promise<{ success: boolean; error?: string }> {
  // Basic server-side validation
  if (!input.fullName?.trim()) return { success: false, error: "Name is required" };
  if (!/^[6-9]\d{9}$/.test(input.phone)) return { success: false, error: "Invalid mobile number" };
  if (!/^\d{6}$/.test(input.pincode)) return { success: false, error: "Invalid pincode" };

  try {
    const supabase = await createClient();

    // Pack loan details into the message field (leads table has no dedicated columns)
    const locationLine = [
      `Pincode: ${input.pincode}`,
      input.city && `City: ${input.city}`,
      input.state && `State: ${input.state}`,
    ]
      .filter(Boolean)
      .join(", ");

    const message = [
      "── Personal Loan Application ──",
      `Required Loan Amount: ${fmtINR(input.loanAmount)}`,
      `Monthly Salary: ${fmtINR(input.monthlySalary)}`,
      locationLine,
    ].join("\n");

    const { error } = await supabase.from("leads").insert({
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      service_interested: "Personal Loan",
      message,
      source: "Personal Loan Page",
      status: "new",
    });

    if (error) {
      console.error("Personal loan lead insert error:", error);
      return { success: false, error: "Could not submit. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Personal loan submit error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
