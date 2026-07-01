import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "info"
  | "muted"
  | "gold";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-[#1B3A6B] text-white",
  secondary: "bg-slate-100 text-slate-700",
  outline: "border border-slate-200 text-slate-600",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-700",
  muted: "bg-slate-50 text-slate-500",
  gold: "bg-[#C9A84C]/10 text-[#9a7d2e]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}
