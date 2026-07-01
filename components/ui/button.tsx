import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "gold"
  | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: "bg-[#1B3A6B] text-white hover:bg-[#152E57] shadow-sm",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  gold: "bg-[#C9A84C] text-[#1B3A6B] hover:bg-[#bd9b40] shadow-sm",
  destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 text-[13px]",
  lg: "h-11 px-6 text-[15px]",
  icon: "h-10 w-10",
};

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B]/30 disabled:pointer-events-none disabled:opacity-60";

export function buttonClasses({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
