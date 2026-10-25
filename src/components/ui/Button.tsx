import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold",
    "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    "disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]",
    "tracking-wide",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[#09090b] hover:bg-[#27272a] text-white font-semibold",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_8px_rgba(0,0,0,0.08)]",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_6px_20px_rgba(124,58,237,0.2)]",
          "hover:scale-[1.01] transition-all",
        ].join(" "),
        ai: [
          "relative group overflow-hidden bg-[#09090b] text-white font-semibold",
          "border border-white/15 hover:border-amber-400/50",
          "shadow-[0_0_0_1px_rgba(124,58,237,0.28),0_4px_16px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:shadow-[0_0_0_1px_rgba(245,158,11,0.45),0_8px_28px_rgba(124,58,237,0.35),0_2px_14px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]",
          "hover:scale-[1.015] active:scale-[0.985] transition-all duration-300",
        ].join(" "),
        indigo: [
          "bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold",
          "shadow-[0_2px_12px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.45)] hover:scale-[1.01] transition-all",
        ].join(" "),
        destructive:
          "bg-[#ef4444] text-white hover:bg-[#dc2626] shadow-sm",
        outline: [
          "border border-slate-200 bg-white text-slate-800 font-semibold",
          "hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
          "shadow-xs transition-all",
        ].join(" "),
        secondary:
          "bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200/80",
        ghost:
          "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
        link: "text-[#7c3aed] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 rounded-lg px-3.5 text-xs",
        lg:      "h-11 rounded-xl px-8 text-sm",
        xl:      "h-13 rounded-xl px-10 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && (
              <svg
                className="mr-1 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };