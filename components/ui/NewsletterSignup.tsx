"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Mail, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
        duplicate?: boolean;
      };

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl px-8 py-12 text-center"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: "#C9A84C" }} />
            </div>
            <h3
              className="font-heading font-bold text-2xl text-white mb-3"
            >
              You&apos;re in!
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-base">
              Check your inbox for a confirmation. You&apos;ll get our best financial
              tips and property insights every month — no spam.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Default state ──────────────────────────────────────────────────────────

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#F9F8F5" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div
          className="rounded-2xl px-8 py-12"
          style={{
            background: "linear-gradient(135deg, #1B3A6B 0%, #0D2347 100%)",
            boxShadow: "0 8px 32px rgba(27,58,107,0.25)",
          }}
        >
          {/* Icon badge */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
            >
              <Mail className="w-7 h-7" style={{ color: "#C9A84C" }} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: "rgba(201,168,76,0.12)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Free Newsletter
            </div>

            <h2
              className="font-heading font-bold text-white mb-3"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 1.875rem)" }}
            >
              Get Financial Tips Every Month
            </h2>
            <p
              className="text-base max-w-sm mx-auto"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Join 500+ investors. Expert insights on investments, property
              trends, and tax planning — delivered to your inbox.
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              No spam, unsubscribe anytime.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <div className="relative flex-1">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.35)" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMsg("");
                  }
                }}
                placeholder="your@email.com"
                required
                autoComplete="email"
                disabled={status === "loading"}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-60"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  caretColor: "#C9A84C",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(201,168,76,0.6)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.15)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ backgroundColor: "#C9A84C", color: "#1B3A6B" }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {/* Error message */}
          {status === "error" && (
            <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
