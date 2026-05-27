"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Phone, MessageCircle, Loader2 } from "lucide-react";
import { submitLPLead } from "@/app/actions/submit-lp-lead";

const WA_NUMBER = "919999999999";
const PHONE_DISPLAY = "+91 99999 99999";
const PHONE_HREF = "tel:+919999999999";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  serviceLabel: string;
  lpSlug: string;
  ctaText: string;
  whatsappMessage: string;
  accentColor: string;
};

export default function LPLeadForm({
  serviceLabel,
  lpSlug,
  ctaText,
  whatsappMessage,
  accentColor,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submitterName, setSubmitterName] = useState("");
  const [utmParams, setUtmParams] = useState<{
    source?: string;
    medium?: string;
    campaign?: string;
  }>({});

  // Capture UTM params client-side after hydration
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtmParams({
      source: p.get("utm_source") ?? undefined,
      medium: p.get("utm_medium") ?? undefined,
      campaign: p.get("utm_campaign") ?? undefined,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await submitLPLead({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      serviceLabel,
      lpSlug,
      ...utmParams,
    });
    setSubmitterName(data.fullName.split(" ")[0]);
    setSubmitted(true);
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    fontSize: 14,
    color: "#1A1A1A",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    transition: "border-color 0.15s",
  };

  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          border: "1px solid #EEF0F3",
          padding: "40px 28px",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#F0FDF4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <CheckCircle2 style={{ width: 32, height: 32, color: "#16a34a" }} />
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1B3A6B",
            marginBottom: 8,
          }}
        >
          Thank you, {submitterName}!
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#64748B",
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          We&apos;ve received your request. Our advisor will call you within{" "}
          <strong style={{ color: "#1B3A6B" }}>2 hours</strong>
          <br />
          (Mon–Sat, 9am–7pm IST)
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 24px",
            borderRadius: 12,
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            marginBottom: 14,
          }}
        >
          <MessageCircle style={{ width: 18, height: 18 }} />
          Need faster response? Chat on WhatsApp
        </a>

        <p style={{ fontSize: 12, color: "#94A3B8" }}>
          Or call us:{" "}
          <a
            href={PHONE_HREF}
            style={{ color: "#1B3A6B", fontWeight: 600, textDecoration: "none" }}
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        border: "1px solid #EEF0F3",
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: accentColor, padding: "20px 28px" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            marginBottom: 4,
          }}
        >
          Free Consultation
        </p>
        <p
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Talk to an Expert Today
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.65)",
            marginTop: 4,
          }}
        >
          Our advisor calls within 2 hours · Mon–Sat 9am–7pm
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "28px" }}>
        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Your Name *
          </label>
          <input
            {...register("fullName")}
            placeholder="Rajesh Kumar"
            style={{
              ...inputBase,
              border: `1.5px solid ${errors.fullName ? "#EF4444" : "#E2E8F0"}`,
            }}
          />
          {errors.fullName && (
            <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Mobile Number *
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14,
                color: "#64748B",
                fontWeight: 500,
                pointerEvents: "none",
              }}
            >
              +91
            </span>
            <input
              {...register("phone")}
              placeholder="98765 43210"
              maxLength={10}
              style={{
                ...inputBase,
                paddingLeft: 44,
                border: `1.5px solid ${errors.phone ? "#EF4444" : "#E2E8F0"}`,
              }}
            />
          </div>
          {errors.phone && (
            <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Email{" "}
            <span style={{ color: "#94A3B8", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="rajesh@example.com"
            style={{
              ...inputBase,
              border: `1.5px solid ${errors.email ? "#EF4444" : "#E2E8F0"}`,
            }}
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 12,
            backgroundColor: isSubmitting ? "#94A3B8" : accentColor,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background-color 0.2s",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2
                className="animate-spin"
                style={{ width: 18, height: 18 }}
              />
              Sending...
            </>
          ) : (
            <>
              <Phone style={{ width: 18, height: 18 }} />
              {ctaText}
            </>
          )}
        </button>

        <p
          style={{
            fontSize: 11,
            color: "#94A3B8",
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.5,
          }}
        >
          By submitting, you agree to be contacted by our advisors. We never
          spam.
        </p>

        {/* WhatsApp alternative */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid #F1F5F9",
          }}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "11px 24px",
              borderRadius: 12,
              border: "1.5px solid #25D366",
              color: "#15803D",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              backgroundColor: "#F0FDF4",
            }}
          >
            <MessageCircle style={{ width: 16, height: 16 }} />
            Chat on WhatsApp instead
          </a>
        </div>
      </form>
    </div>
  );
}
