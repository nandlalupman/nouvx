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
    default: "bg-[#d4a373]/15 text-[#e2b17a] border-[#d4a373]/35",
    accent:  "bg-[#d4a373]/15 text-[#e2b17a] border-[#d4a373]/40 shadow-[0_0_12px_rgba(212,163,115,0.25)]",
    indigo:  "bg-[#b87333]/15 text-[#c68642] border-[#b87333]/35",
    success: "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30",
    warning: "bg-[#e5a950]/15 text-[#f0be6b] border-[#e5a950]/35",
    error:   "bg-[#c25736]/15 text-[#e07a5f] border-[#c25736]/35",
    ghost:   "bg-[#1c1613] text-[#d6cfc7] border-[#33261e]",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3.5 py-1 text-[10px]",
    lg: "px-4.5 py-1.5 text-xs",
  };

  const dotColors: Record<string, string> = {
    default: "bg-[#e2b17a] shadow-[0_0_8px_#e2b17a]",
    accent:  "bg-[#e2b17a] shadow-[0_0_10px_#e2b17a]",
    indigo:  "bg-[#c68642] shadow-[0_0_8px_#c68642]",
    success: "bg-[#10b981] shadow-[0_0_8px_#10b981]",
    warning: "bg-[#e5a950] shadow-[0_0_8px_#e5a950]",
    error:   "bg-[#c25736] shadow-[0_0_8px_#c25736]",
    ghost:   "bg-[#9a8c80]",
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