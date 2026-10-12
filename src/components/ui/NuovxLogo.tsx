"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NuovxLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "color" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export function NuovxLogo({
  variant = "light",
  size = "md",
  showTagline = true,
  className,
  ...props
}: NuovxLogoProps) {
  // Dimensions based on size
  const scale = {
    sm: { height: 28, textH: 22, subSize: 8 },
    md: { height: 38, textH: 28, subSize: 9.5 },
    lg: { height: 52, textH: 40, subSize: 12 },
    xl: { height: 72, textH: 56, subSize: 15 },
  }[size];

  const isDark = variant === "dark";
  const mainTextColor = isDark ? "#ffffff" : "#0d131a";
  const subTextColor = isDark ? "#a4b3c2" : "#4a5b6d";

  if (variant === "icon") {
    return (
      <div
        className={cn("inline-flex items-center justify-center select-none", className)}
        {...props}
      >
        <svg
          width={scale.height}
          height={scale.height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-2xl shadow-sm"
        >
          <defs>
            <linearGradient id="iconBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c121e" />
              <stop offset="100%" stopColor="#162235" />
            </linearGradient>
            <linearGradient id="iconRibbonN" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0072ff" />
              <stop offset="50%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#00f5a0" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#iconBgGrad)" />
          {/* Stylized N Ribbon */}
          <path
            d="M26 74V26L48 56L74 26V74"
            stroke="none"
            fill="none"
          />
          {/* Left upright */}
          <rect x="24" y="24" width="13" height="52" rx="4" fill="#ffffff" />
          {/* Diagonal ribbon */}
          <path
            d="M36 24L75 74H62L24 24H36Z"
            fill="url(#iconRibbonN)"
          />
          {/* Right upright */}
          <rect x="63" y="24" width="13" height="52" rx="4" fill="#ffffff" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn("inline-flex flex-col select-none", className)}
      {...props}
    >
      <div className="flex items-center">
        <svg
          height={scale.textH}
          viewBox="0 0 340 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Ribbon N gradient */}
            <linearGradient id="ribbonLeftGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0062ff" />
              <stop offset="50%" stopColor="#00aaff" />
              <stop offset="100%" stopColor="#00e5a3" />
            </linearGradient>

            {/* Stylized X gradients */}
            <linearGradient id="xSlash1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066ff" />
              <stop offset="70%" stopColor="#00c8ff" />
              <stop offset="100%" stopColor="#00f5a0" />
            </linearGradient>

            <linearGradient id="xSlash2Grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5722" />
              <stop offset="45%" stopColor="#ff9800" />
              <stop offset="100%" stopColor="#00e5a3" />
            </linearGradient>

            {/* Cyan-to-emerald gradient for modern dual-tone variant */}
            <linearGradient id="xDualGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0099ff" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00e676" />
            </linearGradient>
          </defs>

          {/* LETTER 'N' — Iconic Ribbon Fold */}
          <g id="letter-N">
            {/* Left vertical stem */}
            <path
              d="M12 10H28V75H12V10Z"
              fill={variant === "color" ? "url(#ribbonLeftGrad)" : mainTextColor}
            />
            {/* Diagonal folding banner */}
            <path
              d="M14 10L68 75H50L12 28V10H14Z"
              fill="url(#ribbonLeftGrad)"
            />
            {/* Right vertical stem */}
            <path
              d="M52 10H68V75H52V10Z"
              fill={variant === "color" ? "#00c853" : mainTextColor}
            />
          </g>

          {/* LETTER 'U' */}
          <path
            id="letter-U"
            d="M86 10H102V52C102 60 108 65 116 65C124 65 130 60 130 52V10H146V52C146 68 133 76 116 76C99 76 86 68 86 52V10Z"
            fill={variant === "color" ? "#00c853" : mainTextColor}
          />

          {/* LETTER 'O' */}
          <path
            id="letter-O"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M162 43C162 24 175 10 194 10C213 10 226 24 226 43C226 62 213 76 194 76C175 76 162 62 162 43ZM178 43C178 54 184 63 194 63C204 63 210 54 210 43C210 32 204 23 194 23C184 23 178 32 178 43Z"
            fill={variant === "color" ? "#00c853" : mainTextColor}
          />

          {/* LETTER 'V' */}
          <path
            id="letter-V"
            d="M242 10H259L274 58L289 10H306L283 75H265L242 10Z"
            fill={variant === "color" ? "#00c853" : mainTextColor}
          />

          {/* LETTER 'X' — Stylized Crossing Ribbons */}
          <g id="letter-X">
            {/* Diagonal \ stroke */}
            <path
              d="M312 10H332L382 75H362L312 10Z"
              fill={variant === "color" ? "url(#xSlash1Grad)" : "url(#xDualGrad)"}
            />
            {/* Crossing / stroke */}
            <path
              d="M382 10H362L312 75H332L382 10Z"
              fill={variant === "color" ? "url(#xSlash2Grad)" : "url(#xDualGrad)"}
            />
          </g>
        </svg>
      </div>

      {showTagline && (
        <div
          className="flex items-center gap-2 mt-1 tracking-[0.28em] font-mono font-bold uppercase transition-colors"
          style={{
            fontSize: `${scale.subSize}px`,
            color: subTextColor,
          }}
        >
          <span className="text-[#0070f3] hover:text-[#00c6ff] transition-colors">LEARN</span>
          <span className="text-[#00c853] text-[0.8em]">•</span>
          <span className="text-[#00c853] hover:text-[#00e676] transition-colors">CODE</span>
          <span className="text-[#ff6d00] text-[0.8em]">•</span>
          <span className="text-[#ff6d00] hover:text-[#ffa726] transition-colors">CREATE</span>
        </div>
      )}
    </div>
  );
}

export default NuovxLogo;
