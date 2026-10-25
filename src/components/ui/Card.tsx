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
      default: "bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_18px_-4px_rgba(0,0,0,0.04)]",
      glow: [
        "bg-white border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_18px_-4px_rgba(0,0,0,0.04)]",
        "before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent",
        "before:transition-all before:duration-500",
        "hover:before:border-amber-400/40",
      ].join(" "),
      border: "bg-white border border-slate-200",
      glass: [
        "backdrop-blur-2xl border border-slate-200/80",
        "bg-white/90",
        "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)]",
      ].join(" "),
      premium: [
        "bg-white border border-slate-200/90",
        "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
        "before:bg-gradient-to-b before:from-amber-50/20 before:to-transparent",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.04)]",
      ].join(" "),
    };

    const hoverStyles = hover
      ? [
          "hover:border-amber-300/80",
          "hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08),0_0_1px_rgba(217,119,6,0.25)]",
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