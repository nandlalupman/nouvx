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
          "bg-gradient-to-r from-[#e2b17a] via-[#d4a373] to-[#b87333] hover:from-[#eed0a8] hover:to-[#c68642] text-[#0a0807] font-extrabold",
          "shadow-[0_0_24px_rgba(212,163,115,0.45)]",
          "hover:shadow-[0_0_36px_rgba(212,163,115,0.65)] hover:scale-[1.02] transition-all",
        ].join(" "),
        indigo: [
          "bg-[#10b981] hover:bg-[#34d399] text-[#0a0807] font-extrabold",
          "shadow-[0_0_20px_rgba(16,185,129,0.35)]",
          "hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02]",
        ].join(" "),
        destructive:
          "bg-[#c25736] text-white hover:bg-[#d46642] shadow-[0_4px_16px_rgba(194,87,54,0.35)]",
        outline: [
          "border border-[#d4a373]/35 bg-[#181310]/80 text-[#ffffff] font-semibold",
          "hover:border-[#e2b17a] hover:bg-[#d4a373]/15 hover:text-[#e2b17a]",
          "backdrop-blur-md shadow-sm",
        ].join(" "),
        secondary:
          "bg-[#1e1713] text-[#ffffff] border border-[#33261e] hover:border-[#d4a373]/40 hover:bg-[#281f1a]",
        ghost:
          "text-[#d6cfc7] hover:text-[#ffffff] hover:bg-white/5",
        link: "text-[#e2b17a] underline-offset-4 hover:underline p-0 h-auto",
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