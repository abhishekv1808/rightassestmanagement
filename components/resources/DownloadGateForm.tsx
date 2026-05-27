"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle, Download, MessageCircle } from "lucide-react";
import { downloadResource } from "@/app/actions/download-resource";
import type { Resource } from "@/lib/resources-data";

// ─── Schema ───────────────────────────────────────────────────────────────────

const gateSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
});

type GateFormData = z.infer<typeof gateSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  resource: Resource;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DownloadGateForm({ resource }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GateFormData>({
    resolver: zodResolver(gateSchema),
    defaultValues: { full_name: "", phone: "", email: "" },
  });

  // ── Input focus helpers ────────────────────────────────────────────────────

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#C9A84C";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.15)";
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    hasError: boolean
  ) => {
    e.currentTarget.style.borderColor = hasError ? "#ef4444" : "#E5E7EB";
    e.currentTarget.style.boxShadow = "none";
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (data: GateFormData) => {
    setStatus("loading");
    setErrorMsg("");

    const result = await downloadResource({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || undefined,
      resource_slug: resource.slug,
    });

    if (result.success) {
      setDownloadUrl(result.downloadUrl);
      setStatus("success");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  };

  // ── WhatsApp pre-fill message ──────────────────────────────────────────────

  const waMessage = encodeURIComponent(
    `Hi, I just downloaded the ${resource.title} from your website. Please send it to this number as well. Thank you!`
  );
  const waLink = `https://wa.me/919999999999?text=${waMessage}`;

  // ─── Success state ─────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EEF0F3",
          borderRadius: 20,
          borderTop: "3px solid #C9A84C",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "32px 28px",
          textAlign: "center",
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#F0FAF4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckCircle2 style={{ width: 32, height: 32, color: "#16a34a" }} />
        </div>

        {/* Heading */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1B3A6B",
            marginBottom: 8,
          }}
        >
          Your {resource.title} is Ready!
        </h3>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
          Click the button below to open your free guide.
        </p>

        {/* Download button */}
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "13px 20px",
            borderRadius: 12,
            backgroundColor: "#C9A84C",
            color: "#1B3A6B",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
            marginBottom: 12,
          }}
        >
          <Download style={{ width: 18, height: 18 }} />
          Download PDF
        </a>

        {/* WhatsApp button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "11px 20px",
            borderRadius: 12,
            border: "1px solid #25D366",
            color: "#25D366",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            marginBottom: 16,
          }}
        >
          <MessageCircle style={{ width: 16, height: 16 }} />
          Or get it on WhatsApp →
        </a>

        {/* Note */}
        <p style={{ fontSize: 12, color: "#94A3B8" }}>
          Check your downloads folder. PDF opens in any browser.
        </p>
      </div>
    );
  }

  // ─── Form state ────────────────────────────────────────────────────────────

  return (
    <div
      className="lg:sticky lg:top-28"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EEF0F3",
        borderRadius: 20,
        borderTop: "3px solid #C9A84C",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "24px 28px 0" }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1B3A6B",
            marginBottom: 6,
          }}
        >
          Get Your Free {resource.pages}-Page Guide
        </h2>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
          Fill in your details to instantly access the download.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ padding: "0 28px 28px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Full Name */}
          <div>
            <label
              htmlFor="dlg-name"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Full Name{" "}
              <span style={{ color: "#C9A84C" }}>*</span>
            </label>
            <input
              id="dlg-name"
              type="text"
              placeholder="Eg. Priya Sharma"
              {...register("full_name")}
              style={{
                border: `1px solid ${errors.full_name ? "#ef4444" : "#E5E7EB"}`,
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 14,
                width: "100%",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, !!errors.full_name)}
            />
            {errors.full_name && (
              <p style={{ marginTop: 4, fontSize: 12, color: "#ef4444" }}>
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="dlg-phone"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Phone Number{" "}
              <span style={{ color: "#C9A84C" }}>*</span>
            </label>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  borderRadius: "12px 0 0 12px",
                  border: "1px solid #E5E7EB",
                  borderRight: "none",
                  fontSize: 13,
                  color: "#6B7280",
                  backgroundColor: "#F9FAFB",
                  whiteSpace: "nowrap",
                }}
              >
                +91
              </span>
              <input
                id="dlg-phone"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                {...register("phone")}
                style={{
                  flex: 1,
                  border: `1px solid ${errors.phone ? "#ef4444" : "#E5E7EB"}`,
                  borderRadius: "0 12px 12px 0",
                  padding: "10px 14px",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  minWidth: 0,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#C9A84C";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(201,168,76,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.phone
                    ? "#ef4444"
                    : "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            {errors.phone && (
              <p style={{ marginTop: 4, fontSize: 12, color: "#ef4444" }}>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="dlg-email"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Email Address{" "}
              <span style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF" }}>
                (optional)
              </span>
            </label>
            <input
              id="dlg-email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              style={{
                border: `1px solid ${errors.email ? "#ef4444" : "#E5E7EB"}`,
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 14,
                width: "100%",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, !!errors.email)}
            />
            {errors.email && (
              <p style={{ marginTop: 4, fontSize: 12, color: "#ef4444" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 10,
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
              }}
            >
              <AlertCircle
                style={{
                  width: 16,
                  height: 16,
                  color: "#ef4444",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              />
              <p style={{ fontSize: 13, color: "#DC2626" }}>{errorMsg}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "13px 20px",
              borderRadius: 12,
              backgroundColor: status === "loading" ? "#D4B86A" : "#C9A84C",
              color: "#1B3A6B",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "opacity 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              if (status !== "loading")
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
          >
            {status === "loading" && (
              <Loader2 style={{ width: 16, height: 16 }} className="animate-spin" />
            )}
            {status === "loading" ? "Getting your guide..." : "Get Free Download"}
          </button>

          <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>
            By submitting, you agree to our{" "}
            <a
              href="/privacy-policy"
              style={{ textDecoration: "underline", color: "#6B7280" }}
            >
              Privacy Policy
            </a>
            . We never share your data.
          </p>
        </div>
      </form>
    </div>
  );
}
