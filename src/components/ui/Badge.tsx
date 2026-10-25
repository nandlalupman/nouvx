"use client";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "indigo" | "success" | "warning" | "error" | "ghost";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
  animate?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  dotColor,
  animate = false,
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 font-semibold rounded-full border transition-all duration-200 tracking-widest uppercase";

  const variants = {
    default: "bg-amber-50 text-amber-800 border-amber-200",
    accent:  "bg-violet-50 text-violet-800 border-violet-200/90 shadow-xs",
    indigo:  "bg-violet-50 text-violet-700 border-violet-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error:   "bg-rose-50 text-rose-700 border-rose-200",
    ghost:   "bg-slate-100 text-slate-700 border-slate-200",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3.5 py-1 text-[10px]",
    lg: "px-4.5 py-1.5 text-xs",
  };

  const dotColors: Record<string, string> = {
    default: "bg-amber-600",
    accent:  "bg-violet-600",
    indigo:  "bg-violet-600",
    success: "bg-emerald-600",
    warning: "bg-amber-600",
    error:   "bg-rose-600",
    ghost:   "bg-slate-400",
  };

  return (
    <span
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            animate && "animate-pulse-glow",
            dotColor ? `bg-[${dotColor}]` : dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}