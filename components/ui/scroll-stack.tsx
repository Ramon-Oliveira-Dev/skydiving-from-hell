"use client";

/**
 * ScrollStack Component — React Bits (@reactbits-starter/scroll-stack-tw)
 * Creates a 3D sticky stacking card effect on screen transitions as the user scrolls.
 *
 * S.D.F.H. Dark Metal Edition
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
}

export interface ScrollStackItemProps {
  children: React.ReactNode;
  index?: number;
  topOffset?: number;
  scaleStep?: number;
  dimStep?: number;
  id?: string;
  className?: string;
}

export function ScrollStack({ children, className = "" }: ScrollStackProps) {
  return (
    <div className={cn("relative w-full flex flex-col", className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <ScrollStackItem
            index={index}
            key={child.key || `stack-item-${index}`}
            {...(child.props as any)}
          >
            {(child.props as any)?.children || child}
          </ScrollStackItem>
        );
      })}
    </div>
  );
}

export function ScrollStackItem({
  children,
  index = 0,
  topOffset = 0,
  scaleStep = 0.03,
  dimStep = 0.08,
  id,
  className = "",
}: ScrollStackItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Conforme a próxima seção sobe e sobrepõe, esta escala sutilmente para trás e escurece com profundidade
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - scaleStep]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1 - dimStep, 0.88]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        position: "sticky",
        top: topOffset,
        zIndex: index + 1,
      }}
      className={cn(
        "w-full origin-top will-change-transform",
        className
      )}
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="w-full h-full rounded-t-[28px] sm:rounded-t-[36px] bg-black shadow-[0_-25px_60px_rgba(0,0,0,0.95),_0_0_30px_rgba(220,38,38,0.08)] border-t border-white/10"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollStack;
