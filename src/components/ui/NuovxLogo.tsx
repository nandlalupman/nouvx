"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NuovxLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "color" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export function NuovxLogo({
  variant = "dark",
  size = "md",
  showTagline = true,
  className,
  ...props
}: NuovxLogoProps) {
  // Dimensions based on size
  const scale = {
    sm: { height: 28, width: 120, iconSize: 28, subSize: 8 },
    md: { height: 38, width: 160, iconSize: 38, subSize: 9.5 },
    lg: { height: 52, width: 220, iconSize: 52, subSize: 12 },
    xl: { height: 72, width: 300, iconSize: 72, subSize: 15 },
  }[size];

  const isDark = variant === "dark" || variant === "color";
  const subTextColor = isDark ? "#94a3b8" : "#4a5b6d";

  // Icon-only variant — uses the icon PNG
  if (variant === "icon") {
    return (
      <div
        className={cn("inline-flex items-center justify-center select-none", className)}
        {...props}
      >
        <Image
          src="/images/nuovx-icon-dark.png"
          alt="NUOVX"
          width={scale.iconSize}
          height={scale.iconSize}
          className="rounded-xl shadow-sm object-contain"
          priority
        />
      </div>
    );
  }

  // Full logo — use the appropriate PNG variant
  const logoSrc = isDark
    ? "/images/nuovx-logo-dark.png"
    : "/images/nuovx-logo-light.png";

  return (
    <div
      className={cn("inline-flex flex-col select-none", className)}
      {...props}
    >
      <div className="flex items-center">
        <Image
          src={logoSrc}
          alt="NUOVX"
          width={scale.width}
          height={scale.height}
          className="object-contain"
          style={{ height: `${scale.height}px`, width: "auto" }}
          priority
        />
      </div>
    </div>
  );
}

export default NuovxLogo;
