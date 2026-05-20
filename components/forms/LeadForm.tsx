"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { allServices } from "@/lib/services-data";

// ─── Schema ──────────────────────────────────────────────────────────────────

const leadSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  service_interested: z.string().optional(),
  message: z.string().optional(),
  source: z.enum(["Google", "Referral", "Social Media", "Other", ""]).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

// ─── Service options grouped by vertical ────────────────────────────────────

const serviceOptions = [
  {
    label: "Financial Services",
    services: allServices.filter((s) => s.vertical === "financial"),
  },
  {
    label: "Real Estate",
    services: allServices.filter((s) => s.vertical === "real-estate"),
  },
  {
    label: "Legal Services",
    services: allServices.filter((s) => s.vertical === "legal"),
  },
];

// ─── Props ───────────────────────────────────────────────────────────────────

type LeadFormProps = {
  /** Heading text shown above the form */
  heading?: string;
  /** Subtext below heading */
  subtext?: string;
  /** Pre-select a service slug */
  defaultService?: string;
  /** Extra class names for the outer wrapper */
  className?: string;
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function LeadForm({
  heading = "Book a Free Consultation",
  subtext = "Fill in your details and we'll get back to you within 24 hours.",
  defaultService = "",
  className = "",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      service_interested: defaultService,
      message: "",
      source: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("leads").insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || null,
        service_interested: data.service_interested || null,
        message: data.message || null,
        source: data.source || null,
        status: "new",
      });

      if (error) throw error;

      setStatus("success");
      reset();
    } catch (err) {
      console.error("Lead form error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try calling us or WhatsApp instead.");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className={`rounded-2xl p-8 bg-white shadow-lg text-center ${className}`}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#EEF7F0" }}
        >
          <CheckCircle2 className="w-8 h-8" style={{ color: "#16a34a" }} />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2" style={{ color: "#1B3A6B" }}>
          We&apos;ve received your enquiry!
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Our team will call you back within 24 hours. For urgent queries, WhatsApp us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            WhatsApp Us
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#1B3A6B", color: "#1B3A6B" }}
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className={`rounded-2xl bg-white shadow-lg overflow-hidden ${className}`}>
      {/* Header band */}
      <div className="px-6 py-5 sm:px-8" style={{ backgroundColor: "#1B3A6B" }}>
        <h2 className="font-heading font-semibold text-xl text-white">{heading}</h2>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          {subtext}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-6 py-7 sm:px-8 space-y-5">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Eg. Rajesh Kumar"
            {...register("full_name")}
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2"
            style={{
              borderColor: errors.full_name ? "#ef4444" : "#e2e8f0",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3A6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = errors.full_name ? "#ef4444" : "#e2e8f0")}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span style={{ color: "#C9A84C" }}>*</span>
          </label>
          <div className="flex">
            <span
              className="flex items-center px-3 rounded-l-lg border border-r-0 text-sm text-gray-500 bg-gray-50"
              style={{ borderColor: "#e2e8f0" }}
            >
              +91
            </span>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              maxLength={10}
              {...register("phone")}
              className="flex-1 px-4 py-2.5 rounded-r-lg border text-sm outline-none transition-all"
              style={{ borderColor: errors.phone ? "#ef4444" : "#e2e8f0" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3A6B")}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.phone ? "#ef4444" : "#e2e8f0")}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address{" "}
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
            style={{ borderColor: errors.email ? "#ef4444" : "#e2e8f0" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3A6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "#e2e8f0")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Service Interested In */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Service Interested In{" "}
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          <select
            {...register("service_interested")}
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all bg-white"
            style={{ borderColor: "#e2e8f0", color: "#374151" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3A6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Message{" "}
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Brief description of what you need help with..."
            {...register("message")}
            className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all resize-none"
            style={{ borderColor: "#e2e8f0" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1B3A6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />
        </div>

        {/* How did you hear */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How did you hear about us?{" "}
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {["Google", "Referral", "Social Media", "Other"].map((src) => (
              <label key={src} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  value={src}
                  {...register("source")}
                  className="accent-navy w-3.5 h-3.5"
                />
                <span className="text-sm text-gray-600">{src}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error banner */}
        {status === "error" && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-100">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{errorMsg}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
        >
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "loading" ? "Submitting..." : "Submit Enquiry"}
        </button>

        <p className="text-xs text-center text-gray-400">
          By submitting, you agree to our{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
          . We never share your data.
        </p>
      </form>
    </div>
  );
}
