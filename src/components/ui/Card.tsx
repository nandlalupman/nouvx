import { cn } from "@/lib/utils";
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow" | "border" | "glass" | "premium";
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, children, ...props }, ref) => {
    const base = "relative rounded-2xl overflow-hidden transition-all duration-300";

    const variants = {
      default: "bg-[#14100d]/92 backdrop-blur-xl border border-[rgba(212,163,115,0.18)] shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]",
      glow: [
        "bg-[#14100d]/92 backdrop-blur-xl border border-[rgba(212,163,115,0.18)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]",
        "before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent",
        "before:transition-all before:duration-500",
        "hover:before:border-[rgba(212,163,115,0.5)]",
      ].join(" "),
      border: "bg-[#14100d]/60 border border-[rgba(212,163,115,0.18)]",
      glass: [
        "backdrop-blur-2xl border border-[rgba(212,163,115,0.22)]",
        "bg-[#14100d]/85 saturate-150",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.7)]",
      ].join(" "),
      premium: [
        "bg-[#14100d]/92 backdrop-blur-xl border border-[rgba(212,163,115,0.18)]",
        "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
        "before:bg-gradient-to-br before:from-[rgba(212,163,115,0.05)] before:to-[rgba(198,134,66,0.02)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_40px_rgba(0,0,0,0.7)]",
      ].join(" "),
    };

    const hoverStyles = hover
      ? [
          "hover:border-[rgba(212,163,115,0.55)]",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,163,115,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "hover:-translate-y-1",
        ].join(" ")
      : "";

    return (
      <div
        ref={ref}
        className={cn(base, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-bold tracking-tight text-text-primary", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-text-secondary leading-relaxed", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card };