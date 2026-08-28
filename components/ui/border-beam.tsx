"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  reverse?: boolean;
}

export function BorderBeam({
  className,
  size = 300,
  duration = 4,
  borderWidth = 2.5,
  colorFrom = "#ef4444",
  colorTo = "#f97316",
  delay = 0,
  reverse = false,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden z-20",
        className
      )}
      style={{
        padding: `${borderWidth}px`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    >
      {/* Feixe giratório contínuo em 360 graus */}
      <div
        className="absolute -inset-[250%] m-auto aspect-square will-change-transform"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, ${colorFrom} 310deg, ${colorTo} 360deg)`,
          animationName: "border-beam-spin",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      />
    </div>
  );
}

export default BorderBeam;
